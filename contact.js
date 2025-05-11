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
    
    // FAQ accordion
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        
        question.addEventListener('click', () => {
            // Close all other items
            faqItems.forEach(otherItem => {
                if (otherItem !== item) {
                    otherItem.classList.remove('active');
                }
            });
            
            // Toggle current item
            item.classList.toggle('active');
        });
    });
    
    // Form submission and modal
    const contactForm = document.getElementById('contactForm');
    const successModal = document.getElementById('successModal');
    const closeModal = document.querySelector('.close-modal');
    const modalBtn = document.querySelector('.modal-btn');
    
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Simulate form submission
        setTimeout(() => {
            successModal.style.display = 'flex';
            setTimeout(() => {
                successModal.classList.add('active');
            }, 10);
            
            // Reset form
            contactForm.reset();
        }, 1000);
    });
    
    function closeSuccessModal() {
        successModal.classList.remove('active');
        setTimeout(() => {
            successModal.style.display = 'none';
        }, 300);
    }
    
    closeModal.addEventListener('click', closeSuccessModal);
    modalBtn.addEventListener('click', closeSuccessModal);
    
    // Close modal when clicking outside
    successModal.addEventListener('click', function(e) {
        if (e.target === this) {
            closeSuccessModal();
        }
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
    
    // Create 3D bubbles and fizz effect
    function createBubble() {
        const bubble = document.createElement('div');
        bubble.className = 'bubble-effect';
        
        // Random size between 10px and 50px
        const size = Math.random() * 40 + 10;
        bubble.style.width = `${size}px`;
        bubble.style.height = `${size}px`;
        
        // Random position
        const posX = Math.random() * window.innerWidth;
        const posY = Math.random() * window.innerHeight;
        bubble.style.left = `${posX}px`;
        bubble.style.bottom = `-${size}px`;
        
        // Random opacity and blur
        const opacity = Math.random() * 0.6 + 0.2;
        const blur = Math.random() * 2;
        bubble.style.opacity = opacity;
        bubble.style.filter = `blur(${blur}px)`;
        
        // Add styles
        bubble.style.position = 'absolute';
        bubble.style.borderRadius = '50%';
        bubble.style.background = 'radial-gradient(circle at 30% 30%, rgba(255, 255, 255, 0.8), rgba(0, 101, 195, 0.2))';
        bubble.style.boxShadow = '0 0 10px rgba(0, 101, 195, 0.3)';
        bubble.style.zIndex = '-1';
        
        // Add to container
        document.querySelector('.bubble-container').appendChild(bubble);
        
        // Animate upward
        const duration = Math.random() * 8000 + 4000;
        const finalY = window.innerHeight + size;
        const finalX = posX + (Math.random() * 100 - 50);
        
        bubble.animate([
            { transform: 'translateY(0) translateX(0) scale(1)', opacity: opacity },
            { transform: `translateY(-${finalY}px) translateX(${Math.random() > 0.5 ? finalX : -finalX}px) scale(${Math.random() * 0.5 + 0.8})`, opacity: '0' }
        ], {
            duration: duration,
            easing: 'ease-out'
        }).onfinish = () => {
            bubble.remove();
        };
    }
    
    // Create fizz effect
    function createFizz() {
        const fizz = document.createElement('div');
        fizz.className = 'fizz-effect';
        
        // Random position at the bottom
        const posX = Math.random() * window.innerWidth;
        fizz.style.left = `${posX}px`;
        fizz.style.bottom = '0';
        
        // Add styles
        fizz.style.position = 'absolute';
        fizz.style.width = '100px';
        fizz.style.height = '200px';
        fizz.style.background = 'radial-gradient(ellipse at center, rgba(255, 255, 255, 0.3) 0%, rgba(0, 101, 195, 0.1) 70%, transparent 100%)';
        fizz.style.borderRadius = '50% 50% 0 0';
        fizz.style.zIndex = '-1';
        fizz.style.opacity = '0';
        fizz.style.transform = 'scale(0.5)';
        
        // Add to container
        document.querySelector('.fizz-container').appendChild(fizz);
        
        // Animate
        fizz.animate([
            { opacity: 0, transform: 'scale(0.5)' },
            { opacity: 0.7, transform: 'scale(1)' },
            { opacity: 0, transform: 'scale(1.2) translateY(-300px)' }
        ], {
            duration: 3000,
            easing: 'ease-out'
        }).onfinish = () => {
            fizz.remove();
        };
    }
    
    // Create bubbles and fizz periodically
    setInterval(createBubble, 300);
    setInterval(createFizz, 2000);
    
    // Form input effects
    const formInputs = document.querySelectorAll('.form-group input, .form-group textarea');
    
    formInputs.forEach(input => {
        input.addEventListener('focus', function() {
            this.parentElement.classList.add('focused');
        });
        
        input.addEventListener('blur', function() {
            this.parentElement.classList.remove('focused');
        });
    });
    
    // Add 3D effect to form
    const contactFormContainer = document.querySelector('.contact-form-container');
    
    document.addEventListener('mousemove', function(e) {
        if (window.innerWidth > 768) {
            const mouseX = e.clientX / window.innerWidth - 0.5;
            const mouseY = e.clientY / window.innerHeight - 0.5;
            
            contactFormContainer.style.transform = `perspective(1000px) rotateY(${mouseX * 5}deg) rotateX(${-mouseY * 5}deg)`;
        }
    });
    
    contactFormContainer.addEventListener('mouseleave', function() {
        this.style.transform = 'perspective(1000px) rotateY(0) rotateX(0)';
    });
});