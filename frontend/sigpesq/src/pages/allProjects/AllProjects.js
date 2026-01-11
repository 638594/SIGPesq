import { useEffect, useState } from "react"
import { Button, Col, Container, Row, Table } from "react-bootstrap";
import { useNavigate } from "react-router-dom";


const AllProjects = () => {

    const [projects, setProjects] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchProjects = async () => {
            try {
                const response = await fetch("http://localhost:8080/api/projects");
                const data = await response.json();

                setProjects(data);
            } catch (error) {
                console.error("Error fetching projects", error.message);
            }
        }


        fetchProjects();

    }, []);


    const handleDelete = async (projectId) => {
        try {
            const response = await fetch(`http://localhost:8080/api/projects/${projectId} `, {
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
                    <Table striped bordered hover responsive>
                        <thead>
                            <tr>
                                <th>CodProjeto</th>
                                <th>Titulo</th>
                                <th>Descricao</th>
                                <th>DataInicio</th>
                                <th>DataTermino</th>
                                <th>Situacao</th>
                                <th>coordenadorCpf</th>
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
                                    <td>{project.coordenador?.cpf}</td>
                                    <td>
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