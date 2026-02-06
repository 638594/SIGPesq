import { useEffect, useState } from "react";
import { Container, FormControl, InputGroup, Table } from "react-bootstrap";

const AllProducaoCientifica = () => {

  const [searchTerm, setSearchTerm] = useState(""); 
  const [producaoCientificaList, setProducaoCientificaList] = useState([]);

  useEffect(() => {
    const fetchProducaoCientifica = async () => {
      try {
        const response = await fetch("http://localhost:8080/api/producoes");
        const data = await response.json();

        setProducaoCientificaList(data);
      } catch (error) {
        console.error("Error fetching producaoCientifica:", error.message);
      }
    };

    fetchProducaoCientifica();
  }, []);

  const filteredProducaoCientifica = producaoCientificaList.filter((producao) => {
    const term = searchTerm.toLowerCase();
    return (
        producao.titulo?.toLowerCase().includes(term) ||
      producao.tipoProducao?.toLowerCase().includes(term) ||
      producao.anoPublicacao?.toString().includes(term) ||
      producao.project?.codProjeto?.toLowerCase().includes(term)
    )
  });
  return (
    <Container className="mt-5">
      <h1 className="text-center">Listagem de Produções Científicas</h1>
      <InputGroup.Text id="basic-addon1">🔍</InputGroup.Text>
      <FormControl
        placeholder="Buscar por título, tipo ou ano de publicação"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)} 
      />
      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>Título</th>
            <th>Tipo de Producao</th>
            <th>Ano de Publicação</th>
            <th>Meio de Publicacao</th>
            <th>Codigo Projeto</th>
          </tr>
        </thead>
        <tbody>
          {filteredProducaoCientifica.map((producao) => (
            <tr key={producao.id}>
              <td>{producao.titulo}</td>
              <td>{producao.tipoProducao}</td>
              <td>{producao.anoPublicacao}</td>
              <td>{producao.meioDivulgacao}</td>
              <td>{producao.project.codProjeto}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
};

export default AllProducaoCientifica;
