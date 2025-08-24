/**
 * File: ct9-init.js (Master Initialization Script for CT9)
 * Version: 5.0 (Standardized & Co-located)
 * Description: Kích hoạt các module JavaScript cho trang CT9.
 * Tất cả các module được import từ vị trí gốc của chúng trong /library.
 */

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
    initLibrary(); 
    initBackToTop();

});
