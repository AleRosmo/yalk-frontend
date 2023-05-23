import React, { createContext, useContext, useEffect, useState } from 'react';

import { Spinner } from '@chakra-ui/react';
import { ChatService } from '../services/Chat/service';

export const ChatServiceContext = createContext();

export function useChatService() {
  return useContext(ChatServiceContext);
}

export default function ChatProvider({ url, children }) {
  const [isLoading, setIsloading] = useState(true);
	const [chats, setChats] = useState(new Map());
	const [accounts, setAccounts] = useState(new Map());
	const [serverUsers, setServerUsers] = useState(new Map());
	const [user, setUser] = useState(null);

	const websocket = useRef(null);


  useEffect(() => {
    const chatService = new ChatService();
    chatService.connect(url);
    chatService.websocket.addEventListener('open', () => {
      setChatService(chatService);
    });

    chatService.websocket.addEventListener('message', () => {
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
    <ChatServiceContext.Provider value={chatService}>{children}</ChatServiceContext.Provider>
  );
}
