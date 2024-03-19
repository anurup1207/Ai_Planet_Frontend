import './ChatBox.css';
import React ,{ useState,useEffect} from 'react';
import send from "../assets/send.svg"
import chat_avatar from "../assets/chat_avatar.svg"
import MessageBox from '../MessageBox/MessageBox';
import axios from 'axios';



function ChatBox(props) {

  const [message,setMessage] = useState("");
  const [chatMessage,setChatMessage] = useState([]);
  const [onGoingChat,setOnGoingChat] = useState(false);
  

  useEffect(() => {
    document.querySelector('.message-display').scrollTop = document.querySelector('.message-display').scrollHeight
  }, [chatMessage])

  
  const handleChat=async()=>{
    if(message !== ""){
      let tempmessage=message;
      setMessage("");
      // On Going Chat == true
      setOnGoingChat(true);
      setChatMessage([...chatMessage,{text :tempmessage , isDisplay:true},{text:"",isDisplay:false}]);
      const response = await axios.post('http://127.0.0.1:8000/chat', {"question":tempmessage});
      const answer=response.data;
      console.log(answer[answer.length -1])
      setChatMessage([...chatMessage ,{text:answer[answer.length -2]["content"], isDisplay:true},{text:answer[answer.length -1]["content"],isDisplay:true}]);
      console.log(response.data)
      // On Goint Chat == false
      setOnGoingChat(false);
    
      }
  }

  const handleChatEnter=(e)=>{
    
    if (e.key === 'Enter') {
      e.preventDefault();
      handleChat()
      
    }
  }

  const handleChangeMessage =(e)=>{
    setMessage(e.target.value)
  }
  return (
    <>
    <div className="chat-box">
        <div className="message-display">
          {!props.isUploaded?chatMessage.map((element, index)=>{
           if(index%2 ===0){ 
              return <MessageBox key={index} text={element.text} isDisplay={element.isDisplay}/>
           }else{
              return <MessageBox  key={index} text={element.text} image={chat_avatar} isDisplay={element.isDisplay}/>
           }
          }):
          <div className='upload-text'>Upload PDF to Start</div>
          }
         </div>
        <form className="input">
            <input type="text" className='input-section' placeholder='Send a message...' onChange={handleChangeMessage} value={message} onKeyDown={handleChatEnter} readOnly={props.isUploaded || onGoingChat} />
            <button className="send-button" onClick={handleChat}   >
                <img src={send} alt="send" />
            </button>
        </form>
    </div>
     
      
    </>
  )
}

export default ChatBox
