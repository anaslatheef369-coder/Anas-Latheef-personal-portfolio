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
const refreshChatBtn = document.getElementById('refresh-chat');
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

// Advanced Real-Time AI Logic via Google Gemini API
async function getLogisticsResponse(message) {
    const API_KEY = "AIzaSyD2zxY-gIyF9mMlsK3uWtssCE8Y4mPCLbg"; // User's Gemini API Key
    const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${API_KEY}`;

    // System instructions for the Gemini model enriched with deep supply chain data
    const systemInstruction = "You are a cutting-edge AI Logistics and Supply Chain Assistant for Anas Latheef's portfolio. You are an expert in warehousing, inventory management, global freight, shrinkage reduction, ETA tracking, cost algorithms, ERP integration (Odoo, Zoho), WMS/IMS systems, and supply chain predictability. Use your vast knowledge of international shipping routes, port lead times, cross-docking, reverse logistics, and capacity optimization to answer queries accurately. Keep your answers concise, highly professional, and slightly futuristic. Do not use markdown and keep answers under 3 sentences.";

    const fallbackResponses = [
        "Analyzing metrics: Inventory optimization is critical for reducing overhead. I recommend implementing a Just-In-Time (JIT) workflow.",
        "Based on current global freight data, predictive routing can reduce transit times by up to 14%. How can I assist with your supply chain?",
        "Mainframe analysis complete. Automating your warehouse management systems (WMS) will significantly decrease shrinkage and improve ETA accuracy.",
        "I am currently processing high volumes of supply chain node data. Data suggests integrating Odoo or Zoho ERPs for maximum efficiency.",
        "Query received. Effective logistics strategy requires balancing cost reduction with fleet management scaling. Anas Latheef specializes perfectly in this domain."
    ];

    try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 10000); // 10 second timeout for Gemini

        const response = await fetch(API_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                system_instruction: {
                    parts: [{ text: systemInstruction }]
                },
                contents: [{
                    parts: [{ text: message }]
                }]
            }),
            signal: controller.signal
        });

        clearTimeout(timeoutId);

        if (!response.ok) {
            console.error("Gemini API Error Status:", response.status);
            throw new Error("API Error");
        }

        const data = await response.json();

        // Extract the text from Gemini's response structure
        if (data.candidates && data.candidates.length > 0 && data.candidates[0].content && data.candidates[0].content.parts.length > 0) {
            return data.candidates[0].content.parts[0].text;
        } else {
            throw new Error("Invalid Gemini Response Structure");
        }

    } catch (error) {
        console.error("AI Fetch Error/Timeout:", error);
        return fallbackResponses[Math.floor(Math.random() * fallbackResponses.length)];
    }
}

// Handle Form Submission
chatForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const msg = messageInput.value.trim();

    if (msg) {
        // Show user message
        appendMessage(msg, 'user');
        messageInput.value = '';

        // Show typing indicator
        showTypingIndicator();

        // Fetch AI Response
        const aiResponse = await getLogisticsResponse(msg);

        hideTypingIndicator();
        appendMessage(aiResponse, 'bot');
    }
});

// Toggle Chatbot Window
function toggleChatbot() {
    document.body.classList.toggle('show-chatbot');

    // Initialize welcome message only once when opened for the first time
    if (document.body.classList.contains('show-chatbot') && !chatInitialized) {
        chatInitialized = true;
        setTimeout(() => {
            appendMessage("⚡ LOGISTICS_MAINFRAME_V2.0_ONLINE ⚡ Access granted. I am the Advanced AI Interface for Anas Latheef. How can I optimize your supply chain today?", 'bot');
        }, 600);
    }
}

chatbotToggler.addEventListener('click', toggleChatbot);
closeChatBtn.addEventListener('click', () => document.body.classList.remove('show-chatbot'));

refreshChatBtn.addEventListener('click', () => {
    chatBox.innerHTML = '';
    appendMessage("⚡ LOGISTICS_MAINFRAME_V2.0_ONLINE ⚡ Access granted. I am the Advanced AI Interface for Anas Latheef. How can I optimize your supply chain today?", 'bot');
});
