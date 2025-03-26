// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', () => {
    // Preloader
    window.addEventListener('load', () => {
        const preloader = document.querySelector('.preloader');
        preloader.classList.add('fade-out');
        setTimeout(() => {
            preloader.style.display = 'none';
        }, 500);
        
        // Initialize skill bars after page load
        initSkillBars();
    });

    // Current year for footer
    document.getElementById('year').textContent = new Date().getFullYear();

    // Custom cursor
    const cursor = document.querySelector('.cursor');
    if (cursor) {
        document.addEventListener('mousemove', (e) => {
            cursor.style.left = e.clientX + 'px';
            cursor.style.top = e.clientY + 'px';
        });

        document.addEventListener('mousedown', () => {
            cursor.classList.add('active');
        });

        document.addEventListener('mouseup', () => {
            cursor.classList.remove('active');
        });
    }

    // Navbar scroll effect
    const nav = document.querySelector('.nav');
    const backToTop = document.querySelector('.back-to-top');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            nav.classList.add('scrolled');
            backToTop.classList.add('active');
        } else {
            nav.classList.remove('scrolled');
            backToTop.classList.remove('active');
        }
        
        // Active nav link based on scroll position
        updateActiveNavLink();
    });

    // Update active nav link based on scroll position
    function updateActiveNavLink() {
        const sections = document.querySelectorAll('section');
        const navLinks = document.querySelectorAll('.nav-link');
        
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (window.scrollY >= (sectionTop - 200)) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    }

    // Mobile menu toggle
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navLinks.classList.toggle('active');
    });
    
    // Close mobile menu when clicking a link
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navLinks.classList.remove('active');
        });
    });

    // Typing animation for hero section
    function typeEffect(element, text, speed = 100, delay = 1000) {
        let i = 0;
        element.textContent = '';
        
        setTimeout(() => {
            const typing = setInterval(() => {
                if (i < text.length) {
                    element.textContent += text.charAt(i);
                    i++;
                } else {
                    clearInterval(typing);
                    setTimeout(() => {
                        element.textContent = '';
                        i = 0;
                        typeEffect(element, text, speed, 0);
                    }, 2000);
                }
            }, speed);
        }, delay);
    }
    
    const typingElement = document.querySelector('.typing');
    if (typingElement) {
        const textToType = typingElement.textContent;
        typeEffect(typingElement, textToType);
    }

    // Project filtering
    const filterBtns = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');
    
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active class from all buttons
            filterBtns.forEach(btn => btn.classList.remove('active'));
            
            // Add active class to clicked button
            btn.classList.add('active');
            
            const filter = btn.getAttribute('data-filter');
            
            projectCards.forEach(card => {
                if (filter === 'all') {
                    card.style.display = 'block';
                } else if (card.getAttribute('data-category') === filter) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });

    // Skill bars animation
    function initSkillBars() {
        const skillBars = document.querySelectorAll('.skill-progress-bar');
        
        skillBars.forEach(bar => {
            const progress = bar.getAttribute('data-progress');
            bar.style.width = progress + '%';
        });
    }

    // Contact form handling
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const message = document.getElementById('message').value;
            
            // Basic validation
            if (name.trim() === '' || email.trim() === '' || message.trim() === '') {
                alert('Please fill in all fields.');
                return;
            }
            
            // Here you would typically send the form data to a server
            // For now, we'll just show a success message
            alert('Thanks for your message! I will get back to you soon.');
            contactForm.reset();
        });
    }

    // Particles background effect
    createParticles();
    
    function createParticles() {
        const particles = document.querySelector('.particles');
        if (!particles) return;
        
        for (let i = 0; i < 50; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            
            // Random position
            const posX = Math.random() * 100;
            const posY = Math.random() * 100;
            
            // Random size
            const size = Math.random() * 5 + 1;
            
            // Random opacity
            const opacity = Math.random() * 0.5 + 0.1;
            
            // Random animation duration
            const duration = Math.random() * 20 + 10;
            
            // Random animation delay
            const delay = Math.random() * 5;
            
            // Apply styles
            particle.style.cssText = `
                position: absolute;
                top: ${posY}%;
                left: ${posX}%;
                width: ${size}px;
                height: ${size}px;
                background-color: rgba(255, 255, 255, ${opacity});
                border-radius: 50%;
                animation: float ${duration}s ${delay}s infinite linear;
                pointer-events: none;
            `;
            
            particles.appendChild(particle);
        }
        
        // Add float animation style
        if (!document.querySelector('#particle-animation')) {
            const style = document.createElement('style');
            style.id = 'particle-animation';
            style.textContent = `
                @keyframes float {
                    0% {
                        transform: translateY(0) translateX(0);
                    }
                    25% {
                        transform: translateY(-20px) translateX(10px);
                    }
                    50% {
                        transform: translateY(0) translateX(20px);
                    }
                    75% {
                        transform: translateY(20px) translateX(10px);
                    }
                    100% {
                        transform: translateY(0) translateX(0);
                    }
                }
            `;
            document.head.appendChild(style);
        }
    }

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80, // Account for fixed header
                    behavior: 'smooth'
                });
            }
        });
    });

    // Add scroll reveal animations
    const revealElements = document.querySelectorAll('.about-content, .timeline-item, .project-card, .skill-category');
    
    // Simple reveal on scroll
    window.addEventListener('scroll', () => {
        revealElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const elementVisible = 150;
            
            if (elementTop < window.innerHeight - elementVisible) {
                element.classList.add('revealed');
            }
        });
    });

    // Add reveal class to enable CSS transitions
    document.head.insertAdjacentHTML('beforeend', `
        <style>
            .about-content, .timeline-item, .project-card, .skill-category {
                opacity: 0;
                transform: translateY(30px);
                transition: opacity 0.8s ease, transform 0.8s ease;
            }
            
            .revealed {
                opacity: 1;
                transform: translateY(0);
            }
        </style>
    `);

    // Trigger initial scroll check
    window.dispatchEvent(new Event('scroll'));
});

// Add cursor trail effect
function createCursorTrail() {
    const trailCount = 10;
    const trails = [];
    
    for (let i = 0; i < trailCount; i++) {
        const trail = document.createElement('div');
        trail.className = 'cursor-trail';
        trail.style.opacity = 1 - (i / trailCount);
        document.body.appendChild(trail);
        trails.push({
            element: trail,
            x: 0,
            y: 0
        });
    }
    
    window.addEventListener('mousemove', (e) => {
        // Update the first trail to the current mouse position
        trails[0].x = e.clientX;
        trails[0].y = e.clientY;
        
        // Update all other trails to follow the previous one with delay
        for (let i = trails.length - 1; i > 0; i--) {
            const current = trails[i];
            const previous = trails[i - 1];
            
            // Create a following effect with easing
            current.x += (previous.x - current.x) * 0.3;
            current.y += (previous.y - current.y) * 0.3;
            
            current.element.style.left = current.x + 'px';
            current.element.style.top = current.y + 'px';
        }
        
        // Position the first trail directly at cursor
        trails[0].element.style.left = trails[0].x + 'px';
        trails[0].element.style.top = trails[0].y + 'px';
    });
}

// 3D tilt effect for project cards
function initTiltEffect() {
    const cards = document.querySelectorAll('.project-card');
    
    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            // Calculate rotation based on mouse position
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateY = ((x - centerX) / centerX) * 5; // Max 5 degrees
            const rotateX = ((centerY - y) / centerY) * 5; // Max 5 degrees
            
            card.style.setProperty('--rotation-y', `${rotateY}deg`);
            card.style.setProperty('--rotation-x', `${rotateX}deg`);
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.setProperty('--rotation-y', '0deg');
            card.style.setProperty('--rotation-x', '0deg');
        });
    });
}

// Enhanced skill bar animation with number counting
function enhancedSkillBars() {
    const skillBars = document.querySelectorAll('.skill-progress-bar');
    const skillInfos = document.querySelectorAll('.skill-info span:nth-child(2)');
    
    skillBars.forEach((bar, index) => {
        const progress = bar.getAttribute('data-progress');
        const targetNumber = parseInt(progress);
        
        bar.style.width = '0%';
        
        // Animate the bar width
        setTimeout(() => {
            bar.style.width = progress + '%';
            
            // Count up the percentage number
            let currentNumber = 0;
            const duration = 1500; // ms
            const interval = 16; // ms (roughly 60fps)
            const steps = duration / interval;
            const increment = targetNumber / steps;
            
            const counter = setInterval(() => {
                currentNumber += increment;
                
                if (currentNumber >= targetNumber) {
                    currentNumber = targetNumber;
                    clearInterval(counter);
                }
                
                skillInfos[index].textContent = Math.round(currentNumber) + '%';
            }, interval);
        }, 300 * index); // Stagger the animations
    });
}

// Text reveal animation for section headers
function initTextReveal() {
    const headers = document.querySelectorAll('.section-header h2');
    
    headers.forEach(header => {
        const text = header.textContent;
        header.setAttribute('data-text', text);
        header.classList.add('reveal-text');
    });
}

// Enhanced typing effect with multiple texts
function enhancedTypingEffect(element) {
    const texts = [
        'Software Developer at Arhamshare Pvt Ltd',
        'Mobile App Developer',
        'Flutter Developer',
        'Full Stack Developer'
    ];
    
    let textIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    const typingSpeed = 80; // Faster typing
    const deletingSpeed = 40; // Faster deleting
    const pauseDuration = 1500; // Longer pause
    
    // Clear initial content
    element.innerHTML = '';
    element.style.borderRight = '2px solid var(--accent-primary)';
    
    function type() {
        const currentText = texts[textIndex];
        
        if (isDeleting) {
            // Deleting text
            element.textContent = currentText.substring(0, charIndex - 1);
            charIndex--;
            
            if (charIndex === 0) {
                isDeleting = false;
                textIndex = (textIndex + 1) % texts.length;
                setTimeout(type, pauseDuration / 3); // Shorter pause before typing new text
            } else {
                setTimeout(type, deletingSpeed + Math.random() * 20); // Slight randomness
            }
        } else {
            // Typing text
            element.textContent = currentText.substring(0, charIndex + 1);
            charIndex++;
            
            if (charIndex === currentText.length) {
                isDeleting = true;
                setTimeout(type, pauseDuration); // Pause before deleting
            } else {
                setTimeout(type, typingSpeed + Math.random() * 30); // Slight randomness
            }
        }
    }
    
    // Start typing with a slight delay
    setTimeout(type, 500);
}

// Parallax effect for hero section
function initParallaxEffect() {
    const hero = document.querySelector('.hero');
    const heroContent = document.querySelector('.hero-content');
    
    window.addEventListener('scroll', () => {
        const scrollPosition = window.scrollY;
        if (scrollPosition < window.innerHeight) {
            heroContent.style.transform = `translateY(${scrollPosition * 0.3}px)`;
        }
    });
}

// Staggered animation for timeline items
function initTimelineAnimation() {
    const timelineItems = document.querySelectorAll('.timeline-item');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.classList.add('revealed');
                }, 200 * index); // Stagger the animations
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.2 });
    
    timelineItems.forEach(item => {
        observer.observe(item);
    });
}

// Initialize all enhancements
window.addEventListener('load', () => {
    // Replace existing typing animation with enhanced version
    const typingElement = document.querySelector('.typing');
    if (typingElement) {
        enhancedTypingEffect(typingElement);
    }
    
    // Initialize 3D tilt effect
    initTiltEffect();
    
    // Create cursor trail effect
    createCursorTrail();
    
    // Initialize enhanced skill bars
    enhancedSkillBars();
    
    // Initialize text reveal animations
    initTextReveal();
    
    // Initialize parallax effect
    initParallaxEffect();
    
    // Initialize staggered timeline animation
    initTimelineAnimation();
    
    // Enhanced particles with depth effect
    createEnhancedParticles();
});

// Create enhanced particles with depth effect
function createEnhancedParticles() {
    const particles = document.querySelector('.particles');
    if (!particles) return;
    
    particles.innerHTML = ''; // Clear any existing particles
    
    for (let i = 0; i < 70; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        
        // Create depth effect
        const depth = Math.random();
        const size = 2 + (depth * 6); // Size increases with depth
        
        // Position with parallax effect based on depth
        const posX = Math.random() * 100;
        const posY = Math.random() * 100;
        
        // Different opacity and blur based on depth
        const opacity = 0.1 + (depth * 0.5);
        const blur = (1 - depth) * 2;
        
        // Animation speed and delay based on depth
        const duration = 15 + (depth * 20);
        const delay = Math.random() * 5;
        
        // Apply styles
        particle.style.cssText = `
            position: absolute;
            top: ${posY}%;
            left: ${posX}%;
            width: ${size}px;
            height: ${size}px;
            background-color: rgba(255, 255, 255, ${opacity});
            filter: blur(${blur}px);
            border-radius: 50%;
            box-shadow: 0 0 ${size * 2}px rgba(77, 91, 206, ${opacity * 0.7});
            animation: float-${Math.floor(Math.random() * 5)} ${duration}s ${delay}s infinite linear;
            transform: translateZ(${depth * 100}px);
            z-index: ${Math.floor(depth * 10)};
            pointer-events: none;
        `;
        
        particles.appendChild(particle);
    }
    
    // Add multiple float animations
    const floatAnimations = `
        @keyframes float-0 {
            0% { transform: translateY(0) translateX(0); }
            25% { transform: translateY(-20px) translateX(10px); }
            50% { transform: translateY(0) translateX(20px); }
            75% { transform: translateY(20px) translateX(10px); }
            100% { transform: translateY(0) translateX(0); }
        }
        @keyframes float-1 {
            0% { transform: translateY(0) translateX(0); }
            25% { transform: translateY(20px) translateX(-10px); }
            50% { transform: translateY(0) translateX(-20px); }
            75% { transform: translateY(-20px) translateX(-10px); }
            100% { transform: translateY(0) translateX(0); }
        }
        @keyframes float-2 {
            0% { transform: translateY(0) translateX(0) rotate(0); }
            25% { transform: translateY(-15px) translateX(15px) rotate(5deg); }
            50% { transform: translateY(0) translateX(25px) rotate(0); }
            75% { transform: translateY(15px) translateX(15px) rotate(-5deg); }
            100% { transform: translateY(0) translateX(0) rotate(0); }
        }
        @keyframes float-3 {
            0% { transform: translateY(0) translateX(0) rotate(0); }
            25% { transform: translateY(15px) translateX(-15px) rotate(-5deg); }
            50% { transform: translateY(0) translateX(-25px) rotate(0); }
            75% { transform: translateY(-15px) translateX(-15px) rotate(5deg); }
            100% { transform: translateY(0) translateX(0) rotate(0); }
        }
        @keyframes float-4 {
            0% { transform: translateY(0) translateX(0) scale(1); }
            50% { transform: translateY(-10px) translateX(10px) scale(1.1); }
            100% { transform: translateY(0) translateX(0) scale(1); }
        }
    `;
    
    const styleEl = document.createElement('style');
    styleEl.textContent = floatAnimations;
    document.head.appendChild(styleEl);
}

// Add parallax effect to hero content
function enhanceHeroSection() {
    const hero = document.querySelector('.hero');
    const content = document.querySelector('.hero-content');
    const heading = document.querySelector('.hero h1');
    const subheading = document.querySelector('.hero h2');
    const description = document.querySelector('.hero p');
    const buttons = document.querySelector('.hero-cta');
    const socials = document.querySelector('.hero-socials');
    
    // Add staggered entrance animations
    gsap.from(heading, {
        y: 50, 
        opacity: 0, 
        duration: 1,
        delay: 0.5
    });
    
    gsap.from(subheading, {
        y: 30, 
        opacity: 0, 
        duration: 1,
        delay: 0.8
    });
    
    gsap.from(description, {
        y: 30, 
        opacity: 0, 
        duration: 1,
        delay: 1.1
    });
    
    gsap.from(buttons, {
        y: 30, 
        opacity: 0, 
        duration: 1,
        delay: 1.4
    });
    
    gsap.from(socials, {
        y: 30, 
        opacity: 0, 
        duration: 1,
        delay: 1.7
    });
    
    // Add subtle parallax effect on mouse movement
    hero.addEventListener('mousemove', (e) => {
        const mouseX = e.clientX / window.innerWidth;
        const mouseY = e.clientY / window.innerHeight;
        
        const moveX = (mouseX - 0.5) * 20;
        const moveY = (mouseY - 0.5) * 20;
        
        content.style.transform = `translate(${moveX}px, ${moveY}px)`;
    });
}

// Initialize all hero enhancements
window.addEventListener('load', () => {
    // ...existing code...
    
    // Replace with our enhanced particles for the hero
    createEnhancedParticles();
    
    // Add GSAP library for smoother animations if not already present
    if (!window.gsap) {
        const gsapScript = document.createElement('script');
        gsapScript.src = 'https://cdnjs.cloudflare.com/ajax/libs/gsap/3.11.4/gsap.min.js';
        gsapScript.onload = enhanceHeroSection;
        document.head.appendChild(gsapScript);
    } else {
        enhanceHeroSection();
    }
    
    // Replace existing typing animation with enhanced version
    const typingElement = document.querySelector('.typing');
    if (typingElement) {
        enhancedTypingEffect(typingElement);
    }
});

// Add terminal typing effect for hero section
function terminalTypingEffect() {
    const terminal = document.querySelector('.terminal-body');
    if (!terminal) return;
    
    const commands = [
        { command: 'whoami', output: 'Jay Chauhan - Software Developer' },
        { command: 'ls skills', output: 'Flutter, Firebase, Node.js, Java, Python, Cloud Computing' },
        { command: 'cat about.txt', output: 'Software Engineer and Mobile Application Developer with expertise in Flutter, Node.js, Firebase, and cloud services.' },
        { command: 'history', output: 'Former Google DSC Lead\'22, Microsoft Learn Student Ambassador, Microsoft Engage Intern 2022' }
    ];
    
    let commandIndex = 0;
    let charIndex = 0;
    let isTypingCommand = true;
    let currentLine;
    let outputElement;
    
    function initTerminal() {
        currentLine = createCommandLine();
        typeNextChar();
    }
    
    function createCommandLine() {
        const lineElement = document.createElement('div');
        lineElement.className = 'terminal-line';
        
        const promptElement = document.createElement('span');
        promptElement.className = 'terminal-prompt';
        promptElement.textContent = '>';
        
        const commandElement = document.createElement('span');
        commandElement.className = 'terminal-command';
        commandElement.textContent = '';
        
        const cursorElement = document.createElement('span');
        cursorElement.className = 'typing-cursor';
        
        lineElement.appendChild(promptElement);
        lineElement.appendChild(commandElement);
        commandElement.appendChild(cursorElement);
        
        terminal.appendChild(lineElement);
        
        return { line: lineElement, command: commandElement, cursor: cursorElement };
    }
    
    function typeNextChar() {
        if (isTypingCommand) {
            // Typing command
            const currentCommand = commands[commandIndex].command;
            if (charIndex < currentCommand.length) {
                currentLine.command.textContent += currentCommand.charAt(charIndex);
                charIndex++;
                setTimeout(typeNextChar, 100 + Math.random() * 50);
            } else {
                // Finished typing command
                currentLine.command.appendChild(currentLine.cursor);
                setTimeout(() => {
                    isTypingCommand = false;
                    outputElement = document.createElement('div');
                    outputElement.className = 'terminal-output';
                    terminal.appendChild(outputElement);
                    charIndex = 0;
                    typeNextChar();
                }, 500);
            }
        } else {
            // Typing output
            const currentOutput = commands[commandIndex].output;
            if (charIndex < currentOutput.length) {
                outputElement.textContent += currentOutput.charAt(charIndex);
                charIndex++;
                setTimeout(typeNextChar, 10 + Math.random() * 10);
            } else {
                // Finished typing output
                setTimeout(() => {
                    commandIndex = (commandIndex + 1) % commands.length;
                    charIndex = 0;
                    isTypingCommand = true;
                    if (commandIndex === 0) {
                        // Clear terminal after showing all commands once
                        setTimeout(() => {
                            terminal.innerHTML = '';
                            initTerminal();
                        }, 1000);
                    } else {
                        currentLine = createCommandLine();
                        typeNextChar();
                    }
                }, 1500);
            }
        }
    }
    
    setTimeout(initTerminal, 1000);
}

// Add 3D tilt effect to terminal
function initTerminal3DTilt() {
    const terminal = document.querySelector('.terminal');
    if (!terminal) return;
    
    const terminalContainer = document.querySelector('.hero-right');
    
    terminalContainer.addEventListener('mousemove', (e) => {
        const rect = terminalContainer.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateY = ((x - centerX) / centerX) * 10; // Max 10 degrees
        const rotateX = ((centerY - y) / centerY) * 5; // Max 5 degrees
        
        terminal.style.transform = `perspective(1000px) rotateY(${rotateY}deg) rotateX(${rotateX}deg)`;
    });
    
    terminalContainer.addEventListener('mouseleave', () => {
        terminal.style.transform = 'perspective(1000px) rotateY(-5deg) rotateX(5deg)';
    });
}

// Add floating code elements animation
function animateCodeElements() {
    const codeElements = document.querySelectorAll('.code-element');
    
    codeElements.forEach(element => {
        setInterval(() => {
            // Create subtle floating movement
            const translateY = (Math.random() - 0.5) * 20;
            const translateX = (Math.random() - 0.5) * 20;
            const rotate = (Math.random() - 0.5) * 5;
            
            // Apply animation with transition
            element.style.transition = 'transform 3s ease-in-out';
            element.style.transform = `translate(${translateX}px, ${translateY}px) rotate(${rotate}deg)`;
            
            // Reset after animation
            setTimeout(() => {
                element.style.transition = 'transform 3s ease-in-out';
                element.style.transform = 'translate(0, 0) rotate(0)';
            }, 3000);
        }, 6000);
    });
}

// Initialize hero section animations
window.addEventListener('load', () => {
    // ...existing code...
    
    // Initialize terminal typing effect
    terminalTypingEffect();
    
    // Initialize terminal 3D tilt effect
    initTerminal3DTilt();
    
    // Animate floating code elements
    animateCodeElements();
});

// Enhanced skill cards animation
function initSkillCardsAnimation() {
    const skillCards = document.querySelectorAll('.skill-card');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                // Add a staggered delay based on the card index
                setTimeout(() => {
                    entry.target.classList.add('revealed');
                    
                    // Animate the percentage counter
                    const percentSpan = entry.target.querySelector('.skill-percent span');
                    const targetPercent = parseInt(entry.target.getAttribute('data-skill'));
                    animateCounter(percentSpan, 0, targetPercent, 1500);
                }, 100 * index);
                
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });
    
    skillCards.forEach(card => {
        observer.observe(card);
    });
}

// Animate counter from start to end
function animateCounter(element, start, end, duration) {
    let startTimestamp = null;
    const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        const value = Math.floor(progress * (end - start) + start);
        element.textContent = value;
        
        if (progress < 1) {
            window.requestAnimationFrame(step);
        }
    };
    window.requestAnimationFrame(step);
}

// Add hover effect for skill cards
function initSkillCardHoverEffects() {
    const skillCards = document.querySelectorAll('.skill-card');
    
    skillCards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = ((centerY - y) / centerY) * 10; // Max 10 degrees
            const rotateY = ((x - centerX) / centerX) * 10; // Max 10 degrees
            
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(10px)`;
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = '';
        });
    });
}

// Initialize all animations when the page loads
window.addEventListener('load', () => {
    // ...existing code...
    
    // Initialize skill cards animation
    initSkillCardsAnimation();
    
    // Initialize skill card hover effects
    initSkillCardHoverEffects();
});

// Enhanced project card animations
function initProjectCardAnimations() {
    const projectCards = document.querySelectorAll('.project-card');
    const featuredProject = document.querySelector('.featured-project');
    
    // Add 3D hover effect to project cards
    projectCards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            // Calculate rotation based on mouse position
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateY = ((x - centerX) / centerX) * 8; // Max 8 degrees
            const rotateX = ((centerY - y) / centerY) * 5; // Max 5 degrees
            
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(10px) translateY(-10px)`;
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = '';
        });
    });
    
    // Animate project cards on scroll
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.classList.add('revealed');
                }, 100 * index); // Staggered animation
                
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });
    
    projectCards.forEach(card => {
        observer.observe(card);
    });
    
    // Animate featured project
    if (featuredProject) {
        const featuredObserver = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting) {
                featuredProject.style.opacity = '0';
                featuredProject.style.transform = 'translateY(50px)';
                
                setTimeout(() => {
                    featuredProject.style.transition = 'all 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
                    featuredProject.style.opacity = '1';
                    featuredProject.style.transform = 'translateY(0)';
                }, 300);
                
                featuredObserver.unobserve(featuredProject);
            }
        }, { threshold: 0.1 });
        
        featuredObserver.observe(featuredProject);
    }
    
    // Enhanced project filtering with smooth transitions
    const filterButtons = document.querySelectorAll('.filter-btn');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Update active button
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            
            const filter = button.getAttribute('data-filter');
            
            // Animate the filtering process
            projectCards.forEach(card => {
                const category = card.getAttribute('data-category');
                
                if (filter === 'all' || category === filter) {
                    // Show matching cards
                    card.style.opacity = '0';
                    card.style.transform = 'scale(0.8)';
                    card.style.display = 'flex';
                    
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'scale(1)';
                    }, 50);
                } else {
                    // Hide non-matching cards
                    card.style.opacity = '0';
                    card.style.transform = 'scale(0.8)';
                    
                    setTimeout(() => {
                        card.style.display = 'none';
                    }, 300);
                }
            });
        });
    });
}

// Initialize all enhancements when the page loads
window.addEventListener('load', () => {
    // ...existing code...
    
    // Initialize enhanced project card animations
    initProjectCardAnimations();
});

// Add animation for certification badges
function initBadgeAnimations() {
    const badgeCards = document.querySelectorAll('.badge-card');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, 100 * index); // Staggered animation
                
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });
    
    badgeCards.forEach((card, index) => {
        // Set initial state
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'all 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
        
        observer.observe(card);
    });
}

// Initialize all animations when the page loads
window.addEventListener('load', () => {
    // ...existing code...
    
    // Initialize badge animations
    initBadgeAnimations();
});

// Remove cursor-related function calls
window.addEventListener('load', () => {
    // ...existing code...
    
    // Remove these function calls
    // initEnhancedCursor();
    // createImprovedCursorTrail();
});

// Remove entire cursor-related functions
/*
function initEnhancedCursor() {
    // Function content removed
}

function createImprovedCursorTrail() {
    // Function content removed
}
*/

// Enhanced mobile terminal experience
function optimizeTerminalForMobile() {
    const terminal = document.querySelector('.terminal-body');
    if (!terminal) return;
    
    // Check if we're on a mobile device
    const isMobile = window.innerWidth <= 992;
    
    // Adjust terminal content for mobile
    if (isMobile) {
        // Modify terminal commands to be shorter and more concise
        const commands = [
            { command: 'whoami', output: 'Jay Chauhan' },
            { command: 'skills', output: 'Flutter, Firebase, Node.js' },
            { command: 'about', output: 'Mobile App Developer & Software Engineer' }
        ];
        
        let commandIndex = 0;
        let charIndex = 0;
        let isTypingCommand = true;
        let currentLine;
        let outputElement;
        
        function initMobileTerminal() {
            terminal.innerHTML = ''; // Clear previous content
            currentLine = createCommandLine();
            typeNextChar();
        }
        
        function createCommandLine() {
            const lineElement = document.createElement('div');
            lineElement.className = 'terminal-line';
            
            const promptElement = document.createElement('span');
            promptElement.className = 'terminal-prompt';
            promptElement.textContent = '>';
            
            const commandElement = document.createElement('span');
            commandElement.className = 'terminal-command';
            commandElement.textContent = '';
            
            const cursorElement = document.createElement('span');
            cursorElement.className = 'typing-cursor';
            
            lineElement.appendChild(promptElement);
            lineElement.appendChild(commandElement);
            commandElement.appendChild(cursorElement);
            
            terminal.appendChild(lineElement);
            
            return { line: lineElement, command: commandElement, cursor: cursorElement };
        }
        
        function typeNextChar() {
            if (isTypingCommand) {
                // Typing command
                const currentCommand = commands[commandIndex].command;
                if (charIndex < currentCommand.length) {
                    currentLine.command.textContent += currentCommand.charAt(charIndex);
                    charIndex++;
                    setTimeout(typeNextChar, 100);
                } else {
                    // Finished typing command
                    currentLine.command.appendChild(currentLine.cursor);
                    setTimeout(() => {
                        isTypingCommand = false;
                        outputElement = document.createElement('div');
                        outputElement.className = 'terminal-output';
                        terminal.appendChild(outputElement);
                        charIndex = 0;
                        typeNextChar();
                    }, 300);
                }
            } else {
                // Typing output
                const currentOutput = commands[commandIndex].output;
                if (charIndex < currentOutput.length) {
                    outputElement.textContent += currentOutput.charAt(charIndex);
                    charIndex++;
                    setTimeout(typeNextChar, 20);
                } else {
                    // Finished typing output
                    setTimeout(() => {
                        commandIndex = (commandIndex + 1) % commands.length;
                        charIndex = 0;
                        isTypingCommand = true;
                        if (commandIndex === 0) {
                            // Start over after showing all commands
                            setTimeout(initMobileTerminal, 1500);
                        } else {
                            currentLine = createCommandLine();
                            typeNextChar();
                        }
                    }, 1000);
                }
            }
        }
        
        // Start the terminal effect after a short delay
        setTimeout(initMobileTerminal, 800);
    }
}

// Make code elements responsive
function makeCodeElementsResponsive() {
    const codeElements = document.querySelectorAll('.code-element');
    if (codeElements.length === 0) return;
    
    // Check if we're on a mobile device
    const isMobile = window.innerWidth <= 992;
    
    if (isMobile) {
        // Reposition code elements for mobile display
        codeElements.forEach((element, index) => {
            element.style.position = 'relative';
            element.style.top = 'auto';
            element.style.left = 'auto';
            element.style.right = 'auto';
            element.style.bottom = 'auto';
            element.style.opacity = '1';
            element.style.transform = 'none';
            element.style.animation = 'none';
            element.style.marginBottom = '1rem';
        });
    }
}

// Execute responsive enhancements on load and resize
window.addEventListener('load', () => {
    // ... existing code ...
    
    // Optimize terminal for mobile
    optimizeTerminalForMobile();
    
    // Make code elements responsive
    makeCodeElementsResponsive();
});

window.addEventListener('resize', () => {
    // Re-run mobile optimizations on resize
    optimizeTerminalForMobile();
    makeCodeElementsResponsive();
});

// Improve hero section for touch devices
function enhanceTouchInteractions() {
    const terminal = document.querySelector('.terminal');
    if (!terminal) return;
    
    // Add touch feedback
    terminal.addEventListener('touchstart', () => {
        terminal.style.transform = 'scale(0.98)';
    });
    
    terminal.addEventListener('touchend', () => {
        terminal.style.transform = 'perspective(1000px) rotateY(-5deg) rotateX(5deg)';
    });
    
    // Make hero elements more interactive on touch
    const heroElements = document.querySelectorAll('.hero-title, .hero-subtitle, .hero-cta');
    heroElements.forEach(element => {
        element.addEventListener('touchstart', () => {
            element.style.transform = 'scale(0.98)';
        });
        
        element.addEventListener('touchend', () => {
            element.style.transform = 'none';
        });
    });
}

window.addEventListener('load', () => {
    // ... existing code ...
    
    // Enhance touch interactions
    enhanceTouchInteractions();
});

// SEO improvements
function enhanceImageSEO() {
    // Add alt text to any images that don't have it
    const images = document.querySelectorAll('img:not([alt])');
    images.forEach(img => {
        // Extract filename without extension and use as alt text
        const src = img.getAttribute('src');
        const filename = src.split('/').pop().split('.')[0];
        // Convert filename to readable text (replace hyphens and underscores with spaces, capitalize)
        const altText = filename
            .replace(/[-_]/g, ' ')
            .replace(/\b\w/g, l => l.toUpperCase());
        
        img.setAttribute('alt', `Jay Chauhan - ${altText}`);
    });
    
    // Add loading="lazy" for better performance
    const allImages = document.querySelectorAll('img:not([loading])');
    allImages.forEach(img => {
        img.setAttribute('loading', 'lazy');
    });
}

// Generate project structured data
function generateProjectStructuredData() {
    const projects = document.querySelectorAll('.project-card, .featured-project');
    const projectsData = [];
    
    projects.forEach(project => {
        const title = project.querySelector('h3').textContent;
        const description = project.querySelector('p').textContent;
        const imageEl = project.querySelector('img');
        const image = imageEl ? imageEl.getAttribute('src') : null;
        const linkEl = project.querySelector('a[href*="github"]');
        const link = linkEl ? linkEl.getAttribute('href') : null;
        
        projectsData.push({
            "@type": "SoftwareSourceCode",
            "name": title,
            "description": description,
            "image": image,
            "codeRepository": link,
            "programmingLanguage": {
                "@type": "ComputerLanguage",
                "name": "Flutter, Firebase, JavaScript"
            },
            "author": {
                "@type": "Person",
                "name": "Jay Chauhan",
                "url": "https://jaychauhan.me/"
            }
        });
    });
    
    // Create and append structured data script
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.textContent = JSON.stringify({
        "@context": "https://schema.org",
        "@type": "ItemList",
        "itemListElement": projectsData.map((project, index) => ({
            "@type": "ListItem",
            "position": index + 1,
            "item": project
        }))
    });
    
    document.head.appendChild(script);
}

// Run SEO enhancements when page loads
window.addEventListener('load', () => {
    // ... existing code ...
    
    // Run SEO enhancements
    enhanceImageSEO();
    generateProjectStructuredData();
});

// ...existing code...
