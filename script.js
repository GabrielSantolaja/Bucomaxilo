// ==================== MENU MOBILE ====================
const getHookElement = (hookClass, fallbackId) => {
  return document.querySelector(`.${hookClass}`) || document.getElementById(fallbackId);
};

const btnMenu = getHookElement('js-btn-menu', 'btn-menu');
const navLinks = getHookElement('js-nav-links', 'nav-links');

if (btnMenu && navLinks) {
  // Toggle menu mobile
  btnMenu.addEventListener('click', (e) => {
    e.stopPropagation();
    navLinks.classList.toggle('show');
    btnMenu.classList.toggle('active');

    // Prevenir scroll quando menu está aberto
    if (navLinks.classList.contains('show')) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  });

  // Fechar menu ao clicar em um link
  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('show');
      btnMenu.classList.remove('active');
      document.body.style.overflow = '';
    });
  });

  // Fechar menu ao clicar fora dele
  document.addEventListener('click', (e) => {
    if (navLinks.classList.contains('show')) {
      if (!navLinks.contains(e.target) && e.target !== btnMenu && !btnMenu.contains(e.target)) {
        navLinks.classList.remove('show');
        btnMenu.classList.remove('active');
        document.body.style.overflow = '';
      }
    }
  });

  // Fechar menu ao pressionar ESC
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && navLinks.classList.contains('show')) {
      navLinks.classList.remove('show');
      btnMenu.classList.remove('active');
      document.body.style.overflow = '';
    }
  });

  // Fechar menu ao redimensionar tela
  window.addEventListener('resize', () => {
    if (window.innerWidth > 768 && navLinks.classList.contains('show')) {
      navLinks.classList.remove('show');
      btnMenu.classList.remove('active');
      document.body.style.overflow = '';
    }
  });
}

// ==================== TOGGLE SENHA ADMIN ====================
function toggleAdminPassword() {
  const input = document.getElementById('adminPassword');
  const icon = document.getElementById('adminPasswordEyeIcon');
  if (!input || !icon) {
    return;
  }

  if (input.type === 'password') {
    input.type = 'text';
    icon.classList.replace('fa-eye', 'fa-eye-slash');
  } else {
    input.type = 'password';
    icon.classList.replace('fa-eye-slash', 'fa-eye');
  }
}

function openAdminPanelFallback() {
  const panel = document.getElementById('adminPanelIntegrated');
  const integratedReady = window.__adminIntegratedReady === true;

  if (panel && integratedReady) {
    panel.classList.add('show');
    document.body.style.overflow = 'hidden';
    document.body.classList.add('admin-open');

    // Garantir que sempre abra na aba de Blog
    document.querySelectorAll('.admin-tab').forEach((tab) => tab.classList.remove('active'));
    document.querySelectorAll('.admin-tab-content').forEach((content) => content.classList.remove('active'));
    const blogTabButton = document.querySelector('.admin-tab[data-tab="blog"]');
    const blogTabContent = document.getElementById('tabBlog');
    if (blogTabButton) blogTabButton.classList.add('active');
    if (blogTabContent) blogTabContent.classList.add('active');

    if (typeof window.loadAdminPosts === 'function') {
      window.loadAdminPosts();
    }
    return;
  }

  // Fallback sem exigir novo login no admin.html
  localStorage.setItem('adminLoggedIn', 'true');
  sessionStorage.setItem('adminAutologin', 'true');
  window.location.href = 'admin.html';
}

document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('[data-close-modal]').forEach((button) => {
    button.addEventListener('click', () => {
      const modalId = button.getAttribute('data-close-modal');
      if (modalId && typeof window.closeModal === 'function') {
        window.closeModal(modalId);
      }
    });
  });

  // Fallback: garante abertura do modal admin mesmo se o script integrado não carregar.
  const btnAdminMenu = getHookElement('js-admin-menu', 'btnAdminMenu');
  const btnLoginTrigger = getHookElement('js-admin-login-trigger', 'btnLogin');
  const adminModal = document.getElementById('modalLoginAdmin');
  const adminDropdown = document.getElementById('adminDropdown');

  if (btnAdminMenu && adminModal) {
    btnAdminMenu.addEventListener('click', (event) => {
      event.preventDefault();
      event.stopPropagation();
      adminModal.classList.add('show');
    });
  }

  if (btnLoginTrigger && adminModal) {
    btnLoginTrigger.addEventListener('click', (event) => {
      event.preventDefault();
      if (adminDropdown) {
        adminDropdown.classList.remove('show');
      }
      adminModal.classList.add('show');
    });
  }

  // Fallback: evita refresh do form e garante login do admin mesmo com falha no script integrado.
  const adminLoginForm = document.getElementById('adminLoginForm');
  if (adminLoginForm && !adminLoginForm.dataset.fallbackBound) {
    adminLoginForm.dataset.fallbackBound = 'true';
    adminLoginForm.addEventListener('submit', (event) => {
      if (window.__adminIntegratedReady === true) {
        return;
      }

      event.preventDefault();

      const username = (document.getElementById('adminUsername')?.value || '').trim();
      const password = (document.getElementById('adminPassword')?.value || '').trim();
      const errorMessage = document.getElementById('adminErrorMessage');

      if (username === 'Anizzolavojesus' && password === 'bucomaxilofacial2026') {
        if (adminModal) {
          adminModal.classList.remove('show');
        }
        openAdminPanelFallback();
        adminLoginForm.reset();
        return;
      }

      if (errorMessage) {
        errorMessage.classList.add('show');
        setTimeout(() => {
          errorMessage.classList.remove('show');
        }, 3000);
      }
    });
  }

  const adminTogglePassword = getHookElement('js-admin-toggle-password', 'adminTogglePassword');
  if (adminTogglePassword) {
    adminTogglePassword.addEventListener('click', toggleAdminPassword);
  }

  const patientForgotPasswordLink = getHookElement('js-patient-forgot-password', 'patientForgotPasswordLink');
  if (patientForgotPasswordLink) {
    patientForgotPasswordLink.addEventListener('click', (event) => {
      event.preventDefault();
      alert('Entre em contato com a clínica para recuperar sua senha.');
    });
  }

  // Fallback: sair do painel admin mesmo sem handler do script integrado.
  const btnCloseAdmin = document.getElementById('btnCloseAdmin');
  const adminPanel = document.getElementById('adminPanelIntegrated');
  if (btnCloseAdmin && adminPanel && !btnCloseAdmin.dataset.fallbackBound) {
    btnCloseAdmin.dataset.fallbackBound = 'true';
    btnCloseAdmin.addEventListener('click', () => {
      const confirmar = confirm('Deseja sair do painel administrativo?');
      if (!confirmar) return;

      adminPanel.classList.remove('show');
      document.body.style.overflow = 'auto';
      document.body.classList.remove('admin-open');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }
});

// ==================== BOTÃO ADMIN NO MENU MOBILE ====================
document.addEventListener('DOMContentLoaded', () => {
  const btnAdminMenuMobile = getHookElement('js-admin-menu-mobile', 'btnAdminMenuMobile');
  const btnLogin = getHookElement('js-admin-login-trigger', 'btnLogin');
  
  if (btnAdminMenuMobile && btnLogin) {
    btnAdminMenuMobile.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      
      // Fechar menu mobile
      if (navLinks) {
        navLinks.classList.remove('show');
      }
      if (btnMenu) {
        btnMenu.classList.remove('active');
      }
      document.body.style.overflow = '';
      
      // Abrir modal de login
      btnLogin.click();
    });
  }
});

// ==================== SCROLL SUAVE ====================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }
  });
});

// ==================== NAVBAR SCROLL ====================
window.addEventListener('scroll', () => {
  const header = document.querySelector('.header');
  if (window.scrollY > 100) {
    header.classList.add('scrolled');
  } else {
    header.classList.remove('scrolled');
  }
});

// ==================== ANIMAÇÃO AO SCROLL ====================
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
    }
  });
}, observerOptions);

// Observar elementos que devem aparecer ao scroll
document.querySelectorAll('.especialidade-card, .blog-card, .caso-card, .depoimento-item').forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(30px)';
  el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
  observer.observe(el);
});

// ==================== NEWSLETTER ====================
const newsletterForm = document.querySelector('.newsletter-form');

if (newsletterForm) {
  newsletterForm.addEventListener('submit', function(e) {
    e.preventDefault();
    const email = this.querySelector('input[type="email"]').value;
    
    // Aqui você pode adicionar integração com serviço de newsletter
    alert(`Obrigado por se inscrever com o e-mail: ${email}`);
    this.reset();
  });
}

// ==================== SLIDER SIMPLES (DEPOIMENTOS) ====================
let currentSlide = 0;
const depoimentos = document.querySelectorAll('.depoimento-item');

if (depoimentos.length > 0) {
  // Mostrar apenas o primeiro depoimento inicialmente
  depoimentos.forEach((depoimento, index) => {
    if (index !== 0) {
      depoimento.style.display = 'none';
    }
  });
  
  // Auto-rotate depoimentos
  setInterval(() => {
    depoimentos[currentSlide].style.display = 'none';
    currentSlide = (currentSlide + 1) % depoimentos.length;
    depoimentos[currentSlide].style.display = 'block';
  }, 5000); // Mudar a cada 5 segundos
}

// ==================== LOADING ANIMATION ====================
window.addEventListener('load', () => {
  document.body.style.opacity = '0';
  setTimeout(() => {
    document.body.style.transition = 'opacity 0.5s ease';
    document.body.style.opacity = '1';
  }, 100);
});

// ==================== CONTADOR DE ESTATÍSTICAS (OPCIONAL) ====================
function animateCounter(element, start, end, duration) {
  let startTimestamp = null;
  const step = (timestamp) => {
    if (!startTimestamp) startTimestamp = timestamp;
    const progress = Math.min((timestamp - startTimestamp) / duration, 1);
    element.textContent = Math.floor(progress * (end - start) + start);
    if (progress < 1) {
      window.requestAnimationFrame(step);
    }
  };
  window.requestAnimationFrame(step);
}

// ==================== OTIMIZAÇÕES MOBILE ====================
// Detectar dispositivo
const isMobileDevice = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

if (isMobileDevice) {
  // Prevenir zoom duplo-clique
  let lastTouchEnd = 0;
  document.addEventListener('touchend', (event) => {
    const now = Date.now();
    if (now - lastTouchEnd <= 300) {
      event.preventDefault();
    }
    lastTouchEnd = now;
  }, { passive: false });

  // Otimizar scroll
  let ticking = false;
  let lastScrollY = window.scrollY;
  
  window.addEventListener('scroll', () => {
    lastScrollY = window.scrollY;
    if (!ticking) {
      window.requestAnimationFrame(() => {
        // Processar scroll
        ticking = false;
      });
      ticking = true;
    }
  }, { passive: true });

  // Adicionar classe mobile ao body
  document.body.classList.add('mobile-device');
  
  console.log('📱 Otimizações mobile ativadas');
}

// ==================== LAZY LOADING DE IMAGENS ====================
if ('IntersectionObserver' in window) {
  const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        if (img.dataset.src) {
          img.src = img.dataset.src;
          img.removeAttribute('data-src');
        }
        observer.unobserve(img);
      }
    });
  });

  document.querySelectorAll('img[data-src]').forEach(img => {
    imageObserver.observe(img);
  });
}

// ==================== VIEWPORT HEIGHT FIX (iOS Safari) ====================
const setVH = () => {
  const vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty('--vh', `${vh}px`);
};

setVH();
window.addEventListener('resize', setVH);
window.addEventListener('orientationchange', setVH);

// ==================== PERFORMANCE MONITORING ====================
if (window.performance && window.performance.timing) {
  window.addEventListener('load', () => {
    setTimeout(() => {
      const perfData = window.performance.timing;
      const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
      console.log(`⚡ Tempo de carregamento: ${pageLoadTime}ms`);
    }, 0);
  });
}
// ==================== VALIDAÇÃO DE TELEFONE ====================
const telefoneInput = document.querySelector('input[name="telefone"]');

if (telefoneInput) {
  telefoneInput.addEventListener('input', function(e) {
    let value = e.target.value.replace(/\D/g, '');
    
    if (value.length <= 11) {
      if (value.length > 6) {
        value = value.replace(/^(\d{2})(\d{5})(\d{0,4}).*/, '($1) $2-$3');
      } else if (value.length > 2) {
        value = value.replace(/^(\d{2})(\d{0,5})/, '($1) $2');
      } else if (value.length > 0) {
        value = value.replace(/^(\d*)/, '($1');
      }
    }
    
    e.target.value = value;
  });
}

console.log('Site carregado com sucesso! 🚀');
