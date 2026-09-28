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
