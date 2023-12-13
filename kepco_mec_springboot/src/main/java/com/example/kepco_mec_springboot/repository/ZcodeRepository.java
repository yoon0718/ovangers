package com.example.kepco_mec_springboot.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.kepco_mec_springboot.model.Zcode;


@Repository
public interface ZcodeRepository extends JpaRepository<Zcode,String> {
    
}