import { GoogleGenerativeAI } from "@google/generative-ai";
export async function  POST(request ) {
    const data = await request.json()
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
    history: [
        {
        role: "user",
        parts: [
            {text: "hey my name is dheeraj"},
        ],
        },
        {
        role: "model",
        parts: [
            {text: "Hey there!  It's nice to hear from you. What's on your mind today? 😊 \n"},
        ],
        },
    ],
    });
    
    const prompt =data.message
    const result = await chatSession.sendMessage([prompt])
    return new Response(result.response.text(),{status:200})
}

