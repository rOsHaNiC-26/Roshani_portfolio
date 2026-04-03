/**
 * Premium Portfolio Features: Custom Cursor & Magnetic Buttons
 */

document.addEventListener('DOMContentLoaded', () => {
    const dot = document.querySelector('.cursor-dot');
    const outline = document.querySelector('.cursor-outline');

    // 1. Custom Cursor Logic
    window.addEventListener('mousemove', (e) => {
        const posX = e.clientX;
        const posY = e.clientY;

        // Immediate dot movement
        dot.style.left = `${posX}px`;
        dot.style.top = `${posY}px`;

        // Delayed outline movement for "elastic" feel
        outline.animate({
            left: `${posX}px`,
            top: `${posY}px`
        }, { duration: 500, fill: "forwards" });
    });

    // Cursor interactions
    const interactiveElements = document.querySelectorAll('a, button, .social-icon, .social-link, #enter-portfolio, .theme-btn');

    interactiveElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            outline.classList.add('hovering');
            dot.classList.add('active');
        });
        el.addEventListener('mouseleave', () => {
            outline.classList.remove('hovering');
            dot.classList.remove('active');
        });
    });

    // 2. Magnetic Effect Logic
    const magneticElements = document.querySelectorAll('.btn, .social-link, .nav-links a, .nav-github-btn');

    magneticElements.forEach(el => {
        el.addEventListener('mousemove', function (e) {
            const pos = this.getBoundingClientRect();
            const x = e.clientX - pos.left - pos.width / 2;
            const y = e.clientY - pos.top - pos.height / 2;

            this.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px)`;
        });

        el.addEventListener('mouseleave', function () {
            this.style.transform = 'translate(0px, 0px)';
        });
    });

    // 3. Smooth Appearance on Scroll (Intersection Observer)
    const fadeElements = document.querySelectorAll('.project-card, .skills-box, .section-title');

    const fadeObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('premium-appear');
                fadeObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    fadeElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'all 0.8s cubic-bezier(0.2, 1, 0.3, 1)';
        fadeObserver.observe(el);
    });

    // Add CSS class via JS for the appearance injection
    const style = document.createElement('style');
    style.textContent = `
        .premium-appear {
            opacity: 1 !important;
            transform: translateY(0) !important;
        }
    `;
    document.head.appendChild(style);
});
