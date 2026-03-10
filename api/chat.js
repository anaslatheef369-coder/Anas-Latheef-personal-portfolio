export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    try {
        const { conversationHistory } = req.body;

        if (!conversationHistory || !Array.isArray(conversationHistory)) {
            return res.status(400).json({ error: 'Missing conversation history' });
        }

        // Securely pull API key from Vercel Environment Variables
        const API_KEY = process.env.GEMINI_API_KEY;
        
        if (!API_KEY) {
            console.error("Missing GEMINI_API_KEY environment variable");
            return res.status(500).json({ error: "Server Configuration Error" });
        }

        const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${API_KEY}`;

        // The strict system prompt forcing professional, concise logistics answers
        const systemInstruction = `You are an expert AI assistant in Logistics, Supply Chain, Warehousing, and Inventory Management. You are embedded in Anas Latheef's professional portfolio website.

Your job is to answer the user's EXACT question with precision. Always directly address what was asked.

Your core expertise includes:
- Container specs & freight: TEU/FEU dimensions, weight capacities, FCL/LCL, Incoterms (FOB, CIF, DAP, DDP), port operations, customs, HS codes
- Warehouse operations: slotting, pick paths, velocity analysis, cross-docking, inbound/outbound flow, WMS systems
- Inventory management: ABC/XYZ analysis, EOQ, safety stock, reorder points, cycle counting, shrinkage
- Supply chain: demand forecasting, S&OP, lead time optimization, vendor management, reverse logistics
- ERP/WMS tools: Odoo, SAP, Oracle, Zoho, Microsoft D365, WMS integrations
- Data & analytics: KPIs, OTIF, fill rate, inventory turnover, carrying cost

CRITICAL RULES:
1. Answer EXACTLY what was asked. Do not give generic advice.
2. Be concise — maximum 3-4 sentences per answer.
3. Do NOT use markdown (no asterisks, no bullet points, no headers).
4. Do NOT mention "Anas Latheef" unless asked about the portfolio owner.
5. If you don't know something, say so honestly.

Example: If asked "20ft container capacity", answer with the actual specs (33 CBM, 28,000kg payload, 5.9m internal length).`;

        const response = await fetch(API_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                system_instruction: {
                    parts: [{ text: systemInstruction }]
                },
                contents: conversationHistory // Forward the full conversation Array
            })
        });

        if (!response.ok) {
            const errBody = await response.json().catch(() => ({}));
            console.error("Gemini API Error from Vercel:", response.status, errBody);
            
            if (response.status === 429) {
                return res.status(429).json({ error: "The AI is currently rate-limited. Please wait 30 seconds and try again." });
            }
            if (response.status === 403) {
                 return res.status(403).json({ error: "API Key Permission Error. The owner's API key may be invalid or exhausted." });
            }
            return res.status(502).json({ error: `API upstream error (${response.status})` });
        }

        const data = await response.json();

        if (data.candidates && data.candidates.length > 0 &&
            data.candidates[0].content && data.candidates[0].content.parts.length > 0) {
            const replyText = data.candidates[0].content.parts[0].text;
            return res.status(200).json({ reply: replyText });
        } else {
            console.error("Invalid response layout from Gemini", data);
            return res.status(502).json({ error: "Received malformed data from AI." });
        }

    } catch (error) {
        console.error("Vercel Serverless Function Error:", error);
        return res.status(500).json({ error: "Internal server proxy error." });
    }
}
