// AI Engineering Tutor Backend Server
const express = require('express');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Serve static files
app.use(express.static('.'));

// Token counting function
function estimateTokens(messages) {
    let totalChars = 0;
    messages.forEach(msg => {
        totalChars += msg.content.length;
    });
    return Math.ceil(totalChars / 4);
}

// Chat endpoint
app.post('/api/chat', async (req, res) => {
    try {
        const { messages, model } = req.body;

        // Validate request
        if (!messages || !Array.isArray(messages)) {
            return res.status(400).json({
                error: { message: 'Messages array is required' }
            });
        }

        // Check if API key is configured
        if (!process.env.GROQ_API_KEY) {
            return res.status(500).json({
                error: { message: 'Server configuration error: API key not found' }
            });
        }

        // Prepare the request to Groq API
        const groqResponse = await fetch('https://api.groq.com/openai/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${process.env.GROQ_API_KEY}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                model: model || process.env.DEFAULT_MODEL || 'llama-3.3-70b-versatile',
                messages: messages,
                temperature: 0.7,
                max_tokens: 1000,
                top_p: 1,
                stream: false
            })
        });

        if (!groqResponse.ok) {
            const errorData = await groqResponse.json().catch(() => ({}));
            throw new Error(errorData.error?.message || `HTTP ${groqResponse.status}: ${groqResponse.statusText}`);
        }

        const data = await groqResponse.json();
        
        // Add token count to response
        const tokenCount = estimateTokens(messages);
        data.tokenCount = tokenCount;

        res.json(data);
    } catch (error) {
        console.error('Error in chat endpoint:', error);
        res.status(500).json({
            error: { message: error.message }
        });
    }
});

// Health check endpoint
app.get('/api/health', (req, res) => {
    res.json({
        status: 'healthy',
        apiConfigured: !!process.env.GROQ_API_KEY,
        timestamp: new Date().toISOString()
    });
});

// Serve the main page
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({
        error: { message: 'Something went wrong!' }
    });
});

// Start server
app.listen(PORT, () => {
    console.log(`🚀 AI Engineering Tutor server running on http://localhost:${PORT}`);
    console.log(`📝 API Key configured: ${!!process.env.GROQ_API_KEY ? '✅' : '❌'}`);
    console.log(`🤖 Default model: ${process.env.DEFAULT_MODEL || 'llama-3.3-70b-versatile'}`);
});

module.exports = app;