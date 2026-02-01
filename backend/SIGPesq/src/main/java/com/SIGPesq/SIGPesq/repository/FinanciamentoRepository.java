package com.SIGPesq.SIGPesq.repository;

import com.SIGPesq.SIGPesq.entity.Financiamento;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface FinanciamentoRepository extends JpaRepository<Financiamento, Long> {
}
