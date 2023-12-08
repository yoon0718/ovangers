package com.example.kepco_mec_springboot.model;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import lombok.Data;

@Data
@Entity
public class User {
    @Id
    private String userId;
    private String userPassword;
    private String userEmail;
    private String userTelephone;
    private String userNickname;
    private int userPoint;
    private String managerCheck;
}
