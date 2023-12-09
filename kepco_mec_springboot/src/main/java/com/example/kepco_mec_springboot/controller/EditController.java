package com.example.kepco_mec_springboot.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
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
    @PutMapping("/api/account/{userId}")
    public String updateAccount(
        @RequestParam("userId") String userId,
        @RequestParam("userPassword") String userPassword,
        @RequestParam("userEmail") String userEmail,
        @RequestParam("userNickname") String userNickname,
        @RequestParam("userTelephone") String userTelephone
    ) {
        String grade = userRepository.findByUserId(userId).get(0).getManagerCheck();
        int point = userRepository.findByUserId(userId).get(0).getUserPoint();

        User userInfo = new User();
        userInfo.setUserId(userId);
        userInfo.setUserPassword(userPassword);
        userInfo.setUserEmail(userEmail);
        userInfo.setUserTelephone(userTelephone);
        userInfo.setUserNickname(userNickname);
        userInfo.setUserPoint(point);
        userInfo.setManagerCheck(grade);
        userRepository.save(userInfo);

        return "회원 정보 수정 성공";
    }

    // 회원 탈퇴
    @DeleteMapping("/api/account/{userId}")
    public String deleteAccount(@PathVariable String userId) {
        userRepository.deleteById(userId);
        return "회원 정보 삭제 성공";
    }
}
