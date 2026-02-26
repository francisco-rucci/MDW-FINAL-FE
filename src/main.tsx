import { createRoot } from 'react-dom/client' // Importación necesaria
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import PublicLayout from "./publicLayout";
import Home from "./pages/Home";
import ErrorPage from "./components/ErrorPage";
import './index.css' // Importante para Tailwind

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
        element: <div>Página de Registro</div>,
      }
    ],
  }
]);

// ESTO ES LO QUE FALTA PARA QUE DEJE DE ESTAR EN BLANCO:
createRoot(document.getElementById("root")!).render(
  <RouterProvider router={router} />
);