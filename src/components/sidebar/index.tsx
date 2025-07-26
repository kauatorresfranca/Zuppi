import Button from "../button";
import * as S from "./styles";
import { useState } from "react";
import Modal from "../modal";
import { useNavigate } from "react-router-dom";
import { api } from "../../api";

// Define props interface for SideBar
interface SideBarProps {
  onContentChange: (content: "feed" | "profile") => void;
}

const SideBar = ({ onContentChange }: SideBarProps) => {
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await api.post("/logout/", {});
      navigate("/");
    } catch (error) {
      console.error("Erro ao fazer logout:", error);
    }
    setIsLogoutModalOpen(false);
  };

  return (
    <>
      <S.SideBar>
        <h1>
          <i className="ri-twitter-fill logo"></i>
        </h1>
        <S.MenuList>
          <S.MenuItem onClick={() => onContentChange("feed")}>
            <i className="ri-home-4-fill"></i>
            <h4>Home</h4>
          </S.MenuItem>
          <S.MenuItem>
            <i className="ri-hashtag"></i>
            <h4>Explore</h4>
          </S.MenuItem>
          <S.MenuItem>
            <i className="ri-notification-2-fill"></i>
            <h4>Notifications</h4>
          </S.MenuItem>
          <S.MenuItem>
            <i className="ri-mail-fill"></i>
            <h4>Messages</h4>
          </S.MenuItem>
          <S.MenuItem>
            <i className="ri-bookmark-fill"></i>
            <h4>Bookmarks</h4>
          </S.MenuItem>
          <S.MenuItem>
            <i className="ri-group-fill"></i>
            <h4>Communities</h4>
          </S.MenuItem>
          <S.MenuItem>
            <i className="ri-twitter-fill"></i>
            <h4>Premium</h4>
          </S.MenuItem>
          <S.MenuItem onClick={() => onContentChange("profile")}>
            <i className="ri-user-fill"></i>
            <h4>Profile</h4>
          </S.MenuItem>
          <S.MenuItem>
            <i className="ri-more-fill"></i>
            <h4>More</h4>
          </S.MenuItem>
          <S.MenuItem onClick={() => setIsLogoutModalOpen(true)}>
            <i className="ri-logout-box-line"></i>
            <h4>Logout</h4>
          </S.MenuItem>
          <Button variant="primary">Zuppi</Button>
        </S.MenuList>
      </S.SideBar>

      <Modal
        isOpen={isLogoutModalOpen}
        onClose={() => setIsLogoutModalOpen(false)}
      >
        <h2>Confirmar Logout</h2>
        <i
          className="ri-close-fill"
          onClick={() => setIsLogoutModalOpen(false)}
        ></i>
        <S.ModalContent>
          <p>Tem certeza de que deseja sair da sua conta?</p>
          <S.ButtonGroup>
            <Button
              variant="secondary"
              onClick={() => setIsLogoutModalOpen(false)}
            >
              Cancelar
            </Button>
            <Button variant="primary" onClick={handleLogout}>
              Sair
            </Button>
          </S.ButtonGroup>
        </S.ModalContent>
      </Modal>
    </>
  );
};

export default SideBar;
