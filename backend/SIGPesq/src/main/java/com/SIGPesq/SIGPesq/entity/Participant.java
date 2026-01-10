package com.SIGPesq.SIGPesq.entity;


import com.SIGPesq.SIGPesq.enums.Tipos;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.Id;
import lombok.Data;

@Entity
@Data

public class Participant {

    @Id
    private String cpf;

    private String nome;

    private String email;

    @Enumerated(EnumType.STRING)
    private Tipos tipo;

}
