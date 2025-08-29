// Smooth scrolling for navigation links
document.addEventListener('DOMContentLoaded', function() {
    // Navbar scroll effect
    const navbar = document.querySelector('.navbar');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            navbar.style.background = 'rgba(10, 10, 10, 0.98)';
        } else {
            navbar.style.background = 'rgba(10, 10, 10, 0.95)';
        }
    });

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const offsetTop = target.offsetTop - 70; // Account for navbar height
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Intersection Observer for animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Animate timeline items
    document.querySelectorAll('.timeline-item').forEach((item, index) => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(30px)';
        item.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
        observer.observe(item);
    });

    // Animate cards
    document.querySelectorAll('.stat-card, .demo-card, .corruption-card, .action-card').forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
        observer.observe(card);
    });

    // Counter animation for stats
    function animateCounter(element, target) {
        let current = 0;
        const increment = target / 100;
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                current = target;
                clearInterval(timer);
            }
            
            if (target >= 1000) {
                element.textContent = Math.floor(current).toLocaleString();
            } else {
                element.textContent = Math.floor(current);
            }
        }, 20);
    }

    // Animate stat numbers when they come into view
    const statObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const statNumber = entry.target.querySelector('.stat-number');
                const text = statNumber.textContent;
                
                // Extract number from text
                let number = 0;
                if (text.includes('Rp')) {
                    number = 1175; // Trillion
                } else if (text === '3') {
                    number = 3;
                } else if (text === '38') {
                    number = 38;
                } else if (text.includes('6.100')) {
                    number = 6100;
                }
                
                if (number > 0) {
                    statNumber.textContent = '0';
                    setTimeout(() => {
                        animateCounter(statNumber, number);
                        if (text.includes('Rp')) {
                            setTimeout(() => {
                                statNumber.textContent = 'Rp 1.175+';
                            }, 2000);
                        } else if (text.includes('6.100')) {
                            setTimeout(() => {
                                statNumber.textContent = '6.100+';
                            }, 2000);
                        }
                    }, 500);
                }
                
                statObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    document.querySelectorAll('.stat-card').forEach(card => {
        statObserver.observe(card);
    });

    // Timeline item hover effects
    document.querySelectorAll('.timeline-item').forEach(item => {
        item.addEventListener('mouseenter', function() {
            const marker = this.querySelector('.timeline-marker');
            marker.style.transform = 'translateX(-50%) scale(1.2)';
            marker.style.boxShadow = '0 0 20px rgba(220, 38, 38, 0.5)';
        });

        item.addEventListener('mouseleave', function() {
            const marker = this.querySelector('.timeline-marker');
            marker.style.transform = 'translateX(-50%) scale(1)';
            marker.style.boxShadow = 'none';
        });
    });

    // Share button functionality
    const shareButton = document.querySelector('.share-button');
    if (shareButton) {
        shareButton.addEventListener('click', function() {
            if (navigator.share) {
                navigator.share({
                    title: 'Rapor Merah Indonesia 2025',
                    text: 'Timeline demonstrasi dan korupsi di Indonesia periode Januari-Agustus 2025',
                    url: window.location.href
                });
            } else {
                // Fallback: copy to clipboard
                navigator.clipboard.writeText(window.location.href).then(() => {
                    const originalText = this.textContent;
                    this.textContent = 'Link Disalin!';
                    this.style.background = '#059669';
                    
                    setTimeout(() => {
                        this.textContent = originalText;
                        this.style.background = '';
                    }, 2000);
                });
            }
        });
    }

    // Parallax effect for hero section
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const hero = document.querySelector('.hero');
        const heroContent = document.querySelector('.hero-content');
        
        if (hero && heroContent) {
            heroContent.style.transform = `translateY(${scrolled * 0.5}px)`;
        }
    });

    // Add loading animation
    document.body.style.opacity = '0';
    window.addEventListener('load', function() {
        document.body.style.transition = 'opacity 0.5s ease';
        document.body.style.opacity = '1';
    });

    // Mobile menu toggle (if needed in future)
    const createMobileMenu = () => {
        if (window.innerWidth <= 768) {
            const navLinks = document.querySelector('.nav-links');
            if (navLinks && !document.querySelector('.mobile-menu-toggle')) {
                const toggleButton = document.createElement('button');
                toggleButton.className = 'mobile-menu-toggle';
                toggleButton.innerHTML = '☰';
                toggleButton.style.cssText = `
                    background: none;
                    border: none;
                    color: #dc2626;
                    font-size: 1.5rem;
                    cursor: pointer;
                    display: block;
                `;
                
                document.querySelector('.nav-container').appendChild(toggleButton);
                
                toggleButton.addEventListener('click', () => {
                    navLinks.style.display = navLinks.style.display === 'flex' ? 'none' : 'flex';
                    navLinks.style.position = 'absolute';
                    navLinks.style.top = '70px';
                    navLinks.style.left = '0';
                    navLinks.style.right = '0';
                    navLinks.style.background = 'rgba(10, 10, 10, 0.98)';
                    navLinks.style.flexDirection = 'column';
                    navLinks.style.padding = '1rem';
                    navLinks.style.gap = '1rem';
                });
            }
        }
    };

    createMobileMenu();
    window.addEventListener('resize', createMobileMenu);

    // Add dynamic background particles
    const createParticles = () => {
        const hero = document.querySelector('.hero');
        if (!hero) return;

        for (let i = 0; i < 50; i++) {
            const particle = document.createElement('div');
            particle.style.cssText = `
                position: absolute;
                width: 2px;
                height: 2px;
                background: rgba(220, 38, 38, 0.3);
                border-radius: 50%;
                pointer-events: none;
                animation: float ${5 + Math.random() * 10}s linear infinite;
                left: ${Math.random() * 100}%;
                top: ${Math.random() * 100}%;
                animation-delay: ${Math.random() * 5}s;
            `;
            hero.appendChild(particle);
        }

        // Add CSS animation for particles
        const style = document.createElement('style');
        style.textContent = `
            @keyframes float {
                0% { transform: translateY(100vh) rotate(0deg); opacity: 0; }
                10% { opacity: 1; }
                90% { opacity: 1; }
                100% { transform: translateY(-100vh) rotate(360deg); opacity: 0; }
            }
        `;
        document.head.appendChild(style);
    };

    createParticles();

    // Add typing effect to hero title
    const typeWriter = (element, text, speed = 100) => {
        let i = 0;
        element.innerHTML = '';
        
        const type = () => {
            if (i < text.length) {
                element.innerHTML += text.charAt(i);
                i++;
                setTimeout(type, speed);
            }
        };
        
        type();
    };

    // Initialize typing effect after a delay
    setTimeout(() => {
        const heroTitle = document.querySelector('.hero-title');
        if (heroTitle) {
            const originalText = heroTitle.innerHTML;
            typeWriter(heroTitle, 'Rapor Merah\nIndonesia 2025', 150);
        }
    }, 1000);
});

