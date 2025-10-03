require("dotenv").config();
const Groq = require("groq-sdk");
const mongoose=require("mongoose");
const User=require("../server/models/user.model")
const express = require("express");
const multer = require("multer");
const fs = require("fs");
const cors = require("cors");
const jwt=require("jsonwebtoken");
const app = express();
mongoose.connect("mongodb://localhost:27017/Attendence_App");
app.use(cors())
app.use(express.json())
const upload = multer({ dest: "uploads/" });
const secretCode="ABCDFGH"

const client = new Groq({ apiKey: process.env.GROQ_API_KEY });

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
      return res.send({ status: "error", error: "Invalid FileType" });
    }

    const fileBuffer = fs.readFileSync(filePath);
    const base64 = fileBuffer.toString("base64");

    const chatCompletion = await client.chat.completions.create({
      "model": "meta-llama/llama-4-maverick-17b-128e-instruct",
      "messages": [
        {
          "role": "user",
          "content": [
            {
              "type": "text",
              "text": "If the image represents a single school/college timetable (with subjects, classes, or lectures), generate a JSON object with days as keys and 8 length array as value where each index in that array represents the class in that period. If the image is a calendar, streak tracker, progress chart, attendance sheet, or anything else, return exactly {} (an empty JSON object). Do not interpret generic grids as a timetable. Return ONLY valid JSON."
            },
            {
              "type": "image_url",
              "image_url": {
                "url": `data:${fileMime};base64,${base64}`
              }
            }
          ]
        }
      ],
      "temperature": 1,
      "max_completion_tokens": 1024,
      "top_p": 1,
      "response_format": { type: "json_object" },
      "stream": true,
      "stop": null

    });
    let rawText = "";
    for await (const chunk of chatCompletion) {
      rawText += chunk.choices[0]?.delta?.content || '';
    }
    rawText = rawText.replace(/```json|```/g, "").trim();
    let jsonResponse;
    try {
      jsonResponse = JSON.parse(rawText);
    } catch {
      jsonResponse = {};
    }

    res.json({ response: jsonResponse });
    fs.unlinkSync(filePath);
  } catch (error) {
    res.send({ status: "error", error: "Network Issues" });
  }
});
app.post("/api/signup",async(req,res)=>{
  const username=req.body.username;
  const email=req.body.email;
  const password=req.body.password;

  const tempuser=await User.findOne({email:email});

  if(tempuser){
    res.send({status:"error",error:"Email In Use"});
    return;
  }

  try{
    const response=User.create({
      name:username,
      password:password,
      email:email
    });
    res.send({status:'ok'})
  }catch(e){
    res.send({status:"error",error:"Network Issues"})
  }
})
app.post("/api/signin",async(req,res)=>{
  const email=req.body.email;
  const password=req.body.password;

  try{
    const tempuser=await User.findOne({email:email,password:password});
    console.log(tempuser);
    const token=jwt.sign({
      name:tempuser.name,
      email:email,
      password:password
    },secretCode);
    console.log(token)
    res.send({status:'ok',token:token});
  }catch(e){
    res.send({status:'error',error:'Network Issues'});
  }
})
app.get("/", (req, res) => {
  res.send("BradPitt");
});

app.listen(8000, () => {
  console.log("PORT IS RUNNING AT http://localhost:8000");
});
