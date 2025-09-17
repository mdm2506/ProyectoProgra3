(() => {
  const logoContainer = document.querySelector('.logo');
  const logoImg = logoContainer.querySelector('img');
  const logoText = logoContainer.querySelector('a');
  const navbar = document.querySelector('.Navbar');

  const MAX_SCROLL = 200; // scroll donde la animación se completa

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

    // Selecciona el elemento con la clase "carrusel" (el contenedor que se desplazará)
const carrusel = document.querySelector(".carrusel");

// Selecciona el botón con las clases "flecha izquierda"
const btnIzquierda = document.querySelector(".flecha.izquierda");

// Selecciona el botón con las clases "flecha derecha"
const btnDerecha = document.querySelector(".flecha.derecha");

// Agrega un evento al botón izquierdo.
// Cuando el usuario hace clic, el carrusel se desplaza 300px hacia la izquierda.
// El parámetro "behavior: smooth" hace que el movimiento sea animado y no brusco.
btnIzquierda.addEventListener("click", () => {
  carrusel.scrollBy({ left: -300, behavior: "smooth" });
});

// Agrega un evento al botón derecho.
// Cuando el usuario hace clic, el carrusel se desplaza 300px hacia la derecha.
// También con animación suave.
btnDerecha.addEventListener("click", () => {
  carrusel.scrollBy({ left: 300, behavior: "smooth" });
});

////////////////// FIN DEL JAVASCRIPT PARA EL CARRUSEL /////////////////
////////////////// FIN DEL JAVASCRIPT PARA EL CARRUSEL /////////////////
// JAVASCRIPT PARA EL FORMULARIO DE CONTACTO

        // Reglas de validación para cada campo
const reglas = {
            name: {
                obligatorio: true,
                minimo: 2,
                patron: /^[a-zA-ZáéíóúñÑ\s]{2,}$/,
                mensajes: {
                    obligatorio: 'Por favor escribe tu nombre',
                    minimo: 'Tu nombre debe tener al menos 2 letras',
                    patron: 'Solo usa letras en tu nombre'
                }
            },
            email: {
                obligatorio: true,
                patron: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                mensajes: {
                    obligatorio: 'Necesitamos tu correo electrónico',
                    patron: 'Escribe un correo válido (ejemplo@correo.com)'
                }
            },
            phone: {
                obligatorio: false,
                patron: /^[\+]?[0-9\s\-\(\)]{8,}$/,
                mensajes: {
                    patron: 'Escribe un teléfono válido'
                }
            },
            subject: {
                obligatorio: true,
                mensajes: {
                    obligatorio: 'Selecciona un tema'
                }
            },
            message: {
                obligatorio: true,
                minimo: 10,
                maximo: 500,
                mensajes: {
                    obligatorio: 'Escribe tu mensaje',
                    minimo: 'Tu mensaje debe tener al menos 10 caracteres',
                    maximo: 'Tu mensaje es muy largo (máximo 500 caracteres)'
                }
            }
        };

        // Conseguir elementos del formulario
        const formulario = document.querySelector('form');
        const campos = document.querySelectorAll('.input-campo, .select-campo, .textarea-campo');
        const botonEnviar = document.querySelector('.boton-enviar');
        const contadorCaracteres = document.querySelector('.contador-caracteres');

        // Configurar cada campo
        campos.forEach(campo => {
            const contenedorCampo = campo.closest('.campo');
            
            // Cuando el usuario hace clic en el campo
            campo.addEventListener('focus', () => {
                contenedorCampo.classList.add('activo');
            });

            // Cuando el usuario sale del campo
            campo.addEventListener('blur', () => {
                contenedorCampo.classList.remove('activo');
                if (campo.value.trim() !== '') {
                    contenedorCampo.classList.add('lleno');
                } else {
                    contenedorCampo.classList.remove('lleno');
                }
                revisarCampo(campo);
            });

            // Mientras el usuario escribe
            campo.addEventListener('input', () => {
                if (campo.value.trim() !== '') {
                    contenedorCampo.classList.add('lleno');
                } else {
                    contenedorCampo.classList.remove('lleno');
                }
                
                // Revisar el campo después de un momento
                clearTimeout(campo.tiempoRevision);
                campo.tiempoRevision = setTimeout(() => {
                    revisarCampo(campo);
                }, 500);

                // Actualizar contador si es el mensaje
                if (campo.id === 'mensaje') {
                    actualizarContador(campo);
                }

                // Revisar si se puede enviar el formulario
                revisarFormularioCompleto();
            });
        });

        // Función para revisar un campo
        function revisarCampo(campo) {
            const contenedorCampo = campo.closest('.campo');
            const mensajeError = contenedorCampo.querySelector('.mensaje-error');
            const reglasDelCampo = reglas[campo.name];
            
            if (!reglasDelCampo) return;

            let estaCorrect = true;
            let mensajeDeError = '';

            const valor = campo.value.trim();

            // Revisar si es obligatorio
            if (reglasDelCampo.obligatorio && !valor) {
                estaCorrect = false;
                mensajeDeError = reglasDelCampo.mensajes.obligatorio;
            }
            // Revisar longitud mínima
            else if (reglasDelCampo.minimo && valor.length > 0 && valor.length < reglasDelCampo.minimo) {
                estaCorrect = false;
                mensajeDeError = reglasDelCampo.mensajes.minimo;
            }
            // Revisar longitud máxima
            else if (reglasDelCampo.maximo && valor.length > reglasDelCampo.maximo) {
                estaCorrect = false;
                mensajeDeError = reglasDelCampo.mensajes.maximo;
            }
            // Revisar patrón
            else if (reglasDelCampo.patron && valor && !reglasDelCampo.patron.test(valor)) {
                estaCorrect = false;
                mensajeDeError = reglasDelCampo.mensajes.patron;
            }

            // Actualizar la apariencia
            contenedorCampo.classList.remove('correcto', 'error');
            mensajeError.classList.remove('mostrar');

            if (valor) { // Solo mostrar estado si hay algo escrito
                if (estaCorrect) {
                    contenedorCampo.classList.add('correcto');
                } else {
                    contenedorCampo.classList.add('error');
                    mensajeError.textContent = mensajeDeError;
                    mensajeError.classList.add('mostrar');
                }
            }

            return estaCorrect;
        }

        // Actualizar contador de caracteres
        function actualizarContador(textarea) {
            const caracteresActuales = textarea.value.length;
            const caracteresMaximos = textarea.getAttribute('maxlength') || 500;
            contadorCaracteres.textContent = `${caracteresActuales} / ${caracteresMaximos}`;
            
            if (caracteresActuales > caracteresMaximos * 0.9) {
                contadorCaracteres.style.borderColor = '#ff6347';
                contadorCaracteres.style.color = '#d2691e';
            } else {
                contadorCaracteres.style.borderColor = '#cd853f';
                contadorCaracteres.style.color = '#8b4513';
            }
        }

        // Revisar si el formulario está completo
        function revisarFormularioCompleto() {
            let formularioCompleto = true;

            campos.forEach(campo => {
                const reglasDelCampo = reglas[campo.name];
                if (!reglasDelCampo) return;

                const valor = campo.value.trim();

                if (reglasDelCampo.obligatorio && !valor) {
                    formularioCompleto = false;
                } else if (valor && reglasDelCampo.patron && !reglasDelCampo.patron.test(valor)) {
                    formularioCompleto = false;
                } else if (reglasDelCampo.minimo && valor.length > 0 && valor.length < reglasDelCampo.minimo) {
                    formularioCompleto = false;
                } else if (reglasDelCampo.maximo && valor.length > reglasDelCampo.maximo) {
                    formularioCompleto = false;
                }
            });

            botonEnviar.disabled = !formularioCompleto;
        }

        // Cuando se envía el formulario
        formulario.addEventListener('submit', (e) => {
            e.preventDefault();
            
            let todoCorrect = true;

            // Revisar todos los campos
            campos.forEach(campo => {
                if (!revisarCampo(campo)) {
                    todoCorrect = false;
                }
            });

            if (todoCorrect) {
                // Enviar el formulario
                botonEnviar.textContent = 'Enviando...';
                botonEnviar.disabled = true;
                
                // Simular envío
                setTimeout(() => {
                    alert('¡Tu mensaje se envió correctamente! 🧡');
                    formulario.reset();
                    // Limpiar todo
                    campos.forEach(campo => {
                        const contenedorCampo = campo.closest('.campo');
                        contenedorCampo.classList.remove('correcto', 'error', 'lleno', 'activo');
                        contenedorCampo.querySelector('.mensaje-error').classList.remove('mostrar');
                    });
                    contadorCaracteres.textContent = '0 / 500';
                    botonEnviar.textContent = 'Enviar Mi Mensaje';
                    botonEnviar.disabled = true;
                }, 2000);
            } else {
                // Ir al primer campo con error
                const primerError = document.querySelector('.campo.error');
                if (primerError) {
                    primerError.scrollIntoView({ behavior: 'smooth', block: 'center' });
                    primerError.querySelector('.input-campo, .select-campo, .textarea-campo').focus();
                }
            }
        });

        // Inicializar contador
        actualizarContador(document.getElementById('mensaje'));
////////////////// FIN DEL JAVASCRIPT PARA EL FORMULARIO DE CONTACTO /////////////////