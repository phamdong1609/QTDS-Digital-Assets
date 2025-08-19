/**
 * Section: QTDS Featured Posts
 * Description: Handles featured posts carousel by reusing the Article Card component.
 * Dependencies: Swiper.js, component-article-card.js
 * Version: 1.2 - Added spaceBetween for better layout
 */

class QTDSFeaturedSection {
    constructor() {
        this.swiper = null;
        // IMPORTANT: IDs must match the final HTML structure (e.g., from index.html)
        this.featuredSection = document.getElementById('featured-section'); 
        this.featuredWrapper = document.getElementById('featured-post-grid');
    }

    /**
     * Render featured posts carousel by calling the external card factory function.
     * @param {Array} featuredArticles - Array of featured articles.
     */
    render(featuredArticles) {
        if (!this.featuredSection || !this.featuredWrapper) {
            console.warn('Featured Section: Required HTML elements not found.');
            return;
        }

        if (!featuredArticles || featuredArticles.length === 0) {
            this.featuredSection.classList.add('hidden');
            return;
        }

        // Ensure the external factory function is available
        if (typeof createQtdsArticleCard !== 'function') {
            console.error('Featured Section: createQtdsArticleCard function is not defined. Make sure component-article-card.js is loaded first.');
            return;
        }

        this.featuredSection.classList.remove('hidden');
        this.featuredWrapper.innerHTML = ''; // Clear old content

        featuredArticles.forEach(article => {
            const cardElement = createQtdsArticleCard(article);
            cardElement.classList.add('qtds-featured-card');

            const slide = document.createElement('div');
            slide.className = 'swiper-slide';
            slide.appendChild(cardElement);
            this.featuredWrapper.appendChild(slide);
        });

        this.initSwiper(featuredArticles.length);
    }

    /**
     * Initialize Swiper carousel.
     * @param {number} articleCount - Number of articles.
     */
    initSwiper(articleCount) {
        if (this.swiper) {
            this.swiper.destroy(true, true);
        }

        // IMPORTANT: The selector '#featured-swiper' must match the ID in the final HTML
        this.swiper = new Swiper('#featured-swiper', {
            effect: 'coverflow',
            grabCursor: true,
            centeredSlides: true,
            slidesPerView: 'auto',
            loop: articleCount > 3,
            
            // NEW FIX: Adds space between the actual slides after they load.
            spaceBetween: 30,

            autoplay: {
                delay: 5000,
                disableOnInteraction: false,
            },
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
        });
    }
}
