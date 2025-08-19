// Mobile Menu
const mobileMenuBtn = document.querySelector('.navbar__mobile-btn');
const mobileMenu = document.querySelector('.navbar__mobile-menu');
const mobileMenuIcon = mobileMenuBtn.querySelector('i');

mobileMenuBtn.addEventListener('click', () => {
    mobileMenu.classList.toggle('navbar__mobile-menu--active');
    if (mobileMenu.classList.contains('navbar__mobile-menu--active')) {
        mobileMenuIcon.classList.remove('fa-bars');
        mobileMenuIcon.classList.add('fa-times');
    } else {
        mobileMenuIcon.classList.remove('fa-times');
        mobileMenuIcon.classList.add('fa-bars');
    }
});

// Close mobile menu when a link is clicked
document.querySelectorAll('.navbar__mobile-link').forEach(link => {
    link.addEventListener('click', () => {
        mobileMenu.classList.remove('navbar__mobile-menu--active');
        mobileMenuIcon.classList.remove('fa-times');
        mobileMenuIcon.classList.add('fa-bars');
    });
});

// Navbar Scroll Effect
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('navbar--scrolled');
    } else {
        navbar.classList.remove('navbar--scrolled');
    }
});