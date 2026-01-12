package com.SIGPesq.SIGPesq.controller;

import com.SIGPesq.SIGPesq.service.ParticipantService;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.apache.coyote.Response;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.SIGPesq.SIGPesq.entity.Participant;

import java.util.List;

@RestController
@RequestMapping("/api/participants")
@RequiredArgsConstructor
@CrossOrigin("*")
public class ParticipantController {

    private final ParticipantService  participantService;

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public Participant postParticipant(@RequestBody Participant participant) {
        return participantService.postParticipant(participant);
    }

    @GetMapping
    public List<Participant> getAllParticipants(){
        return participantService.getAllParticipants();
    }

    @DeleteMapping("/{cpf}")
    public ResponseEntity<?> deleteParticipant(@PathVariable String cpf){
        try{
            participantService.deleteParticipant(cpf);
            return new ResponseEntity<>("Participante com cpf " + cpf + " deletado com sucesso.", HttpStatus.OK);
        }catch (EntityNotFoundException e){
            return new ResponseEntity<>(e.getMessage(), HttpStatus.NOT_FOUND);
        }
    }

    @GetMapping("/{cpf}")
    public ResponseEntity<?> getParticipantByCPF(@PathVariable  String cpf){
        Participant participant = participantService.getParticipantById(cpf);
        if(participant == null){
            return ResponseEntity.notFound().build();
        }else{
            return ResponseEntity.ok(participant);
        }
    }

    @PatchMapping("/{cpf}")
    public ResponseEntity<?> updateParticipant(@PathVariable String cpf, @RequestBody Participant participant){
        Participant updatedParticipant = participantService.updateParticipant(cpf, participant);

        if(updatedParticipant == null){
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
        }
        return ResponseEntity.ok(updatedParticipant);
    }
}
