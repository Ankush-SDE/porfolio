document.addEventListener('DOMContentLoaded', () => {
    // 1. Cursor Glow Follower
    const cursorGlow = document.getElementById('cursor-glow');
    document.addEventListener('mousemove', (e) => {
        const x = e.clientX;
        const y = e.clientY;
        cursorGlow.style.left = `${x}px`;
        cursorGlow.style.top = `${y}px`;
    });

    // 2. Navbar Background Change on Scroll
    const nav = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }
    });

    // 3. Smooth Navigation & Active Link Highlight
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-links a');

    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (pageYOffset >= (sectionTop - 200)) {
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

    // 4. Reveal Animations on Scroll
    const observerOptions = {
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
            }
        });
    }, observerOptions);

    // Apply reveal animation to elements
    const revealElements = document.querySelectorAll('.skill-card, .project-card, .section-title, .about-grid, .contact-grid');
    revealElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
        observer.observe(el);
    });

    // Add revealed class style via JS to keep CSS clean
    const style = document.createElement('style');
    style.innerHTML = `
        .revealed {
            opacity: 1 !important;
            transform: translateY(0) !important;
        }
    `;
    document.head.appendChild(style);

    // 5. Mobile Menu Toggle
    const menuBtn = document.getElementById('menu-btn');
    const navLinksList = document.querySelector('.nav-links');
    
    if (menuBtn) {
        menuBtn.addEventListener('click', () => {
            navLinksList.classList.toggle('active-mobile');
            // Inline styling for mobile menu demo purposes
            if (navLinksList.classList.contains('active-mobile')) {
                navLinksList.style.display = 'flex';
                navLinksList.style.flexDirection = 'column';
                navLinksList.style.position = 'absolute';
                navLinksList.style.top = 'var(--nav-height)';
                navLinksList.style.right = '0';
                navLinksList.style.width = '100%';
                navLinksList.style.background = 'var(--bg-accent)';
                navLinksList.style.padding = '2rem';
                navLinksList.style.borderBottom = '1px solid var(--border)';
            } else {
                navLinksList.style.display = 'none';
            }
        });
    }

    // 6. Form Submission (Simulated)
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const btn = contactForm.querySelector('button');
            const originalText = btn.innerText;
            btn.innerText = 'Sending...';
            btn.disabled = true;

            setTimeout(() => {
                btn.innerText = 'Message Sent!';
                btn.style.background = '#10b981'; // Emerald Green
                contactForm.reset();
                setTimeout(() => {
                    btn.innerText = originalText;
                    btn.style.background = 'var(--primary)';
                    btn.disabled = false;
                }, 3000);
            }, 1500);
        });
    }
});
