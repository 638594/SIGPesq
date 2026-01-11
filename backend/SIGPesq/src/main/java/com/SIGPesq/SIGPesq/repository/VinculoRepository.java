package com.SIGPesq.SIGPesq.repository;

import com.SIGPesq.SIGPesq.entity.Vinculo;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface VinculoRepository extends JpaRepository<Vinculo,Long> {
    // Busca todos os participantes de um projeto específico
    List<Vinculo> findByProjectCodProjeto(String codProjeto);
}
