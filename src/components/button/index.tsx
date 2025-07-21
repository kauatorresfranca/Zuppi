import * as S from "./styles";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: "primary" | "secondary";
}

const Button = ({ children, ...props }: ButtonProps) => {
  return <S.Container {...props}>{children}</S.Container>;
};

export default Button;
