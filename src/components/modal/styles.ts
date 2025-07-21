import styled from "styled-components";

export const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

export const Container = styled.div`
  position: relative;
  background-color: white;
  padding: 24px;
  border-radius: 8px;
  max-width: 500px;
  width: 100%;

  form {
    display: flex;
    flex-direction: column;
    gap: 8px;
    margin-top: 12px;

    p {
      font-size: 11px;
      color: #5d6468;
      text-align: center;

      span {
        color: #1d9bf0;
        cursor: pointer;
      }
    }
  }

  i {
    position: absolute;
    top: 24px;
    right: 24px;
    font-size: 22px;

    &:hover {
      cursor: pointer;
    }
  }
`;
