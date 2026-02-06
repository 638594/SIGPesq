package com.SIGPesq.SIGPesq.controller;

import com.SIGPesq.SIGPesq.entity.ProducaoCientifica;
import com.SIGPesq.SIGPesq.service.ProducaoCientificaService;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/producoes")
@RequiredArgsConstructor
@CrossOrigin("*")
public class ProducaoCientificaController {

    private final ProducaoCientificaService producaoCientificaService;

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public ProducaoCientifica postProducao(@RequestBody ProducaoCientifica producaoCientifica){
        return producaoCientificaService.postProducaoCientifica(producaoCientifica);
    }

//    @GetMapping
//    public List<ProducaoCientifica> getAllProducoes(){
//        return producaoCientificaService.getAllProducoesCientifica();
//    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteProducaoCientifica(@PathVariable Long id){
        try{
            producaoCientificaService.deleteProducaoCientifica(id);
            return new ResponseEntity<>("Producao com id " + id + " deletado com sucesso.", HttpStatus.OK);
        }catch (EntityNotFoundException e){
            return new ResponseEntity<>(e.getMessage(), HttpStatus.NOT_FOUND);
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getProducaoCientificaById(@PathVariable Long id){
        ProducaoCientifica producaoCientifica = producaoCientificaService.getProducaoCientificaById(id);
        if(producaoCientifica == null){
            return ResponseEntity.notFound().build();
        }else{
            return ResponseEntity.ok(producaoCientifica);
        }
    }

    @PatchMapping("/{id}")
    public ResponseEntity<?> updateProducaoCientifica(@PathVariable Long id,@RequestBody ProducaoCientifica producaoCientifica){
        ProducaoCientifica updatedProducaoCientifica = producaoCientificaService.updateProducaoCientifica(id, producaoCientifica);

        if(updatedProducaoCientifica == null){
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
        }
        return ResponseEntity.ok(updatedProducaoCientifica);
    }

    @GetMapping
    public List<ProducaoCientifica> list(@RequestParam(required = false) Long anoPublicacao){
        if(anoPublicacao != null){
            return producaoCientificaService.getByAnoPublicacao(anoPublicacao);
        }
        return producaoCientificaService.getAllProducoesCientifica();
    }
}
