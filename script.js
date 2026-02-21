// =========================================
// Initialize Lucide Icons
// =========================================
lucide.createIcons();

// =========================================
// Register GSAP Plugins
// =========================================
gsap.registerPlugin(ScrollTrigger, TextPlugin);

// =========================================
// Cursor Glow Effect
// =========================================
const cursorGlow = document.getElementById('cursorGlow');

document.addEventListener('mousemove', (e) => {
    gsap.to(cursorGlow, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.3,
        ease: 'power2.out'
    });
});

// =========================================
// Particle Background
// =========================================
const canvas = document.getElementById('particleCanvas');
const ctx = canvas.getContext('2d');

let particles = [];
const particleCount = 80;

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

function createParticles() {
    particles = [];
    for (let i = 0; i < particleCount; i++) {
        particles.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            radius: Math.random() * 2 + 0.5,
            vx: (Math.random() - 0.5) * 0.5,
            vy: (Math.random() - 0.5) * 0.5,
            opacity: Math.random() * 0.5 + 0.2
        });
    }
}

function drawParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Draw particles
    particles.forEach((particle, i) => {
        // Update position
        particle.x += particle.vx;
        particle.y += particle.vy;
        
        // Wrap around edges
        if (particle.x < 0) particle.x = canvas.width;
        if (particle.x > canvas.width) particle.x = 0;
        if (particle.y < 0) particle.y = canvas.height;
        if (particle.y > canvas.height) particle.y = 0;
        
        // Draw particle
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(0, 212, 255, ${particle.opacity})`;
        ctx.fill();
        
        // Draw connections
        particles.forEach((particle2, j) => {
            if (i === j) return;
            const dx = particle.x - particle2.x;
            const dy = particle.y - particle2.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            
            if (distance < 150) {
                ctx.beginPath();
                ctx.moveTo(particle.x, particle.y);
                ctx.lineTo(particle2.x, particle2.y);
                ctx.strokeStyle = `rgba(0, 212, 255, ${0.1 * (1 - distance / 150)})`;
                ctx.stroke();
            }
        });
    });
    
    requestAnimationFrame(drawParticles);
}

resizeCanvas();
createParticles();
drawParticles();

window.addEventListener('resize', () => {
    resizeCanvas();
    createParticles();
});

// =========================================
// Navigation
// =========================================
const navbar = document.getElementById('navbar');
const navToggle = document.getElementById('navToggle');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-link');

// Scroll effect for navbar
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Mobile menu toggle
navToggle.addEventListener('click', () => {
    navToggle.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu on link click
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navToggle.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Active link on scroll
const sections = document.querySelectorAll('section');

function updateActiveLink() {
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (scrollY >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
}

window.addEventListener('scroll', updateActiveLink);

// =========================================
// Typewriter Effect
// =========================================
const roles = [
    'Full Stack Developer',
    'Web Designer',
    'UI/UX Enthusiast',
    'Problem Solver',
    'Tech Lover'
];

const typeWriter = document.getElementById('typeWriter');
let roleIndex = 0;
let charIndex = 0;
let isDeleting = false;
let typingDelay = 100;

function type() {
    const currentRole = roles[roleIndex];
    
    if (isDeleting) {
        typeWriter.textContent = currentRole.substring(0, charIndex - 1);
        charIndex--;
        typingDelay = 50;
    } else {
        typeWriter.textContent = currentRole.substring(0, charIndex + 1);
        charIndex++;
        typingDelay = 100;
    }
    
    if (!isDeleting && charIndex === currentRole.length) {
        isDeleting = true;
        typingDelay = 2000; // Wait before deleting
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        roleIndex = (roleIndex + 1) % roles.length;
        typingDelay = 500; // Wait before typing next
    }
    
    setTimeout(type, typingDelay);
}

// Start typewriter
setTimeout(type, 1000);

// =========================================
// Counter Animation
// =========================================
const statNumbers = document.querySelectorAll('.stat-number');

function animateCounters() {
    statNumbers.forEach(stat => {
        const target = parseInt(stat.getAttribute('data-count'));
        const duration = 2000;
        const step = target / (duration / 16);
        let current = 0;
        
        const counter = setInterval(() => {
            current += step;
            if (current >= target) {
                stat.textContent = target;
                clearInterval(counter);
            } else {
                stat.textContent = Math.floor(current);
            }
        }, 16);
    });
}

// =========================================
// GSAP Animations
// =========================================

// Hero Section Animation
const heroTimeline = gsap.timeline();

heroTimeline
    .from('.hero-badge', {
        opacity: 0,
        y: 30,
        duration: 0.8,
        delay: 0.5
    })
    .from('.title-line', {
        opacity: 0,
        y: 30,
        duration: 0.5
    }, '-=0.3')
    .from('.title-name', {
        opacity: 0,
        y: 50,
        duration: 0.8,
        ease: 'power3.out'
    }, '-=0.2')
    .from('.title-surname', {
        opacity: 0,
        y: 30,
        duration: 0.6
    }, '-=0.4')
    .from('.hero-role', {
        opacity: 0,
        y: 20,
        duration: 0.5
    }, '-=0.2')
    .from('.hero-description', {
        opacity: 0,
        y: 20,
        duration: 0.5
    }, '-=0.2')
    .from('.hero-cta .btn', {
        opacity: 0,
        y: 20,
        stagger: 0.2,
        duration: 0.5
    }, '-=0.2')
    .from('.hero-stats', {
        opacity: 0,
        y: 30,
        duration: 0.5,
        onComplete: animateCounters
    }, '-=0.2')
    .from('.scroll-indicator', {
        opacity: 0,
        y: 20,
        duration: 0.5
    }, '-=0.2');

// Code window animation (if visible)
gsap.from('.code-window', {
    opacity: 0,
    x: 100,
    rotation: 5,
    duration: 1.2,
    delay: 1.5,
    ease: 'power3.out'
});

gsap.from('.float-icon', {
    opacity: 0,
    scale: 0,
    stagger: 0.2,
    duration: 0.5,
    delay: 2
});

// Section Header Animations
gsap.utils.toArray('.section-header').forEach(header => {
    gsap.from(header.children, {
        scrollTrigger: {
            trigger: header,
            start: 'top 80%',
            toggleActions: 'play none none reverse'
        },
        opacity: 0,
        y: 50,
        stagger: 0.2,
        duration: 0.8,
        ease: 'power3.out'
    });
});

// About Section Animation
gsap.from('.about-image', {
    scrollTrigger: {
        trigger: '.about-content',
        start: 'top 70%',
        toggleActions: 'play none none reverse'
    },
    opacity: 0,
    x: -100,
    duration: 1,
    ease: 'power3.out'
});

gsap.from('.about-info', {
    scrollTrigger: {
        trigger: '.about-content',
        start: 'top 70%',
        toggleActions: 'play none none reverse'
    },
    opacity: 0,
    x: 100,
    duration: 1,
    ease: 'power3.out'
});

// Skills Animation
gsap.utils.toArray('.skill-category').forEach((category, index) => {
    gsap.from(category, {
        scrollTrigger: {
            trigger: category,
            start: 'top 85%',
            toggleActions: 'play none none reverse'
        },
        opacity: 0,
        y: 50,
        duration: 0.8,
        delay: index * 0.1,
        ease: 'power3.out',
        onComplete: () => {
            // Animate skill bars when card becomes visible
            const skillBars = category.querySelectorAll('.skill-progress');
            skillBars.forEach(bar => {
                const progress = bar.getAttribute('data-progress');
                gsap.to(bar, {
                    width: `${progress}%`,
                    duration: 1.5,
                    ease: 'power3.out'
                });
            });
        }
    });
});

// Project Cards Animation
gsap.utils.toArray('.project-card').forEach((card, index) => {
    gsap.from(card, {
        scrollTrigger: {
            trigger: card,
            start: 'top 85%',
            toggleActions: 'play none none reverse'
        },
        opacity: 0,
        y: 80,
        duration: 0.8,
        delay: index * 0.15,
        ease: 'power3.out'
    });
});

// Contact Section Animation
gsap.from('.contact-info', {
    scrollTrigger: {
        trigger: '.contact-content',
        start: 'top 70%',
        toggleActions: 'play none none reverse'
    },
    opacity: 0,
    x: -80,
    duration: 0.8,
    ease: 'power3.out'
});

gsap.from('.contact-form', {
    scrollTrigger: {
        trigger: '.contact-content',
        start: 'top 70%',
        toggleActions: 'play none none reverse'
    },
    opacity: 0,
    x: 80,
    duration: 0.8,
    ease: 'power3.out'
});

// Contact Method Items Animation
gsap.from('.contact-method', {
    scrollTrigger: {
        trigger: '.contact-methods',
        start: 'top 80%',
        toggleActions: 'play none none reverse'
    },
    opacity: 0,
    x: -50,
    stagger: 0.15,
    duration: 0.6,
    ease: 'power3.out'
});

// Social Links Animation
gsap.from('.social-link', {
    scrollTrigger: {
        trigger: '.social-links',
        start: 'top 90%',
        toggleActions: 'play none none reverse'
    },
    opacity: 0,
    scale: 0,
    stagger: 0.1,
    duration: 0.5,
    ease: 'back.out(2)'
});

// Footer Animation
gsap.from('.footer-content > *', {
    scrollTrigger: {
        trigger: '.footer',
        start: 'top 90%',
        toggleActions: 'play none none reverse'
    },
    opacity: 0,
    y: 30,
    stagger: 0.2,
    duration: 0.6,
    ease: 'power3.out'
});

// =========================================
// Parallax Effects
// =========================================
gsap.to('.hero-glow-1', {
    scrollTrigger: {
        trigger: '.hero',
        start: 'top top',
        end: 'bottom top',
        scrub: 1
    },
    y: 200,
    x: -100
});

gsap.to('.hero-glow-2', {
    scrollTrigger: {
        trigger: '.hero',
        start: 'top top',
        end: 'bottom top',
        scrub: 1
    },
    y: -100,
    x: 100
});

// =========================================
// Section Tag Animation
// =========================================
gsap.utils.toArray('.section-tag-end').forEach(tag => {
    gsap.from(tag, {
        scrollTrigger: {
            trigger: tag,
            start: 'top 90%',
            toggleActions: 'play none none reverse'
        },
        opacity: 0,
        scale: 0.8,
        duration: 0.5,
        ease: 'back.out(2)'
    });
});

// =========================================
// Magnetic Button Effect
// =========================================
const magneticButtons = document.querySelectorAll('.btn, .project-link, .social-link');

magneticButtons.forEach(btn => {
    btn.addEventListener('mousemove', (e) => {
        const rect = btn.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        
        gsap.to(btn, {
            x: x * 0.2,
            y: y * 0.2,
            duration: 0.3,
            ease: 'power2.out'
        });
    });
    
    btn.addEventListener('mouseleave', () => {
        gsap.to(btn, {
            x: 0,
            y: 0,
            duration: 0.5,
            ease: 'elastic.out(1, 0.5)'
        });
    });
});

// =========================================
// Smooth Scroll
// =========================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        
        if (target) {
            const offsetTop = target.offsetTop - 80;
            
            gsap.to(window, {
                scrollTo: { y: offsetTop, autoKill: false },
                duration: 1,
                ease: 'power3.inOut'
            });
        }
    });
});

// =========================================
// Form Submission (Placeholder)
// =========================================
const contactForm = document.getElementById('contactForm');

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Get form data
    const formData = new FormData(contactForm);
    const data = Object.fromEntries(formData);
    
    // Simple validation animation
    const submitBtn = contactForm.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerHTML;
    
    gsap.to(submitBtn, {
        scale: 0.95,
        duration: 0.1,
        yoyo: true,
        repeat: 1
    });
    
    // Simulate sending
    submitBtn.innerHTML = '<span>Sending...</span>';
    submitBtn.disabled = true;
    
    setTimeout(() => {
        submitBtn.innerHTML = '<span>Message Sent!</span><i data-lucide="check"></i>';
        lucide.createIcons();
        submitBtn.style.background = 'linear-gradient(135deg, #10b981 0%, #059669 100%)';
        
        // Reset form
        setTimeout(() => {
            contactForm.reset();
            submitBtn.innerHTML = originalText;
            submitBtn.style.background = '';
            submitBtn.disabled = false;
            lucide.createIcons();
        }, 3000);
    }, 1500);
});

// =========================================
// Reveal on Scroll for Generic Elements
// =========================================
const revealElements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale');

revealElements.forEach(el => {
    gsap.to(el, {
        scrollTrigger: {
            trigger: el,
            start: 'top 85%',
            toggleActions: 'play none none reverse'
        },
        opacity: 1,
        x: 0,
        y: 0,
        scale: 1,
        duration: 0.8,
        ease: 'power3.out'
    });
});

// =========================================
// Image Loading Animation
// =========================================
const images = document.querySelectorAll('img');

images.forEach(img => {
    img.addEventListener('load', () => {
        gsap.from(img, {
            opacity: 0,
            scale: 1.05,
            duration: 0.5,
            ease: 'power2.out'
        });
    });
});

// =========================================
// Tilt Effect for Cards
// =========================================
const tiltCards = document.querySelectorAll('.project-card, .skill-category');

tiltCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = (y - centerY) / 20;
        const rotateY = (centerX - x) / 20;
        
        gsap.to(card, {
            rotateX: rotateX,
            rotateY: rotateY,
            duration: 0.3,
            ease: 'power2.out',
            transformPerspective: 1000
        });
    });
    
    card.addEventListener('mouseleave', () => {
        gsap.to(card, {
            rotateX: 0,
            rotateY: 0,
            duration: 0.5,
            ease: 'power2.out'
        });
    });
});

// =========================================
// Page Load Animation
// =========================================
window.addEventListener('load', () => {
    // Remove loading state if any
    document.body.classList.add('loaded');
    
    // Refresh ScrollTrigger after page load
    ScrollTrigger.refresh();
});

// Refresh ScrollTrigger on resize
window.addEventListener('resize', () => {
    ScrollTrigger.refresh();
});

console.log('%c Portfolio by Binara Dilshan Hettiarachchi ', 
    'background: linear-gradient(135deg, #00d4ff, #a855f7); color: #0a0a0f; font-size: 16px; font-weight: bold; padding: 10px 20px; border-radius: 5px;');
