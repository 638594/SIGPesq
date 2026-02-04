package com.SIGPesq.SIGPesq.service;

import com.SIGPesq.SIGPesq.entity.ProducaoCientifica;
import com.SIGPesq.SIGPesq.repository.ProducaoCientificaRepository;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class ProducaoCientificaService {

    private final ProducaoCientificaRepository producaoCientificaRepository;

    public List<ProducaoCientifica> getByAnoPublicacao(Long anoPublicacao) {
        if(anoPublicacao == null || anoPublicacao < 1900){
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Ano de busca invalido.");
        }

        return producaoCientificaRepository.findByAnoPublicacao(anoPublicacao);
    }

    public ProducaoCientifica postProducaoCientifica(ProducaoCientifica producaoCientifica) {
        return producaoCientificaRepository.save(producaoCientifica);
    }

    public List<ProducaoCientifica> getAllProducoesCientifica(){
        return producaoCientificaRepository.findAll();
    }

    public void deleteProducaoCientifica(Long id){
        if(!producaoCientificaRepository.existsById(id)){
            throw new EntityNotFoundException("Producao cientifica de id " + id + " nao encontrada.");

        }
        producaoCientificaRepository.deleteById(id);
    }

    public ProducaoCientifica getProducaoCientificaById(Long id){
        return producaoCientificaRepository.findById(id).orElse(null);
    }

    public ProducaoCientifica updateProducaoCientifica(Long id, ProducaoCientifica producaoCientifica){
        Optional<ProducaoCientifica> optionalProducaoCientifica = producaoCientificaRepository.findById(id);
        if(optionalProducaoCientifica.isPresent()){

            ProducaoCientifica existingProducaoCientifica = optionalProducaoCientifica.get();

            existingProducaoCientifica.setTitulo(producaoCientifica.getTitulo());
            existingProducaoCientifica.setMeioDivulgacao(producaoCientifica.getMeioDivulgacao());

            return producaoCientificaRepository.save(existingProducaoCientifica);
        }
        throw new EntityNotFoundException("Producao cientifica de id " + id + " nao encontrada.");
    }
}
