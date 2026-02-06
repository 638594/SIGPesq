package com.SIGPesq.SIGPesq.service;

import com.SIGPesq.SIGPesq.entity.Participante;
import com.SIGPesq.SIGPesq.repository.ParticipanteRepository;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class ParticipanteService {

    private final ParticipanteRepository participanteRepository;

    public Participante postParticipant(Participante participante){
        return participanteRepository.save(participante);
    }

    public List<Participante> getAllParticipants(){
        return participanteRepository.findAll();
    }

    public void deleteParticipant(String cpf){
        if(!participanteRepository.existsById(cpf)){
            throw new EntityNotFoundException("Participante com cpf " + cpf + " nao encontrado.");
        }
        participanteRepository.deleteById(cpf);
    }

    public Participante getParticipantById(String cpf){
        return participanteRepository.findById(cpf).orElse(null);
    }

    public Participante updateParticipant(String cpf, Participante participante){
        Optional<Participante> optionalParticipant = participanteRepository.findById(cpf);
        if(optionalParticipant.isPresent()){
            Participante existingParticipante = optionalParticipant.get();

            existingParticipante.setEmail(participante.getEmail());
            existingParticipante.setNome(participante.getNome());

            return participanteRepository.save(existingParticipante);

        }

        return null;
    }
}
