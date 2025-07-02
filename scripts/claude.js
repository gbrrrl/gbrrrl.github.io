// DOM Elements
    const navbar = document.getElementById('navbar');
    const hamburger = document.getElementById('hamburger');
    const navLinks = document.getElementById('navLinks');
    const scrollTopBtn = document.getElementById('scrollTop');
    const contactForm = document.getElementById('contactForm');

    // Mobile Navigation Toggle
    hamburger.addEventListener('click', function() {
        navLinks.classList.toggle('active');
        hamburger.classList.toggle('active');
    });

    // Close mobile menu when clicking on a link
    navLinks.addEventListener('click', function(e) {
        if (e.target.tagName === 'A') {
            navLinks.classList.remove('active');
            hamburger.classList.remove('active');
        }
    });

    // Smooth Scrolling for Navigation Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Navbar Scroll Effect
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        // Show/Hide Scroll to Top Button
        if (window.scrollY > 300) {
            scrollTopBtn.classList.add('visible');
        } else {
            scrollTopBtn.classList.remove('visible');
        }
    });

    // Scroll to Top Functionality
    scrollTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // Scroll Animation for Section Titles
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    // Observe all section titles
    document.querySelectorAll('.section-title').forEach(title => {
        observer.observe(title);
    });

    // Project Click Handler
    function openProject(projectId) {
        // You can customize this function to open project details
        // For now, it shows an alert, but you could open a modal or navigate to a project page
        const projects = {
            project1: {
                name: "Portfolio Website",
                description: "A responsive portfolio website with modern animations",
                link: "#"
            },
            project2: {
                name: "Interactive Dashboard", 
                description: "Data visualization with interactive charts",
                link: "#"
            },
            project3: {
                name: "E-commerce Landing",
                description: "Conversion-optimized landing page",
                link: "#"
            }
        };

        const project = projects[projectId];
        if (project) {
            alert(`${project.name}\n\n${project.description}\n\nClick OK to learn more!`);
            // You could replace this with: window.open(project.link, '_blank');
        }
    }

    // Contact Form Handler
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(contactForm);
        const name = formData.get('name');
        const email = formData.get('email');
        const message = formData.get('message');

        // Simple validation
        if (!name || !email || !message) {
            alert('Please fill in all fields!');
            return;
        }

        // Here you would typically send the data to a server
        // For now, we'll just show a success message
        alert(`Thank you, ${name}! Your message has been received. I'll get back to you at ${email} soon!`);
        
        // Reset form
        contactForm.reset();
    });

    // Typing Effect for Hero Text (Optional Enhancement)
    function typeWriter(element, text, speed = 100) {
        let i = 0;
        element.innerHTML = '';
        
        function type() {
            if (i < text.length) {
                element.innerHTML += text.charAt(i);
                i++;
                setTimeout(type, speed);
            }
        }
        type();
    }

    // Initialize typing effect when page loads (optional)
    window.addEventListener('load', function() {
        // Uncomment the line below if you want a typing effect
        // typeWriter(document.querySelector('.hero-content h1'), "Hello, I'm Your Name", 100);
    });

    // Add some interactive hover effects
    document.querySelectorAll('.skill-item, .project-card').forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });

    // Simple parallax effect for hero section
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const hero = document.querySelector('.hero');
        const rate = scrolled * -0.5;
        
        if (hero) {
            hero.style.transform = `translateY(${rate}px)`;
        }
    });

    console.log('Portfolio website loaded successfully! 🚀');