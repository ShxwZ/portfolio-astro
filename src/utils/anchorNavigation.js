function getHeaderHeight() {
    // Obtener la variable CSS --nav-height
    const navHeight = getComputedStyle(document.documentElement)
        .getPropertyValue('--nav-height')
        .trim();
    
    // Convertir a número (remover 'px' si existe)
    return parseInt(navHeight) || (window.innerWidth <= 1000 ? 70 : 80);
}

/**
 * Hace scroll hacia un elemento considerando el header fijo
 * @param {string} hash - El hash del elemento (ej: '#contact')
 * @param {object} options - Opciones de configuración
 * @param {number} options.offset - Offset adicional en píxeles (default: 20)
 * @param {string} options.behavior - Comportamiento del scroll ('smooth' | 'instant')
 * @param {number} options.delay - Delay antes del scroll en ms
 */
function scrollToAnchor(hash = window.location.hash, options = {}) {
    const {
        offset = 20,
        behavior = 'smooth',
        delay = 0
    } = options;

    if (!hash) return;

    const executeScroll = () => {
        const targetElement = document.querySelector(hash);
        if (targetElement) {
            const headerHeight = getHeaderHeight();
            const elementTop = targetElement.offsetTop;
            const scrollPosition = elementTop - headerHeight - offset;

            window.scrollTo({
                top: scrollPosition,
                behavior: behavior
            });
        }
    };

    if (delay > 0) {
        setTimeout(executeScroll, delay);
    } else {
        executeScroll();
    }
}

/**
 * Inicializa el sistema de navegación con anclas
 * @param {object} config - Configuración
 * @param {number} config.offset - Offset adicional en píxeles
 * @param {number} config.astroPageLoadDelay - Delay para astro:page-load
 * @param {number} config.domContentLoadedDelay - Delay para DOMContentLoaded
 */
function initAnchorNavigation(config = {}) {
    const {
        offset = 20,
        astroPageLoadDelay = 100,
        domContentLoadedDelay = 200
    } = config;

    // Manejar navegación con Astro View Transitions
    document.addEventListener('astro:page-load', () => {
        scrollToAnchor(window.location.hash, {
            offset,
            behavior: 'smooth',
            delay: astroPageLoadDelay
        });
    });

    // Manejar carga normal de página
    document.addEventListener('DOMContentLoaded', () => {
        scrollToAnchor(window.location.hash, {
            offset,
            behavior: 'smooth',
            delay: domContentLoadedDelay
        });
    });
}

// Exportar para uso en módulos
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        scrollToAnchor,
        initAnchorNavigation,
        getHeaderHeight
    };
}

// Hacer disponible globalmente para uso inline
window.AnchorNavigation = {
    scrollToAnchor,
    initAnchorNavigation,
    getHeaderHeight
};
