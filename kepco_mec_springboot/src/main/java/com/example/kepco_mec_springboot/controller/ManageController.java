package com.example.kepco_mec_springboot.controller;

import java.util.*;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.kepco_mec_springboot.model.ApplyCharge;
import com.example.kepco_mec_springboot.repository.ApplyChargeRepository;

@RestController
@CrossOrigin(origins = "*")
public class ManageController {
    @Autowired
    ApplyChargeRepository applyChargeRepository;

    // 충전 요청 목록
    @GetMapping("/api/request")
    public List<ApplyCharge> selectRequest() {
        return applyChargeRepository.findAll();
    }

    // 충전 요청 완료
    @PutMapping("/api/request")
    public String updateRequest(@RequestParam("postNumber") int postNumber) {
        

        ApplyCharge applyCharge = new ApplyCharge();
        applyCharge.setPostEndDate(null);
        return "";
    }

    // 고장 신고 목록
    @GetMapping("/api/down")
    public String selectDown() {
        return "";
    }

    // 고장 신고 완료
    @PutMapping("/api/down")
    public String updateDown() {
        return "";
    }
}
