// Ano automático no rodapé
document.getElementById('ano').textContent = new Date().getFullYear();

// Destaca no menu a seção que está visível
const links = document.querySelectorAll('nav a');
const secoes = [...links].map(a => document.querySelector(a.getAttribute('href')));
const obs = new IntersectionObserver(entradas => {
  entradas.forEach(e => {
    if (e.isIntersecting) {
      links.forEach(a => a.classList.toggle('ativo', a.getAttribute('href') === '#' + e.target.id));
    }
  });
}, { rootMargin: '-40% 0px -55% 0px' });
secoes.forEach(s => s && obs.observe(s));


// Envio do formulário de contato via Formspree (AJAX, sem sair da página)
const formContato = document.querySelector('.form-contato');
if (formContato) {
  formContato.addEventListener('submit', async (ev) => {
    ev.preventDefault();
    const status = formContato.querySelector('.form-status');
    const btn = formContato.querySelector('button');
    btn.disabled = true;
    status.textContent = 'Enviando...';
    status.className = 'form-status';
    try {
      const resp = await fetch(formContato.action, {
        method: 'POST',
        body: new FormData(formContato),
        headers: { 'Accept': 'application/json' }
      });
      if (resp.ok) {
        status.textContent = 'Mensagem enviada! Obrigado pelo contato.';
        status.className = 'form-status ok';
        formContato.reset();
      } else {
        status.textContent = 'Não foi possível enviar. Tente novamente.';
        status.className = 'form-status err';
      }
    } catch (e) {
      status.textContent = 'Falha de conexão. Tente novamente.';
      status.className = 'form-status err';
    }
    btn.disabled = false;
  });
}
