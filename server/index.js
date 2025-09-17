require("dotenv").config();

const express = require("express");
const multer = require("multer");
const fs = require("fs");
const cors = require("cors");
const { GoogleGenerativeAI } = require("@google/generative-ai");
const app = express();

app.use(cors())
app.use(express.json())
const upload = multer({ dest: "uploads/" });
const genAI = new GoogleGenerativeAI(process.env.API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });


const allowedMimeTypes = [
    "image/png",
    "image/jpeg",
    "image/webp",
    "application/pdf",
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
];

app.post("/api/getData", upload.single("file"), async (req, res) => {
    try {
        const filePath = req.file.path;
        const fileMime = req.file.mimetype;

        if (!allowedMimeTypes.includes(fileMime)) {
            fs.unlinkSync(filePath);
            res.send({ status: 'error', error: 'Invalid FileType' });
        }

        const fileBuffer = fs.readFileSync(filePath);
        const base64 = fileBuffer.toString("base64");

        const result = await model.generateContent([
            {
                inlineData: {
                    mimeType: fileMime,
                    data: base64
                },
            },

            { text: "If the Sent file only a time table generate a js object of it with days as keys and each hour represent by index from 0 to 7,else return an empty object even its a calender or a streak calender and Return ONLY a valid JSON object. Do not include explanations or text.." },

        ]);

        fs.unlinkSync(filePath);
        let rawText = result.response.text();

        rawText = rawText.replace(/```json|```/g, "").trim();

        let jsonResponse;
        try {
            jsonResponse = JSON.parse(rawText);
        } catch (err) {
            console.error("Failed to parse JSON:", rawText);
            jsonResponse = {};
        }

        res.json({ response: jsonResponse });
    } catch {
        res.send({ status: 'error', error: 'Network Issues' })
    }
});

app.get("/", (req, res) => {
    res.send("BradPitt");
});

app.listen(8000, () => {
    console.log("PORT IS RUNNING AT http://localhost:8000");
});
