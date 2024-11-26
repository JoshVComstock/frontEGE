import styled, { keyframes } from "styled-components";

export const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
`;

export const ErrorMessage = styled.div`
  color: #f95738;
  background: #f4a261;
  padding: 0.5rem;
  border-radius: 0.5rem;
  text-align: center;
  margin-bottom: 1rem;
  font-size: 0.875rem;
`;

export const Container = styled.div`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem;
  background: linear-gradient(135deg, #e9c46a 0%, #ee964b 100%);
`;

export const LoginCard = styled.div`
  width: 100%;
  max-width: 400px;
  background: #fff;
  backdrop-filter: blur(15px);
  border-radius: 1rem;
  box-shadow: 0 10px 25px rgba(0,0,0,0.1);
  padding: 2rem;
  animation: ${fadeIn} 0.6s ease-out;
  border: 1px solid rgba(0,0,0,0.1);
`;

export const Title = styled.h1`
  text-align: center;
  font-size: 2rem;
  font-weight: 500;
  color: #e76f51;
  margin-bottom: 0.5rem;
  letter-spacing: 0.05em;
`;

export const Subtitle = styled.p`
  text-align: center;
  font-size: 0.875rem;
  color: #000000;
  margin-bottom: 2rem;
  letter-spacing: 0.025em;
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

export const Input = styled.input`
  width: 100%;
  padding: 0.75rem 1rem;
  border: 1px solid #e76f51;
  border-radius: 0.5rem;
  background: #ffffff;
  color: #000000;
  transition: all 0.2s;

  &:focus {
    outline: none;
    box-shadow: 0 0 0 1px #f4a261;
  }

  &::placeholder {
    color: #ee964b;
  }
`;

export const Button = styled.button`
  width: 100%;
  padding: 0.75rem;
  background: #e76f51;
  color: #ffffff;
  border: none;
  border-radius: 0.5rem;
  font-weight: 500;
  cursor: pointer;
  transition: background 0.2s;

  &:hover {
    background: #e76f51;
  }

  &:disabled {
    background: #ee964b;
    cursor: not-allowed;
  }
`;

export const LinksContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 1rem;
`;

export const StyledLink = styled.a`
  font-size: 0.875rem;
  color: #000000;
  text-decoration: none;
  transition: color 0.2s;

  
`;

export const Footer = styled.p`
  text-align: center;
  font-size: 0.75rem;
  color: #000000;
  margin-top: 2rem;
`;
