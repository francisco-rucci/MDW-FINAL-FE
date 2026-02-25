import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import PublicLayout from './publicLayout.tsx';
import ErrorPage from './components/ErrorPage.tsx';

const router = createBrowserRouter([
  {
    path: "/",
    Component: PublicLayout,
    children: [
      {
        index: true,
        Component: App,
        errorElement: <ErrorPage />
      }
    ],
  }
]);

createRoot(document.getElementById("root")!).render(
  <RouterProvider router={router} />
);