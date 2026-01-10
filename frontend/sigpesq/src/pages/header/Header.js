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
                <NavLink as={Link} to="/participants" className="nav-link">
                  Participants
                </NavLink>
                <NavLink as={Link} to="/participant" className="nav-link">
                  Post Participant
                </NavLink>
              </>
            ) : (
              <>
                <NavLink as={Link} to="/projects" className="nav-link">
                  Projects
                </NavLink>
                <NavLink as={Link} to="/project" className="nav-link">
                  Post Projects
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
