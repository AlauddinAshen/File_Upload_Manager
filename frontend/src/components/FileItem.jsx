import React from "react";
import "./FileUpload.css";

const FileItem = ({ file, onDelete }) => {
  const handleDelete = async () => {
    try {
      await fetch(`http://localhost:5000/api/files/${file._id}`, {
        method: "DELETE",
      });
      onDelete();
    } catch (err) {
      console.error(err);
      alert("Delete failed!");
    }
  };

  const renderFile = () => {
    if (file.mimetype?.startsWith("image/")) {
      return (
        <img
          src={`http://localhost:5000/uploads/${file.filename}`}
          alt={file.filename}
          className="file-thumb"
        />
      );
    } else if (file.mimetype === "application/pdf") {
      return <div className="pdf-icon">PDF</div>;
    } else {
      return <div className="file-icon">FILE</div>;
    }
  };

  return (
    <div className="file-item">
      {renderFile()}
      <p className="file-name">{file.filename}</p>
      <button className="delete-btn" onClick={handleDelete}>
        Delete
      </button>
    </div>
  );
};

export default FileItem;
