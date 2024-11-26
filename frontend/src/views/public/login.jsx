import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { Url } from "../../config";
import {
  Button,
  Container,
  Footer,
  Form,
  Input,
  LinksContainer,
  LoginCard,
  StyledLink,
  Subtitle,
  Title,
} from "../../style/loginStyled";
const Login = () => {
  const [usuario, setUsuario] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await fetch(`${Url}login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          usuario: usuario,
          password: password,
        }),
      });

      if (!response.ok) {
        throw new Error("Credenciales inválidas. Inténtalo de nuevo.");
      }

      const data = await response.json();
      toast.success(data.message);
      console.log(data);
      navigate("/usuarios");
    } catch (err) {
      console.error(err);
      toast.error("Credenciales inválidas. Inténtalo de nuevo.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container>
      <LoginCard>
        <Title>Inicio de Sesión</Title>
        <Subtitle>Ingrese sus credenciales</Subtitle>

        <Form onSubmit={handleSubmit}>
          <Input
            type="text"
            placeholder="Usuario "
            value={usuario}
            onChange={(e) => setUsuario(e.target.value)}
            required
          />

          <Input
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <Button type="submit" disabled={loading}>
            {loading ? "Autenticando..." : "Iniciar Sesión"}
          </Button>
        </Form>

        <LinksContainer>
          <StyledLink href="#">Recuperar Password contactanos</StyledLink>
        </LinksContainer>

        <Footer>
          Al iniciar sesión, acepta los términos y condiciones de uso
        </Footer>
      </LoginCard>
    </Container>
  );
};

export default Login;
