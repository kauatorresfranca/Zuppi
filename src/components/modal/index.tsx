import * as S from "./styles";

type Props = {
  isOpen: boolean;
  children: React.ReactNode;
};

const Modal = ({ isOpen, children }: Props) => {
  if (!isOpen) return null;

  return (
    <S.Overlay>
      <S.Container>{children}</S.Container>
    </S.Overlay>
  );
};

export default Modal;
