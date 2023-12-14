package com.example.kepco_mec_springboot.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.kepco_mec_springboot.model.Point;
import com.example.kepco_mec_springboot.model.User;


@Repository
public interface PointRepository extends JpaRepository<Point,Integer> {
    List<Point> findByUserId(User userId);
}
