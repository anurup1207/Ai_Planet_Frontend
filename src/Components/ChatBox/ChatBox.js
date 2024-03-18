import './ChatBox.css';
import React ,{ useState,useEffect} from 'react';
import send from "../assets/send.svg"
import chat_avatar from "../assets/chat_avatar.svg"
import MessageBox from '../MessageBox/MessageBox';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';


function ChatBox() {

  const [message,setMessage] = useState("");
  const [chatMessage,setChatMessage] = useState([]);

  useEffect(() => {
    document.querySelector('.message-display').scrollTop = document.querySelector('.message-display').scrollHeight
  }, [chatMessage])

  
  const handleChat=async()=>{
    if(message !== ""){
      let tempmessage=message;
      setMessage("");
      const response = await axios.post('http://127.0.0.1:8000/chat', {"question":tempmessage});
      const answer=response.data;
      setChatMessage(answer)
      console.log(response.data)
      setMessage("")
      }
  }

  const handleChangeMessage =(e)=>{
    setMessage(e.target.value)
  }
  return (
    <>
    <div className="chat-box">
        <div className="message-display">
          {chatMessage.map((element, index)=>{
           if(index%2 ===0){ 
              return <MessageBox key={uuidv4()} text={element["content"]}/>
           }else{
              return <MessageBox  key={uuidv4()} text={element["content"]} image={chat_avatar}/>
           }
          })}
         </div>
        <div className="input">
            <input type="text" className='input-section' placeholder='Send a message...' onChange={handleChangeMessage} value={message}/>
            <div className="send-button" onClick={handleChat}>
                <img src={send} alt="send" />
            </div>
        </div>
    </div>
     
      
    </>
  )
}

export default ChatBox
