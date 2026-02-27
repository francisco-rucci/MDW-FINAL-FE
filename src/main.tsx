import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import PublicLayout from "./publicLayout";
import Home from "./pages/Home";
import ErrorPage from "./components/ErrorPage";
import './index.css'
import Register from './pages/Register';

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
        element: <div>Página de Login</div>,
      },
      {
        path: "register",
        element: <Register />, 
      }
    ],
  }
]);

createRoot(document.getElementById("root")!).render(
  <RouterProvider router={router} />
);