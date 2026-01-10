package com.SIGPesq.SIGPesq.entity;

import com.SIGPesq.SIGPesq.enums.Situacao;
import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;


@Entity
@Data
@Table(name = "projetos")
@NoArgsConstructor
public class Project {


    @Id
    private String codProjeto;

    private String titulo;

    private String descricao;

    private LocalDate dataInicio;

    @JsonFormat(pattern = "yyyy-MM-dd")
    private LocalDate dataTermino;

    @Enumerated(EnumType.STRING)
    private Situacao situacao = Situacao.EM_ANDAMENTO;


    @PrePersist
    protected void onCreate() {
        this.dataInicio = LocalDate.now();
    }
}
