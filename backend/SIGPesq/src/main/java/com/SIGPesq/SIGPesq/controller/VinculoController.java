package com.SIGPesq.SIGPesq.controller;

import com.SIGPesq.SIGPesq.entity.Vinculo;
import com.SIGPesq.SIGPesq.service.VinculoService;
import lombok.RequiredArgsConstructor;
import org.apache.coyote.Response;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/vinculos")
@RequiredArgsConstructor
@CrossOrigin("*")
public class VinculoController {

    private final VinculoService vinculoService;

    @PostMapping
    public ResponseEntity<Vinculo> postVinculo(@RequestBody Vinculo vinculo){
        Vinculo novoVinculo = vinculoService.postVinculo(vinculo);
        return ResponseEntity.ok(novoVinculo);
    }

    // Listar todos os participantes de um projeto específico
    @GetMapping("/projeto/{codProjeto}")
    public ResponseEntity<List<Vinculo>> getVinculosPorProjeto(@PathVariable String codProjeto){
        return ResponseEntity.ok(vinculoService.getVinculosByProject(codProjeto));
    }

    // Remover um participante do projeto (Deletar vínculo)
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteVinculo(@PathVariable Long id){
        vinculoService.deleteVinculo(id);
        return ResponseEntity.noContent().build();
    }


}
