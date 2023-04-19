import { BrowserRouter, Route, Routes } from 'react-router-dom';
// `@chakra-ui/theme` is a part of the base install with `@chakra-ui/react`
import RootLayout from './layouts/RootLayout';
import Home from './pages/Home';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<RootLayout />}>
          <Route index element={<Home />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
