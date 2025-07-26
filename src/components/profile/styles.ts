import styled from "styled-components";
import { breakpoints } from "../../../styles";

export const Content = styled.div`
  position: relative;
  z-index: 1000;
  padding: 16px;
  width: 600px;

  @media (max-width: ${breakpoints.tablet}) {
    width: 100%;
    padding: 8px;
  }
`;

export const ProfileContainer = styled.div`
  padding: 16px;
  border-bottom: 1px solid rgba(229, 231, 235, 0.09);
`;

export const ProfilePicture = styled.img`
  width: 80px;
  height: 80px;
  border-radius: 50%;
  object-fit: cover;

  @media (max-width: ${breakpoints.tablet}) {
    width: 64px;
    height: 64px;
  }
`;

export const UserInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

export const UserInfoEditGroup = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 16px;

  button {
    height: auto;
    padding: 8px 16px;
    background-color: transparent;
    color: #fff;
    border: 1px solid #fff;
    font-size: 14px;
  }

  @media (max-width: ${breakpoints.tablet}) {
    flex-direction: column;
    align-items: stretch;

    button {
      width: 100%;
    }
  }
`;

export const UserDetails = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const Handle = styled.span`
  font-size: 14px;
  color: #8899a6;
`;

export const Bio = styled.p`
  font-size: 16px;
  color: #fff;
`;

export const Metrics = styled.div`
  display: flex;
  gap: 16px;
  font-size: 15px;
  color: #8899a6;
  padding: 16px 0;

  span {
    display: flex;
    align-items: center;
    gap: 4px;
    transition: color 0.2s ease;

    strong {
      color: #fff;
      font-weight: 700;
      font-size: 16px;
    }

    &:hover {
      color: #1d9bf0;
      cursor: pointer;

      strong {
        color: #1d9bf0;
      }
    }
  }

  @media (max-width: ${breakpoints.tablet}) {
    gap: 12px;
    font-size: 14px;

    span {
      strong {
        font-size: 15px;
      }
    }
  }
`;

export const PostsContainer = styled.div`
  border-bottom: 1px solid rgba(229, 231, 235, 0.09);
  padding: 16px 0;
`;

export const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px;
  border-bottom: 1px solid rgba(229, 231, 235, 0.09);

  h2 {
    font-size: 20px;
    color: #fff;
  }

  i {
    font-size: 24px;
    color: #fff;
    cursor: pointer;
  }
`;

export const ModalContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding: 16px;
  color: #fff;
`;

export const EditProfileLayout = styled.div`
  display: flex;
  gap: 16px;

  @media (max-width: ${breakpoints.tablet}) {
    flex-direction: column;
  }
`;

export const ProfilePreview = styled.div`
  flex: 0 0 120px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
`;

export const ProfilePicturePreview = styled.img`
  width: 120px;
  height: 120px;
  border-radius: 50%;
  object-fit: cover;
  border: 2px solid #1d9bf0;
`;

export const RemoveButton = styled.button`
  background-color: #ff4d4f;
  color: #fff;
  border: none;
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 12px;
  cursor: pointer;

  &:hover {
    background-color: #ff1a1a;
  }
`;

export const EditForm = styled.div`
  flex: 1;
`;

export const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;

  label {
    font-size: 14px;
    color: #e5e7eb;
  }

  input,
  textarea {
    width: 100%;
    padding: 8px;
    border: 1px solid rgba(229, 231, 235, 0.23);
    border-radius: 4px;
    background-color: #15202b;
    color: #fff;
    font-size: 14px;

    &:focus {
      outline: none;
      border-color: #1d9bf0;
    }
  }

  textarea {
    height: 80px;
    resize: none;
  }
`;

export const ButtonGroup = styled.div`
  display: flex;
  gap: 12px;
  justify-content: flex-end;
`;

export const ErrorMessage = styled.p`
  color: #ff4d4f;
  font-size: 14px;
  margin-top: 8px;
`;
