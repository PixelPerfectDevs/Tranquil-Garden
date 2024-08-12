import { GoogleGenerativeAI } from "@google/generative-ai";
export async function  POST(request) {
  
    const data = await request.json()
    // const user = sessionStorage.getItem('user');
    // console.log("user",data.chathistory)
    const convertedHistory = [];
    const username = data.name
    const sentimentHistory = []
    // console.log("username ",username)
    for (const date in data.chathistory){
      let tempstring = ""
      data.chathistory[date].forEach(message =>{
        if(message.sent) {
          tempstring += message.sent + " "
        }
      })
      sentimentHistory.push({
        role:"user",
       parts: [{text : tempstring}]
      
      })
    }

    // console.log("convertedHistory", JSON.stringify(sentimentHistory, null, 2));
    var apiKey =  process.env.GEMINI_API
    const genAI =  new GoogleGenerativeAI(apiKey)
    const today = new Date()
    const date = today.toISOString().split('T')
    // console.log("date",date)
    const model = genAI.getGenerativeModel({model:"gemini-1.5-flash",systemInstruction: `You are therapist, your job now is to analyse the user behaviour based on your past conversations and provide a pdf format report of good and bad days, mention  ${date[0]} at the start. do not include dates/days in the analysis`})
    const generationConfig = {
        temperature: 1,
        topP: 0.95,
        topK: 64,
        maxOutputTokens: 8192,
        responseMimeType: "text/plain",
      };
    const temp = []
    const model2 = genAI.getGenerativeModel({model:"gemini-1.5-flash", systemInstruction:`for each conversation given, give me number of  positive days`})
    const result2 = await model2.generateContent({
      contents: sentimentHistory,
      generationConfig,
   // safetySettings: Adjust safety settings
   // See https://ai.google.dev/gemini-api/docs/safety-settings
    });
    // console.log("sentiments ",result2.response.text());
    const int2 = result2.response.text().replaceAll('*','').split(' ')
    for (const val in int2){
    //   console.log("here ", int2[val])
    //   console.log("val ", parseInt(int2[val],10))
      const parsedVal = parseInt(int2[val],10)
      if(!isNaN(parsedVal)){
        // console.log("int val ",parsedVal)
        temp.push(parsedVal)
        // localStorage.setItem('positive',parsedVal)
      }
    }
    // console.log("int val ",int2)
    const model3 = genAI.getGenerativeModel({model:"gemini-1.5-flash", systemInstruction:`for each conversation given, give me number of  negative days`})
    const result3 = await model3.generateContent({
      contents: sentimentHistory,
      generationConfig,
   // safetySettings: Adjust safety settings
   // See https://ai.google.dev/gemini-api/docs/safety-settings
    });
    // console.log("sentiments ",result3.response.text());
    const int3 = result3.response.text().replaceAll('*','').split(' ')
    for (const val in int3){
    //   console.log("here ", int3[val])
    //   console.log("val ", parseInt(int3[val],10))
      const parsedVal = parseInt(int3[val],10)
      if(!isNaN(parsedVal)){
        // console.log("int val ",parsedVal)
        temp.push(parsedVal)
        // localStorage.setItem('negative',parsedVal)
      }
    }
    return new Response(temp,{status:200})
}

