package com.SIGPesq.SIGPesq.service;
import com.SIGPesq.SIGPesq.entity.Participant;
import com.SIGPesq.SIGPesq.entity.Project;
import com.SIGPesq.SIGPesq.repository.ParticipantRepository;
import com.SIGPesq.SIGPesq.repository.ProjectRepository;
import jakarta.persistence.EntityNotFoundException;
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

    private final ParticipantRepository participantRepository;
    private final ProjectRepository projectRepository;

    public Project postProject(Project project){
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
        if(project.getCoordenador() == null || project.getCoordenador().getCpf() == null){
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Todo projeto deve ter um coordenador principal.");
        }
        Participant coordenador = participantRepository.findById(project.getCoordenador().getCpf())
                .orElseThrow(()-> new ResponseStatusException(HttpStatus.NOT_FOUND, "Coordenador não encontrado no sistema."));

        if(!"DOCENTE".equalsIgnoreCase(String.valueOf(coordenador.getTipo()))){
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST,"Apenas participantes do tipo DOCENTE podem coordenar projetos.");
        }

        return projectRepository.save(project);
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

            if(project.getCoordenador() != null){
                existingProject.setCoordenador(project.getCoordenador());
            }

            return projectRepository.save(existingProject);
        }
        return null;
    }
}
