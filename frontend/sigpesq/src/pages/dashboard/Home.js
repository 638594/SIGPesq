import React from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="home-page">
      {/* Hero Section */}
      <div className="bg-primary text-white text-center py-5 mb-5 shadow">
        <Container>
          <h1 className="display-3 fw-bold">SIGPesq</h1>
          <p className="lead">
            Sistema Integrado de Gestão de Pesquisas Científicas
          </p>
          <hr className="my-4 border-light" />
          <p>
            Plataforma centralizada para cadastro, monitoramento e divulgação de 
            produções acadêmicas e projetos de pesquisa.
          </p>
        </Container>
      </div>

      <Container>
        <Row className="mb-5">
          <Col md={12} className="text-center mb-4">
            <h2>Funcionalidades do Sistema</h2>
            <p className="text-muted">Gerencie o ciclo completo da sua pesquisa científica.</p>
          </Col>
        </Row>

        {/* ✅ A mágica acontece aqui: justify-content-center alinha os cards ao centro */}
        <Row className="justify-content-center">
          
          {/* Card 1 - Projetos */}
          <Col md={5} lg={4} className="mb-4">
            <Card className="h-100 shadow-sm border-0 text-center">
              <Card.Body className="d-flex flex-column">
                <div className="display-4 mb-3 text-primary">📁</div>
                <Card.Title className="fw-bold">Gestão de Projetos</Card.Title>
                <Card.Text>
                  Cadastre e acompanhe projetos de pesquisa, definindo prazos, 
                  objetivos e situações atuais (Em Andamento, Concluído, etc).
                </Card.Text>
                <Button 
                  variant="primary" 
                  className="mt-auto" 
                  onClick={() => navigate("/projects")}
                >
                  Ver Projetos
                </Button>
              </Card.Body>
            </Card>
          </Col>

          {/* Card 2 - Produções Científicas */}
          <Col md={5} lg={4} className="mb-4">
            <Card className="h-100 shadow-sm border-0 text-center">
              <Card.Body className="d-flex flex-column">
                <div className="display-4 mb-3 text-success">📄</div>
                <Card.Title className="fw-bold">Produções Científicas</Card.Title>
                <Card.Text>
                  Registre artigos, teses e congressos. Vincule cada produção ao 
                  seu respectivo projeto e acompanhe o ano de publicação.
                </Card.Text>
                <Button 
                  variant="success" 
                  className="mt-auto"
                  onClick={() => navigate("/producoes")}
                >
                  Listar Produções
                </Button>
              </Card.Body>
            </Card>
          </Col>

        </Row>
      </Container>

      <footer className="text-center py-4 bg-light mt-5">
        <p className="text-muted mb-0">© 2026 SIGPesq - Todos os direitos reservados.</p>
      </footer>
    </div>
  );
};

export default Home;