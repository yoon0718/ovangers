package com.example.kepco_mec_springboot.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.kepco_mec_springboot.model.ApplyCharge;
import com.example.kepco_mec_springboot.model.User;

@Repository
public interface ApplyChargeRepository extends JpaRepository<ApplyCharge,Integer> {
    List<ApplyCharge> findByPostNumber(int postNumber);
    List<ApplyCharge> findByUserId(User userId);
}
