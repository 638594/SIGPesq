package com.SIGPesq.SIGPesq.controller;

import com.SIGPesq.SIGPesq.entity.VinculoFinanciamento;
import com.SIGPesq.SIGPesq.service.VinculoFinanciamentoService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/vinculoFinanciamentos")
@RequiredArgsConstructor
@CrossOrigin("*")
public class VinculoFinanciamentoController {

    private final VinculoFinanciamentoService vinculoFinanciamentoService;

    @PostMapping
    public ResponseEntity<VinculoFinanciamento> postVinculoFinanciamento(@RequestBody  VinculoFinanciamento vinculoFinanciamento) {
        VinculoFinanciamento novoVinculoFinanciamento = vinculoFinanciamentoService.postVinculoFinanciamento(vinculoFinanciamento);
        return ResponseEntity.ok(novoVinculoFinanciamento);
    }

    //Lista todos os financiamentos de um projeto especifico
    @GetMapping("/financiamento/{id}")
    public ResponseEntity<List<VinculoFinanciamento>> getVinculosPorFinanciamento(@PathVariable Long id){
        return ResponseEntity.ok(vinculoFinanciamentoService.getVinculoFinanciamentosByFinanciamento(id));
    }

    @DeleteMapping("{id}")
    public ResponseEntity<Void> deleteVinculoFinanciamento(@PathVariable Long id){
        vinculoFinanciamentoService.deleteVinculoFinanciamento(id);
        return ResponseEntity.noContent().build();
    }
}
