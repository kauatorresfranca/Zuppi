import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.tsx";
import { initializeApi } from "./api.ts"; // Importa a função de inicialização

// Define a função assíncrona para iniciar a aplicação
const startApp = async () => {
  // Await é crucial: Garante que o token CSRF é obtido antes de
  // a aplicação ser renderizada.
  await initializeApi();

  const root = createRoot(document.getElementById("root")!);
  root.render(
    <StrictMode>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </StrictMode>
  );
};

// Chama a função de inicialização para arrancar a aplicação
startApp();