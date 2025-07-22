import styled from "styled-components";

export const Discover = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  border-left: 1px solid rgba(229, 231, 235, 0.23);
  padding-top: 8px;
  padding-left: 16px;
`;

export const SearchContainer = styled.div`
  position: relative;
  display: flex;
  align-items: center;

  i {
    position: absolute;
    left: 10px;
    color: #fff;
    font-size: 16px;
    font-weight: 500;
  }

  input {
    background-color: rgb(32, 41, 58);
    border: none;
    border-radius: 20px;
    padding: 10px 10px 10px 32px;
    width: 100%;
    font-size: 16px;
    color: #fff;

    &::placeholder {
      color: #6b7280;
      font-size: 16px;
      font-weight: 500;
    }

    &:focus {
      outline: none;
    }
  }
`;

export const Subscribe = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  width: 320px;
  background-color: rgb(32, 41, 58);
  padding: 24px 16px;
  border-radius: 15px;

  h3 {
    font-size: 20px;
    font-weight: bold;
    color: #fff;
  }

  p {
    font-size: 14px;
    color: #6b7280;
    line-height: 20px;
  }

  button {
    width: 140px;
  }
`;

export const Happening = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
  width: 320px;
  background-color: rgb(32, 41, 58);
  padding: 24px 16px;
  border-radius: 15px;

  h2 {
    font-size: 20px;
    font-weight: bold;
    color: #fff;
  }
`;

export const HappeningList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

export const HappeningItem = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;

  p {
    color: #6b7280;
    font-size: 14px;
  }

  h3 {
    color: #fff;
    font-size: 16px;
    font-weight: 600;
  }
`;

export const ToFollow = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
  width: 320px;
  background-color: rgb(32, 41, 58);
  padding: 24px 16px;
  border-radius: 15px;

  h2 {
    font-size: 20px;
    font-weight: bold;
    color: #fff;
  }
`;

export const ToFollowList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

export const ToFollowItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  i {
    font-size: 18px;
    padding: 16px;
    background-color: #e5e7eb;
    border-radius: 50%;
  }

  button {
    background-color: #e5e7eb;
    color: #000;
    width: 90px;
  }
`;

export const ToFollowItemInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

export const ToFollowItemName = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;

  h3 {
    color: #fff;
    font-size: 16px;
    font-weight: 600;
  }

  p {
    color: #6b7280;
    font-size: 14px;
    font-weight: 500;
  }
`;
