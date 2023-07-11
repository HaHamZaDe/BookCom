import {useEffect, useState} from 'react';
import axios from 'axios';

const useFetch = urls => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  const fetchData = async () => {
    try {
      const responses = await Promise.all(urls.map(url => axios.get(url)));

      const responseData = responses.map(response => response.data);
      setData(responseData);
      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return {error, loading, data};
};

export default useFetch;
