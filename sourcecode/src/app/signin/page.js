"use client"
// import Gemini from "../components/gemini";
import React from "react";
import {GeminiAPIService} from "@/Services/geminiAPI";
export default function SignIn() {
  const handleClick = () =>{
    GeminiAPIService("hello gemini")
  }
  return (
    <div>
      <button onClick={handleClick}>click here</button>
      {/* <Gemini/> */}
  </div>
  );
}