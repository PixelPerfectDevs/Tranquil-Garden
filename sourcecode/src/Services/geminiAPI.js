import Gemini from "@/app/components/gemini"
export const GeminiAPIService = async(message,history,user)=>{
    console.log("here in api service",message, history,user.interest)

    const res = await fetch(`/api/gemini`,{
        method:"POST",
        headers: {
            "Content-Type" : "application/json",
        },
        body:JSON.stringify({
            message:message,
            chathistory:history,
            name:user.name,
            interests:user.interest
        })
    })
    if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
    }
    return await res.text()
}