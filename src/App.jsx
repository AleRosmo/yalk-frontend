import { Box, Center, Heading } from '@chakra-ui/react';
import { useEffect } from 'react';
import {
  RouterProvider,
  createBrowserRouter,
  useNavigate,
  useRouteError,
} from 'react-router-dom';
import ChatBrowser from './components/ChatBrowser/ChatBrowser';
import ChatProvider from './context/ChatContext';
import ChatLayout from './layouts/ChatLayout';
import Chat from './pages/Chat';
import Home from './pages/Home';
import Login from './pages/Login';
import AuthService from './services/auth.service';

function App() {
  // ? State
  const router = createBrowserRouter([
    {
      path: '/',
      element: (
        <ChatProvider url={'ws://localhost:8080/ws'}>
          <ChatLayout />
        </ChatProvider>
      ),
      loader: () => AuthService.validate(),
      errorElement: <AppError />,
      children: [
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

  return <RouterProvider router={router} />;
}

export const AppError = () => {
  const navigate = useNavigate();
  const error = useRouteError();

  useEffect(() => {
    if (error.status !== undefined && error.status === 404) {
      return
    }

    if (error.response.status && error.response.status === 401) {
      navigate('/login');
    }
  }, []);
};

export default App;
