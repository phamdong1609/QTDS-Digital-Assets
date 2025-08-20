/**
 * Component: QTDS Back To Top (Standardized JS)
 * Version: 1.0
 * Description: This script handles the show/hide functionality for the back-to-top button.
 * It has been updated to use the standardized 'qtds-' prefixed class names.
 */

// Find the button using its new standardized class name
const backToTopBtn = document.querySelector('.qtds-back-to-top');

if (backToTopBtn) {
    window.addEventListener('scroll', () => {
        // Check the scroll position
        if (window.scrollY > 400) {
            // Add the BEM modifier class to show the button
            backToTopBtn.classList.add('qtds-back-to-top--show');
        } else {
            // Remove the BEM modifier class to hide the button
            backToTopBtn.classList.remove('qtds-back-to-top--show');
        }
    });
}
