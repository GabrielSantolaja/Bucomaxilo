// ==================== MENU MOBILE ====================
const btnMenu = document.getElementById('btn-menu');
const navLinks = document.getElementById('nav-links');

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
  if (input.type === 'password') {
    input.type = 'text';
    icon.classList.replace('fa-eye', 'fa-eye-slash');
  } else {
    input.type = 'password';
    icon.classList.replace('fa-eye-slash', 'fa-eye');
  }
}

// ==================== BOTÃO ADMIN NO MENU MOBILE ====================
document.addEventListener('DOMContentLoaded', () => {
  const btnAdminMenuMobile = document.getElementById('btnAdminMenuMobile');
  const btnLogin = document.getElementById('btnLogin');
  
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

const WHATSAPP_NUMBER = '5511953415380';
const WHATSAPP_NOME_STORAGE_KEY = 'nomePacienteWhatsapp';

function salvarNomePaciente(nome) {
  const nomeLimpo = String(nome || '').trim();
  if (!nomeLimpo) return;
  localStorage.setItem(WHATSAPP_NOME_STORAGE_KEY, nomeLimpo);
}

function obterNomePaciente({ permitirPrompt = true } = {}) {
  const nomeSalvo = (localStorage.getItem(WHATSAPP_NOME_STORAGE_KEY) || '').trim();
  if (nomeSalvo) {
    return nomeSalvo;
  }

  if (!permitirPrompt) {
    return '';
  }

  const nomeDigitado = prompt('Para iniciar o contato, informe seu nome:');
  const nomeLimpo = String(nomeDigitado || '').trim();
  if (!nomeLimpo) {
    return '';
  }

  salvarNomePaciente(nomeLimpo);
  return nomeLimpo;
}

function montarMensagemWhatsapp(nomePaciente, complemento = '') {
  const abertura = `Olá Dr. Anizzolavo, me chamo ${nomePaciente} e gostaria de agendar uma consulta.`;
  const complementoLimpo = String(complemento || '').trim();
  return complementoLimpo ? `${abertura}\n\n${complementoLimpo}` : abertura;
}

function abrirWhatsappContato(complemento = '', nomeInformado = '') {
  const nomePaciente = String(nomeInformado || '').trim() || obterNomePaciente();
  if (!nomePaciente) {
    return false;
  }

  salvarNomePaciente(nomePaciente);
  const mensagem = montarMensagemWhatsapp(nomePaciente, complemento);
  const mensagemCodificada = encodeURIComponent(mensagem);
  window.open(`https://api.whatsapp.com/send?phone=${WHATSAPP_NUMBER}&text=${mensagemCodificada}`, '_blank');
  return true;
}

document.addEventListener('DOMContentLoaded', () => {
  const linksContatoWhatsapp = document.querySelectorAll(`a[href*="api.whatsapp.com/send?phone=${WHATSAPP_NUMBER}"]`);

  linksContatoWhatsapp.forEach((link) => {
    link.addEventListener('click', (event) => {
      event.preventDefault();
      abrirWhatsappContato();
    });
  });
});

// ==================== FORMULÁRIO DE CONTATO ====================
const formContato = document.getElementById('formContato');

if (formContato) {
  formContato.addEventListener('submit', function(e) {
    e.preventDefault();

    // Pegar valores do formulário
    const nome = formContato.querySelector('[name="nome"]').value;

    salvarNomePaciente(nome);
    abrirWhatsappContato('', nome);

    // Limpar formulário
    formContato.reset();

    // Mensagem de sucesso
    alert('Mensagem enviada! Você será redirecionado para o WhatsApp.');
  });
}

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

// ==================== CARROSSEL DE VIDEOS ====================
document.addEventListener('DOMContentLoaded', () => {
  const videoCarousel = document.getElementById('videoCarousel');
  const videoPrev = document.getElementById('videoPrev');
  const videoNext = document.getElementById('videoNext');

  if (videoCarousel && videoPrev && videoNext) {
    const scrollAmount = () => {
      const card = videoCarousel.querySelector('.video-card');
      return card ? card.offsetWidth + 25 : 325;
    };

    const scrollPrev = () => {
      videoCarousel.scrollBy({ left: -scrollAmount(), behavior: 'smooth' });
    };

    const scrollNext = () => {
      videoCarousel.scrollBy({ left: scrollAmount(), behavior: 'smooth' });
    };

    videoPrev.addEventListener('click', (e) => {
      e.preventDefault();
      scrollPrev();
    });

    videoNext.addEventListener('click', (e) => {
      e.preventDefault();
      scrollNext();
    });

    let touchStartX = 0;
    let touchStartY = 0;
    let touchEndX = 0;
    let touchEndY = 0;

    videoCarousel.addEventListener('touchstart', (event) => {
      if (!event.touches || event.touches.length === 0) return;
      touchStartX = event.touches[0].clientX;
      touchStartY = event.touches[0].clientY;
    }, { passive: true });

    videoCarousel.addEventListener('touchend', (event) => {
      if (!event.changedTouches || event.changedTouches.length === 0) return;
      touchEndX = event.changedTouches[0].clientX;
      touchEndY = event.changedTouches[0].clientY;

      const deltaX = touchEndX - touchStartX;
      const deltaY = touchEndY - touchStartY;
      const minSwipeDistance = 50;

      if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > minSwipeDistance) {
        if (deltaX > 0) {
          scrollPrev();
        } else {
          scrollNext();
        }
      }
    }, { passive: true });
  }
});

document.addEventListener('DOMContentLoaded', () => {
  const apneaQuizStart = document.getElementById('apneaQuizStart');
  const apneaQuizIntro = document.getElementById('apneaQuizIntro');
  const apneaQuizStep = document.getElementById('apneaQuizStep');
  const apneaQuizResult = document.getElementById('apneaQuizResult');
  const apneaQuestionText = document.getElementById('apneaQuestionText');
  const apneaOptions = document.getElementById('apneaOptions');
  const apneaQuizProgress = document.getElementById('apneaQuizProgress');
  const apneaQuizError = document.getElementById('apneaQuizError');
  const apneaPrevBtn = document.getElementById('apneaPrevBtn');
  const apneaRetryBtn = document.getElementById('apneaRetryBtn');
  const apneaScore = document.getElementById('apneaScore');
  const apneaRiskText = document.getElementById('apneaRiskText');
  const apneaWhatsappBtn = document.getElementById('apneaWhatsappBtn');

  if (!apneaQuizStart || !apneaQuizIntro || !apneaQuizStep || !apneaQuizResult || !apneaQuestionText || !apneaOptions || !apneaQuizProgress || !apneaQuizError || !apneaPrevBtn || !apneaRetryBtn || !apneaScore || !apneaRiskText || !apneaWhatsappBtn) {
    return;
  }

  const perguntas = [
    'Você ronca alto com frequência?',
    'Alguém já percebeu pausas na sua respiração durante o sono?',
    'Você acorda cansado(a), mesmo dormindo várias horas?',
    'Você sente sonolência durante o dia?',
    'Você acorda com dor de cabeça pela manhã?',
    'Você tem alguma das doenças a seguir: Pressão alta, aumento do colesterol, diabetes?'
  ];

  let perguntaAtual = 0;
  const respostas = new Array(perguntas.length).fill(null);

  const avancarFluxoQuiz = () => {
    if (perguntaAtual === perguntas.length - 1) {
      finalizarQuiz();
      return;
    }

    perguntaAtual += 1;
    renderizarPergunta();
  };

  const renderizarPergunta = () => {
    const indiceHumano = perguntaAtual + 1;
    apneaQuizProgress.textContent = `Pergunta ${indiceHumano} de ${perguntas.length}`;
    apneaQuestionText.textContent = perguntas[perguntaAtual];

    apneaOptions.innerHTML = `
      <label class="quiz-option ${respostas[perguntaAtual] === 1 ? 'selected' : ''}">
        <input type="radio" name="apneaResposta" value="1" ${respostas[perguntaAtual] === 1 ? 'checked' : ''}>
        Sim
      </label>
      <label class="quiz-option ${respostas[perguntaAtual] === 0 ? 'selected' : ''}">
        <input type="radio" name="apneaResposta" value="0" ${respostas[perguntaAtual] === 0 ? 'checked' : ''}>
        Não
      </label>
    `;

    const radios = apneaOptions.querySelectorAll('input[name="apneaResposta"]');
    radios.forEach((radio) => {
      radio.addEventListener('change', () => {
        apneaOptions.querySelectorAll('.quiz-option').forEach((opcao) => {
          opcao.classList.remove('selected');
        });
        if (radio.checked) {
          radio.closest('.quiz-option')?.classList.add('selected');
          apneaQuizError.style.display = 'none';
          respostas[perguntaAtual] = Number(radio.value);
          setTimeout(() => {
            avancarFluxoQuiz();
          }, 200);
        }
      });
    });

    apneaPrevBtn.style.visibility = perguntaAtual === 0 ? 'hidden' : 'visible';
    apneaQuizError.style.display = 'none';
  };

  const finalizarQuiz = () => {
    const total = respostas.reduce((acc, valor) => acc + Number(valor), 0);
    const porcentagem = Math.round((total / perguntas.length) * 100);

    let classificacao = 'baixo';
    if (porcentagem > 60) {
      classificacao = 'alto';
    } else if (porcentagem > 30) {
      classificacao = 'moderado';
    }

    apneaScore.textContent = `${porcentagem}%`;
    apneaRiskText.textContent = `Seu resultado indica risco ${classificacao} para apneia do sono. Este quiz é apenas informativo e não substitui avaliação clínica.`;

    const mensagem = `Olá! Fiz o quiz de apneia do sono no site e meu resultado foi ${porcentagem}% (risco ${classificacao}). Quero fazer uma avaliação.`;
    apneaWhatsappBtn.href = `https://api.whatsapp.com/send?phone=5511953415380&text=${encodeURIComponent(mensagem)}`;

    apneaQuizStep.style.display = 'none';
    apneaQuizResult.style.display = 'block';
    apneaQuizResult.scrollIntoView({ behavior: 'smooth', block: 'center' });
  };

  apneaQuizStart.addEventListener('click', () => {
    apneaQuizIntro.style.display = 'none';
    apneaQuizResult.style.display = 'none';
    apneaQuizStep.style.display = 'block';
    perguntaAtual = 0;
    respostas.fill(null);
    renderizarPergunta();
  });

  apneaPrevBtn.addEventListener('click', () => {
    if (perguntaAtual > 0) {
      perguntaAtual -= 1;
      renderizarPergunta();
    }
  });

  apneaRetryBtn.addEventListener('click', () => {
    apneaQuizResult.style.display = 'none';
    apneaQuizStep.style.display = 'none';
    apneaQuizIntro.style.display = 'block';
    perguntaAtual = 0;
    respostas.fill(null);
    apneaQuizError.style.display = 'none';
    apneaQuizIntro.scrollIntoView({ behavior: 'smooth', block: 'center' });
  });
});

document.addEventListener('DOMContentLoaded', () => {
  const beforeAfterVideo = document.getElementById('beforeAfterVideoMain');

  if (!beforeAfterVideo) {
    return;
  }

  beforeAfterVideo.muted = true;
  beforeAfterVideo.loop = true;
  beforeAfterVideo.autoplay = true;
  beforeAfterVideo.playsInline = true;

  const tryPlay = () => {
    const playPromise = beforeAfterVideo.play();
    if (playPromise && typeof playPromise.catch === 'function') {
      playPromise.catch(() => {});
    }
  };

  beforeAfterVideo.addEventListener('loadedmetadata', () => {
    if (beforeAfterVideo.currentTime < 0.1) {
      beforeAfterVideo.currentTime = 0.1;
    }
  });

  beforeAfterVideo.addEventListener('loadeddata', () => {
    if (!beforeAfterVideo.videoWidth || !beforeAfterVideo.videoHeight) {
      tryPlay();
      return;
    }

    const canvas = document.createElement('canvas');
    canvas.width = beforeAfterVideo.videoWidth;
    canvas.height = beforeAfterVideo.videoHeight;

    const ctx = canvas.getContext('2d');
    if (ctx) {
      ctx.drawImage(beforeAfterVideo, 0, 0, canvas.width, canvas.height);
      beforeAfterVideo.setAttribute('poster', canvas.toDataURL('image/jpeg', 0.85));
    }

    tryPlay();
  });

  beforeAfterVideo.addEventListener('canplay', tryPlay);
  tryPlay();
});
