import { Container, Row, Col } from "react-bootstrap";
import "../../assets/styles/pages/public/About.scss";
import Artesanos from "../../assets/images/public/artesanos.jpg";

function About() {
  return (
    <Container className="about-container py-5">
      <Row>
        <Col md={6}>
          <img
            src={Artesanos}
            alt="Artesanos"
            className="img-fluid rounded-4 shadow"
          />
        </Col>
        <Col md={6} className="d-flex flex-column justify-content-center">
          <h2>Sobre Nosotros</h2>
          <p>
            En <strong>Sumaq</strong> unimos tecnología y tradición. 
            Ayudamos a los artesanos a optimizar su producción y preservar su arte.
          </p>
          <p>
            Nuestro sistema usa Machine Learning para predecir la demanda y 
            apoyar la sostenibilidad de las comunidades.
          </p>
        </Col>
      </Row>
    </Container>
  );
}

export default About;
