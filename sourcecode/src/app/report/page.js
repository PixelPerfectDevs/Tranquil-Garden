"use client";
import React, { useState } from "react";
import jsPDF from "jspdf";
import getHistory from "@/Services/gethistory";
import { getGeminiReportService } from "@/Services/geminiReport";
export default function GetReport() {
    const handleGetReport = async() =>{
        console.log("report here")
        window.alert("report")
        const doc = new jsPDF()
        
        const storedUser =  JSON.parse(localStorage.getItem("user"))
        console.log("user",storedUser)
        const history = await getHistory(storedUser)
        console.log("history",history)
        const response = await getGeminiReportService(history)
        console.log("Response",response)
        // need to pass prompt to chatgpt to generate the analysis
        doc.setFontSize(10)
        const pageHeight = doc.internal.pageSize.getHeight()
        const pageWidth = doc.internal.pageSize.getWidth()
        const maxWidth = pageWidth - 20
        const lines = doc.splitTextToSize(response,maxWidth)
        let y = 10
        const lineHeight = 10
        for(let i = 0 ; i < lines.length; i++){
          if(y + lineHeight > pageHeight - 10){
            doc.addPage()
            y=10
          }
          doc.text(lines[i],10,y)
          y+=lineHeight
        }
        // doc.text(response,10,10)
        doc.save("report.pdf")


        
    }
  return (
    <div>
      <button className="border p-2 rounded-md border-black" onClick={()=>handleGetReport()}>Get Report</button>
    </div>
  );
}
