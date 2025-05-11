// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const mobileNav = document.createElement('div');
    mobileNav.className = 'mobile-nav';
    mobileNav.innerHTML = document.querySelector('nav').innerHTML;
    document.body.appendChild(mobileNav);
    
    menuToggle.addEventListener('click', function() {
        this.classList.toggle('active');
        mobileNav.classList.toggle('active');
        
        if (this.classList.contains('active')) {
            this.querySelector('.bar:nth-child(1)').style.transform = 'rotate(45deg) translate(5px, 6px)';
            this.querySelector('.bar:nth-child(2)').style.opacity = '0';
            this.querySelector('.bar:nth-child(3)').style.transform = 'rotate(-45deg) translate(5px, -6px)';
        } else {
            this.querySelector('.bar:nth-child(1)').style.transform = 'none';
            this.querySelector('.bar:nth-child(2)').style.opacity = '1';
            this.querySelector('.bar:nth-child(3)').style.transform = 'none';
        }
    });
    
    // Header scroll effect
    const header = document.querySelector('header');
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
    
    // Scroll animations
    const observerOptions = {
        threshold: 0.2,
        rootMargin: '0px 0px -100px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('in-view');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    document.querySelectorAll('.reveal-text, .reveal-element').forEach(element => {
        observer.observe(element);
    });
    
    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const target = document.querySelector(targetId);
            if (target) {
                // Close mobile menu if open
                if (mobileNav.classList.contains('active')) {
                    menuToggle.classList.remove('active');
                    mobileNav.classList.remove('active');
                    menuToggle.querySelector('.bar:nth-child(1)').style.transform = 'none';
                    menuToggle.querySelector('.bar:nth-child(2)').style.opacity = '1';
                    menuToggle.querySelector('.bar:nth-child(3)').style.transform = 'none';
                }
                
                // Smooth scroll to target
                window.scrollTo({
                    top: target.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Parallax effect for background elements
    window.addEventListener('mousemove', function(e) {
        const mouseX = e.clientX / window.innerWidth;
        const mouseY = e.clientY / window.innerHeight;
        
        document.querySelectorAll('.bubble').forEach(bubble => {
            const bubbleSpeed = bubble.classList.contains('bubble-1') ? 20 : 
                               bubble.classList.contains('bubble-2') ? 30 :
                               bubble.classList.contains('bubble-3') ? 15 :
                               bubble.classList.contains('bubble-4') ? 25 : 10;
            
            const xPos = mouseX * bubbleSpeed;
            const yPos = mouseY * bubbleSpeed;
            
            bubble.style.transform = `translate(${xPos}px, ${yPos}px)`;
        });
    });
    
    // Product rotation on hover
    document.querySelectorAll('.product-image img').forEach(product => {
        product.addEventListener('mousemove', function(e) {
            const productRect = this.getBoundingClientRect();
            const productCenterX = productRect.left + productRect.width / 2;
            const productCenterY = productRect.top + productRect.height / 2;
            
            const mouseX = e.clientX - productCenterX;
            const mouseY = e.clientY - productCenterY;
            
            const rotateY = mouseX * 0.05;
            const rotateX = -mouseY * 0.05;
            
            this.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.05)`;
        });
        
        product.addEventListener('mouseleave', function() {
            this.style.transform = 'rotateX(0) rotateY(0) scale(1)';
        });
    });
    
    // Initialize animations
    document.querySelectorAll('.animate-text').forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
    });
    
    // Video background fallback
    const video = document.getElementById('background-video');
    if (video) {
        video.addEventListener('error', function() {
            document.querySelector('.video-container').style.backgroundColor = 'var(--pepsi-blue)';
        });
    }
});