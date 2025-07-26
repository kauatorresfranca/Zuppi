import styled from "styled-components";
import { breakpoints } from "../../../styles";

export const Content = styled.div`
  position: relative;
  z-index: 100;
  padding-top: 48px;
  width: 600px;

  @media (max-width: ${breakpoints.tablet}) {
    width: 100%;
    padding: 8px;
  }
`;

export const ContentHeader = styled.div`
  display: flex;
  align-items: center;
  position: fixed;
  top: 0;
  width: 560px;
  height: 40px;
  padding: 24px 16px;
  background-color: rgba(21, 32, 43, 0.87);
  backdrop-filter: blur(5px);
  z-index: 2000;

  h2 {
    font-size: 20px;
    font-weight: 600;
    color: #fff;
  }

  @media (max-width: ${breakpoints.tablet}) {
    left: 66px;
  }
`;

export const NewPostField = styled.div`
  height: 120px;
  padding: 16px;
  display: flex;
  flex-direction: column;
  border-bottom: 1px solid rgba(229, 231, 235, 0.09);

  textarea {
    padding-bottom: 46px;
    background-color: transparent;
    font-size: 16px;
    color: #fff;
    border: none;
    resize: none;
    outline: 0;
    overflow: hidden;

    &::placeholder {
      font-size: 18px;
    }
  }
`;

export const NewPostTools = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 8px;

  button {
    width: 80px;
  }
`;

export const IconList = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;

  i {
    font-size: 16px;
    color: #1d9bf0;

    &:hover {
      cursor: pointer;
    }
  }
`;

export const ErrorMessage = styled.p`
  color: #ff4d4f;
  font-size: 14px;
  margin-top: 8px;
`;
