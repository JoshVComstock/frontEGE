import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { Url } from "../../config";
import { data } from "../../data/usuario";
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
import { UserContext } from "../../context/useContext";
const Login = () => {
  const [usuario, setUsuario] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { loginUser } = useContext(UserContext);
  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    const foundUser = data.usuarios.find(
      (user) => user.usuario === usuario && user.password === password
    );

    if (foundUser) {
      loginUser(foundUser);
      toast.success("Inicio de sesión exitoso");
      navigate(
        foundUser.rol == "secretaria"
          ? "/inicio"
          : foundUser.rol == "padre"
          ? "/inicio-padre"
          : "/inicio-docente"
      );
    } else {
      toast.error("Credenciales inválidas. Inténtalo de nuevo.");
    }

    setLoading(false);
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
