package com.example.kepco_mec_springboot.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.kepco_mec_springboot.model.BusiId;
import java.util.List;


@Repository
public interface BusiIdRepository extends JpaRepository<BusiId,String> {
    List<BusiId> findByBusiId(String busiId);
    List<BusiId> findByAgency(String agency);
}
