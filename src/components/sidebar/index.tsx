import Button from "../button";
import * as S from "./styles";
import { useState } from "react";
import Modal from "../modal";
import { useNavigate } from "react-router-dom";
import { api } from "../../api";

// Define a interface para as propriedades do componente SideBar
interface SideBarProps {
  onContentChange: (content: "feed" | "profile") => void;
}

/**
 * Componente SideBar:
 * - Exibe o menu de navegação lateral.
 * - Inclui um botão para logout que abre um modal de confirmação.
 * - Gerencia a navegação para diferentes seções do aplicativo.
 * @param {SideBarProps} { onContentChange } - Função para mudar o conteúdo principal.
 */
const SideBar = ({ onContentChange }: SideBarProps) => {
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
  const navigate = useNavigate();

  // Função assíncrona para lidar com o logout do usuário
  const handleLogout = async () => {
    try {
      // Chama o endpoint de logout da API
      await api.post("/logout/", {});
      // Navega para a página inicial após o logout
      navigate("/");
    } catch (error) {
      // Registra qualquer erro no console, mas não impede a navegação
      // O erro pode ser causado se o backend já deslogou o usuário,
      // então a navegação ainda é uma ação válida.
      console.error("Erro ao fazer logout:", error);
      // Mantém a navegação mesmo em caso de erro, já que a intenção é sair
      navigate("/");
    }
    // Fecha o modal de logout, independentemente do sucesso ou falha da requisição
    setIsLogoutModalOpen(false);
  };

  return (
    <>
      <S.SideBar>
        <h1>
          <i className="ri-twitter-fill logo"></i>
        </h1>
        <S.MenuList>
          {/* Item de menu para "Home" que muda o conteúdo para "feed" */}
          <S.MenuItem onClick={() => onContentChange("feed")}>
            <i className="ri-home-4-fill"></i>
            <h4>Home</h4>
          </S.MenuItem>
          {/* Outros itens de menu estáticos */}
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
          {/* Item de menu para "Profile" que muda o conteúdo para "profile" */}
          <S.MenuItem onClick={() => onContentChange("profile")}>
            <i className="ri-user-fill"></i>
            <h4>Profile</h4>
          </S.MenuItem>
          <S.MenuItem>
            <i className="ri-more-fill"></i>
            <h4>More</h4>
          </S.MenuItem>
          {/* Item de menu para "Logout" que abre o modal */}
          <S.MenuItem onClick={() => setIsLogoutModalOpen(true)}>
            <i className="ri-logout-box-line"></i>
            <h4>Logout</h4>
          </S.MenuItem>
          <Button variant="primary">Zuppi</Button>
        </S.MenuList>
      </S.SideBar>

      {/* Modal de confirmação de logout */}
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
