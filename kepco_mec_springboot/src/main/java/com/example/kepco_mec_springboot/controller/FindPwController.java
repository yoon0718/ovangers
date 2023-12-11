package com.example.kepco_mec_springboot.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.kepco_mec_springboot.model.User;
import com.example.kepco_mec_springboot.repository.UserRepository;

@RestController
@CrossOrigin(origins = "*")
public class FindPwController {
    @Autowired
    UserRepository userRepository;
    
    @PostMapping("/api/findPw")
    public boolean selectAccount(
        @RequestParam("userId") String userId,
        @RequestParam("userTelephone") String userTelephone,
        @RequestParam("userEmail") String userEmail
    ) {
        User userInfoI = userRepository.findByUserId(userId);
        List<User> userInfoP = userRepository.findByUserTelephone(userTelephone);
        List<User> userInfoE = userRepository.findByUserEmail(userEmail);

        if (userInfoI != null & userInfoP.size()>0 & userInfoE.size()>0) {
            return true;
        }
        else {
            return false;
        }
    }

    @PutMapping("/api/findPw")
    public String updateAccount(
        @RequestParam("userId") String userId,
        @RequestParam("userPassword") String userPassword
    ) {
        User userInfo = userRepository.findByUserId(userId);
        userInfo.setUserPassword(userPassword);
        userRepository.save(userInfo);
        return "비밀번호 재설정 성공";
    }
}
