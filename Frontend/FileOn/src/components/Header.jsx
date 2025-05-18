import React from 'react'
import '../styles/Header.css'
import '../assets/index.js'
import userData from '../assets/index.js'
export const Header = ({toggleFileUploadVisibility}) => {
    return (
        <div className='Header-Container'>
            <header className='Top-Header'>

                <div className='Add-Container'>

                    <div className='Plus-Icon' onClick={toggleFileUploadVisibility}>
                      
                        <i class='bx bx-plus-circle'></i>

                    </div>
                    <h4 className='Add-File-Text'>Add File</h4>
                </div>
                <div className="Profile-Details">
                    <div className="FileUsages">
                    <i class='bx bxl-squarespace'></i>
                        <h5>10/50 Gb</h5>
                        <h5>File Usage</h5>
                    </div>

                    <div className='Settings-Icon'>
                    <i class='bx bxs-cog' ></i>

                    </div>
                    <div className='Notifications-Icon'>
                    <i class='bx bxs-bell'></i>
                        <div className="active"></div>
                    </div>
                    <div className="Profile"><img src={userData.profile_image.url} alt="" /></div>
                <div className="MenuBar"><i class='bx bx-menu'></i></div>
                </div>
                
            </header>
        </div>
    )
}
