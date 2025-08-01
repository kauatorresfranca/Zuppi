import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.tsx";
import { initializeApi } from "./api.ts";

const startApp = async () => {
  try {
    // Garante que o token CSRF é obtido antes de renderizar a aplicação.
    await initializeApi();
  } catch (err) {
    console.error("Falha ao inicializar a API:", err);
  }

  const root = createRoot(document.getElementById("root")!);
  root.render(
    <StrictMode>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </StrictMode>
  );
};

// Inicia a aplicação.
startApp();