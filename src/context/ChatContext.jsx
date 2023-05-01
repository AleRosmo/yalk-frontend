import React, { createContext, useMemo } from 'react';
import useWebSocket from 'react-use-websocket';
// State should be contained here for the values concerning the context.

// Context should be split into different context with single specific functions

// We can use custom hooks returning useContext, so that we can return
// specific values and setters/handlers for the individual context.

// Also should be split in multiple files for individual contexts like:
// ThemeContext, which will export custom hooks with value of theme and handler function
// that sets the theme, along with returning a component wrapper for the context provider.

const connectWebSocket = url => {
  const { sendJsonMessage, lastJsonMessage, readyState } = useWebSocket(url, {
    share: true,
  });

  return {
    sendJsonMessage,
    lastJsonMessage,
    readyState,
    test: 'Yes',
  };
};

export const ChatContext = createContext();

export default function ChatProvider({ url, children }) {
  const context = connectWebSocket(url);

  return (
    <ChatContext.Provider value={context}>{children}</ChatContext.Provider>
  );
}
