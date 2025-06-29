// Responsive JavaScript Enhancements

document.addEventListener('DOMContentLoaded', function() {
    
    // Mobile menu toggle enhancement
    const menuBtn = document.getElementById('menu');
    const navbar = document.querySelector('.navbar');
    const navLinks = document.querySelectorAll('.navbar ul li a');
    
    // Close mobile menu when clicking on a link
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navbar.classList.remove('nav-toggle');
            menuBtn.classList.remove('fa-times');
            menuBtn.classList.add('fa-bars');
        });
    });
    
    // Close mobile menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!navbar.contains(e.target) && !menuBtn.contains(e.target)) {
            navbar.classList.remove('nav-toggle');
            menuBtn.classList.remove('fa-times');
            menuBtn.classList.add('fa-bars');
        }
    });
    
    // Handle window resize
    window.addEventListener('resize', function() {
        // Close mobile menu on resize
        if (window.innerWidth > 768) {
            navbar.classList.remove('nav-toggle');
            menuBtn.classList.remove('fa-times');
            menuBtn.classList.add('fa-bars');
        }
        
        // Adjust font size based on screen size
        adjustFontSize();
        
        // Recalculate layout for dynamic elements
        recalculateLayout();
        
        // Adjust home section layout
        adjustHomeSection();
    });
    
    // Touch gesture support for mobile
    let touchStartX = 0;
    let touchStartY = 0;
    
    document.addEventListener('touchstart', function(e) {
        touchStartX = e.touches[0].clientX;
        touchStartY = e.touches[0].clientY;
    });
    
    document.addEventListener('touchend', function(e) {
        if (!touchStartX || !touchStartY) return;
        
        let touchEndX = e.changedTouches[0].clientX;
        let touchEndY = e.changedTouches[0].clientY;
        
        let diffX = touchStartX - touchEndX;
        let diffY = touchStartY - touchEndY;
        
        // Swipe right to open menu (only on mobile)
        if (window.innerWidth <= 768) {
            if (Math.abs(diffX) > Math.abs(diffY)) {
                if (diffX < -50 && touchStartX < 50) {
                    // Swipe right from left edge - open menu
                    navbar.classList.add('nav-toggle');
                    menuBtn.classList.remove('fa-bars');
                    menuBtn.classList.add('fa-times');
                } else if (diffX > 50 && navbar.classList.contains('nav-toggle')) {
                    // Swipe left - close menu
                    navbar.classList.remove('nav-toggle');
                    menuBtn.classList.remove('fa-times');
                    menuBtn.classList.add('fa-bars');
                }
            }
        }
        
        touchStartX = 0;
        touchStartY = 0;
    });
    
    // Optimize images for different screen sizes
    function optimizeImages() {
        const images = document.querySelectorAll('img');
        images.forEach(img => {
            // Add loading="lazy" for better performance
            if (!img.hasAttribute('loading')) {
                img.setAttribute('loading', 'lazy');
            }
            
            // Ensure images are responsive
            if (!img.classList.contains('responsive-img')) {
                img.classList.add('responsive-img');
            }
        });
    }
    
    // Adjust font size dynamically
    function adjustFontSize() {
        const html = document.documentElement;
        const width = window.innerWidth;
        
        if (width >= 1200) {
            html.style.fontSize = '62.5%';
        } else if (width >= 992) {
            html.style.fontSize = '60%';
        } else if (width >= 768) {
            html.style.fontSize = '58%';
        } else if (width >= 576) {
            html.style.fontSize = '56%';
        } else if (width >= 400) {
            html.style.fontSize = '54%';
        } else {
            html.style.fontSize = '52%';
        }
    }
    
    // Adjust home section layout based on screen size
    function adjustHomeSection() {
        const homeSection = document.querySelector('.home');
        const homeContent = document.querySelector('.home .content');
        const homeImage = document.querySelector('.home .image');
        const homeHeading = document.querySelector('.home .content h2');
        const homeBtn = document.querySelector('.home .btn');
        const socials = document.querySelector('.socials');
        
        if (!homeSection) return;
        
        const width = window.innerWidth;
        
        // Remove existing responsive classes
        homeSection.classList.remove('mobile-layout', 'tablet-layout', 'desktop-layout');
        
        if (width <= 767) {
            // Mobile layout
            homeSection.classList.add('mobile-layout');
            if (homeContent) homeContent.style.textAlign = 'center';
            if (homeBtn) homeBtn.style.position = 'relative';
            if (socials) socials.style.justifyContent = 'center';
        } else if (width <= 991) {
            // Tablet layout
            homeSection.classList.add('tablet-layout');
            if (homeContent) homeContent.style.textAlign = 'center';
        } else {
            // Desktop layout
            homeSection.classList.add('desktop-layout');
            if (homeContent) homeContent.style.textAlign = 'left';
            if (homeBtn) homeBtn.style.position = 'absolute';
            if (socials) socials.style.justifyContent = 'flex-start';
        }
        
        // Adjust heading line breaks for mobile
        if (homeHeading && width <= 575) {
            const headingText = homeHeading.innerHTML;
            if (!headingText.includes('<br')) {
                // Add line break after comma for better mobile display
                homeHeading.innerHTML = headingText.replace(',', ',<br>');
            }
        }
    }
    
    // Recalculate layout for dynamic elements
    function recalculateLayout() {
        // Adjust skill bars
        const skillBars = document.querySelectorAll('.skills .container .bar');
        skillBars.forEach(bar => {
            const progressLine = bar.querySelector('.progress-line span');
            if (progressLine) {
                // Trigger reflow to ensure proper width calculation
                progressLine.style.width = '0%';
                setTimeout(() => {
                    progressLine.style.width = progressLine.getAttribute('data-width') || '0%';
                }, 100);
            }
        });
        
        // Adjust timeline for mobile
        if (window.innerWidth <= 600) {
            const timelineContainers = document.querySelectorAll('.experience .timeline-container');
            timelineContainers.forEach(container => {
                container.classList.remove('left', 'right');
                container.classList.add('mobile-timeline');
            });
        }
    }
    
    // Handle orientation change
    window.addEventListener('orientationchange', function() {
        setTimeout(() => {
            adjustFontSize();
            recalculateLayout();
            adjustHomeSection();
            
            // Close mobile menu on orientation change
            navbar.classList.remove('nav-toggle');
            menuBtn.classList.remove('fa-times');
            menuBtn.classList.add('fa-bars');
        }, 100);
    });
    
    // Intersection Observer for animations on mobile
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    const animateElements = document.querySelectorAll('.section, .box, .timeline-container');
    animateElements.forEach(el => {
        observer.observe(el);
    });
    
    // Smooth scroll enhancement for mobile
    function smoothScrollTo(target) {
        const element = document.querySelector(target);
        if (element) {
            const headerHeight = document.querySelector('header').offsetHeight;
            const elementPosition = element.offsetTop - headerHeight - 20;
            
            window.scrollTo({
                top: elementPosition,
                behavior: 'smooth'
            });
        }
    }
    
    // Enhanced navigation for mobile
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const target = link.getAttribute('href');
            if (target.startsWith('#')) {
                smoothScrollTo(target);
            }
        });
    });
    
    // Prevent zoom on double tap for iOS
    let lastTouchEnd = 0;
    document.addEventListener('touchend', function(event) {
        const now = (new Date()).getTime();
        if (now - lastTouchEnd <= 300) {
            event.preventDefault();
        }
        lastTouchEnd = now;
    }, false);
    
    // Initialize responsive features
    optimizeImages();
    adjustFontSize();
    recalculateLayout();
    adjustHomeSection();
    
    // Add responsive classes to body
    function updateBodyClasses() {
        const body = document.body;
        const width = window.innerWidth;
        
        // Remove existing responsive classes
        body.classList.remove('mobile', 'tablet', 'desktop', 'large-desktop');
        
        // Add appropriate class
        if (width < 576) {
            body.classList.add('mobile');
        } else if (width < 992) {
            body.classList.add('tablet');
        } else if (width < 1200) {
            body.classList.add('desktop');
        } else {
            body.classList.add('large-desktop');
        }
    }
    
    // Update body classes on load and resize
    updateBodyClasses();
    window.addEventListener('resize', updateBodyClasses);
    
    // Performance optimization for scroll events
    let ticking = false;
    
    function updateOnScroll() {
        // Add any scroll-based responsive updates here
        ticking = false;
    }
    
    window.addEventListener('scroll', () => {
        if (!ticking) {
            requestAnimationFrame(updateOnScroll);
            ticking = true;
        }
    });
    
    // Home section specific optimizations
    function optimizeHomeSection() {
        const homeSection = document.querySelector('.home');
        const particles = document.getElementById('particles-js');
        
        if (homeSection && particles) {
            // Disable particles on very small screens for performance
            if (window.innerWidth < 400) {
                particles.style.display = 'none';
            } else {
                particles.style.display = 'block';
            }
        }
        
        // Optimize typing animation for mobile
        const typingText = document.querySelector('.typing-text');
        if (typingText && window.innerWidth < 576) {
            // Reduce typing speed on mobile for better readability
            if (window.typed) {
                window.typed.typeSpeed = 120;
                window.typed.backSpeed = 80;
            }
        }
    }
    
    // Call home section optimization
    optimizeHomeSection();
    window.addEventListener('resize', optimizeHomeSection);
    
    console.log('Responsive enhancements loaded successfully!');
});

// CSS for responsive animations and home section
const responsiveStyles = `
    .responsive-img {
        max-width: 100%;
        height: auto;
        display: block;
    }
    
    .animate-in {
        animation: fadeInUp 0.6s ease forwards;
    }
    
    @keyframes fadeInUp {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    .mobile-timeline {
        left: 0% !important;
    }
    
    /* Home section responsive enhancements */
    .home.mobile-layout {
        flex-direction: column !important;
        text-align: center !important;
        gap: 2rem !important;
    }
    
    .home.mobile-layout .content {
        order: 1;
        flex: 1 1 100% !important;
    }
    
    .home.mobile-layout .image {
        order: 2;
        flex: 1 1 100% !important;
        margin-top: 1rem !important;
    }
    
    .home.tablet-layout {
        flex-direction: column !important;
        text-align: center !important;
        gap: 3rem !important;
    }
    
    .home.tablet-layout .content {
        order: 1;
    }
    
    .home.tablet-layout .image {
        order: 2;
    }
    
    @media (max-width: 768px) {
        .navbar {
            transition: right 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }
        
        .navbar ul li a {
            transition: all 0.3s ease;
        }
        
        .navbar ul li a:hover {
            transform: translateX(10px);
        }
        
        .home .content h2 {
            word-break: break-word;
            hyphens: auto;
        }
        
        .home .btn {
            position: relative !important;
            margin: 2rem auto !important;
            display: inline-block !important;
        }
        
        .socials {
            justify-content: center !important;
            margin-top: 2rem !important;
        }
    }
    
    @media (max-width: 575px) {
        .home .content h2 {
            line-height: 1.3 !important;
            margin-bottom: 1rem !important;
        }
        
        .home .content h2 span {
            display: block !important;
            margin-top: 0.5rem !important;
        }
        
        .home .image img {
            width: 70% !important;
            margin: 0 auto !important;
        }
    }
    
    @media (max-width: 399px) {
        .home .content h2 {
            font-size: 2.8rem !important;
            line-height: 1.4 !important;
        }
        
        .home .content h2 span {
            font-size: 2.8rem !important;
        }
        
        .home .image img {
            width: 80% !important;
        }
    }
    
    @media (prefers-reduced-motion: reduce) {
        .animate-in {
            animation: none;
        }
        
        * {
            transition-duration: 0.01ms !important;
        }
    }
`;

// Inject responsive styles
const styleSheet = document.createElement('style');
styleSheet.textContent = responsiveStyles;
document.head.appendChild(styleSheet);
