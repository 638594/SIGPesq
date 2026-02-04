import { useEffect, useState } from "react";
import { Button, Col, Container, Form, InputGroup, Row, Table } from "react-bootstrap";
import { useNavigate } from "react-router-dom";


    const AllFinanciamentos = () => {

        const [searchTerm, setSearchTerm] = useState("");   
        const[financiamentos, setFinanciamentos] = useState([]);
        const navigate = useNavigate();

      // Função que faz a chamada para a API com ou sem filtro
    const fetchFinanciamentos = async (query = "") => {
        try {
            // Se houver query, passamos como parâmetro na URL
            const url = query 
                ? `http://localhost:8080/api/financiamentos?agencia=${query}`
                : "http://localhost:8080/api/financiamentos";
                
            const response = await fetch(url);
            const data = await response.json();
            setFinanciamentos(data);
        } catch (error) {
            console.error("Erro ao buscar financiamentos: ", error.message);
        }
    };

    // useEffect que escuta as mudanças no searchTerm
    useEffect(() => {
        // Debounce: espera 500ms após o usuário parar de digitar para chamar o banco
        const delayDebounce = setTimeout(() => {
            fetchFinanciamentos(searchTerm);
        }, 500);

        return () => clearTimeout(delayDebounce);
    }, [searchTerm]);

        const handleDelete = async (financiamentoId) => {
            try {
                const response = await fetch(`http://localhost:8080/api/financiamentos/${financiamentoId}`, {
                    method: "DELETE",

                });

                if (response.ok) {
                    setFinanciamentos((prevFinanciamentos) =>
                        prevFinanciamentos.filter((financiamento) => financiamento.id !== financiamentoId)
                    );
                }
                console.log(`Financiamento com id ${financiamentoId} deletado com sucesso.`);   

            } catch (error) {
                console.error("Erro ao deletar o financiamento: ", error.message);
            }
        }

        const handleUpdate = (financiamentoId) => {
            navigate(`/financiamentos/${financiamentoId}`);
        }

     

        return (
            <Container>
                <Row>
                    <Col>
                        <h1 className="text-center mt-5">Financiamentos</h1>
                        {/* 3. Barra de Pesquisa */}
                        <InputGroup className="mb-4 mt-4">
                            <InputGroup.Text>🔍</InputGroup.Text>
                            <Form.Control
                                placeholder="Buscar por Agencia Financiadora (Ex: CNPq)"
                                value={searchTerm}
                                onChange={(e)=>setSearchTerm(e.target.value)}
                            />
                        </InputGroup>   
                        <Table striped bordered hover responsive>
                            <thead>
                                <tr>
                                    <th>Id</th>
                                    <th>AgenciaFinanciadora</th>
                                    <th>TipoFomento</th>
                                    <th>valorTotal</th>
                                    <th>DataInicio</th>
                                    <th>DataTermino</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                
                                {financiamentos.map((financiamento) => (
                                    <tr key={financiamento.id}>
                                        <td>{financiamento.id}</td>
                                        <td>{financiamento.agenciaFinanciadora}</td>
                                        <td>{financiamento.tipoFomento}</td>
                                        <td>{financiamento.valorTotal}</td>
                                        <td>{financiamento.dataInicio}</td>
                                        <td>{financiamento.dataTermino}</td>
                                        <td>
                                            <Button variant="outline-primary" onClick={()=> handleUpdate(financiamento.id)}>Update</Button>
                                            <Button variant="outline-danger" onClick={()=> handleDelete(financiamento.id)}>Delete</Button>
                                        </td>
                                           
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                    </Col>
                </Row>
            </Container>
        );
    }

    
    export default AllFinanciamentos