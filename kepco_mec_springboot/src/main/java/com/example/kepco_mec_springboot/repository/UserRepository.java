package com.example.kepco_mec_springboot.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.kepco_mec_springboot.model.User;

@Repository
public interface UserRepository extends JpaRepository<User,String> {
    List<User> findByUserIdAndUserPassword(String userId,String userPassword);
    User findByUserId(String userId);
    List<User> findByUserTelephone(String userTelephone);
    List<User> findByUserEmail(String userEmail);
}
