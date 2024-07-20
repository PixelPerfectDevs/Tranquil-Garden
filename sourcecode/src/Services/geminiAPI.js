import Gemini from "@/app/components/gemini"
// export default async function GeminiAPIService(message) {
//     console.log("here in api service",message)
//     Gemini(message)
// }
export const GeminiAPIService = async(message)=>{
    console.log("here in api service",message)
    const res = await fetch(`/api/gemini`,{
        method:"POST",
        headers: {
            "Content-Type" : "application/json",
        },
        body:JSON.stringify({
            message:message
        })
    })
    if (!res.ok) {
  throw new Error(`HTTP error! status: ${res.status}`);
}
}

// export const addClass = async (gradelevel,classname,email,url,student,term) => {
//   let emails=[]
//   emails.push(email)
//   let projects=[]
//   let parsedstudents = JSON.parse(student)
//   let studentname = JSON.parse(localStorage.getItem("studentnames"))
// const res = await fetch(`/api/teacherapi/addclass`, {
//   method: "POST",
//   headers: {
//     "Content-Type": "application/json",
//   },
//   body: JSON.stringify({ 
//       gradelevel:gradelevel,
//       classname:classname,
//       teachers:emails,
//       students:parsedstudents,
//       studentname:studentname,
//       projects:projects,
//       url:url,
//       term: term
//    }),
// });
// if (!res.ok) {
//   throw new Error(`HTTP error! status: ${res.status}`);
// }
// };