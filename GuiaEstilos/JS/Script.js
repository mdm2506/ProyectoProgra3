// Router de secciones (Inicio / Integrantes / DescargaCSS)
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

    // Marcar enlace activo en la barra
    menuLinks.forEach(a => {
      a.classList.toggle('active', a.dataset.page === id);
    });

    // Subir al inicio de la página
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Inicio por defecto
  showPage('inicio');

  // Logo lleva a inicio
  if (logo) {
    logo.addEventListener('click', () => showPage('inicio'));
  }

  // Enlaces del menú superior cambian de "página"
  menuLinks.forEach(a => {
    a.addEventListener('click', (e) => {
      e.preventDefault();
      const id = a.dataset.page;
      if (id) showPage(id);
    });
  });

  // Nota: los links internos del índice (anclas dentro de Inicio)
  // como #ColorPalette, #Buttons, etc., siguen funcionando normal.
});
