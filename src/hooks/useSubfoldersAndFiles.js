import { useState } from 'react';
import axios from 'axios';

const useSubfoldersAndFiles = () => {
  const [subfolders, setSubfolders] = useState([]);
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchSubfoldersAndFiles = async (folderId) => {
    setLoading(true);
    try {
      const response = await axios.get(`http://localhost:3696/api/v1/folders/${folderId}/subfolders`);
      setSubfolders(response.data);
      setFiles(response?.data[0]?.files ? response.data[0].files : []);
      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  return { subfolders, files, fetchSubfoldersAndFiles, loading, error };
};

export default useSubfoldersAndFiles;
