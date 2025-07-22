import styled from "styled-components";

export const SideBar = styled.div`
  width: 300px;
  height: 100vh;
  background-color: #15202b;
  padding-top: 16px;
  padding-left: 48px;
  padding-right: 12px;
  border-right: 1px solid rgba(229, 231, 235, 0.23);
  position: fixed;
  top: 0;
  left: calc(50% - 600px);
  z-index: 1000;

  .logo {
    color: #1d9bf0;
  }
`;

export const MenuList = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 100%;
  list-style: none;
`;

export const MenuItem = styled.li`
  display: flex;
  align-items: center;
  gap: 12px;
  width: 100%;
  padding: 8px 0 8px 6px;
  border-radius: 20px;
  color: #fff;
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
    color: #e5e7eb;
    font-weight: 600;
  }
`;
