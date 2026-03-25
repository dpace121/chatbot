import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import Groq from "groq-sdk";

dotenv.config();

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

const app = express();
app.use(cors());
app.use(express.json());

app.post('/ask', async (req, res) => {

    try {
        let { question } = req.body;

        const response = await groq.chat.completions.create({
            model: "llama-3.3-70b-versatile",
            messages: [
                { role: "system", content: "You are a helpful assistant." },
                { role: "user", content: question }
            ]
        });

        let finalData = response.choices[0].message.content;

        res.send({
            _status: true,
            _message: "Content found...",
            _data: finalData
        });

    } catch (error) {
        console.error(error);
        res.status(500).send({
            _status: false,
            _message: "Something went wrong",
            _error: error.message
        });
    }
});

app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
});