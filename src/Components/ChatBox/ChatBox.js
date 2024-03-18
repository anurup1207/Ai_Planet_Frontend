import './ChatBox.css';
import React from 'react'
import send from "../assets/send.svg"

function ChatBox() {
  return (
    <>
    <div className="chat-box">
        <div className="message-display"></div>
        <div className="input">
            <input type="text" className='input-section' placeholder='Send a message...' />
            <div className="send-button">
                <img src={send} alt="send" />
            </div>
        </div>
    </div>
     
      
    </>
  )
}

export default ChatBox
