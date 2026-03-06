// Toggle Navbar Icon
let menuIcon = document.querySelector('#menu-icon');
let navbar = document.querySelector('.navbar');

menuIcon.onclick = () => {
    menuIcon.classList.toggle('bx-x');
    navbar.classList.toggle('active');
};

// Scroll Sections Active Link & Sticky Header
let sections = document.querySelectorAll('section');
let navLinks = document.querySelectorAll('header nav a');

window.onscroll = () => {
    sections.forEach(sec => {
        let top = window.scrollY;
        let offset = sec.offsetTop - 150;
        let height = sec.offsetHeight;
        let id = sec.getAttribute('id');

        if (top >= offset && top < offset + height) {
            navLinks.forEach(links => {
                links.classList.remove('active');
                document.querySelector('header nav a[href*=' + id + ']').classList.add('active');
            });
        };
    });

    // Sticky Navbar
    let header = document.querySelector('header');
    header.classList.toggle('sticky', window.scrollY > 100);

    // Remove toggle icon and navbar when click navbar link
    menuIcon.classList.remove('bx-x');
    navbar.classList.remove('active');
};

// Scroll Reveal
ScrollReveal({
    distance: '80px',
    duration: 2000,
    delay: 200
});

ScrollReveal().reveal('.hero-content, .heading', { origin: 'top' });
ScrollReveal().reveal('.hero-img, .services-container, .portfolio-box, .contact form', { origin: 'bottom' });
ScrollReveal().reveal('.hero-content h1, .about-img', { origin: 'left' });
ScrollReveal().reveal('.hero-content p, .about-content', { origin: 'right' });
ScrollReveal().reveal('.skill-box', { origin: 'bottom', interval: 200 });

// Typed.js
const typed = new Typed('.multiple-text', {
    strings: ['Logistics Specialist', 'Inventory Leader', 'AI Enthusiast', 'Automation Expert'],
    typeSpeed: 50,
    backSpeed: 50,
    backDelay: 1000,
    loop: true
});

// Google Form Submission
const contactForm = document.getElementById('contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
        e.preventDefault();

        const formData = new FormData(contactForm);
        const actionUrl = contactForm.action;

        // Display a loading state on the button
        const submitBtn = contactForm.querySelector('input[type="submit"]');
        const originalBtnText = submitBtn.value;
        submitBtn.value = 'Sending...';

        fetch(actionUrl, {
            method: 'POST',
            mode: 'no-cors',
            body: formData
        }).then(() => {
            alert('Thank you! Your message has been sent successfully.');
            contactForm.reset();
            submitBtn.value = originalBtnText;
        }).catch((error) => {
            alert('Oops! Something went wrong. Please try again.');
            console.error('Form submission error:', error);
            submitBtn.value = originalBtnText;
        });
    });
}
