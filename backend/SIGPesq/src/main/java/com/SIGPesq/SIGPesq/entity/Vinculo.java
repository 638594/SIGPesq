package com.SIGPesq.SIGPesq.entity;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Entity
@Data
@Table(name = "vinculos")
@NoArgsConstructor
public class Vinculo {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @ManyToOne
    @JoinColumn(name = "projeto_id", nullable = false)
    private Project project;

    @ManyToOne
    @JoinColumn(name = "participant_id", nullable = false)
    private Participant participant;

    private String funcao;

    private LocalDate dataEntrada;

    private LocalDate dataSaida;

    protected void onCreate(){
        if(this.dataEntrada == null){
            this.dataEntrada = LocalDate.now();
        }
    }
}
