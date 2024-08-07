"use client";
import React, { useState, useEffect } from "react";
import { GeminiAPIService } from "@/Services/geminiAPI";
import "./chat.css";
import SendIcon from '@mui/icons-material/Send';
import PersonIcon from '@mui/icons-material/Person';
import AddPhotoAlternateOutlinedIcon from '@mui/icons-material/AddPhotoAlternateOutlined';
import getHistory from "@/Services/gethistory";
import setHistory from "@/Services/sethistory";
import { doc } from "firebase/firestore";

export default function Chat() {
    const [msgtext, setMsgtext] = useState('');
    const [messages, setMessages] = useState([]);
    const [showResult, setShowResult] = useState(false);
    const [loading, setLoading] = useState(false);
    const [user, setUser] = useState(null);
    const [history, setHistoryData] = useState(null);
    const [photourl, setPhotourl] = useState(null);
    useEffect(() => {
      const storedPhotoUrl = localStorage.getItem('photo');
      if (storedPhotoUrl) {
        setPhotourl(storedPhotoUrl);
      }
    }, []);
    useEffect(() => {
      document.body.style.backgroundColor = "white";
      document.body.style.overflow = "hidden";
      const today = new Date().toLocaleDateString();
      if (typeof window !== 'undefined') {
        const storedUser = JSON.parse(sessionStorage.getItem('user')) || null;
        setUser(storedUser);
        if (storedUser) {
          
          const fetchHistory = async () => {
            const historyData = await getHistory(storedUser);
            console.log("historyData", historyData[today]);
            setHistoryData(historyData);
            if (historyData && historyData[today]) {
              const mappedMessages = [];
              Object.keys(historyData[today]).forEach(key => {
                if (historyData[today][key].sent) {
                  mappedMessages.push({
                    content: historyData[today][key].sent,
                    type: 'sent',
                  });
                }
                if (historyData[today][key].received) {
                  mappedMessages.push({
                    content: historyData[today][key].received,
                    type: 'received',
                  });
                }
              });
              console.log("mappedMessages", mappedMessages);
              if (mappedMessages.length>0) {
                setShowResult(true);
              }
              setMessages(mappedMessages);
            }
          };
          fetchHistory();
        }
      }
      return () => {
        document.body.style.overflow = "";
      };
    }, []);
    useEffect(() => {
      console.log("Updated photourl", photourl);
    }, [photourl]);
    const handleClick = async () => {
      setLoading(true);
      setMsgtext(""); // Assuming msgtext is the state for the input text
      const today = new Date().toLocaleDateString();
      const currentMsgText = msgtext;
  
      // Immediately add the "sent" message to the messages state
      setMessages(prevMessages => [
          ...prevMessages,
          { content: currentMsgText, type: "sent" }
      ]);
  
      setTimeout(async () => {
          try {
              const responseMessage = await GeminiAPIService(currentMsgText, history);
  
              // Update history with both sent and received messages
              setHistoryData(prevHistory => {
                  const updatedHistory = { ...prevHistory };
                  if (!Array.isArray(updatedHistory[today])) {
                      updatedHistory[today] = [];
                  }
                  updatedHistory[today].push({ sent: currentMsgText, received: responseMessage });
                  return updatedHistory;
              });
  
              // Add the "received" message to the messages state
              setMessages(prevMessages => [
                  ...prevMessages,
                  { content: responseMessage, type: "received" }
              ]);
  
              // Correctly update the history using setHistory
              // Assuming setHistory is designed to accept the history for the current day, the date, and the user
              const updatedHistoryForToday = history[today] ? [...history[today], { sent: currentMsgText, received: responseMessage }] : [{ sent: currentMsgText, received: responseMessage }];
              setHistory(updatedHistoryForToday, today, user); // Correctly pass the updated history for today
          } catch (error) {
              console.error("Failed to send message:", error);
          } finally {
              setLoading(false);
          }
      }, 2000);
      console.log("messages", messages, history[today]);
  };

    const updateInputValue = (e) => {
        setMsgtext(e.target.value);
    };

    return (
        <div className="main">
            <div className="nav">
                <p>Tranquil Garden</p>
            </div>
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