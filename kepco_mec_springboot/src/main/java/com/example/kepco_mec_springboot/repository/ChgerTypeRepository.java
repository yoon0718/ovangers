package com.example.kepco_mec_springboot.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.kepco_mec_springboot.model.ChgerType;
import java.util.List;


@Repository
public interface ChgerTypeRepository extends JpaRepository<ChgerType,String> {
    List<ChgerType> findByChgerType(String chgerType);
    List<ChgerType> findByType(String type);
}
