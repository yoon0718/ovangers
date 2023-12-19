package com.example.kepco_mec_springboot.controller;

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
    
    // 비밀번호 재설정 전 회원 정보 일치 확인
    @PostMapping("/api/findPw")
    public boolean selectAccount(
        @RequestParam("userId") String userId,
        @RequestParam("userTelephone") String userTelephone,
        @RequestParam("userEmail") String userEmail
    ) {
        User userInfoI = userRepository.findByUserId(userId);

        if (userInfoI != null) {
            if (userInfoI.getUserTelephone().equals(userTelephone) & userInfoI.getUserEmail().equals(userEmail)) {
                return true;
            }
            else {
                return false;
            }
        }
        else {
            return false;
        }
    }

    // 비밀번호 재설정
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
