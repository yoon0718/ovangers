package com.example.kepco_mec_springboot.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.kepco_mec_springboot.model.Search;


@Repository
public interface SearchRepository extends JpaRepository<Search,Integer> {
    List<Search> findByUserId_UserId(String userId);
}
