package com.SIGPesq.SIGPesq.service;
import com.SIGPesq.SIGPesq.entity.Participante;
import com.SIGPesq.SIGPesq.entity.Project;
import com.SIGPesq.SIGPesq.entity.Vinculo;
import com.SIGPesq.SIGPesq.enums.Tipos;
import com.SIGPesq.SIGPesq.repository.ParticipanteRepository;
import com.SIGPesq.SIGPesq.repository.ProjectRepository;
import com.SIGPesq.SIGPesq.repository.VinculoRepository;
import jakarta.persistence.EntityNotFoundException;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class ProjectService {

    private final ParticipanteRepository participanteRepository;
    private final ProjectRepository projectRepository;
    private final VinculoRepository vinculoRepository;

    @Transactional
    public Project postProject(Project project, String coordenador_cpf){
        //Validacao data termino
        LocalDate hoje = LocalDate.now();
        if(project.getDataTermino() != null && project.getDataTermino().isBefore(hoje)){
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "A data de término não pode ser anterior à data de hoje.");
        }
        //Verificacao codigo unico
        if(projectRepository.existsById(project.getCodProjeto())){
            throw new ResponseStatusException(
                    HttpStatus.CONFLICT,
                    "Não foi possivel criar o projeto: o código " + project.getCodProjeto() + " ja esta em uso."
            );
        }
        Participante coordenador = participanteRepository.findById(coordenador_cpf)
                .orElseThrow(()-> new ResponseStatusException(HttpStatus.NOT_FOUND, "Participante nao encontrado"));

        if(!Tipos.DOCENTE.equals((coordenador.getTipo()))){
            throw new ResponseStatusException(
                    HttpStatus.BAD_REQUEST,
                    "Apenas participantes do tipo DOCENTE podem coordenador projetos."
            );
        }
        //1. Salva o projeto primeiro
        Project projetoSalvo = projectRepository.save(project);

        //2. Cria vinculo

        Vinculo vinculoCoordenador = new Vinculo();
        vinculoCoordenador.setProject(projetoSalvo);
        vinculoCoordenador.setParticipante(coordenador);
        vinculoCoordenador.setFuncao("Coordenador");
        vinculoCoordenador.setDataEntrada(LocalDate.now());

        vinculoRepository.save(vinculoCoordenador);
        return  projetoSalvo;
    }

    public List<Project> getAllProjects(){
        return projectRepository.findAll();
    }

    public void deleteProject(String codProjeto){
        if(!projectRepository.existsById(codProjeto)){
            throw new EntityNotFoundException("Project com codigo " + codProjeto + " nao encontrado.");
        }
        projectRepository.deleteById(codProjeto);
    }

    public Project getProjectById(String codProjeto){
        return projectRepository.findById(codProjeto).orElse(null);
    }

    public Project updateProject(String codProjeto, Project project){
        Optional<Project> optionalProject = projectRepository.findById(codProjeto);
        if(optionalProject.isPresent()){
            Project existingProject = optionalProject.get();

            existingProject.setTitulo(project.getTitulo());
            existingProject.setDescricao(project.getDescricao());
            existingProject.setDataTermino(project.getDataTermino());
            existingProject.setSituacao(project.getSituacao());

//            if(project.getCoordenador() != null){
//                existingProject.setCoordenador(project.getCoordenador());
//            }

            return projectRepository.save(existingProject);
        }
        return null;
    }

    public List<Project> searchProject(String termo){
        return projectRepository.searchByTituloOuNomeCoordenador(termo);
    }
}
