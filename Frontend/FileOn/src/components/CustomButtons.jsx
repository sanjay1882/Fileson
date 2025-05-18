import React, { useState } from "react";
import "../styles/CustomButton.css"; 

function CustomButton({ text, iconName }) {
  const [isActive, setIsActive] = useState(true);

  const handleClick = () => {
    setIsActive((prevState) => !prevState); 
  };

  return (
    <button 
      className={`custom-button ${isActive ? "active" : ""}`} 
      onClick={handleClick}
    >
      <i className={`bx ${iconName}`}></i> {text}
    </button>
  );
}

export default CustomButton;
