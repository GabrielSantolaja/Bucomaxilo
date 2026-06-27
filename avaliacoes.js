// ==================== SISTEMA DE AVALIAÇÕES ==================== 

// ==================== ELEMENTOS DOM ====================
let btnDeixarAvaliacao, modalAvaliacao, formAvaliacao;
let ratingStars, avaliacaoRating;
let depoimentosAprovados, depoimentosDoctoraliaPagina, listaAvaliacoes;
let filterBtns;

const DOCTORALIA_PROFILE_URL = 'https://www.doctoralia.com.br/anizzolavo-jesus/cirurgiao-buco-maxilo-facial/sao-paulo#profile-reviews';
const MAX_DEPOIMENTOS_HOME = 6;
const doctoraliaDepoimentos = [
  {
    nome: 'Eduardo Alves Santos',
    data: '15/06/2026',
    rating: 5,
    comentario: 'Fiz minha cirurgia já tem 10 meses e foi a melhor escolha que fiz. O doutor Anizzolavo foi incrível, passou confiança e calma em uma cirurgia complexa. Estou muito feliz com o resultado.',
    fonte: 'Doctoralia'
  },
  {
    nome: 'Bruno c T',
    data: '15/06/2026',
    rating: 5,
    comentario: 'Excelente profissional, entende muito do assunto e explica com detalhes.',
    fonte: 'Doctoralia'
  },
  {
    nome: 'Gustavo Barboza',
    data: '15/06/2026',
    rating: 5,
    comentario: 'Profissional excelente, dispensa comentários. Seus resultados falam por si só.',
    fonte: 'Doctoralia'
  },
  {
    nome: 'Gabriely Vilas Boas de Jesus',
    data: '15/06/2026',
    rating: 5,
    comentario: 'Qualidade no trabalho desde a primeira consulta. Encontrei um atendimento acolhedor, atencioso e muito profissional.',
    fonte: 'Doctoralia'
  },
  {
    nome: 'Mônica Dias',
    data: '15/06/2026',
    rating: 5,
    comentario: 'Dr super atencioso,educado e gentil. Não tenho palavras para descrever o carinho e gratidão e o quanto fiquei feliz com a minha cirurgia, tive total apoio e atenção do dr o tempo todo. Me deu total apoio antes e pós cirurgia. Super indico de olhos fechados!',
    fonte: 'Doctoralia'
  },
  {
    nome: 'Diego Augusto Marcovich',
    data: '15/06/2026',
    rating: 5,
    comentario: 'Ele é sensacional, sou muito grato ao Dr. Desde as explicações e até os procedimentos, um cara incrível que me ajudou muito, muito mesmo. É notável que ele faz o que gosta, por isso alcançou esse nível de profissionalismo.',
    fonte: 'Doctoralia'
  },
  {
    nome: 'BRENDA',
    data: '15/06/2026',
    rating: 5,
    comentario: 'Excelente profissional, atendimento ágil e altamente qualificado.',
    fonte: 'Doctoralia'
  },
  {
    nome: 'Debora Bonilha',
    data: '15/06/2026',
    rating: 5,
    comentario: 'Me faltam palavras para agradecer toda a atenção e cuidado que o Dr. Anizzolavo teve com meu caso. Em abril de 2024 eu realizei uma cirurgia ortognatica com outro profissional onde tive alguns problemas e passei por meses de dor e sem conseguir comer, através de uma indicação eu comecei esse anjo em forma de bucomaxilo. Em agosto de 2024 eu refiz a cirurgia ortognatica com o doutor Annizolavo e no início de 2025 eu realizei uma artroscopia de atm, hoje eu não sinto dores, graças a Deus sigo bem, podendo falar, comer, sorrir e seguir minha vida como antes. Sou eternamente grata pelo profissional que o doutor Annizolavo é, com um coração lindo, realmente o trabalho dele é um dom.',
    fonte: 'Doctoralia'
  },
  {
    nome: 'Marcio Mota Mourão',
    data: '15/06/2026',
    rating: 5,
    comentario: 'Tá de parabéns, excelente profissional e muito humano.',
    fonte: 'Doctoralia'
  },
  {
    nome: 'A.Y.C.',
    data: '27/04/2026',
    rating: 5,
    comentario: 'Alem de ser bem atencioso, transmitiu confiança pela capacidade técnica, deu pra perceber que tem bagagem para falar do assunto, bem gentil e cuidadoso para que compreendessemos a questão e possíveis soluções',
    fonte: 'Doctoralia'
  },
  {
    nome: 'bin zhu',
    data: '05/02/2026',
    rating: 5,
    comentario: 'Com anos de atuação é realmente diferente, ótima técnica e muito paciente, sem nenhum desconforto durante todo o procedimento, super confiável!',
    fonte: 'Doctoralia'
  },
  {
    nome: 'Talitha Izaquiel',
    data: '18/12/2025',
    rating: 5,
    comentario: 'Educado, simpático. Explicou tudo certinho e me deixou mais segura.',
    fonte: 'Doctoralia'
  },
  {
    nome: 'Milena Anjos',
    data: '08/07/2025',
    rating: 5,
    comentario: 'Descobri que precisava fazer a cirurgia ortognática já na fase adulta. Fiz uma busca no Google e, entre os poucos profissionais da minha região, encontrei o doutor. Desde a nossa primeira consulta, ele foi super solícito, tirou todas as minhas dúvidas e me acompanhou em várias consultas até o grande dia. Hoje, estou quase 100% recuperada e só tenho a agradecer. Muito obrigada.',
    fonte: 'Doctoralia'
  },
  {
    nome: 'E.S',
    data: '30/06/2025',
    rating: 5,
    comentario: 'Um ótimo profissional, me passou segurança durante todo o procedimento. O tratamento pós extração foi perfeito, não senti absolutamente nenhuma dor. O mercado necessita de mais profissionais assim.',
    fonte: 'Doctoralia'
  },
  {
    nome: 'Kauã Costa',
    data: '30/06/2025',
    rating: 5,
    comentario: 'Ótimo cirurgião buco-maxilo, atencioso, profissional, calmo, explica tudo detalhadamente, passa segurança, seguro no que faz, e a experiência é a melhor possível! Retirei dois sisos recentemente com ele, procedimento ao qual eu estava morrendo de medo, porém foi tão rápido, indolor, e a recuperação tranquila! Não senti dor no procedimento e nem após, sem dúvidas vou retornar para retirar meu outro siso, e indicar para pessoas próximas! Excelente trabalho.',
    fonte: 'Doctoralia'
  },
  {
    nome: 'Luiz Maciel',
    data: '30/06/2025',
    rating: 5,
    comentario: 'Profissional impecável! Explica tudo com clareza, é ágil no atendimento e extremamente cuidadoso. Nota mil!',
    fonte: 'Doctoralia'
  },
  {
    nome: 'Bruno Borges',
    data: '19/06/2025',
    rating: 5,
    comentario: 'Nossa, que atendimento incrível! Fiquei impressionado com a atenção que me deram, de verdade. e ainda foram super simpáticos, o que faz toda a diferença. Adorei a experiência e com certeza vou recomendar vocês para todo mundo! Parabéns pela equipe!',
    fonte: 'Doctoralia'
  },
  {
    nome: 'Tereza sapanhos Moreira',
    data: '18/06/2025',
    rating: 5,
    comentario: 'Médico Atencioso, todos da clínica são muito educados,gostei muito eu recomendo nota 10.',
    fonte: 'Doctoralia'
  },
  {
    nome: 'Rogério Guizeline Soares',
    data: '13/06/2025',
    rating: 5,
    comentario: 'Profissional muito atencioso, explica com clareza procedimento irá realizar tirando todas suas dúvidas, recomendo.',
    fonte: 'Doctoralia'
  },
  {
    nome: 'Guilherme Assis',
    data: '13/06/2025',
    rating: 5,
    comentario: 'Profissional de primeira qualidade , eu recomendo',
    fonte: 'Doctoralia'
  },
  {
    nome: 'Gustavo Costa de Freitas da Silva',
    data: '13/06/2025',
    rating: 5,
    comentario: 'Fiz duas cirurgias com o Dr. Anizzo, ambas tiveram um ótimo resultado. Durante todo processo tive um suporte e um atendimento além da minha expectativa, o Dr. Anizzo é uma excelente pessoa tanto pessoalmente como profissionalmente, deixo aqui meus agradecimentos doutor.',
    fonte: 'Doctoralia'
  },
  {
    nome: 'Éder Lacerda',
    data: '13/06/2025',
    rating: 5,
    comentario: 'Excelente profissional e excelente atendimento, muito atencioso',
    fonte: 'Doctoralia'
  },
  {
    nome: 'Jéssica Rodrigues',
    data: '11/06/2025',
    rating: 5,
    comentario: 'O pré operatório, o pós operatório, e durante o tratamento o Dr foi muito atencioso e prestativo, agradeço a Deus por ter colocado um ótimo profissional em meu caminho pra resolver um problema que carrego a anos, fiz uma ortognática tem 5 meses, e ocorreu tudo bem, a recuperação está sendo tranquila, a equipe do Dr anizzo também estão de parabéns!!! Em resumo é um profissional que me aparenta amar o que faz, e por isso faz com maestria e humanização.',
    fonte: 'Doctoralia'
  },
  {
    nome: 'Larissa',
    data: '11/06/2025',
    rating: 5,
    comentario: 'Profissional incrível, trabalho impecável!!! Indicaria sempre sem dúvidas',
    fonte: 'Doctoralia'
  },
  {
    nome: 'Suzy Souza',
    data: '11/06/2025',
    rating: 5,
    comentario: 'Doutor super atencioso e eficiente, sabe transmitir confiança ao paciente e tranquilizar. Cirurgião nota 1000.',
    fonte: 'Doctoralia'
  },
  {
    nome: 'Hellen Karla da Silva',
    data: '11/06/2025',
    rating: 5,
    comentario: 'Melhor experiência possível encontrada num profissional.',
    fonte: 'Doctoralia'
  },
  {
    nome: 'Michele Pereira',
    data: '19/08/2022',
    rating: 5,
    comentario: 'Um excelente profissional, minha filha ficou com medo de extrair o siso, ele indicou de fazer no hospital, assim ficaria mais fácil pra ela, ele ainda viu na tomografia um desvio de septo, que tbm foi corrigido por um otorrino da sua equipe, um excelente profissional tbm. Um pena ele ter saído de uma clínica em São Miguel Paulista, perderam um maravilhoso profissional. O bom que deu tempo de conhecer ele antes de sair de la.',
    fonte: 'Doctoralia'
  },
  {
    nome: 'Jonathan Afranio Silva',
    data: '28/12/2021',
    rating: 5,
    comentario: 'Ontem (27/12/2021) tive uma experiencia ruim, agendei uma consulta, fui ao consultório no horário agendado mas estava fechado, entrei em contato com o doutor o mesmo se comprometeu em atender minha filha hoje(28/12) on-line para compensar a viagem perdida. Hoje (28/12), diferente de ontem, o doutor atendeu minha filha e deu a devida atenção ao problema que ela está tendo, nos orientou, explicou a causa da dor que ela está sentindo e passou um enxaguante (não vou escrever o nome para as pessoas não se ao medicar)... Devido ao atendimento que deu hoje, desconsidere o meu comentário de ontem abaixo, vou deixar aqui só para ficar registrado como feedback para recepção evitar repetir esse erro com outros pacientes: "Horrível, deixaram horário de 27/12/2021 as 15:00hs disponível para agendamento, mas ao chegar no local dez minutos antes do horário combinado, me deparei com o consultório fechado, apertei a campainha várias vezes, liguei para Doctoria, informei o caso, a atendente confirmou o horário e me passou o contato do consultório, entrei em contato com o consultório o atendente disse que estava de recesso, para se retratar poderia fazer uma tele consulta sem custo. Detalhe que sair do Campo Limpo, zona Sul de São Paulo para o local que fica na Mooca, tive despesas com metrô e Uber, perdi tempo para chegar no local e ver o mesmo fechado. Revoltante, falta de respeito com os pacientes!"',
    fonte: 'Doctoralia'
  },
  {
    nome: 'Giovanna',
    data: '24/08/2021',
    rating: 5,
    comentario: 'Maravilhoso!! Profissional incrível Procurei por muito tempo, e graças a Deus que eu encontrei esse cirurgião maravilhoso, garanto que nunca vão se arrepender!!',
    fonte: 'Doctoralia'
  },
  {
    nome: 'Victor Rovero',
    data: '26/07/2021',
    rating: 5,
    comentario: 'o Dr. Anizzo foi excelente! Muito atencioso! Estava com muito receio de retirar o siso por achar que talvez pudesse inchar e ou doer demais, entretanto, não senti dor nenhuma e no dia seguinte, estava ótimo. Recomendo muito este profissional!!',
    fonte: 'Doctoralia'
  },
  {
    nome: 'Giovanna máximo da silva',
    data: '16/07/2021',
    rating: 5,
    comentario: 'Ótima clínica, super atenciosos os doutores. Fiz a extração do siso, explicaram super bem sobre o processo da cirugia. Super indico',
    fonte: 'Doctoralia'
  },
  {
    nome: 'Pablo Gabriel Ramos dos Santos',
    data: '13/07/2021',
    rating: 5,
    comentario: 'Enfim a palavra pra esse profissional excelente se resume em Maestria, pois desde a primeira consulta até os dias atuais mesmo após q recuperação ele está sempre disposto a esclarecer dúvidas, queixas,curiosidades sempre de forma acessível onde explica minuciosamente cada vírgula sem mais delongas sim! Super Recomendo o Dr. Annizio pois ele junto com toda a equipe da Gravranich Melo não só transformam sorrisos e sim vidas! Gratidão',
    fonte: 'Doctoralia'
  },
  {
    nome: 'Paloma de Souza Freitas',
    data: '13/07/2021',
    rating: 5,
    comentario: 'Pra mim sempre me faltarão palavras pra descrever esse profissional, o Doutor Anizzo pegou o meu caso e está executando com excelência... Muito atencioso e prestativo a sempre esclarecer dúvidas... Obrigado doutor deixo aqui a minha satisfação e respeito... Super indico e recomendo',
    fonte: 'Doctoralia'
  },
  {
    nome: 'Rafael Dias de Melo',
    data: '13/07/2021',
    rating: 5,
    comentario: 'O Dr. Annizzolavo é paciente, explica bem o procedimento médico, é acessível, profissional, sabe ouvir o paciente explica até mesmo em detalhes o pós operatório. Super recomendo',
    fonte: 'Doctoralia'
  },
  {
    nome: 'Meirielen Almeida dos Santos',
    data: '13/07/2021',
    rating: 5,
    comentario: 'O Dr Anizzolavo é um ótimo profissional, tive o prazer de ser atendida por ele e gostei muito do resultado que tive e ainda estou tento.. e super indico pois ele realmente entende do assunto',
    fonte: 'Doctoralia'
  }
];

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
  depoimentosDoctoraliaPagina = document.getElementById('depoimentosDoctoraliaPagina');
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
  if (!depoimentosAprovados && !depoimentosDoctoraliaPagina) return;

  const doctoraliaOrdenadas = [...doctoraliaDepoimentos]
    .sort((a, b) => getAvaliacaoTimestamp(b) - getAvaliacaoTimestamp(a));

  const doctoraliaHome = doctoraliaOrdenadas.slice(0, MAX_DEPOIMENTOS_HOME);
  const doctoraliaRestante = doctoraliaOrdenadas.slice(MAX_DEPOIMENTOS_HOME);

  if (depoimentosAprovados) {
    renderDepoimentos(
      depoimentosAprovados,
      doctoraliaHome,
      'Em breve novas avaliações serão exibidas aqui.'
    );
  }

  if (depoimentosDoctoraliaPagina) {
    renderDepoimentos(
      depoimentosDoctoraliaPagina,
      doctoraliaRestante,
      'No momento, todas as avaliações disponíveis já estão na página inicial.'
    );
  }
}

function getAvaliacaoTimestamp(avaliacao) {
  if (typeof avaliacao.timestamp === 'number') {
    return avaliacao.timestamp;
  }

  if (typeof avaliacao.data === 'string') {
    const partes = avaliacao.data.split('/');
    if (partes.length === 3) {
      const dia = parseInt(partes[0], 10);
      const mes = parseInt(partes[1], 10) - 1;
      const ano = parseInt(partes[2], 10);
      const data = new Date(ano, mes, dia, 23, 59, 59, 999);
      return data.getTime();
    }
  }

  return 0;
}

function renderDepoimentos(container, depoimentos, emptyMessage) {
  if (!container) return;

  if (!depoimentos || depoimentos.length === 0) {
    container.innerHTML = `
      <div class="depoimento-card">
        <i class="fas fa-quote-left quote-icon"></i>
        <div class="depoimento-rating">
          <i class="fas fa-star"></i>
          <i class="fas fa-star"></i>
          <i class="fas fa-star"></i>
          <i class="fas fa-star"></i>
          <i class="fas fa-star"></i>
        </div>
        <p class="depoimento-texto">${emptyMessage}</p>
        <div class="depoimento-autor">
          <div class="depoimento-meta">
            <strong>Equipe Bucomaxilo</strong>
            <span class="depoimento-data">Atualizado em tempo real</span>
          </div>
        </div>
      </div>
    `;
    return;
  }

  container.innerHTML = depoimentos.map(avaliacao => {
    const starsHTML = Array(5).fill(0).map((_, i) => 
      `<i class="fas fa-star" style="${i >= avaliacao.rating ? 'color: #ddd;' : ''}"></i>`
    ).join('');

    const fonteHTML = avaliacao.fonte
      ? `<small class="depoimento-fonte">Fonte: <a href="${DOCTORALIA_PROFILE_URL}" target="_blank" rel="noopener">${avaliacao.fonte}</a></small>`
      : '';
    
    return `
      <div class="depoimento-card">
        <i class="fas fa-quote-left quote-icon"></i>
        <div class="depoimento-rating">
          ${starsHTML}
        </div>
        <p class="depoimento-texto">${avaliacao.comentario}</p>
        <div class="depoimento-autor">
          <div class="depoimento-meta">
            <strong>${avaliacao.nome}</strong>
            <span class="depoimento-data">${avaliacao.data}</span>
          </div>
          ${fonteHTML}
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
