import styled from "styled-components";
import { breakpoints } from "../../../styles";

export const Container = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  padding: 16px;
  border-bottom: 1px solid rgba(229, 231, 235, 0.09);

  .more {
    position: absolute;
    top: 16px;
    right: 8px;
    color: #1d9bf0;

    &:hover {
      cursor: pointer;
    }
  }
`;

export const PostData = styled.div`
  display: flex;
  padding-bottom: 16px;

  i {
    font-size: 18px;
    padding: 16px;
    background-color: #e5e7eb;
    border-radius: 50%;
  }

  .description {
    font-size: 14px;
    color: #e5e7eb;
  }

  @media (max-width: ${breakpoints.tablet}) {
    padding-bottom: 12px;
  }
`;

export const ProfilePicture = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  object-fit: cover;
  margin-right: 10px;
`;

export const PostDataContent = styled.div`
  padding-left: 16px;
`;

export const PostUser = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  padding-bottom: 16px;

  h2 {
    font-size: 14px;
    color: #e5e7eb;
  }

  p {
    color: #6b7280;
    font-size: 12px;
  }

  @media (max-width: ${breakpoints.tablet}) {
    padding-bottom: 12px;
  }
`;

export const PostActionsList = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-left: 64px;
`;

export const PostActionItem = styled.div<{ $isActive?: boolean }>`
  display: flex;
  align-items: center;
  gap: 6px;

  i {
    color: ${(props) => (props.$isActive ? "#1d9bf0" : "#6b7280")};
  }

  p {
    color: ${(props) => (props.$isActive ? "#1d9bf0" : "#6b7280")};
  }

  &:hover {
    i {
      cursor: pointer;
      color: #1d9bf0;
    }

    p {
      cursor: pointer;
      color: #1d9bf0;
    }
  }
`;

export const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px;
  border-bottom: 1px solid rgba(229, 231, 235, 0.09);

  h2 {
    color: #1d9bf0;
    font-size: 18px;
  }

  i {
    color: #1d9bf0;
    font-size: 24px;
    cursor: pointer;
  }
`;

export const ModalContent = styled.div`
  padding: 16px;
`;

export const CommentInput = styled.textarea`
  width: 100%;
  min-height: 60px;
  padding: 8px;
  border: 2px solid #b7bbc4ff;
  border-radius: 8px;
  background-color: transparent;
  color: #000;
  resize: none;
  margin-bottom: 6px;

  &:focus {
    outline: none;
    border-color: #1d9bf0;
  }
`;

export const CommentButton = styled.button<{ disabled?: boolean }>`
  width: 100%;
  padding: 12px;
  background-color: ${(props) => (props.disabled ? "#6b7280" : "#1d9bf0")};
  color: #fff;
  border: none;
  border-radius: 8px;
  cursor: ${(props) => (props.disabled ? "not-allowed" : "pointer")};
  margin-bottom: 10px;
  margin-left: auto;
  margin-right: auto;

  &:hover {
    background-color: ${(props) => (props.disabled ? "#6b7280" : "#1a8cd8")};
  }
`;

export const ErrorMessage = styled.p`
  color: #ef4444;
  font-size: 12px;
  margin-bottom: 10px;
`;

export const CommentList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-bottom: 10px;
`;

export const CommentItem = styled.div`
  display: flex;
  flex-direction: column;
  padding: 12px;
  border: 1px solid #b7bbc4ff;
  border-radius: 8px;
`;

export const CommentAuthor = styled.span`
  font-size: 16px;
  font-weight: bold;
  color: #000000ff;
`;

export const CommentText = styled.p`
  font-size: 14px;
  color: #363a3dff;
  margin: 4px 0;
`;

export const CommentDate = styled.span`
  font-size: 12px;
  color: #6b7280;
`;