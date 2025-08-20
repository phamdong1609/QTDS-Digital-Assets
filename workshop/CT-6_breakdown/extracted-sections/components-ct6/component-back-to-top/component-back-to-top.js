// Back to Top
            const backToTopBtn = document.getElementById('backToTopBtn');
            window.addEventListener('scroll', () => {
                window.scrollY > 400 ? backToTopBtn.classList.add('show') : backToTopBtn.classList.remove('show');
            });