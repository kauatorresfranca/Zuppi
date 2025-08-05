import styled from "styled-components";
import { breakpoints } from "../../../styles";

export const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  gap: 260px;

  img {
    height: 260px;
    width: 260px;
  }

  @media (max-width: ${breakpoints.tablet}) {
    flex-direction: column;
    gap: 60px;
    
    img {
      height: 200px;
      width: 200px;
    }
  }
`;

export const HeroSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  width: 300px;
`;

export const ActionSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  gap: 10px;

  p {
    font-size: 11px;
    color: #5d6468;

    span {
      color: #1d9bf0;
      cursor: pointer;
    }
  }
`;

export const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;

  input {
    padding: 14px;
    border: 1px solid rgba(93, 100, 104, 0.39);
    border-radius: 4px;
    background-color: transparent;

    &::placeholder {
      color: #979b9f;
    }
  }
`;

export const ErrorMessage = styled.p`
  color: #ff4d4f;
  font-size: 14px;
  margin-top: 8px;
`;
