/**
 * File: ct9-init.js (Master Initialization Script for CT9)
 * Version: 4.1 (Path Fixed)
 * Description: This is the central controller that imports and initializes all component modules.
 */

// --- MODULE IMPORTS (Corrected Paths) ---
import { initBackToTop } from './component/backToTop.js';
import { initFaq } from './component/faq.js';
import { initNavbar } from './component/navbar.js';
import { initLibrary } from './component/library.js';

document.addEventListener('DOMContentLoaded', () => {

    // ===== 1. GLOBAL: SCROLL ANIMATIONS =====
    // This observer is defined once and passed to modules that need it.
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    // Initial observation run for elements present on page load.
    document.querySelectorAll('.qtds-scroll-animate').forEach(el => observer.observe(el));


    // ===== INITIALIZE ALL MODULES =====
    initNavbar();
    initFaq();
    initLibrary(observer); // Pass the observer to the library module
    initBackToTop();

});
