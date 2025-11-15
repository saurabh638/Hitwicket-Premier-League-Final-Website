/**
 * Hitwicket Premier League - Main JavaScript
 * Based on HPL Requirements
 */

(function() {
    'use strict';

    // ============================================
    // Configuration
    // ============================================
    const HPL_CONFIG = {
        countdownTargetDate: '2025-11-17T23:59:59Z', // City Voting End Date
        currentPhase: 'city-voting',
        socialLinks: {
            discord: 'https://discord.gg/hitwicket',
            instagram: 'https://instagram.com/hitwicket',
            youtube: 'https://www.youtube.com/@hitwicket',
            twitter: 'https://twitter.com/hitwicket',
            facebook: 'https://facebook.com/hitwicket'
        }
    };

    // ============================================
    // Utility Functions
    // ============================================
    const $ = (selector, context = document) => context.querySelector(selector);
    const $$ = (selector, context = document) => context.querySelectorAll(selector);

    const throttle = (func, wait) => {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    };

    const debounce = (func, wait) => {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    };

    // ============================================
    // Countdown Timer
    // ============================================
    const initCountdown = () => {
        const daysEl = $('#days');
        const hoursEl = $('#hours');
        const minutesEl = $('#minutes');
        const secondsEl = $('#seconds');

        if (!daysEl || !hoursEl || !minutesEl || !secondsEl) {
            console.warn('Countdown elements not found');
            return;
        }

        const calculateTimeRemaining = () => {
            const now = new Date().getTime();
            const target = new Date(HPL_CONFIG.countdownTargetDate).getTime();
            const distance = target - now;

            if (distance < 0) {
                return { days: 0, hours: 0, minutes: 0, seconds: 0, completed: true };
            }

            return {
                days: Math.floor(distance / (1000 * 60 * 60 * 24)),
                hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
                minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
                seconds: Math.floor((distance % (1000 * 60)) / 1000),
                completed: false
            };
        };

        const updateCountdown = () => {
            const time = calculateTimeRemaining();
            
            if (time.completed) {
                daysEl.textContent = '00';
                hoursEl.textContent = '00';
                minutesEl.textContent = '00';
                secondsEl.textContent = '00';
                return;
            }

            daysEl.textContent = String(time.days).padStart(2, '0');
            hoursEl.textContent = String(time.hours).padStart(2, '0');
            minutesEl.textContent = String(time.minutes).padStart(2, '0');
            secondsEl.textContent = String(time.seconds).padStart(2, '0');
        };

        updateCountdown();
        setInterval(updateCountdown, 1000);
    };

    // ============================================
    // Navigation
    // ============================================
    const initNavigation = () => {
        const header = $('#header');
        const navToggle = $('#navToggle');
        const navMenu = $('#navMenu');
        const navLinks = $$('.nav-link');
        const backToTop = $('#backToTop');

        // Mobile menu toggle
        if (navToggle) {
            navToggle.addEventListener('click', () => {
                navToggle.classList.toggle('active');
                navMenu.classList.toggle('active');
                document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
            });
        }

        // Close mobile menu on link click
        navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                if (navToggle) {
                    navToggle.classList.remove('active');
                    navMenu.classList.remove('active');
                    document.body.style.overflow = '';
                }
                
                // Smooth scroll for anchor links
                const href = link.getAttribute('href');
                if (href && href.startsWith('#')) {
                    e.preventDefault();
                    const target = $(href);
                    if (target) {
                        const headerHeight = header.offsetHeight;
                        const targetPosition = target.offsetTop - headerHeight;
                        window.scrollTo({
                            top: targetPosition,
                            behavior: 'smooth'
                        });
                    }
                }
            });
        });

        // Header scroll effect and back to top
        const handleScroll = throttle(() => {
            if (window.scrollY > 100) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }

            if (backToTop) {
                if (window.scrollY > 500) {
                    backToTop.classList.add('visible');
                } else {
                    backToTop.classList.remove('visible');
                }
            }
        }, 100);

        window.addEventListener('scroll', handleScroll, { passive: true });

        // Back to top functionality
        if (backToTop) {
            backToTop.addEventListener('click', () => {
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
            });
        }
    };

    // ============================================
    // Active Navigation Link
    // ============================================
    const updateActiveNavLink = () => {
        const sections = $$('section[id]');
        const navLinks = $$('.nav-link');
        const bottomNavItems = $$('.bottom-nav-item');

        const handleScroll = throttle(() => {
            let current = '';
            const scrollPosition = window.scrollY + 150;

            sections.forEach(section => {
                const sectionTop = section.offsetTop;
                const sectionHeight = section.offsetHeight;
                if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                    current = section.getAttribute('id');
                }
            });

            // Update main nav links
            navLinks.forEach(link => {
                link.classList.remove('active');
                const href = link.getAttribute('href');
                if (href === `#${current}`) {
                    link.classList.add('active');
                }
            });

            // Update bottom nav items
            bottomNavItems.forEach(item => {
                item.classList.remove('active');
                const href = item.getAttribute('href');
                
                // Handle home section (id="home" or at top of page)
                if (href === '#home') {
                    if (current === 'home' || current === '' || window.scrollY < 300) {
                        item.classList.add('active');
                    }
                } else if (href === `#${current}`) {
                    item.classList.add('active');
                }
            });
        }, 100);

        window.addEventListener('scroll', handleScroll, { passive: true });
        handleScroll();
    };

    // ============================================
    // FAQ Accordion
    // ============================================
    const initFAQ = () => {
        const faqItems = $$('.faq-item');

        faqItems.forEach(item => {
            const question = item.querySelector('.faq-question');
            
            question.addEventListener('click', () => {
                const isActive = item.classList.contains('active');
                
                // Close all items
                faqItems.forEach(faq => faq.classList.remove('active'));
                
                // Open clicked item if it wasn't active
                if (!isActive) {
                    item.classList.add('active');
                }
            });
        });
    };

    // ============================================
    // Scroll Animations
    // ============================================
    const initScrollAnimations = () => {
        if ('IntersectionObserver' in window) {
            const animationObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('visible');
                    }
                });
            }, {
                threshold: 0.1,
                rootMargin: '0px 0px -50px 0px'
            });

            const animatedElements = $$('.module-card, .highlight-card, .social-card, .stat-visual-item');
            animatedElements.forEach(el => {
                el.classList.add('animate-on-scroll');
                animationObserver.observe(el);
            });
        }
    };

    // ============================================
    // Lazy Loading Images
    // ============================================
    const initLazyLoading = () => {
        if ('IntersectionObserver' in window) {
            const imageObserver = new IntersectionObserver((entries, observer) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        if (img.dataset.src) {
                            img.src = img.dataset.src;
                            img.removeAttribute('data-src');
                        }
                        img.classList.add('loaded');
                        observer.unobserve(img);
                    }
                });
            }, {
                rootMargin: '50px'
            });

            const lazyImages = $$('img[data-src]');
            lazyImages.forEach(img => imageObserver.observe(img));
        } else {
            const lazyImages = $$('img[data-src]');
            lazyImages.forEach(img => {
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
            });
        }
    };

    // ============================================
    // Animate Numbers (Count Up Effect)
    // ============================================
    const animateNumber = (element, target, duration = 2000) => {
        const start = 0;
        const increment = target / (duration / 16);
        let current = start;

        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                current = target;
                clearInterval(timer);
            }
            element.textContent = Math.floor(current).toLocaleString();
        }, 16);
    };

    const initNumberAnimations = () => {
        if ('IntersectionObserver' in window) {
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const element = entry.target;
                        const targetValue = element.textContent.replace(/[^0-9]/g, '');
                        if (targetValue) {
                            animateNumber(element, parseInt(targetValue), 1500);
                        }
                        observer.unobserve(element);
                    }
                });
            }, { threshold: 0.5 });

            const numberElements = $$('.stat-number-large');
            numberElements.forEach(el => observer.observe(el));
        }
    };

    // ============================================
    // Initialize Everything
    // ============================================
    const init = () => {
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', init);
            return;
        }

        initNavigation();
        updateActiveNavLink();
        initCountdown();
        initFAQ();
        initScrollAnimations();
        initLazyLoading();
        initNumberAnimations();

        document.body.classList.add('loaded');
    };

    // Start initialization
    init();

    // Export for external use
    window.HPL = {
        init,
        config: HPL_CONFIG,
        throttle,
        debounce
    };
})();