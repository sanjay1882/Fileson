
import './App.css'
import React, { useState, useRef } from 'react';
import { Sidebar } from './components/Sidebar'
import { Header } from './components/Header'

import { FoldersPage } from './pages/FoldersPage'

import FileUpload from './components/FIleUpload'





function App() {
  
  const [isFileUploadVisible, setIsFileUploadVisible] = useState(false);


  const toggleFileUploadVisibility = () => {
    setIsFileUploadVisible(prevState => !prevState);
  };
  return (
 <div className='Body'>
<div className='SideBar'><Sidebar/></div>
<div className="Contents">
<div className="Navbar">
  <Header toggleFileUploadVisibility={toggleFileUploadVisibility}/>
</div>
<div className="Folders-Container">
{isFileUploadVisible ? <FileUpload /> : <FoldersPage />}
</div>

</div>
</div> 


  )
}

export default App;
