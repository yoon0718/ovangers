package com.example.kepco_mec_springboot.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.kepco_mec_springboot.model.Zscode;
import java.util.List;


@Repository
public interface ZscodeRepository extends JpaRepository<Zscode,String> {
    List<Zscode> findByZscode(String zscode);
    List<Zscode> findByCounty(String county);
}
