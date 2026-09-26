// Đặt năm hiện tại cho bản quyền footer
document.getElementById('current-year').textContent = new Date().getFullYear();

// Header scroll background effect
const header = document.getElementById('main-header');
window.addEventListener('scroll', () => {
  if (window.scrollY > 40) {
    header.classList.add('scrolled');
  } else {
    header.classList.remove('scrolled');
  }
});

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

// Xử lý gửi Form liên hệ và hiển thị Toast thông báo
const form = document.getElementById('contact-form');
const toast = document.getElementById('toast');

if (form) {
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    if (toast) {
      toast.classList.add('show');
      form.reset();
      setTimeout(() => {
        toast.classList.remove('show');
      }, 4000);
    }
  });
}

// Đánh dấu mục đang chọn trên Navbar khi cuộn trang
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('.nav-links a');

window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach((section) => {
    const sectionTop = section.offsetTop - 150;
    if (window.pageYOffset >= sectionTop) {
      current = section.getAttribute('id');
    }
  });

  navLinks.forEach((link) => {
    link.classList.remove('active');
    if (link.getAttribute('href') === `#${current}`) {
      link.classList.add('active');
    }
  });
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
    if (hero.status) {
      const el = document.getElementById('hero-status');
      if (el) el.textContent = hero.status;
    }
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
  }
}

// Nạp dữ liệu từ data.js (chạy mượt mà trực tiếp trên mọi trình duyệt mà không bị lỗi CORS)
function loadPortfolioData() {
  if (typeof PORTFOLIO_DATA !== 'undefined' && PORTFOLIO_DATA) {
    renderHero(PORTFOLIO_DATA.hero, PORTFOLIO_DATA.personalInfo);
    if (PORTFOLIO_DATA.personalInfo) renderPersonalInfo(PORTFOLIO_DATA.personalInfo);
    if (PORTFOLIO_DATA.education) renderEducation(PORTFOLIO_DATA.education);
  } else {
    console.error('Không tìm thấy dữ liệu PORTFOLIO_DATA từ file data.js');
  }
}

// Khởi chạy nạp dữ liệu
loadPortfolioData();

