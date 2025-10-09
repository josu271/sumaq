import { Container, Button } from "react-bootstrap";
import "../../assets/styles/pages/public/Home.scss";

function Home() {
  return (
    <div className="home-hero">
      <Container>
        <h1>Machine Learning para Artesanos</h1>
        <p>
          Impulsamos la artesanía peruana con inteligencia artificial. 
          Evita el desabasto o la sobreproducción mediante predicciones inteligentes.
        </p>
        <Button className="btn-sumaq mt-3">Conoce más</Button>
      </Container>
    </div>
  );
}

export default Home;
