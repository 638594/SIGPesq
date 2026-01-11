import { useState } from "react";
import "./PostProject.css";
import { Form, Button, FloatingLabel, Alert } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const PostProject = () => {
  // Estado para armazenar a mensagem de erro do servidor
  const [errorMsg, setErrorMsg] = useState("");
  
  const [formData, setFormData] = useState({
    codProjeto: "",
    titulo: "",
    descricao: "",
    dataTermino: "",
    coordenadorCpf: ""
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
    setErrorMsg(""); // Limpa erros anteriores ao tentar enviar

    const projectToSave = {
      codProjeto: formData.codProjeto,
      titulo: formData.titulo,
      descricao: formData.descricao,
      dataTermino: formData.dataTermino,
      coordenador: {
        cpf:formData.coordenadorCpf
      }
    };
    //console.log(formData);

    try {
      const response = await fetch("http://localhost:8080/api/projects", {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify(projectToSave),
      });
      // 1. Verificamos se a resposta é de sucesso (200 ou 201)
      if (response.ok) {
        const data = await response.json();
        console.log("Projeto criado: ", data);
        navigate("/projects");
      } else {
        // 2. Se a resposta for erro (ex: 400), pegamos a mensagem do Java
        const errorData = await response.json();
        setErrorMsg(
          errorData.message || "Error ao criar projeto. Codigo ja existente."
        );
      }
    } catch (error) {
      console.log("Error ao criar o projeto: ", error.message);
      setErrorMsg("Nao foi possivel conectar ao servidor");
    }
  };

  const today = new Date().toISOString().split("T")[0];

  return (
    <>
      <div className="center-form">
        <h1>Post New Project</h1>
        {/* Exibe o alerta de erro se houver uma mensagem */}
        {errorMsg && (
          <Alert variant="danger" onClose={() => setErrorMsg("")} dismissible>
            {errorMsg}
          </Alert>
        )}
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="formcodProjeto">
            <FloatingLabel
              controlId="floatingCod"
              label="Codigo do Projeto"
              className="mb-3"
            >
              <Form.Control
                type="text"
                name="codProjeto"
                placeholder="Digite o codigo do projeto"
                value={formData.codProjeto}
                onChange={handleInputChange}
              />
            </FloatingLabel>
          </Form.Group>

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

          <Form.Group controlId="formCoordenadorCpf">
            <FloatingLabel
              controlId="floatingDate"
              label="Cpf Coordenador"
              className="mb-3"
            >
              <Form.Control
                type="text"
                name="coordenadorCpf"
                value={formData.coordenadorCpf}
                onChange={handleInputChange}
              />
            </FloatingLabel>
          </Form.Group>

          <Button variant="primary" type="submit" className="w-100 mt-3">
            Criar Projeto
          </Button>
        </Form>
      </div>
    </>
  );
};

export default PostProject;
