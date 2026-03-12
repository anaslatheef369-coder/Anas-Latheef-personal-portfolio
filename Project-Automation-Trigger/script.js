/**
 * Inventory Management System Showcase
 * Interactive Elements Script
 */

document.addEventListener('DOMContentLoaded', () => {

    // --- Smooth Scrolling for Anchor Links ---
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if(targetId === '#') return;
            const targetElement = document.querySelector(targetId);
            if(targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // --- Modal Management ---
    const alertModal = document.getElementById('alert-modal');
    
    function showModal() {
        if(alertModal) {
            alertModal.classList.add('show');
        }
    }
    
    window.closeModalAndReset = function() {
        if(alertModal) {
            alertModal.classList.remove('show');
        }
        resetSimulation();
        // Clear log
        if (livePayload) livePayload.textContent = '';
        systemStatus.textContent = "System Active";
        systemStatus.className = "status-indicator";
        simBtn.disabled = false;
        simBtn.textContent = 'Run Live Simulation';
        simBtn.style.opacity = '1';
    }

    // --- Live Demo Simulation Logic ---
    const simBtn = document.getElementById('run-sim-btn');
    const gaugeFill = document.getElementById('gauge-fill');
    const currentStockDisplay = document.getElementById('current-stock');
    const alertBox = document.getElementById('alert-box');
    const livePayload = document.getElementById('live-payload');
    const systemStatus = document.getElementById('system-status');
    
    let isRunning = false;
    let stockLevel = 105;
    const reorderPoint = 25;
    const maxStock = 120; // Used for % calculation 

    function resetSimulation() {
        stockLevel = 105;
        gaugeFill.style.width = `${(stockLevel / maxStock) * 100}%`;
        gaugeFill.className = 'gauge-fill';
        currentStockDisplay.textContent = stockLevel;
        currentStockDisplay.style.color = 'inherit';
        alertBox.style.display = 'none';
        
        systemStatus.textContent = 'System Active';
        systemStatus.className = 'status-indicator';
    }

    simBtn.addEventListener('click', async () => {
        if(isRunning) return;
        isRunning = true;
        resetSimulation();
        simBtn.disabled = true;
        simBtn.textContent = 'Contacting Warehouse Server...';
        simBtn.style.opacity = '0.7';
        
        // Show scanning effect
        let scanInterval = setInterval(() => {
            currentStockDisplay.textContent = Math.floor(Math.random() * 100);
            currentStockDisplay.style.opacity = '0.5';
        }, 100);

        try {
            // FIRE REAL API REQUEST TO OUR NODE.JS BACKEND
            const response = await fetch('http://localhost:3000/api/inventory/update', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'x-api-key': 'my_super_secret_portfolio_key_123'
                },
                body: JSON.stringify({
                    sku: 'WH-909-BX',
                    quantity_change: -10 // Simulating a purchase/dispatch of 10 items
                })
            });

            clearInterval(scanInterval);
            currentStockDisplay.style.opacity = '1';

            if (!response.ok) throw new Error("Backend API unavailable or error");
            
            const data = await response.json();
            
            // 1. UPDATE UI WITH REAL DATABASE NUMBERS
            stockLevel = data.new_stock;
            currentStockDisplay.textContent = stockLevel;
            
            const percentage = (stockLevel / maxStock) * 100;
            gaugeFill.style.width = `${percentage}%`;

            // 2. CHECK IF BACKEND FIRED THE WEBHOOK
            if (data.message.includes("Alert Triggered")) {
                gaugeFill.className = 'gauge-fill danger';
                currentStockDisplay.style.color = 'var(--alert-red)';
                systemStatus.textContent = 'Alert Fired';
                systemStatus.className = 'status-indicator alerting';
                alertBox.style.display = 'block';
                
                // Show payload info based on DB return
                const displayPayload = {
                    "event": stockLevel === 0 ? "ZERO_STOCK_CRITICAL" : "REORDER_ALERT",
                    "sku": "WH-909-BX",
                    "current_stock": stockLevel,
                    "status": "CRITICAL",
                    "backend_msg": data.message 
                };
                livePayload.textContent = JSON.stringify(displayPayload, null, 2);
    
                const successMsg = document.createElement('div');
                successMsg.style.color = 'var(--success-green)';
                successMsg.style.marginTop = '1rem';
                successMsg.style.fontFamily = 'var(--font-mono)';
                successMsg.style.fontSize = '0.85rem';
                successMsg.innerHTML = "✅ Real PostgreSQL Trigger Fired. App script webhook dispatched!";
                alertBox.appendChild(successMsg);
                
                setTimeout(() => showModal(), 1500);

            } else {
                // Stock updated, but not low enough to trigger webhook yet
                alertBox.style.display = 'block';
                livePayload.textContent = JSON.stringify({ "msg": data.message, "current_stock": stockLevel }, null, 2);
                
                setTimeout(() => {
                    isRunning = false;
                    simBtn.disabled = false;
                    simBtn.textContent = 'Run Live Simulation (Consume 10 units)';
                    simBtn.style.opacity = '1';
                }, 2000);
            }

        } catch (err) {
            clearInterval(scanInterval);
            currentStockDisplay.style.opacity = '1';
            currentStockDisplay.textContent = 'ERR';
            console.error("Fetch Error:", err);
            
            alertBox.style.display = 'block';
            let errorHtml = `<span style="color:var(--alert-red);">❌ Error: Could not connect to real backend API (http://localhost:3000).<br/><br/>
            Did you run <strong>npm install</strong> and <strong>node server.js</strong> in the Backend folder?</span>`;
            livePayload.innerHTML = errorHtml;
            
            setTimeout(() => {
                isRunning = false;
                simBtn.disabled = false;
                simBtn.textContent = 'Retry Integration';
                simBtn.style.opacity = '1';
            }, 3000);
        }
    });

    // --- On Load: Fetch Real Initial Status ---
    fetch('http://localhost:3000/api/inventory/status')
        .then(res => res.json())
        .then(data => {
            if(data && data.length > 0) {
                stockLevel = data[0].stock_quantity;
                currentStockDisplay.textContent = stockLevel;
                gaugeFill.style.width = `${(stockLevel / maxStock) * 100}%`;
                if(stockLevel <= data[0].reorder_point) {
                    gaugeFill.className = 'gauge-fill danger';
                    currentStockDisplay.style.color = 'var(--alert-red)';
                }
            }
        })
        .catch(e => console.log("Backend not running yet, using UI defaults: ", e));
});
