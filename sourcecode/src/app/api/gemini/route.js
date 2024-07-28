import { GoogleGenerativeAI } from "@google/generative-ai";
import { getFirestore, doc, getDoc } from "firebase/firestore";
export async function  POST(request ) {
    const data = await request.json()
    var apiKey =  process.env.GEMINI_API
    const genAI =  new GoogleGenerativeAI(apiKey)
    const model = genAI.getGenerativeModel({model:"gemini-1.5-flash"})
    const prompt =data.message
    const result = await model.generateContent([prompt])
    const db = getFirestore()
    const userEmail = sessionStorage.getItem('userEmail');
    const userRef = doc(db, "History","dheerajgoud28@gmail.com" );
    const userDoc = await getDoc(userRef);
    console.log("userDoc",userDoc);
    console.log("results",result.response.text())
    // props.onResult(result.response.text())
    return new Response(result.response.text(),{status:200})
}

