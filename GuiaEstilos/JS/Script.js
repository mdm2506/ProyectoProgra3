document.addEventListener('DOMContentLoaded', () => {  //espera a que el html este cargado
  const pages = Array.from(document.querySelectorAll('.page')); //selecciona todas las paginas
  const menuLinks = document.querySelectorAll('.nav-menu a'); //selecciona todos los enlaces del menu
  const logo = document.querySelector('.logo'); //selecciona el logo

  const showPage = (id) => { //funcion que muestra la pagina con el id dado
    pages.forEach(p => { //recorre todas las paginas
      const isActive = p.id === id; //verifica que el id recibido sea igual al id de la pagina
      p.classList.toggle('active', isActive); //agrega o quita la clase active segun corresponda
      p.setAttribute('aria-hidden', String(!isActive)); //actualiza el atributo aria-hidden para accesibilidad
    });
    menuLinks.forEach(a => { //recorre todos los enlaces del menu
      a.classList.toggle('active', a.dataset.page === id); //marca como activo el enlace correspondiente a la pagina mostrada
    });
    window.scrollTo({ top: 0, behavior: 'smooth' }); //desplaza la ventana al tope de la pagina de forma suave
  };
  showPage('inicio'); //muestra la pagina de inicio al cargar

  // Agrega eventos a los enlaces del menú y al logo
  if (logo) { //si el logo existe
    logo.addEventListener('click', () => showPage('inicio')); //al hacer click en el logo, muestra la pagina de inicio
  }
  menuLinks.forEach(a => { //recorre todos los enlaces del menu
    a.addEventListener('click', (e) => { //agrega un evento de click a cada enlace
      e.preventDefault(); //evita que recargue la pagina
      const id = a.dataset.page; //obtiene el id de la pagina desde el atributo data-page del enlace
      if (id) showPage(id); //si el id existe, muestra la pagina correspondiente
    });
  });
});