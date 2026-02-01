package com.SIGPesq.SIGPesq.controller;

import com.SIGPesq.SIGPesq.entity.Financiamento;
import com.SIGPesq.SIGPesq.service.FinanciamentoService;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.apache.coyote.Response;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/financiamentos")
@RequiredArgsConstructor
@CrossOrigin("*")
public class FinanciamentoController {

    private final FinanciamentoService financiamentoService;

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public Financiamento postFinanciamento(@RequestBody Financiamento financiamento){
        return  financiamentoService.postFinanciamento(financiamento);
    }

    @GetMapping
    public List<Financiamento> getFinanciamentos(){
        return financiamentoService.getAllFinanciamentos();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteFinanciamento(@PathVariable Long id){
        try{
            financiamentoService.deleteFinanciamento(id);
            return new ResponseEntity<>("Financiamento com id: " +id + " deletado com sucesso.",HttpStatus.OK);
        }catch (EntityNotFoundException e){
            return new ResponseEntity<>(e.getMessage(), HttpStatus.NOT_FOUND);
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getFinanciamentoById(@PathVariable Long id){
        Financiamento financiamento =  financiamentoService.getFinanciamentoById(id);
        if(financiamento == null){
            return ResponseEntity.notFound().build();
        }else{
            return ResponseEntity.ok(financiamento);
        }
    }

    @PatchMapping("/{id}")
    public ResponseEntity<?> updateFinanciamento(@PathVariable Long id, @RequestBody Financiamento financiamento){
        Financiamento updatedFinanciamento =  financiamentoService.updateFinanciamento(id, financiamento);

        if(updatedFinanciamento == null){
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
        }
        return ResponseEntity.ok(updatedFinanciamento);
    }
}
