import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import PublicLayout from "./publicLayout";
import Home from "./pages/Home";
import ErrorPage from "./components/ErrorPage";
import Register from './pages/Register';
import Login from "./pages/Login";
import { AuthProvider } from './context/AuthContext';
import './index.css';

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
    <AuthProvider>
        <RouterProvider router={router} />
    </AuthProvider>
  </StrictMode>
);