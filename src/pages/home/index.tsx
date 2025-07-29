import Button from "../../components/button";
import * as S from "./styles";
import { useState } from "react";
import Modal from "../../components/modal";
import { useNavigate } from "react-router-dom";
import { api } from "../../api";
import logo from "../../assets/images/z.png";

const Home = () => {
  const [modalLoginIsOpen, setModalLoginIsOpen] = useState(false);
  const [modalCriarIsOpen, setModalCriarIsOpen] = useState(false);
  const [loginError, setLoginError] = useState<string | null>(null);
  const [registerError, setRegisterError] = useState<string | null>(null);
  const navigate = useNavigate();

  const toggleModals = (openModal: "login" | "criar") => {
    setLoginError(null);
    setRegisterError(null);
    if (openModal === "login") {
      setModalCriarIsOpen(false);
      setModalLoginIsOpen(true);
    } else {
      setModalLoginIsOpen(false);
      setModalCriarIsOpen(true);
    }
  };

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const username = (form.elements.namedItem("username") as HTMLInputElement)
      .value;
    const password = (form.elements.namedItem("password") as HTMLInputElement)
      .value;
    try {
      await api.post("/login/", { username, password });
      navigate("/feed");
    } catch (error: any) {
      setLoginError(error.message || "Erro ao fazer login");
    }
  };

  const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const username = (form.elements.namedItem("username") as HTMLInputElement)
      .value;
    const email = (form.elements.namedItem("email") as HTMLInputElement).value;
    const password = (form.elements.namedItem("password") as HTMLInputElement)
      .value;
    const confirmPassword = (
      form.elements.namedItem("confirmPassword") as HTMLInputElement
    ).value;

    if (password !== confirmPassword) {
      setRegisterError("As senhas não coincidem");
      return;
    }
    try {
      await api.post("/register/", { username, email, password });
      navigate("/feed");
    } catch (error: any) {
      setRegisterError(error.message || "Erro ao criar conta");
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

      <Modal
        isOpen={modalCriarIsOpen}
        onClose={() => setModalCriarIsOpen(false)}
      >
        <h2>Criar conta</h2>
        <i
          className="ri-close-fill"
          onClick={() => setModalCriarIsOpen(false)}
        ></i>
        <form onSubmit={handleRegister}>
          <S.InputGroup>
            <input
              type="text"
              name="username"
              placeholder="Nome de usuário"
              required
            />
            <input type="email" name="email" placeholder="Email" required />
            <input
              type="password"
              name="password"
              placeholder="Senha"
              required
            />
            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirmar senha"
              required
            />
          </S.InputGroup>
          {registerError && <S.ErrorMessage>{registerError}</S.ErrorMessage>}
          <Button variant="primary" type="submit">
            Criar Conta
          </Button>
          <p>
            Já tem uma conta?{" "}
            <span onClick={() => toggleModals("login")}>Faça login</span>
          </p>
        </form>
      </Modal>

      <Modal
        isOpen={modalLoginIsOpen}
        onClose={() => setModalLoginIsOpen(false)}
      >
        <h2>Entrar na minha conta</h2>
        <i
          className="ri-close-fill"
          onClick={() => setModalLoginIsOpen(false)}
        ></i>
        <form onSubmit={handleLogin}>
          <S.InputGroup>
            <input
              type="text"
              name="username"
              placeholder="Nome de usuário"
              required
            />
            <input
              type="password"
              name="password"
              placeholder="Senha"
              required
            />
          </S.InputGroup>
          {loginError && <S.ErrorMessage>{loginError}</S.ErrorMessage>}
          <Button variant="primary" type="submit">
            Entrar
          </Button>
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
