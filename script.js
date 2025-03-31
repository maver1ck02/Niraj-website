// Typing Effect
const words = ["a Developer", "a Programmer", "an AI/ML Enthusiast", "an IT Student"];
let index = 0;
let charIndex = 0;
let isDeleting = false;
let typingSpeed = 100;

function typeEffect() {
    const currentWord = words[index];
    const currentChar = currentWord.substring(0, charIndex);
    document.querySelector('.typing').textContent = currentChar;
    
    if (!isDeleting && charIndex < currentWord.length) {
        charIndex++;
        typingSpeed = 100;
    } else if (isDeleting && charIndex > 0) {
        charIndex--;
        typingSpeed = 50;
    } else {
        isDeleting = !isDeleting;
        index = !isDeleting ? (index + 1) % words.length : index;
        typingSpeed = isDeleting ? 1500 : 500;
    }
    
    setTimeout(typeEffect, typingSpeed);
}

// Mobile Menu Toggle
function toggleMenu() {
    document.querySelector('.hamburger').classList.toggle('active');
    document.querySelector('.nav-links').classList.toggle('active');
    document.querySelector('.nav-overlay').classList.toggle('active');
    document.body.style.overflow = document.querySelector('.nav-links').classList.contains('active') ? 'hidden' : '';
}

// Smooth Scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 70,
                behavior: 'smooth'
            });
        }
    });
});

// Form Submission
// const contactForm = document.getElementById('messageForm');
// if (contactForm) {
//     contactForm.addEventListener('submit', function(e) {
//         e.preventDefault();
//         alert('Thank you! Your message has been sent.');
//         this.reset();
//     });
// }

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    typeEffect();
});

