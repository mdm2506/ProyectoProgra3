// Función para mostrar páginas
function showPage(pageId) {
    // Ocultar todas las páginas
    document.querySelectorAll('.page').forEach(page => {
        page.classList.remove('active'); // Elimina la clase activa
        page.style.display = 'none'; // Oculta la sección
    });

    // Mostrar la página seleccionada
    const selectedPage = document.getElementById(pageId);
    selectedPage.style.display = 'block'; // Mostramos la página
    selectedPage.classList.add('active'); // Añadimos la clase activa

    // Actualizar navbar
    document.querySelectorAll('.nav-menu a').forEach(link => {
        link.classList.remove('active');
    });

    // Marcar como activo el link correspondiente
    const activeLink = document.querySelector(`[onclick="showPage('${pageId}')"]`);
    if (activeLink) {
        activeLink.classList.add('active');
    }

    // Desplazarse a la página activa de manera suave
    selectedPage.scrollIntoView({ behavior: 'smooth' });
}

// Inicializar
document.addEventListener('DOMContentLoaded', function() {
    showPage('inicio');
});
