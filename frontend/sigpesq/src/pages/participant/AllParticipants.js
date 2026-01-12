import { useEffect, useState } from "react";
import { Alert, Button, Col, Container, Row, Table } from "react-bootstrap";
import { useNavigate } from "react-router-dom";


const AllParticipants = () => {

    const [participants, setParticipants] = useState([]);
    const [errorMsg, setErrorMsg] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        const fetchParticipants = async () => {
            try {
                const response = await fetch("http://localhost:8080/api/participants");
                const data = await response.json();

                setParticipants(data)
            } catch (error) {
                console.error("Error fetching participants:", error.message);
            }
        }

        fetchParticipants();

    }, []);

    const handleDelete = async (participantCpf) => {
        setErrorMsg("");
        try {
            const response = await fetch(`http://localhost:8080/api/participants/${participantCpf}`,{
                 method:"DELETE",
            });

            if(response.ok){
                setParticipants((prevParticipant) =>
                    prevParticipant.filter((participant) => participant.cpf !== participantCpf)
                );
                console.log(`Participant com cpf ${participantCpf} deletado com sucesso.`);
            }else if(response.status === 500){
                setErrorMsg("Não é possível excluir este participante porque ele está vinculado a uma equipe de projeto.");
            }else{
                setErrorMsg("Ocorreu um erro ao tentar excluir o participante.");
            }

            
        } catch (error) {
            setErrorMsg("Erro de conexão com o servidor.")
            console.error("Error ao deletar participant:", error.message);
        }
    }

    const handleUpdate = (participantCpf) => {
        navigate(`/participant/${participantCpf}`)
    }

    return (
        <>
            <Container className="mt-5">
                <Row>
                    <Col>
                        <h1 className="text-center">Participants</h1>
                        {/* 3. Exibição do Alerta caso exista uma mensagem de erro */}
                    {errorMsg && (
                        <Alert variant="danger" onClose={() => setErrorMsg("")} dismissible>
                            {errorMsg}
                        </Alert>
                    )}
                        <Table>
                            <thead>
                                <tr>
                                    <th>Cpf</th>
                                    <th>Nome</th>
                                    <th>Email</th>
                                    <th>Tipo</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {participants.map((participant) => (
                                    <tr key={participant.cpf}>
                                        <td>{participant.cpf}</td>
                                        <td>{participant.nome}</td>
                                        <td>{participant.email}</td>
                                        <td>{participant.tipo}</td>
                                        <td>
                                            <Button variant="outline-secondary" onClick={() => handleUpdate(participant.cpf)}>Update</Button>
                                            <Button variant="outline-danger" onClick={() => handleDelete(participant.cpf)}>Delete</Button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                    </Col>
                </Row>
            </Container>
        </>
    )
}


export default AllParticipants;