/**
 * @fileoverview Factory function for creating a QTDS Article Card component.
 * This component is self-contained and generates standardized HTML.
 */

/**
 * Creates an article card HTML element from article data.
 * @param {object} article - The article data object from the API.
 * - {string} landing_page_url - The URL the card links to.
 * - {string} featured_image_url - The URL for the card's image.
 * - {string} title - The title of the article.
 * - {string} category_tags - Comma-separated string of tags.
 * - {string} short_description - A brief summary of the article.
 * @returns {HTMLElement} - The fully constructed article card element (an 'a' tag).
 */
function createQtdsArticleCard(article) {
    const card = document.createElement('a');
    card.href = article.landing_page_url || '#';
    
    // Áp dụng các class đã được chuẩn hóa với tiền tố 'qtds-'
    card.className = "qtds-article-card scroll-animate";

    const tags = String(article.category_tags || '')
        .split(',')
        .map(tag => tag.trim())
        .filter(Boolean); // Lọc ra các tag rỗng

    card.innerHTML = `
        <div class="qtds-article-card__image-wrapper">
            <img src="${article.featured_image_url || ''}"
                 alt="${article.title || 'Hình ảnh bài viết'}"
                 class="qtds-article-card__image"
                 loading="lazy"
                 onload="this.classList.add('loaded')">
        </div>
        <div class="qtds-article-card__body">
            <div class="qtds-article-card__tags">
                ${tags.map(tag => `<span class="qtds-article-card__tag">${tag}</span>`).join('')}
            </div>
            <h3 class="qtds-article-card__title">${article.title || 'Không có tiêu đề'}</h3>
            <p class="qtds-article-card__description">${article.short_description || ''}</p>
            <div class="qtds-article-card__action">
                Xem chi tiết <i class="fas fa-arrow-right"></i>
            </div>
        </div>
    `;

    return card;
}

/**
 * Initializes scroll-triggered animations for any visible article cards.
 * @param {string} selector - The CSS selector for the cards to be animated.
 */
function initQtdsArticleCardAnimation(selector = '.scroll-animate') {
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

    document.querySelectorAll(selector).forEach(el => {
        if (!el.classList.contains('active')) {
             observer.observe(el);
        }
    });
}