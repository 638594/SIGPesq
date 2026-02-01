package com.SIGPesq.SIGPesq.service;

import com.SIGPesq.SIGPesq.entity.Financiamento;
import com.SIGPesq.SIGPesq.repository.FinanciamentoRepository;
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
public class FinanciamentoService {

    private final FinanciamentoRepository financiamentoRepository;

    public Financiamento postFinanciamento(Financiamento financiamento){
        LocalDate hoje = LocalDate.now();
        if(financiamento.getDataTermino() != null && financiamento.getDataTermino().isBefore(hoje)){
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "A data de término não pode ser anterior à data de hoje.");
        }
        return financiamentoRepository.save(financiamento);
    };

    public List<Financiamento> getAllFinanciamentos(){
        return financiamentoRepository.findAll();
    }

    public void deleteFinanciamento(Long id){
        if(!financiamentoRepository.existsById(id)){
            throw new EntityNotFoundException("Financiamento com id:"+ id +" não encontrado.");
        }
        financiamentoRepository.deleteById(id);
    }

    public Financiamento getFinanciamentoById(Long id){
        return financiamentoRepository.findById(id).orElse(null);
    }

    public Financiamento updateFinanciamento(Long id, Financiamento financiamento){
        Optional<Financiamento> financiamentoOptional = financiamentoRepository.findById(id);
        if(financiamentoOptional.isPresent()){
            Financiamento existingFinanciamento= financiamentoOptional.get();

            existingFinanciamento.setTipoFomento(financiamento.getTipoFomento());
            existingFinanciamento.setValorTotal(financiamento.getValorTotal());
            existingFinanciamento.setDataTermino(financiamento.getDataTermino());

            return financiamentoRepository.save(existingFinanciamento);
        }
        return null;
    }
}

