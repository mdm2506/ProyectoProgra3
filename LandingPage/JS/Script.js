     (function() { // IIFE para aislar el scope y ejecutar de inmediato
       const logoContainer = document.querySelector('.logo'); // contenedor del logo
       const logoImg = logoContainer.querySelector('img'); // imagen del logo
       const logoText = logoContainer.querySelector('a'); // texto/enlace del logo
       const navbar = document.querySelector('.Navbar'); // barra de navegación

       const MAX_SCROLL = 100; //limite del scroll
       const START_LOGO_X = 0; // posición inicial del logo antes de hacer scroll
       const END_LOGO_X = -30; // posición final del logo después de hacer scroll
       const START_LOGO_SIZE = 90; //tamaño del logo antes de hacer scroll
       const END_LOGO_SIZE = 60; //tamaño del logo después de hacer scroll
       const START_FONT = 28; //tamaño de la fuente antes de hacer scroll
       const END_FONT = 22; //tamaño de la fuente después de hacer scroll
       const START_PADDING = 20; //Espacio entre los elementos del nav antes de hacer scroll
       const END_PADDING = 10; //Espacio entre los elementos del nav después de hacer scroll 

       const onScroll = () => { //funcion del scroll
         const scrollY = Math.min(window.scrollY, MAX_SCROLL); //calcula el scroll actual sin pasarse del maximo
         const t = scrollY / MAX_SCROLL; //normaliza el valor del scroll entre 0 y 1

         // Movimiento horizontal
         const translateX = START_LOGO_X + (END_LOGO_X - START_LOGO_X) * t; //calcula la nueva posicion del logo
         logoContainer.style.transform = `translateX(${translateX}px)`; //mueve el logo horizontalmente

         // Tamaño logo
         const logoSize = START_LOGO_SIZE + (END_LOGO_SIZE - START_LOGO_SIZE) * t; //calcula el tamaño del logo
         logoImg.style.width = `${logoSize}px`; //cambia el ancho del logo
         logoImg.style.height = `${logoSize}px`; //cambia el alto del logo

         // Fuente
         const fontSize = START_FONT + (END_FONT - START_FONT) * t; //calcula el tamaño de la fuente
         logoText.style.fontSize = `${fontSize}px`; //cambia el tamaño de la fuente

         // Padding nav
         const padding = START_PADDING + (END_PADDING - START_PADDING) * t; //calcula el padding del nav
         navbar.style.padding = `${padding}px 40px`; //cambia el padding del nav

         // Flex direction
         if (t >= 1) { //si el scroll se pasa del maximo
           navbar.style.flexDirection = 'row'; //cambia la direccion del nav a fila
           navbar.style.justifyContent = 'space-between'; //espacia los elementos del nav
         } else { //si el scroll no se pasa del maximo
           navbar.style.flexDirection = 'column'; //cambia la direccion del nav a columna
           navbar.style.justifyContent = 'center'; //centra los elementos del nav
         }
       };

       window.addEventListener('scroll', onScroll, { passive: true }); //evento que se activa al hacer scroll
       onScroll(); // Inicializar
     })();
     
      ///////////////// JAVASCRIPT PARA EL CARRUSEL ///////////////////
const btnIzquierda = document.querySelector(".left.arrow"); // botón flecha izquierda
const btnDerecha = document.querySelector(".right.arrow"); // botón flecha derecha
const groups = document.querySelectorAll(".carousel-group"); // grupos de testimonios (de 3 en 3)

let currentIndex = 0; // Índice del primer grupo visible
const totalGroups = groups.length; // Número total de grupos

// Función para mostrar el grupo actual (se define más abajo)

// Ir al siguiente grupo de 3 testimonios
function goToNext() {
  currentIndex = (currentIndex + 1) % totalGroups; // Avanzar de 1 en 1
  showGroup(); //muestra el grupo actual
}

// Ir al grupo anterior de 3 testimonios
function goToPrevious() {
  currentIndex = (currentIndex - 1 + totalGroups) % totalGroups; // Retroceder de 1 en 1
  showGroup(); //muestra el grupo actual
}
function limitWordsInTestimonies() { // funcion que limita la cantidad de palabras en los testimonios
  const items = document.querySelectorAll('.carousel-item'); // selecciona todos los items del carrusel
  items.forEach(item => {
    const ps = item.querySelectorAll('p'); // selecciona todos los parrafos dentro de cada item
    if (ps.length > 1) { // verifica que haya al menos 2 parrafos
      const testimonio = ps[1]; // selecciona el segundo parrafo (el testimonio)
      const original = testimonio.getAttribute('data-original') || testimonio.textContent; // obtiene el texto original del testimonio
      const words = original.trim().split(/\s+/); //separa el texto en palabras
      if (words.length > 20) { // si hay mas de 20 palabras
        testimonio.textContent = words.slice(0, 20).join(' ') + '...'; // limita a 20 palabras y agrega "..."
      } else {
        testimonio.textContent = original; // si no, muestra el texto original
      }
      testimonio.setAttribute('data-original', original); // guarda el texto original en un atributo data-original
    }
  });
}
// Función para mostrar el grupo actual
function showGroup() {
  // Ocultar todos los grupos
  groups.forEach(group => {
    group.style.display = "none"; // Oculta todos los grupos
  });

  // Mostrar el grupo actual
  groups[currentIndex].style.display = "flex"; // muestra el grupo activo
  limitWordsInTestimonies(); // llama al metodo de limitar palabras
}
// Conectar las flechas de navegación
btnIzquierda.addEventListener("click", goToPrevious); //al hacer click en la flecha izquierda, va al grupo anterior
btnDerecha.addEventListener("click", goToNext); //al hacer click en la flecha derecha, va al siguiente grupo

// Inicializar al cargar
document.addEventListener('DOMContentLoaded', () => { //evento que se activa al cargar la pagina
  showGroup(); // Mostrar el primer grupo de 3 testimonios
  limitWordsInTestimonies(); // Limitar palabras en los testimonios
});

////////////////// FIN DEL JAVASCRIPT PARA EL CARRUSEL /////////////////

   ///////////////// JAVASCRIPT PARA EL FORMULARIO ///////////////////// ====== Selectores base ======

document.addEventListener('DOMContentLoaded', () => {
  const formulario = document.querySelector('#formulario-seccion form');
  const campos = document.querySelectorAll('#formulario-seccion .input-campo, #formulario-seccion .select-campo, #formulario-seccion .textarea-campo');
  const botonEnviar = document.querySelector('#formulario-seccion .boton-enviar');

  function setButtonDisabled() {
    botonEnviar.classList.remove('primary-button');
    botonEnviar.classList.add('disable-button');
    botonEnviar.disabled = true;
    botonEnviar.textContent = 'Enviar Mi Mensaje';
  }
  function setButtonEnabled() {
    botonEnviar.classList.remove('disable-button');
    botonEnviar.classList.add('primary-button');
    botonEnviar.disabled = false;
    botonEnviar.textContent = 'Enviar Mi Mensaje';
  }
  function setButtonSent() {
    botonEnviar.classList.remove('primary-button');
    botonEnviar.classList.add('disable-button');
    botonEnviar.disabled = true;
    botonEnviar.textContent = 'Enviado';
  }

  setButtonDisabled();

  function actualizarEstadoBoton() {
    const todosCompletos = [...campos].every(input => input.value.trim() !== '');
    todosCompletos ? setButtonEnabled() : setButtonDisabled();
  }
  campos.forEach(i => i.addEventListener('input', actualizarEstadoBoton));

  campos.forEach(campo => {
    const cont = campo.closest('.campo');
    const msg = cont?.querySelector('.mensaje-error');

    const toggleLleno = () => cont?.classList.toggle('lleno', campo.value.trim() !== '');

    campo.addEventListener('focus', () => cont?.classList.add('activo'));
    campo.addEventListener('blur', () => {
      const vacio = campo.value.trim() === '';
      cont?.classList.toggle('error', vacio);
      cont?.classList.toggle('correcto', !vacio);
      cont?.classList.remove('activo');
      msg?.classList.toggle('mostrar', vacio);
      toggleLleno();
    });
    campo.addEventListener('input', () => {
      const vacio = campo.value.trim() === '';
      cont?.classList.toggle('error', vacio);
      cont?.classList.toggle('correcto', !vacio);
      msg?.classList.toggle('mostrar', vacio);
      toggleLleno();
    });

    toggleLleno(); // inicial
  });

  // Contador de caracteres
  const textareasMax = document.querySelectorAll('#formulario-seccion .textarea-campo[maxlength]');
  function initContadores() {
    textareasMax.forEach(textarea => {
      const counter = textarea.closest('.campo')?.querySelector('.contador-caracteres');
      if (!counter) return;
      const update = () => {
        counter.textContent = `${textarea.value.length} / ${textarea.maxLength}`;
      };
      textarea.removeEventListener('input', update);
      textarea.addEventListener('input', update);
      update();
    });
  }
  initContadores();

  formulario.addEventListener('reset', () => {
    campos.forEach(campo => {
      const cont = campo.closest('.campo');
      const msg = cont?.querySelector('.mensaje-error');
      cont?.classList.remove('activo','error','correcto','lleno');
      msg?.classList.remove('mostrar');
    });
    setButtonDisabled();
    textareasMax.forEach(t => {
      const c = t.closest('.campo')?.querySelector('.contador-caracteres');
      if (c) c.textContent = `0 / ${t.maxLength}`;
    });
  });

  formulario.addEventListener('submit', e => {
    e.preventDefault();
    let ok = true;
    campos.forEach(campo => {
      const cont = campo.closest('.campo');
      const msg = cont?.querySelector('.mensaje-error');
      const vacio = !campo.value.trim();
      cont?.classList.toggle('error', vacio);
      cont?.classList.toggle('correcto', !vacio);
      msg?.classList.toggle('mostrar', vacio);
      if (vacio) ok = false;
    });
    if (ok) {
      setButtonSent();
      setTimeout(() => formulario.reset(), 1000);
    }
  });
});

//////////////////// FIN DEL JAVASCRIPT PARA EL FORMULARIO ///////////////////

