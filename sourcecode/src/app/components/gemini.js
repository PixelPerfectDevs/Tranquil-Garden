import { GoogleGenerativeAI } from "@google/generative-ai";

export default async function  Gemini() {
    
    var apiKey = process.env.GEMINI_API
    const genAI = new GoogleGenerativeAI(apiKey)
    const model = genAI.getGenerativeModel({model:"gemini-1.5-flash"})
    const prompt = "name 10 colors"
    const result = await model.generateContent([prompt])
    console.log("results",result.response.text())
   
  return (
<div>here </div>
  );
}