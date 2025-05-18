import React, { useState, useRef } from 'react';
import '../styles/Fileupload.css'


const FileUpload = () => {
  const [files, setFiles] = useState([]);
  const inputRef = useRef();

  const handleDrop = (e) => {
    e.preventDefault();
    const droppedFiles = Array.from(e.dataTransfer.files);
    setFiles(prev => [...prev, ...droppedFiles]);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleFileChange = (e) => {
    const selectedFiles = Array.from(e.target.files);
    setFiles(prev => [...prev, ...selectedFiles]);
  };

  const handleRemoveFile = (index) => {
    setFiles(prev => prev.filter((_, i) => i !== index));
  };

  const handleUpload = () => {
    alert('Uploading files...');
    // Upload logic here
  };

  const handleCancel = () => {
    setFiles([]);
  };

  return (
    <div className="file-uploader-container">
      <div
        className={`drop-zone ${files.length === 0 ? 'center' : ''}`}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onClick={() => inputRef.current.click()}
      >
        <div className="file-upload-block">
        <i class='bx bx-cloud-upload'></i>
        <p>Drag & drop files here or click to select</p>
        </div>
        
        <input
          type="file"
          multiple
          ref={inputRef}
          onChange={handleFileChange}
          style={{ display: 'none' }}
        />
      </div>

      {files.length > 0 && (
        <>
          <div className="file-list">
          {files.map((file, idx) => (
  <div className="file-card" key={idx}>
    <div className="file-name">{file.name}</div>
    <div className="remove-overlay">
      <button className="remove-icon" onClick={() => handleRemoveFile(idx)}>×</button>
    </div>
  </div>
))}

          </div>
          <div className="action-buttons">
            <button className="upload-btn" onClick={handleUpload}>Upload</button>
            <button className="cancel-btn" onClick={handleCancel}>Cancel</button>
          </div>
        </>
      )}
    </div>
  );
};

export default FileUpload;
