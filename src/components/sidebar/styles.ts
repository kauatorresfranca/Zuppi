import styled from "styled-components";

export const SideBar = styled.div`
  width: 300px;
  height: 100vh;
  background-color: #15202b;
  padding-top: 16px;
  padding-left: 48px;
  padding-right: 12px;
  border-right: 1px solid rgba(229, 231, 235, 0.23);

  h1 {
    display: flex;

    i {
      color: #1d9bf0;
    }
  }
`;

export const MenuList = styled.ul`
  display: flex;
  flex-direction: column;
  width: 100%;
  list-style: none;
`;

export const MenuItem = styled.li`
  display: flex;
  align-items: center;
  gap: 12px;
  height: 40px;
  width: 100%;
  padding: 4px 0 4px 6px;
  border-radius: 20px;
  color: #fff;
  margin-bottom: 6px;
  transition: 0.3s ease;

  &:hover {
    cursor: pointer;
    background-color: rgba(160, 163, 168, 0.34);
  }

  i {
    color: #e5e7eb;
    font-size: 28px;
  }

  h4 {
    font-weight: 500;
  }
`;
