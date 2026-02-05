package com.SIGPesq.SIGPesq.entity;

import com.SIGPesq.SIGPesq.enums.TipoFomento;
import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.util.List;

@Entity
@Data
@NoArgsConstructor
public class Financiamento {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String agenciaFinanciadora;

    @Enumerated(EnumType.STRING)
    private TipoFomento tipoFomento;

    private Long valorTotal;

    private LocalDate dataInicio;

    @JsonFormat(pattern = "yyyy-MM-dd")
    private LocalDate dataTermino;

    @OneToMany(mappedBy = "financiamento", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonIgnore
    private List<VinculoFinanciamento> vinculoFinanciamentos;

    @PrePersist
    protected void onCreate() {

        this.dataInicio = LocalDate.now();
    }
}
