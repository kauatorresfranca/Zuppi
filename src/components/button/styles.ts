import styled from "styled-components";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary";
}

export const Container = styled.button<ButtonProps>`
  width: 100%;
  background-color: ${({ variant }) =>
    variant === "primary" ? "#1d9bf0" : "#fff"};
  color: ${({ variant }) => (variant === "primary" ? "#fff" : "#1d9bf0")};
  padding: 10px 20px;
  border-radius: 20px;
  border: ${({ variant }) =>
    variant === "primary" ? "none" : "1px solid rgba(93, 100, 104, 0.39)"};
  cursor: pointer;
  font-size: 16px;
  font-weight: 600;
  transition: all 0.3s ease;
`;
