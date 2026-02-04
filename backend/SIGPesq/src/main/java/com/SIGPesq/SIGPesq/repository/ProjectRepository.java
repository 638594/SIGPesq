package com.SIGPesq.SIGPesq.repository;

import com.SIGPesq.SIGPesq.entity.Project;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProjectRepository extends JpaRepository<Project, String> {

    @Query("SELECT DISTINCT p FROM Project p " +
            "LEFT JOIN p.vinculos v " +
            "WHERE LOWER(p.titulo) LIKE LOWER(CONCAT('%', :termo, '%')) " +
            "OR (LOWER(v.participant.nome) LIKE LOWER(CONCAT('%', :termo, '%')) " +
            "AND v.funcao = 'Coordenador')")
    List<Project> searchByTituloOuNomeCoordenador(@Param("termo") String termo);
}
