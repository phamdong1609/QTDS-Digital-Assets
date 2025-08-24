// ===== 3. FAQ ACCORDION FUNCTIONALITY =====
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