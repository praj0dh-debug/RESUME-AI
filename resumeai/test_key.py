import os
import requests
import json

def load_gemini_key():
    # Try reading from env
    key = os.getenv("GEMINI_API_KEY") or os.getenv("GOOGLE_API_KEY")
    if key and key != "your_api_key_here":
        return key
        
    # Try reading from cred.txt
    cred_path = os.path.join(os.path.dirname(__file__), "cred.txt")
    if os.path.exists(cred_path):
        try:
            with open(cred_path, "r", encoding="utf-8") as f:
                content = f.read()
                for line in content.splitlines():
                    if "=" in line:
                        parts = line.split("=", 1)
                        name = parts[0].strip().lower()
                        val = parts[1].strip().strip("'\"")
                        if "api" in name or "google" in name:
                            if val:
                                return val
                content_clean = content.strip()
                if content_clean and "=" not in content_clean:
                    return content_clean
        except Exception as e:
            print(f"Error reading cred.txt: {e}")
    return None

def test_model(model_name, key):
    url = f"https://generativelanguage.googleapis.com/v1beta/models/{model_name}:generateContent?key={key}"
    payload = {
        "contents": [{"parts": [{"text": "Hello, this is a connection test. Reply with 'OK' if you receive this."}]}]
    }
    print(f"Testing {model_name}...")
    try:
        response = requests.post(
            url,
            headers={"Content-Type": "application/json"},
            json=payload,
            timeout=10
        )
        print(f"Status Code: {response.status_code}")
        try:
            res_json = response.json()
            if response.status_code == 200:
                print("Response text:", res_json["candidates"][0]["content"]["parts"][0]["text"].strip())
                return True, None
            else:
                err_msg = res_json.get("error", {}).get("message", "Unknown error")
                print("Error details:", err_msg)
                return False, err_msg
        except Exception as e:
            print("Response raw content:", response.text)
            return False, str(e)
    except Exception as e:
        print("Request failed:", e)
        return False, str(e)

if __name__ == "__main__":
    key = load_gemini_key()
    if not key:
        print("No API key found!")
        exit(1)
        
    models = [
        "gemini-flash-latest",
        "gemini-flash-lite-latest",
        "gemini-pro-latest",
        "gemini-3.1-flash-lite",
        "gemini-3-flash-preview",
        "gemini-3.1-pro-preview"
    ]
    
    results = {}
    for model in models:
        success, details = test_model(model, key)
        results[model] = "SUCCESS" if success else f"FAILED: {details}"
        print("-" * 40)
        
    print("\nSummary of results:")
    for model, res in results.items():
        print(f"  {model}: {res}")
