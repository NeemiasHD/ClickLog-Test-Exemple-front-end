import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Acesso from "./Routes/Acesso.tsx";
import Contratos from "./Routes/Contratos.tsx";
import { PageProvider } from "./context/PageContext.tsx";
import NotaFiscal from "./Routes/NotaFiscal.tsx";
import CadastroEmpresa from "./Routes/CadastroEmpresa.tsx";

const router = createBrowserRouter([
  {
    element: <App />,
    children: [
      {
        path: "/",
        element: <Acesso />,
      },
      {
        path: "/Contratos",
        element: <Contratos />,
      },
      {
        path: "/NotaFiscal",
        element: <NotaFiscal />,
      },
      {
        path: "/CadastroEmpresa",
        element: <CadastroEmpresa />,
      },
    ],
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <PageProvider>
      <RouterProvider router={router} />
    </PageProvider>
  </StrictMode>
);
