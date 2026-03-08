// Toggle Navbar Icon
let menuIcon = document.querySelector('#menu-icon');
let navbar = document.querySelector('.navbar');

menuIcon.onclick = () => {
    menuIcon.classList.toggle('bx-x');
    navbar.classList.toggle('active');
};

// Scroll Sections Active Link & Sticky Header
let sections = document.querySelectorAll('section');
let navLinks = document.querySelectorAll('header nav a');

window.onscroll = () => {
    sections.forEach(sec => {
        let top = window.scrollY;
        let offset = sec.offsetTop - 150;
        let height = sec.offsetHeight;
        let id = sec.getAttribute('id');

        if (top >= offset && top < offset + height) {
            navLinks.forEach(links => {
                links.classList.remove('active');
                document.querySelector('header nav a[href*=' + id + ']').classList.add('active');
            });
        };
    });

    // Sticky Navbar
    let header = document.querySelector('header');
    header.classList.toggle('sticky', window.scrollY > 100);

    // Remove toggle icon and navbar when click navbar link
    menuIcon.classList.remove('bx-x');
    navbar.classList.remove('active');
};

// Scroll Reveal
ScrollReveal({
    distance: '80px',
    duration: 2000,
    delay: 200
});

ScrollReveal().reveal('.hero-content, .heading', { origin: 'top' });
ScrollReveal().reveal('.hero-img, .services-container, .portfolio-box, .contact form', { origin: 'bottom' });
ScrollReveal().reveal('.hero-content h1, .about-img', { origin: 'left' });
ScrollReveal().reveal('.hero-content p, .about-content', { origin: 'right' });
ScrollReveal().reveal('.skill-box', { origin: 'bottom', interval: 200 });

// Typed.js
const typed = new Typed('.multiple-text', {
    strings: ['Logistics Specialist', 'Inventory Leader', 'AI Enthusiast', 'Automation Expert'],
    typeSpeed: 50,
    backSpeed: 50,
    backDelay: 1000,
    loop: true
});

// Google Form Submission
const contactForm = document.getElementById('contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
        e.preventDefault();

        const formData = new FormData(contactForm);
        const actionUrl = contactForm.action;

        // Display a loading state on the button
        const submitBtn = contactForm.querySelector('input[type="submit"]');
        const originalBtnText = submitBtn.value;
        submitBtn.value = 'Sending...';

        fetch(actionUrl, {
            method: 'POST',
            mode: 'no-cors',
            body: formData
        }).then(() => {
            alert('Thank you! Your message has been sent successfully.');
            contactForm.reset();
            submitBtn.value = originalBtnText;
        }).catch((error) => {
            alert('Oops! Something went wrong. Please try again.');
            console.error('Form submission error:', error);
            submitBtn.value = originalBtnText;
        });
    });
}

// tsParticles Initialization for Futuristic Cyberpunk Background
tsParticles.load("tsparticles", {
    fpsLimit: 60,
    interactivity: {
        events: {
            onClick: { enable: true, mode: "push" },
            onHover: { enable: true, mode: "repulse" },
            resize: true
        },
        modes: {
            push: { quantity: 4 },
            repulse: { distance: 100, duration: 0.4 }
        }
    },
    particles: {
        color: { value: ["#00f3ff", "#bd00ff", "#ffffff"] },
        links: {
            color: "#00f3ff",
            distance: 150,
            enable: true,
            opacity: 0.2,
            width: 1
        },
        move: {
            direction: "none",
            enable: true,
            outModes: { default: "bounce" },
            random: false,
            speed: 1,
            straight: false
        },
        number: {
            density: { enable: true, area: 800 },
            value: 80
        },
        opacity: { value: 0.5 },
        shape: { type: "circle" },
        size: { value: { min: 1, max: 3 } }
    },
    detectRetina: true
});

/* =========================================
   Popup AI Chatbot Logic
========================================= */

const chatbotToggler = document.getElementById('chatbot-toggler');
const closeChatBtn = document.getElementById('close-chat');
const chatPopup = document.getElementById('chat-popup');
const chatBox = document.getElementById('chat-box');
const chatForm = document.getElementById('chat-form');
const messageInput = document.getElementById('message-input');
let chatInitialized = false;

// Auto-scroll to bottom of chat
function scrollChatToBottom() {
    chatBox.scrollTop = chatBox.scrollHeight;
}

// Add message to chat box
function appendMessage(msg, sender) {
    const msgDiv = document.createElement('div');
    msgDiv.classList.add('message');
    msgDiv.classList.add(sender === 'bot' ? 'bot-msg' : 'user-msg');
    msgDiv.textContent = msg;
    chatBox.appendChild(msgDiv);
    scrollChatToBottom();
}

// Typing indicator functionality
let typingDiv = null;
function showTypingIndicator() {
    if (!typingDiv) {
        typingDiv = document.createElement('div');
        typingDiv.classList.add('typing-indicator');
        typingDiv.textContent = "AI IS ANALYZING...";
        chatBox.appendChild(typingDiv);
        scrollChatToBottom();
    }
}
function hideTypingIndicator() {
    if (typingDiv) {
        typingDiv.remove();
        typingDiv = null;
    }
}

// Enhanced Simulated AI Logic for Chatbot
function getLogisticsResponse(message) {
    const lowerMsg = message.toLowerCase();

    // 1. Inventory / Stock
    if (lowerMsg.includes('inventory') || lowerMsg.includes('stock')) {
        return "I've analyzed the real-time inventory metrics. We are maintaining 94% availability across all global distribution centers utilizing our Just-In-Time (JIT) stock algorithms.";
    }
    // 2. Shipment / ETA / Tracking
    if (lowerMsg.includes('shipment') || lowerMsg.includes('eta') || lowerMsg.includes('track')) {
        return "Analyzing transit routes... Shipment #4928X is slightly delayed due to port congestion, but the revised ETA is still within the acceptable delivery window (Expected: Tomorrow, 14:00 GMT).";
    }
    // 3. Shrinkage / Loss
    if (lowerMsg.includes('shrinkage') || lowerMsg.includes('loss')) {
        return "Since the implementation of the new automated tracking model, overall inventory shrinkage has dropped by exactly 31.4% this quarter compared to last year.";
    }
    // 4. Cost / Expensive
    if (lowerMsg.includes('cost') || lowerMsg.includes('expensive') || lowerMsg.includes('save')) {
        return "Running cost-reduction algorithms... I recommend rerouting our European freight through the secondary hub. This will save approximately $12,400 per month without impacting delivery timelines.";
    }
    // 5. Warehouse (Newly requested)
    if (lowerMsg.includes('warehouse') || lowerMsg.includes('facility') || lowerMsg.includes('storage')) {
        return "Our primary automated warehouse facility is currently operating at 82% capacity. The newly deployed robotic sorting floor has increased picker efficiency by 40% this week.";
    }
    // 6. Logistics (Newly requested)
    if (lowerMsg.includes('logistic') || lowerMsg.includes('supply chain') || lowerMsg.includes('freight')) {
        return "Logistics Operations Report: Global freight routing is currently stable. We are leveraging external carrier APIs to optimize last-mile delivery routes, reducing fuel consumption by 15%.";
    }
    // Greetings
    if (lowerMsg.includes('hello') || lowerMsg.includes('hi') || lowerMsg.includes('hey')) {
        return "Hello, Anas! I am your AI Logistics Assistant. How can I optimize your supply chain today? (Try asking about inventory, warehouses, or logistics).";
    }

    // Default Fallback
    return "I'm sorry, my supply chain model didn't catch that. Could you specify if you need data on 'warehouse metrics', 'inventory', 'logistics routing', or 'costs'?";
}

// Handle Form Submission
chatForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const msg = messageInput.value.trim();

    if (msg) {
        // Show user message
        appendMessage(msg, 'user');
        messageInput.value = '';

        // Show typing indicator
        showTypingIndicator();

        // Simulate AI processing delay
        setTimeout(() => {
            hideTypingIndicator();
            const aiResponse = getLogisticsResponse(msg);
            appendMessage(aiResponse, 'bot');
        }, 1000 + Math.random() * 1200);
    }
});

// Toggle Chatbot Window
function toggleChatbot() {
    document.body.classList.toggle('show-chatbot');

    // Initialize welcome message only once when opened for the first time
    if (document.body.classList.contains('show-chatbot') && !chatInitialized) {
        chatInitialized = true;
        setTimeout(() => {
            appendMessage("System Online. Secure connection established. I am ready to process global supply chain queries.", 'bot');
        }, 600);
    }
}

chatbotToggler.addEventListener('click', toggleChatbot);
closeChatBtn.addEventListener('click', () => document.body.classList.remove('show-chatbot'));
