import styled from "styled-components";

export const Background = styled.div`
  background-color: #15202b;
  min-height: 100vh;
`;

export const Container = styled.div`
  display: flex;
  max-width: 1200px;
  margin: 0 auto; /* Centraliza o contêiner horizontalmente */
  padding-left: 300px; /* Compensa a largura da sidebar fixa */
  gap: 16px; /* Opcional: adiciona espaço entre Content e Discover */
`;
