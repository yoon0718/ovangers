package com.example.kepco_mec_springboot.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.kepco_mec_springboot.model.ChargerMap;
import com.example.kepco_mec_springboot.model.ChargerReport;
import com.example.kepco_mec_springboot.model.User;


@Repository
public interface ChargerReportRepository extends JpaRepository<ChargerReport,Integer> {
    List<ChargerReport> findByPostNum(int postNum);
    List<ChargerReport> findByStchId(ChargerMap stchId);
    List<ChargerReport> findByUserId(User userId);
}
