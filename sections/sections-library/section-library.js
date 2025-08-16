/**
 * Section: QTDS Library
 * Description: Manages all functionality for the article library, including API calls,
 * searching, filtering, and rendering article cards using the component factory.
 * Dependencies: component-article-card.js
 * Version: 1.0
 */
class QTDSLibrarySection {
    constructor(apiUrl, articlesPerPage = 9) {
        this.API_URL = apiUrl;
        this.ARTICLES_PER_PAGE = articlesPerPage;

        // State variables
        this.currentPage = 1;
        this.totalArticles = 0;
        this.displayedCount = 0;
        this.currentFilter = 'Tất cả';
        this.searchTerm = '';
        this.isLoading = false;
        this.isInitialLoad = true;
        this.searchTimeout = null;

        // UI elements
        this.ui = {
            filters: document.getElementById('library-filters'),
            grid: document.getElementById('library-grid'),
            loader: document.getElementById('library-loader'),
            empty: document.getElementById('library-empty'),
            loadMoreBtn: document.getElementById('load-more-btn'),
            searchInput: document.getElementById('search-input'),
        };

        this.init();
    }

    /**
     * Initializes the library functionality and event listeners.
     */
    init() {
        if (!this.ui.grid || !this.ui.loader) {
            console.warn("Library Section: Cannot initialize. Required elements not found.");
            return;
        }
        this.addEventListeners();
        this.loadArticles();
    }

    /**
     * Adds all necessary event listeners.
     */
    addEventListeners() {
        if (this.ui.searchInput) {
            this.ui.searchInput.addEventListener('input', (e) => {
                clearTimeout(this.searchTimeout);
                this.searchTimeout = setTimeout(() => {
                    this.searchTerm = e.target.value.trim();
                    this.loadArticles(false);
                }, 500);
            });
        }

        if (this.ui.loadMoreBtn) {
            this.ui.loadMoreBtn.addEventListener('click', () => {
                if (!this.isLoading) {
                    this.currentPage++;
                    this.loadArticles(true);
                }
            });
        }
    }

    /**
     * Fetches and renders articles from the API.
     * @param {boolean} isLoadMore - True if loading more articles, false for a fresh load.
     */
    async loadArticles(isLoadMore = false) {
        if (this.isLoading) return;
        this.isLoading = true;

        if (isLoadMore) {
            this.ui.loadMoreBtn.classList.add('loading');
        } else {
            this.currentPage = 1;
            this.displayedCount = 0;
            this.ui.loader.style.display = 'flex';
            this.ui.grid.innerHTML = ''; // Clear grid for new search/filter
        }
        this.ui.empty.style.display = 'none';

        const params = new URLSearchParams({
            page: this.currentPage,
            limit: this.ARTICLES_PER_PAGE,
            filter: this.currentFilter,
            search: this.searchTerm,
        });

        try {
            const response = await fetch(`${this.API_URL}?${params.toString()}`);
            if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
            const data = await response.json();

            if (this.isInitialLoad && data.metadata) {
                this.renderFilters(data.metadata.categories || []);
                // IMPORTANT: Tell the Featured Section to render itself
                if (window.qtdsFeaturedSection && typeof window.qtdsFeaturedSection.render === 'function') {
                    window.qtdsFeaturedSection.render(data.metadata.featured || []);
                }
                this.isInitialLoad = false;
            }

            this.renderArticleCards(data.articles || []);
            this.totalArticles = data.totalItems || 0;
            this.displayedCount += (data.articles || []).length;
            this.updateUiState();
        } catch (error) {
            console.error("Error loading articles:", error);
            this.ui.empty.textContent = "Đã có lỗi xảy ra khi tải dữ liệu.";
            this.ui.empty.style.display = 'block';
        } finally {
            this.isLoading = false;
            this.ui.loader.style.display = 'none';
            this.ui.loadMoreBtn.classList.remove('loading');
        }
    }

    /**
     * Renders multiple article cards into the grid.
     * @param {Array} articles - An array of article data objects.
     */
    renderArticleCards(articles) {
        if (typeof createQtdsArticleCard !== 'function') {
            console.error('Library Section: createQtdsArticleCard is not available.');
            return;
        }
        const fragment = document.createDocumentFragment();
        articles.forEach(article => {
            const cardElement = createQtdsArticleCard(article); // Reuse the component
            fragment.appendChild(cardElement);
        });
        this.ui.grid.appendChild(fragment);

        // Animate new cards
        initQtdsArticleCardAnimation('.qtds-article-card:not(.active)');
    }

    /**
     * Renders filter buttons.
     * @param {Array} categories - An array of category strings.
     */
    renderFilters(categories) {
        this.ui.filters.innerHTML = `
            <button class="qtds-filter-btn active" data-category="Tất cả">Tất cả</button>
            ${categories.map(cat => `<button class="qtds-filter-btn" data-category="${cat}">${cat}</button>`).join('')}
        `;
        this.ui.filters.querySelectorAll('.qtds-filter-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                if (this.isLoading) return;
                this.ui.filters.querySelector('.active')?.classList.remove('active');
                e.currentTarget.classList.add('active');
                this.currentFilter = e.currentTarget.dataset.category;
                this.loadArticles(false);
            });
        });
    }

    /**
     * Updates the visibility of the 'load more' button and empty state message.
     */
    updateUiState() {
        const hasMore = this.displayedCount < this.totalArticles;
        this.ui.loadMoreBtn.classList.toggle('hidden', !hasMore);

        if (this.displayedCount === 0 && !this.isLoading) {
            this.ui.empty.textContent = "Không tìm thấy bài viết nào phù hợp.";
            this.ui.empty.style.display = 'block';
        } else {
            this.ui.empty.style.display = 'none';
        }
    }
}