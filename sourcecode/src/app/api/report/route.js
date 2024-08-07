import { GoogleGenerativeAI } from "@google/generative-ai";
export async function  POST(request) {
    const data = await request.json()
    // const user = sessionStorage.getItem('user');
    console.log("user",data.chathistory)
    const convertedHistory = [];

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
    console.log("convertedHistory", JSON.stringify(convertedHistory, null, 2));
    var apiKey =  process.env.GEMINI_API
    const genAI =  new GoogleGenerativeAI(apiKey)
    const today = new Date()
    const date = today.toISOString().split('T')
    console.log("date",date)
    const model = genAI.getGenerativeModel({model:"gemini-1.5-flash",systemInstruction: `You are therapist, your job now is to analyse the user behaviour based on your past conversations and provide a pdf format report of good and bad days of the user mention user name and  ${date[0]} at the start. do not include dates/days in the analysis`})
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

