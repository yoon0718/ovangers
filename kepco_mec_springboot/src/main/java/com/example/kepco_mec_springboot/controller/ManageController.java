package com.example.kepco_mec_springboot.controller;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.kepco_mec_springboot.model.ApplyCharge;
import com.example.kepco_mec_springboot.model.ChargerReport;
import com.example.kepco_mec_springboot.repository.ApplyChargeRepository;
import com.example.kepco_mec_springboot.repository.ChargerReportRepository;

@RestController
@CrossOrigin(origins = "*")
public class ManageController {
    @Autowired
    ApplyChargeRepository applyChargeRepository;
    @Autowired
    ChargerReportRepository chargerReportRepository;

    // 충전 요청 목록
    @GetMapping("/api/request")
    public List<ApplyCharge> selectRequest() {
        return applyChargeRepository.findAll();
    }

    // 충전 요청 완료
    @PutMapping("/api/request")
    public void updateRequest(@RequestParam("postNumber") int postNumber) {
        List<ApplyCharge> applyCharge = applyChargeRepository.findByPostNumber(postNumber);
        applyCharge.get(0).setPostEndDate(LocalDateTime.now().format(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss")));
        applyChargeRepository.saveAll(applyCharge);
    }

    // 고장 신고 목록
    @GetMapping("/api/down")
    public List<ChargerReport> selectDown() {
        return chargerReportRepository.findAll();
    }

    // 고장 신고 완료
    @PutMapping("/api/down")
    public void updateDown(@RequestParam("postNum") int postNum) {
        List<ChargerReport> chargerReport = chargerReportRepository.findByPostNum(postNum);
        chargerReport.get(0).setPostEndDate(LocalDateTime.now().format(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss")));
        chargerReportRepository.saveAll(chargerReport);
    }
}
