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
const formulario = document.querySelector('form'); // formulario principal
const campos = document.querySelectorAll('.input-campo, .select-campo, .textarea-campo'); // inputs a validar
const botonEnviar = document.querySelector('.boton-enviar'); // botón de envío

// ====== Helpers de estado del botón ======
function setButtonDisabled() { //desactiva el boton
  botonEnviar.classList.remove('primary-button'); //quita el estilo primario del boton
  botonEnviar.classList.add('disable-button'); //activa el estilo de desactivado del boton
  botonEnviar.disabled = true; //desactiva el boton
  botonEnviar.textContent = 'Enviar Mi Mensaje'; //texto del boton
}

function setButtonEnabled() { //activa el boton
  botonEnviar.classList.remove('disable-button'); //quita el estilo de desactivado del boton
  botonEnviar.classList.add('primary-button'); //activa el estilo primario del boton
  botonEnviar.disabled = false; //activa el boton
  botonEnviar.textContent = 'Enviar Mi Mensaje'; //texto del boton
}

function setButtonSent() { //cambia el boton a enviado
  botonEnviar.classList.remove('primary-button'); //quita el estilo primario del boton
  botonEnviar.classList.add( 'disable-button'); //activa el estilo de desactivado del boton
  botonEnviar.disabled = true; //desactiva el boton
  botonEnviar.textContent = 'Enviado'; //texto del boton
}

// ====== Estado inicial del botón ======
setButtonDisabled(); //desactiva el boton al cargar la pagina

// ====== Habilitar/deshabilitar cuando todos los campos estén completos ======
function actualizarEstadoBoton() { //funcion que revisa si todos los campos estan completos
  const todosCompletos = [...campos].every(input => input.value.trim() !== ''); //verifica que todos los campos tengan algo escrito
  if (todosCompletos) { //si todos los campos estan completos
    setButtonEnabled(); //activa el boton
  } else {
    setButtonDisabled(); //desactiva el boton
  }
}

campos.forEach(input => {
  input.addEventListener('input', actualizarEstadoBoton); // al escribir, reevalúa el estado
});

// ====== Revisión de campos ======
campos.forEach(campo => { 
  const contenedorCampo = campo.closest('.campo'); //selecciona el contenedor del campo
  const mensajeError = contenedorCampo.querySelector('.mensaje-error'); //selecciona el mensaje de error dentro del contenedor

  campo.addEventListener('focus', () => { //cuando se pone el cursor en el campo
    contenedorCampo.classList.add('activo'); //lo marca como activo
  });

  campo.addEventListener('blur', () => { //cuando se quita el cursor del campo
    if (campo.value.trim() === '') { //si el campo esta vacio
      contenedorCampo.classList.add('error'); //lo marca como error
      contenedorCampo.classList.remove('activo', 'correcto'); //quita los otros estados
      mensajeError?.classList.add('mostrar'); //muestra el mensaje de error
    } else {
      contenedorCampo.classList.remove('error'); //quita el estado de error
      contenedorCampo.classList.add('correcto'); //lo marca como correcto
      mensajeError?.classList.remove('mostrar'); //quita el mensaje de error
    }
  });

  campo.addEventListener('input', () => { //cuando se escribe en el campo
    if (campo.value.trim() === '') { //si el campo esta vacio
      contenedorCampo.classList.add('error'); //lo marca como error
      contenedorCampo.classList.remove('correcto'); //quita el estado de correcto
      mensajeError?.classList.add('mostrar'); //muestra el mensaje de error
    } else {
      contenedorCampo.classList.add('correcto'); //lo marca como correcto
      contenedorCampo.classList.remove('error'); //quita el estado de error
      mensajeError?.classList.remove('mostrar'); //quita el mensaje de error
    }
  });
});

// ====== Reset: limpia estados y re-desactiva botón ======
formulario.addEventListener('reset', function() { //cuando se resetea el formulario
  campos.forEach(campo => {
    const contenedorCampo = campo.closest('.campo'); //selecciona el contenedor del campo
    const mensajeError = contenedorCampo.querySelector('.mensaje-error'); //selecciona el mensaje de error dentro del contenedor
    contenedorCampo.classList.remove('activo', 'error', 'correcto', 'lleno'); //quita todos los estados
    mensajeError?.classList.remove('mostrar'); //quita el mensaje de error
  });
  setButtonDisabled(); //desactiva el boton
});

// ====== Submit: valida y marca "enviado" por clases ======
formulario.addEventListener('submit', function(e) { //cuando se envia el formulario
  e.preventDefault(); //evita que recargue la pagina

  let todoCorrecto = true; //validacion

  campos.forEach(campo => { 
    const contenedorCampo = campo.closest('.campo'); //selecciona el contenedor del campo
    const mensajeError = contenedorCampo.querySelector('.mensaje-error'); //selecciona el mensaje de error dentro del contenedor

    if (!campo.value.trim()) { //si el campo esta vacio
      contenedorCampo.classList.add('error'); //lo marca como error
      contenedorCampo.classList.remove('correcto'); //quita el estado de correcto
      mensajeError?.classList.add('mostrar'); //muestra el mensaje de error
      todoCorrecto = false; //marca que no esta todo correcto
    } else {
      contenedorCampo.classList.remove('error'); //quita el estado de error
      contenedorCampo.classList.add('correcto'); //lo marca como correcto
      mensajeError?.classList.remove('mostrar'); //quita el mensaje de error
    }
  });

if (todoCorrecto) { //si todo esta correcto
  setButtonSent(); // cambia el texto a Enviado
  setTimeout(() => { 
    formulario.reset(); // limpia campos después de mostrar "Enviado"
  }, 1000); // se espera 1 segundo antes de limpiar
}

}); 
//////////////////// FIN DEL JAVASCRIPT PARA EL FORMULARIO ///////////////////
