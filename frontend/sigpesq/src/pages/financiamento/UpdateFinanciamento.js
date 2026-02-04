import { useEffect, useState } from "react"
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom"


    const UpdateFinanciamento = () => {

        const {id} = useParams();
        const navigate = useNavigate();
        const [financiamento,setFinanciamento] = useState({
            tipoFomento: "",
            valorTotal: "",
            dataTermino: ""
            
        });
        
        useEffect(()=> {
            const fetchFinanciamento = async () => {
                try {
                    const response = await fetch(`http://localhost:8080/api/financiamentos/${id}`);
                    const data = await response.json();
                    setFinanciamento(data);
                } catch (error) {
                    console.error("Erro ao buscar financiamento: ", error.message);
                }
            };
            fetchFinanciamento();
        }, [id]);

        const handleInputChange = (e) => {
            const {name , value} = e.target;
            setFinanciamento({...financiamento, [name]: value})
        };

        const handleSubmit = async (e) => {
            e.preventDefault();
            try {
                const response = await fetch(`http://localhost:8080/api/financiamentos/${id}`, {
                    method: "PATCH",
                    headers: {"Content-Type": "application/json"},
                    body: JSON.stringify(financiamento),
                
            }); 
            if (response.ok) {
                alert("Financiamento atualizado com sucesso!");
                navigate("/financiamentos");
            }
           }catch (error) {
            console.error("Erro ao atualizar financiamento: ", error.message);
          }
    };


        return (
            <Container className="mt-5">
                <Row className="justify-content-md-center">
                    <Col md={6}>
                        <h1 className="text-center">Editar financiamento</h1>
                        <Form onSubmit={handleSubmit}>                        
                                <Form.Label>Tipo de Fomento</Form.Label>
                                <Form.Select                
                                    name="tipoFomento"
                                    value={financiamento.tipoFomento}
                                    onChange={handleInputChange}
                                >
                                    <option value="BOLSA">Bolsa</option>
                                    <option value="AUXILIO">Auxílio</option>
                                    <option value="CONVENIO">Convênio</option>

                            </Form.Select>

                             <Form.Group className="mb-3">
                                <Form.Label>Valor Total</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="valorTotal"
                                    value={financiamento.valorTotal}
                                    onChange={handleInputChange}
                                    required
                                />
                            </Form.Group>

                             <Form.Group className="mb-3">
                                <Form.Label>Data Termino</Form.Label>
                                <Form.Control
                                    type="date"
                                    name="dataTermino"
                                    value={financiamento.dataTermino}
                                    onChange={handleInputChange}
                                    required
                                />
                            </Form.Group>

                            <div className="d-grid gap-2">
                                <Button variant="primary" type="submit">Atualizar Financiamento</Button>
                                <Button variant="secondary" onClick={()=> navigate("/financiamentos")}>Cancelar</Button>
                            </div>
                        </Form>
                    </Col>
                </Row>
            </Container>
        )
    }

    export default UpdateFinanciamento;