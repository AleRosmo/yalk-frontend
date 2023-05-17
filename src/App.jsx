import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import ChatProvider from './context/ChatContext';
import ChatLayout from './layouts/ChatLayout';
import Chat from './pages/Chat';
import Home from './pages/Home';
import Login from './pages/Login';

const router = createBrowserRouter([
  {
    path: '/',
    element: <ChatLayout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: '/chat/:id',
        element: <Chat />,
      },
    ],
  },
  {
    path: '/login',
    element: <Login />,
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
