export const getGeminiReportService = async(history)=>{
    console.log("here in api service",history)

    const res = await fetch(`/api/report`,{
        method:"POST",
        headers: {
            "Content-Type" : "application/json",
        },
        body:JSON.stringify({
            message:"based on the past conversations of the user generate a report analyzing the users good and bad days",
            chathistory:history
        })
    })
    if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
    }
    return await res.text()
}