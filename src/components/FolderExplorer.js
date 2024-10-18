// src/components/FolderExplorer.js
import React, { useState, useEffect } from "react";
import useFolders from "../hooks/useFolders"; // Import the custom hook for folders
import useSubfoldersAndFiles from "../hooks/useSubfoldersAndFiles";
import "../../src/App.css";

const FolderExplorer = () => {
  const {
    folders,
    loading: foldersLoading,
    error: foldersError,
  } = useFolders();
  const {
    subfolders,
    files,
    fetchSubfoldersAndFiles,
    loading: subfoldersLoading,
    error: subfoldersError,
  } = useSubfoldersAndFiles();
  const [selectedFolderId, setSelectedFolderId] = useState(null);

  const handleFolderClick = (id) => {
    setSelectedFolderId(id);
    fetchSubfoldersAndFiles(id);
  };

  return (
    <div className="container">
      {/* left panel */}
      <div className="left-panel">
        <h3>Folders</h3>
        {foldersLoading ? <p>Loading folders...</p> : null}
        {foldersError ? <p>{foldersError}</p> : null}
        <ul>
          {folders?.data?.map((folder) => (
            <li
              key={folder.id}
              onClick={() => handleFolderClick(folder.id)}
              className={`folder-item ${
                selectedFolderId === folder.id ? "active" : ""
              }`}
            >
              {folder.name}
            </li>
          ))}
        </ul>
      </div>

      {/* Separator Line */}
      <div className="separator"></div>

      {/* Right Panel */}
      <div className="right-panel">
        <h3>Subfolders</h3>
        {subfoldersLoading ? <p>Loading subfolders...</p> : null}
        {subfoldersError ? <p>{subfoldersError}</p> : null}
        {subfolders.length > 0 ? (
          <ul>
            {subfolders.map((subfolder) => (
              <li key={subfolder.id} className="subfolder-item">
                {subfolder.name}
              </li>
            ))}
          </ul>
        ) : (
          <p>No subfolders available</p>
        )}

        <h3>Files</h3>
        {files.length > 0 ? (
          <ul>
            {files.map((file) => (
              <li key={file.id} className="file-item">
                {file.name} ({file.type})
              </li>
            ))}
          </ul>
        ) : (
          <p>No files available</p>
        )}
      </div>
    </div>
  );
};

export default FolderExplorer;
