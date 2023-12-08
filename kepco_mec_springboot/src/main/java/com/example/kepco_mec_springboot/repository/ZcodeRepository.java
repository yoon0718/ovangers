package com.example.kepco_mec_springboot.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.kepco_mec_springboot.model.Zcode;
import java.util.List;


@Repository
public interface ZcodeRepository extends JpaRepository<Zcode,String> {
    List<Zcode> findByZcode(String zcode);
    List<Zcode> findByCity(String city);
}
