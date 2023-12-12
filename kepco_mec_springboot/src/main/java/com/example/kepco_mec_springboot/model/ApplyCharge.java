package com.example.kepco_mec_springboot.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.Data;

@Data
@Entity
public class ApplyCharge {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int postNumber;

    @ManyToOne
    @JoinColumn(name = "stchId")
    private ChargerMap stchId;

    @ManyToOne
    @JoinColumn(name = "userId")
    private User userId;
    
    private String postStartDate;
    private String postEndDate;
    // private String deleteYn;
}
