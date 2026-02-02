package com.SIGPesq.SIGPesq.entity;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Entity
@Data
@NoArgsConstructor
public class VinculoFinanciamento {


    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;


    @ManyToOne
    @JoinColumn(name = "projeto_id", nullable = false)
    private Project project;

    @ManyToOne
    @JoinColumn(name = "financiamento_id", nullable = false)
    private Financiamento financiamento;

    private LocalDate dataVinculacao;

    @PrePersist
    protected void onCreate() {

            this.dataVinculacao = LocalDate.now();

    }
}
