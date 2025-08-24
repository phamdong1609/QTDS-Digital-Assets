/**
 * Section: QTDS Navbar (Standardized JS)
 * Version: 1.0
 * Description: This script handles the mobile menu toggle and scroll effects for the navbar.
 * It has been updated to use the standardized 'qtds-' prefixed class names.
 */

function initNavbar() {
    const navbar = document.getElementById('navbar');
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const mobileMenu = document.getElementById('mobileMenu');

    if (navbar) {
        window.addEventListener('scroll', () => {
            navbar.classList.toggle('qtds-navbar--scrolled', window.scrollY > 50);
        });
    }

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
}
