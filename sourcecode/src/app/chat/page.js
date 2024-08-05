"use client";
import React, { useState, useEffect } from "react";
import { GeminiAPIService } from "@/Services/geminiAPI";
import "./chat.css"; 
import SendIcon from '@mui/icons-material/Send';
import PersonIcon from '@mui/icons-material/Person';
import AddPhotoAlternateOutlinedIcon from '@mui/icons-material/AddPhotoAlternateOutlined';
import getHistory from "@/Services/gethistory";
import setHistory from "@/Services/sethistory";
export default class Chat extends React.Component {
  componentDidMount() {
    document.body.style.backgroundColor = "white";
    let today = new Date().toLocaleDateString();
    if (typeof window !== 'undefined') {
      const storedUser = JSON.parse(sessionStorage.getItem('user')) || null;
      this.setState({ user: storedUser }, async () => {
        if (storedUser) {
          const history = await getHistory(storedUser);
          this.setState({ history }, () => {
            if (this.state.history && this.state.history[today]) {
              const mappedMessages = [];
              Object.keys(this.state.history[today]).forEach(key => {
                mappedMessages.push({
                  content: this.state.history[today][key].sent,
                  type: 'sent'
                });
                mappedMessages.push({
                  content: this.state.history[today][key].received,
                  type: 'received'
                });
              });
  
              this.setState({ messages: mappedMessages }, () => {
                if (this.state.messages.length > 0) {
                  this.setState({ showResult: true });
                }
              });
            // } else {
            //   const updatedHistory = { ...this.state.history, [today]: [] };
            //   this.setState({ history: updatedHistory }, () => {
            //     setHistory(updatedHistory[today], today, this.state.user);
            //   });
            }
          });
        }
      });
    }
  }
    constructor(props) {
        super(props);
        this.state = {
            msgtext: "",
            messages: [],
            response: "",
            showResult: false,
            loading: false,
            user: null,
            history: null
        };
        this.handleClick = this.handleClick.bind(this);
        this.updateInputValue = this.updateInputValue.bind(this);
    }

    async handleClick() {
      let today = new Date().toLocaleDateString();
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
          const responseMessage = await GeminiAPIService(currentMsgText, this.state.history);
  
          this.setState(prevState => {
              const updatedHistory = { ...prevState.history };
              if (!Array.isArray(updatedHistory[today])) {
                  updatedHistory[today] = [];
              }
  
              // Now, safely push the new message object to 'today's history
              updatedHistory[today].push({ sent: currentMsgText, received: responseMessage });
              console.log("updatedHistory", updatedHistory);
            console.log("updatedHistory after pop", updatedHistory);
              return {
                  messages: [
                      ...prevState.messages,
                      { content: responseMessage, type: "received" }
                  ],
                  history: updatedHistory,
                  loading: false,
              };
          }, () => {
              this.state.history[today].pop();
              setHistory(this.state.history[today], today, this.state.user);
          });
      }, 2000); 
  }
  
    updateInputValue(e) {
        this.setState({
            msgtext: e.target.value
        });
    }
    render() {
      const { showResult, loading, user, messages, history } = this.state;
      console.log("messages", messages,history);
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
                    <span>Hello {user ? user.name : 'Guest'}!</span>
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
                      <img src={user.photo} alt="user" />
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