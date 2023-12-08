package com.example.kepco_mec_springboot.controller;

import java.util.*;

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

    @PostMapping("/api/login")
    public String login(
        @RequestParam("userId") String userId,
        @RequestParam("userPassword") String userPassword
    ) {
        List<User> loginInfo = userRepository.findByUserIdAndUserPassword(userId,userPassword);
        if (loginInfo.size() > 0) {
            return "로그인 성공";
        }
        else {
            return "로그인 실패 | 아이디와 비밀번호를 다시 입력해주세요";
        }
    }
}
