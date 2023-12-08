package com.example.kepco_mec_springboot.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.kepco_mec_springboot.model.Stat;
import java.util.List;


@Repository
public interface StatRepository extends JpaRepository<Stat,Integer> {
    List<Stat> findByStat(int stat);
    List<Stat> findBySituation(String situation);
}
