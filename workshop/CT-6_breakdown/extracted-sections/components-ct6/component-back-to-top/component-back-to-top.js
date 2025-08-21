/**
 * Component: QTDS Back To Top (Standardized JS)
 * Version: 1.0
 * Description: This script handles the show/hide functionality for the back-to-top button.
 * It has been updated to use the standardized 'qtds-' prefixed class names.
 */

// Find the button using its new standardized class name
// Back To Top Component - Fixed version
const backToTopBtn = document.querySelector('.qtds-back-to-top');

if (backToTopBtn) {
    window.addEventListener('scroll', () => {
        // Sử dụng class 'show' thay vì BEM modifier
        if (window.scrollY > 400) {
            backToTopBtn.classList.add('show');
        } else {
            backToTopBtn.classList.remove('show');
        }
    });

    // Thêm sự kiện click
    backToTopBtn.addEventListener('click', (e) => {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}

