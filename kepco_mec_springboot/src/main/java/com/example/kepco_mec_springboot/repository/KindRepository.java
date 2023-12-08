package com.example.kepco_mec_springboot.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.kepco_mec_springboot.model.Kind;
import java.util.List;


@Repository
public interface KindRepository extends JpaRepository<Kind,String> {
    List<Kind> findByKind(String kind);
    List<Kind> findByFacility(String facility);
}
