// ===== NAVBAR FUNCTIONALITY =====

// Mobile Menu Toggle
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const mobileMenu = document.getElementById('mobileMenu');
const menuIcon = mobileMenuBtn.querySelector('i');

// Toggle mobile menu when button is clicked
mobileMenuBtn.addEventListener('click', () => {
    mobileMenu.classList.toggle('navbar__mobile-menu--active');
    menuIcon.classList.toggle('fa-bars');
    menuIcon.classList.toggle('fa-times');
});

// Close mobile menu when a link is clicked
document.querySelectorAll('.navbar__mobile-link').forEach(link => {
    link.addEventListener('click', () => {
        mobileMenu.classList.remove('navbar__mobile-menu--active');
        menuIcon.classList.add('fa-bars');
        menuIcon.classList.remove('fa-times');
    });
});

// Navbar Scroll Effect - Add shadow when scrolling
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('navbar--scrolled');
    } else {
        navbar.classList.remove('navbar--scrolled');
    }
});