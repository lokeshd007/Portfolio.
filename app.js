// DOM Elements
const loadingScreen = document.getElementById('loadingScreen');
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-link');
const backToTop = document.getElementById('backToTop');
const contactForm = document.querySelector('.contact-form');
const typingText = document.querySelector('.typing-text');

// Loading Screen
window.addEventListener('load', () => {
    setTimeout(() => {
        loadingScreen.classList.add('hidden');
        setTimeout(() => {
            loadingScreen.style.display = 'none';
        }, 500);
    }, 3000);
});

// Typing Animation
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.textContent = '';
    
    function type() {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    type();
}

// Initialize typing animation when page loads
setTimeout(() => {
    if (typingText) {
        const text = typingText.dataset.text || 'Lokesh D';
        typeWriter(typingText, text, 150);
    }
}, 3500);

// Mobile Navigation
if (hamburger) {
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
        document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : 'auto';
    });
}

// Close mobile menu when clicking on a link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        if (hamburger) {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.style.overflow = 'auto';
        }
    });
});

// Smooth Scrolling Function
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        const navbarHeight = 80;
        const targetPosition = section.offsetTop - navbarHeight;
        
        window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
        });
    }
}

// Navigation Link Event Listeners
function initializeNavigation() {
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const href = link.getAttribute('href');
            if (href && href.startsWith('#')) {
                const targetId = href.substring(1);
                scrollToSection(targetId);
            }
        });
    });
}

// Initialize navigation after DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    initializeNavigation();
});

// Active Navigation Link Highlighting
function updateActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const scrollPos = window.scrollY + 120;

    sections.forEach(section => {
        const top = section.offsetTop;
        const bottom = top + section.offsetHeight;
        const id = section.getAttribute('id');

        if (scrollPos >= top && scrollPos <= bottom) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${id}`) {
                    link.classList.add('active');
                }
            });
        }
    });
}

// Back to Top Button
function toggleBackToTop() {
    if (window.scrollY > 300) {
        backToTop.classList.add('visible');
    } else {
        backToTop.classList.remove('visible');
    }
}

if (backToTop) {
    backToTop.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// Scroll Event Listeners
window.addEventListener('scroll', () => {
    updateActiveNavLink();
    toggleBackToTop();
    handleScrollAnimations();
});

// Intersection Observer for Animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            
            // Add specific animations for different elements
            if (entry.target.classList.contains('skill-tag')) {
                setTimeout(() => {
                    entry.target.style.animation = 'skillGlow 0.6s ease-out';
                }, Math.random() * 300);
            }
            
            if (entry.target.classList.contains('cert-card')) {
                setTimeout(() => {
                    entry.target.style.animation = 'certFloat 0.8s ease-out';
                }, Math.random() * 200);
            }
            
            if (entry.target.classList.contains('experience-card')) {
                entry.target.style.animation = 'slideInFromSide 0.8s ease-out';
            }
        }
    });
}, observerOptions);

// Observe elements for animations
function initializeAnimations() {
    const animatedElements = document.querySelectorAll('.skill-tag, .cert-card, .experience-card, .about-card, .education-card, .contact-item, .achievement-item');
    
    animatedElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(50px)';
        element.style.transition = 'all 0.6s cubic-bezier(0.16, 1, 0.3, 1)';
        observer.observe(element);
    });
}

// Initialize animations after page load
setTimeout(initializeAnimations, 3500);

// Scroll-triggered animations
function handleScrollAnimations() {
    const scrolled = window.scrollY;
    const parallaxElements = document.querySelectorAll('.hero-grid');
    
    parallaxElements.forEach(element => {
        const speed = 0.5;
        element.style.transform = `translateY(${scrolled * speed}px)`;
    });
}

// Contact Form Handling
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const formInputs = contactForm.querySelectorAll('.form-input');
        const submitButton = contactForm.querySelector('.btn-neon');
        
        // Disable form during submission
        formInputs.forEach(input => input.disabled = true);
        if (submitButton) {
            submitButton.disabled = true;
            submitButton.textContent = 'Sending...';
        }
        
        // Simulate form submission (replace with actual form handling)
        setTimeout(() => {
            showNotification('Message sent successfully!', 'success');
            contactForm.reset();
            
            // Re-enable form
            formInputs.forEach(input => input.disabled = false);
            if (submitButton) {
                submitButton.disabled = false;
                submitButton.textContent = 'Send Message';
            }
        }, 2000);
    });
}

// Notification System
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification--${type}`;
    notification.innerHTML = `
        <span>${message}</span>
        <button class="notification-close">&times;</button>
    `;
    
    // Add notification styles
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: rgba(0, 255, 255, 0.1);
        border: 1px solid var(--neon-blue);
        color: var(--neon-blue);
        padding: 1rem 1.5rem;
        border-radius: 5px;
        box-shadow: 0 0 20px rgba(0, 255, 255, 0.3);
        z-index: 10000;
        transform: translateX(400px);
        transition: transform 0.3s ease;
        display: flex;
        align-items: center;
        gap: 1rem;
        backdrop-filter: blur(10px);
    `;
    
    if (type === 'success') {
        notification.style.borderColor = 'var(--neon-green)';
        notification.style.color = 'var(--neon-green)';
        notification.style.background = 'rgba(57, 255, 20, 0.1)';
        notification.style.boxShadow = '0 0 20px rgba(57, 255, 20, 0.3)';
    }
    
    document.body.appendChild(notification);
    
    // Show notification
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Auto hide after 5 seconds
    setTimeout(() => {
        hideNotification(notification);
    }, 5000);
    
    // Close button functionality
    const closeButton = notification.querySelector('.notification-close');
    closeButton.style.cssText = `
        background: none;
        border: none;
        color: inherit;
        font-size: 1.2rem;
        cursor: pointer;
        padding: 0;
        margin: 0;
    `;
    
    closeButton.addEventListener('click', () => {
        hideNotification(notification);
    });
}

function hideNotification(notification) {
    notification.style.transform = 'translateX(400px)';
    setTimeout(() => {
        if (notification.parentNode) {
            notification.parentNode.removeChild(notification);
        }
    }, 300);
}

// Add custom CSS animations
const styleSheet = document.createElement('style');
styleSheet.textContent = `
    @keyframes skillGlow {
        0% { box-shadow: 0 0 5px var(--neon-green); }
        50% { box-shadow: 0 0 20px var(--neon-green), 0 0 30px var(--neon-green); }
        100% { box-shadow: 0 0 5px var(--neon-green); }
    }
    
    @keyframes certFloat {
        0% { transform: translateY(0); }
        50% { transform: translateY(-10px); }
        100% { transform: translateY(0); }
    }
    
    @keyframes slideInFromSide {
        0% { 
            opacity: 0;
            transform: translateX(-50px);
        }
        100% { 
            opacity: 1;
            transform: translateX(0);
        }
    }
    
    .nav-link.active {
        color: var(--neon-blue);
        text-shadow: 0 0 10px var(--neon-blue);
    }
    
    .nav-link.active::after {
        width: 100%;
    }
`;
document.head.appendChild(styleSheet);

// Particle System (Simple)
function createParticles() {
    const particleContainer = document.createElement('div');
    particleContainer.className = 'particles';
    particleContainer.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        z-index: 1;
    `;
    
    document.body.appendChild(particleContainer);
    
    for (let i = 0; i < 50; i++) {
        createParticle(particleContainer);
    }
}

function createParticle(container) {
    const particle = document.createElement('div');
    const colors = ['var(--neon-blue)', 'var(--neon-pink)', 'var(--neon-green)', 'var(--neon-purple)'];
    const color = colors[Math.floor(Math.random() * colors.length)];
    
    particle.style.cssText = `
        position: absolute;
        width: 2px;
        height: 2px;
        background: ${color};
        box-shadow: 0 0 6px ${color};
        border-radius: 50%;
        animation: float ${5 + Math.random() * 10}s linear infinite;
        left: ${Math.random() * 100}%;
        top: 100%;
        opacity: ${0.3 + Math.random() * 0.7};
    `;
    
    container.appendChild(particle);
    
    // Remove particle after animation
    setTimeout(() => {
        if (particle.parentNode) {
            particle.parentNode.removeChild(particle);
        }
    }, 15000);
}

// Add particle animation CSS
const particleStyles = document.createElement('style');
particleStyles.textContent = `
    @keyframes float {
        0% {
            transform: translateY(0) translateX(0);
            opacity: 0;
        }
        10% {
            opacity: 1;
        }
        90% {
            opacity: 1;
        }
        100% {
            transform: translateY(-100vh) translateX(${Math.random() * 200 - 100}px);
            opacity: 0;
        }
    }
`;
document.head.appendChild(particleStyles);

// Initialize particles after page load
setTimeout(() => {
    createParticles();
    
    // Continuously create new particles
    setInterval(() => {
        const container = document.querySelector('.particles');
        if (container && container.children.length < 50) {
            createParticle(container);
        }
    }, 300);
}, 4000);

// Glitch Effect for Title (Optional enhancement)
function addGlitchEffect() {
    const heroName = document.querySelector('.hero-name');
    if (heroName) {
        setInterval(() => {
            if (Math.random() < 0.1) { // 10% chance
                heroName.style.textShadow = `
                    2px 0 var(--neon-pink),
                    -2px 0 var(--neon-blue),
                    0 0 20px var(--neon-green)
                `;
                setTimeout(() => {
                    heroName.style.textShadow = '';
                }, 150);
            }
        }, 2000);
    }
}

// Initialize glitch effect
setTimeout(addGlitchEffect, 5000);

// Mouse Trail Effect
let mouseTrail = [];
const trailLength = 20;

document.addEventListener('mousemove', (e) => {
    mouseTrail.push({ x: e.clientX, y: e.clientY, time: Date.now() });
    
    if (mouseTrail.length > trailLength) {
        mouseTrail.shift();
    }
    
    updateMouseTrail();
});

function updateMouseTrail() {
    // Remove old trail elements
    document.querySelectorAll('.mouse-trail').forEach(el => el.remove());
    
    mouseTrail.forEach((point, index) => {
        const trail = document.createElement('div');
        trail.className = 'mouse-trail';
        trail.style.cssText = `
            position: fixed;
            width: 4px;
            height: 4px;
            background: var(--neon-blue);
            border-radius: 50%;
            pointer-events: none;
            z-index: 9999;
            left: ${point.x}px;
            top: ${point.y}px;
            opacity: ${(index / trailLength) * 0.5};
            transform: scale(${(index / trailLength) * 0.5});
            box-shadow: 0 0 6px var(--neon-blue);
        `;
        document.body.appendChild(trail);
        
        setTimeout(() => {
            if (trail.parentNode) {
                trail.parentNode.removeChild(trail);
            }
        }, 100);
    });
}

// Keyboard Navigation
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        // Close mobile menu
        if (hamburger) {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.style.overflow = 'auto';
        }
    }
});

// Performance optimization: Throttle scroll events
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    }
}

// Apply throttling to scroll events
window.addEventListener('scroll', throttle(() => {
    updateActiveNavLink();
    toggleBackToTop();
    handleScrollAnimations();
}, 16)); // ~60fps

// Console Easter Egg
console.log(`
    ███╗   ██╗███████╗ ██████╗ ███╗   ██╗    ██████╗  ██████╗ ██████╗ ███████╗
    ████╗  ██║██╔════╝██╔═══██╗████╗  ██║    ██╔══██╗██╔═══██╗██╔══██╗██╔════╝
    ██╔██╗ ██║█████╗  ██║   ██║██╔██╗ ██║    ██████╔╝██║   ██║██████╔╝█████╗  
    ██║╚██╗██║██╔══╝  ██║   ██║██║╚██╗██║    ██╔══██╗██║   ██║██╔══██╗██╔══╝  
    ██║ ╚████║███████╗╚██████╔╝██║ ╚████║    ██║  ██║╚██████╔╝██║  ██║██║     
    ╚═╝  ╚═══╝╚══════╝ ╚═════╝ ╚═╝  ╚═══╝    ╚═╝  ╚═╝ ╚═════╝ ╚═╝  ╚═╝╚═╝     
    
    Welcome to Lokesh D's Cyberpunk Portfolio!
    Built with ❤️ and neon lights 🚀
    
    "The future belongs to those who prepare for it today."
`);

// Initialize everything when DOM is fully loaded
document.addEventListener('DOMContentLoaded', () => {
    // Add smooth reveal animation to sections
    const sections = document.querySelectorAll('section');
    sections.forEach((section, index) => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(30px)';
        section.style.transition = 'all 0.8s cubic-bezier(0.16, 1, 0.3, 1)';
        
        setTimeout(() => {
            section.style.opacity = '1';
            section.style.transform = 'translateY(0)';
        }, 3500 + (index * 200));
    });
});

// Expose global functions for button clicks
window.scrollToSection = scrollToSection;