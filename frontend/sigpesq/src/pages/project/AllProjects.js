import { useEffect, useState } from "react"
import { Button, Col, Container, FormControl, InputGroup, Row, Table } from "react-bootstrap";
import { useNavigate } from "react-router-dom";


const AllProjects = () => {

    const [searchTerm, setSearchTerm] = useState("");   
    const [projects, setProjects] = useState([]);
    const navigate = useNavigate();


    const fetchProjects = async (query = "") => {
        try {
            const url = query
                ? `http://localhost:8080/api/projects?termo=${encodeURIComponent(query)}`
                : "http://localhost:8080/api/projects";
            const response = await fetch(url);
            const data = await response.json();
            setProjects(data);
        } catch (error) {
            console.error("Erro ao buscar projetos: ", error.message);
        }
    }
    useEffect(() => {
       
        const delayDebounce = setTimeout(() => {
            fetchProjects(searchTerm);
        }, 500);

        return () => clearTimeout(delayDebounce);

    }, [searchTerm]);


    const handleDelete = async (projectId) => {
        try {
            const response = await fetch(`http://localhost:8080/api/projects/${projectId}`, {
                method: "DELETE",

            });
            if (response.ok) {
                setProjects((prevProjects) =>
                    prevProjects.filter((project) => project.codProjeto !== projectId)
                )
            }


            console.log(`Projeto com codigo ${projectId} deletado com sucesso.`);


        } catch (error) {
            console.error("Erro ao deletar o projeto.", error.message);
        }
    }

    const handleUpdate = (projectId) => {
        navigate(`/projects/${projectId}`);
    }


  

    return (
        <Container className="mt-5">
            <Row>
                <Col>
                    <h1 className="text-center">Projects</h1>

                    {/*Barra de pesquisa */}
                    <InputGroup>
                        <InputGroup.Text id="basic-addon1">🔍</InputGroup.Text>
                        <FormControl
                            placeholder="Buscar por titulo do projeto ou nome do coordenador"
                            arial-label="Search"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </InputGroup>
                    <Table striped bordered hover responsive>
                        <thead>
                            <tr>
                                <th>CodProjeto</th>
                                <th>Titulo</th>
                                <th>Descricao</th>
                                <th>DataInicio</th>
                                <th>DataTermino</th>
                                <th>Situacao</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {projects.map((project) => (
                                <tr key={project.codProjeto}>
                                    <td>{project.codProjeto}</td>
                                    <td>{project.titulo}</td>
                                    <td>{project.descricao}</td>
                                    <td>{project.dataInicio}</td>
                                    <td>{project.dataTermino}</td>
                                    <td>{project.situacao}</td>
                                    <td>
                                        <Button variant="outline-primary" onClick={()=> navigate(`/projects/${project.codProjeto}/team`)}>Equipe</Button>
                                        <Button variant="outline-secondary" onClick={() => handleUpdate(project.codProjeto)}>Update</Button>
                                        <Button variant="outline-danger" onClick={() => handleDelete(project.codProjeto)}>Delete</Button>
                                    </td>

                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </Col>
            </Row>
        </Container>
    )
}

export default AllProjects