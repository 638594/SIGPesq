package com.SIGPesq.SIGPesq.repository;

import com.SIGPesq.SIGPesq.entity.Participant;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ParticipantRepository extends JpaRepository<Participant, String> {
}
