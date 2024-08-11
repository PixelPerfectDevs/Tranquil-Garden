"use client";
import React, { useState, useEffect } from "react";
import { GeminiAPIService } from "@/Services/geminiAPI";
import "./chat.css";
import SendIcon from '@mui/icons-material/Send';
import PersonIcon from '@mui/icons-material/Person';
import AddPhotoAlternateOutlinedIcon from '@mui/icons-material/AddPhotoAlternateOutlined';
import getHistory from "@/Services/gethistory";
import setHistory from "@/Services/sethistory";
import { useRouter } from 'next/navigation';
import Nav from "../components/nav";
export default function Chat() {
    const [msgtext, setMsgtext] = useState('');
    const [messages, setMessages] = useState([]);
    const [showResult, setShowResult] = useState(false);
    const [loading, setLoading] = useState(false);
    const [user, setUser] = useState(null);
    const [history, setHistoryData] = useState(null);
    const [photourl, setPhotourl] = useState(null);
    const [email, setEmail] = useState("");
    const settings = ['Reports', 'History', 'Sign out'];
    const router = useRouter();
    const updateMessages = async(msgtext,responseMessage)=>{
      setMessages(prevMessages => [
        ...prevMessages,
        { content: msgtext, type: "sent" },
        { content: responseMessage, type: "received" }
    ]);
    const today =  new Date().toLocaleDateString();
    const newhistory = history
    if(newhistory[today] == undefined) {
      newhistory[today] = []
    }
    newhistory[today].push({
      "sent": msgtext,
      "received": responseMessage
    }
    )
    setHistoryData(newhistory)
    }

    useEffect(() => {

      document.body.style.backgroundColor = "white";
      document.body.style.overflow = "hidden";
      const storedPhotoUrl = localStorage.getItem('photo');
      const storedUser = JSON.parse(localStorage.getItem('user'));
      if (storedPhotoUrl) {
        setPhotourl(storedPhotoUrl);
      }
      if (storedUser) {
        setEmail(storedUser.email);
      }
      if (typeof window !== 'undefined') {
        
    
        const getAllHistory = async ()=>{
        const storedUser = await JSON.parse(sessionStorage.getItem("user")) ||null;
        setUser(storedUser);
        // console.log("user",user)
        if(storedUser){
        const userhistory  = await getHistory(storedUser)
        // console.log("history",userhistory)
        const today =  new Date().toLocaleDateString();
        // console.log("today",userhistory[today])
        if (userhistory){
          setHistoryData(userhistory)
          if(userhistory && userhistory[today]){
          const mappedMessages = [];
          Object.keys(userhistory[today]).forEach(key => {
                          if (userhistory[today][key].sent) {
                            mappedMessages.push({
                              content: userhistory[today][key].sent,
                              type: 'sent',
                            });
                          }
                          
                          if (userhistory[today][key].received) {
                            mappedMessages.push({
                              content: userhistory[today][key].received,
                              type: 'received',
                            });
                          }
                          // console.log("format",mappedMessages)
                          setMessages(mappedMessages);
                          setShowResult(true)
                        });
                      }
        }
      }
        }
      
        getAllHistory()
      
      }
    }, []);

    const handleClick = async()=>{
      setLoading(true);
      setShowResult(true)
      const today = new Date().toLocaleDateString();
      // console.log("message",msgtext)
      const tempmsg = msgtext
      setMsgtext("")
      const responseMessage = await GeminiAPIService(tempmsg, history);
      await updateMessages(tempmsg,responseMessage)
      // console.log("messages",messages)
      await setHistory(history[today],today,user)
      
      // console.log("new history",history)
      // if(history && history[today]){
        const mappedMessages = [];
        Object.keys(history[today]).forEach(key => {
                        if (history[today][key].sent) {
                          mappedMessages.push({
                            content: history[today][key].sent,
                            type: 'sent',
                          });
                        }
                        if (history[today][key].received) {
                          mappedMessages.push({
                            content: history[today][key].received,
                            type: 'received',
                          });
                        }
                        // console.log("format",mappedMessages)
                        setMessages(mappedMessages);
                        
                      });
  
    
      setLoading(false)
    }
    const updateInputValue = async(e)=>{
       setMsgtext(e.target.value)
    }
    return (
        <div className="main">
            <Nav settings={settings}/>
            <div className="main-container">
                {!showResult ? (
                    <div className="greet">
                        <p>Hello {user ? user.name : 'Guest'}!</p>
                        <p>How are you doin&apos; today?</p>
                    </div>
                ) : (
                    <div className="result">
                        {messages.map((message, index) => (
                            <div key={index} className={`message-container ${message.type}`}>
                                {message.type === 'sent' ? (
                                    <img src={photourl} alt="user" />
                                ) : (
                                    <PersonIcon />
                                )}
                                <p className="message-content">{message.content}</p>
                            </div>
                        ))}
                        {loading && (
                            <div className="loader">
                                <hr /><hr /><hr />
                            </div>
                        )}
                    </div>
                )}
                <div className="main-bottom">
                    <div className="search-box">
                        <input
                            onChange={updateInputValue}
                            value={msgtext}
                            type="text"
                            placeholder="Enter a prompt here"
                            onKeyPress={(e) => {
                                if (e.key === 'Enter') {
                                    handleClick();
                                }
                            }}
                        />
                        <div>
                            <AddPhotoAlternateOutlinedIcon />
                            {msgtext && (
                                <SendIcon onClick={handleClick} alt="send" />
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}