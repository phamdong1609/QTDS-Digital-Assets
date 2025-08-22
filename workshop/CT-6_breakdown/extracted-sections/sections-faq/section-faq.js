/**
 * Section: QTDS FAQ (Standardized JS)
 * Version: 1.0
 * Description: This script handles the accordion functionality for the FAQ section.
 * It has been updated to use the standardized 'qtds-' prefixed class names.
 */

// Select all buttons with the new standardized class
document.querySelectorAll('.qtds-faq__button').forEach(button => {
    button.addEventListener('click', () => {
        // Find the corresponding content panel
        const content = button.nextElementSibling;

        // Toggle the active state class on the button
        button.classList.toggle('qtds-faq__button--active');

        // Check if the content panel is open or closed and toggle its max-height
        if (content.style.maxHeight) {
            // If it's open, close it
            content.style.maxHeight = null;
        } else {
            // If it's closed, open it by setting max-height to its scroll height
            content.style.maxHeight = content.scrollHeight + "px";
        }
    });
});
