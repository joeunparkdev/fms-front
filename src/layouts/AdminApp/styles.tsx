import { Link } from "react-router-dom";
import styled from "styled-components";

export const PageContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f5f5f5;
  gap: 0.5rem;
`;

export const Menu = styled.nav`
  width: 10%;
  height: 90%;
  background-color: white;
  padding: 2rem;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const MenuItem = styled.p`
  margin: 0.5rem 0;
  font-size: 0.9rem;
  cursor: pointer;
`;

export const Card = styled.div`
  width: 80%;
  height: 90%;
  background-color: white;
  padding: 2rem;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const StyledLink = styled(Link)`
  color: #445664;
  text-decoration: none;

  &:hover {
    text-decoration: none;
  }
`;

export const ErrorContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 20px;
`;

export const ErrorMessage = styled.p`
  color: #000;
  text-align: center;
`;
