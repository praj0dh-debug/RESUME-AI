/* ═══════════════════════════════════════════════════════════════
   ResumeAI — Template Library
   100 resume templates across 10 categories.
   Each template = a set of CSS custom properties applied to .resume-paper
   ═══════════════════════════════════════════════════════════════ */

const TEMPLATE_CATEGORIES = [
  { id: 'all',          label: 'All Templates',  icon: '📋' },
  { id: 'modern',       label: 'Modern',         icon: '✨' },
  { id: 'classic',      label: 'Classic',        icon: '📜' },
  { id: 'minimal',      label: 'Minimal',        icon: '◻️' },
  { id: 'creative',     label: 'Creative',       icon: '🎨' },
  { id: 'bold',         label: 'Bold',           icon: '💪' },
  { id: 'elegant',      label: 'Elegant',        icon: '🌿' },
  { id: 'professional', label: 'Professional',   icon: '💼' },
  { id: 'tech',         label: 'Tech',           icon: '💻' },
  { id: 'academic',     label: 'Academic',       icon: '🎓' },
  { id: 'corporate',    label: 'Corporate',      icon: '🏢' },
];

/* Helper: generate a template object */
function T(id, name, category, accent, accent2, fontBody, fontHead, headerBg, headerText, borderStyle, sectionStyle) {
  return { id, name, category, accent, accent2, fontBody, fontHead, headerBg, headerText, borderStyle, sectionStyle };
}

const RESUME_TEMPLATES = [
  // ═══ MODERN (1-10) ═══
  T(1,   'Indigo Wave',       'modern',       '#4f46e5','#818cf8','DM Sans','Newsreader','#4f46e5','#ffffff','none','line'),
  T(2,   'Ocean Breeze',      'modern',       '#0891b2','#22d3ee','Inter','Inter','#0891b2','#ffffff','none','line'),
  T(3,   'Sunset Glow',       'modern',       '#ea580c','#fb923c','Nunito Sans','Nunito Sans','#ea580c','#ffffff','none','line'),
  T(4,   'Emerald Shift',     'modern',       '#059669','#34d399','DM Sans','DM Sans','#059669','#ffffff','none','line'),
  T(5,   'Rose Quartz',       'modern',       '#e11d48','#fb7185','Inter','Playfair Display','#e11d48','#ffffff','none','line'),
  T(6,   'Violet Dream',      'modern',       '#7c3aed','#a78bfa','Poppins','Poppins','#7c3aed','#ffffff','none','line'),
  T(7,   'Sky Blue',          'modern',       '#2563eb','#60a5fa','Outfit','Outfit','#2563eb','#ffffff','none','line'),
  T(8,   'Mint Fresh',        'modern',       '#0d9488','#5eead4','Rubik','Rubik','#0d9488','#ffffff','none','line'),
  T(9,   'Coral Reef',        'modern',       '#dc2626','#f87171','Source Sans 3','Source Sans 3','#dc2626','#ffffff','none','line'),
  T(10,  'Amber Pulse',       'modern',       '#d97706','#fbbf24','DM Sans','Newsreader','#d97706','#ffffff','none','line'),

  // ═══ CLASSIC (11-20) ═══
  T(11,  'Timeless Serif',    'classic',      '#1a1a2e','#333355','Merriweather','Merriweather','transparent','#1a1a2e','solid','line'),
  T(12,  'Old School',        'classic',      '#2d3748','#4a5568','Georgia','Georgia','transparent','#2d3748','solid','line'),
  T(13,  'Parchment',         'classic',      '#78350f','#92400e','Lora','Lora','transparent','#78350f','double','line'),
  T(14,  'Navy Standard',     'classic',      '#1e3a5f','#2d5f8a','Times New Roman','Times New Roman','transparent','#1e3a5f','solid','line'),
  T(15,  'Burgundy Classic',  'classic',      '#7f1d1d','#991b1b','EB Garamond','EB Garamond','transparent','#7f1d1d','solid','line'),
  T(16,  'Forest Green',      'classic',      '#14532d','#166534','Libre Baskerville','Libre Baskerville','transparent','#14532d','solid','line'),
  T(17,  'Slate Heritage',    'classic',      '#334155','#475569','Source Serif 4','Source Serif 4','transparent','#334155','solid','line'),
  T(18,  'Charcoal',          'classic',      '#1f2937','#374151','Crimson Pro','Crimson Pro','transparent','#1f2937','solid','line'),
  T(19,  'Oxford Blue',       'classic',      '#002147','#003366','Playfair Display','Playfair Display','transparent','#002147','solid','line'),
  T(20,  'Bronze Age',        'classic',      '#7c2d12','#9a3412','Cormorant Garamond','Cormorant Garamond','transparent','#7c2d12','double','line'),

  // ═══ MINIMAL (21-30) ═══
  T(21,  'Pure White',        'minimal',      '#9ca3af','#d1d5db','Inter','Inter','transparent','#111','none','dots'),
  T(22,  'Whisper Gray',      'minimal',      '#6b7280','#9ca3af','DM Sans','DM Sans','transparent','#222','none','none'),
  T(23,  'Soft Mist',         'minimal',      '#a3a3a3','#d4d4d4','Karla','Karla','transparent','#333','none','none'),
  T(24,  'Paper Thin',        'minimal',      '#78716c','#a8a29e','Jost','Jost','transparent','#292524','none','dots'),
  T(25,  'Silent Type',       'minimal',      '#71717a','#a1a1aa','IBM Plex Sans','IBM Plex Sans','transparent','#18181b','none','none'),
  T(26,  'Zen Space',         'minimal',      '#737373','#a3a3a3','Nunito','Nunito','transparent','#171717','none','none'),
  T(27,  'Bare Bones',        'minimal',      '#525252','#737373','Work Sans','Work Sans','transparent','#0a0a0a','none','line'),
  T(28,  'Ghost Print',       'minimal',      '#a8a29e','#d6d3d1','Urbanist','Urbanist','transparent','#1c1917','none','none'),
  T(29,  'Cloud Nine',        'minimal',      '#94a3b8','#cbd5e1','Figtree','Figtree','transparent','#0f172a','none','dots'),
  T(30,  'Mono Clean',        'minimal',      '#6b7280','#9ca3af','JetBrains Mono','JetBrains Mono','transparent','#111827','none','none'),

  // ═══ CREATIVE (31-40) ═══
  T(31,  'Neon Nights',       'creative',     '#8b5cf6','#c084fc','Space Grotesk','Space Grotesk','#1e1b4b','#f5f3ff','none','glow'),
  T(32,  'Cotton Candy',      'creative',     '#ec4899','#f9a8d4','Quicksand','Quicksand','#fdf2f8','#831843','none','line'),
  T(33,  'Tropical',          'creative',     '#f59e0b','#fcd34d','Baloo 2','Baloo 2','#fffbeb','#78350f','none','line'),
  T(34,  'Electric Blue',     'creative',     '#3b82f6','#93c5fd','Comfortaa','Comfortaa','#eff6ff','#1e3a8a','none','glow'),
  T(35,  'Retro Vibes',       'creative',     '#f97316','#fdba74','Righteous','DM Sans','#fff7ed','#7c2d12','dashed','line'),
  T(36,  'Pastel Dream',      'creative',     '#a855f7','#d8b4fe','Lexend','Lexend','#faf5ff','#581c87','none','dots'),
  T(37,  'Cyber Punk',        'creative',     '#22d3ee','#67e8f9','Orbitron','DM Sans','#0c0a09','#ecfeff','none','glow'),
  T(38,  'Garden Path',       'creative',     '#65a30d','#a3e635','Josefin Sans','Josefin Sans','#f7fee7','#365314','none','line'),
  T(39,  'Berry Burst',       'creative',     '#c026d3','#e879f9','Fredoka','DM Sans','#fdf4ff','#701a75','none','dots'),
  T(40,  'Autumn Leaves',     'creative',     '#b45309','#f59e0b','Caveat','DM Sans','#fffbeb','#451a03','none','line'),

  // ═══ BOLD (41-50) ═══
  T(41,  'Power Red',         'bold',         '#dc2626','#ef4444','Montserrat','Montserrat','#dc2626','#ffffff','none','thick'),
  T(42,  'Dark Knight',       'bold',         '#f8fafc','#e2e8f0','Bebas Neue','Inter','#0f172a','#f8fafc','none','thick'),
  T(43,  'Blaze Orange',      'bold',         '#ea580c','#f97316','Oswald','DM Sans','#ea580c','#ffffff','none','thick'),
  T(44,  'Impact Black',      'bold',         '#18181b','#3f3f46','Anton','DM Sans','#18181b','#fafafa','none','thick'),
  T(45,  'Royal Purple',      'bold',         '#7e22ce','#9333ea','Archivo Black','DM Sans','#7e22ce','#ffffff','none','thick'),
  T(46,  'Steel Blue',        'bold',         '#1d4ed8','#2563eb','Teko','Inter','#1d4ed8','#ffffff','none','thick'),
  T(47,  'Carbon Fiber',      'bold',         '#a3a3a3','#d4d4d4','Rajdhani','Rajdhani','#171717','#e5e5e5','none','thick'),
  T(48,  'Hot Pink',          'bold',         '#db2777','#ec4899','Passion One','DM Sans','#db2777','#ffffff','none','thick'),
  T(49,  'Thunder Gold',      'bold',         '#ca8a04','#eab308','Bungee','DM Sans','#713f12','#fef9c3','none','thick'),
  T(50,  'Midnight',          'bold',         '#6366f1','#818cf8','Black Ops One','Inter','#020617','#e0e7ff','none','thick'),

  // ═══ ELEGANT (51-60) ═══
  T(51,  'Rose Gold',         'elegant',      '#be185d','#f9a8d4','Cormorant','Cormorant','transparent','#881337','none','thin'),
  T(52,  'Champagne',         'elegant',      '#a16207','#d4a017','Playfair Display','Playfair Display','transparent','#451a03','none','thin'),
  T(53,  'Pearl White',       'elegant',      '#64748b','#94a3b8','Gilda Display','DM Sans','transparent','#1e293b','none','thin'),
  T(54,  'Ivory Tower',       'elegant',      '#78716c','#a8a29e','Bodoni Moda','DM Sans','transparent','#292524','none','thin'),
  T(55,  'Silver Lining',     'elegant',      '#6b7280','#9ca3af','Fraunces','DM Sans','transparent','#1f2937','none','thin'),
  T(56,  'Lavender Mist',     'elegant',      '#7c3aed','#c4b5fd','DM Serif Display','DM Sans','transparent','#4c1d95','none','thin'),
  T(57,  'Satin Black',       'elegant',      '#44403c','#78716c','Newsreader','Newsreader','transparent','#1c1917','none','thin'),
  T(58,  'Crystal Clear',     'elegant',      '#0e7490','#22d3ee','Lora','Lora','transparent','#164e63','none','thin'),
  T(59,  'Velvet Night',      'elegant',      '#6d28d9','#a78bfa','Spectral','Spectral','transparent','#2e1065','none','thin'),
  T(60,  'Blush',             'elegant',      '#be123c','#fda4af','Rufina','DM Sans','transparent','#881337','none','thin'),

  // ═══ PROFESSIONAL (61-70) ═══
  T(61,  'Executive',         'professional', '#1e40af','#3b82f6','Inter','Inter','#1e40af','#ffffff','none','line'),
  T(62,  'Board Room',        'professional', '#1f2937','#4b5563','Noto Sans','Noto Sans','#1f2937','#f9fafb','none','line'),
  T(63,  'Consultant',        'professional', '#0f766e','#14b8a6','Roboto','Roboto','#0f766e','#ffffff','none','line'),
  T(64,  'Director',          'professional', '#7c2d12','#ea580c','Mukta','Mukta','#7c2d12','#ffffff','none','line'),
  T(65,  'Manager',           'professional', '#334155','#64748b','Open Sans','Open Sans','#334155','#f1f5f9','none','line'),
  T(66,  'VP Standard',       'professional', '#1e3a5f','#3b6fa0','Hind','Hind','#1e3a5f','#ffffff','none','line'),
  T(67,  'Team Lead',         'professional', '#065f46','#10b981','Manrope','Manrope','#065f46','#ffffff','none','line'),
  T(68,  'C-Suite',           'professional', '#111827','#374151','Plus Jakarta Sans','Plus Jakarta Sans','#111827','#f3f4f6','none','line'),
  T(69,  'Analyst',           'professional', '#4338ca','#6366f1','Lato','Lato','#4338ca','#ffffff','none','line'),
  T(70,  'Strategist',        'professional', '#0c4a6e','#0284c7','Barlow','Barlow','#0c4a6e','#ffffff','none','line'),

  // ═══ TECH (71-80) ═══
  T(71,  'Terminal',           'tech',        '#22c55e','#4ade80','JetBrains Mono','JetBrains Mono','#0a0a0a','#22c55e','none','glow'),
  T(72,  'VS Code',            'tech',        '#3b82f6','#60a5fa','Fira Code','Fira Code','#1e1e1e','#d4d4d4','none','line'),
  T(73,  'GitHub',             'tech',        '#f0f6fc','#8b949e','Mona Sans','Mona Sans','#0d1117','#f0f6fc','none','line'),
  T(74,  'Stack Overflow',     'tech',        '#f48024','#fbad55','Inter','Inter','#232629','#e7e8eb','none','line'),
  T(75,  'Material',           'tech',        '#1a73e8','#4285f4','Roboto','Roboto','#1a73e8','#ffffff','none','line'),
  T(76,  'React Blue',         'tech',        '#61dafb','#88e8fc','Source Code Pro','DM Sans','#20232a','#61dafb','none','glow'),
  T(77,  'Node Green',         'tech',        '#339933','#68c368','Ubuntu Mono','Ubuntu','#303030','#f0f0f0','none','line'),
  T(78,  'Python Gold',        'tech',        '#ffd43b','#ffda6b','Space Mono','Space Grotesk','#306998','#ffd43b','none','line'),
  T(79,  'Rust Orange',        'tech',        '#f74c00','#ff7033','IBM Plex Mono','IBM Plex Sans','transparent','#1a1a1a','none','line'),
  T(80,  'Linux Tux',          'tech',        '#d4aa00','#f0c840','Hack','DM Sans','#2b2b2b','#e0e0e0','none','line'),

  // ═══ ACADEMIC (81-90) ═══
  T(81,  'Harvard',            'academic',    '#a51c30','#c8102e','EB Garamond','EB Garamond','transparent','#1c1c1c','solid','line'),
  T(82,  'Cambridge',          'academic',    '#003e74','#005a9e','Cardo','Cardo','transparent','#003e74','solid','line'),
  T(83,  'Stanford',           'academic',    '#8c1515','#b83a3a','Source Serif 4','Source Serif 4','transparent','#2e2d29','solid','line'),
  T(84,  'MIT',                'academic',    '#750014','#990000','Libertinus Serif','DM Sans','transparent','#333333','solid','line'),
  T(85,  'Oxford',             'academic',    '#002147','#003366','Cormorant Garamond','Cormorant Garamond','transparent','#002147','solid','line'),
  T(86,  'Research Paper',     'academic',    '#333333','#555555','Noto Serif','Noto Serif','transparent','#111111','solid','line'),
  T(87,  'Thesis Style',       'academic',    '#1a1a2e','#2d2d4e','Gentium Book Plus','Gentium Book Plus','transparent','#1a1a2e','solid','line'),
  T(88,  'Journal',            'academic',    '#2c3e50','#34495e','Bitter','DM Sans','transparent','#2c3e50','solid','line'),
  T(89,  'Lecture Notes',      'academic',    '#555555','#777777','Literata','Literata','transparent','#222222','none','line'),
  T(90,  'Dissertation',       'academic',    '#1b1b1b','#444444','Alegreya','Alegreya','transparent','#1b1b1b','double','line'),

  // ═══ CORPORATE (91-100) ═══
  T(91,  'McKinsey',           'corporate',   '#004c97','#0071ce','Helvetica Neue','Helvetica Neue','#004c97','#ffffff','none','line'),
  T(92,  'Deloitte',           'corporate',   '#86bc25','#97d700','Open Sans','Open Sans','#000000','#ffffff','none','line'),
  T(93,  'Goldman Sachs',      'corporate',   '#7399c6','#a8c4e0','Georgia','Georgia','transparent','#003a70','solid','line'),
  T(94,  'JP Morgan',          'corporate',   '#003a70','#005695','Libre Franklin','Libre Franklin','#003a70','#ffffff','none','line'),
  T(95,  'BCG Green',          'corporate',   '#00694e','#009a72','Lato','Lato','#00694e','#ffffff','none','line'),
  T(96,  'Accenture',          'corporate',   '#a100ff','#b933ff','Inter','Inter','#a100ff','#ffffff','none','line'),
  T(97,  'EY Yellow',          'corporate',   '#ffe600','#fff033','DM Sans','DM Sans','#2e2e38','#ffe600','none','line'),
  T(98,  'PwC Orange',         'corporate',   '#e0301e','#e85a4f','Arial','Arial','#e0301e','#ffffff','none','line'),
  T(99,  'KPMG Blue',          'corporate',   '#00338d','#1a5cc8','Roboto','Roboto','#00338d','#ffffff','none','line'),
  T(100, 'Bain Red',           'corporate',   '#cc0000','#e62e2e','Noto Sans','Noto Sans','#cc0000','#ffffff','none','line'),
];

/* ── Apply template to resume preview ── */
let currentTemplateId = 1;

function applyTemplate(id, preserveOverrides = false) {
  const t = RESUME_TEMPLATES.find(tpl => tpl.id === id);
  if (!t) return;

  currentTemplateId = id;
  const paper = document.getElementById('resumePaper');

  // Reset classes and add template specific layout category class
  paper.className = 'resume-paper layout-' + t.category;

  // Apply CSS custom properties
  paper.style.setProperty('--tpl-accent', t.accent);
  paper.style.setProperty('--tpl-accent2', t.accent2);
  paper.style.setProperty('--tpl-font-body', t.fontBody + ', sans-serif');
  paper.style.setProperty('--tpl-font-head', t.fontHead + ', serif');
  paper.style.setProperty('--tpl-header-bg', t.headerBg);
  paper.style.setProperty('--tpl-header-text', t.headerText);
  paper.style.setProperty('--tpl-text-color', '#1a1a18');

  // Load Google Font dynamically
  [t.fontBody, t.fontHead].forEach(font => {
    if (!font || font === 'Georgia' || font === 'Times New Roman' || font === 'Arial' || font === 'Helvetica Neue') return;
    const fontId = 'gfont-' + font.replace(/\s+/g, '-').toLowerCase();
    if (!document.getElementById(fontId)) {
      const link = document.createElement('link');
      link.id = fontId;
      link.rel = 'stylesheet';
      link.href = `https://fonts.googleapis.com/css2?family=${encodeURIComponent(font)}:wght@300;400;500;600;700&display=swap`;
      document.head.appendChild(link);
    }
  });

  // Update style customizer toolbar values to match the newly applied template
  const custAccent = document.getElementById('custAccent');
  const custAccent2 = document.getElementById('custAccent2');
  const custText = document.getElementById('custText');
  const custPaperBg = document.getElementById('custPaperBg');
  const custHeaderBg = document.getElementById('custHeaderBg');
  const custHeaderText = document.getElementById('custHeaderText');
  const custFont = document.getElementById('custFont');
  const custFontSize = document.getElementById('custFontSize');
  const custLineHeight = document.getElementById('custLineHeight');
  const custDivider = document.getElementById('custDivider');
  const custDividerColor = document.getElementById('custDividerColor');

  if (custAccent) custAccent.value = t.accent.startsWith('#') ? t.accent : '#4f46e5';
  if (custAccent2) custAccent2.value = t.accent2.startsWith('#') ? t.accent2 : '#818cf8';
  if (custText) custText.value = '#1a1a18';
  if (custPaperBg) custPaperBg.value = '#ffffff';
  if (custHeaderBg) custHeaderBg.value = t.headerBg.startsWith('#') ? t.headerBg : '#ffffff';
  if (custHeaderText) custHeaderText.value = t.headerText.startsWith('#') ? t.headerText : '#111110';
  if (custFont) {
    const optionExists = Array.from(custFont.options).some(opt => opt.value === t.fontBody);
    if (optionExists) custFont.value = t.fontBody;
  }
  if (custFontSize) {
    custFontSize.value = 0.8;
    const fontLbl = document.getElementById('fontSizeVal');
    if (fontLbl) fontLbl.textContent = '0.8rem';
  }
  if (custLineHeight) {
    custLineHeight.value = 1.55;
    const heightLbl = document.getElementById('lineHeightVal');
    if (heightLbl) heightLbl.textContent = '1.55';
  }
  if (custDivider) custDivider.value = 'solid';
  if (custDividerColor) custDividerColor.value = '#e4e4e0';

  // Apply default styles to the paper too
  paper.style.setProperty('--tpl-paper-bg', '#ffffff');
  paper.style.setProperty('--tpl-font-size', '0.8rem');
  paper.style.setProperty('--tpl-line-height', '1.55');
  paper.style.setProperty('--tpl-divider-style', 'solid');
  paper.style.setProperty('--tpl-divider-width', '1.5px');
  paper.style.setProperty('--tpl-divider-color', '#e4e4e0');

  // Clear custom overrides when the user intentionally chooses a new template.
  if (!preserveOverrides) {
    localStorage.removeItem('customStyleOverrides');
  }
  localStorage.setItem('selectedTemplate', id);

  document.querySelectorAll('.tpl-card').forEach(card => {
    card.classList.toggle('active', Number(card.dataset.id) === id);
  });

  const layoutName = document.getElementById('currentLayoutName');
  if (layoutName) {
    layoutName.textContent = t.name;
  }

  if (window.lucide) {
    lucide.createIcons();
  }
}

/* ── Render template grid ── */
function renderTemplateGrid(categoryFilter) {
  const grid = document.getElementById('templateGrid');
  if (!grid) return;

  const filtered = categoryFilter && categoryFilter !== 'all'
    ? RESUME_TEMPLATES.filter(t => t.category === categoryFilter)
    : RESUME_TEMPLATES;

  grid.innerHTML = filtered.map((t, i) => `
    <div class="tpl-card ${t.id === currentTemplateId ? 'active' : ''}"
         data-id="${t.id}"
         onclick="applyTemplate(${t.id})"
         style="animation-delay: ${Math.min(i * 0.03, 0.6)}s">
      <div class="tpl-preview tpl-layout-${t.category}" style="--p-accent:${t.accent}; --p-bg:${t.headerBg}; --p-text:${t.headerText}">
        <div class="tpl-preview-header" style="background:${t.headerBg !== 'transparent' ? t.headerBg : t.accent}">
          <div class="tpl-preview-name" style="color:${t.headerBg !== 'transparent' ? t.headerText : '#fff'}"></div>
          <div class="tpl-preview-title" style="background:${t.headerText}40"></div>
        </div>
        <div class="tpl-preview-body">
          <div class="tpl-preview-line" style="background:${t.accent}"></div>
          <div class="tpl-preview-line short"></div>
          <div class="tpl-preview-line"></div>
          <div class="tpl-preview-line short"></div>
          <div class="tpl-preview-line" style="background:${t.accent}"></div>
          <div class="tpl-preview-line"></div>
        </div>
      </div>
      <div class="tpl-meta">
        <span class="tpl-name">${t.name}</span>
        <span class="tpl-cat">${t.category}</span>
      </div>
    </div>
  `).join('');
}

/* ── Filter templates by category ── */
function filterTemplates(categoryId, btn) {
  document.querySelectorAll('.cat-pill').forEach(p => p.classList.remove('active'));
  if (btn) btn.classList.add('active');
  renderTemplateGrid(categoryId);
}

/* ── Render category pills ── */
function renderCategoryPills() {
  const container = document.getElementById('categoryPills');
  if (!container) return;

  container.innerHTML = TEMPLATE_CATEGORIES.map(c => `
    <button class="cat-pill ${c.id === 'all' ? 'active' : ''}"
            onclick="filterTemplates('${c.id}', this)">
      ${c.label}
    </button>
  `).join('');
}

/* ── Init on load ── */
function initTemplates() {
  renderCategoryPills();
  renderTemplateGrid('all');

  const saved = localStorage.getItem('selectedTemplate');
  applyTemplate(saved ? parseInt(saved) : currentTemplateId, true);
}
