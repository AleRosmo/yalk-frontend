import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';

import { Spinner } from '@chakra-ui/react';

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

  // Must not trigger re-render so store websocket in useRef
  const websocket = useRef(null);

  // Initialize state with initial payload received
  const initialize = useCallback(initialData => {
    setUser(initialData.user);
    initialData.accounts.forEach(account => {
      setAccounts(accounts => accounts.set(account.id, account));
    });
    initialData.users.forEach(user => {
      setServerUsers(serverUsers => serverUsers.set(user.userId, user)); // TODO: Change userId
    });
    initialData.chats.forEach(chat => {
      setChats(chats => chats.set(chat.id, chat));
    });
    console.log(initialData);
    setIsloading(false);
  });

  // Send Chat Message
  const sendMessage = useCallback((chatId, message) => {
    if (websocket.current && websocket.current.readyState === WebSocket.OPEN) {
      const payload = JSON.stringify({
        chatId: chatId,
        messageType: 'chat_message',
        timestamp: new Date().toISOString(),
        content: message,
      });
      websocket.current.send(
        JSON.stringify({
          type: 'chat_message',
          payload: payload,
        })
      );
    }
    console.log('Sent content' + message);
  });

  // Send Add User
  const addAccount = useCallback(payload => {
    if (websocket.current && websocket.current.readyState === WebSocket.OPEN) {
      websocket.current.send(
        JSON.stringify({ type: 'add_user', payload: payload })
      );
    }
    console.log('Sent content' + payload);
  });

  // Handle Incoming Message
  const handleIncomingPayload = useCallback(payload => {
    const data = payload.data;
    switch (payload.type) {
      case 'chat_message':
        setChats(prevChats => {
          const updatedChats = new Map(prevChats);
          updatedChats.get(data.id).messages.push(data);
          return updatedChats;
        });
        console.log(`received a chat message ${payload}`);
        break;
      case 'account_create':
        setAccounts(prevAccounts => {
          const updatedAccounts = new Map(prevAccounts);
          updatedAccounts.set(data.id, data);
          return updatedAccounts;
        });
        console.log(`received an account create ${payload}`);
        break;
      case 'initial':
        initialize(data);
        break;
      default:
        console.log(`Received unknown type: ${payload.type}`);
    }
  }, []);

  // Connect Websocket at start
  useEffect(() => {
    websocket.current = new WebSocket(url);

    websocket.current.onopen = event => {
      console.log('websocket opened connection successfully');
      console.log(event.target);
    };

    websocket.current.onclose = event => {
      console.log(`WebSocket connection closed with code ${event.code}`);
    };

    websocket.current.onmessage = event => {
      const data = JSON.parse(event.data);
      handleIncomingPayload(data);
    };

    return () => {
      if (websocket.current) {
        websocket.current.close();
      }
    };
  }, [url, handleIncomingPayload]);

  return (
    <ChatServiceContext.Provider
      value={{
        user,
        chats,
        accounts,
        serverUsers,
        sendMessage,
        addAccount,
        isLoading,
      }}
    >
      {children}
    </ChatServiceContext.Provider>
  );
}
