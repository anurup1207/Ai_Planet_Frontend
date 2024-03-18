import React from 'react';
import "./MessageBox.css";
import Avatar from '../Avatar/Avatar';


function MessageBox(props) {
  return (
    <div className='message-box'>
      <Avatar imgage={props.image}/>
      <span className="text-cont">{props.text}</span>
    </div>
  )
}

export default MessageBox
