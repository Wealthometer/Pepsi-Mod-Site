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
    
    // Bubble pop effect
    document.querySelectorAll('.bubble').forEach(bubble => {
        // Random time between 5 and 15 seconds
        const randomTime = Math.random() * 10000 + 5000;
        
        setTimeout(() => {
            bubble.style.transition = 'transform 0.5s ease, opacity 0.5s ease';
            bubble.style.transform = 'scale(1.5)';
            bubble.style.opacity = '0';
            
            setTimeout(() => {
                // Reset bubble
                bubble.style.transition = 'none';
                bubble.style.transform = 'scale(0)';
                
                setTimeout(() => {
                    bubble.style.transition = 'transform 0.5s ease, opacity 0.5s ease';
                    bubble.style.transform = 'scale(1)';
                    bubble.style.opacity = '1';
                }, 100);
            }, 500);
        }, randomTime);
    });
    
    // 3D effect for timeline items
    document.querySelectorAll('.timeline-content').forEach(item => {
        item.addEventListener('mousemove', function(e) {
            const itemRect = this.getBoundingClientRect();
            const itemCenterX = itemRect.left + itemRect.width / 2;
            const itemCenterY = itemRect.top + itemRect.height / 2;
            
            const mouseX = e.clientX - itemCenterX;
            const mouseY = e.clientY - itemCenterY;
            
            const rotateY = mouseX * 0.01;
            const rotateX = -mouseY * 0.01;
            
            this.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-10px)`;
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
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
    
    // Create and animate additional bubbles
    function createBubble() {
        const bubble = document.createElement('div');
        bubble.className = 'bubble';
        
        // Random size between 20px and 60px
        const size = Math.random() * 40 + 20;
        bubble.style.width = `${size}px`;
        bubble.style.height = `${size}px`;
        
        // Random position at the bottom of the screen
        const posX = Math.random() * window.innerWidth;
        bubble.style.left = `${posX}px`;
        bubble.style.bottom = '-100px';
        
        // Random opacity
        bubble.style.opacity = Math.random() * 0.5 + 0.2;
        
        // Add to background elements
        document.querySelector('.background-elements').appendChild(bubble);
        
        // Animate upward
        const duration = Math.random() * 5000 + 3000;
        const finalY = window.innerHeight + 100;
        
        bubble.animate([
            { transform: 'translateY(0) scale(1)', opacity: bubble.style.opacity },
            { transform: `translateY(-${finalY}px) scale(1.5)`, opacity: '0' }
        ], {
            duration: duration,
            easing: 'ease-out'
        }).onfinish = () => {
            bubble.remove();
        };
    }
    
    // Create bubbles periodically
    setInterval(createBubble, 1000);
});