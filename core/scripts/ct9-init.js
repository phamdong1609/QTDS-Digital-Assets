/**
 * File: ct9-init.js (Master Initialization Script for CT9)
 * Version: 5.0 (Standardized & Co-located)
 * Description: Kích hoạt các module JavaScript cho trang CT9.
 * Tất cả các module được import từ vị trí gốc của chúng trong /library.
 */

// --- MODULE IMPORTS (ĐÃ CHUẨN HÓA) ---
import { initBackToTop } from '../library/01_atoms/component-back-to-top/component-back-to-top.js';
import { initFaq } from '../library/03_sections/sections-faq/ct9--section-faq/section-faq.js';
import { initNavbar } from '../library/03_sections/sections-navbar/ct9--section-navbar/section-navbar.js';
import { initLibrary } from '../library/03_sections/sections-library/ct9--section-library/section-library.js';

document.addEventListener('DOMContentLoaded', () => {

    // ===== 1. GLOBAL: SCROLL ANIMATIONS =====
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.qtds-scroll-animate').forEach(el => observer.observe(el));


    // ===== INITIALIZE ALL MODULES =====
    initNavbar();
    initFaq();
    initLibrary(observer);
    initBackToTop();

});
