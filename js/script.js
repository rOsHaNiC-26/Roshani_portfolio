/* Typer Library (Lightweight implementation handled in DOMContentLoaded) */

document.addEventListener('DOMContentLoaded', () => {
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    const themeToggle = document.getElementById('theme-toggle');
    const body = document.body;
    const moonIcon = document.querySelector('.mode-icon.moon');
    const sunIcon = document.querySelector('.mode-icon.sun');
    const enterBtn = document.getElementById('enter-portfolio');
    const preloader = document.getElementById('preloader');

    // Preloader Logic
    if (enterBtn && preloader) {
        enterBtn.addEventListener('click', () => {
            preloader.classList.add('fade-out');

            // Start Hero Typewriter after transition
            setTimeout(() => {
                preloader.style.display = 'none';
                startHeroTypewriter();
            }, 1000);
        });
    }

    // Initialize Typewriters as stopped
    let heroTyped;
    function startHeroTypewriter() {
        heroTyped = new Typed('.multiple-text', {
            strings: ['Full stack developer', 'Web Developer', 'Python Developer', 'Computer Science Student'],
            typeSpeed: 100,
            backSpeed: 100,
            backDelay: 1000,
            loop: true
        });
    }

    const startAboutTypewriter = () => {
        new Typed('.about-text', {
            strings: ['Hello! I’m Roshani Chaurasiya, a Computer Science student with an interest in web development and Python programming. ^1000 I have basic to intermediate knowledge of HTML, CSS, JavaScript, and Python, developed through academic coursework and hands-on practice. ^1000 As a fresher, I am keen to learn, improve my skills, and gain real-world experience by contributing to projects in an internship or entry-level role.'],
            typeSpeed: 30,
            showCursor: true,
            cursorChar: '|',
            loop: false
        });
    };

    // Intersection Observer for About Me Typing
    const aboutSection = document.querySelector('#about');
    if (aboutSection) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    startAboutTypewriter();
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });
        observer.observe(aboutSection);
    }

    // Theme switcher logic
    const themeSwitcher = document.querySelector('.theme-switcher');
    const themeBtns = document.querySelectorAll('.theme-btn[data-theme]');

    // Function to set theme
    const setTheme = (theme) => {
        let actualTheme = theme;

        if (theme === 'system') {
            actualTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
        }

        if (actualTheme === 'light') {
            body.classList.add('light-mode');
            moonIcon.style.display = 'none';
            sunIcon.style.display = 'block';
        } else {
            body.classList.remove('light-mode');
            moonIcon.style.display = 'block';
            sunIcon.style.display = 'none';
        }

        // Update active button state
        themeBtns.forEach(btn => {
            btn.classList.toggle('active', btn.getAttribute('data-theme') === theme);
        });

        // Save choice
        localStorage.setItem('portfolio-theme', theme);
    };

    // Load saved theme or default to system
    const savedTheme = localStorage.getItem('portfolio-theme') || 'system';
    setTheme(savedTheme);

    // Event listeners for theme buttons
    themeBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const theme = btn.getAttribute('data-theme');
            setTheme(theme);
        });
    });

    // Listen for system theme changes
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
        if (localStorage.getItem('portfolio-theme') === 'system') {
            setTheme('system');
        }
    });

    // Toggle dropdown mobile (optional, but good practice)
    if (themeToggle) {
        themeToggle.addEventListener('click', (e) => {
            e.stopPropagation();
            const menu = document.querySelector('.theme-menu');
            const isVisible = menu.style.display === 'flex';
            menu.style.display = isVisible ? 'none' : 'flex';
        });
    }

    // Close menu when clicking outside
    document.addEventListener('click', () => {
        const menu = document.querySelector('.theme-menu');
        if (menu) menu.style.display = 'none';
    });

    if (hamburger) {
        hamburger.addEventListener('click', () => {
            navLinks.classList.toggle('active');

            // Animate hamburger
            const bars = hamburger.querySelectorAll('.bar');
        });
    }

    // Smooth scrolling
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            if (navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
            }

            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                const headerOffset = 80;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: "smooth"
                });
            }
        });
    });

    // Footer Typewriter Logic
    const startFooterTypewriter = () => {
        // Name
        new Typed('#typed-footer-name', {
            strings: ['Roshani Ramniwas Chaurasiya'],
            typeSpeed: 60,
            showCursor: false,
            preStringTyped: (arrayPos, self) => {
                document.querySelector('.footer-name').setAttribute('data-text', '');
            },
            onStringTyped: (arrayPos, self) => {
                document.querySelector('.footer-name').setAttribute('data-text', 'Roshani Ramniwas Chaurasiya');
            },
            onComplete: () => {
                // After name, type nav links in sequence
                const navDelays = [0, 500, 1000, 1500];
                const navIds = ['#typed-nav-about', '#typed-nav-skills', '#typed-nav-portfolio', '#typed-nav-contact'];
                const navTexts = ['About', 'Skills', 'Portfolio', 'Contact'];

                navIds.forEach((id, index) => {
                    new Typed(id, {
                        strings: [navTexts[index]],
                        typeSpeed: 50,
                        showCursor: false,
                        startDelay: navDelays[index]
                    });
                });

                // Finally, copyright
                new Typed('#typed-copyright', {
                    strings: ['&copy; 2025 Roshani Ramniwas Chaurasiya. All rights reserved.'],
                    typeSpeed: 30,
                    showCursor: false,
                    startDelay: 2000
                });
            }
        });
    };

    const footerSection = document.querySelector('.footer');
    if (footerSection) {
        const footerObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    startFooterTypewriter();
                    footerObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.2 });
        footerObserver.observe(footerSection);
    }
});
