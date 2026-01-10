package com.SIGPesq.SIGPesq.service;

import com.SIGPesq.SIGPesq.entity.Participant;
import com.SIGPesq.SIGPesq.repository.ParticipantRepository;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ParticipantService {

    private final ParticipantRepository participantRepository;

    public Participant postParticipant(Participant participant){
        return participantRepository.save(participant);
    }

    public List<Participant> getAllParticipants(){
        return participantRepository.findAll();
    }

    public void deleteParticipant(String cpf){
        if(!participantRepository.existsById(cpf)){
            throw new EntityNotFoundException("Participante com cpf " + cpf + " nao encontrado.");
        }
        participantRepository.deleteById(cpf);
    }

    public Participant getParticipantById(String cpf){
        return participantRepository.findById(cpf).orElse(null);
    }
}
