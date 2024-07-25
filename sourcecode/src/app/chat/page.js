"use client";
import React, { useState } from "react";
import { GeminiAPIService } from "@/Services/geminiAPI";
import "./chat.css"; 
import SendIcon from '@mui/icons-material/Send';
import PersonIcon from '@mui/icons-material/Person';
import Person3Icon from '@mui/icons-material/Person3';
import AddPhotoAlternateOutlinedIcon from '@mui/icons-material/AddPhotoAlternateOutlined';
export default class Chat extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            msgtext: "",
            messages: [],
            response: "",
            showResult: false,
            loading: false
        };
        this.handleClick = this.handleClick.bind(this);
        this.updateInputValue = this.updateInputValue.bind(this);
    }
    
    async handleClick() {
        const currentMsgText = this.state.msgtext; 
        this.setState(prevState => ({
            messages: [
                ...prevState.messages,
                { content: prevState.msgtext, type: "sent" }
            ],
            showResult: true,
            loading: true,
            msgtext: "" 
        }));
        setTimeout(async () => {
            const responseMessage = await GeminiAPIService(currentMsgText); 
            this.setState(prevState => ({
            messages: [
                ...prevState.messages,
                { content: responseMessage, type: "received" }
            ],
            loading: false
            }));
        }, 2000);
    }
  
    updateInputValue(e) {
        this.setState({
            msgtext: e.target.value
        });
    }
  
    render() {
      const { showResult } = this.state;
      const { loading } = this.state;
      return (
        <div className="main">
            <div className="nav">
                <p>Tranquil Garden</p>
            </div>
            <div className="main-container">
            {!showResult ? (
            <>
                <div className="greet">
                <p>
                    <span>Hello Dheeraj Nani!</span>
                </p>
                <p> How are you doin&apos; today?</p>
                </div>{" "}
            </>
            ) : (
            <>
  <div className="result">
  <div className="result-titler">
    {this.state.messages.map((message, index) => (
      <div key={index} className={`message-container ${message.type}`}>
      {message.type === 'sent' ? (
        <Person3Icon />
      ) : (
        <PersonIcon />
      )}
      <p className="message-content">{message.content}</p>
    </div>
    ))}
  </div>
  <div className="result-data">
    {loading ? (
        <>
        <video autoPlay loop muted style={{ width: '50px', height: '50px' }}>
      <source src="/icon.mp4" type="video/mp4" />
      Your browser does not support the video tag.
    </video>
      <div className="loader">
        <hr />
        <hr />
        <hr />
      </div>
      </>
    ) : null}
  </div>
</div>

               
                </>
            )}
                <div className="main-bottom">
                    <div className="search-box">
                        <input
                        onChange={this.updateInputValue}
                        value={this.state.msgtext}
                        type="text"
                        placeholder="enter a prompt here"
                        />
                        <div>
                            <AddPhotoAlternateOutlinedIcon />
                            {this.state.msgtext?(
                            <SendIcon
                                onClick={this.handleClick}
                                alt="send"
                            />):null}
                        </div>
                    </div>
                </div>
            </div>
        </div>
      );
    }
}