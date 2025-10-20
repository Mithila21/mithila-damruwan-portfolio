document.addEventListener('DOMContentLoaded', () => {

    // --- NEW: Looping Typing Effect Logic ---
    const subtitleElement = document.getElementById('typing-subtitle');
    // You can add more phrases to this array!
    const textArray = [
        "A Passionate Software Engineering Student...",
        "A Full-Stack Developer...",
        "An AI and Cloud Enthusiast..."
    ];
    
    let textArrayIndex = 0; // Index for the current phrase
    let charIndex = 0; // Index for the current character
    let isDeleting = false; 

    // --- Configurable Speeds ---
    const typingSpeed = 100;   // Time in ms to type a character
    const deletingSpeed = 50;  // Time in ms to delete a character
    const delayBetweenWords = 2000; // Time in ms to pause after typing a phrase

    function typeLoop() {
        const currentText = textArray[textArrayIndex];

        // Logic for TYPING
        if (!isDeleting && charIndex < currentText.length) {
            subtitleElement.textContent += currentText.charAt(charIndex);
            charIndex++;
            setTimeout(typeLoop, typingSpeed);
        } 
        // Logic for DELETING
        else if (isDeleting && charIndex > 0) {
            subtitleElement.textContent = currentText.substring(0, charIndex - 1);
            charIndex--;
            setTimeout(typeLoop, deletingSpeed);
        } 
        // Logic for switching between phrases
        else {
            isDeleting = !isDeleting; // Flip the state
            if (!isDeleting) {
                // If we just finished deleting, move to the next word
                textArrayIndex = (textArrayIndex + 1) % textArray.length;
            }
            // Pause before starting the next action
            setTimeout(typeLoop, isDeleting ? delayBetweenWords : 500);
        }
    }

    // Start the typing effect
    typeLoop();
    // --- END of Looping Typing Effect Logic ---

    // --- Active Link on Scroll ---
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-links a');

    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (pageYOffset >= (sectionTop - sectionHeight / 3)) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').includes(current)) {
                link.classList.add('active');
            }
        });
    });

    // --- Intersection Observer for Fade-in Animation ---
    const observerOptions = {
        root: null, // viewport
        rootMargin: '0px',
        threshold: 0.1 // 10% of the element is visible
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe all content sections
    const contentSections = document.querySelectorAll('.content-section');
    contentSections.forEach(section => {
        observer.observe(section);
    });

    // --- NEW: Back to Top Button Logic ---
    const backToTopBtn = document.getElementById('back-to-top-btn');

    window.addEventListener('scroll', () => {
        // Show the button if the user has scrolled down more than the height of one screen
        if (window.scrollY > window.innerHeight) {
            backToTopBtn.classList.add('show');
        } else {
            backToTopBtn.classList.remove('show');
        }
    });
    // --- END of Back to Top Button Logic ---

    // --- NEW: Initialize Vanilla Tilt.js for 3D card effect ---
    VanillaTilt.init(document.querySelectorAll("[data-tilt]"), {
        max: 15,     // Max tilt rotation (degrees)
        speed: 400,  // Speed of the enter/exit transition
        glare: true, // Adds a reflective glare effect on hover
        "max-glare": 0.5 // The glare's opacity (0 to 1)
    });
    // --- END of Tilt.js Initialization ---
});