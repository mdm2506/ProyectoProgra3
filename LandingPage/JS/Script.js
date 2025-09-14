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
