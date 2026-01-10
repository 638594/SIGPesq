import { useEffect, useState } from 'react';
import './PostProject.css'
import { Alert, Button, FloatingLabel, Form } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';

const UpdateProject = () => {

    const navigate = useNavigate();

    const {codProjeto} = useParams();

    const [errorMsg, setErrorMsg] = useState("");

    const [formData, setFormData] = useState({
        titulo: "",
        descricao: "",
        dataTermino: "",
        situacao: ""
    });



    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const today = new Date().toISOString().split("T")[0];

    useEffect(() => {
        const fetchProject = async () => {
            try {
                const response = await fetch(`http://localhost:8080/api/projects/${codProjeto}`)
                const data = await response.json();
                setFormData(data);
            } catch (error) {
                console.error("Error fetching project: ", error.message);

            }
        }
        fetchProject();
    }, [codProjeto])

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrorMsg("");

        try {
            const response = await fetch(`http://localhost:8080/api/projects/${codProjeto}`, {
                method: 'PATCH',
                headers:{
                    "Content-type": "application/json",
                },
                body: JSON.stringify(formData),
            });

            const data = await response.json();
            console.log("Project updated", data);

            navigate("/projects")
        } catch (error) {
            console.error("Erro ao editar projeto:", error.message);
            
        }
    }

    return (
        <>
            <div className="center-form">
                <h1>Editar Projeto</h1>
                {/* Exibe o alerta de erro se houver uma mensagem */}
                {errorMsg && (
                    <Alert variant="danger" onClose={() => setErrorMsg("")} dismissible>
                        {errorMsg}
                    </Alert>
                )}
                <Form onSubmit={handleSubmit}>


                    <Form.Group controlId="formTitulo">
                        <FloatingLabel
                            controlId="floatingTitulo"
                            label="Titulo do Projeto"
                            className="mb-3"
                        >
                            <Form.Control
                                type="text"
                                name="titulo"
                                placeholder="Digite o titulo do projeto"
                                value={formData.titulo}
                                onChange={handleInputChange}
                            />
                        </FloatingLabel>
                    </Form.Group>

                    <Form.Group controlId="formDescricao">
                        <FloatingLabel
                            controlId="floatingDescricao"
                            label="Descricao do Projeto"
                            className="mb-3"
                        >
                            <Form.Control
                                type="text"
                                name="descricao"
                                placeholder="Digite a descricao do projeto"
                                value={formData.descricao}
                                onChange={handleInputChange}
                            />
                        </FloatingLabel>
                    </Form.Group>

                    <Form.Group controlId="formDataTermino">
                        <FloatingLabel
                            controlId="floatingDate"
                            label="Data do término do projeto"
                            className="mb-3"
                        >
                            <Form.Control
                                type="date"
                                name="dataTermino"
                                min={today}
                                value={formData.dataTermino}
                                onChange={handleInputChange}
                            />
                        </FloatingLabel>
                    </Form.Group>

                    <FloatingLabel controlId="floatingSituacao" label="Situação do Projeto" className="mb-3">
                        <Form.Select
                            name="situacao"
                            value={formData.situacao}
                            onChange={handleInputChange}
                        >
                            <option value="EM_ANDAMENTO">Em Andamento</option>
                            <option value="CONCLUIDO">Concluído</option>
                            <option value="CANCELADO">Cancelado</option>
                        </Form.Select>
                    </FloatingLabel>


                    <Button variant="primary" type="submit" className="w-100 mt-3">
                        Editar Projeto
                    </Button>
                </Form>
            </div>
        </>
    )
}


export default UpdateProject;