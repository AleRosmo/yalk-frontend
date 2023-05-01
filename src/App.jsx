import {
  RouterProvider,
  createBrowserRouter,
  useOutletContext,
} from 'react-router-dom';
// `@chakra-ui/theme` is a part of the base install with `@chakra-ui/react`
import ChatProvider from './context/ChatContext';
import ChatLayout, { SidebarLoader } from './layouts/ChatLayout';
import Chat, { ChatLoader } from './pages/Chat';
import Home from './pages/Home';

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
        loader: ChatLoader,
      },
    ],
  },
]);

function App() {
  return (
    <ChatProvider url={'ws://localhost:8080/ws'}>
      <RouterProvider router={router} />
    </ChatProvider>
  );
}

export default App;
