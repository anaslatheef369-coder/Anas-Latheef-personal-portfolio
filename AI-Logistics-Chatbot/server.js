const express = require('express');
const http = require('http');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.use(express.static('public'));

function getLogisticsResponse(message) {
    const lowerMessage = message.toLowerCase();

    if (lowerMessage.includes('inventory') || lowerMessage.includes('stock')) {
        return "I've checked the latest warehouse data. We currently have 94% stock availability across all global distribution centers. Would you like a detailed breakdown for a specific region?";
    }
    if (lowerMessage.includes('shipment') || lowerMessage.includes('eta') || lowerMessage.includes('track')) {
        return "Analyzing current transit routes... Shipment #4928X is slightly delayed due to port congestion, but the revised ETA is still within the acceptable delivery window (Expected: Tomorrow, 14:00 GMT).";
    }
    if (lowerMessage.includes('shrinkage') || lowerMessage.includes('loss')) {
        return "Since the implementation of the new automated tracking model, overall inventory shrinkage has dropped by exactly 31.4% this quarter compared to last year.";
    }
    if (lowerMessage.includes('cost') || lowerMessage.includes('expensive')) {
        return "Running cost-reduction algorithms... I recommend rerouting our European freight through the secondary hub. This will save approximately $12,400 per month without impacting delivery timelines.";
    }
    if (lowerMessage.includes('hello') || lowerMessage.includes('hi')) {
        return "Hello, Anas! I am your AI Logistics Assistant. How can I optimize your supply chain today?";
    }

    return "I'm sorry, I didn't quite catch that logistics query. Could you specify if you need information on 'inventory', 'shipments', 'costs', or 'shrinkage'?";
}

io.on('connection', (socket) => {
    console.log('A user connected to the logistics terminal');
    socket.emit('bot_message', "System Online. Secure connection established. I am ready to process global supply chain queries.");

    socket.on('user_message', (msg) => {
        setTimeout(() => {
            const response = getLogisticsResponse(msg);
            socket.emit('bot_message', response);
        }, 1200 + Math.random() * 1000);
    });

    socket.on('disconnect', () => {
        console.log('User disconnected from the terminal');
    });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`AI Logistics Server running on http://localhost:${PORT}`);
});
