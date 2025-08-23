/**
 * File: ct9-init.js (Master Initialization Script for CT9)
 * Version: 3.0 (Unified)
 * Description: This is the single source of truth for initializing all JavaScript functionality on the CT9 page.
 * It handles scroll animations, navbar, FAQ, library loading, and back-to-top button.
 */
document.addEventListener('DOMContentLoaded', () => {

    // ===== 1. GLOBAL: SCROLL ANIMATIONS =====
    // This observer is defined once and used by all other functions.
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    // Initial observation run
    document.querySelectorAll('.qtds-scroll-animate').forEach(el => observer.observe(el));


    // ===== INITIALIZE ALL MODULES =====
    initNavbar();
    initFaq();
    initLibrary();
    initBackToTop();

});