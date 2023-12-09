package com.example.kepco_mec_springboot.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.kepco_mec_springboot.model.ChargerReport;
import java.util.List;


@Repository
public interface ChargerReportRepository extends JpaRepository<ChargerReport,Integer> {
    List<ChargerReport> findByPostNum(int postNum);
}
