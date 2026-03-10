export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    try {
        const { conversationHistory } = req.body;

        if (!conversationHistory || !Array.isArray(conversationHistory)) {
            return res.status(400).json({ error: 'Missing conversation history' });
        }

        // We use Pollinations AI, completely free and requires no API Key
        const API_URL = `https://text.pollinations.ai/`;

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

        // Map the Gemini conversation history format to standard OpenAI messages format for Pollinations
        const messages = [
            { role: "system", content: systemInstruction }
        ];

        for (const msg of conversationHistory) {
            // Gemini roles are 'user' and 'model'. Convert 'model' to 'assistant'
            const role = msg.role === 'model' ? 'assistant' : 'user';
            const content = msg.parts.map(p => p.text).join(' ');
            messages.push({ role, content });
        }

        const response = await fetch(API_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                messages: messages,
                model: "openai" // Specifically request the fast openai-compatible format from Pollinations
            })
        });

        if (!response.ok) {
            console.error("Pollinations API Error:", response.status);
            return res.status(502).json({ error: `API upstream error (${response.status})` });
        }

        const replyText = await response.text();

        if (replyText) {
            return res.status(200).json({ reply: replyText });
        } else {
            console.error("Empty response from AI");
            return res.status(502).json({ error: "Received empty data from AI." });
        }

    } catch (error) {
        console.error("Vercel Serverless Function Error:", error);
        return res.status(500).json({ error: "Internal server proxy error." });
    }
}
