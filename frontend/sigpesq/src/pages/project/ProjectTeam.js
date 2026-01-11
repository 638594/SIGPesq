import { useCallback, useEffect, useState } from "react";
import { Alert, Button, Col, Container, Form, Row, Table, } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom"


const ProjectTeam = () => {

    const { codProjeto } = useParams();
    const [team, setTeam] = useState([]);
    const [errorMsg, setErrorMsg] = useState("");
    const [newMember, setNewMember] = useState({
        participanteCpf: "",
        funcao: "Bolsista",
        dataEntrada: new Date().toISOString().split("T")[0]
    });

    const navigate = useNavigate();


    const fetchTeam = useCallback(async () => {
        try {
            const response = await fetch(`http://localhost:8080/api/vinculos/projeto/${codProjeto}`);
            const data = await response.json();
            setTeam(Array.isArray(data) ? data : []);
        } catch (error) {
            console.error("Error ao buscar equipe", error);
        }
    }, [codProjeto]);

    useEffect(() => {
        fetchTeam();
    }, [fetchTeam]);

    const handleAddMember = async (e) => {
        e.preventDefault();
        setErrorMsg("");

        const vinculoToSave = {
            funcao: newMember.funcao,
            dataEntrada: newMember.dataEntrada,
            project: { codProjeto: codProjeto },
            participant: { cpf: newMember.participanteCpf }
        };

        try {
            const response = await fetch(`http://localhost:8080/api/vinculos`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(vinculoToSave)
            });

            if (response.ok) {
                setNewMember({ ...newMember, participanteCpf: "" });
                fetchTeam(); // Atualiza a lista
            } else {
                const error = await response.json();
                setErrorMsg(error.message || "Error ao adcionar membro.");
            }
        } catch (error) {
            setErrorMsg("Erro de conexao com o servidor.");
        }
    }

    const handleDeleteMember = async (id) => {
        if (window.confirm("Deseja realmente remover este participante da equipe?")) {
            try {
                const response = await fetch(`http://localhost:8080/api/vinculos/${id}`, {
                    method: "DELETE",
                });

                if (response.ok) {
                    // Atualiza a lista localmente para o membro desaparecer da tabela   
                    setTeam((prevTeam) => prevTeam.filter((vinc) => vinc.id !== id));
                } else {
                    const error = await response.json();
                    setErrorMsg(error.message || "Error ao remover membro.");
                }
            } catch (error) {
                setErrorMsg("Error de conexao com servidor.");
            }
        }
    }
    return (
        <Container>
            <h2>Equipe do Projeto: {codProjeto}</h2>
            {errorMsg && <Alert variant="danger">{errorMsg}</Alert>}
            <Button variant="secondary" onClick={() => navigate("/projects")}>
                Voltar para Projetos
            </Button>
            {/*Formulario para Adicionar Membro */}
            <Form onSubmit={handleAddMember} className="mb-4 p-3 border rounded bg-light">
                <Row>

                    <Col md={4}>
                        <Form.Control
                            placeholder="CPF do Participante"
                            value={newMember.participanteCpf}
                            onChange={(e) => setNewMember({ ...newMember, participanteCpf: e.target.value })}
                            required
                        />
                    </Col>

                    <Col md={3}>
                        <Form.Select value={newMember.funcao} onChange={(e) => setNewMember({ ...newMember, funcao: e.target.value })}>
                            <option value="Bolsista">Bolsista</option>
                            <option value="Colaborador">Colaborador</option>
                            <option value="Voluntário">Voluntário</option>
                            <option value="Pesquisador">Pesquisador</option>
                        </Form.Select>
                    </Col>

                    <Col md={2}>
                        <Button type="submit" variant="sucess" className="w-100">Adicionar</Button>
                    </Col>
                </Row>
            </Form>

            {/* Tabela de Membros */}
            <Table>
                <thead>
                    <tr>
                        <th>Nome</th>
                        <th>Cpf</th>
                        <th>Funcao</th>
                        <th>DataEntrada</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {team.map((v) => (
                        <tr key={v.id}>
                            {/* O nome e CPF estão dentro do objeto participante vinculado */}
                            <td>{v.participant?.nome}</td>
                            <td>{v.participant?.cpf}</td>

                            {/* A função e data estão na raiz do vínculo */}
                            <td>{v.funcao}</td>
                            <td>{v.dataEntrada}</td>
                            <td>
                                <Button variant="outline-danger" size="sm" onClick={() => handleDeleteMember(v.id)}>Remover</Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </Container>

    )
}

export default ProjectTeam