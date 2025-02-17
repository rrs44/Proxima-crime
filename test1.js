const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const { GoogleGenerativeAI } = require("@google/generative-ai");

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json()); 

const genAI = new GoogleGenerativeAI(process.env.API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

app.post("/crime-analysis", async (req, res) => {
    try {
        const { crimeDetails } = req.body; 
        if (!crimeDetails) return res.status(400).json({ error: "Crime details are required" });

        const prompt = `Analyze the following crime and provide relevant legal cases and IPC sections: ${crimeDetails}`;
        const result = await model.generateContent(prompt);
        const response = result.response.text();

        res.json({ response }); 

        // app.post("/crime-analysis", async (req, res) => {
        //     const { crimeDetails } = req.body;
        //     res.json({ message: "Crime analysis successful", data: crimeDetails });
        //   });
          
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
