import { FilterContainer } from '../components/FilterContainer';
import { FileConatiner } from '../components/FileConatiner';
import '../styles/FolderPage.css';
import React, { useState } from 'react';

export const FoldersPage = () => {
  const files = [
    { file_name: "project_proposal.docx", size: "45KB", date_modified: "2024-12-01T09:30:00" },
    { file_name: "wireframe.docx", size: "234KB", date_modified: "2024-12-05T14:20:00" },
    { file_name: "assets_folder", files: 12, size: "4.3MB", date_modified: "2025-01-10T11:00:00" },
    { file_name: "database_schema", files: 92, size: "890KB", date_modified: "2025-01-15T16:30:00" },
    { file_name: "event_photos.zip", size: "7.6MB", date_modified: "2024-11-20T18:00:00" },
    { file_name: "dashboard", files: 4, size: "765KB", date_modified: "2025-02-01T08:45:00" },
    { file_name: "company_intro.mp4", size: "12.7MB", date_modified: "2024-10-22T10:00:00" },
    { file_name: "marketing_plan.pptx", size: "1.3MB", date_modified: "2025-01-03T13:15:00" },
    { file_name: "design_resources", files: 9, size: "3.2MB", date_modified: "2025-01-25T15:50:00" },
    { file_name: "react_component.jsx", size: "560KB", date_modified: "2024-12-30T11:11:00" },
    { file_name: "app_prototype.jpeg", size: "980KB", date_modified: "2025-01-20T14:35:00" },
    { file_name: "server_config.json", size: "320KB", date_modified: "2025-01-18T09:00:00" },
    { file_name: "mobile_ui.psd", size: "1.2MB", date_modified: "2025-01-11T10:40:00" },
    { file_name: "development_scripts", size: "5.8MB", date_modified: "2025-01-28T12:22:00" },
    { file_name: "backend_api.js", size: "1.1MB", date_modified: "2024-11-29T17:30:00" },
    { file_name: "financial_report.xlsx", size: "890KB", date_modified: "2025-01-05T08:55:00" },
    { file_name: "logo_design.sketch", size: "512KB", date_modified: "2024-10-18T10:00:00" },
    { file_name: "meeting_notes.txt", size: "150KB", date_modified: "2025-01-15T09:15:00" },
    { file_name: "brand_guidelines.pdf", size: "3.1MB", date_modified: "2025-01-12T14:00:00" },
    { file_name: "promo_banner.png", size: "980KB", date_modified: "2025-01-02T11:45:00" }
  ];

  const [isToggled, setIsToggled] = useState(false);
  const [sortBy, setSortBy] = useState('name');
  const [activeContextIndex, setActiveContextIndex] = useState(null);

  const openMenu = (index) => setActiveContextIndex(index);
  const closeMenu = () => setActiveContextIndex(null);

  // Function to parse size from strings like "45KB", "2.3MB"
  const parseSize = (sizeStr) => {
    const units = { KB: 1, MB: 1024 };
    const match = sizeStr.match(/([\d.]+)(KB|MB)/i);
    if (!match) return 0; // Handle if the size is not in KB/MB format
    return parseFloat(match[1]) * units[match[2].toUpperCase()];
  };

  // Add file type based on extension or treat as 'folder' if no extension
  const filesWithType = files.map(file => {
    const match = file.file_name.match(/\.([0-9a-z]+)$/i);
    const type = match ? match[1].toLowerCase() : "folder";
    return { ...file, type };
  });

  // Sort files based on selected criteria
  const sortedFiles = [...filesWithType].sort((a, b) => {
    if (sortBy === 'name') {
      return a.file_name.localeCompare(b.file_name);
    } else if (sortBy === 'size') {
      return parseSize(a.size) - parseSize(b.size);
    } else if (sortBy === 'type') {
      return a.type.localeCompare(b.type);
    } else if (sortBy === 'date') {
      return new Date(a.date_modified) - new Date(b.date_modified);
    }
    return 0;
  });

  return (
    <div className="Folder-Page-Content">
      <div className="Filter-container-FP">
        <FilterContainer
          isToggled={isToggled}
          setIsToggled={setIsToggled}
          sortBy={sortBy}
          setSortBy={setSortBy}
        />
      </div>

      <div className="Folder-Contents">
        {sortedFiles.map((file, index) => (
          <FileConatiner
            key={index}
            index={index}
            file_name={file.file_name}
            files={file.files}
            size={file.size}
            type={file.type}
            date_modified={file.date_modified}
            isToggled={isToggled}
            isMenuOpen={activeContextIndex === index}
            openMenu={openMenu}
            closeMenu={closeMenu}
          />
        ))}
      </div>
    </div>
  );
};
