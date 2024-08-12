import { GoogleGenerativeAI } from "@google/generative-ai";
import getHistory from "@/Services/gethistory";
export async function  POST(request) {
    const data = await request.json()
    const interests = data.interests?.join(", ") || "";
    // const user = sessionStorage.getItem('user');
    console.log("user from api",data.name,interests)
    const convertedHistory = [];
    convertedHistory.push({role:"user",parts:[{text:"My name is "+data.name}]})
    convertedHistory.push({role:"model",parts:[{text:"Hello "+data.name+"! It's nice to meet you. What can I do for you today?"}]})
    convertedHistory.push({role:"user",parts:[{text:"I am interested in "+interests}]})
    convertedHistory.push({role:"model",parts:[{text:"That's great!"}]})
    console.log("convertedHistory",JSON.stringify(convertedHistory, null, 2))
    Object.values(data.chathistory).forEach(day => {
      day.forEach(message => {
        if (message.sent) {
          convertedHistory.push({
            role: "user",
            parts: [{ text: message.sent }]
          });
        }
        if (message.received) {
          convertedHistory.push({
            role: "model",
            parts: [{ text: message.received }]
          });
        }
      });
    });
    // console.log("convertedHistory", JSON.stringify(convertedHistory, null, 2));
    var apiKey =  process.env.GEMINI_API
    const genAI =  new GoogleGenerativeAI(apiKey)
    const model = genAI.getGenerativeModel({model:"gemini-1.5-flash",systemInstruction: "You are a friendly and polite therapist, talking to people."})
    const generationConfig = {
        temperature: 1,
        topP: 0.95,
        topK: 64,
        maxOutputTokens: 8192,
        responseMimeType: "text/plain",
      };
    const chatSession = model.startChat({
    generationConfig,
    history: convertedHistory,
    });
    
    const prompt =data.message
    const result = await chatSession.sendMessage([prompt])
    return new Response(result.response.text(),{status:200})
}

