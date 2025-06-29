require('dotenv').config();
const express = require('express');
const { GoogleGenerativeAI } = require('@google/generative-ai');

const app = express();
const port = process.env.PORT || 3000;

// Access your API key as an environment variable (recommended)
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

app.use(express.json());

// Serve static files from the parent directory (your portfolio website)
app.use(express.static('../'));

app.post('/chat-proxy', async (req, res) => {
    try {
        const prompt = req.body.prompt;
        if (!prompt) {
            return res.status(400).json({ error: 'Prompt is required' });
        }

        const model = genAI.getGenerativeModel({ model: "gemini-pro" });
        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text();

        res.json({ text });
    } catch (error) {
        console.error('Error calling Gemini API:', error);
        res.status(500).json({ error: 'Failed to get response from AI' });
    }
});

app.post('/summarize', async (req, res) => {
    try {
        const textToSummarize = req.body.text;
        if (!textToSummarize) {
            return res.status(400).json({ error: 'Text to summarize is required' });
        }

        const model = genAI.getGenerativeModel({ model: "gemini-pro" });
        const prompt = `Summarize the following text concisely, in one sentence: ${textToSummarize}`;
        const result = await model.generateContent(prompt);
        const response = await result.response;
        const summary = response.text();

        res.json({ summary });
    } catch (error) {
        console.error('Error calling Gemini API for summarization:', error);
        res.status(500).json({ error: 'Failed to get summary from AI' });
    }
});

app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
});
