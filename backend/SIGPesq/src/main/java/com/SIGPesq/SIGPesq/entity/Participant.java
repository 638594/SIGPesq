package com.SIGPesq.SIGPesq.entity;


import com.SIGPesq.SIGPesq.enums.Tipos;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Data;

import java.util.List;

@Entity
@Data

public class Participant {

    @Id
    private String cpf;

    private String nome;

    private String email;

    @Enumerated(EnumType.STRING)
    private Tipos tipo;

    @OneToMany(mappedBy = "participant", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonIgnore
    private List<Vinculo> vinculos;



}
