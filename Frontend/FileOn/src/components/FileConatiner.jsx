import React, { useState, useRef, useEffect } from 'react';
import '../styles/FileContainer.css';
import typeIcons from '../assets/Icons';
import 'boxicons'
export const FileConatiner = ({
  file_name,
  files,
  size,
  type,
  isToggled,
  date_modified,
  isMenuOpen,
  openMenu,
  closeMenu,
}) => {
  const icon = typeIcons[type] || typeIcons["folder"];

  const [showMenu, setShowMenu] = useState(false);
  const [menuPos, setMenuPos] = useState({ x: 0, y: 0 });
  const menuRef = useRef();
  const containerRef = useRef();

  // Show menu on right click or dot icon click
  const handleContextMenu = (event, index) => {
    event.preventDefault();
  
    const menuWidth = 150; // match your context menu's width
    const menuHeight = 200; // estimate or measure if needed
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;
  
    let x = event.clientX;
    let y = event.clientY;
  
    if (x + menuWidth > viewportWidth) {
      x = viewportWidth - menuWidth - 10;
    }
  
    if (y + menuHeight > viewportHeight) {
      y = viewportHeight - menuHeight - 10;
    }
  
    setMenuPos({ x, y });
    setActiveContextIndex(index);
  };
  const handleDotClick = (e) => {
    e.stopPropagation(); // Prevent closing the menu when clicking on the dots icon
    const rect = e.target.getBoundingClientRect();
    setMenuPos({
      x: rect.left + 10,
      y: rect.bottom + 5,
    });
    setShowMenu(true);
  };

  // Handle click outside to close context menu
  const handleClickOutside = (e) => {
    if (
      menuRef.current &&
      !menuRef.current.contains(e.target) &&
      !containerRef.current.contains(e.target)
    ) {
      setShowMenu(false); // Close menu when clicking outside
    }
  };

  useEffect(() => {
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  const handleMenuAction = (action) => {
    alert(`${action} clicked for ${file_name}`);
    setShowMenu(false); // Close the menu after action
  };

  return (
    <div
      ref={containerRef}
      className={isToggled ? 'content' : 'Container-File'}
      onContextMenu={handleContextMenu} // Trigger context menu on right-click
    >
      <div
        className="FolderIcon"
        style={{ backgroundImage: `url(${icon})` }}
      >
        <i
          className="bx bx-dots-vertical-rounded"
          onClick={handleDotClick} // Trigger context menu on clicking dots
        ></i>
      </div>

      <div className="File-details">
        <h2>{file_name}</h2>
        <h6>{files ? `${files} Files` : new Date(date_modified).toLocaleString()}</h6>
      </div>

      <div className="Share-Details">
        <h6><span>Size: </span>{size}</h6>
      </div>

      {showMenu && (
        <ul
          ref={menuRef}
          className="context-menu"
          style={{ top: `${menuPos.y}px`, left: `${menuPos.x}px` }}
        >
          <li onClick={() => handleMenuAction('Open')}><box-icon name='folder-open'></box-icon><h5 id="open-li">Open</h5></li>
          <li onClick={() => handleMenuAction('Rename')}><box-icon name='rename' ></box-icon><h5 id="rename-li">Rename</h5></li>
          <li onClick={() => handleMenuAction('Download')}><box-icon type='solid' name='download'></box-icon><h5 id='download-li'>Download</h5></li>
          <li onClick={() => handleMenuAction('Delete')}><box-icon name='trash-alt' type='solid' ></box-icon><h5 id='delete-li'>Delete</h5></li>
        </ul>
      )}
    </div>
  );
};
