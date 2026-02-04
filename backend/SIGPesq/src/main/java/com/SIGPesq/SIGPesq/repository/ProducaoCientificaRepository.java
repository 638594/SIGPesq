package com.SIGPesq.SIGPesq.repository;

import com.SIGPesq.SIGPesq.entity.ProducaoCientifica;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDate;
import java.util.List;

public interface ProducaoCientificaRepository extends JpaRepository<ProducaoCientifica, Long> {

    // O Spring gera o SQL: SELECT * FROM producoes WHERE ano_publicacao = ?
    List<ProducaoCientifica> findByAnoPublicacao(Long anoPublicacao);
}
