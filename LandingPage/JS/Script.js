(() => {
  const logoContainer = document.querySelector('.logo');
  const logoImg = logoContainer.querySelector('img');
  const logoText = logoContainer.querySelector('a');
  const navbar = document.querySelector('.Navbar');

  const MAX_SCROLL = 100; // scroll donde la animación se completa

  // Valores iniciales y finales
  const START_LOGO_X = 0;     // posición inicial del logo
  const END_LOGO_X = -30;    // cuánto se mueve a la izquierda
  const START_LOGO_SIZE = 90;
  const END_LOGO_SIZE = 60;
  const START_FONT = 28;
  const END_FONT = 22;
  const START_PADDING = 20;
  const END_PADDING = 10;

  const onScroll = () => {
    const scrollY = Math.min(window.scrollY, MAX_SCROLL);
    const t = scrollY / MAX_SCROLL; // porcentaje de colapso 0 → 1

    // Movimiento horizontal del logo
    const translateX = START_LOGO_X + (END_LOGO_X - START_LOGO_X) * t;
    logoContainer.style.transform = `translateX(${translateX}px)`;

    // Tamaño del logo
    const logoSize = START_LOGO_SIZE + (END_LOGO_SIZE - START_LOGO_SIZE) * t;
    logoImg.style.width = `${logoSize}px`;
    logoImg.style.height = `${logoSize}px`;

    // Tamaño de la fuente
    const fontSize = START_FONT + (END_FONT - START_FONT) * t;
    logoText.style.fontSize = `${fontSize}px`;

    // Padding del navbar
    const padding = START_PADDING + (END_PADDING - START_PADDING) * t;
    navbar.style.padding = `${padding}px 40px`;

    // Flex-direction: columna hasta el final, fila al 100%
    if (t === 1) {
      navbar.style.flexDirection = 'row';
      navbar.style.justifyContent = 'space-between';
    } else {
      navbar.style.flexDirection = 'column';
      navbar.style.justifyContent = 'center';
    }
  };

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll(); // inicializar al cargar
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
const formulario = document.querySelector('form');
const campos = document.querySelectorAll('.input-campo, .select-campo, .textarea-campo');
const botonEnviar = document.querySelector('.boton-enviar');

// ====== Helpers de estado del botón ======
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
  botonEnviar.classList.add( 'disable-button');
  botonEnviar.disabled = true;
  botonEnviar.textContent = 'Enviado';
}

// ====== Estado inicial del botón ======
setButtonDisabled();

// ====== Habilitar/deshabilitar cuando todos los campos estén completos ======
function actualizarEstadoBoton() {
  const todosCompletos = [...campos].every(input => input.value.trim() !== '');
  if (todosCompletos) {
    setButtonEnabled();
  } else {
    setButtonDisabled();
  }
}

campos.forEach(input => {
  input.addEventListener('input', actualizarEstadoBoton);
});

// ====== Revisión de campos ======
campos.forEach(campo => {
  const contenedorCampo = campo.closest('.campo');
  const mensajeError = contenedorCampo.querySelector('.mensaje-error');

  campo.addEventListener('focus', () => {
    contenedorCampo.classList.add('activo');
  });

  campo.addEventListener('blur', () => {
    if (campo.value.trim() === '') {
      contenedorCampo.classList.add('error');
      contenedorCampo.classList.remove('activo', 'correcto');
      mensajeError?.classList.add('mostrar');
    } else {
      contenedorCampo.classList.remove('error');
      contenedorCampo.classList.add('correcto');
      mensajeError?.classList.remove('mostrar');
    }
  });

  campo.addEventListener('input', () => {
    if (campo.value.trim() === '') {
      contenedorCampo.classList.add('error');
      contenedorCampo.classList.remove('correcto');
      mensajeError?.classList.add('mostrar');
    } else {
      contenedorCampo.classList.add('correcto');
      contenedorCampo.classList.remove('error');
      mensajeError?.classList.remove('mostrar');
    }
  });
});

// ====== Reset: limpia estados y re-desactiva botón ======
formulario.addEventListener('reset', function() {
  campos.forEach(campo => {
    const contenedorCampo = campo.closest('.campo');
    const mensajeError = contenedorCampo.querySelector('.mensaje-error');
    contenedorCampo.classList.remove('activo', 'error', 'correcto', 'lleno');
    mensajeError?.classList.remove('mostrar');
  });
  setButtonDisabled();
});

// ====== Submit: valida y marca "enviado" por clases ======
formulario.addEventListener('submit', function(e) {
  e.preventDefault();

  let todoCorrecto = true;

  campos.forEach(campo => {
    const contenedorCampo = campo.closest('.campo');
    const mensajeError = contenedorCampo.querySelector('.mensaje-error');

    if (!campo.value.trim()) {
      contenedorCampo.classList.add('error');
      contenedorCampo.classList.remove('correcto');
      mensajeError?.classList.add('mostrar');
      todoCorrecto = false;
    } else {
      contenedorCampo.classList.remove('error');
      contenedorCampo.classList.add('correcto');
      mensajeError?.classList.remove('mostrar');
    }
  });

if (todoCorrecto) {
  setButtonSent(); // cambia el texto a Enviado
  setTimeout(() => {
    formulario.reset(); // limpia campos después de mostrar "Enviado"
  }, 1000); // 1 segundo, o el tiempo que quieras mostrar el texto
}

});
//////////////////// FIN DEL JAVASCRIPT PARA EL FORMULARIO ///////////////////