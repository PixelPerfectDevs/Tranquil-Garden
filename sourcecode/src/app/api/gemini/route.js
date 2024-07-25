import { GoogleGenerativeAI } from "@google/generative-ai";

export async function  POST(request ) {
    const data = await request.json()
    var apiKey =  process.env.GEMINI_API
    const genAI =  new GoogleGenerativeAI(apiKey)
    const model = genAI.getGenerativeModel({
        model:"gemini-1.5-flash", 
        systemInstruction: "You are a friendly and polite therapist, talking to people."
    })
    const generationConfig = {
        temperature: 2,
        topP: 0.95,
        topK: 64,
        maxOutputTokens: 8192,
        responseMimeType: "text/plain",
      };
    const prompt =data.message

    const chatSession = model.startChat({
        generationConfig,
     // safetySettings: Adjust safety settings
     // See https://ai.google.dev/gemini-api/docs/safety-settings
        history: [
            
        ],
      });
    
      const result = await chatSession.sendMessage(prompt);
    // const result = await model.generateContent([prompt,generationConfig])
    console.log("results",result.response.text())
    // props.onResult(result.response.text())
    return new Response(result.response.text(),{status:200})
}

