package com.example.kepco_mec_springboot.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import com.example.kepco_mec_springboot.model.User;
import com.example.kepco_mec_springboot.repository.UserRepository;

@RestController
@CrossOrigin(origins = "*")
public class FindPwController {
    @Autowired
    UserRepository userRepository;

    @GetMapping("/api/account/{userId}")
    public String selectAccount(@PathVariable String userId) {
        List<User> userInfo = userRepository.findByUserId(userId);

        if (userInfo.size() > 0) {
            return userInfo.get(0).getUserPassword();
        }
        else {
            return "아이디가 존재하지 않습니다";
        }
    }
}
