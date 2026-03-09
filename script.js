// ========================================
// Portfolio Website - Enhanced JavaScript
// ========================================
// Features: Dark Mode, Typed Animation, Form Validation, Project Filtering
// ========================================

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initThemeToggle();
    initMobileMenu();
    initScrollAnimations();
    initBackToTop();
    initActiveNavigation();
    initTypedAnimation();
    initProjectFilters();
    initContactForm();
    initSkillAnimations();
});

// ========================================
// DARK MODE TOGGLE
// ========================================

/**
 * Initialize dark mode toggle functionality
 * Saves user preference to localStorage
 */
function initThemeToggle() {
    const themeToggle = document.querySelector('.theme-toggle');
    const htmlElement = document.documentElement;
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

    // Load saved theme preference or use system preference
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        applyTheme(savedTheme);
    } else if (prefersDark) {
        applyTheme('dark');
    }

    if (themeToggle) {
        themeToggle.addEventListener('click', function() {
            const currentTheme = document.body.classList.contains('dark-mode') ? 'dark' : 'light';
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
            applyTheme(newTheme);
            localStorage.setItem('theme', newTheme);
        });
    }
}

/**
 * Apply theme to the document
 * @param {string} theme - 'light' or 'dark'
 */
function applyTheme(theme) {
    if (theme === 'dark') {
        document.body.classList.add('dark-mode');
    } else {
        document.body.classList.remove('dark-mode');
    }
}

// ========================================
// MOBILE MENU TOGGLE
// ========================================

/**
 * Initialize mobile menu hamburger functionality
 */
function initMobileMenu() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-right');
    const navLinks = document.querySelectorAll('.nav-right a');

    if (hamburger) {
        hamburger.addEventListener('click', function() {
            navMenu.classList.toggle('active');
        });
    }

    // Close menu when a link is clicked
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            navMenu.classList.remove('active');
        });
    });
}

// ========================================
// SCROLL ANIMATIONS
// ========================================

/**
 * Initialize Intersection Observer for fade-in animations
 */
function initScrollAnimations() {
    const faders = document.querySelectorAll('.fade-in');

    const appearOptions = {
        threshold: 0.15,
        rootMargin: "0px 0px -100px 0px"
    };

    const appearOnScroll = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (!entry.isIntersecting) return;
            entry.target.classList.add('appear');
            appearOnScroll.unobserve(entry.target);
        });
    }, appearOptions);

    faders.forEach(fader => {
        appearOnScroll.observe(fader);
    });
}

// ========================================
// BACK TO TOP BUTTON
// ========================================

/**
 * Show/hide back to top button based on scroll position
 */
function initBackToTop() {
    const backToTopButton = document.querySelector('.back-to-top');

    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            backToTopButton.classList.add('active');
        } else {
            backToTopButton.classList.remove('active');
        }
    });
}

// ========================================
// ACTIVE NAVIGATION HIGHLIGHT
// ========================================

/**
 * Highlight the current active section in navigation
 */
function initActiveNavigation() {
    const highlightActiveSection = () => {
        const sections = document.querySelectorAll('section');
        const navLinks = document.querySelectorAll('.nav-right a');

        let current = '';

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;

            if (pageYOffset >= (sectionTop - 150)) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.style.color = '';
            if (link.getAttribute('href').substring(1) === current) {
                link.style.color = 'var(--accent-color)';
            }
        });
    };

    highlightActiveSection();
    window.addEventListener('scroll', highlightActiveSection);
}

// ========================================
// TYPED TEXT ANIMATION
// ========================================

/**
 * Create typing animation for hero text
 */
function initTypedAnimation() {
    const typingElement = document.querySelector('.typing-text');
    if (!typingElement) return;

    const text = typingElement.textContent;
    typingElement.textContent = '';
    let index = 0;

    const typeCharacter = () => {
        if (index < text.length) {
            typingElement.textContent += text.charAt(index);
            index++;
            setTimeout(typeCharacter, 50); // Adjust speed here
        }
    };

    // Start typing after a short delay
    setTimeout(typeCharacter, 500);
}

// ========================================
// PROJECT FILTERING
// ========================================

/**
 * Initialize project filtering functionality
 */
function initProjectFilters() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projects = document.querySelectorAll('.project');

    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            const filter = this.getAttribute('data-filter');

            // Update active button
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');

            // Filter projects with animation
            projects.forEach(project => {
                const category = project.getAttribute('data-category');

                if (filter === 'all' || category === filter) {
                    project.style.display = 'flex';
                    setTimeout(() => project.classList.add('appear'), 50);
                } else {
                    project.style.display = 'none';
                    project.classList.remove('appear');
                }
            });
        });
    });
}

// ========================================
// CONTACT FORM VALIDATION & SUBMISSION
// ========================================

/**
 * Initialize contact form with validation
 */
function initContactForm() {
    const form = document.getElementById('contactForm');
    if (!form) return;

    form.addEventListener('submit', function(e) {
        e.preventDefault();

        // Clear previous messages
        clearFormMessages();

        // Get form values
        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const message = document.getElementById('message').value.trim();

        // Validate form
        let isValid = true;

        if (!validateName(name)) {
            showError('nameError', 'Please enter a valid name');
            isValid = false;
        }

        if (!validateEmail(email)) {
            showError('emailError', 'Please enter a valid email address');
            isValid = false;
        }

        if (!validateMessage(message)) {
            showError('messageError', 'Please enter a message (at least 10 characters)');
            isValid = false;
        }

        if (isValid) {
            // Here you would typically send the form data to a server
            // For now, we'll just show a success message
            submitForm(name, email, message);
        }
    });
}

/**
 * Validate name field
 */
function validateName(name) {
    return name.length >= 2;
}

/**
 * Validate email field
 */
function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

/**
 * Validate message field
 */
function validateMessage(message) {
    return message.length >= 10;
}

/**
 * Show error message for form field
 */
function showError(elementId, message) {
    const errorElement = document.getElementById(elementId);
    const inputId = elementId.replace('Error', '');
    const inputElement = document.getElementById(inputId);

    if (errorElement) {
        errorElement.textContent = message;
        errorElement.classList.add('show');
    }

    if (inputElement) {
        inputElement.classList.add('error');
    }
}

/**
 * Clear form error messages
 */
function clearFormMessages() {
    const errorElements = document.querySelectorAll('.error-message');
    const inputElements = document.querySelectorAll('.form-group input, .form-group textarea');

    errorElements.forEach(el => {
        el.classList.remove('show');
        el.textContent = '';
    });

    inputElements.forEach(el => {
        el.classList.remove('error');
    });
}

/**
 * Handle form submission
 */
function submitForm(name, email, message) {
    const form = document.getElementById('contactForm');
    const formMessage = document.getElementById('formMessage');

    // Here you would send data to your backend
    // Example using fetch:
    // fetch('/api/contact', {
    //     method: 'POST',
    //     headers: { 'Content-Type': 'application/json' },
    //     body: JSON.stringify({ name, email, message })
    // })

    // For demo purposes, show success message
    formMessage.textContent = 'Thank you for your message! I\'ll get back to you soon.';
    formMessage.classList.remove('error');
    formMessage.classList.add('success');

    // Reset form
    form.reset();
    clearFormMessages();

    // Clear success message after 5 seconds
    setTimeout(() => {
        formMessage.classList.remove('success');
        formMessage.textContent = '';
    }, 5000);
}

// ========================================
// SKILL PROGRESS ANIMATIONS
// ========================================

/**
 * Animate skill progress bars when they come into view
 */
function initSkillAnimations() {
    const skillBars = document.querySelectorAll('.skill-progress');

    const observerOptions = {
        threshold: 0.5
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animation = 'slideIn 1s ease-out forwards';
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    skillBars.forEach(bar => {
        observer.observe(bar);
    });
}

// ========================================
// UTILITY FUNCTIONS
// ========================================

/**
 * Smooth scroll to element
 */
function smoothScrollTo(element) {
    element.scrollIntoView({ behavior: 'smooth' });
}

/**
 * Debounce function for performance optimization
 */
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}
