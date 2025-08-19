// Library Loader
function initLibrary() {
    const API_URL = '<https://script.google.com/macros/s/AKfycby3YbARJUB4h1Xb77eANlUYyna4x9lHtuG_hzz34O1pZprwgVWX4iPszW9Bywi_agqT/exec>';
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
                .map(tag => `<span class="article-card__tag">${tag}</span>`).join('');
            return `
                <a href="${article.landing_page_url}" target="_blank" rel="noopener noreferrer" class="scroll-animate card article-card">
                    <div class="article-card__image-wrapper">
                        <img src="${article.featured_image_url}" alt="${article.title}" class="article-card__image" loading="lazy">
                    </div>
                    <div class="card__body">
                        <div>${tagsHTML}</div>
                        <h4 class="article-card__title">${article.title}</h4>
                        <p class="article-card__description">${article.short_description}</p>
                        <div class="article-card__cta">
                            <span class="btn-like">Xem chi tiết <i class="fas fa-arrow-right"></i></span>
                        </div>
                    </div>
                </a>`;
        }).join('');
        document.querySelectorAll('.library__grid .scroll-animate').forEach(el => observer.observe(el));
    }

    fetchArticles();
}

// Gọi hàm initLibrary trong DOMContentLoaded
initLibrary();
