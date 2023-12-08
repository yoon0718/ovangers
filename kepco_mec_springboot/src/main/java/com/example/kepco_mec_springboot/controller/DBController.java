package com.example.kepco_mec_springboot.controller;

import java.util.*;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.kepco_mec_springboot.model.BusiId;
import com.example.kepco_mec_springboot.model.ChgerType;
import com.example.kepco_mec_springboot.model.User;
import com.example.kepco_mec_springboot.repository.BusiIdRepository;
import com.example.kepco_mec_springboot.repository.ChgerTypeRepository;

@RestController
public class DBController {
// User 테이블
    // 로그인
    @PostMapping("/api/login")
    public List<> login() {
        return "";
    }

    // 회원가입
    @PostMapping("/api/account")
    public List<User> insertAccount() {
        return "";
    }

    // 회원 정보 수정
    @PutMapping("/api/account")
    public List<> updateAccount() {
        return "";
    }

    // 회원 탈퇴
    @DeleteMapping("/api/account")
    public List<> deleteAccount() {
        return "";
    }

    // 비밀번호 찾기
    @GetMapping("/api/account")
    public List<> selectAccount() {
        return "";
    }

// Search 테이블
    // 검색
    @PostMapping("/api/search")
    public List<> search() {
        return "";
    }

    // 검색 기록
    @GetMapping("/api/search-list")
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
    // 

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
