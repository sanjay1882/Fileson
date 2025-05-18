import React from 'react'
import '../styles/Sidebar.css'

import '../assets/Webdata.js'
import { Data, ButtonDetails } from '../assets/Webdata.js';

import CustomButton from './CustomButtons.jsx'
export const Sidebar = () => {
  return (
  <div className='SideBar-Container'>
    <div className='SideBar-Header'>
        <div className="Logo"><i class='bx bxs-objects-vertical-top'></i><h3 className='WebName'></h3></div>
    </div>
    <div className="Explore">
        <div className="My-Files"><CustomButton text={ButtonDetails.MyFiles.Text} iconName={ButtonDetails.MyFiles.Icon}z/></div>
        <div className="Shared"><CustomButton text={ButtonDetails.NewFolder.Text} iconName={ButtonDetails.NewFolder.Icon}/></div>
        <div className="All-Files"><CustomButton text={ButtonDetails.NewFile.Text} iconName={ButtonDetails.NewFile.Icon}/></div>
        <div className="Favorites"><CustomButton text={ButtonDetails.Favirates.Text} iconName={ButtonDetails.Favirates.Icon}/></div>
        <div className="Private-Files"><CustomButton text={ButtonDetails.Private.Text} iconName={ButtonDetails.Private.Icon}/></div>
        <div className="Deleted-Files"><CustomButton text={ButtonDetails.DeleteFiles.Text} iconName={ButtonDetails.DeleteFiles.Icon}/></div>
    </div>
    
    <div className="Bottom-COntainers">
    <div className="Help-support"><CustomButton text={ButtonDetails.Help.Text} iconName={ButtonDetails.Help.Icon}/></div>
    <div className="Logout"><CustomButton text={ButtonDetails.Logout.Text} iconName={ButtonDetails.Logout.Icon}/></div>
    </div>
    </div>
  )
}
