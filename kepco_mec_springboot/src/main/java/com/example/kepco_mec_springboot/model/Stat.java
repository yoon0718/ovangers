package com.example.kepco_mec_springboot.model;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import lombok.Data;

@Data
@Entity
public class Stat {
    @Id
    private int stat;
    private String situation;
}
