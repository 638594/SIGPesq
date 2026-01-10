package com.SIGPesq.SIGPesq.controller;


import com.SIGPesq.SIGPesq.entity.Project;
import com.SIGPesq.SIGPesq.service.ProjectService;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/projects")
@RequiredArgsConstructor
@CrossOrigin("*")
public class ProjectController {

    private final ProjectService projectService;

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public Project postProject(@RequestBody Project project) {
        return projectService.postProject(project);
    }

    @GetMapping
    public List<Project> getAllProjects() {
        return projectService.getAllProjects();
    }

    @DeleteMapping("/{codProjeto}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public ResponseEntity<?> deleteProject(@PathVariable String codProjeto) {
        try {
            projectService.deleteProject(codProjeto);
            return new ResponseEntity<>("Projeto com codigo " + codProjeto + " deletado com sucesso", HttpStatus.OK);
        }catch (EntityNotFoundException e){
            return new ResponseEntity<>(e.getMessage(), HttpStatus.NOT_FOUND);
        }
    }

    @GetMapping("/{codProjeto}")
    public ResponseEntity<?> getProjectById(@PathVariable String codProjeto) {
        Project project = projectService.getProjectById(codProjeto);
        if(project == null){
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(project);
    }

    @PatchMapping("/{codProjeto}")
    public ResponseEntity<?> updateProject(@PathVariable String codProjeto, @RequestBody Project project) {
        Project updatedProject = projectService.updateProject(codProjeto, project);

        if(updatedProject == null){
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
        }
        return ResponseEntity.ok(updatedProject);
    }
}
