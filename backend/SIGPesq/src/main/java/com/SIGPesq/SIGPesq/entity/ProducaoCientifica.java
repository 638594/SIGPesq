package com.SIGPesq.SIGPesq.entity;

import jakarta.persistence.*;
import lombok.Data;
import lombok.RequiredArgsConstructor;

@Entity
@Data
@RequiredArgsConstructor
public class ProducaoCientifica {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String titulo;

    private String tipoProducao;

    private Long anoPublicacao;

    private String meioDivulgacao;

    @ManyToOne
    private Project project;
}
