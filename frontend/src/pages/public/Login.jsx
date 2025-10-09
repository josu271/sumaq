import { Container, Form, Button, Card } from "react-bootstrap";
import "../../assets/styles/pages/public/Login.scss";

function Login() {
  return (
    <Container className="login-container py-5 d-flex justify-content-center">
      <Card className="shadow p-4 login-card">
        <Card.Body>
          <h3 className="text-center mb-4">Iniciar Sesión</h3>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Correo Electrónico</Form.Label>
              <Form.Control type="email" placeholder="Ingrese su correo" />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Contraseña</Form.Label>
              <Form.Control type="password" placeholder="Ingrese su contraseña" />
            </Form.Group>
            <div className="d-grid">
              <Button className="btn-sumaq" type="submit">Ingresar</Button>
            </div>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
}

export default Login;
