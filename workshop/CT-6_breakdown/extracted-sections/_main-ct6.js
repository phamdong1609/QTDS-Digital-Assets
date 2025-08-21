/**
 * File: _main-ct6.js (Standardized & Assembled)
 * Version: 2.1 (Aligned with CT-7)
 * Changes:
 * - Updated Back To Top functionality to use a simple '.show' class for LadiPage compatibility.
 */
document.addEventListener('DOMContentLoaded', () => {

    // ===== GLOBAL: SCROLL ANIMATIONS =====
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.qtds-scroll-animate').forEach(el => observer.observe(el));

    // ===== NAVBAR FUNCTIONALITY =====
    function initNavbar() {
        const navbar = document.getElementById('navbar');
        const mobileMenuBtn = document.getElementById('mobileMenuBtn');
        const mobileMenu = document.getElementById('mobileMenu');

        if (navbar) {
            window.addEventListener('scroll', () => {
                navbar.classList.toggle('qtds-navbar--scrolled', window.scrollY > 50);
            });
        }

        if (mobileMenuBtn && mobileMenu) {
            const menuIcon = mobileMenuBtn.querySelector('i');
            mobileMenuBtn.addEventListener('click', () => {
                mobileMenu.classList.toggle('qtds-navbar__mobile-menu--active');
                if (menuIcon) {
                    menuIcon.classList.toggle('fa-bars');
                    menuIcon.classList.toggle('fa-times');
                }
            });

            document.querySelectorAll('.qtds-navbar__mobile-link').forEach(link => {
                link.addEventListener('click', () => {
                    mobileMenu.classList.remove('qtds-navbar__mobile-menu--active');
                    if (menuIcon) {
                        menuIcon.classList.add('fa-bars');
                        menuIcon.classList.remove('fa-times');
                    }
                });
            });
        }
    }
    initNavbar();

    // ===== FAQ ACCORDION FUNCTIONALITY =====
    function initFaq() {
        document.querySelectorAll('.qtds-faq__button').forEach(button => {
            button.addEventListener('click', () => {
                const content = button.nextElementSibling;
                button.classList.toggle('qtds-faq__button--active');
                if (content.style.maxHeight) {
                    content.style.maxHeight = null;
                } else {
                    content.style.maxHeight = content.scrollHeight + "px";
                }
            });
        });
    }
    initFaq();

    // ===== LIBRARY LOADER FUNCTIONALITY =====
    function initLibrary() {
        const API_URL = 'https://script.google.com/macros/s/AKfycby3YbARJUB4h1Xb77eANlUYyna4x9lHtuG_hzz34O1pZprwgVWX4iPszW9Bywi_agqT/exec';
        const ARTICLES_TO_SHOW = 6;
        const gridContainer = document.getElementById('library-grid');
        const loader = document.getElementById('library-loader');

        if (!gridContainer || !loader) return;

        async function fetchArticles() {
            try {
                const response = await fetch(API_URL);
                if (!response.ok) throw new Error('Network response was not ok');
                const data = await response.json();
                if (data && data.articles) {
                    const sortedArticles = data.articles.sort((a, b) => new Date(b.publish_date) - new Date(a.publish_date));
                    renderArticles(sortedArticles.slice(0, ARTICLES_TO_SHOW));
                }
            } catch (error) {
                console.error("Library fetch error:", error);
                loader.textContent = "Không thể tải thư viện.";
            } finally {
                if (gridContainer.innerHTML !== '') loader.style.display = 'none';
            }
        }

        function renderArticles(articles) {
            gridContainer.innerHTML = articles.map(article => {
                const tagsHTML = (Array.isArray(article.category_tags) ? article.category_tags : [article.category_tags])
                    .map(tag => `<span class="qtds-article-card__tag">${tag}</span>`).join('');
                return `
                    <a href="${article.landing_page_url}" target="_blank" rel="noopener noreferrer" class="qtds-scroll-animate qtds-card qtds-article-card">
                        <div class="qtds-article-card__image-wrapper">
                            <img src="${article.featured_image_url}" alt="${article.title}" class="qtds-article-card__image" loading="lazy">
                        </div>
                        <div class="qtds-card__body">
                            <div>${tagsHTML}</div>
                            <h4 class="qtds-article-card__title">${article.title}</h4>
                            <p class="qtds-article-card__description">${article.short_description}</p>
                            <div class="qtds-article-card__cta">
                                <span class="qtds-btn-like">Xem chi tiết <i class="fas fa-arrow-right"></i></span>
                            </div>
                        </div>
                    </a>`;
            }).join('');
            document.querySelectorAll('.qtds-library__grid .qtds-scroll-animate').forEach(el => observer.observe(el));
        }

        fetchArticles();
    }
    initLibrary();

    // ===== BACK TO TOP FUNCTIONALITY (Aligned with CT-7) =====
    function initBackToTop() {
        const backToTopBtn = document.querySelector('.qtds-back-to-top');
        if (backToTopBtn) {
            window.addEventListener('scroll', () => {
                // Using simple '.show' class for LadiPage compatibility
                backToTopBtn.classList.toggle('show', window.scrollY > 400);
            });
            // Add click event for smooth scroll
            backToTopBtn.addEventListener('click', (e) => {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: 'smooth' });
            });
        }
    }
    initBackToTop();

});
