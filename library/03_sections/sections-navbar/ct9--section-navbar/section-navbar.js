/**
 * Section: QTDS Navbar (Standardized JS)
 * Version: 1.0
 * Description: This script handles the mobile menu toggle and scroll effects for the navbar.
 * It has been updated to use the standardized 'qtds-' prefixed class names.
 */

document.addEventListener('DOMContentLoaded', () => {
    // ===== NAVBAR FUNCTIONALITY =====

    // --- Mobile Menu Toggle ---
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const mobileMenu = document.getElementById('mobileMenu');
    
    // Check if elements exist before adding listeners
    if (mobileMenuBtn && mobileMenu) {
        const menuIcon = mobileMenuBtn.querySelector('i');

        // Toggle mobile menu when button is clicked
        mobileMenuBtn.addEventListener('click', () => {
            mobileMenu.classList.toggle('qtds-navbar__mobile-menu--active');
            if (menuIcon) {
                menuIcon.classList.toggle('fa-bars');
                menuIcon.classList.toggle('fa-times');
            }
        });

        // Close mobile menu when a link is clicked
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

    // --- Navbar Scroll Effect ---
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
});
