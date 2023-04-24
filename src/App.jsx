import { RouterProvider, createBrowserRouter } from 'react-router-dom';
// `@chakra-ui/theme` is a part of the base install with `@chakra-ui/react`
import RootLayout from './layouts/RootLayout';
import Home from './pages/Home';



const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: <Home />,
        loader: null,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
