package com.SIGPesq.SIGPesq.service;

import com.SIGPesq.SIGPesq.entity.Financiamento;
import com.SIGPesq.SIGPesq.entity.Project;
import com.SIGPesq.SIGPesq.entity.VinculoFinanciamento;
import com.SIGPesq.SIGPesq.repository.FinanciamentoRepository;
import com.SIGPesq.SIGPesq.repository.ProjectRepository;
import com.SIGPesq.SIGPesq.repository.VinculoFinanciamentoRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@Service
@RequiredArgsConstructor
public class VinculoFinanciamentoService {

    private final ProjectRepository projectRepository;
    private final FinanciamentoRepository financiamentoRepository;
    private final VinculoFinanciamentoRepository vinculoFinanciamentoRepository;

    public VinculoFinanciamento postVinculoFinanciamento(VinculoFinanciamento vinculoFinanciamento){
        if(vinculoFinanciamento.getProject() == null){
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Objeto projeto nao foi enviado corretamente no JSON");
        }

        Project projeto = projectRepository.findById(vinculoFinanciamento.getProject().getCodProjeto())
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Projeto nao encontrado."));
        Financiamento financiamento = financiamentoRepository.findById(vinculoFinanciamento.getFinanciamento().getId())
                .orElseThrow(()-> new ResponseStatusException(HttpStatus.NOT_FOUND, "Financiamento nao encontrado."));
        if(projeto.getDataTermino() != null && vinculoFinanciamento.getDataVinculacao().isAfter(projeto.getDataTermino())){
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST,
                    "A data de entrada do financiamento nao pode ser posterior a data de termino do projeto.");
        }

        vinculoFinanciamento.setProject(projeto);
        vinculoFinanciamento.setFinanciamento(financiamento);

        return vinculoFinanciamentoRepository.save(vinculoFinanciamento);
    }

    public List<VinculoFinanciamento> getVinculoFinanciamentosByFinanciamento(Long id){
        return vinculoFinanciamentoRepository.findByFinanciamentoId(id);
    }

    public void deleteVinculoFinanciamento(Long id){
        if(!vinculoFinanciamentoRepository.existsById(id)){
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Vinculo Financiamento nao encontrado.");
        }

        vinculoFinanciamentoRepository.deleteById(id);
    }
}
