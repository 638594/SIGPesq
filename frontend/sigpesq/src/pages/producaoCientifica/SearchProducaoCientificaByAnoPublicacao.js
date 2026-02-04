import { useState } from "react";
import { Alert, Button, Col, Container, Form, Row, Table } from "react-bootstrap";



    const SearchProducaoCientificaByAnoPublicacao = () => {

        const [ano,setAno] = useState('');
        const [producoes,setProducoes] = useState([]);
        const [loading,setLoading] = useState(false);   
        const [error,setError] = useState("");

        const handleSearch = async (event) => {
            event.preventDefault();
            setLoading (true);
            setError(""); 

            try {
                //Chamada para o endpoint com @Requestparam 'anoPublicacao'
                const response = await fetch(`http://localhost:8080/api/producoes?anoPublicacao=${ano}`);
                
                if(response.ok){
                    const data = await response.json();
                    setProducoes(data);
                    if(data.length === 0){
                        setError("Nenhuma producao encontrada para esse ano.")
                    }
                }else{
                    const errorData = await response.json();
                    setError(errorData.message || "Erro ao buscar producoes."); 
                    }
                }
            catch (error) {
                setError("Error de conexao com servidor");

            } finally{
                setLoading(false);
            }
        };

        return  (
            <Container className="mt-5">
                <h2>Consultar producoes por ano</h2>
                <Form onSubmit={handleSearch} className="mb-4">
                    <Row className="align-items-end">
                        <Col md={4}>
                            <Form.Group>
                                <Form.Label>Digite o Ano de Publicacao(Ex: 2026)</Form.Label>
                                <Form.Control
                                    type="number"
                                    value={ano}
                                    onChange={(e) => setAno(e.target.value)}
                                    placeholder="Ex: 2024"
                                    required
                                />
                            </Form.Group>
                        </Col>
                        <Col>
                            <Button variant="primary" type="submit" disabled={loading}>
                                {loading ? "Buscando..." : "Buscar"}
                            </Button>
                        </Col>
                    </Row>
                </Form>

                {error && <Alert variant="danger">{error}</Alert>}

                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>Titulos</th>
                            <th>Tipos</th>
                            <th>Meio de Divulgacao</th>
                            <th>Projetos</th>
                        </tr>
                    </thead>
                    <tbody>
                        {producoes.map((producao)=> (
                            <tr key={producao.id}>
                                <td>{producao.titulo}</td>
                                <td>{producao.tipoProducao}</td>
                                <td>{producao.meioDivulgacao}</td>
                                <td>{producao.project?.titulo || "N/A"}</td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </Container>
        );
    };

    export default SearchProducaoCientificaByAnoPublicacao