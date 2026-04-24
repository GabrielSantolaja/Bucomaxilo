// ==================== SISTEMA DE AVALIAÇÕES ==================== 

// ==================== ELEMENTOS DOM ====================
let btnDeixarAvaliacao, modalAvaliacao, formAvaliacao;
let ratingStars, avaliacaoRating;
let depoimentosAprovados, listaAvaliacoes;
let filterBtns;

// ==================== INICIALIZAR ====================
document.addEventListener('DOMContentLoaded', () => {
  initAvaliacoes();
  loadDepoimentosPublicos();
});

function initAvaliacoes() {
  btnDeixarAvaliacao = document.getElementById('btnDeixarAvaliacao');
  modalAvaliacao = document.getElementById('modalAvaliacao');
  formAvaliacao = document.getElementById('formAvaliacao');
  ratingStars = document.getElementById('ratingStars');
  avaliacaoRating = document.getElementById('avaliacaoRating');
  depoimentosAprovados = document.getElementById('depoimentosAprovados');
  listaAvaliacoes = document.getElementById('listaAvaliacoes');
  
  if (btnDeixarAvaliacao) {
    btnDeixarAvaliacao.addEventListener('click', () => {
      modalAvaliacao.classList.add('show');
    });
  }
  
  // Sistema de estrelas
  if (ratingStars) {
    const stars = ratingStars.querySelectorAll('i');
    stars.forEach(star => {
      star.addEventListener('click', () => {
        const rating = parseInt(star.dataset.rating);
        avaliacaoRating.value = rating;
        
        stars.forEach((s, index) => {
          if (index < rating) {
            s.classList.remove('far');
            s.classList.add('fas', 'active');
          } else {
            s.classList.remove('fas', 'active');
            s.classList.add('far');
          }
        });
      });
      
      star.addEventListener('mouseenter', () => {
        const rating = parseInt(star.dataset.rating);
        stars.forEach((s, index) => {
          if (index < rating) {
            s.classList.add('fas');
            s.classList.remove('far');
          }
        });
      });
    });
    
    ratingStars.addEventListener('mouseleave', () => {
      const currentRating = parseInt(avaliacaoRating.value) || 0;
      stars.forEach((s, index) => {
        if (index < currentRating) {
          s.classList.add('fas', 'active');
          s.classList.remove('far');
        } else {
          s.classList.remove('fas', 'active');
          s.classList.add('far');
        }
      });
    });
  }
  
  // Enviar avaliação
  if (formAvaliacao) {
    formAvaliacao.addEventListener('submit', (e) => {
      e.preventDefault();
      enviarAvaliacao();
    });
  }
  
  // Filtros admin
  filterBtns = document.querySelectorAll('.filter-btn');
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const filter = btn.dataset.filter;
      loadAvaliacoesAdmin(filter);
    });
  });
}

// ==================== ENVIAR AVALIAÇÃO ====================
function enviarAvaliacao() {
  const rating = avaliacaoRating.value;
  const nome = document.getElementById('avaliacaoNome').value;
  const email = document.getElementById('avaliacaoEmail').value;
  const comentario = document.getElementById('avaliacaoComentario').value;
  const autorizar = document.getElementById('avaliacaoAutorizar').checked;
  
  if (!rating) {
    alert('Por favor, selecione uma avaliação com estrelas!');
    return;
  }
  
  if (!autorizar) {
    alert('Você precisa autorizar a publicação da avaliação!');
    return;
  }
  
  const avaliacao = {
    id: Date.now().toString(),
    rating: parseInt(rating),
    nome: nome,
    email: email,
    comentario: comentario,
    data: new Date().toLocaleDateString('pt-BR'),
    timestamp: Date.now(),
    status: 'pendente' // pendente, aprovada, reprovada
  };
  
  // Salvar no localStorage
  let avaliacoes = JSON.parse(localStorage.getItem('avaliacoes')) || [];
  avaliacoes.unshift(avaliacao);
  localStorage.setItem('avaliacoes', JSON.stringify(avaliacoes));
  
  // Fechar modal e resetar form
  closeModal('modalAvaliacao');
  formAvaliacao.reset();
  
  // Resetar estrelas
  const stars = ratingStars.querySelectorAll('i');
  stars.forEach(s => {
    s.classList.remove('fas', 'active');
    s.classList.add('far');
  });
  avaliacaoRating.value = '';
  
  // Mensagem de sucesso
  alert('Obrigado pela sua avaliação!\n\nSua avaliação será analisada e publicada em breve.');
}

// ==================== CARREGAR DEPOIMENTOS PÚBLICOS ====================
function loadDepoimentosPublicos() {
  if (!depoimentosAprovados) return;
  
  const avaliacoes = JSON.parse(localStorage.getItem('avaliacoes')) || [];
  const aprovadas = avaliacoes.filter(a => a.status === 'aprovada');
  
  if (aprovadas.length === 0) {
    // Depoimentos padrão
    depoimentosAprovados.innerHTML = `
      <div class="depoimento-card">
        <i class="fas fa-quote-left quote-icon"></i>
        <div class="depoimento-rating">
          <i class="fas fa-star"></i>
          <i class="fas fa-star"></i>
          <i class="fas fa-star"></i>
          <i class="fas fa-star"></i>
          <i class="fas fa-star"></i>
        </div>
        <p class="depoimento-texto">
          Excelente profissional! A cirurgia ortognática mudou minha vida. 
          Além de melhorar minha estética, consegui resolver problemas de respiração e mastigação.
        </p>
        <div class="depoimento-autor">
          <strong>Maria Silva</strong>
          <span class="depoimento-data">15/11/2025</span>
        </div>
      </div>
      
      <div class="depoimento-card">
        <i class="fas fa-quote-left quote-icon"></i>
        <div class="depoimento-rating">
          <i class="fas fa-star"></i>
          <i class="fas fa-star"></i>
          <i class="fas fa-star"></i>
          <i class="fas fa-star"></i>
          <i class="fas fa-star"></i>
        </div>
        <p class="depoimento-texto">
          Após anos sofrendo com dores na ATM, finalmente encontrei um tratamento eficaz. 
          Dr. muito competente e atencioso. Recomendo!
        </p>
        <div class="depoimento-autor">
          <strong>João Santos</strong>
          <span class="depoimento-data">10/11/2025</span>
        </div>
      </div>
      
      <div class="depoimento-card">
        <i class="fas fa-quote-left quote-icon"></i>
        <div class="depoimento-rating">
          <i class="fas fa-star"></i>
          <i class="fas fa-star"></i>
          <i class="fas fa-star"></i>
          <i class="fas fa-star"></i>
          <i class="fas fa-star"></i>
        </div>
        <p class="depoimento-texto">
          Atendimento impecável! Toda a equipe é muito profissional e atenciosa. 
          Estou muito satisfeito com os resultados.
        </p>
        <div class="depoimento-autor">
          <strong>Ana Paula</strong>
          <span class="depoimento-data">05/11/2025</span>
        </div>
      </div>
    `;
    return;
  }
  
  // Mostrar avaliações aprovadas
  depoimentosAprovados.innerHTML = aprovadas.map(avaliacao => {
    const starsHTML = Array(5).fill(0).map((_, i) => 
      `<i class="fas fa-star" style="${i >= avaliacao.rating ? 'color: #ddd;' : ''}"></i>`
    ).join('');
    
    return `
      <div class="depoimento-card">
        <i class="fas fa-quote-left quote-icon"></i>
        <div class="depoimento-rating">
          ${starsHTML}
        </div>
        <p class="depoimento-texto">${avaliacao.comentario}</p>
        <div class="depoimento-autor">
          <strong>${avaliacao.nome}</strong>
          <span class="depoimento-data">${avaliacao.data}</span>
        </div>
      </div>
    `;
  }).join('');
}

// ==================== CARREGAR AVALIAÇÕES ADMIN ====================
function loadAvaliacoesAdmin(filter = 'pendentes') {
  if (!listaAvaliacoes) return;
  
  const avaliacoes = JSON.parse(localStorage.getItem('avaliacoes')) || [];
  
  // Filtrar
  let filtered = avaliacoes;
  if (filter !== 'todas') {
    if (filter === 'pendentes') filtered = avaliacoes.filter(a => a.status === 'pendente');
    if (filter === 'aprovadas') filtered = avaliacoes.filter(a => a.status === 'aprovada');
    if (filter === 'reprovadas') filtered = avaliacoes.filter(a => a.status === 'reprovada');
  }
  
  // Atualizar contadores
  updateContadores(avaliacoes);
  
  if (filtered.length === 0) {
    listaAvaliacoes.innerHTML = `
      <div class="empty-avaliacoes">
        <i class="fas fa-star"></i>
        <p>Nenhuma avaliação ${filter !== 'todas' ? filter : 'encontrada'}.</p>
      </div>
    `;
    return;
  }
  
  listaAvaliacoes.innerHTML = filtered.map(avaliacao => {
    const starsHTML = Array(5).fill(0).map((_, i) => 
      `<i class="fas fa-star" style="${i >= avaliacao.rating ? 'color: #ddd;' : ''}"></i>`
    ).join('');
    
    const statusText = {
      pendente: 'Pendente',
      aprovada: 'Aprovada',
      reprovada: 'Reprovada'
    };
    
    return `
      <div class="avaliacao-admin-item ${avaliacao.status}">
        <div class="avaliacao-header">
          <div class="avaliacao-info">
            <h4>${avaliacao.nome}</h4>
            <small>${avaliacao.email || 'Sem e-mail'} | ${avaliacao.data}</small>
          </div>
          <span class="avaliacao-status ${avaliacao.status}">
            ${statusText[avaliacao.status]}
          </span>
        </div>
        
        <div class="avaliacao-rating-admin">
          ${starsHTML}
        </div>
        
        <div class="avaliacao-texto-admin">
          ${avaliacao.comentario}
        </div>
        
        <div class="avaliacao-actions">
          ${avaliacao.status !== 'aprovada' ? `
            <button class="btn-aprovar" onclick="aprovarAvaliacao('${avaliacao.id}')">
              <i class="fas fa-check"></i> Aprovar
            </button>
          ` : ''}
          ${avaliacao.status !== 'reprovada' ? `
            <button class="btn-reprovar" onclick="reprovarAvaliacao('${avaliacao.id}')">
              <i class="fas fa-times"></i> Reprovar
            </button>
          ` : ''}
          <button class="btn-excluir-avaliacao" onclick="excluirAvaliacao('${avaliacao.id}')">
            <i class="fas fa-trash"></i> Excluir
          </button>
        </div>
      </div>
    `;
  }).join('');
}

// ==================== ATUALIZAR CONTADORES ====================
function updateContadores(avaliacoes) {
  const pendentes = avaliacoes.filter(a => a.status === 'pendente').length;
  const aprovadas = avaliacoes.filter(a => a.status === 'aprovada').length;
  const reprovadas = avaliacoes.filter(a => a.status === 'reprovada').length;
  
  const countPendentes = document.getElementById('countPendentes');
  const countAprovadas = document.getElementById('countAprovadas');
  const countReprovadas = document.getElementById('countReprovadas');
  const countTodas = document.getElementById('countTodas');
  
  if (countPendentes) countPendentes.textContent = pendentes;
  if (countAprovadas) countAprovadas.textContent = aprovadas;
  if (countReprovadas) countReprovadas.textContent = reprovadas;
  if (countTodas) countTodas.textContent = avaliacoes.length;

  // Badge na aba
  const tabBadge = document.getElementById('tabBadgeAvaliacoes');
  if (tabBadge) {
    if (pendentes > 0) {
      tabBadge.textContent = '(' + pendentes + ')';
      tabBadge.style.display = 'inline';
    } else {
      tabBadge.style.display = 'none';
    }
  }
}

// ==================== APROVAR AVALIAÇÃO ====================
function aprovarAvaliacao(id) {
  let avaliacoes = JSON.parse(localStorage.getItem('avaliacoes')) || [];
  const index = avaliacoes.findIndex(a => a.id === id);
  
  if (index !== -1) {
    const nomeCliente = avaliacoes[index].nome;
    
    avaliacoes[index].status = 'aprovada';
    localStorage.setItem('avaliacoes', JSON.stringify(avaliacoes));
    
    const activeFilter = document.querySelector('.filter-btn.active');
    const filter = activeFilter ? activeFilter.dataset.filter : 'pendentes';
    loadAvaliacoesAdmin(filter);
    loadDepoimentosPublicos();
    
    // Mensagem de sucesso
    mostrarNotificacao(`✅ Avaliação de ${nomeCliente} aprovada e publicada no site!`, 'success');
  }
}

// ==================== REPROVAR AVALIAÇÃO ====================
function reprovarAvaliacao(id) {
  let avaliacoes = JSON.parse(localStorage.getItem('avaliacoes')) || [];
  const index = avaliacoes.findIndex(a => a.id === id);
  
  if (index !== -1) {
    const confirmar = confirm('Tem certeza que deseja reprovar esta avaliação?');
    
    if (confirmar) {
      const nomeCliente = avaliacoes[index].nome;
      
      avaliacoes[index].status = 'reprovada';
      localStorage.setItem('avaliacoes', JSON.stringify(avaliacoes));
      
      const activeFilter = document.querySelector('.filter-btn.active');
      const filter = activeFilter ? activeFilter.dataset.filter : 'pendentes';
      loadAvaliacoesAdmin(filter);
      loadDepoimentosPublicos();
      
      // Mensagem de sucesso
      mostrarNotificacao(`❌ Avaliação de ${nomeCliente} reprovada.`, 'danger');
    }
  }
}

// ==================== EXCLUIR AVALIAÇÃO ====================
function excluirAvaliacao(id) {
  if (confirm('Tem certeza que deseja excluir esta avaliação permanentemente?\n\nEsta ação não pode ser desfeita!')) {
    let avaliacoes = JSON.parse(localStorage.getItem('avaliacoes')) || [];
    const avaliacao = avaliacoes.find(a => a.id === id);
    const nomeCliente = avaliacao ? avaliacao.nome : 'Cliente';
    
    avaliacoes = avaliacoes.filter(a => a.id !== id);
    localStorage.setItem('avaliacoes', JSON.stringify(avaliacoes));
    
    const activeFilter = document.querySelector('.filter-btn.active');
    const filter = activeFilter ? activeFilter.dataset.filter : 'pendentes';
    loadAvaliacoesAdmin(filter);
    loadDepoimentosPublicos();
    
    // Mensagem de sucesso
    mostrarNotificacao(`🗑️ Avaliação de ${nomeCliente} excluída permanentemente.`, 'info');
  }
}

// ==================== MOSTRAR NOTIFICAÇÃO ====================
function mostrarNotificacao(mensagem, tipo = 'success') {
  // Remover notificação anterior se existir
  const notificacaoExistente = document.querySelector('.notificacao-avaliacao');
  if (notificacaoExistente) {
    notificacaoExistente.remove();
  }
  
  // Criar notificação
  const notificacao = document.createElement('div');
  notificacao.className = `notificacao-avaliacao ${tipo}`;
  notificacao.textContent = mensagem;
  
  document.body.appendChild(notificacao);
  
  // Mostrar com animação
  setTimeout(() => {
    notificacao.classList.add('show');
  }, 10);
  
  // Remover após 3 segundos
  setTimeout(() => {
    notificacao.classList.remove('show');
    setTimeout(() => {
      notificacao.remove();
    }, 300);
  }, 3000);
}

console.log('Sistema de Avaliações carregado! ⭐');
