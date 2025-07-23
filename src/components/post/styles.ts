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
    color: #fff;

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

export const PostActionItem = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;

  i {
    color: #6b7280;
  }

  p {
    color: #6b7280;
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
