import { Box, Center, Heading, Text } from '@chakra-ui/react';
import { useEffect } from 'react';
import {
  RouterProvider,
  createBrowserRouter,
  redirect,
  useNavigate,
  useRouteError,
} from 'react-router-dom';
import { useAuthService } from './context/AuthServiceContext';
import ChatServiceProvider from './context/ChatServiceContext';
import ChatLayout from './layouts/ChatLayout';
import Accounts from './pages/Admin/Accounts';
import Admin from './pages/Admin/Admin';
import Users from './pages/Admin/Users';
import Chat from './pages/Chat';
import Login from './pages/Login';
export default function App() {
  const { validate } = useAuthService();

  const router = createBrowserRouter([
    {
      path: '/',
      element: <ChatLayout />,
      loader: () => validate(),
      errorElement: <AppError />,
      children: [
        {
          path: '/chat/:id',
          element: <Chat />,
        },
        {
          path: '/admin',
          element: <Admin />,
          children: [
            { path: '/admin/accounts', element: <Accounts /> },
            { path: '/admin/users', element: <Users /> },
          ],
        },
      ],
    },
    {
      path: '/login',
      element: <Login />,
      loader: () =>
        validate()
          .then(res => {
            if (res.status === 200) {
              return redirect('/chat/1');
            }
          })
          .catch(err => {
            console.log(err);
            return err;
          }),
    },
  ]);

  return <RouterProvider router={router} />;
}

export const AppError = () => {
  const navigate = useNavigate();
  const error = useRouteError();

  // TODO: Just return responses as { status: 200, statusText: 'OK' } or { status: 401, statusText: 'Unauthorized' } from backend
  if (typeof error === 'string') {
    return <Text>{error.toString()}</Text>;
  }
  if (typeof error.status !== undefined && error.status === 404) {
    return <Text>'Error 404'</Text>;
  }
  if (
    typeof error.response.status !== undefined &&
    error.response.status === 401
  ) {
    navigate('/login');
  }
};
