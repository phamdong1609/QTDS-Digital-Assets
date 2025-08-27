    /**
     * Module: Back To Top Button
     * Description: Handles the show/hide and smooth scroll functionality.
     */
    function initBackToTop() {
        const backToTopBtn = document.querySelector('.qtds-back-to-top');
        if (backToTopBtn) {
            window.addEventListener('scroll', () => {
                backToTopBtn.classList.toggle('show', window.scrollY > 400);
            });
            backToTopBtn.addEventListener('click', (e) => {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: 'smooth' });
            });
        }
    }
    