// Función para mostrar páginas
function showPage(pageId) {
    // Ocultar todas las páginas
    document.querySelectorAll('.page').forEach(page => {
        page.style.display = 'none';
        page.classList.remove('active');
    });

    // Mostrar la página seleccionada
    const selectedPage = document.getElementById(pageId);
    selectedPage.style.display = 'block';
    selectedPage.classList.add('active');

    // Actualizar navbar
    document.querySelectorAll('.nav-menu a').forEach(link => {
        link.classList.remove('active');
    });

    // Marcar como activo el link correspondiente
    const activeLink = document.querySelector(`[onclick="showPage('${pageId}')"]`);
    if (activeLink) {
        activeLink.classList.add('active');
    }

    // Scroll al top
    window.scrollTo(0, 0);
}

// Función para mostrar componentes
function showComponent(componentId) {
    // Asegúrate de que estás en la página de inicio (donde están los componentes)
    showPage('inicio');

    // Hacer scroll al componente específico después de un breve delay
    setTimeout(() => {
        const target = document.getElementById(componentId);
        if (target) {
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    }, 100);
}


// Inicializar
document.addEventListener('DOMContentLoaded', function () {
    showPage('inicio');
});