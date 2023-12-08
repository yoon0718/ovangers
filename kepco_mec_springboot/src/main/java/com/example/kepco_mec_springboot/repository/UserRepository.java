package com.example.kepco_mec_springboot.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.kepco_mec_springboot.model.User;
import java.util.List;


@Repository
public interface UserRepository extends JpaRepository<User,String> {
    List<User> findByUserId(String userId);
}
