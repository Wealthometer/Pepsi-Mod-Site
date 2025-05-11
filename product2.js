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
    
    // Product filtering
    const filterButtons = document.querySelectorAll('.filter-btn');
    const productCards = document.querySelectorAll('.product-card');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            
            // Add active class to clicked button
            this.classList.add('active');
            
            // Get filter value
            const filterValue = this.getAttribute('data-filter');
            
            // Filter products
            productCards.forEach(card => {
                if (filterValue === 'all' || card.getAttribute('data-category') === filterValue) {
                    card.style.display = 'block';
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'scale(1)';
                    }, 100);
                } else {
                    card.style.opacity = '0';
                    card.style.transform = 'scale(0.8)';
                    setTimeout(() => {
                        card.style.display = 'none';
                    }, 300);
                }
            });
        });
    });
    
    // 3D product card effect
    productCards.forEach(card => {
        card.addEventListener('mousemove', function(e) {
            const cardRect = this.getBoundingClientRect();
            const cardCenterX = cardRect.left + cardRect.width / 2;
            const cardCenterY = cardRect.top + cardRect.height / 2;
            
            const mouseX = e.clientX - cardCenterX;
            const mouseY = e.clientY - cardCenterY;
            
            const rotateY = mouseX * 0.05;
            const rotateX = -mouseY * 0.05;
            
            // Apply rotation only if card is not flipped
            const cardInner = this.querySelector('.product-card-inner');
            const computedStyle = window.getComputedStyle(cardInner);
            const transform = computedStyle.getPropertyValue('transform');
            
            if (transform === 'none' || transform.includes('matrix3d') === false) {
                cardInner.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
            }
        });
        
        card.addEventListener('mouseleave', function() {
            const cardInner = this.querySelector('.product-card-inner');
            const computedStyle = window.getComputedStyle(cardInner);
            const transform = computedStyle.getPropertyValue('transform');
            
            if (transform === 'none' || transform.includes('matrix3d') === false) {
                cardInner.style.transform = 'perspective(1000px) rotateX(0) rotateY(0)';
            }
        });
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
    
    // Product image animation on hover
    document.querySelectorAll('.product-image img').forEach(img => {
        img.addEventListener('mouseover', function() {
            this.style.transform = 'scale(1.1) rotate(5deg)';
        });
        
        img.addEventListener('mouseout', function() {
            this.style.transform = 'scale(1) rotate(0)';
        });
    });
    
    // Add mobile nav styles dynamically
    const style = document.createElement('style');
    style.textContent = `
        .mobile-nav {
            position: fixed;
            top: 0;
            right: -100%;
            width: 70%;
            height: 100vh;
            background-color: white;
            z-index: 999;
            padding: 100px 40px 40px;
            transition: right 0.4s ease;
            box-shadow: -5px 0 15px rgba(0, 0, 0, 0.1);
        }
        
        .mobile-nav.active {
            right: 0;
        }
        
        .mobile-nav ul {
            list-style: none;
            flex-direction: column;
        }
        
        .mobile-nav ul li {
            margin: 0 0 20px 0;
        }
        
        .mobile-nav ul li a {
            font-size: 1.2rem;
            display: block;
            padding: 10px 0;
        }
    `;
    document.head.appendChild(style);
    
    // Initialize first animation
    setTimeout(() => {
        document.querySelectorAll('.reveal-text, .reveal-element').forEach(element => {
            if (element.getBoundingClientRect().top < window.innerHeight) {
                element.classList.add('in-view');
            }
        });
    }, 300);

    // Add tap functionality for mobile devices
    productCards.forEach(card => {
        card.addEventListener('click', function() {
            const cardInner = this.querySelector('.product-card-inner');
            
            // Toggle the flip state
            if (cardInner.style.transform === 'rotateY(180deg)') {
                cardInner.style.transform = 'rotateY(0deg)';
            } else {
                cardInner.style.transform = 'rotateY(180deg)';
            }
        });
    });
});