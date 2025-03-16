const words = ["a Developer", "a Programmer", "AI/ML Enthusiast", "an IT Student"];
let index = 0;
let charIndex = 0;
let typingElement = document.querySelector(".typing");
let isDeleting = false;

function typeEffect() {
    let currentWord = words[index];

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