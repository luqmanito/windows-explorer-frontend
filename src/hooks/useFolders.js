import { useState, useEffect } from 'react';
import axios from 'axios';

const useFolders = () => {
  const [folders, setFolders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFolders = async () => {
      try {
        const response = await axios.get('http://localhost:3696/api/v1/folders?is_all_data=true');
        setFolders(response.data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchFolders();
  }, []);

  return { folders, loading, error };
};

export default useFolders;
