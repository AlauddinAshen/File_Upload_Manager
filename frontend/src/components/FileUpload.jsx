import React, { useState, useEffect } from "react";
import axios from "axios";
import "./FileUpload.css";

const FileUpload = ({ onUpload }) => {
  const [file, setFile] = useState(null); // Only for the currently selected file
  const [progress, setProgress] = useState(0);

  // Select a file
  const handleFileSelect = (e) => setFile(e.target.files[0]);

  // Upload file
  const handleUpload = async () => {
    if (!file) return alert("Please select a file first!");

    const formData = new FormData();
    formData.append("file", file);

    try {
      await axios.post("http://localhost:5000/api/files/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
        onUploadProgress: (event) => {
          setProgress(Math.round((event.loaded * 100) / event.total));
        },
      });

      setFile(null); // Clear selected file after upload
      setProgress(0);
      if (onUpload) onUpload(); // Refresh uploaded files list
    } catch (err) {
      console.error(err);
      alert("Upload failed!");
    }
  };

  return (
    <div className="file-upload-container">
      <h2>Upload File</h2>
      <input
        type="file"
        id="fileInput"
        onChange={handleFileSelect}
        style={{ display: "none" }}
      />
      <button
        className="select-btn"
        onClick={() => document.getElementById("fileInput").click()}
      >
        Select File
      </button>
      <button className="upload-btn" onClick={handleUpload}>
        Upload
      </button>

      {progress > 0 && (
        <div className="progress-bar">
          <div className="progress" style={{ width: `${progress}%` }} />
        </div>
      )}

      {file && (
        <div className="selected-files">
          <p>Selected: {file.name}</p>
        </div>
      )}
    </div>
  );
};

export default FileUpload;
