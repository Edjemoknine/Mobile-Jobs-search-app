import { useEffect, useState } from "react";
import axios from "axios";

const useFetch = (endpoint, query) => {
  const [data, setData] = useState([]);
  const [isLoading, setisLoading] = useState(false);
  const [error, setError] = useState(null);

  const options = {
    method: "GET",
    url: `https://jsearch.p.rapidapi.com/${endpoint}`,
    headers: {
      "X-RapidAPI-Key": "6c2a704035mshed3f3f412f5f9aap1c236bjsnbaf789e00c56",
      "X-RapidAPI-Host": "jsearch.p.rapidapi.com",
    },
    params: {
      ...query,
    },
  };
  const fetchJobs = async () => {
    try {
      setisLoading(true);
      const response = await axios.request(options);
      setData(response.data.data);
    } catch (error) {
      setError(error);
      console.log(error);
    } finally {
      setisLoading(false);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  const refresh = () => {
    setisLoading(true);
    fetchJobs();
  };

  return { data, isLoading, error, refresh };
};

export default useFetch;
