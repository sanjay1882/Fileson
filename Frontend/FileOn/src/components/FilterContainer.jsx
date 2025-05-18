import React, { useState } from 'react';
import '../styles/FilterContainer.css';

export const FilterContainer = ({ isToggled, setIsToggled, sortBy, setSortBy }) => {
  const [activeTray, setActiveTray] = useState(1); // Default tray 1 active

  const handleClick = (tray) => {
    setActiveTray(tray);
    setIsToggled(prev => !prev);  // Toggle for tray content visibility
  };

  return (
    <div className="Container">
      <div className="Header">
        <h1>My Cloud</h1>
        <h5>
          Sort by:
          <label>
            <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
              <option value="name">Name</option>
              <option value="size">Size</option>
              <option value="type">Type</option>
              <option value="date">Date</option> {/* Added Date Sort */}
            </select>
          </label>
        </h5>
      </div>

      <div className="Tray-holder">
        <div className="Sorting-Trays-container">
          <div
            className={`Sorting-Tray-1 ${activeTray === 1 ? 'active' : ''}`}
            onClick={() => handleClick(1)}
          >
            <i className="bx bxs-widget"></i> {/* Icon for Tray 1 */}
          </div>
          <div
            className={`Sorting-Tray-2 ${activeTray === 2 ? 'active' : ''}`}
            onClick={() => handleClick(2)}
          >
            <i className="bx bxs-server bx-rotate-180"></i> {/* Icon for Tray 2 */}
          </div>
        </div>
      </div>
    </div>
  );
};
