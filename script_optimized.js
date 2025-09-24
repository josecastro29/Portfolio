// Enhanced Portfolio JavaScript with Error Handling
(function () {
    'use strict';

    // Check browser compatibility
    const supportsModernFeatures = () => {
        return typeof window.IntersectionObserver !== 'undefined' &&
            typeof window.requestAnimationFrame !== 'undefined';
    };

    if (!supportsModernFeatures()) {
        console.warn('Some features may not work in this browser.');
    }

    // Navigation functionality
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    // Toggle mobile menu
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
    }

    // Close mobile menu when clicking on a link
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (hamburger && navMenu) {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            }
        });
    });

    // Smooth scrolling for navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            const targetSection = document.querySelector(targetId);

            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Active navigation link highlighting
    const updateActiveNavLink = () => {
        const sections = document.querySelectorAll('section');
        const scrollPos = window.scrollY + 100;

        sections.forEach(section => {
            const top = section.offsetTop;
            const bottom = top + section.offsetHeight;
            const id = section.getAttribute('id');
            const navLink = document.querySelector(`.nav-link[href="#${id}"]`);

            if (scrollPos >= top && scrollPos < bottom) {
                navLinks.forEach(link => link.classList.remove('active'));
                if (navLink) {
                    navLink.classList.add('active');
                }
            }
        });
    };

    // Throttle function for performance
    const throttle = (func, limit) => {
        let lastFunc;
        let lastRan;
        return function () {
            const context = this;
            const args = arguments;
            if (!lastRan) {
                func.apply(context, args);
                lastRan = Date.now();
            } else {
                clearTimeout(lastFunc);
                lastFunc = setTimeout(function () {
                    if ((Date.now() - lastRan) >= limit) {
                        func.apply(context, args);
                        lastRan = Date.now();
                    }
                }, limit - (Date.now() - lastRan));
            }
        }
    };

    // Navbar background change on scroll
    const updateNavbar = () => {
        const navbar = document.querySelector('.navbar');
        if (navbar) {
            if (window.scrollY > 50) {
                navbar.style.background = 'transparent';
                navbar.style.boxShadow = '0 2px 10px rgba(0, 255, 65, 0.2)';
            } else {
                navbar.style.background = 'transparent';
                navbar.style.boxShadow = '0 2px 10px rgba(0, 255, 65, 0.2)';
            }
        }
    };

    // Optimize scroll events with throttling
    window.addEventListener('scroll', throttle(() => {
        updateActiveNavLink();
        updateNavbar();
        updateProgressBar();
        updateScrollToTop();
    }, 16)); // ~60fps

    // Direct email function using mailto (works immediately!)
    window.sendEmailDirect = function() {
        const name = document.getElementById('sender_name').value;
        const email = document.getElementById('sender_email').value;
        const subject = document.getElementById('email_subject').value;
        const message = document.getElementById('email_message').value;

        // Validation
        if (!name || !email || !subject || !message) {
            showMessage('Por favor, preencha todos os campos.', 'error');
            return;
        }

        if (!isValidEmail(email)) {
            showMessage('Por favor, insira um email válido.', 'error');
            return;
        }

        // Create mailto link with clean formatting
        const emailBody = `Olá José,%0D%0A%0D%0A${message}%0D%0A%0D%0ACumprimentos,%0D%0A${name}%0D%0A%0D%0A----%0D%0AContacto: ${email}`;
                         
        const mailtoLink = `mailto:josemarinho2004@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(emailBody.replace(/%0D%0A/g, '\n'))}`;
        
        // Open email client
        window.location.href = mailtoLink;
        
        // Show success message
        showMessage('Cliente de email aberto! Complete o envio no seu programa de email.', 'success');
        
        // Clear form after 2 seconds
        setTimeout(() => {
            document.getElementById('contact-form').reset();
        }, 2000);
    };

    // Initialize EmailJS (backup method)
    if (typeof emailjs !== 'undefined') {
        emailjs.init("YOUR_PUBLIC_KEY"); // Will be configured later if needed
    }

    // Enhanced form validation
    const validateForm = (data) => {
        const errors = [];

        if (!data.name || data.name.trim().length < 2) {
            errors.push('Nome deve ter pelo menos 2 caracteres.');
        }

        if (!data.email || !isValidEmail(data.email)) {
            errors.push('Email inválido.');
        }

        if (!data.subject || data.subject.trim().length < 3) {
            errors.push('Assunto deve ter pelo menos 3 caracteres.');
        }

        if (!data.message || data.message.trim().length < 10) {
            errors.push('Mensagem deve ter pelo menos 10 caracteres.');
        }

        if (errors.length > 0) {
            showMessage(errors.join(' '), 'error');
            return false;
        }

        return true;
    };

    // Email validation
    const isValidEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    // Enhanced message display
    const showMessage = (message, type) => {
        // Remove existing messages
        const existingMessage = document.querySelector('.form-message');
        if (existingMessage) {
            existingMessage.remove();
        }

        // Create new message element
        const messageElement = document.createElement('div');
        messageElement.className = `form-message ${type}`;
        messageElement.textContent = message;
        messageElement.setAttribute('role', 'alert');

        // Style the message
        const styles = {
            padding: '1rem',
            marginTop: '1rem',
            borderRadius: '8px',
            fontWeight: '500',
            textAlign: 'center',
            transition: 'all 0.3s ease'
        };

        const typeStyles = type === 'success'
            ? {
                background: '#dcfce7',
                color: '#166534',
                border: '1px solid #bbf7d0'
            }
            : {
                background: '#fef2f2',
                color: '#dc2626',
                border: '1px solid #fecaca'
            };

        Object.assign(messageElement.style, styles, typeStyles);

        // Insert and animate
        contactForm.appendChild(messageElement);

        // Fade in animation
        requestAnimationFrame(() => {
            messageElement.style.opacity = '0';
            messageElement.style.transform = 'translateY(-10px)';
            requestAnimationFrame(() => {
                messageElement.style.opacity = '1';
                messageElement.style.transform = 'translateY(0)';
            });
        });

        // Auto remove after 5 seconds
        setTimeout(() => {
            if (messageElement.parentNode) {
                messageElement.style.opacity = '0';
                messageElement.style.transform = 'translateY(-10px)';
                setTimeout(() => messageElement.remove(), 300);
            }
        }, 5000);
    };

    // Intersection Observer for animations
    const createObserver = () => {
        if (!window.IntersectionObserver) return;

        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -100px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, observerOptions);

        // Observe elements for animation
        const animateElements = document.querySelectorAll('.skill-card, .project-card, .stat');
        animateElements.forEach(element => {
            element.style.opacity = '0';
            element.style.transform = 'translateY(30px)';
            element.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
            observer.observe(element);
        });
    };

    // Progress bar
    const createProgressBar = () => {
        const progressBar = document.createElement('div');
        progressBar.className = 'reading-progress';
        progressBar.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 0%;
            height: 3px;
            background: #2563eb;
            z-index: 9999;
            transition: width 0.1s ease;
        `;
        document.body.appendChild(progressBar);
        return progressBar;
    };

    const progressBar = createProgressBar();

    const updateProgressBar = () => {
        const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
        const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = Math.min((winScroll / height) * 100, 100);
        progressBar.style.width = scrolled + '%';
    };

    // Scroll to top button
    const createScrollToTopBtn = () => {
        const scrollToTopBtn = document.createElement('button');
        scrollToTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
        scrollToTopBtn.className = 'scroll-to-top';
        scrollToTopBtn.setAttribute('aria-label', 'Voltar ao topo');
        scrollToTopBtn.style.cssText = `
            position: fixed;
            bottom: 30px;
            right: 30px;
            width: 50px;
            height: 50px;
            background: #2563eb;
            color: white;
            border: none;
            border-radius: 50%;
            cursor: pointer;
            font-size: 1.2rem;
            box-shadow: 0 4px 12px rgba(37, 99, 235, 0.3);
            transition: all 0.3s ease;
            opacity: 0;
            visibility: hidden;
            z-index: 1000;
        `;

        scrollToTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });

        scrollToTopBtn.addEventListener('mouseenter', () => {
            scrollToTopBtn.style.transform = 'translateY(-3px)';
            scrollToTopBtn.style.boxShadow = '0 6px 20px rgba(37, 99, 235, 0.4)';
        });

        scrollToTopBtn.addEventListener('mouseleave', () => {
            scrollToTopBtn.style.transform = 'translateY(0)';
            scrollToTopBtn.style.boxShadow = '0 4px 12px rgba(37, 99, 235, 0.3)';
        });

        document.body.appendChild(scrollToTopBtn);
        return scrollToTopBtn;
    };

    const scrollToTopBtn = createScrollToTopBtn();

    const updateScrollToTop = () => {
        if (window.scrollY > 500) {
            scrollToTopBtn.style.opacity = '1';
            scrollToTopBtn.style.visibility = 'visible';
        } else {
            scrollToTopBtn.style.opacity = '0';
            scrollToTopBtn.style.visibility = 'hidden';
        }
    };

    // Close mobile menu when clicking outside
    document.addEventListener('click', (e) => {
        if (navMenu && hamburger &&
            !navMenu.contains(e.target) &&
            !hamburger.contains(e.target)) {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        }
    });

    // Keyboard navigation support
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && navMenu && hamburger) {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        }
    });

    // Initialize everything when DOM is ready
    const init = () => {
        createObserver();

        // Add loaded class for CSS animations
        document.body.classList.add('loaded');

        // Performance monitoring
        if (window.performance && window.performance.navigation) {
            const loadTime = window.performance.timing.loadEventEnd - window.performance.timing.navigationStart;
            console.log(`Page loaded in ${loadTime}ms`);
        }
    };

    // Wait for DOM to be ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

    // Handle page visibility changes for performance
    document.addEventListener('visibilitychange', () => {
        if (document.hidden) {
            // Pause heavy operations when tab is not visible
            console.log('Page hidden - pausing animations');
        } else {
            console.log('Page visible - resuming animations');
        }
    });

    // Demo Modal Functionality
    const initDemoModal = () => {
        const modal = document.getElementById('demo-modal');
        const modalTitle = document.getElementById('modal-project-title');
        const demoVideo = document.getElementById('demo-video');
        const closeModal = document.querySelector('.close');

        // Project demo data
        const projectDemos = {
            'TrustChain': {
                title: 'TrustChain - E-commerce/Blockchain',
                video: 'videos/trustchain-demo.mp4'
            },
            'MazeRush': {
                title: 'MazeRush - Game Development',
                video: 'videos/mazerush-demo.mp4'
            },
            'BiblioUTAD': {
                title: 'BiblioUTAD - Biblioteca Digital',
                video: 'videos/biblioutad-demo.mp4'
            },
            'Task Manager': {
                title: 'Task Manager - Desktop Application',
                video: 'videos/taskmanager-demo.mp4'
            }
        };

        // Open modal function
        const openDemoModal = (projectName) => {
            const projectData = projectDemos[projectName];
            if (projectData && modal) {
                modalTitle.textContent = `Demo - ${projectData.title}`;
                demoVideo.src = projectData.video;
                demoVideo.poster = `images/${projectName.toLowerCase().replace(/\s+/g, '')}-preview.jpg`;
                modal.style.display = 'block';
                document.body.style.overflow = 'hidden';
                
                // Reset video
                demoVideo.currentTime = 0;
            }
        };

        // Close modal function
        const closeDemoModal = () => {
            if (modal) {
                modal.style.display = 'none';
                document.body.style.overflow = 'auto';
                
                // Stop video
                demoVideo.pause();
                demoVideo.src = '';
            }
        };

        // Event listeners
        if (closeModal) {
            closeModal.addEventListener('click', closeDemoModal);
        }

        // Close modal when clicking outside
        if (modal) {
            modal.addEventListener('click', (e) => {
                if (e.target === modal) {
                    closeDemoModal();
                }
            });
        }

        // Close modal with Escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && modal && modal.style.display === 'block') {
                closeDemoModal();
            }
        });

        // Add click handlers to demo buttons
        const addDemoHandlers = () => {
            const projectCards = document.querySelectorAll('.project-card');
            
            projectCards.forEach(card => {
                const demoLink = card.querySelector('.project-link[href="#"]');
                const projectTitle = card.querySelector('h3');
                
                if (demoLink && projectTitle) {
                    demoLink.addEventListener('click', (e) => {
                        e.preventDefault();
                        const projectName = projectTitle.textContent.trim();
                        openDemoModal(projectName);
                    });
                }
            });
        };

        // Initialize demo handlers when DOM is ready
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', addDemoHandlers);
        } else {
            addDemoHandlers();
        }
    };

    // Initialize demo modal
    initDemoModal();

})();
