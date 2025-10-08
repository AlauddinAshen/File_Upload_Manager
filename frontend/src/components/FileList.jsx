import React, { useEffect, useState } from "react";
import FileItem from "./FileItem";
import axios from "axios";
import "./FileUpload.css";

const FileList = ({ refresh }) => {
  const [files, setFiles] = useState([]);

  const fetchFiles = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/files");
      setFiles(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchFiles();
  }, [refresh]);

  return (
    <div className="file-list">
      <h3>Uploaded Files</h3>
      {files.length === 0 && <p>No files uploaded yet.</p>}
      {files.map((file) => (
        <FileItem key={file._id} file={file} onDelete={fetchFiles} />
      ))}
    </div>
  );
};

export default FileList;
