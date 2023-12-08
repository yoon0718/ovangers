package com.example.kepco_mec_springboot.controller;

import java.util.*;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.kepco_mec_springboot.model.BusiId;
import com.example.kepco_mec_springboot.model.ChargerMap;
import com.example.kepco_mec_springboot.model.ChgerType;
import com.example.kepco_mec_springboot.model.User;
import com.example.kepco_mec_springboot.repository.BusiIdRepository;
import com.example.kepco_mec_springboot.repository.ChargerMapRepository;
import com.example.kepco_mec_springboot.repository.ChgerTypeRepository;
import com.example.kepco_mec_springboot.repository.UserRepository;

@RestController
public class DBController {
// User 테이블
    @Autowired
    UserRepository userRepository;
    @Autowired
    ChargerMapRepository chargerMapRepository;

    // 로그인
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
            return "로그인 실패\n아이디와 비밀번호를 다시 입력해주세요";
        }
    }

    // 회원가입
    @PostMapping("/api/account")
    public String insertAccount(
        @RequestParam("userId") String userId,
        @RequestParam("userPassword") String userPassword,
        @RequestParam("userEmail") String userEmail,
        @RequestParam("userNickname") String userNickname,
        @RequestParam("userTelephone") String userTelephone
    ) {
        User userInfo = new User();
        userInfo.setUserId(userId);
        userInfo.setUserPassword(userPassword);
        userInfo.setUserEmail(userEmail);
        userInfo.setUserNickname(userNickname);
        userInfo.setManagerCheck("user");
        userInfo.setUserTelephone(userTelephone);
        userInfo.setUserPoint(0);
        userRepository.save(userInfo);

        return "회원가입 성공";
    }

    // 회원 정보 수정
    @PutMapping("/api/account")
    public String updateAccount(
        @RequestParam("userId") String userId,
        @RequestParam("userPassword") String userPassword,
        @RequestParam("userEmail") String userEmail,
        @RequestParam("userNickname") String userNickname,
        @RequestParam("userTelephone") String userTelephone
    ) {
        String grade = userRepository.findByUserId(userId).getManagerCheck();
        int point = userRepository.findByUserId(userId).getUserPoint();

        User userInfo = new User();
        userInfo.setUserId(userId);
        userInfo.setUserPassword(userPassword);
        userInfo.setUserEmail(userEmail);
        userInfo.setUserNickname(userNickname);
        userInfo.setManagerCheck(grade);
        userInfo.setUserTelephone(userTelephone);
        userInfo.setUserPoint(point);
        userRepository.save(userInfo);

        return "회원 정보 수정 성공";
    }

    // 회원 탈퇴
    @DeleteMapping("/api/account")
    public List<> deleteAccount() {
        return "";
    }

    // 비밀번호 찾기
    @GetMapping("/api/account")
    public String selectAccount(@RequestParam("userId") String userId) {
        String check = userRepository.findByUserId(userId).getManagerCheck();
        return check;
    }

// Search 테이블
    // 검색
    @PostMapping("/api/search")
    public List<> search() {
        return "";
    }

    // 검색 기록
    @GetMapping("/api/search")
    public List<> searchList() {
        return "";
    }

// ApplyCharge 테이블
    // 충전 요청
    @PostMapping("/api/request")
    public List<> insertRequest() {
        return "";
    }

    // 충전 요청 목록
    @GetMapping("/api/request")
    public List<> selectRequest() {
        return "";
    }

    // 충전 요청 완료
    @PutMapping("/api/request")
    public List<> updateRequest() {
        return "";
    }

// ChargeMap 테이블
    // 지도 보기
    @GetMapping("/api/map")
    public List<> map() {
        return "";
    }

    // 지도 범위 설정
    @GetMapping("/api/location")
    public List<ChargerMap> location(
        @RequestParam("lat_start") float lat_start,
        @RequestParam("lat_end") float lat_end,
        @RequestParam("lng_start") float lng_start,
        @RequestParam("lng_end") float lng_end
    ) {
        List<ChargerMap> locations = chargerMapRepository.findAllByLatBetweenAndLngBetween(lat_start, lat_end, lng_start, lng_end);

        return locations;
    }

// ChargerReport 테이블
    // 고장 신고 목록
    @GetMapping("/api/down")
    public List<> selectDown() {
        return "";
    }

    // 고장 신고 완료
    @PutMapping("/api/down")
    public List<> updateDown() {
        return "";
    }
}
