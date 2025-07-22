import * as S from "./styles";
import logo from "../../assets/images/z.png";
import Button from "../../components/button";
import { useState } from "react";
import Modal from "../../components/modal";

const Home = () => {
  const [modalLoginIsOpen, setModalLoginIsOpen] = useState(false);
  const [modalCriarIsOpen, setModalCriarIsOpen] = useState(false);

  // Função para alternar entre modais
  const toggleModals = (openModal: "login" | "criar") => {
    if (openModal === "login") {
      setModalCriarIsOpen(false);
      setModalLoginIsOpen(true);
    } else {
      setModalLoginIsOpen(false);
      setModalCriarIsOpen(true);
    }
  };

  return (
    <>
      <S.Container>
        <img src={logo} alt="logo" />
        <S.HeroSection>
          <h2>Acontecendo agora</h2>
          <S.ActionSection>
            <h3>Inscreva-se Hoje</h3>
            <Button variant="primary" onClick={() => setModalCriarIsOpen(true)}>
              Criar conta
            </Button>

            <p>
              Ao se inscrever, você concorda com os{" "}
              <span>Termos de Serviço</span> e a{" "}
              <span>Política de Privacidade</span>, incluindo o{" "}
              <span>Uso de Cookies</span>.
            </p>

            <h4>Já tem uma conta?</h4>
            <Button
              variant="secondary"
              onClick={() => setModalLoginIsOpen(true)}
            >
              Entrar
            </Button>
          </S.ActionSection>
        </S.HeroSection>
      </S.Container>

      {/* Modal de Criar Conta */}
      <Modal isOpen={modalCriarIsOpen}>
        <h2>Criar conta</h2>
        <i
          className="ri-close-fill"
          onClick={() => setModalCriarIsOpen(false)}
        ></i>
        <form>
          <S.InputGroup>
            <input type="text" placeholder="Nome" />
            <input type="text" placeholder="Email" />
            <input type="text" placeholder="Senha" />
            <input type="text" placeholder="Confirmar senha" />
          </S.InputGroup>
          <Button variant="primary">Criar Conta</Button>
          <p>
            Já tem uma conta?{" "}
            <span onClick={() => toggleModals("login")}>Faça login</span>
          </p>
        </form>
      </Modal>

      {/* Modal de Login */}
      <Modal isOpen={modalLoginIsOpen}>
        <h2>Entrar na minha conta</h2>
        <i
          className="ri-close-fill"
          onClick={() => setModalLoginIsOpen(false)}
        ></i>
        <form>
          <S.InputGroup>
            <input type="text" placeholder="Email" />
            <input type="text" placeholder="Senha" />
          </S.InputGroup>
          <Button variant="primary">Entrar</Button>
          <p>
            Ainda não tem uma conta?{" "}
            <span onClick={() => toggleModals("criar")}>Criar uma conta</span>
          </p>
        </form>
      </Modal>
    </>
  );
};

export default Home;
