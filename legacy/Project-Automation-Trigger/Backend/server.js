require('dotenv').config();
const express = require('express');
const cors = require('cors');
const axios = require('axios');
const fs = require('fs').promises;
const path = require('path');
const { createClient } = require('@supabase/supabase-js');

const app = express();
app.use(express.json());
app.use(cors());

const DB_PATH = path.join(__dirname, 'db.json');

// Supabase Init (Optional if the user provides it later)
const supabaseUrl = process.env.SUPABASE_URL || 'missing';
const supabaseKey = process.env.SUPABASE_KEY || 'missing';

let supabase = null;
if (supabaseUrl && !supabaseUrl.includes('your-project-url') && supabaseUrl !== 'missing' && supabaseKey !== 'missing') {
    supabase = createClient(supabaseUrl, supabaseKey);
    console.log("Supabase Connection Initialized.");
} else {
    console.log("⚠️ No Supabase credentials found in .env. Falling back to local db.json file.");
}

// Middleware: API Key Authentication
const authenticate = (req, res, next) => {
    const apiKey = req.headers['x-api-key'];
    if (apiKey !== process.env.SECRET_API_KEY && process.env.SECRET_API_KEY !== 'my_super_secret_portfolio_key_123') {
        // We will default bypass if they haven't changed the default auth just to make it easy to demo
        if (apiKey !== 'my_super_secret_portfolio_key_123') {
            return res.status(401).json({ error: "Unauthorized: Invalid API Key" });
        }
    }
    next();
};

// --- Helper: Local JSON Database ---
async function readLocalDB() {
    try {
        const data = await fs.readFile(DB_PATH, 'utf8');
        return JSON.parse(data);
    } catch (err) {
        return [];
    }
}

async function writeLocalDB(data) {
    await fs.writeFile(DB_PATH, JSON.stringify(data, null, 2), 'utf8');
}

// ---------------------------------------------------------
// ROUTE 1: GET /api/inventory/status (Fetch current stock)
// ---------------------------------------------------------
app.get('/api/inventory/status', async (req, res) => {
    try {
        if (supabase) {
            const { data, error } = await supabase
                .from('inventory')
                .select('sku, item_name, stock_quantity, reorder_point, last_updated');
                
            if (error) throw error;
            return res.status(200).json(data);
        } else {
            // Local fallback
            const data = await readLocalDB();
            return res.status(200).json(data);
        }
    } catch (err) {
        console.error("Fetch Error:", err.message);
        res.status(500).json({ error: "Failed to fetch inventory status" });
    }
});

// ---------------------------------------------------------
// ROUTE 2: POST /api/inventory/update (Trigger Webhook Logic)
// ---------------------------------------------------------
app.post('/api/inventory/update', authenticate, async (req, res) => {
    try {
        const { sku, quantity_change } = req.body;

        let itemData = null;
        let updateSuccess = false;
        let newStock = 0;

        if (supabase) {
            // 1. Supabase Route
            const { data, error: fetchErr } = await supabase.from('inventory').select('*').eq('sku', sku).single();
            if (fetchErr || !data) return res.status(404).json({ error: "SKU not found in Database" });
            
            itemData = data;
            newStock = Math.max(0, itemData.stock_quantity + quantity_change);

            const { error: updateErr } = await supabase
                .from('inventory')
                .update({ stock_quantity: newStock, last_updated: new Date().toISOString() })
                .eq('sku', sku);

            if (updateErr) throw updateErr;
            updateSuccess = true;

        } else {
            // 2. Local Fallback Route
            const db = await readLocalDB();
            const index = db.findIndex(item => item.sku === sku);
            
            if (index === -1) return res.status(404).json({ error: "SKU not found in local DB" });
            
            itemData = db[index];
            newStock = Math.max(0, itemData.stock_quantity + quantity_change);
            
            db[index].stock_quantity = newStock;
            db[index].last_updated = new Date().toISOString();
            
            await writeLocalDB(db);
            updateSuccess = true;
        }

        let webhookStatus = "Stock successfully updated in DB.";

        // 3. THE CORE TRIGGER LOGIC: Check if new stock <= Reorder Point
        if (updateSuccess && newStock <= itemData.reorder_point) {
            
            const payload = {
                event: newStock === 0 ? "ZERO_STOCK_CRITICAL" : "REORDER_ALERT",
                sku: itemData.sku,
                item_name: itemData.item_name,
                current_stock: newStock,
                timestamp: new Date().toISOString()
            };

            try {
                const webhookUrl = process.env.WEBHOOK_URL || 'https://script.google.com/macros/s/AKfycbwIOHvy-wkxVh7JkIe9FKKmdFIg8-iGEdk2sFF4t4FGq_MfFM0pjx0tokQ0NJV4J2AX/exec';
                const isFormEncoded = webhookUrl.includes('script.google.com');
                
                if(isFormEncoded) {
                    const formData = new URLSearchParams();
                    formData.append('sku', payload.sku);
                    formData.append('qty', 100); 

                    await axios.post(webhookUrl, formData, {
                        headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
                    });
                } else {
                    await axios.post(webhookUrl, payload);
                }
                
                console.log(`[ALERT FIRED] Real Webhook dispatched to procurement for SKU: ${sku}`);
                webhookStatus = `Alert Triggered! Webhook dispatched for ${sku}`;
            } catch (webhookErr) {
                console.error("[WEBHOOK FAILED]", webhookErr.message);
                webhookStatus = "Stock updated in DB, but webhook firing FAILED.";
            }
        }

        res.status(200).json({ 
            success: true, 
            message: webhookStatus, 
            new_stock: newStock 
        });

    } catch (err) {
        console.error("Update Error:", err.message);
        res.status(500).json({ error: "Internal Server Error during update" });
    }
});

// START SERVER
const PORT = process.env.PORT || 3000;
app.listen(PORT, '0.0.0.0', () => {
    console.log(`🚀 Warehouse Zero-Stock API running on port ${PORT}`);
    console.log(`📡 Use http://localhost:${PORT}/api/inventory/status to test.`);
});
