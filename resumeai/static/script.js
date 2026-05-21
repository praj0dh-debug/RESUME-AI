/* ═══════════════════════════════════════════════════════════════
   ResumeAI — Main Script
   Navigation, editor, chat, templates, animations, assistant
   ═══════════════════════════════════════════════════════════════ */

let eduEntries = [];
let expEntries = [];
let projEntries = [];
let skills = [];
let convHistory = [];
let isTyping = false;

/* ═══ VIEW NAVIGATION ═══ */
let currentZoom = 0.85;

function switchView(panelId, btn) {
  const viewId = panelId.endsWith('View') ? panelId : panelId + 'View';

  // Update menu items active class
  document.querySelectorAll('.menu-item').forEach(b => b.classList.remove('active'));
  if (btn) {
    btn.classList.add('active');
  } else {
    document.querySelectorAll('.menu-item').forEach(b => {
      if (b.dataset.view === panelId || b.dataset.view + 'View' === viewId) {
        b.classList.add('active');
      }
    });
  }

  // Switch drawer panels
  document.querySelectorAll('.drawer-panel').forEach(p => p.classList.remove('active'));
  const panel = document.getElementById(viewId);
  if (panel) {
    panel.classList.add('active');
  }

  // Init templates on first visit
  if (viewId === 'templatesView' && !document.querySelector('.tpl-card')) {
    initTemplates();
  }

  // Re-trigger scroll animations for the active panel
  setTimeout(() => initScrollAnimations(), 100);
  if (window.lucide) {
    lucide.createIcons();
  }
}

/* ── ZOOM CANVAS CONTROLLER ── */
function adjustZoom(amount) {
  applyZoom(currentZoom + amount);
}

function applyZoom(val) {
  currentZoom = Math.max(0.5, Math.min(1.2, val));
  const paper = document.getElementById('resumePaper');
  if (paper) {
    paper.style.transform = `scale(${currentZoom})`;
    paper.style.transformOrigin = 'top center';
  }
  const label = document.getElementById('zoomPct');
  if (label) {
    label.textContent = Math.round(currentZoom * 100) + '%';
  }
}

/* ═══ SECTION TOGGLE ═══ */
function toggleSection(id) {
  document.getElementById("sec-" + id).classList.toggle("open");
}

/* ═══ ENTRIES (Education, Experience, Projects) ═══ */
function addEntry(type) {
  const id = Date.now();

  if (type === "edu") {
    eduEntries.push({ id, school: "", degree: "", field: "", start: "", end: "", gpa: "" });
    renderEdu();
  }
  if (type === "exp") {
    expEntries.push({ id, company: "", role: "", start: "", end: "", desc: "" });
    renderExp();
  }
  if (type === "proj") {
    projEntries.push({ id, name: "", tech: "", link: "", desc: "" });
    renderProj();
  }
  saveData();
}

function removeEntry(type, id) {
  if (type === "edu") eduEntries = eduEntries.filter(e => e.id !== id);
  if (type === "exp") expEntries = expEntries.filter(e => e.id !== id);
  if (type === "proj") projEntries = projEntries.filter(e => e.id !== id);
  renderAll();
  updatePreview();
  saveData();
}

function renderEdu() {
  const list = document.getElementById("eduList");
  list.innerHTML = eduEntries.map((e, i) => `
    <div class="entry-block">
      <div class="entry-block-header">
        <span class="entry-label">Education #${i + 1}</span>
        <button class="remove-btn" onclick="removeEntry('edu', ${e.id})">&#x2715; Remove</button>
      </div>
      <div class="form-row">
        <div class="form-group">
          <label>School / University</label>
          <input type="text" value="${escapeAttr(e.school)}" oninput="eduEntries[${i}].school=this.value; updatePreview(); saveData();">
        </div>
        <div class="form-group">
          <label>Degree</label>
          <input type="text" value="${escapeAttr(e.degree)}" oninput="eduEntries[${i}].degree=this.value; updatePreview(); saveData();">
        </div>
      </div>
      <div class="form-row">
        <div class="form-group">
          <label>Field</label>
          <input type="text" value="${escapeAttr(e.field)}" oninput="eduEntries[${i}].field=this.value; updatePreview(); saveData();">
        </div>
        <div class="form-group">
          <label>CGPA / %</label>
          <input type="text" value="${escapeAttr(e.gpa)}" oninput="eduEntries[${i}].gpa=this.value; updatePreview(); saveData();">
        </div>
      </div>
      <div class="form-row">
        <div class="form-group">
          <label>Start</label>
          <input type="text" value="${escapeAttr(e.start)}" oninput="eduEntries[${i}].start=this.value; updatePreview(); saveData();">
        </div>
        <div class="form-group">
          <label>End</label>
          <input type="text" value="${escapeAttr(e.end)}" oninput="eduEntries[${i}].end=this.value; updatePreview(); saveData();">
        </div>
      </div>
    </div>
  `).join("");
  document.getElementById("edu-count").textContent = eduEntries.length;
  updatePreview();
}

function renderExp() {
  const list = document.getElementById("expList");
  list.innerHTML = expEntries.map((e, i) => `
    <div class="entry-block">
      <div class="entry-block-header">
        <span class="entry-label">Experience #${i + 1}</span>
        <button class="remove-btn" onclick="removeEntry('exp', ${e.id})">&#x2715; Remove</button>
      </div>
      <div class="form-row">
        <div class="form-group">
          <label>Company</label>
          <input type="text" value="${escapeAttr(e.company)}" oninput="expEntries[${i}].company=this.value; updatePreview(); saveData();">
        </div>
        <div class="form-group">
          <label>Role</label>
          <input type="text" value="${escapeAttr(e.role)}" oninput="expEntries[${i}].role=this.value; updatePreview(); saveData();">
        </div>
      </div>
      <div class="form-row">
        <div class="form-group">
          <label>Start</label>
          <input type="text" value="${escapeAttr(e.start)}" oninput="expEntries[${i}].start=this.value; updatePreview(); saveData();">
        </div>
        <div class="form-group">
          <label>End</label>
          <input type="text" value="${escapeAttr(e.end)}" oninput="expEntries[${i}].end=this.value; updatePreview(); saveData();">
        </div>
      </div>
      <div class="form-group full">
        <label>Description</label>
        <textarea oninput="expEntries[${i}].desc=this.value; updatePreview(); saveData();">${escapeHtml(e.desc)}</textarea>
      </div>
    </div>
  `).join("");
  document.getElementById("exp-count").textContent = expEntries.length;
  updatePreview();
}

function renderProj() {
  const list = document.getElementById("projList");
  list.innerHTML = projEntries.map((e, i) => `
    <div class="entry-block">
      <div class="entry-block-header">
        <span class="entry-label">Project #${i + 1}</span>
        <button class="remove-btn" onclick="removeEntry('proj', ${e.id})">&#x2715; Remove</button>
      </div>
      <div class="form-row">
        <div class="form-group">
          <label>Project Name</label>
          <input type="text" value="${escapeAttr(e.name)}" oninput="projEntries[${i}].name=this.value; updatePreview(); saveData();">
        </div>
        <div class="form-group">
          <label>Tech Stack</label>
          <input type="text" value="${escapeAttr(e.tech)}" oninput="projEntries[${i}].tech=this.value; updatePreview(); saveData();">
        </div>
      </div>
      <div class="form-group full">
        <label>GitHub / Live Link</label>
        <input type="text" value="${escapeAttr(e.link)}" oninput="projEntries[${i}].link=this.value; updatePreview(); saveData();">
      </div>
      <div class="form-group full">
        <label>Description</label>
        <textarea oninput="projEntries[${i}].desc=this.value; updatePreview(); saveData();">${escapeHtml(e.desc)}</textarea>
      </div>
    </div>
  `).join("");
  document.getElementById("proj-count").textContent = projEntries.length;
  updatePreview();
}

function renderAll() {
  renderEdu();
  renderExp();
  renderProj();
}

/* ═══ SKILLS ═══ */
function addSkill(val) {
  const input = document.getElementById("skillInput");
  const value = (val || input.value).trim();
  if (!value) return;
  value.split(",").forEach(skill => {
    const cleaned = skill.trim();
    if (cleaned && !skills.includes(cleaned)) skills.push(cleaned);
  });
  input.value = "";
  renderSkills();
  updatePreview();
  saveData();
}

function removeSkill(index) {
  skills.splice(index, 1);
  renderSkills();
  updatePreview();
  saveData();
}

function renderSkills() {
  document.getElementById("skillsGrid").innerHTML = skills.map((s, i) => `
    <span class="skill-tag">
      ${escapeHtml(s)}
      <button class="skill-remove" onclick="removeSkill(${i})">&times;</button>
    </span>
  `).join("");
  document.getElementById("skill-count").textContent = skills.length;
}

function skillKeydown(e) {
  if (e.key === "Enter") { e.preventDefault(); addSkill(); }
}

/* ═══ PREVIEW ═══ */
function updatePreview() {
  const name = document.getElementById("name").value || "Your Name";
  const title = document.getElementById("jobTitle").value || "Job Title";
  const email = document.getElementById("email").value || "your@email.com";
  const phone = document.getElementById("phone").value || "Phone";
  const location = document.getElementById("location").value || "Location";
  const website = document.getElementById("website").value;
  const summary = document.getElementById("summary").value;
  const achievements = document.getElementById("achievements").value;

  document.getElementById("rv-name").textContent = name;
  document.getElementById("rv-title").textContent = title;

  // Build clickable contact links
  let contact = `
    <span>📧 <a href="mailto:${escapeHtml(email)}">${escapeHtml(email)}</a></span>
    <span>📞 <a href="tel:${phone.replace(/\s+/g, '')}">${escapeHtml(phone)}</a></span>
    <span>📍 ${escapeHtml(location)}</span>
  `;
  if (website) {
    // Ensure URL has protocol
    const url = website.match(/^https?:\/\//i) ? website : `https://${website}`;
    contact += `<span>🔗 <a href="${escapeHtml(url)}" target="_blank" rel="noopener">${escapeHtml(website)}</a></span>`;
  }
  document.getElementById("rv-contact").innerHTML = contact;

  const sumEl = document.getElementById("rv-summary");
  sumEl.textContent = summary || "Add a summary above...";
  sumEl.className = "rv-summary" + (summary ? "" : " rv-empty");

  document.getElementById("rv-edu-list").innerHTML = eduEntries.length
    ? eduEntries.map(e => `
      <div class="rv-entry">
        <div class="rv-entry-head">
          <span class="rv-entry-org">${escapeHtml(e.school || "School")}</span>
          <span class="rv-entry-date">${escapeHtml([e.start, e.end].filter(Boolean).join(" - "))}</span>
        </div>
        <div class="rv-entry-role">${escapeHtml([e.degree, e.field].filter(Boolean).join(" in "))} ${e.gpa ? "- " + escapeHtml(e.gpa) : ""}</div>
      </div>
    `).join("")
    : `<p class="rv-empty">No education added yet</p>`;

  document.getElementById("rv-exp-list").innerHTML = expEntries.length
    ? expEntries.map(e => `
      <div class="rv-entry">
        <div class="rv-entry-head">
          <span class="rv-entry-org">${escapeHtml(e.company || "Company")}</span>
          <span class="rv-entry-date">${escapeHtml([e.start, e.end].filter(Boolean).join(" - "))}</span>
        </div>
        <div class="rv-entry-role">${escapeHtml(e.role || "Role")}</div>
        ${e.desc ? `<div class="rv-entry-desc"><ul>${makeBullets(e.desc)}</ul></div>` : ""}
      </div>
    `).join("")
    : `<p class="rv-empty">No experience added yet</p>`;

  document.getElementById("rv-proj-list").innerHTML = projEntries.length
    ? projEntries.map(e => `
      <div class="rv-entry">
        <div class="rv-entry-head">
          <span class="rv-entry-org">${escapeHtml(e.name || "Project Name")}</span>
          ${e.tech ? `<span class="rv-entry-date">${escapeHtml(e.tech)}</span>` : ""}
        </div>
        ${e.link ? `<div class="rv-entry-role">${escapeHtml(e.link)}</div>` : ""}
        ${e.desc ? `<div class="rv-entry-desc"><ul>${makeBullets(e.desc)}</ul></div>` : ""}
      </div>
    `).join("")
    : `<p class="rv-empty">No projects added yet</p>`;

  const skillEl = document.getElementById("rv-skills");
  if (skills.length) {
    skillEl.className = "rv-skills";
    skillEl.innerHTML = skills.map(s => `<span class="rv-skill-tag">${escapeHtml(s)}</span>`).join("");
  } else {
    skillEl.className = "rv-skills rv-empty";
    skillEl.textContent = "Add skills above...";
  }

  const achEl = document.getElementById("rv-achievements");
  if (achievements) {
    achEl.className = "rv-entry-desc";
    achEl.innerHTML = `<ul>${makeBullets(achievements)}</ul>`;
  } else {
    achEl.className = "rv-entry-desc rv-empty";
    achEl.textContent = "No achievements added yet";
  }

  updateProgress();
  saveData();
}

function makeBullets(text) {
  return text.split("\n").filter(l => l.trim()).map(l => `<li>${escapeHtml(l.replace(/^[\u2022*-]\s*/, ""))}</li>`).join("");
}

function updateProgress() {
  let score = 0;
  const total = 7;
  if (document.getElementById("name").value) score++;
  if (document.getElementById("email").value) score++;
  if (document.getElementById("summary").value) score++;
  if (eduEntries.length) score++;
  if (expEntries.length || projEntries.length) score++;
  if (skills.length >= 3) score++;
  if (document.getElementById("achievements").value) score++;
  const pct = Math.round((score / total) * 100);
  document.getElementById("progressFill").style.width = pct + "%";
  document.getElementById("progressPct").textContent = pct + "%";
}

/* ═══ CHAT ═══ */
function addMsg(role, html) {
  const messages = document.getElementById("chatMessages");
  const div = document.createElement("div");
  div.className = "msg msg-" + role;
  div.innerHTML = `
    <div class="msg-avatar">${role === "ai" ? "AI" : "You"}</div>
    <div class="msg-bubble">${html}</div>
  `;
  messages.appendChild(div);
  messages.scrollTop = messages.scrollHeight;
}

function showTyping() {
  const messages = document.getElementById("chatMessages");
  const div = document.createElement("div");
  div.className = "msg msg-ai";
  div.id = "typingIndicator";
  div.innerHTML = `
    <div class="msg-avatar">AI</div>
    <div class="msg-bubble">
      <div class="typing"><span></span><span></span><span></span></div>
    </div>
  `;
  messages.appendChild(div);
  messages.scrollTop = messages.scrollHeight;
}

function hideTyping() {
  const el = document.getElementById("typingIndicator");
  if (el) el.remove();
}

function handleKey(e) {
  if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); sendMessage(); }
}

function autoResize(el) {
  el.style.height = "auto";
  el.style.height = Math.min(el.scrollHeight, 120) + "px";
}

async function sendMessage() {
  const input = document.getElementById("chatInput");
  const msg = input.value.trim();
  if (!msg || isTyping) return;
  input.value = "";
  input.style.height = "auto";
  addMsg("user", escapeHtml(msg));
  isTyping = true;
  document.getElementById("sendBtn").disabled = true;
  showTyping();
  const currentData = getResumeData();
  try {
    const res = await fetch("/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: msg, currentData, history: convHistory }),
    });
    const raw = await res.text();
    let data;
    try { data = JSON.parse(raw); } catch (e) { data = { error: raw || "Backend returned an empty response." }; }
    hideTyping();
    if (!res.ok || data.error) {
      addMsg("ai", "Backend error: " + escapeHtml(getErrorMessage(data)));
      return;
    }
    const reply = data.reply;
    convHistory.push({ role: "user", content: msg });
    convHistory.push({ role: "assistant", content: reply });
    const updateMatch = reply.match(/<UPDATE>([\s\S]*?)<\/UPDATE>/);
    const displayReply = reply.replace(/<UPDATE>[\s\S]*?<\/UPDATE>/, "").trim();
    if (updateMatch) {
      try { applyUpdates(JSON.parse(updateMatch[1])); } catch (e) { console.log("JSON parse error:", e); }
    }
    addMsg("ai", escapeHtml(displayReply).replace(/\n/g, "<br>"));
  } catch (err) {
    hideTyping();
    addMsg("ai", "Something went wrong. Check your backend server.");
  }
  isTyping = false;
  document.getElementById("sendBtn").disabled = false;
}

function applyUpdates(u) {
  const set = (id, value) => { if (value) document.getElementById(id).value = value; };
  set("name", u.name);
  set("jobTitle", u.jobTitle);
  set("email", u.email);
  set("phone", u.phone);
  set("location", u.location);
  set("website", u.website);
  set("summary", u.summary);
  set("achievements", u.achievements);
  if (u.addSkills && u.addSkills.length) {
    u.addSkills.forEach(skill => { if (skill && !skills.includes(skill)) skills.push(skill); });
    renderSkills();
  }
  if (u.addEdu && u.addEdu.school) { eduEntries.push({ id: Date.now(), ...u.addEdu }); renderEdu(); }
  if (u.addExp && u.addExp.company) { expEntries.push({ id: Date.now(), ...u.addExp }); renderExp(); }
  if (u.addProj && u.addProj.name) { projEntries.push({ id: Date.now(), ...u.addProj }); renderProj(); }
  updatePreview();
  saveData();
}

function getErrorMessage(data) {
  if (!data) return "Unknown error.";
  if (typeof data.error === "string") return data.error;
  if (data.error && typeof data.error.message === "string") return data.error.message;
  if (typeof data.details === "string") return data.details;
  if (data.details && data.details.error && typeof data.details.error.message === "string") return data.details.error.message;
  return JSON.stringify(data);
}

/* ═══ DATA ═══ */
function getResumeData() {
  return {
    name: document.getElementById("name").value,
    jobTitle: document.getElementById("jobTitle").value,
    email: document.getElementById("email").value,
    phone: document.getElementById("phone").value,
    location: document.getElementById("location").value,
    website: document.getElementById("website").value,
    summary: document.getElementById("summary").value,
    education: eduEntries, experience: expEntries, projects: projEntries,
    skills, achievements: document.getElementById("achievements").value,
  };
}

function saveData() { localStorage.setItem("resumeData", JSON.stringify(getResumeData())); }

function loadData() {
  const saved = localStorage.getItem("resumeData");
  if (!saved) return;
  const data = JSON.parse(saved);
  document.getElementById("name").value = data.name || "";
  document.getElementById("jobTitle").value = data.jobTitle || "";
  document.getElementById("email").value = data.email || "";
  document.getElementById("phone").value = data.phone || "";
  document.getElementById("location").value = data.location || "";
  document.getElementById("website").value = data.website || "";
  document.getElementById("summary").value = data.summary || "";
  document.getElementById("achievements").value = data.achievements || "";
  eduEntries = data.education || [];
  expEntries = data.experience || [];
  projEntries = data.projects || [];
  skills = data.skills || [];
  renderAll();
  renderSkills();
  updatePreview();
}

function clearAll() {
  if (!confirm("Reset everything?")) return;
  ["name", "jobTitle", "email", "phone", "location", "website", "summary", "achievements"].forEach(id => {
    document.getElementById(id).value = "";
  });
  eduEntries = []; expEntries = []; projEntries = []; skills = []; convHistory = [];
  localStorage.removeItem("resumeData");
  renderAll(); renderSkills(); updatePreview(); initChat();
}

/* ═══ EXPORT ═══ */
function downloadJSON() {
  const a = document.createElement("a");
  a.href = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(getResumeData(), null, 2));
  a.download = "resume-data.json";
  a.click();
}

async function downloadPDF() {
  // Ensure all web fonts are fully loaded before rendering to canvas
  if (document.fonts && document.fonts.ready) {
    await document.fonts.ready;
  }

  const { jsPDF } = window.jspdf;
  const resume = document.getElementById('resumePaper');
  // Capture the resume area with html2canvas using high DPI and CORS support
  const canvas = await html2canvas(resume, {
    scale: 3,
    useCORS: true,
    backgroundColor: '#ffffff',
    logging: false,
  });
  const imgData = canvas.toDataURL('image/png');

  // PDF dimensions (A4) in millimetres
  const pdf = new jsPDF('p', 'mm', 'a4');
  const pageWidth = pdf.internal.pageSize.getWidth();
  const pageHeight = pdf.internal.pageSize.getHeight();

  // Calculate image dimensions to fit the page width while preserving aspect ratio
  const imgWidth = pageWidth;
  const imgHeight = (canvas.height * imgWidth) / canvas.width;

  let remainingHeight = imgHeight;
  let position = 0;

  // Add the first page
  pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
  remainingHeight -= pageHeight;

  // If the content exceeds one page, slice the image and add additional pages
  while (remainingHeight > 0) {
    position = - (imgHeight - remainingHeight);
    pdf.addPage();
    pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
    remainingHeight -= pageHeight;
  }

  pdf.save('resume.pdf');
}

/* ═══ CHAT INIT ═══ */
function chipSend(text) {
  document.getElementById("chatInput").value = text;
  sendMessage();
}

function initChat() {
  const messages = document.getElementById("chatMessages");
  messages.innerHTML = `
    <div class="msg msg-ai">
      <div class="msg-avatar">AI</div>
      <div class="msg-bubble">
        <strong>Hey! I'm your AI Resume Coach &#x1F44B;</strong><br><br>
        Tell me about yourself, your education, projects, internships, and skills.
        <br><br>
        <div class="quick-chips">
          <span class="chip" onclick="chipSend('I am a CS student')">I'm a CS student</span>
          <span class="chip" onclick="chipSend('I completed an internship')">I did an internship</span>
          <span class="chip" onclick="chipSend('I built projects using React and Python')">I have projects</span>
          <span class="chip" onclick="chipSend('Help me write a professional summary')">Write summary</span>
        </div>
      </div>
    </div>
  `;
}

/* ═══ FLOATING ASSISTANT ═══ */
function toggleAssistant() {
  const popup = document.getElementById('assistantPopup');
  popup.classList.toggle('open');
}

function assistantAction(view, message) {
  toggleAssistant(); // Close popup
  if (view === 'chat' && message) {
    switchView('chat');
    setTimeout(() => {
      document.getElementById('chatInput').value = message;
      sendMessage();
    }, 300);
  } else if (view === 'templates') {
    switchView('templates');
  } else if (view === 'editor') {
    switchView('editor');
  }
}

// Close popup when clicking outside
document.addEventListener('click', (e) => {
  const popup = document.getElementById('assistantPopup');
  const fab = document.getElementById('fabAssistant');
  if (popup && popup.classList.contains('open') && !popup.contains(e.target) && !fab.contains(e.target)) {
    popup.classList.remove('open');
  }
});

/* ═══ SCROLL ANIMATIONS ═══ */
function initScrollAnimations() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          entry.target.classList.add('animate-in');
        }, i * 60);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -30px 0px' });

  document.querySelectorAll('[data-animate]:not(.animate-in)').forEach(el => {
    observer.observe(el);
  });
}

/* ═══ CUSTOM STYLES CUSTOMIZER ═══ */
function customStyleChanged() {
  const paper = document.getElementById('resumePaper');
  if (!paper) return;

  const accent = document.getElementById('custAccent').value;
  const accent2 = document.getElementById('custAccent2').value;
  const text = document.getElementById('custText').value;
  const paperBg = document.getElementById('custPaperBg').value;
  const headerBg = document.getElementById('custHeaderBg').value;
  const headerText = document.getElementById('custHeaderText').value;
  const font = document.getElementById('custFont').value;
  const fontSize = document.getElementById('custFontSize').value;
  const lineHeight = document.getElementById('custLineHeight').value;
  const divider = document.getElementById('custDivider').value;
  const dividerColor = document.getElementById('custDividerColor').value;

  // Update label indicators
  document.getElementById('fontSizeVal').textContent = fontSize + 'rem';
  document.getElementById('lineHeightVal').textContent = lineHeight;

  // Apply CSS custom properties
  paper.style.setProperty('--tpl-accent', accent);
  paper.style.setProperty('--tpl-accent2', accent2);
  paper.style.setProperty('--tpl-text-color', text);
  paper.style.setProperty('--tpl-paper-bg', paperBg);
  paper.style.setProperty('--tpl-header-bg', headerBg);
  paper.style.setProperty('--tpl-header-text', headerText);
  paper.style.setProperty('--tpl-font-body', font + ', sans-serif');
  paper.style.setProperty('--tpl-font-size', fontSize + 'rem');
  paper.style.setProperty('--tpl-line-height', lineHeight);
  paper.style.setProperty('--tpl-divider-color', dividerColor);

  // Handle complex divider styles
  if (divider === 'thick') {
    paper.style.setProperty('--tpl-divider-style', 'solid');
    paper.style.setProperty('--tpl-divider-width', '3.5px');
  } else if (divider === 'none') {
    paper.style.setProperty('--tpl-divider-style', 'none');
    paper.style.setProperty('--tpl-divider-width', '0px');
  } else {
    paper.style.setProperty('--tpl-divider-style', divider);
    paper.style.setProperty('--tpl-divider-width', '1.5px');
  }

  // Load font if needed dynamically
  if (font && font !== 'Georgia' && font !== 'Times New Roman' && font !== 'Arial' && font !== 'Helvetica Neue') {
    const fontId = 'gfont-' + font.replace(/\s+/g, '-').toLowerCase();
    if (!document.getElementById(fontId)) {
      const link = document.createElement('link');
      link.id = fontId;
      link.rel = 'stylesheet';
      link.href = `https://fonts.googleapis.com/css2?family=${encodeURIComponent(font)}:wght@300;400;500;600;700&display=swap`;
      document.head.appendChild(link);
    }
  }

  // Save values to localStorage
  const overrides = { accent, accent2, text, paperBg, headerBg, headerText, font, fontSize, lineHeight, divider, dividerColor };
  localStorage.setItem('customStyleOverrides', JSON.stringify(overrides));
}

function loadCustomStyleOverrides() {
  const saved = localStorage.getItem('customStyleOverrides');
  if (!saved) return;

  try {
    const overrides = JSON.parse(saved);
    const paper = document.getElementById('resumePaper');
    if (!paper) return;

    if (overrides.accent) {
      const el = document.getElementById('custAccent');
      if (el) el.value = overrides.accent;
      paper.style.setProperty('--tpl-accent', overrides.accent);
    }
    if (overrides.accent2) {
      const el = document.getElementById('custAccent2');
      if (el) el.value = overrides.accent2;
      paper.style.setProperty('--tpl-accent2', overrides.accent2);
    }
    if (overrides.text) {
      const el = document.getElementById('custText');
      if (el) el.value = overrides.text;
      paper.style.setProperty('--tpl-text-color', overrides.text);
    }
    if (overrides.paperBg) {
      const el = document.getElementById('custPaperBg');
      if (el) el.value = overrides.paperBg;
      paper.style.setProperty('--tpl-paper-bg', overrides.paperBg);
    }
    if (overrides.headerBg) {
      const el = document.getElementById('custHeaderBg');
      if (el) el.value = overrides.headerBg;
      paper.style.setProperty('--tpl-header-bg', overrides.headerBg);
    }
    if (overrides.headerText) {
      const el = document.getElementById('custHeaderText');
      if (el) el.value = overrides.headerText;
      paper.style.setProperty('--tpl-header-text', overrides.headerText);
    }
    if (overrides.font) {
      const el = document.getElementById('custFont');
      if (el) el.value = overrides.font;
      paper.style.setProperty('--tpl-font-body', overrides.font + ', sans-serif');
      
      const font = overrides.font;
      if (font && font !== 'Georgia' && font !== 'Times New Roman' && font !== 'Arial' && font !== 'Helvetica Neue') {
        const fontId = 'gfont-' + font.replace(/\s+/g, '-').toLowerCase();
        if (!document.getElementById(fontId)) {
          const link = document.createElement('link');
          link.id = fontId;
          link.rel = 'stylesheet';
          link.href = `https://fonts.googleapis.com/css2?family=${encodeURIComponent(font)}:wght@300;400;500;600;700&display=swap`;
          document.head.appendChild(link);
        }
      }
    }
    if (overrides.fontSize) {
      const el = document.getElementById('custFontSize');
      if (el) el.value = overrides.fontSize;
      document.getElementById('fontSizeVal').textContent = overrides.fontSize + 'rem';
      paper.style.setProperty('--tpl-font-size', overrides.fontSize + 'rem');
    }
    if (overrides.lineHeight) {
      const el = document.getElementById('custLineHeight');
      if (el) el.value = overrides.lineHeight;
      document.getElementById('lineHeightVal').textContent = overrides.lineHeight;
      paper.style.setProperty('--tpl-line-height', overrides.lineHeight);
    }
    if (overrides.divider) {
      const el = document.getElementById('custDivider');
      if (el) el.value = overrides.divider;
      
      if (overrides.divider === 'thick') {
        paper.style.setProperty('--tpl-divider-style', 'solid');
        paper.style.setProperty('--tpl-divider-width', '3.5px');
      } else if (overrides.divider === 'none') {
        paper.style.setProperty('--tpl-divider-style', 'none');
        paper.style.setProperty('--tpl-divider-width', '0px');
      } else {
        paper.style.setProperty('--tpl-divider-style', overrides.divider);
        paper.style.setProperty('--tpl-divider-width', '1.5px');
      }
    }
    if (overrides.dividerColor) {
      const el = document.getElementById('custDividerColor');
      if (el) el.value = overrides.dividerColor;
      paper.style.setProperty('--tpl-divider-color', overrides.dividerColor);
    }
  } catch (e) {
    console.error("Error loading style overrides:", e);
  }
}

function resetToTemplateDefaults() {
  localStorage.removeItem('customStyleOverrides');
  if (typeof applyTemplate === 'function') {
    applyTemplate(currentTemplateId || 1);
  }
}

/* ═══ ESCAPE UTILS ═══ */
function escapeHtml(value) {
  return String(value ?? "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#039;");
}
function escapeAttr(value) { return escapeHtml(value); }

/* ═══ INIT ═══ */
document.addEventListener('DOMContentLoaded', () => {
  initChat();
  initTemplates();
  loadData();
  updatePreview();
  loadCustomStyleOverrides();
  applyZoom(0.85);
  initScrollAnimations();
  if (window.lucide) {
    lucide.createIcons();
  }
});
