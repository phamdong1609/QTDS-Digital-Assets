 document.addEventListener('DOMContentLoaded', () => {
    // =================================================================
    // GLOBAL CONFIGURATIONS
    // =================================================================
    const API_URL = 'https://script.google.com/macros/s/AKfycby3YbARJUB4h1Xb77eANlUYyna4x9lHtuG_hzz34O1pZprwgVWX4iPszW9Bywi_agqT/exec';
    const ARTICLES_PER_PAGE = 9;

    // State variables
    let currentPage = 1;
    let totalArticles = 0;
    let displayedArticlesCount = 0;
    let currentFilter = 'Tất cả';
    let searchTerm = '';
    let featuredSwiper = null;
    let isLoading = false;
    let isInitialLoad = true;

    // UI elements
    const ui = {
        filters: document.getElementById('library-filters'),
        grid: document.getElementById('library-grid'),
        loader: document.getElementById('library-loader'),
        empty: document.getElementById('library-empty'),
        loadMoreBtn: document.getElementById('load-more-btn'),
        loadMoreContainer: document.getElementById('load-more-container'),
        searchInput: document.getElementById('search-input'),
        featuredSection: document.getElementById('featured-section'),
        featuredWrapper: document.getElementById('featured-post-grid'),
    };

    // =================================================================
    // NAVIGATION & UI INTERACTIONS
    // =================================================================

    // Mobile Menu
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const mobileMenu = document.getElementById('mobileMenu');

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

    // Navbar Scroll Effect
    const navbar = document.getElementById('navbar');
    if (navbar) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                navbar.classList.add('qtds-navbar--scrolled');
            } else {
                navbar.classList.remove('qtds-navbar--scrolled');
            }
        });
    }

    // Back to Top Button
    const backToTopBtn = document.querySelector('.qtds-back-to-top');
    if (backToTopBtn) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 400) {
                backToTopBtn.classList.add('show');
            } else {
                backToTopBtn.classList.remove('show');
            }
        });

        backToTopBtn.addEventListener('click', (e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    // Scroll Animations
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.qtds-scroll-animate').forEach(el => observer.observe(el));

    // =================================================================
    // LIBRARY FUNCTIONALITY
    // =================================================================

    async function loadArticles(isLoadMore = false) {
        if (isLoading) return;
        isLoading = true;

        if (isLoadMore) {
            ui.loadMoreBtn.classList.add('loading');
        } else {
            currentPage = 1;
            displayedArticlesCount = 0;
            if (ui.loader) ui.loader.style.display = 'flex';
            if (ui.grid) ui.grid.innerHTML = '';
            if (isInitialLoad && ui.grid) {
                for (let i = 0; i < ARTICLES_PER_PAGE; i++) {
                    ui.grid.insertAdjacentHTML('beforeend', '<div class="skeleton-card"></div>');
                }
            }
        }

        if (ui.empty) ui.empty.style.display = 'none';

        const params = new URLSearchParams({ page: currentPage, limit: ARTICLES_PER_PAGE, filter: currentFilter, search: searchTerm });

        try {
            const response = await fetch(`${API_URL}?${params.toString()}`);
            if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
            const data = await response.json();
            if (data.error) throw new Error(data.message);

            if (currentPage === 1 && ui.grid) ui.grid.innerHTML = '';

            if (isInitialLoad && data.metadata) {
                renderFilters(data.metadata.categories || []);
                renderFeaturedPosts(data.metadata.featured || []);
                isInitialLoad = false;
            }

            renderArticles(data.articles || []);
            totalArticles = data.totalItems || 0;
            displayedArticlesCount += (data.articles || []).length;
            updateUiState();

        } catch (error) {
            console.error("Error loading articles:", error);
            if (ui.grid) ui.grid.innerHTML = '';
            if (ui.empty) {
                ui.empty.textContent = "Đã có lỗi xảy ra khi tải dữ liệu. Vui lòng thử lại sau.";
                ui.empty.style.display = 'block';
            }
        } finally {
            isLoading = false;
            if (ui.loader) ui.loader.style.display = 'none';
            if (ui.loadMoreBtn) ui.loadMoreBtn.classList.remove('loading');
        }
    }

    function renderArticles(articles) {
        if (!ui.grid) return;
        const fragment = document.createDocumentFragment();
        articles.forEach((article, index) => {
            const cardElement = createArticleCard(article, index);
            fragment.appendChild(cardElement);
        });
        ui.grid.appendChild(fragment);
        document.querySelectorAll('.qtds-article-card:not(.active)').forEach(el => observer.observe(el));
    }

    function createArticleCard(article, index) {
        const card = document.createElement('a');
        card.href = article.landing_page_url;
        card.className = "qtds-article-card qtds-scroll-animate";
        card.style.animationDelay = `${index * 50}ms`;
        const tags = String(article.category_tags || '').split(',').map(tag => tag.trim()).filter(Boolean);

        card.innerHTML = `
            <div class="qtds-article-card__image-wrapper">
                <img src="${article.featured_image_url}" alt="${article.title}" class="qtds-article-card__image" loading="lazy" onload="this.classList.add('loaded')">
            </div>
            <div class="qtds-article-card__body">
                <div class="qtds-article-card__tags">
                    ${tags.map(tag => `<span class="qtds-article-card__tag">${tag}</span>`).join('')}
                </div>
                <h3 class="qtds-article-card__title">${article.title}</h3>
                <p class="qtds-article-card__description">${article.short_description}</p>
                <div class="qtds-article-card__action">
                    Xem chi tiết <i class="fas fa-arrow-right"></i>
                </div>
            </div>
        `;
        return card;
    }

    function renderFilters(categories) {
        if (!categories || categories.length === 0 || !ui.filters) return;
        ui.filters.innerHTML = `
            <button class="filter-btn active" data-category="Tất cả" aria-pressed="true">Tất cả</button>
            ${categories.map(cat => `<button class="filter-btn" data-category="${cat}" aria-pressed="false">${cat}</button>`).join('')}
        `;
        ui.filters.querySelectorAll('.filter-btn').forEach(btn => {
            btn.addEventListener('click', function() {
                if (isLoading) return;
                ui.filters.querySelector('.active')?.classList.remove('active');
                this.classList.add('active');
                currentFilter = this.dataset.category;
                loadArticles(false);
            });
        });
    }

    function renderFeaturedPosts(featuredArticles) {
        if (!featuredArticles || featuredArticles.length === 0 || !ui.featuredSection) {
            if (ui.featuredSection) ui.featuredSection.classList.add('hidden');
            return;
        }
        ui.featuredSection.classList.remove('hidden');
        if (ui.featuredWrapper) ui.featuredWrapper.innerHTML = '';

        featuredArticles.forEach(article => {
            const featuredCard = createArticleCard(article, 0);
            featuredCard.className = "qtds-featured-card qtds-article-card"; // Ensure correct classes
            const slide = document.createElement('div');
            slide.className = 'swiper-slide';
            slide.appendChild(featuredCard);
            if (ui.featuredWrapper) ui.featuredWrapper.appendChild(slide);
        });

        if (featuredSwiper) featuredSwiper.destroy(true, true);
        featuredSwiper = new Swiper('#featured-swiper', {
            effect: 'coverflow',
            grabCursor: true,
            centeredSlides: true,
            loop: featuredArticles.length > 3,
            autoplay: { 
                delay: 5000, 
                disableOnInteraction: false 
            },
            slidesPerView: 1,
            spaceBetween: 30,
            coverflowEffect: {
                rotate: 50,
                stretch: 0,
                depth: 100,
                modifier: 1,
                slideShadows: true,
            },
            pagination: {
                el: '.swiper-pagination',
                clickable: true,
            },
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
            },
            breakpoints: {
                640: {
                    slidesPerView: 2,
                    spaceBetween: 20,
                },
                1024: {
                    slidesPerView: 3,
                    spaceBetween: 50,
                }
            }
        });
    }

    function updateUiState() {
        if (ui.loadMoreContainer && ui.loadMoreBtn) {
            if (displayedArticlesCount < totalArticles) {
                ui.loadMoreContainer.classList.remove('hidden');
                ui.loadMoreBtn.classList.remove('hidden');
            } else {
                ui.loadMoreContainer.classList.add('hidden');
            }
        }
        if (ui.empty) {
            if (displayedArticlesCount === 0 && !isLoading) {
                ui.empty.textContent = "Không tìm thấy bài viết nào phù hợp với tiêu chí của bạn.";
                ui.empty.style.display = 'block';
            } else {
                ui.empty.style.display = 'none';
            }
        }
    }

    // Event Listeners
    let searchTimeout;
    if (ui.searchInput) {
        ui.searchInput.addEventListener('input', (e) => {
            clearTimeout(searchTimeout);
            searchTimeout = setTimeout(() => {
                searchTerm = e.target.value.trim();
                loadArticles(false);
            }, 500);
        });
    }

    if (ui.loadMoreBtn) {
        ui.loadMoreBtn.addEventListener('click', () => {
            if (!isLoading) {
                currentPage++;
                loadArticles(true);
            }
        });
    }

    const infiniteScrollObserver = new IntersectionObserver((entries) => {
        const entry = entries[0];
        if (entry.isIntersecting && !isLoading && displayedArticlesCount < totalArticles) {
            currentPage++;
            loadArticles(true);
        }
    }, { rootMargin: '0px 0px 400px 0px' });

    if (ui.loadMoreContainer) {
        infiniteScrollObserver.observe(ui.loadMoreContainer);
    }

    // Initialize Library
    if (ui.grid && ui.loader) {
        loadArticles();
    } else {
        // console.warn("Thư viện không thể khởi tạo: Thiếu các phần tử HTML cần thiết.");
    }
});