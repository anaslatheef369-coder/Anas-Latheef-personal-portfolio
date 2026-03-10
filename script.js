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
        color: { value: ["#1e90ff", "#00c8ff", "#ffffff"] },
        links: {
            color: "#1e90ff",
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

async function getLogisticsResponse(message) {
    // Add the new user message to history
    conversationHistory.push({
        role: "user",
        content: message
    });

    try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 30000); // 30 second timeout for free AI

        const systemInstruction = `You are an expert AI assistant in Logistics, Supply Chain, Warehousing, and Inventory Management. You are embedded in Anas Latheef's professional portfolio website.

Your job is to answer the user's EXACT question with precision. Always directly address what was asked.

Your core expertise includes:
- Container specs & freight: TEU/FEU dimensions, weight capacities, FCL/LCL, Incoterms
- Warehouse operations: slotting, pick paths, velocity analysis, cross-docking, WMS systems
- Inventory management: ABC/XYZ analysis, EOQ, safety stock, reorder points, shrinkage
- Supply chain: demand forecasting, S&OP, lead time optimization, vendor management
- ERP/WMS tools: Odoo, SAP, Oracle, Zoho, Microsoft D365, WMS integrations
- Data & analytics: KPIs, OTIF, fill rate, inventory turnover, carrying cost

CRITICAL RULES:
1. Answer EXACTLY what was asked. Do not give generic advice.
2. Be concise — maximum 3-4 sentences per answer.
3. Do NOT use markdown (no asterisks, no bullet points, no headers).
4. Do NOT mention "Anas Latheef" unless asked about the portfolio owner.
5. If you don't know something, say so honestly.

Example: If asked "20ft container capacity", answer with the actual specs (33 CBM, 28,000kg payload, 5.9m internal length).`;

        const messages = [
            { role: "system", content: systemInstruction },
            ...conversationHistory
        ];

        // Call Pollinations directly from the frontend (No API Key Required!)
        const response = await fetch('https://text.pollinations.ai/', {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                messages: messages,
                model: "openai"
            }),
            signal: controller.signal
        });

        clearTimeout(timeoutId);

        if (!response.ok) {
            console.error("Pollinations API Error:", response.status);
            conversationHistory.pop();
            return "The AI service is currently busy. Please try again in a moment.";
        }

        const replyText = await response.text();

        if (replyText) {
            // Add bot reply to history for context
            conversationHistory.push({
                role: "assistant",
                content: replyText
            });
            return replyText;
        } else {
            conversationHistory.pop();
            throw new Error("Invalid Response from AI");
        }

    } catch (error) {
        conversationHistory.pop(); // Don't save failed messages to history
        console.error("AI Fetch Error:", error);
        
        if (error.name === 'AbortError') {
            return "Request timed out. The AI is taking too long to think properly. Please try again.";
        }
        return "Unable to reach the AI server. Please check your connection and try again.";
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
