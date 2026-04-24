// ==================== EFEITOS MODERNOS ULTRA PREMIUM ====================
// Detectar dispositivo móvel
const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
const isTablet = /(tablet|ipad|playbook|silk)|(android(?!.*mobi))/i.test(navigator.userAgent);

// ==================== PARTÍCULAS 3D INTERATIVAS ====================
class Particle3D {
  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.particles = [];
    this.mouse = { x: 0, y: 0 };
    this.init();
    this.animate();
    if (!isMobile) {
      this.addEventListeners();
    }
  }

  init() {
    this.resize();
    // Reduzir partículas em mobile para melhor performance
    let particleCount = 100;
    if (isMobile) particleCount = 30;
    else if (isTablet) particleCount = 50;
    
    for (let i = 0; i < particleCount; i++) {
      this.particles.push({
        x: Math.random() * this.canvas.width,
        y: Math.random() * this.canvas.height,
        z: Math.random() * 1000,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        vz: (Math.random() - 0.5) * 2,
        size: Math.random() * 3 + 1,
        opacity: Math.random() * 0.5 + 0.3
      });
    }
  }

  resize() {
    this.canvas.width = this.canvas.offsetWidth;
    this.canvas.height = this.canvas.offsetHeight;
  }

  addEventListeners() {
    window.addEventListener('resize', () => this.resize());
    
    this.canvas.addEventListener('mousemove', (e) => {
      const rect = this.canvas.getBoundingClientRect();
      this.mouse.x = e.clientX - rect.left;
      this.mouse.y = e.clientY - rect.top;
    });
  }

  animate() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    this.particles.forEach((particle, index) => {
      // Atualizar posição
      particle.x += particle.vx;
      particle.y += particle.vy;
      particle.z += particle.vz;

      // Interação com mouse (apenas desktop)
      if (!isMobile) {
        const dx = this.mouse.x - particle.x;
        const dy = this.mouse.y - particle.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance < 150) {
          const force = (150 - distance) / 150;
          particle.x -= dx * force * 0.03;
          particle.y -= dy * force * 0.03;
        }
      }

      // Limites da tela
      if (particle.x < 0 || particle.x > this.canvas.width) particle.vx *= -1;
      if (particle.y < 0 || particle.y > this.canvas.height) particle.vy *= -1;
      if (particle.z < 0 || particle.z > 1000) particle.vz *= -1;

      // Calcular tamanho e opacidade com base na profundidade
      const scale = 1000 / (1000 + particle.z);
      const size = particle.size * scale;
      const opacity = particle.opacity * scale;

      // Desenhar partícula
      this.ctx.beginPath();
      this.ctx.arc(particle.x, particle.y, size, 0, Math.PI * 2);
      this.ctx.fillStyle = `rgba(255, 255, 255, ${opacity})`;
      this.ctx.fill();

      // Conectar partículas próximas (apenas se não for mobile)
      if (!isMobile) {
        this.particles.forEach((particle2, index2) => {
          if (index !== index2) {
            const dx = particle.x - particle2.x;
            const dy = particle.y - particle2.y;
            const dist = Math.sqrt(dx * dx + dy * dy);

            if (dist < 120) {
              this.ctx.beginPath();
              this.ctx.moveTo(particle.x, particle.y);
              this.ctx.lineTo(particle2.x, particle2.y);
              this.ctx.strokeStyle = `rgba(52, 152, 219, ${(1 - dist / 120) * 0.3})`;
              this.ctx.lineWidth = 0.5;
              this.ctx.stroke();
            }
          }
        });
      }
    });

    requestAnimationFrame(() => this.animate());
  }
}

// ==================== PARALLAX MOUSE ====================
class MouseParallax {
  constructor() {
    this.elements = document.querySelectorAll('.parallax-element');
    // Desabilitar parallax em mobile para melhor performance
    if (!isMobile) {
      this.init();
    }
  }

  init() {
    document.addEventListener('mousemove', (e) => {
      const mouseX = e.clientX / window.innerWidth - 0.5;
      const mouseY = e.clientY / window.innerHeight - 0.5;

      this.elements.forEach((element) => {
        const speed = element.dataset.speed || 0.1;
        const x = mouseX * 100 * speed;
        const y = mouseY * 100 * speed;
        element.style.transform = `translate(${x}px, ${y}px) scale(1.05)`;
      });
    });
  }
}

// ==================== SCROLL ANIMATIONS ====================
class ScrollAnimations {
  constructor() {
    this.init();
  }

  init() {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('aos-animate');
        }
      });
    }, {
      threshold: 0.1
    });

    document.querySelectorAll('[data-aos]').forEach(element => {
      observer.observe(element);
    });
  }
}

// ==================== SMOOTH SCROLL ====================
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const href = this.getAttribute('href');
      if (href === '#') return;
      
      e.preventDefault();
      const target = document.querySelector(href);
      if (target) {
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });
}

// ==================== CURSOR PERSONALIZADO ====================
class CustomCursor {
  constructor() {
    this.cursor = this.createCursor();
    this.follower = this.createFollower();
    this.init();
  }

  createCursor() {
    const cursor = document.createElement('div');
    cursor.className = 'custom-cursor';
    cursor.style.cssText = `
      position: fixed;
      width: 10px;
      height: 10px;
      background: #3498db;
      border-radius: 50%;
      pointer-events: none;
      z-index: 9999;
      mix-blend-mode: difference;
      transition: transform 0.15s ease;
    `;
    document.body.appendChild(cursor);
    return cursor;
  }

  createFollower() {
    const follower = document.createElement('div');
    follower.className = 'cursor-follower';
    follower.style.cssText = `
      position: fixed;
      width: 40px;
      height: 40px;
      border: 2px solid rgba(52, 152, 219, 0.5);
      border-radius: 50%;
      pointer-events: none;
      z-index: 9998;
      transition: all 0.3s ease;
    `;
    document.body.appendChild(follower);
    return follower;
  }

  init() {
    let mouseX = 0, mouseY = 0;
    let followerX = 0, followerY = 0;

    document.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      this.cursor.style.left = mouseX + 'px';
      this.cursor.style.top = mouseY + 'px';
    });

    const animateFollower = () => {
      const dx = mouseX - followerX;
      const dy = mouseY - followerY;
      
      followerX += dx * 0.1;
      followerY += dy * 0.1;
      
      this.follower.style.left = (followerX - 20) + 'px';
      this.follower.style.top = (followerY - 20) + 'px';
      
      requestAnimationFrame(animateFollower);
    };
    
    animateFollower();

    // Efeito hover em elementos interativos
    const interactiveElements = document.querySelectorAll('a, button, .btn-primary, .btn-secondary');
    interactiveElements.forEach(el => {
      el.addEventListener('mouseenter', () => {
        this.cursor.style.transform = 'scale(2)';
        this.follower.style.transform = 'scale(1.5)';
        this.follower.style.borderColor = '#3498db';
      });
      
      el.addEventListener('mouseleave', () => {
        this.cursor.style.transform = 'scale(1)';
        this.follower.style.transform = 'scale(1)';
        this.follower.style.borderColor = 'rgba(52, 152, 219, 0.5)';
      });
    });
  }
}

// ==================== TILT EFFECT EM CARDS ====================
class TiltEffect {
  constructor() {
    // Desabilitar tilt em mobile e tablet
    if (!isMobile && !isTablet) {
      this.init();
    }
  }

  init() {
    const cards = document.querySelectorAll('.stat-card, .especialidade-card');
    
    cards.forEach(card => {
      card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = (y - centerY) / 10;
        const rotateY = (centerX - x) / 10;
        
        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.05, 1.05, 1.05)`;
      });
      
      card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
      });
    });
  }
}

// ==================== CONTADOR ANIMADO ====================
class AnimatedCounter {
  constructor() {
    this.init();
  }

  init() {
    const counters = document.querySelectorAll('[data-count]');
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !entry.target.classList.contains('counted')) {
          this.animateCounter(entry.target);
          entry.target.classList.add('counted');
        }
      });
    });
    
    counters.forEach(counter => observer.observe(counter));
  }

  animateCounter(element) {
    const target = parseInt(element.dataset.count);
    const duration = 2000;
    const step = target / (duration / 16);
    let current = 0;
    
    const timer = setInterval(() => {
      current += step;
      if (current >= target) {
        element.textContent = target.toLocaleString('pt-BR');
        clearInterval(timer);
      } else {
        element.textContent = Math.floor(current).toLocaleString('pt-BR');
      }
    }, 16);
  }
}

// ==================== INICIALIZAÇÃO ====================
document.addEventListener('DOMContentLoaded', () => {
  // Partículas 3D
  const canvas = document.getElementById('particles-canvas');
  if (canvas) {
    new Particle3D(canvas);
  }

  // Parallax do mouse (apenas desktop)
  if (!isMobile) {
    new MouseParallax();
  }

  // Scroll animations
  new ScrollAnimations();

  // Smooth scroll
  initSmoothScroll();

  // Cursor personalizado (apenas desktop)
  // if (!isMobile && !isTablet && window.innerWidth > 768) {
  //   new CustomCursor();
  // }

  // Tilt effect (apenas desktop)
  new TiltEffect();

  // Contador animado
  new AnimatedCounter();

  // Adicionar classe AOS básica
  const style = document.createElement('style');
  style.textContent = `
    [data-aos] {
      opacity: 0;
      transition: opacity 0.8s ease, transform 0.8s ease;
    }
    [data-aos].aos-animate {
      opacity: 1;
    }
    [data-aos="fade-up"] {
      transform: translateY(50px);
    }
    [data-aos="fade-up"].aos-animate {
      transform: translateY(0);
    }
    [data-aos="fade-left"] {
      transform: translateX(50px);
    }
    [data-aos="fade-left"].aos-animate {
      transform: translateX(0);
    }
    [data-aos="fade-right"] {
      transform: translateX(-50px);
    }
    [data-aos="fade-right"].aos-animate {
      transform: translateX(0);
    }
  `;
  document.head.appendChild(style);

  // Otimizações para mobile
  if (isMobile || isTablet) {
    // Desabilitar animações pesadas em mobile
    document.querySelectorAll('.shape').forEach(shape => {
      shape.style.display = 'none';
    });

    // Reduzir opacidade do canvas
    if (canvas) {
      canvas.style.opacity = '0.3';
    }

    // Otimizar touch scrolling
    document.body.style.webkitOverflowScrolling = 'touch';
  }

  console.log('🚀 Efeitos modernos carregados!');
  console.log(`📱 Dispositivo: ${isMobile ? 'Mobile' : isTablet ? 'Tablet' : 'Desktop'}`);
});
