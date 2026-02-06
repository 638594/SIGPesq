import { useEffect, useState } from "react";
import { Form, Button, Container, FloatingLabel } from "react-bootstrap"; // Adicionado Button e Container
import { useNavigate } from "react-router-dom";

const PostProducaoCientifica = () => {
  const [listagemProjetos, setListagemProjetos] = useState([]);
  const [formData, setFormData] = useState({
    titulo: "",
    tipoProducao: "",
    anoPublicacao: "",
    meioDivulgacao: "",
    project: {
      codProjeto: "",
    },
  });

  const navigate = useNavigate();

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await fetch("http://localhost:8080/api/projects");
        const data = await response.json();
        setListagemProjetos(data);
      } catch (error) {
        console.error("Erro ao buscar projetos:", error);
      }
    };
    fetchProjects();
  }, []);

  const handdleInputChange = (e) => {
    const { name, value } = e.target;

    if (name === "codProjeto") {
      setFormData({
        ...formData,
        project: { codProjeto: value },
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Enviando dados:", formData);

    try {
      const response = await fetch("http://localhost:8080/api/producoes", {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        navigate("/producoes");
      } else {
        console.error("Erro ao enviar dados:", response.status);
      }
    } catch (error) {
      console.error("Erro ao enviar dados:", error);
    }
  };

  return (
    <div>
      <Container className="center-form">
        <h1>Adicionar Nova Produção Científica</h1>
        {/* ✅ Adicionado o onSubmit aqui */}
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="formTitulo">
            <FloatingLabel
                controlId="floatingTitulo"
                label="Título"
                className="mb-3"
                >

              <Form.Control
                type="text"
                name="titulo"
                value={formData.titulo}
                onChange={handdleInputChange}
                placeholder="Digite o título"
                required
              />
            </FloatingLabel>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formTipoProducao">
            <FloatingLabel
                controlId="floatingTipoProducao"
                label="Tipo de Produção"
                className="mb-3"
                >

              <Form.Control
                type="text"
                name="tipoProducao"
                value={formData.tipoProducao}
                onChange={handdleInputChange}
                placeholder="Digite o título"
                required
              />
            </FloatingLabel>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formAnoPublicacao">
            <FloatingLabel
                controlId="floatingAnoPublicacao"
                label="Ano de Publicação"
                className="mb-3"
                >

              <Form.Control
                type="number"
                name="anoPublicacao"
                value={formData.anoPublicacao}
                onChange={handdleInputChange}
                placeholder="Digite o ano de publicação"
                required
              />
            </FloatingLabel>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formMeioDivulgacao">
            <FloatingLabel
                controlId="floatingMeioDivulgacao"
                label="Meio de Divulgação"
                className="mb-3"
                >

              <Form.Control
                type="text"
                name="meioDivulgacao"
                value={formData.meioDivulgacao}
                onChange={handdleInputChange}
                placeholder="Digite o meio de divulgação"
                required
              />
            </FloatingLabel>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formCodProject">
            <Form.Select
              name="codProjeto"
              value={formData.project.codProjeto}
              onChange={handdleInputChange}
              required
            >
              <option value="">Selecione um projeto...</option>
              {listagemProjetos.map((proj) => (
                <option key={proj.codProjeto} value={proj.codProjeto}>
                  {proj.titulo} (ID: {proj.codProjeto})
                </option>
              ))}
            </Form.Select>
          </Form.Group>

          {/* ✅ Botão para disparar o handleSubmit */}
          <Button variant="primary" type="submit">
            Salvar Produção
          </Button>
        </Form>
      </Container>
    </div>
  );
};

export default PostProducaoCientifica;
