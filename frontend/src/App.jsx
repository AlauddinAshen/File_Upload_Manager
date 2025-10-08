import React, { useState } from "react";
import FileUpload from "./components/FileUpload.jsx";
import FileList from "./components/FileList.jsx";

function App() {
  const [refresh, setRefresh] = useState(0);
  const triggerRefresh = () => setRefresh((prev) => prev + 1);

  return (
    <div style={{ padding: "20px" }}>
      <FileUpload onUpload={triggerRefresh} />
      <FileList refresh={refresh} />
    </div>
  );
}

export default App;
