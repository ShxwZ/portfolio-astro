/**
 * Utility for handling anchor navigation on pages with fixed header
 * Compatible with Astro View Transitions
 */

/**
 * Gets header height from CSS variables
 * @returns {number} Header height in pixels
 */
function getHeaderHeight() {
    // Get CSS variable --nav-height
    const navHeight = getComputedStyle(document.documentElement)
        .getPropertyValue('--nav-height')
        .trim();
    
    // Convert to number (remove 'px' if exists)
    return parseInt(navHeight) || (window.innerWidth <= 1000 ? 70 : 80);
}

/**
 * Scrolls to an element considering the fixed header
 * @param {string} hash - Element hash (e.g.: '#contact')
 * @param {object} options - Configuration options
 * @param {number} options.offset - Additional offset in pixels (default: 20)
 * @param {string} options.behavior - Scroll behavior ('smooth' | 'instant')
 * @param {number} options.delay - Delay before scroll in ms
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
 * Initializes the anchor navigation system
 * @param {object} config - Configuration
 * @param {number} config.offset - Additional offset in pixels
 * @param {number} config.astroPageLoadDelay - Delay for astro:page-load
 * @param {number} config.domContentLoadedDelay - Delay for DOMContentLoaded
 */
function initAnchorNavigation(config = {}) {
    const {
        offset = 20,
        astroPageLoadDelay = 100,
        domContentLoadedDelay = 200
    } = config;

    // Handle navigation with Astro View Transitions
    document.addEventListener('astro:page-load', () => {
        scrollToAnchor(window.location.hash, {
            offset,
            behavior: 'smooth',
            delay: astroPageLoadDelay
        });
    });

    // Handle normal page load
    document.addEventListener('DOMContentLoaded', () => {
        scrollToAnchor(window.location.hash, {
            offset,
            behavior: 'smooth',
            delay: domContentLoadedDelay
        });
    });
}

// Export for module use
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        scrollToAnchor,
        initAnchorNavigation,
        getHeaderHeight
    };
}

// Make globally available for inline use
window.AnchorNavigation = {
    scrollToAnchor,
    initAnchorNavigation,
    getHeaderHeight
};
