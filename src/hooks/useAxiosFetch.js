import axios from 'axios';
import { useDebugValue, useEffect, useState } from 'react';

export function useAxiosFetch(url) {
  const [data, setData] = useState(null);
  const [isError, setIsError] = useState(null);
  const [isPending, setIsPending] = useState(true);

  useDebugValue(`Data: ${data}`);
  useDebugValue(`isError: ${isError}`);
  useDebugValue(`isPending: ${isPending}`);

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    const fetchData = async () => {
      const response = await axios.get(url, { signal: signal });
      setData(response.data);
      setIsError(false);
      console.log(response.data);
    };

    fetchData()
      .catch(error => {
        setIsError(error);
        console.log(error);
      })
      .finally(() => {
        setIsPending(false);
      });

    return () => {
      controller.abort();
      setData(null);
      setIsError(null);
      setIsPending(true);
    };
  }, [url]);

  return [data, isError, isPending];
}
