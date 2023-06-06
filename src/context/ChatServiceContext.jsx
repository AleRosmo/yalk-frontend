import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';

export const ChatServiceContext = createContext();

export function useChatService() {
  return useContext(ChatServiceContext);
}

export default function ChatServiceProvider({ url, children }) {
  const [chats, setChats] = useState([]);
  const [accounts, setAccounts] = useState([]);
  const [serverUsers, setServerUsers] = useState({});
  const [currentUser, setCurrentUser] = useState(null);
  const [isLoading, setIsloading] = useState(true);

  // Must not trigger re-render so store websocket in useRef
  const websocket = useRef(null);

  // Handle Incoming Message
  const handleIncomingPayload = useCallback(payload => {
    const data = payload.data;

    switch (payload.type) {
      case 'initial':
        console.log('initializing');
        initialize(data);
        break;

      case 'message':
        setChats(prevChats => {
          return prevChats.map(chat => {
            if (chat.id === data.chatId) {
              chat.messages.push(data);
            }
            return chat;
          });
        });
        console.log(`received a chat message ${payload}`);
        break;

      case 'user':
        console.log('received a user event');
        setCurrentUser(currentUser =>
          payload.data.userId === currentUser.userId
            ? payload.data
            : currentUser
        );
        setServerUsers(prevServerUsers => {
          // TODO: Must be simplified returnin payload.data
          return prevServerUsers.map(user => {
            if (user.userId === payload.data.userId) {
              user.statusName = payload.data.statusName;
            }
            return user;
          });
        });
        break;

      case 'account_create':
        setAccounts(prevAccounts => [...prevAccounts, data]);
        console.log(
          `received an account create for ${data.id} with name ${data.name}`
        );
        break;

      default:
        console.log(`Received unknown type: ${payload.type}`);
    }
  }, []);

  // Initialize state with initial payload received
  const initialize = useCallback(initialData => {
    setCurrentUser(initialData.user);
    setAccounts(initialData.accounts);
    setServerUsers(initialData.users);
    setChats(initialData.chats);
    setIsloading(false);
  });

  // Send a "chat_message" event to the server with a message payload
  const sendMessage = useCallback((chatId, message) => {
    if (websocket.current && websocket.current.readyState === WebSocket.OPEN) {
      const payload = {
        type: 'message',
        action: 'send',
        data: {
          chatId: chatId,
          messageType: 'chat_message',
          timestamp: new Date().toISOString(),
          content: message,
        },
      };
      websocket.current.send(JSON.stringify(payload));
    }
  });

  // Sends a "account_create" event to the server with a user payload
  const addAccount = useCallback((email, username, password) => {
    if (websocket.current && websocket.current.readyState === WebSocket.OPEN) {
      const payload = {
        type: 'account',
        action: 'create',
        data: {
          email: email,
          username: username,
          password: password,
        },
      };
      websocket.current.send(JSON.stringify(payload));
    }
  });

  const addUser = useCallback(({ displayName, isAdmin }) => {
    if (websocket.current && websocket.current.readyState === WebSocket.OPEN) {
      const payload = {
        type: 'add_user',
        data: {
          displayName: displayName,
          isAdmin: isAdmin,
        },
      };
      websocket.current.send(JSON.stringify(payload));
    }
  });

  const handleUser = useCallback(
    payload => {
      switch (payload.action) {
        case 'change_status':
          break;
        default:
          console.log(`Received unknown action: ${payload.action}`);
          break;
      }
    },
    [currentUser, serverUsers]
  );

  const changeStatus = useCallback(statusName => {
    if (websocket.current && websocket.current.readyState === WebSocket.OPEN) {
      const payload = {
        type: 'user',
        action: 'change_status',
        data: {
          statusName: statusName,
        },
      };
      websocket.current.send(JSON.stringify(payload));
    }
  });

  // Connect Websocket at start
  useEffect(() => {
    websocket.current = new WebSocket(url);

    websocket.current.onopen = event => {
      console.log('websocket opened connection successfully');
      console.log(event.target);
      // websocket.current.send(
      //   JSON.stringify({
      //     type: 'initial',
      //   })
      // );
    };

    websocket.current.onclose = event => {
      console.log(`WebSocket connection closed with code ${event.code}`);
      
    };

    websocket.current.onmessage = event => {
      console.log(`WebSocket message received: ${event.data}`);
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
        currentUser,
        chats,
        accounts,
        serverUsers,
        sendMessage,
        addAccount,
        addUser,
        isLoading,
        changeStatus,
      }}
    >
      {children}
    </ChatServiceContext.Provider>
  );
}
