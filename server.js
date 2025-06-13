import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { GoogleGenerativeAI } from '@google/generative-ai';

dotenv.config();

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());
app.use(express.static('public')); // Serve frontend

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

app.post('/api/generate', async (req, res) => {
  try {
    const { prompt, history = [] } = req.body;

    const chat = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' }).startChat({
      history: history.map(part => ({
        role: part.role,
        parts: [{ text: part.content }]
      })),
      generationConfig: { temperature: 0.8 }
    });

    const result = await chat.sendMessage(prompt);
    const response = result.response.text();

    res.json({ story: response });
  } catch (err) {
    console.error("Gemini error:", err);
    res.status(500).json({ error: "Failed to generate story" });
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});