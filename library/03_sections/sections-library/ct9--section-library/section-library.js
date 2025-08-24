/**
 * Section: QTDS Library (Standardized JS)
 * Version: 1.0
 * Description: This script handles fetching and displaying a limited number of articles.
 * It has been updated to use the standardized 'qtds-' prefixed class names.
 */

// Note: This is the simplified script from the CT-6 breakdown.
// The IntersectionObserver is assumed to be initialized in a global script (_main-ct6.js).
export function initLibrary(observer) {
    const API_URL = 'https://script.google.com/macros/s/AKfycby3YbARJUB4h1Xb77eANlUYyna4x9lHtuG_hzz34O1pZprwgVWX4iPszW9Bywi_agqT/exec?teaser';
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
            loader.textContent = "Không thể tải thư viện.";
        } finally {
            if (gridContainer.innerHTML !== '') loader.style.display = 'none';
        }
    }

    function renderArticles(articles) {
        gridContainer.innerHTML = articles.map(article => {
            const tagsHTML = (Array.isArray(article.category_tags) ? article.category_tags : [article.category_tags])
                .map(tag => `<span class="qtds-article-card__tag">${tag}</span>`).join('');
            
            // All classes in this template literal are now standardized with 'qtds-'
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

        // Assuming a global 'observer' is available from _main-ct6.js
        // This will need to be updated when we standardize the main script.
        if (typeof observer !== 'undefined') {
             document.querySelectorAll('.qtds-library__grid .qtds-scroll-animate').forEach(el => observer.observe(el));
        }
    }

    fetchArticles();
}

