"./PostFinanciamento.css";
import { useState } from "react";
import { Alert, Button, FloatingLabel, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const PostFinanciamento = () => {
  const [errorMsg, setErrorMsg] = useState("");

  const [formData, setFormData] = useState({
    // definir os campos do formulário aqui
    agenciaFinanciadora: "",
    tipoFomento: "BOLSA",
    valorTotal: "",
    dataTermino: "",
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setErrorMsg("");

    const financiamentoToSave = {
      agenciaFinanciadora: formData.agenciaFinanciadora,
      tipoFomento: formData.tipoFomento,
      valorTotal: formData.valorTotal,
      dataTermino: formData.dataTermino,
    };

    try {
      const response = await fetch("http://localhost:8080/api/financiamentos", {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify(financiamentoToSave),
      });

      if (response.ok) {
        const data = await response.json();
        console.log("Financiamento criado: ", data);
        navigate("/financiamentos");
      } else {
        const errorData = await response.json();
        setErrorMsg(errorData.message || "Erro ao criar financiamento.");
      }
    } catch (error) {
      console.log("Erro ao criar financiamento: ", error.message);
      setErrorMsg("Nao foi possivel conectar ao servidor.");
    }
  };

  const today = new Date().toISOString().split("T")[0];
  return (
    <div className="center-form">
      <h1>Post New Financiamento</h1>
      {errorMsg && (
        <Alert variant="danger" onClose={() => setErrorMsg("")} dismissible>
          {errorMsg}
        </Alert>
      )}
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" contrlId="formAgenciaFinanciadora">
          <FloatingLabel
            controlId="floatingAgenciaFinanciadora"
            label="Agencia Financiadora"
            className="mb-3"
          >
            <Form.Control
              type="text"
              name="agenciaFinanciadora"
              placeholder="Digite a agencia financiadora"
              value={formData.agenciaFinanciadora}
              onChange={handleInputChange}
            />
          </FloatingLabel>
        </Form.Group>

        
          <FloatingLabel
            controlId="formTipoFomento"
            label="Tipo de Fomento"
            className="mb-3"
          >
            <Form.Select
              name="tipoFomento"
              value={formData.tipoFomento}
              onChange={handleInputChange}
            >
              <option value="BOLSA">Bolsa</option>
              <option value="AUXILIO">Auxílio</option>
              <option value="CONVENIO">Convênio</option>
            </Form.Select>
          </FloatingLabel>
       

        <Form.Group className="mb-3" controlId="formValorTotal">
          <FloatingLabel
            controlId="floatingValorTotal"
            label="Valor Total"
            className="mb-3"
          >
            <Form.Control
              type="number"
              name="valorTotal"
              placeholder="Digite o valor total"
              value={formData.valorTotal}
              onChange={handleInputChange}
            />
          </FloatingLabel>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formDataTermino">
          <FloatingLabel
            controlId="floatingDataTermino"
            label="Data Termino"
            className="mb-3"
          >
            <Form.Control
              type="date"
              name="dataTermino"
              min={today}
              placeholder="Digite a data de termino"
              value={formData.dataTermino}
              onChange={handleInputChange}
            />
          </FloatingLabel>
        </Form.Group>

        <Button variant="primary" type="submit" className="w-100 mt-3">
          Criar Financiamento
        </Button>
      </Form>
    </div>
  );
};

export default PostFinanciamento;
