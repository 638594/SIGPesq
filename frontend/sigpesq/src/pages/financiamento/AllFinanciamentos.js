import { useEffect, useState } from "react";
import { Button, Col, Container, Row, Table } from "react-bootstrap";
import { useNavigate } from "react-router-dom";


    const AllFinanciamentos = () => {

        const[financiamentos, setFinanciamentos] = useState([]);
        const navigate = useNavigate();

        useEffect(() => { 
            const fetchFinanciamentos = async () => {
                try {
                    const response = await fetch("http://localhost:8080/api/financiamentos");
                    const data = await response.json();

                    setFinanciamentos(data);
                } catch (error) {
                    console.error("Erro ao buscar financiamentos: ", error.message);
                }
            }

            fetchFinanciamentos();
        }, []);

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