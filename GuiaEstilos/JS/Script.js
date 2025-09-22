
document.addEventListener('DOMContentLoaded', () => {
  const pages = Array.from(document.querySelectorAll('.page'));
  const menuLinks = document.querySelectorAll('.nav-menu a');
  const logo = document.querySelector('.logo');
  const showPage = (id) => {
    pages.forEach(p => {
      const isActive = p.id === id;
      p.classList.toggle('active', isActive);
      p.setAttribute('aria-hidden', String(!isActive));
    });
    menuLinks.forEach(a => {
      a.classList.toggle('active', a.dataset.page === id);
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  showPage('inicio');
  if (logo) {
    logo.addEventListener('click', () => showPage('inicio'));
  }
  menuLinks.forEach(a => {
    a.addEventListener('click', (e) => {
      e.preventDefault();
      const id = a.dataset.page;
      if (id) showPage(id);
    });
  });
});
