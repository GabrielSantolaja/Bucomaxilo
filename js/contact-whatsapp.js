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
  const getHookElement = (hookClass, fallbackId) => {
    return document.querySelector(`.${hookClass}`) || document.getElementById(fallbackId);
  };

  const linksContatoWhatsapp = document.querySelectorAll(`a[href*="api.whatsapp.com/send?phone=${WHATSAPP_NUMBER}"]`);

  linksContatoWhatsapp.forEach((link) => {
    link.addEventListener('click', (event) => {
      event.preventDefault();
      abrirWhatsappContato();
    });
  });

  const formContato = getHookElement('js-contact-form', 'formContato');
  if (formContato) {
    formContato.addEventListener('submit', (event) => {
      event.preventDefault();

      const nome = formContato.querySelector('[name="nome"]').value;
      salvarNomePaciente(nome);
      abrirWhatsappContato('', nome);

      formContato.reset();
      alert('Mensagem enviada! Você será redirecionado para o WhatsApp.');
    });
  }
});
