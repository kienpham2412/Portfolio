// Đặt năm hiện tại cho bản quyền footer (nếu có)
const yearEl = document.getElementById('current-year');
if (yearEl) {
  yearEl.textContent = new Date().getFullYear();
}

// Header scroll background effect
const header = document.getElementById('main-header');
if (header) {
  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });
}

// Hiệu ứng các biểu tượng nút bấm DualSense bay lơ lửng trên Canvas
const canvas = document.getElementById('dualsense-canvas');
const ctx = canvas.getContext('2d');
let shapes = [];
let width, height;

// Tọa độ chuột cho tương tác dạt ra khi di chuột lại gần
const mouse = { x: -1000, y: -1000, radius: 140 };

window.addEventListener('mousemove', (e) => {
  mouse.x = e.clientX;
  mouse.y = e.clientY;
});

window.addEventListener('mouseleave', () => {
  mouse.x = -1000;
  mouse.y = -1000;
});

function resizeCanvas() {
  width = canvas.width = window.innerWidth;
  height = canvas.height = window.innerHeight;
}
window.addEventListener('resize', resizeCanvas);
resizeCanvas();

// Cấu hình 4 hình dạng nút bấm DualSense
const SHAPE_TYPES = ['cross', 'circle', 'triangle', 'square'];

// Màu sắc neon đặc trưng của PlayStation
const SHAPE_COLORS = {
  cross: { stroke: '#38bdf8', glow: 'rgba(56, 189, 248, 0.45)' },     // Cyan (X)
  circle: { stroke: '#f43f5e', glow: 'rgba(244, 63, 94, 0.45)' },    // Coral Red (O)
  triangle: { stroke: '#10b981', glow: 'rgba(16, 185, 129, 0.45)' }, // Mint Green (Tam giác)
  square: { stroke: '#ec4899', glow: 'rgba(236, 72, 153, 0.45)' }    // Pink / Magenta (Vuông)
};

class DualSenseShape {
  constructor() {
    this.reset(true);
  }

  reset(initial = false) {
    this.type = SHAPE_TYPES[Math.floor(Math.random() * SHAPE_TYPES.length)];
    this.x = Math.random() * width;
    this.y = initial ? Math.random() * height : height + 35;
    this.size = Math.random() * 16 + 14; // 14px đến 30px
    this.speedY = -(Math.random() * 0.45 + 0.22); // Bay từ từ lên trên
    this.speedX = (Math.random() - 0.5) * 0.3;
    this.angle = Math.random() * Math.PI * 2;
    this.rotSpeed = (Math.random() - 0.5) * 0.015;
    this.wobbleAngle = Math.random() * Math.PI * 2;
    this.wobbleSpeed = Math.random() * 0.02 + 0.008;
    this.opacity = Math.random() * 0.2 + 0.15; // Độ trong suốt dịu mắt
    this.baseOpacity = this.opacity;
    this.lineWidth = 2;
  }

  update() {
    this.y += this.speedY;
    this.x += this.speedX + Math.sin(this.wobbleAngle) * 0.35;
    this.angle += this.rotSpeed;
    this.wobbleAngle += this.wobbleSpeed;

    // Tương tác dạt ra khi chuột đến gần
    const dx = mouse.x - this.x;
    const dy = mouse.y - this.y;
    const dist = Math.sqrt(dx * dx + dy * dy);
    if (dist < mouse.radius) {
      const force = (mouse.radius - dist) / mouse.radius;
      this.x -= (dx / dist) * force * 3.5;
      this.y -= (dy / dist) * force * 3.5;
      this.opacity = Math.min(0.7, this.baseOpacity + force * 0.45);
    } else {
      this.opacity += (this.baseOpacity - this.opacity) * 0.05;
    }

    // Tái tạo lại vị trí khi trôi ra khỏi màn hình
    if (this.y < -40 || this.x < -40 || this.x > width + 40) {
      this.reset(false);
    }
  }

  draw() {
    ctx.save();
    ctx.translate(this.x, this.y);
    ctx.rotate(this.angle);

    // Hiệu ứng lật nghiêng 3D
    const scaleX = Math.cos(this.wobbleAngle * 0.75);
    ctx.scale(scaleX, 1);

    const config = SHAPE_COLORS[this.type];
    ctx.strokeStyle = config.stroke;
    ctx.lineWidth = this.lineWidth;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.globalAlpha = this.opacity;

    ctx.shadowColor = config.glow;
    ctx.shadowBlur = 8;

    const s = this.size;
    const hs = s / 2;

    ctx.beginPath();
    switch (this.type) {
      case 'cross': // DualSense Cross (X)
        ctx.moveTo(-hs, -hs);
        ctx.lineTo(hs, hs);
        ctx.moveTo(hs, -hs);
        ctx.lineTo(-hs, hs);
        break;

      case 'circle': // DualSense Circle (O)
        ctx.arc(0, 0, hs, 0, Math.PI * 2);
        break;

      case 'triangle': // DualSense Triangle (Tam giác)
        const h = (Math.sqrt(3) / 2) * s;
        ctx.moveTo(0, -h * 0.58);
        ctx.lineTo(hs, h * 0.42);
        ctx.lineTo(-hs, h * 0.42);
        ctx.closePath();
        break;

      case 'square': // DualSense Square (Vuông)
        if (ctx.roundRect) {
          ctx.roundRect(-hs, -hs, s, s, 4);
        } else {
          ctx.rect(-hs, -hs, s, s);
        }
        break;
    }
    ctx.stroke();
    ctx.restore();
  }
}

function initShapes() {
  shapes = [];
  const count = Math.min(50, Math.max(22, Math.floor(window.innerWidth / 36)));
  for (let i = 0; i < count; i++) {
    shapes.push(new DualSenseShape());
  }
}
initShapes();

function animate() {
  ctx.clearRect(0, 0, width, height);
  for (let i = 0; i < shapes.length; i++) {
    shapes[i].update();
    shapes[i].draw();
  }
  requestAnimationFrame(animate);
}
animate();

// Đánh dấu mục đang chọn trên Navbar khi cuộn trang
const navLinks = document.querySelectorAll('.nav-links a');

window.addEventListener('scroll', () => {
  let current = '';
  navLinks.forEach((link) => {
    const targetId = link.getAttribute('href');
    if (targetId && targetId.startsWith('#')) {
      const el = document.querySelector(targetId);
      if (el) {
        const targetTop = el.offsetTop - 180;
        if (window.pageYOffset >= targetTop) {
          current = targetId;
        }
      }
    }
  });

  if (current) {
    navLinks.forEach((link) => {
      link.classList.remove('active');
      if (link.getAttribute('href') === current) {
        link.classList.add('active');
      }
    });
  }
});

// Render thông tin cá nhân từ dữ liệu JSON
function renderPersonalInfo(items) {
  const container = document.getElementById('personal-info-container');
  if (!container || !Array.isArray(items)) return;

  container.innerHTML = items
    .map((item) => {
      let valueHtml = '';
      if (item.type === 'email') {
        valueHtml = `<a href="mailto:${item.value}">${item.value}</a>`;
      } else if (item.type === 'phone') {
        valueHtml = `<a href="tel:${item.raw || item.value}">${item.value}</a>`;
      } else if (item.type === 'link') {
        valueHtml = `<a href="${item.url || item.value}" target="_blank" rel="noopener">${item.value}</a>`;
      } else if (item.statusColor) {
        valueHtml = `<span style="color: ${item.statusColor}; font-weight: 600;">${item.value}</span>`;
      } else {
        valueHtml = item.value;
      }

      return `
        <div class="info-item">
          <span class="info-label">${item.label}</span>
          <span class="info-value">${valueHtml}</span>
        </div>
      `;
    })
    .join('');
}

// Render các giai đoạn học vấn từ mảng education trong JSON
function renderEducation(stages) {
  const container = document.getElementById('education-timeline-container');
  if (!container || !Array.isArray(stages)) return;

  container.innerHTML = stages
    .map((stage) => `
      <div class="timeline-item">
        <div class="timeline-dot"></div>
        <span class="timeline-period">${stage.period || ''}</span>
        <h4 class="timeline-degree">${stage.degree || ''}</h4>
        <p class="timeline-school">${stage.school || ''}</p>
        <p class="timeline-desc">${stage.description || stage.desc || ''}</p>
      </div>
    `)
    .join('');
}

// Render các mốc kinh nghiệm làm việc từ mảng experience trong JSON
function renderExperience(experiences) {
  const container = document.getElementById('experience-timeline-container');
  if (!container || !Array.isArray(experiences)) return;

  container.innerHTML = experiences
    .map(
      (exp) => `
      <div class="timeline-item">
        <div class="timeline-dot"></div>
        <span class="timeline-period">${exp.period || ''}</span>
        <h4 class="timeline-degree">${exp.role || exp.position || ''}</h4>
        <p class="timeline-school">${exp.company || ''}</p>
        ${(exp.description || exp.desc) ? `<p class="timeline-desc">${exp.description || exp.desc}</p>` : ''}
      </div>
    `
    )
    .join('');
}

// Render thông tin giới thiệu Hero (lấy tên từ personalInfo, vai trò và mô tả từ hero)
function renderHero(hero, personalInfo) {
  // Lấy họ và tên trực tiếp từ personalInfo
  if (Array.isArray(personalInfo)) {
    const nameItem = personalInfo.find(
      (item) => item.label && item.label.toLowerCase().includes('tên')
    );
    if (nameItem && nameItem.value) {
      const nameEl = document.getElementById('hero-name');
      if (nameEl) nameEl.textContent = nameItem.value;
    }
  }

  if (hero) {
    if (hero.greeting) {
      const el = document.getElementById('hero-greeting');
      if (el) el.textContent = hero.greeting;
    }
    if (hero.bio) {
      const el = document.getElementById('hero-bio');
      if (el) el.textContent = hero.bio;
    }
    if (hero.role || hero.tags) {
      const roleContainer = document.getElementById('hero-role-container');
      if (roleContainer) {
        let html = '';
        if (hero.role) html += `<span>${hero.role}</span>`;
        if (Array.isArray(hero.tags)) {
          html += hero.tags.map((tag) => `<span class="role-tag">${tag}</span>`).join('');
        }
        roleContainer.innerHTML = html;
      }
    }

    // Cập nhật ảnh avatar từ cấu hình hero data
    const avatarSrc = hero.avatar || hero.image || hero.portrait || (typeof PORTFOLIO_DATA !== 'undefined' && (PORTFOLIO_DATA.avatar || PORTFOLIO_DATA.portrait));
    if (avatarSrc) {
      const portraitEl = document.getElementById('user-portrait');
      if (portraitEl) {
        portraitEl.src = avatarSrc;
      }
    }
  }
}

// Render các thẻ số liệu thống kê nhanh (Quick Stats)
function renderStats(stats) {
  const container = document.getElementById('stats-container');
  if (!container || !Array.isArray(stats)) return;

  container.innerHTML = stats
    .map(
      (stat) => `
      <div class="stat-card">
        <div class="stat-num">${stat.value || ''}</div>
        <div class="stat-name">${stat.label || ''}</div>
      </div>
    `
    )
    .join('');
}

// Bộ icon SVG cho các thẻ kỹ năng
const SKILL_ICONS = {
  layers: `<svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="12 2 2 7 12 12 22 7 12 2" /><polyline points="2 17 12 22 22 17" /><polyline points="2 12 12 17 22 12" /></svg>`,
  monitor: `<svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="3" width="20" height="14" rx="2" /><line x1="8" y1="21" x2="16" y2="21" /><line x1="12" y1="17" x2="12" y2="21" /></svg>`,
  tools: `<svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" /></svg>`,
  code: `<svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="16 18 22 12 16 6" /><polyline points="8 6 2 12 8 18" /></svg>`,
  gamepad: `<svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="6" width="20" height="12" rx="2"/><path d="M6 12h4m-2-2v4m7-1h.01m3-2h.01"/></svg>`
};

function getSkillIcon(iconKey) {
  if (!iconKey) return SKILL_ICONS.layers;
  if (typeof iconKey === 'string' && (iconKey.trim().startsWith('<svg') || iconKey.length <= 4)) {
    return iconKey;
  }
  return SKILL_ICONS[iconKey] || SKILL_ICONS.layers;
}

// Render các thẻ kỹ năng & công nghệ (Skills & Tech)
function renderSkills(skills) {
  const container = document.getElementById('skills-container');
  if (!container || !Array.isArray(skills)) return;

  container.innerHTML = skills
    .map((item) => {
      const iconHtml = getSkillIcon(item.icon);
      const tags = item.tags || item.skills || item.tech || [];
      const tagsHtml = Array.isArray(tags)
        ? tags.map((tag) => `<span class="tech-pill">${tag}</span>`).join('')
        : '';

      return `
        <div class="skill-card">
          <div class="skill-icon-wrapper">
            ${iconHtml}
          </div>
          <h3 class="skill-title">${item.title || ''}</h3>
          <p class="skill-desc">${item.description || item.desc || ''}</p>
          <div class="project-tech">
            ${tagsHtml}
          </div>
        </div>
      `;
    })
    .join('');
}

// Render các dự án cá nhân tiêu biểu từ mảng projects trong JSON
function renderProjects(projects) {
  const container = document.getElementById('projects-container');
  if (!container || !Array.isArray(projects)) return;

  container.innerHTML = projects
    .map((project) => {
      const techList = project.tech || project.tags || [];
      const techHtml = Array.isArray(techList)
        ? techList.map((tag) => `<span class="tech-pill">${tag}</span>`).join('')
        : '';

      const linkUrl = project.url || (project.link && project.link.url) || (typeof project.link === 'string' ? project.link : '') || project.linkUrl || '#hero';
      const linkText = (project.link && project.link.text) || project.linkText || 'Tải apk';
      const storeUrl = project.storeUrl || project.store_url || '';
      const categoryBadge = project.category ? `<span class="project-category-badge">${project.category}</span>` : '';
      const roleBadge = project.role ? `<span class="project-role-badge">${project.role}</span>` : '';
      const imageSrc = project.image || project.img || './assets/images/project-cyber.jpg';
      const imageAlt = project.title ? `Dự án ${project.title}` : 'Ảnh dự án';
      const storeAttr = storeUrl ? `data-store-url="${storeUrl}"` : '';
      const tooltipAttr = storeUrl ? `title="Nhấn để mở trang Store (${project.title || ''})"` : '';

      return `
        <article class="project-card ${storeUrl ? 'has-store-url' : ''}" ${storeAttr} ${tooltipAttr}>
          <div class="project-cover">
            ${categoryBadge}
            ${roleBadge}
            <img src="${imageSrc}" alt="${imageAlt}">
          </div>
          <div class="project-body">
            <div class="project-info-area">
              <h3 class="project-title">${project.title || ''}</h3>
              <p class="project-desc">${project.description || project.desc || ''}</p>
              <div class="project-tech">
                ${techHtml}
              </div>
            </div>
            <div class="project-links">
              <a href="${linkUrl}" class="project-btn primary" ${linkUrl.startsWith('http') ? 'target="_blank" rel="noopener"' : ''}>
                ${linkText}
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                  <path d="M5 12h14" />
                  <path d="m12 5 7 7-7 7" />
                </svg>
              </a>
            </div>
          </div>
        </article>
      `;
    })
    .join('');

  // Lắng nghe sự kiện click vào vùng hiển thị project để mở Store URL trên tab mới
  if (!container.dataset.storeBound) {
    container.dataset.storeBound = 'true';
    container.addEventListener('click', (e) => {
      // Bỏ qua nếu click vào nút Tải apk hoặc thẻ liên kết bất kỳ
      if (e.target.closest('.project-links') || e.target.closest('a')) {
        return;
      }
      const card = e.target.closest('.project-card[data-store-url]');
      if (card) {
        const storeUrl = card.getAttribute('data-store-url');
        if (storeUrl) {
          window.open(storeUrl, '_blank', 'noopener,noreferrer');
        }
      }
    });
  }
}

// Render logo / title thương hiệu trên thanh điều hướng
function renderBrand(brand, title) {
  const data = brand || title;
  if (!data) return;

  const badgeEl = document.getElementById('brand-badge') || document.querySelector('#brand-logo .logo-badge');
  const titleEl = document.getElementById('brand-title') || document.querySelector('#brand-logo span');

  if (typeof data === 'string') {
    if (titleEl) titleEl.textContent = data;
    if (badgeEl && data.length > 0) badgeEl.textContent = data.charAt(0).toUpperCase();
  } else if (typeof data === 'object') {
    const titleText = data.title || data.text || data.name || '';
    const badgeText = data.badge !== undefined
      ? data.badge
      : (titleText ? titleText.trim().charAt(0).toUpperCase() : '');

    if (badgeEl && badgeText) badgeEl.textContent = badgeText;
    if (titleEl && titleText) titleEl.textContent = titleText;
  }
}

// Nạp dữ liệu từ assets/data.js (chạy mượt mà trực tiếp trên mọi trình duyệt mà không bị lỗi CORS)
function loadPortfolioData() {
  if (typeof PORTFOLIO_DATA !== 'undefined' && PORTFOLIO_DATA) {
    if (PORTFOLIO_DATA.brand || PORTFOLIO_DATA.title) {
      renderBrand(PORTFOLIO_DATA.brand, PORTFOLIO_DATA.title);
    }
    renderHero(PORTFOLIO_DATA.hero, PORTFOLIO_DATA.personalInfo);
    if (PORTFOLIO_DATA.stats) renderStats(PORTFOLIO_DATA.stats);
    if (PORTFOLIO_DATA.personalInfo) renderPersonalInfo(PORTFOLIO_DATA.personalInfo);
    if (PORTFOLIO_DATA.education) renderEducation(PORTFOLIO_DATA.education);
    if (PORTFOLIO_DATA.experience) renderExperience(PORTFOLIO_DATA.experience);
    if (PORTFOLIO_DATA.skills) renderSkills(PORTFOLIO_DATA.skills);
    if (PORTFOLIO_DATA.projects) renderProjects(PORTFOLIO_DATA.projects);
  } else {
    console.error('Không tìm thấy dữ liệu PORTFOLIO_DATA từ file assets/data.js');
  }
}

// Khởi chạy nạp dữ liệu
loadPortfolioData();

