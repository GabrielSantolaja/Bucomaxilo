document.addEventListener('DOMContentLoaded', () => {
  const getHookElement = (hookClass, fallbackId) => {
    return document.querySelector(`.${hookClass}`) || document.getElementById(fallbackId);
  };

  const apneaQuizStart = getHookElement('js-apnea-quiz-start', 'apneaQuizStart');
  const apneaQuizIntro = getHookElement('js-apnea-quiz-intro', 'apneaQuizIntro');
  const apneaQuizStep = getHookElement('js-apnea-quiz-step', 'apneaQuizStep');
  const apneaQuizResult = getHookElement('js-apnea-quiz-result', 'apneaQuizResult');
  const apneaQuestionText = getHookElement('js-apnea-question-text', 'apneaQuestionText');
  const apneaOptions = getHookElement('js-apnea-options', 'apneaOptions');
  const apneaQuizProgress = getHookElement('js-apnea-quiz-progress', 'apneaQuizProgress');
  const apneaQuizError = getHookElement('js-apnea-quiz-error', 'apneaQuizError');
  const apneaPrevBtn = getHookElement('js-apnea-prev-btn', 'apneaPrevBtn');
  const apneaRetryBtn = getHookElement('js-apnea-retry-btn', 'apneaRetryBtn');
  const apneaScore = getHookElement('js-apnea-score', 'apneaScore');
  const apneaRiskText = getHookElement('js-apnea-risk-text', 'apneaRiskText');
  const apneaWhatsappBtn = getHookElement('js-apnea-whatsapp-btn', 'apneaWhatsappBtn');

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
