import React, { createContext, useContext, useEffect, useState } from 'react';

import { Spinner } from '@chakra-ui/react';
import { ChatService } from '../services/Chat/service';

export const ChatContext = createContext();

export function useChat() {
  return useContext(ChatContext);
}

export default function ChatProvider({ url, children }) {
  const [isLoading, setIsloading] = useState(true);
  const [chatService, setChatService] = useState();

  useEffect(() => {
    const chatService = new ChatService();
    chatService.connect(url);
    chatService.websocket.addEventListener('open', () => {
      setChatService(chatService);
    });

    chatService.websocket.addEventListener('message', () => {
      console.log("received message in ChatContext")
      setIsloading(false);
    });

    return () => {
      chatService.disconnect();
      setChatService(null);
    };
  }, [url]);

  if (isLoading) {
    return <Spinner />;
  }
  return (
    <ChatContext.Provider value={chatService}>{children}</ChatContext.Provider>
  );
}
