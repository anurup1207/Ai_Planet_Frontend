import './Navbar.css';

import React ,{useRef, useState} from 'react';
import axios from "axios"


import logo from '../assets/logo.svg';
import add from '../assets/add.svg';
import file from '../assets/file_image.svg'


function Navbar() {
  const fileInputRef = useRef(null);
  const uploadedFile = useRef(null);

 
  const [uploadedFileName,setUploadedFileName] = useState("")

  const handleUploadButtonClick = () => {
    fileInputRef.current.click();
  };
  const handleFileChange = async(event) => {
    const selectedFile = event.target.files[0];
    
    setUploadedFileName(selectedFile["name"]);
    uploadedFile.current.style.display = "flex";
    const formData = new FormData();
    formData.append('file', selectedFile);
    console.log(selectedFile)
    console.log(formData)


    const response = await axios.post('http://127.0.0.1:8000/upload', {"file":selectedFile}, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        });
    console.log('Upload successful:', response.data);
      
    console.log('Selected file:', formData);
  };

  return (
    
    <div className="navbar">
      <img src={logo} alt="logo" />
      <div className='right-nav'>
      <div className="uploaded-file" ref={uploadedFile}>
        <img src={file} alt="file"/>
        <div>{uploadedFileName}</div>
      </div>
      <button className="upload-button" onClick={handleUploadButtonClick}>
        <img src={add} alt="add" />
        <div>Upload PDF</div>
        <input type="file" className='hide-input' onChange={handleFileChange} accept='.pdf'  ref={fileInputRef}/>
      </button>
      </div>
      
    </div>
  )
}

export default Navbar
