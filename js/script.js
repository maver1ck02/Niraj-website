const words = ["a Developer", "a Programmer", "AI/ML Enthusiast", "an IT Student"];
let index = 0;
let charIndex = 0;
let typingElement = document.querySelector(".typing");
let isDeleting = false;

function typeEffect() {
    let currentWord = words[index];
// DOM Elements
const preloader = document.querySelector('.preloader');
const header = document.querySelector('.header');
const hamburger = document.querySelector('.hamburger');
const navList = document.querySelector('.nav-list');
const navLinks = document.querySelectorAll('.nav-link');
const backToTopBtn = document.querySelector('.back-to-top');
const secretBtn = document.querySelector('.secret-btn');
const contactForm = document.querySelector('.contact-form form');
const currentYear = document.getElementById('currentYear');
const filterBtns = document.querySelectorAll('.filter-btn');
const workItems = document.querySelectorAll('.work-item');

// Preloader
window.addEventListener('load', () => {
    setTimeout(() => {
        preloader.classList.add('fade-out');
        setTimeout(() => {
            preloader.style.display = 'none';
        }, 500);
    }, 1000);
});

// Header Scroll Effect
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
    
    // Back to Top Button
    if (window.scrollY > 300) {
        backToTopBtn.classList.add('active');
    } else {
        backToTopBtn.classList.remove('active');
    }
});

// Mobile Navigation
hamburger.addEventListener('click', toggleMenu);

function toggleMenu() {
    hamburger.classList.toggle('active');
    navList.classList.toggle('active');
    document.body.style.overflow = navList.classList.contains('active') ? 'hidden' : '';
}

// Close mobile menu when clicking on nav links
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        if (navList.classList.contains('active')) {
            toggleMenu();
        }
    });
});

// Smooth Scrolling for Navigation Links
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
        }
    });
});

// Back to Top Button
backToTopBtn.addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Secret Button Animation
if (secretBtn) {
    secretBtn.addEventListener('click', function() {
        const states = [
            {text: 'Click to Unlock 🔓', color: 'white', bg: 'rgba(108, 92, 231, 0.1)'},
            {text: 'Project So Good, but It\'s Invisible 😂', color: '#fd79a8', bg: 'rgba(253, 121, 168, 0.1)'},
            {text: 'This could be YOUR project! Let\'s make it happen!', color: '#00cec9', bg: 'rgba(0, 206, 201, 0.1)', action: 'contact'}
        ];
        
        const currentState = this.dataset.state || 0;
        const nextState = (parseInt(currentState) + 1) % states.length;
        
        this.textContent = states[nextState].text;
        this.style.color = states[nextState].color;
        this.style.backgroundColor = states[nextState].bg;
        this.dataset.state = nextState;
        
        if (states[nextState].action === 'contact') {
            this.onclick = () => {
                window.location.href = '#contact';
            };
        }
    });
}

// Work Filter
filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        // Remove active class from all buttons
        filterBtns.forEach(btn => btn.classList.remove('active'));
        // Add active class to clicked button
        btn.classList.add('active');
        
        const filter = btn.dataset.filter;
        
        workItems.forEach(item => {
            if (filter === 'all' || item.dataset.category === filter) {
                item.style.display = 'block';
            } else {
                item.style.display = 'none';
            }
        });
    });
});

// Contact Form Submission
if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const formData = new FormData(contactForm);
        const submitBtn = contactForm.querySelector('button[type="submit"]');
        const originalBtnText = submitBtn.innerHTML;
        
        try {
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
            submitBtn.disabled = true;
            
            const response = await fetch(contactForm.action, {
                method: 'POST',
                body: formData,
                headers: {
                    'Accept': 'application/json'
                }
            });
            
            if (response.ok) {
                submitBtn.innerHTML = '<i class="fas fa-check"></i> Sent!';
                contactForm.reset();
                setTimeout(() => {
                    submitBtn.innerHTML = originalBtnText;
                }, 3000);
            } else {
                throw new Error('Form submission failed');
            }
        } catch (error) {
            submitBtn.innerHTML = '<i class="fas fa-times"></i> Error';
            console.error('Error:', error);
            setTimeout(() => {
                submitBtn.innerHTML = originalBtnText;
            }, 3000);
        } finally {
            submitBtn.disabled = false;
        }
    });
}

// Set Current Year in Footer
if (currentYear) {
    currentYear.textContent = new Date().getFullYear();
}

// Animate Skill Bars on Scroll
function animateSkillBars() {
    const skillItems = document.querySelectorAll('.skill-item');
    
    skillItems.forEach(item => {
        const skillProgress = item.querySelector('.skill-progress');
        const skillValue = item.dataset.level;
        
        if (isElementInViewport(item)) {
            skillProgress.style.width = `${skillValue}%`;
        }
    });
}

function isElementInViewport(el) {
    const rect = el.getBoundingClientRect();
    return (
        rect.top <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.bottom >= 0
    );
}

window.addEventListener('scroll', animateSkillBars);
window.addEventListener('load', animateSkillBars);

// Typing Effect
function initTypingEffect() {
    const words = ["a Developer", "a Programmer", "an AI/ML Enthusiast", "an IT Student"];
    const typingText = document.querySelector('.typing-text .text');
    const cursor = document.querySelector('.typing-text .cursor');
    
    if (!typingText) return;
    
    let wordIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 100;
    
    function type() {
        const currentWord = words[wordIndex];
        const currentChar = currentWord.substring(0, charIndex);
        
        typingText.textContent = currentChar;
        
        if (!isDeleting && charIndex < currentWord.length) {
            // Typing
            charIndex++;
            typingSpeed = 100;
        } else if (isDeleting && charIndex > 0) {
            // Deleting
            charIndex--;
            typingSpeed = 50;
        } else {
            // Change word
            isDeleting = !isDeleting;
            if (!isDeleting) {
                wordIndex = (wordIndex + 1) % words.length;
            }
            typingSpeed = isDeleting ? 1000 : 500;
        }
        
        setTimeout(type, typingSpeed);
    }
    
    // Start typing effect
    setTimeout(type, 1000);
}

// Initialize Scroll Animations
function initScrollAnimations() {
    // Initialize GSAP ScrollTrigger
    gsap.registerPlugin(ScrollTrigger);
    
    // Animate elements when they come into view
    gsap.utils.toArray('[data-aos]').forEach(element => {
        gsap.from(element, {
            scrollTrigger: {
                trigger: element,
                start: 'top 80%',
                toggleActions: 'play none none none'
            },
            opacity: 0,
            y: element.dataset.aos === 'fade-up' ? 50 : 
               element.dataset.aos === 'fade-down' ? -50 : 0,
            x: element.dataset.aos === 'fade-right' ? -50 : 
               element.dataset.aos === 'fade-left' ? 50 : 0,
            scale: element.dataset.aos === 'zoom-in' ? 0.8 : 1,
            duration: 1,
            ease: 'power3.out',
            delay: element.dataset.aosDelay ? parseFloat(element.dataset.aosDelay) * 0.1 : 0
        });
    });
    
    // Animate hero elements sequentially
    gsap.from('.hero-title span', {
        y: 50,
        opacity: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: 'power3.out'
    });
    
    gsap.from('.hero-subtitle', {
        y: 30,
        opacity: 0,
        duration: 0.8,
        delay: 0.4,
        ease: 'power3.out'
    });
    
    gsap.from('.hero-description', {
        y: 30,
        opacity: 0,
        duration: 0.8,
        delay: 0.6,
        ease: 'power3.out'
    });
    
    gsap.from('.hero-buttons', {
        y: 30,
        opacity: 0,
        duration: 0.8,
        delay: 0.8,
        ease: 'power3.out'
    });
    
    gsap.from('.image-container', {
        scale: 0.9,
        opacity: 0,
        duration: 1,
        delay: 0.5,
        ease: 'elastic.out(1, 0.5)'
    });
    
    // Animate work items on hover
    gsap.utils.toArray('.work-item').forEach(item => {
        item.addEventListener('mouseenter', () => {
            gsap.to(item, {
                y: -10,
                duration: 0.4,
                ease: 'power3.out'
            });
        });
        
        item.addEventListener('mouseleave', () => {
            gsap.to(item, {
                y: 0,
                duration: 0.4,
                ease: 'power3.out'
            });
        });
    });
}

// Initialize all functions when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    initScrollAnimations();
    initTypingEffect();
});
    if (isDeleting) {
        typingElement.textContent = currentWord.substring(0, charIndex - 1);
        charIndex--;
    } else {
        typingElement.textContent = currentWord.substring(0, charIndex + 1);
        charIndex++;
    }

    if (!isDeleting && charIndex === currentWord.length) {
        isDeleting = true;
        setTimeout(typeEffect, 1000); // Wait before deleting
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        index = (index + 1) % words.length;
        setTimeout(typeEffect, 500); // Wait before typing next word
    } else {
        setTimeout(typeEffect, isDeleting ? 50 : 100);
    }
}

function toggleMenu() {
    const navLinks = document.querySelector('.nav-links');
    navLinks.classList.toggle('active');
}

document.addEventListener("DOMContentLoaded", typeEffect);