import { useDebugValue, useEffect, useState } from 'react';

export function useFetch(url) {
  const [data, setData] = useState(null);
  const [isError, setIsError] = useState(null);
  const [isPending, setIsPending] = useState(true);

  useDebugValue(`Data: ${data}`);
  useDebugValue(`isError: ${isError}`);
  useDebugValue(`isPending: ${isPending}`);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(url);
      const data = await response.json();
      setData(data);
      setIsError(false);
      console.log(data);
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
      setData(null);
      setIsError(null);
      setIsPending(true);
    };
  }, []);

  return [data, isError, isPending];
}
