import os

import requests
from dotenv import load_dotenv
from flask import Flask, jsonify, render_template, request
from flask_cors import CORS

load_dotenv()

app = Flask(__name__)
CORS(app)


def load_gemini_key():
    key = os.getenv("GEMINI_API_KEY") or os.getenv("GOOGLE_API_KEY")
    if key and key != "your_api_key_here":
        return key

    cred_path = os.path.join(os.path.dirname(__file__), "cred.txt")
    if os.path.exists(cred_path):
        try:
            with open(cred_path, "r", encoding="utf-8") as f:
                content = f.read().strip()

            for line in content.splitlines():
                if "=" not in line:
                    continue
                name, value = line.split("=", 1)
                if "api" in name.strip().lower() or "google" in name.strip().lower():
                    value = value.strip().strip("'\"")
                    if value:
                        return value

            if content and "=" not in content:
                return content
        except OSError as exc:
            print(f"Error reading cred.txt: {exc}")

    return None


GEMINI_API_KEY = load_gemini_key()


@app.route("/")
def home():
    return render_template("index.html")


@app.route("/api/health")
def health():
    return jsonify({"status": "ok"})


@app.route("/chat", methods=["POST"])
def chat():
    if not GEMINI_API_KEY:
        return jsonify({
            "error": "Could not find a valid Google API key in cred.txt or environment variables."
        }), 500

    data = request.get_json(silent=True) or {}
    user_message = data.get("message", "")
    current_data = data.get("currentData", {})
    history = data.get("history", [])

    system_prompt = f"""
You are ResumeAI, a friendly resume building assistant for students.

Current resume state:
{current_data}

Your job:
1. Understand the user's message
2. Extract resume details
3. Reply briefly
4. Always return an update JSON inside <UPDATE></UPDATE>

Use this exact format:

<UPDATE>
{{
  "name": "",
  "jobTitle": "",
  "email": "",
  "phone": "",
  "location": "",
  "website": "",
  "summary": "",
  "addSkills": [],
  "addEdu": {{
    "school": "",
    "degree": "",
    "field": "",
    "start": "",
    "end": "",
    "gpa": ""
  }},
  "addExp": {{
    "company": "",
    "role": "",
    "start": "",
    "end": "",
    "desc": ""
  }},
  "addProj": {{
    "name": "",
    "tech": "",
    "link": "",
    "desc": ""
  }},
  "achievements": ""
}}
</UPDATE>

Only include fields that have new useful information.
Keep the normal reply short and friendly.
"""

    contents = []
    for item in history:
        role = item.get("role")
        content = item.get("content", "")
        gemini_role = "model" if role == "assistant" else "user"
        contents.append({
            "role": gemini_role,
            "parts": [{"text": content}],
        })

    contents.append({
        "role": "user",
        "parts": [{"text": user_message}],
    })

    payload = {
        "contents": contents,
        "system_instruction": {
            "parts": [{"text": system_prompt}],
        },
    }

    models_to_try = [
        "gemini-3-flash-preview",
        "gemini-flash-latest",
        "gemini-3.1-flash-lite",
    ]

    last_error = None
    last_result = None

    for model_name in models_to_try:
        url = (
            "https://generativelanguage.googleapis.com/v1beta/models/"
            f"{model_name}:generateContent?key={GEMINI_API_KEY}"
        )
        try:
            print(f"Attempting query with model: {model_name}")
            response = requests.post(
                url,
                headers={"Content-Type": "application/json"},
                json=payload,
                timeout=30,
            )

            try:
                result = response.json()
            except ValueError:
                last_error = "Gemini API returned a non-JSON response."
                last_result = {"response_text": response.text}
                continue

            if response.status_code != 200:
                message = result.get("error", {}).get("message", "Gemini API request failed")
                last_error = f"Model {model_name} failed: {message}"
                last_result = result
                continue

            try:
                reply = result["candidates"][0]["content"]["parts"][0]["text"]
            except (KeyError, IndexError):
                last_error = "Failed to parse response structure from Gemini API."
                last_result = result
                continue

            return jsonify({"reply": reply})
        except requests.RequestException as exc:
            last_error = f"Request failed: {exc}"

    return jsonify({
        "error": last_error or "All models failed to generate content.",
        "details": last_result,
    }), 500


if __name__ == "__main__":
    app.run(debug=True)
