import React, { createContext, useContext, useState } from 'react';
import { ChatService } from '../services/chat.service';
// State should be contained here for the values concerning the context.

// Context should be split into different context with single specific functions

// We can use custom hooks returning useContext, so that we can return
// specific values and setters/handlers for the individual context.

// Also should be split in multiple files for individual contexts like:
// ThemeContext, which will export custom hooks with value of theme and handler function
// that sets the theme, along with returning a component wrapper for the context provider.

export const ChatContext = createContext();

export function useChat() {
  return useContext(ChatContext);
}

export default function ChatProvider({ children }) {
  const [chatService] = useState(new ChatService());
  return (
    <ChatContext.Provider value={chatService}>{children}</ChatContext.Provider>
  );
}
