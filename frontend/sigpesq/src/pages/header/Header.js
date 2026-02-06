import { Container, Nav, Navbar } from "react-bootstrap";
import { NavLink, Link, useLocation } from "react-router-dom";
import "./Header.css";

const Header = () => {

  const location = useLocation();

  // Criamos uma variável booleana para facilitar a leitura
  // Ela verifica se a URL atual contém a palavra "participant"
  const isParticipantPage = location.pathname.includes("participant");

  return (
    <>
      <Navbar bg="primary" variant="dark">
        <Container>
          <Navbar.Brand as={Link} to="/">
            <strong>SIGPesq</strong>
          </Navbar.Brand>
          <Nav className="ml-auto">
            {isParticipantPage ? (
              <>
                <NavLink as={Link} to="/producao" className="nav-link">
                Criar producao</NavLink>
                <NavLink as={Link} to="/producoes" className="nav-link">
                Producoes</NavLink>
                <NavLink as={Link} to="/participants" className="nav-link">
                  Participants
                </NavLink>
                <NavLink as={Link} to="/participant" className="nav-link">
                  Criar Participante
                </NavLink>
                <NavLink as={Link} to="/producoes/consulta-ano" className="nav-link">
                  Consultar Produção por Ano
                </NavLink>
              </>
            ) : (
              <>
              <NavLink as={Link} to="/participants" className="nav-link">
                  Participants
                </NavLink>
                <NavLink as={Link} to="/participant" className="nav-link">
                  Criar Participante
                </NavLink>
                <NavLink as={Link} to="/producao" className="nav-link">
                Criar producao</NavLink>
                <NavLink as={Link} to="/producoes" className="nav-link">
                Producoes</NavLink>
                <NavLink as={Link} to="/projects" className="nav-link">
                  Projetos
                </NavLink>
                <NavLink as={Link} to="/project" className="nav-link">
                  Criar Projetos
                </NavLink>
                <NavLink as={Link} to="/financiamentos" className="nav-link">
                  Financiamentos
                </NavLink>
                <NavLink as={Link} to="/financiamento" className="nav-link">
                  Criar Financiamentos
                </NavLink>
                  <NavLink as={Link} to="/producoes/consulta-ano" className="nav-link">
                  Consultar Produção por Ano
                </NavLink>
              </>
            )}

          </Nav>
        </Container>
      </Navbar>
    </>
  );
};

export default Header;
