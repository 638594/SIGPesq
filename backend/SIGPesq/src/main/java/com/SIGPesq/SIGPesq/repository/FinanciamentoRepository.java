package com.SIGPesq.SIGPesq.repository;

import com.SIGPesq.SIGPesq.entity.Financiamento;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface FinanciamentoRepository extends JpaRepository<Financiamento, Long> {

    List<Financiamento> findByAgenciaFinanciadoraContainingIgnoreCase(String agencia);
}
