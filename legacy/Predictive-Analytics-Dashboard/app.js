// Initialize Particles Background
tsParticles.load("tsparticles", {
    fpsLimit: 60,
    particles: {
        color: { value: ["#00f3ff", "#bd00ff"] },
        links: { color: "#00f3ff", distance: 150, enable: true, opacity: 0.1, width: 1 },
        move: { enable: true, speed: 0.5, direction: "none", outModes: { default: "bounce" } },
        number: { density: { enable: true, area: 800 }, value: 40 },
        opacity: { value: 0.3 },
        shape: { type: "circle" },
        size: { value: { min: 1, max: 2 } }
    },
    detectRetina: true
});

// Mock Database for 3-Week Forecasting
const inventoryData = {
    microchips: {
        name: "AX-7 Microchips",
        historical: [12000, 11500, 10800, 10000, 9100, 8500, 7800], // Last 7 days
        depletionRate: 850, // per day
        threshold: 2000 // Critical level
    },
    displays: {
        name: "OLED Displays",
        historical: [5000, 4950, 4800, 4750, 4600, 4550, 4400],
        depletionRate: 120,
        threshold: 500
    },
    batteries: {
        name: "Lithium Ion Cells",
        historical: [8000, 7500, 6900, 6100, 5200, 4100, 3000], // Fast depletion
        depletionRate: 1100,
        threshold: 1500
    }
};

// Generate Timeline Labels (1 Week Past + 3 Weeks Future)
function generateTimeline() {
    const labels = [];
    const today = new Date();

    // Past 7 Days
    for (let i = 7; i > 0; i--) {
        const d = new Date(today);
        d.setDate(d.getDate() - i);
        labels.push(d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }));
    }

    // Today
    labels.push('TODAY');

    // Next 21 Days (3 Weeks)
    for (let i = 1; i <= 21; i++) {
        const d = new Date(today);
        d.setDate(d.getDate() + i);
        labels.push(d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }));
    }

    return labels;
}

// Generate Forecast Data
function generateForecast(startValue, rate, days) {
    const forecast = [];
    let current = startValue;

    for (let i = 0; i < days; i++) {
        current = Math.max(0, current - rate + (Math.random() * (rate * 0.4) - (rate * 0.2))); // Add slight randomness
        forecast.push(Math.round(current));
    }
    return forecast;
}

// Chart Global Configuration
Chart.defaults.color = '#94a3b8';
Chart.defaults.font.family = "'Inter', sans-serif";

let forecastChart;

// Render Chart function
function renderChart(itemKey) {
    const item = inventoryData[itemKey];
    const labels = generateTimeline();

    const pastData = [...item.historical, item.historical[item.historical.length - 1]]; // Including today
    const currentStock = pastData[pastData.length - 1];

    const futureData = generateForecast(currentStock, item.depletionRate, 21);

    // Pad arrays for continuous line
    const paddedPast = [...pastData, ...Array(21).fill(null)];
    const paddedFuture = [...Array(7).fill(null), currentStock, ...futureData];
    const thresholdLine = Array(29).fill(item.threshold);

    const ctx = document.getElementById('forecastChart').getContext('2d');

    if (forecastChart) {
        forecastChart.destroy();
    }

    forecastChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [
                {
                    label: 'Historical Data',
                    data: paddedPast,
                    borderColor: '#00f3ff',
                    backgroundColor: 'rgba(0, 243, 255, 0.1)',
                    borderWidth: 3,
                    tension: 0.3,
                    fill: true,
                    pointRadius: 4,
                    pointBackgroundColor: '#00f3ff'
                },
                {
                    label: 'AI 3-Week Forecast',
                    data: paddedFuture,
                    borderColor: '#bd00ff',
                    borderDash: [5, 5],
                    borderWidth: 3,
                    tension: 0.3,
                    pointRadius: 0,
                    pointHoverRadius: 6
                },
                {
                    label: 'Critical Threshold',
                    data: thresholdLine,
                    borderColor: '#ff3366',
                    borderWidth: 1,
                    borderDash: [2, 2],
                    pointRadius: 0,
                    fill: false
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            interaction: {
                mode: 'index',
                intersect: false,
            },
            plugins: {
                legend: {
                    position: 'top',
                    labels: { boxWidth: 15, padding: 20, font: { size: 13, family: "'Orbitron', sans-serif" } }
                },
                tooltip: {
                    backgroundColor: 'rgba(5, 8, 16, 0.9)',
                    titleFont: { family: "'Orbitron', sans-serif", size: 14 },
                    bodyFont: { size: 14 },
                    padding: 15,
                    borderColor: 'rgba(0, 243, 255, 0.3)',
                    borderWidth: 1
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    grid: { color: 'rgba(255, 255, 255, 0.05)' },
                    title: { display: true, text: 'Stock Quantity', font: { size: 12, letterSpacing: 1 } }
                },
                x: {
                    grid: { color: 'rgba(255, 255, 255, 0.05)' }
                }
            }
        }
    });

    updateRiskAssessment(item, futureData);
}

// Update Risk Sidebar
function updateRiskAssessment(item, futureData) {
    const riskList = document.getElementById('risk-list');
    riskList.innerHTML = ''; // Clear current

    // Find if/when it hits threshold
    let daysUntilCritical = -1;
    let daysUntilZero = -1;

    for (let i = 0; i < futureData.length; i++) {
        if (futureData[i] <= item.threshold && daysUntilCritical === -1) daysUntilCritical = i + 1;
        if (futureData[i] <= 0 && daysUntilZero === -1) daysUntilZero = i + 1;
    }

    if (daysUntilZero !== -1) {
        addRiskItem(`${item.name} Depletion`, `Predicted to run out completely in ${daysUntilZero} days. Immediate reorder required.`, 'danger');
    } else if (daysUntilCritical !== -1) {
        addRiskItem(`${item.name} Warning`, `Stock will drop below critical threshold in ${daysUntilCritical} days.`, 'warning');
    } else {
        addRiskItem(`Stable Inventory`, `No shortages predicted for ${item.name} in the next 3 weeks.`, 'safe');
    }

    // Static global risk for realism
    addRiskItem(`Supplier Delay: Taiwan`, `Microchip shipments facing 48-hour delays at origin port. Model adjusted automatically.`, 'warning');
}

function addRiskItem(title, text, type) {
    const riskList = document.getElementById('risk-list');
    const div = document.createElement('div');
    div.className = `risk-item ${type === 'warning' ? 'warning' : ''}`;

    let icon = type === 'danger' ? 'bx-error-circle text-danger' : (type === 'warning' ? 'bx-error text-warning' : 'bx-check-circle text-main');

    div.innerHTML = `
        <h4>${title} <i class='bx ${icon}'></i></h4>
        <p>${text}</p>
    `;
    riskList.appendChild(div);
}

// Event Listeners
document.getElementById('item-selector').addEventListener('change', (e) => {
    renderChart(e.target.value);
});

document.getElementById('reorder-btn').addEventListener('click', function () {
    this.innerHTML = "<i class='bx bx-loader-alt bx-spin'></i> Processing Order...";
    this.style.background = "#050810";
    this.style.border = "1px solid #00f3ff";
    this.style.color = "#00f3ff";

    setTimeout(() => {
        this.innerHTML = "<i class='bx bx-check-double'></i> Purchase Order Sent";
        this.style.background = "linear-gradient(45deg, #10b981, #059669)";
        this.style.color = "#fff";
        this.style.border = "none";

        setTimeout(() => {
            this.innerHTML = "<i class='bx bx-cart-download'></i> Trigger Auto-Reorder";
            this.style.background = "linear-gradient(45deg, var(--accent-color), #7000ff)";
        }, 3000);
    }, 1500);
});

// Initial Render
window.onload = () => {
    renderChart('microchips');
};
