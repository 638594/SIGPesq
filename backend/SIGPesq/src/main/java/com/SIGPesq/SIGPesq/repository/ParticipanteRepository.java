package com.SIGPesq.SIGPesq.repository;

import com.SIGPesq.SIGPesq.entity.Participante;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ParticipanteRepository extends JpaRepository<Participante, String> {
}
