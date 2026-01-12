import { useEffect, useState } from "react";
import "./UpdateParticipant.css"
import { Button, FloatingLabel, Form } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";

const UpdateParticipant = () => {

    const {cpf} = useParams();

    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        nome: "",
        email: "",
    })

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData({
            ...formData,
            [name]: value,
        })
    }

    useEffect(() => {
        const fetchParticipant = async () =>{
            try {
                const response = await fetch(`http://localhost:8080/api/participants/${cpf}`)
                const data = await response.json();
                setFormData(data);
            } catch (error) {
                console.error("Error fetching participant:", error.message);
            }
        }

        fetchParticipant();
    }, [cpf])

    const handleSubmit = async (e) =>{
        e.preventDefault();
        try {
            const response = await fetch(`http://localhost:8080/api/participants/${cpf}`,{
                method: "PATCH",
                headers:{"Content-Type": "application/json"},
                body: JSON.stringify(formData),
            });

            const data = await response.json();
            console.log("Participante Editado com Sucesso: ", data);

            navigate(`/participants`)

        } catch (error) {
            console.error("Erro ao editar participante:", error.message);
        }
    }

    return (
         <>
            <div className="center-form">
                <h1>Edit Participant</h1>
                <Form onSubmit={handleSubmit}>
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

                    <Form.Group controlId="formTipo">
                        <FloatingLabel controlId="floatingTipo" label="Tipo participante" className="mb-3">
                            <Form.Control
                                type="text"
                                value={formData.tipo}
                                disabled
                                readOnly
                            />
                        </FloatingLabel>
                    </Form.Group>
                    <Button variant="primary" type="submit" className="w-100 mt-3">
                        Editar Participante
                    </Button>
                </Form>
            </div>
        </>
    )
}

export default UpdateParticipant