(() => {
  const header = document.getElementById('site-header');
  const logo = document.querySelector('.logo');
  let isCollapsed = null;
  const DURATION = getComputedStyle(document.documentElement).getPropertyValue('--logo-move-duration').trim() || '800ms';
  const EASING = getComputedStyle(document.documentElement).getPropertyValue('--logo-move-ease').trim() || 'ease-in-out';
  const playFlip = (collapse) => {
    const first = logo.getBoundingClientRect();
    header.classList.toggle('scrolled', collapse);
    const last = logo.getBoundingClientRect();
    const dx = first.left - last.left;
    const dy = first.top  - last.top;
    logo.style.transition = 'none';
    logo.style.transform  = `translate(${dx}px, ${dy}px)`;
    void logo.offsetWidth;
    logo.style.transition = `transform ${DURATION} ${EASING}`;
    logo.style.transform  = 'translate(0, 0)';
    const onEnd = (e) => {
      if (e.propertyName !== 'transform') return;
      logo.style.transition = '';
      logo.style.transform  = '';
      logo.removeEventListener('transitionend', onEnd);
    };
    logo.addEventListener('transitionend', onEnd);
  };
  const onScroll = () => {
    const collapsed = window.scrollY > 10;
    if (collapsed !== isCollapsed) {
      isCollapsed = collapsed;
      playFlip(collapsed);
    }
  };
  // init
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });
})();