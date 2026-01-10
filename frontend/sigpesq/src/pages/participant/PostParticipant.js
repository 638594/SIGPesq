
import "./PostParticipant.css";

import { useState } from "react";
import { Button, FloatingLabel, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const PostParticipant = () => {

    const [formData, setFormData] = useState({
        cpf: "",
        nome: "",
        email: "",
        tipo: "DOCENTE"
    })

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData({
            ...formData,
            [name]: value,
        })
    }

    const navigate = useNavigate();

    const handleSubmit = async (e) =>{
        e.preventDefault();

        console.log(formData);

        try {
            const response = await fetch("http://localhost:8080/api/participants",{
                method:"POST",
                headers: {"Content-type": "application/json"},
                body: JSON.stringify(formData)
            });

            const data = await response.json();
            console.log("Participante criado: ", data);
            navigate("/participants")

            
        } catch (error) {
            console.log("Erro ao criar participante: ", error.message);
        }
    }

    return (
        <>
            <div className="center-form">
                <h1>Post New Participant</h1>
                <Form onSubmit={handleSubmit}>
                    <Form.Group controlId="formcpf">
                        <FloatingLabel
                            controlId="floatingcpf"
                            label="CPF do Participante"
                            className="mb-3"
                        >
                            <Form.Control
                                type="text"
                                name="cpf"
                                placeholder="Digite o cpf"
                                value={formData.cpf}
                                onChange={handleInputChange}
                            />
                        </FloatingLabel>
                    </Form.Group>

                    <Form.Group controlId="formNome">
                        <FloatingLabel
                            controlId="floatingNome"
                            label="Nome do Participante"
                            className="mb-3"
                        >
                            <Form.Control
                                type="text"
                                name="nome"
                                placeholder="Digite o nome do participante"
                                value={formData.nome}
                                onChange={handleInputChange}
                            />
                        </FloatingLabel>
                    </Form.Group>

                    <Form.Group controlId="formEmail">
                        <FloatingLabel
                            controlId="floatingEmail"
                            label="Email do participante"
                            className="mb-3"
                        >
                            <Form.Control
                                type="email"
                                name="email"
                                placeholder="Digite a email do participante"
                                value={formData.email}
                                onChange={handleInputChange}
                            />
                        </FloatingLabel>
                    </Form.Group>

                    
                        <FloatingLabel controlId="floatingTipo" label="Tipo participante" className="mb-3">
                        <Form.Select
                            name="tipo"
                            value={formData.tipo}
                            onChange={handleInputChange}
                        >
                            <option value="DOCENTE">Docente</option>
                            <option value="DISCENTE">Discente</option>
                            <option value="TECNICO">Tecnico</option>
                        </Form.Select>
                    </FloatingLabel>
             

                    <Button variant="primary" type="submit" className="w-100 mt-3">
                        Criar Participante
                    </Button>
                </Form>
            </div>
        </>
    )
}

export default PostParticipant