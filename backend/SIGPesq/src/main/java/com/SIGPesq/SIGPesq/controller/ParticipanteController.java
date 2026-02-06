package com.SIGPesq.SIGPesq.controller;

import com.SIGPesq.SIGPesq.service.ParticipanteService;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.SIGPesq.SIGPesq.entity.Participante;

import java.util.List;

@RestController
@RequestMapping("/api/participants")
@RequiredArgsConstructor
@CrossOrigin("*")
public class ParticipanteController {

    private final ParticipanteService participanteService;

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public Participante postParticipant(@RequestBody Participante participante) {
        return participanteService.postParticipant(participante);
    }

    @GetMapping
    public List<Participante> getAllParticipants(){
        return participanteService.getAllParticipants();
    }

    @DeleteMapping("/{cpf}")
    public ResponseEntity<?> deleteParticipant(@PathVariable String cpf){
        try{
            participanteService.deleteParticipant(cpf);
            return new ResponseEntity<>("Participante com cpf " + cpf + " deletado com sucesso.", HttpStatus.OK);
        }catch (EntityNotFoundException e){
            return new ResponseEntity<>(e.getMessage(), HttpStatus.NOT_FOUND);
        }
    }

    @GetMapping("/{cpf}")
    public ResponseEntity<?> getParticipantByCPF(@PathVariable  String cpf){
        Participante participante = participanteService.getParticipantById(cpf);
        if(participante == null){
            return ResponseEntity.notFound().build();
        }else{
            return ResponseEntity.ok(participante);
        }
    }

    @PatchMapping("/{cpf}")
    public ResponseEntity<?> updateParticipant(@PathVariable String cpf, @RequestBody Participante participante){
        Participante updatedParticipante = participanteService.updateParticipant(cpf, participante);

        if(updatedParticipante == null){
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
        }
        return ResponseEntity.ok(updatedParticipante);
    }
}
