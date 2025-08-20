document.addEventListener('DOMContentLoaded', () => {
            

            // Back to Top
            const backToTopBtn = document.getElementById('backToTopBtn');
            window.addEventListener('scroll', () => {
                window.scrollY > 400 ? backToTopBtn.classList.add('show') : backToTopBtn.classList.remove('show');
            });

            // Scroll Animations
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('active');
                        observer.unobserve(entry.target);
                    }
                });
            }, { threshold: 0.1 });

            document.querySelectorAll('.scroll-animate').forEach(el => observer.observe(el));

            
        }); 