import { RouterProvider, createBrowserRouter } from 'react-router-dom';
// `@chakra-ui/theme` is a part of the base install with `@chakra-ui/react`

import { useEffect, useRef } from 'react';
import ChatProvider, { ChatContext, useChat } from './context/ChatContext';
import ChatLayout, { SidebarLoader } from './layouts/ChatLayout';
import Chat from './pages/Chat';
import Home from './pages/Home';
import { ChatService } from './services/chat.service';

const router = createBrowserRouter([
  {
    path: '/',
    element: <ChatLayout />,
    loader: SidebarLoader,
    children: [
      {
        index: true,
        element: <Home />,
        loader: null,
      },
      {
        path: '/chat/:id',
        element: <Chat />,
      },
    ],
  },
]);

function App() {
  const chatService = useRef(new ChatService())
  
  useEffect(() => {
    chatService.current.connect('ws://localhost:8080/ws');
    return () => chatService.current.disconnect();
  }, []);

  return (
    <ChatProvider context={chatService.current}>
      <RouterProvider router={router} />
    </ChatProvider>
  );
}

export default App;
