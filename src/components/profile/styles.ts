import styled from "styled-components";
import { breakpoints } from "../../../styles";

export const Content = styled.div`
  position: relative;
  z-index: 10000;
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
  align-items: center;
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
