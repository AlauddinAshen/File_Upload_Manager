import React, { useState } from "react";
import axios from "axios";
import "./FileUpload.css";
import BASE_URL from "../config"; // import your backend URL

const FileUpload = ({ onUpload }) => {
  const [file, setFile] = useState(null);
  const [progress, setProgress] = useState(0);

  const handleFileSelect = (e) => setFile(e.target.files[0]);

  const handleUpload = async () => {
    if (!file) return alert("Please select a file first!");

    const formData = new FormData();
    formData.append("file", file);

    try {
      await axios.post(`${BASE_URL}/api/files/upload`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
        onUploadProgress: (event) => {
          setProgress(Math.round((event.loaded * 100) / event.total));
        },
      });

      setFile(null);
      setProgress(0);
      if (onUpload) onUpload();
    } catch (err) {
      console.error("Upload failed:", err);
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
