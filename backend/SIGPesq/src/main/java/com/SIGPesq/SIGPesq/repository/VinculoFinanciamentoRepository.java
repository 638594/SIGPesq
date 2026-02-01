package com.SIGPesq.SIGPesq.repository;

import com.SIGPesq.SIGPesq.entity.Vinculo;
import com.SIGPesq.SIGPesq.entity.VinculoFinanciamento;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface VinculoFinanciamentoRepository extends JpaRepository<VinculoFinanciamento, Long> {

    List<VinculoFinanciamento> findByFinanciamentoId(Long id);
}
