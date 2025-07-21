import styled from "styled-components";

export const Background = styled.div`
  width: 100%;
  background-color: #15202b;
`;

export const Container = styled.div`
  display: flex;
  width: 1424px;
  margin: 0 auto;
`;

export const Content = styled.div`
  width: 600px;
`;

export const ContentHeader = styled.div`
  position: sticky;
  width: 100%;
  height: 40px;
  padding: 16px;

  h2 {
    font-size: 20px;
    font-weight: 600;
    color: #fff;
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
    border: none;
    resize: none;

    &::placeholder {
      font-size: 18px;
    }
  }
`;

export const NewPostTools = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

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
  }
`;
