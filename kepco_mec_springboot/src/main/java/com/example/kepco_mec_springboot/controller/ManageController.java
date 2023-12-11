package com.example.kepco_mec_springboot.controller;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.kepco_mec_springboot.model.ApplyCharge;
import com.example.kepco_mec_springboot.model.ChargerReport;
import com.example.kepco_mec_springboot.model.User;
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
        List<ApplyCharge> applyChargeList = new ArrayList<>();
        ApplyCharge applyCharge = new ApplyCharge();
        for (int i = 0; i < applyChargeRepository.findAll().size(); i++) {
            User user = new User();
            user.setUserId(applyChargeRepository.findAll().get(i).getUserId().getUserId());

            applyCharge.setPostNumber(applyChargeRepository.findAll().get(i).getPostNumber());
            applyCharge.setStchId(applyChargeRepository.findAll().get(i).getStchId());
            applyCharge.setUserId(user);
            applyCharge.setPostStartDate(applyChargeRepository.findAll().get(i).getPostStartDate());
            applyCharge.setPostEndDate(applyChargeRepository.findAll().get(i).getPostEndDate());
            applyChargeList.add(applyCharge);
        }
        return applyChargeList;
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
        List<ChargerReport> chargerReportList = new ArrayList<>();
        ChargerReport chargerReport = new ChargerReport();
        for (int i = 0; i < chargerReportRepository.findAll().size(); i++) {
            User user = new User();
            user.setUserId(chargerReportRepository.findAll().get(i).getUserId().getUserId());

            chargerReport.setPostNum(chargerReportRepository.findAll().get(i).getPostNum());
            chargerReport.setStchId(chargerReportRepository.findAll().get(i).getStchId());
            chargerReport.setUserId(user);
            chargerReport.setPostStartDate(chargerReportRepository.findAll().get(i).getPostStartDate());
            chargerReport.setPostEndDate(chargerReportRepository.findAll().get(i).getPostEndDate());
            chargerReportList.add(chargerReport);
        }
        return chargerReportList;
    }

    // 고장 신고 완료
    @PutMapping("/api/down")
    public void updateDown(@RequestParam("postNum") int postNum) {
        List<ChargerReport> chargerReport = chargerReportRepository.findByPostNum(postNum);
        chargerReport.get(0).setPostEndDate(LocalDateTime.now().format(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss")));
        chargerReportRepository.saveAll(chargerReport);
    }
}
