import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import PublicLayout from "./publicLayout";
import Home from "./pages/Home";
import ErrorPage from "./components/ErrorPage";
import Register from './pages/Register';
import Login from "./pages/Login";
import './index.css';
import { Provider } from 'react-redux';
import { store } from './store/store';
import { AuthWrapper } from './components/AuthWrapper';

const router = createBrowserRouter([
  {
    path: "/",
    Component: PublicLayout,
    children: [
      {
        index: true,
        Component: Home, 
        errorElement: <ErrorPage />
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "register",
        element: <Register />, 
      }
    ],
  }
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <AuthWrapper>
          <RouterProvider router={router} />
      </AuthWrapper>
    </Provider>
  </StrictMode>
);