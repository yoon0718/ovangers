package com.example.kepco_mec_springboot.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.kepco_mec_springboot.model.ChargerMap;
import java.util.List;


@Repository
public interface ChargerMapRepository extends JpaRepository<ChargerMap,String> {
    List<ChargerMap> findAllByLatBetweenAndLngBetween(float lat_start,float lat_end,float lng_start,float lng_end);
}
