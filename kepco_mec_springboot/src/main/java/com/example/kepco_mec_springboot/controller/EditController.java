package com.example.kepco_mec_springboot.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.kepco_mec_springboot.model.User;
import com.example.kepco_mec_springboot.repository.ApplyChargeRepository;
import com.example.kepco_mec_springboot.repository.UserRepository;

@RestController
@CrossOrigin(origins = "*")
public class EditController {
    @Autowired
    UserRepository userRepository;
    @Autowired
    ApplyChargeRepository applyChargeRepository;

    // 회원 정보 수정
    @PutMapping("/api/account/{sessionId}")
    public String userAccount(
        @PathVariable("sessionId") String sessionId,
        @RequestParam("userEmail") String userEmail,
        @RequestParam("userNickname") String userNickname,
        @RequestParam("userTelephone") String userTelephone
    ) {
        User userInfo = userRepository.findByUserId(sessionId);
        userInfo.setUserEmail(userEmail);
        userInfo.setUserTelephone(userTelephone);
        userInfo.setUserNickname(userNickname);
        userRepository.save(userInfo);

        return "수정 완료";
    }

    // 회원 탈퇴
    @DeleteMapping("/api/account/{sessionId}")
    public String deleteAccount(@PathVariable String sessionId) {
        userRepository.deleteById(sessionId);

        return "회원 탈퇴 완료";
    }
}
