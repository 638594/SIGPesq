package com.SIGPesq.SIGPesq.service;

import com.SIGPesq.SIGPesq.entity.Participant;
import com.SIGPesq.SIGPesq.entity.Project;
import com.SIGPesq.SIGPesq.entity.Vinculo;
import com.SIGPesq.SIGPesq.repository.ParticipantRepository;
import com.SIGPesq.SIGPesq.repository.ProjectRepository;
import com.SIGPesq.SIGPesq.repository.VinculoRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@Service
@RequiredArgsConstructor
public class VinculoService {

    private final VinculoRepository vinculoRepository;
    private final ProjectRepository projectRepository;
    private final ParticipantRepository  participantRepository;

    public Vinculo postVinculo(Vinculo vinculo){
        // Se o JSON vier errado, o vinculo.getProject() será null
        if (vinculo.getProject() == null) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Objeto projeto não foi enviado corretamente no JSON");
        }
        // 1. Validar se o Projeto existe
        Project projeto = projectRepository.findById(vinculo.getProject().getCodProjeto())
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Projeto nao encontrado."));
        // 2. Validar se o Participante existe
        Participant participante = participantRepository.findById(vinculo.getParticipant().getCpf())
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Participante nao encontrado."));
        if(projeto.getDataTermino() != null && vinculo.getDataEntrada().isAfter(projeto.getDataTermino())) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST,
                    "A data de entrada do participante nao pode ser posterior a data de termino do projeto.");
        }

        vinculo.setProject(projeto);
        vinculo.setParticipant(participante);

        return vinculoRepository.save(vinculo);
    }

    public List<Vinculo> getVinculosByProject(String codProjeto){
        return vinculoRepository.findByProjectCodProjeto(codProjeto);
    }

    public void deleteVinculo(Long id){
        if(!vinculoRepository.existsById(id)){
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Vinculo nao encontrado.");
        }
        vinculoRepository.deleteById(id);
    }
}
