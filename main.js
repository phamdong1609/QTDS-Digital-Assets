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
                    mobileMenu.classList.toggle('navbar__mobile-menu--active');
                    if (menuIcon) {
                        menuIcon.classList.toggle('fa-bars');
                        menuIcon.classList.toggle('fa-times');
                    }
                });

                // Close mobile menu when clicking links
                document.querySelectorAll('.navbar__mobile-link').forEach(link => {
                    link.addEventListener('click', () => {
                        mobileMenu.classList.remove('navbar__mobile-menu--active');
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
                        navbar.classList.add('navbar--scrolled');
                    } else {
                        navbar.classList.remove('navbar--scrolled');
                    }
                });
            }

            // Back to Top Button
            const backToTopBtn = document.getElementById('backToTopBtn');
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
            }, {
                threshold: 0.1
            });

            document.querySelectorAll('.scroll-animate').forEach(el => observer.observe(el));

            // =================================================================
            // LIBRARY FUNCTIONALITY
            // =================================================================

            /**
             * Load articles from API
             * @param {boolean} isLoadMore - Flag for load more action
             */
            async function loadArticles(isLoadMore = false) {
                if (isLoading) return;
                isLoading = true;

                if (isLoadMore) {
                    ui.loadMoreBtn.classList.add('loading');
                } else {
                    currentPage = 1;
                    displayedArticlesCount = 0;
                    ui.loader.style.display = 'flex';
                    ui.grid.innerHTML = '';

                    // Show skeleton cards on initial load
                    if (isInitialLoad) {
                        for (let i = 0; i < ARTICLES_PER_PAGE; i++) {
                            ui.grid.insertAdjacentHTML('beforeend', '<div class="skeleton-card"></div>');
                        }
                    }
                }

                ui.empty.style.display = 'none';

                const params = new URLSearchParams({
                    page: currentPage,
                    limit: ARTICLES_PER_PAGE,
                    filter: currentFilter,
                    search: searchTerm,
                });

                try {
                    const response = await fetch(`${API_URL}?${params.toString()}`);
                    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

                    const data = await response.json();
                    if (data.error) throw new Error(data.message);

                    if (currentPage === 1) {
                        ui.grid.innerHTML = '';
                    }

                    // Render filters and featured posts on initial load
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
                    ui.grid.innerHTML = '';
                    ui.empty.textContent = "Đã có lỗi xảy ra khi tải dữ liệu. Vui lòng thử lại sau.";
                    ui.empty.style.display = 'block';
                } finally {
                    isLoading = false;
                    ui.loader.style.display = 'none';
                    ui.loadMoreBtn.classList.remove('loading');
                }
            }

            /**
             * Render article cards
             * @param {Array} articles - Array of article objects
             */
            function renderArticles(articles) {
                const fragment = document.createDocumentFragment();

                articles.forEach((article, index) => {
                    const categoryTags = String(article.category_tags || '').split(',').map(tag => tag.trim());
                    const cardElement = createArticleCard(article, categoryTags, index);
                    fragment.appendChild(cardElement);
                });

                ui.grid.appendChild(fragment);

                // Observe new cards for animations
                document.querySelectorAll('.article-card:not(.active)').forEach(el => {
                    observer.observe(el);
                });
            }

            /**
             * Create article card element
             * @param {Object} article - Article data
             * @param {Array} tags - Category tags
             * @param {Number} index - Card index for animation delay
             */
            function createArticleCard(article, tags, index) {
                const card = document.createElement('a');
                card.href = article.landing_page_url;
                card.className = "article-card card scroll-animate";
                card.style.animationDelay = `${index * 50}ms`;

                card.innerHTML = `
                    <div class="article-card__image-wrapper">
                        <img src="${article.featured_image_url}"
                             alt="${article.title}"
                             class="article-card__image"
                             loading="lazy"
                             onload="this.classList.add('loaded')">
                    </div>
                    <div class="article-card__body">
                        <div class="article-card__tags">
                            ${tags.filter(Boolean).map(tag =>
                                `<span class="article-card__tag">${tag}</span>`
                            ).join('')}
                        </div>
                        <h3 class="article-card__title">${article.title}</h3>
                        <p class="article-card__description">${article.short_description}</p>
                        <div class="article-card__action">
                            Xem chi tiết <i class="fas fa-arrow-right"></i>
                        </div>
                    </div>
                `;

                return card;
            }

            /**
             * Render filter buttons
             * @param {Array} categories - Array of category strings
             */
            function renderFilters(categories) {
                if (!categories || categories.length === 0 || !ui.filters) return;

                ui.filters.innerHTML = `
                    <button class="filter-btn active" data-category="Tất cả" aria-pressed="true">
                        Tất cả
                    </button>
                ` + categories.map(cat => `
                    <button class="filter-btn" data-category="${cat}" aria-pressed="false">
                        ${cat}
                    </button>
                `).join('');

                // Add event listeners to filter buttons
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

            /**
             * Render featured posts carousel
             * @param {Array} featuredArticles - Array of featured articles
             */
            function renderFeaturedPosts(featuredArticles) {
                if (!featuredArticles || featuredArticles.length === 0 || !ui.featuredSection) {
                    if (ui.featuredSection) ui.featuredSection.classList.add('hidden');
                    return;
                }

                ui.featuredSection.classList.remove('hidden');
                ui.featuredWrapper.innerHTML = '';

                featuredArticles.forEach(article => {
                    const categoryTags = String(article.category_tags || '').split(',').map(tag => tag.trim());
                    const featuredCard = createArticleCard(article, categoryTags, 0);
                    featuredCard.className = "featured-card article-card card";

                    const slide = document.createElement('div');
                    slide.className = 'swiper-slide';
                    slide.appendChild(featuredCard);

                    ui.featuredWrapper.appendChild(slide);
                });

                // Initialize Swiper
                if (featuredSwiper) featuredSwiper.destroy(true, true);

                featuredSwiper = new Swiper('#featured-swiper', {
                    effect: 'coverflow',
                    grabCursor: true,
                    centeredSlides: true,
                    slidesPerView: 'auto',
                    loop: featuredArticles.length > 3,
                    autoplay: {
                        delay: 5000,
                        disableOnInteraction: false
                    },
                    coverflowEffect: {
                        rotate: 50,
                        stretch: 0,
                        depth: 100,
                        modifier: 1,
                        slideShadows: true
                    },
                    pagination: {
                        el: '.swiper-pagination',
                        clickable: true
                    },
                    navigation: {
                        nextEl: '.swiper-button-next',
                        prevEl: '.swiper-button-prev'
                    },
                });
            }

            /**
             * Update UI state (load more button, empty message)
             */
            function updateUiState() {
                if (displayedArticlesCount < totalArticles) {
                    ui.loadMoreContainer.classList.remove('hidden');
                    ui.loadMoreBtn.classList.remove('hidden');
                } else {
                    ui.loadMoreContainer.classList.add('hidden');
                }

                if (displayedArticlesCount === 0 && !isLoading) {
                    ui.empty.textContent = "Không tìm thấy bài viết nào phù hợp với tiêu chí của bạn.";
                    ui.empty.style.display = 'block';
                } else {
                    ui.empty.style.display = 'none';
                }
            }

            // =================================================================
            // EVENT LISTENERS
            // =================================================================

            // Search functionality with debounce
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

            // Load more button
            if (ui.loadMoreBtn) {
                ui.loadMoreBtn.addEventListener('click', () => {
                    if (!isLoading) {
                        currentPage++;
                        loadArticles(true);
                    }
                });
            }

            // Infinite scroll
            const infiniteScrollObserver = new IntersectionObserver((entries) => {
                const entry = entries[0];
                if (entry.isIntersecting && !isLoading && displayedArticlesCount < totalArticles) {
                    currentPage++;
                    loadArticles(true);
                }
            }, {
                rootMargin: '0px 0px 400px 0px'
            });

            if (ui.loadMoreContainer) {
                infiniteScrollObserver.observe(ui.loadMoreContainer);
            }

            // =================================================================
            // INITIALIZE LIBRARY
            // =================================================================
            if (ui.grid && ui.loader) {
                loadArticles();
            } else {
                console.warn("Thư viện không thể khởi tạo: Thiếu các phần tử HTML cần thiết.");
            }
        });