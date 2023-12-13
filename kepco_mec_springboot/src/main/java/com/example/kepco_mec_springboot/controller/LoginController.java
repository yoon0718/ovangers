package com.example.kepco_mec_springboot.controller;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.kepco_mec_springboot.model.User;
import com.example.kepco_mec_springboot.repository.UserRepository;

@RestController
@CrossOrigin(origins = "*")
public class LoginController {
    @Autowired
    UserRepository userRepository;

    // 로그인
    @PostMapping("/api/login")
    public List<User> login(
        @RequestParam("userId") String userId,
        @RequestParam("userPassword") String userPassword
    ) {
        List<User> info = new ArrayList<>();
        List<User> loginInfo = userRepository.findByUserIdAndUserPassword(userId,userPassword);
        if (loginInfo.size() > 0) {
            User userInfo = new User();
            userInfo.setUserId(userRepository.findByUserId(userId).getUserId());
            userInfo.setUserEmail(userRepository.findByUserId(userId).getUserEmail());
            userInfo.setUserNickname(userRepository.findByUserId(userId).getUserNickname());
            userInfo.setUserTelephone(userRepository.findByUserId(userId).getUserTelephone());
            userInfo.setUserPoint(userRepository.findByUserId(userId).getUserPoint());
            userInfo.setManagerCheck(userRepository.findByUserId(userId).getManagerCheck());
            info.add(userInfo);
            return info;
        }
        else {
            return info;
        }
    }
}
