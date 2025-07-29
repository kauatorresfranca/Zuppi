import { Routes, Route, Navigate } from "react-router-dom";
import { GlobalStyle } from "../styles";
import Home from "./pages/home";
import Feed from "./pages/feed";
import { api } from "./api";
import { useEffect, useState, type JSX } from "react";

const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        await api.get("profile/");
        setIsAuthenticated(true);
      } catch {
        setIsAuthenticated(false);
      }
    };
    checkAuth();
  }, []);

  if (isAuthenticated === null) {
    return <div>Carregando...</div>;
  }

  return isAuthenticated ? children : <Navigate to="/" />;
};

function App() {
  return (
    <>
      <GlobalStyle />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/feed"
          element={
            <ProtectedRoute>
              <Feed />
            </ProtectedRoute>
          }
        />
      </Routes>
    </>
  );
}

export default App;
