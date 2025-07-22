import { Routes, Route } from "react-router-dom"; // Importe Routes e Route
import { GlobalStyle } from "../styles";
import Home from "./pages/home";
import Feed from "./pages/feed";

function App() {
  return (
    <>
      <GlobalStyle />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/feed" element={<Feed />} />
      </Routes>
    </>
  );
}

export default App;
