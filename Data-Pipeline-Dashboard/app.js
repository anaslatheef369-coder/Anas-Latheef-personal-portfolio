// Initialize Particles Background
tsParticles.load("tsparticles", {
    fpsLimit: 60,
    particles: {
        color: { value: ["#444444", "#333333"] },
        links: { enable: false },
        move: { enable: true, speed: 1.5, direction: "top", random: true, outModes: "out" },
        number: { density: { enable: true, area: 800 }, value: 80 },
        opacity: { value: 0.5 },
        shape: { type: "square" },
        size: { value: { min: 1, max: 3 } }
    },
    detectRetina: true
});

/* =========================================
   Data Pipeline Automation Simulation
========================================= */

const terminalBody = document.getElementById('terminal-body');
const reqCounter = document.getElementById('request-counter');
const errRate = document.getElementById('error-rate');
const flushBtn = document.getElementById('flush-btn');

// API Latency Elements
const apis = [
    { id: 'lat-apac', base: 25, variance: 15 },
    { id: 'lat-eu', base: 85, variance: 20 },
    { id: 'lat-na', base: 340, variance: 50, warning: true },
    { id: 'lat-payment', base: 12, variance: 5 }
];

let totalRequests = 2849103;

// Helper: Get Current Time string
function getTimeStamp() {
    const now = new Date();
    return now.toISOString().split('T')[1].slice(0, 11) + 'Z';
}

// Auto-Scroll Terminal
function scrollTerminal() {
    terminalBody.scrollTop = terminalBody.scrollHeight;
}

// Add Log Line
function addLog(type, message) {
    const div = document.createElement('div');
    div.className = `log-line ${type}`;

    let tag = '';
    switch (type) {
        case 'info': tag = '[INFO]'; break;
        case 'error': tag = '[ERR] '; break;
        case 'warn': tag = '[WARN]'; break;
        case 'success': tag = '[OK]  '; break;
    }

    div.innerHTML = `<i>${getTimeStamp()} ${tag}</i> ${message}`;
    terminalBody.appendChild(div);
    scrollTerminal();

    // Prevent DOM overload by keeping only last 50 logs
    if (terminalBody.childElementCount > 50) {
        terminalBody.removeChild(terminalBody.firstElementChild);
    }
}

// Simulated Error Messages
const errorMessages = [
    "Vendor Timeout: NA Freight Hub port 443 refused connection.",
    "Data Syntax Invalid: Expected JSON format, received XML from Legacy DB.",
    "API Rate Limit Exceeded: EU Customs API temporarily blocking requests.",
    "Authentication Failed: Invalid token provided to APAC Gateway.",
    "Database Deadlock: Unable to write inventory state to replica.",
    "Payload Too Large: Order payload exceeded 10MB limit.",
    "Certificate Expired: SSL handshake failed on port 8443."
];

const warnMessages = [
    "High Latency Detected: NA Hub response time > 300ms",
    "Dropped packets observed in VPN tunnel 4.",
    "Database replica sync delay: 4.2 seconds",
    "Memory usage spiking on Pipeline Worker #04"
];

const successMessages = [
    "Batch processed successfully (2304 records).",
    "API connection restored to EU Customs.",
    "Cache purged and warmed successfully.",
    "Health check passed for all microservices."
];

// Main Simulation Loop
function runSimulation() {
    // 1. Update Requests
    totalRequests += Math.floor(Math.random() * 15) + 5;
    reqCounter.innerText = totalRequests.toLocaleString();

    // 2. Fluctuate Latencies
    apis.forEach(api => {
        const el = document.getElementById(api.id);
        const newLat = api.base + Math.floor(Math.random() * api.variance) - (api.variance / 2);
        el.innerText = `${Math.floor(newLat)}ms`;
    });

    // 3. Fluctuate Error Rate slightly
    const randomErr = (1.2 + Math.random() * 0.4).toFixed(2);
    errRate.innerText = `${randomErr}%`;

    // 4. Randomly generate logs
    const rand = Math.random();

    if (rand > 0.92) {
        // Generate Error (8% chance)
        const msg = errorMessages[Math.floor(Math.random() * errorMessages.length)];
        addLog('error', msg);
    }
    else if (rand > 0.82) {
        // Generate Warning (10% chance)
        const msg = warnMessages[Math.floor(Math.random() * warnMessages.length)];
        addLog('warn', msg);
    }
    else if (rand > 0.70) {
        // Generate Success (12% chance)
        const msg = successMessages[Math.floor(Math.random() * successMessages.length)];
        addLog('success', msg);
    }
}

// Flush Logs Button
flushBtn.addEventListener('click', () => {
    terminalBody.innerHTML = '';
    addLog('info', 'System Administrator flushed terminal logs.');
});

// Start loops
setInterval(runSimulation, 800);

// Initial logs
setTimeout(() => addLog('success', 'Pipeline routing algorithms initialized.'), 500);
setTimeout(() => addLog('warn', 'Legacy Inventory DB is unreachable. Retrying...'), 1200);
setTimeout(() => addLog('error', 'ConnectionTimeout: Legacy Inventory DB down.'), 2400);
