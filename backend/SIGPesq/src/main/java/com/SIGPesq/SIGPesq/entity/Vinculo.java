package com.SIGPesq.SIGPesq.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonFormat;
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
    private Long id;

    @ManyToOne
    @JoinColumn(name = "projeto_id", nullable = false)
    @JsonBackReference
    private Project project;

    @ManyToOne
    @JoinColumn(name = "participant_id", nullable = false)
    private Participant participant;

    private String funcao;

    private LocalDate dataEntrada;

    @JsonFormat(pattern = "yyyy-MM-dd")
    private LocalDate dataSaida;

    @PrePersist
    protected void onCreate(){
        if(this.dataEntrada == null){
            this.dataEntrada = LocalDate.now();
        }
    }
}
