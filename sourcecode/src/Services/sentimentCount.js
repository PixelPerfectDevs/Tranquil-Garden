export const sentimentCountService = async(history)=>{
    // console.log("here in api service",history)

    const res = await fetch(`/api/sentiment`,{
        method:"POST",
        headers: {
            "Content-Type" : "application/json",
        },
        body:JSON.stringify({
            message:"based on the past conversations of the user give me number of negative and positive days",
            chathistory:history
        })
    })
    if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
    }
    // console.log("res   ---- ",res)
    return await res.text()
}