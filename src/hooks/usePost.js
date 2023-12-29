import { useState } from "react";

const usePost = (url, data) => {
    const [response, setResponse] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
  
    const postData = async () => {
      setLoading(true);
      try {
        const res = await fetch(url, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json; charset=UTF-8',
          },
          body: JSON.stringify(data),
        });
        const json = await res.json();
        setResponse(json);
        setLoading(false);
      } catch (err) {
        setError(err);
        setLoading(false);
      }
    };
  
    return { response, loading, error, postData };
  };
  
  export default usePost;