package com.example.kepco_mec_springboot.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.kepco_mec_springboot.model.User;
import com.example.kepco_mec_springboot.repository.UserRepository;

@RestController
@CrossOrigin(origins = "*")
public class EditController {
    @Autowired
    UserRepository userRepository;

    // 회원 정보 수정
    @PutMapping("/api/account/{sessionId}")
    public String userAccount(
        @PathVariable("sessionId") String sessionId,
        // @RequestParam("userPassword") String userPassword,
        @RequestParam("userEmail") String userEmail,
        @RequestParam("userNickname") String userNickname,
        @RequestParam("userTelephone") String userTelephone
    ) {
        User userInfo = userRepository.findByUserId(sessionId);
        // userInfo.setUserPassword(userPassword);
        userInfo.setUserEmail(userEmail);
        userInfo.setUserTelephone(userTelephone);
        userInfo.setUserNickname(userNickname);
        userRepository.save(userInfo);

        return "수정 성공";
    }

    // 회원 탈퇴
    @GetMapping("/api/account/{sessionId}")
    public void deleteAccount(@PathVariable String sessionId) {
        userRepository.deleteById(sessionId);
    }
}
