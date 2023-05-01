import React, { useDebugValue } from 'react';

const useChat = () => {
  const [messageHistory, setMessageHistory] = useState([]);

  useDebugValue(() => console.log(readyState), [readyState]);

  useEffect(() => {
    if (lastJsonMessage !== null) {
      console.log(lastJsonMessage);
      setMessageHistory(prev =>
        prev ? prev.concat(lastJsonMessage) : lastJsonMessage
      );
    }

    return () => {
      setMessageHistory(prev => {
        prev ? prev.pop() : null;
      });
    };
  }, [lastJsonMessage, setMessageHistory]);
};

export default useChat;
