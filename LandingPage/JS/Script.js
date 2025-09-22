     (function() {
       const logoContainer = document.querySelector('.logo');
       const logoImg = logoContainer.querySelector('img');
       const logoText = logoContainer.querySelector('a');
       const navbar = document.querySelector('.Navbar');

       const MAX_SCROLL = 100;
       const START_LOGO_X = 0;
       const END_LOGO_X = -30;
       const START_LOGO_SIZE = 90;
       const END_LOGO_SIZE = 60;
       const START_FONT = 28;
       const END_FONT = 22;
       const START_PADDING = 20;
       const END_PADDING = 10;

       const onScroll = () => {
         const scrollY = Math.min(window.scrollY, MAX_SCROLL);
         const t = scrollY / MAX_SCROLL;

         // Movimiento horizontal
         const translateX = START_LOGO_X + (END_LOGO_X - START_LOGO_X) * t;
         logoContainer.style.transform = `translateX(${translateX}px)`;

         // Tamaño logo
         const logoSize = START_LOGO_SIZE + (END_LOGO_SIZE - START_LOGO_SIZE) * t;
         logoImg.style.width = `${logoSize}px`;
         logoImg.style.height = `${logoSize}px`;

         // Fuente
         const fontSize = START_FONT + (END_FONT - START_FONT) * t;
         logoText.style.fontSize = `${fontSize}px`;

         // Padding nav
         const padding = START_PADDING + (END_PADDING - START_PADDING) * t;
         navbar.style.padding = `${padding}px 40px`;

         // Flex direction
         if (t >= 1) {
           navbar.style.flexDirection = 'row';
           navbar.style.justifyContent = 'space-between';
         } else {
           navbar.style.flexDirection = 'column';
           navbar.style.justifyContent = 'center';
         }
       };

       window.addEventListener('scroll', onScroll, { passive: true });
       onScroll(); // Inicializar
     })();
     
      ///////////////// JAVASCRIPT PARA EL CARRUSEL ///////////////////
const btnIzquierda = document.querySelector(".left.arrow");
const btnDerecha = document.querySelector(".right.arrow");
const groups = document.querySelectorAll(".carousel-group");

let currentIndex = 0; // Índice del primer grupo visible
const totalGroups = groups.length; // Número total de grupos

// Función para mostrar el grupo actual

// Ir al siguiente grupo de 3 testimonios
function goToNext() {
  currentIndex = (currentIndex + 1) % totalGroups; // Avanzar de 1 en 1
  showGroup();
}

// Ir al grupo anterior de 3 testimonios
function goToPrevious() {
  currentIndex = (currentIndex - 1 + totalGroups) % totalGroups; // Retroceder de 1 en 1
  showGroup();
}
function limitWordsInTestimonies() {
  const items = document.querySelectorAll('.carousel-item');
  items.forEach(item => {
    const ps = item.querySelectorAll('p');
    if (ps.length > 1) {
      const testimonio = ps[1];
      const original = testimonio.getAttribute('data-original') || testimonio.textContent;
      const words = original.trim().split(/\s+/);
      if (words.length > 20) {
        testimonio.textContent = words.slice(0, 20).join(' ') + '...';
      } else {
        testimonio.textContent = original;
      }
      testimonio.setAttribute('data-original', original);
    }
  });
}
// Función para mostrar el grupo actual
function showGroup() {
  // Ocultar todos los grupos
  groups.forEach(group => {
    group.style.display = "none";
  });

  // Mostrar el grupo actual
  groups[currentIndex].style.display = "flex";
  limitWordsInTestimonies(); // <-- Llama aquí
}
// Conectar las flechas de navegación
btnIzquierda.addEventListener("click", goToPrevious);
btnDerecha.addEventListener("click", goToNext);

// Inicializar al cargar
document.addEventListener('DOMContentLoaded', () => {
  showGroup(); // Mostrar el primer grupo de 3 testimonios
  limitWordsInTestimonies();
});

////////////////// FIN DEL JAVASCRIPT PARA EL CARRUSEL /////////////////

        ///////////////// JAVASCRIPT PARA EL FORMULARIO ///////////////////// ====== Selectores base ======
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