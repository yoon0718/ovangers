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
import com.example.kepco_mec_springboot.repository.UserRepository;

@RestController
@CrossOrigin(origins = "*")
public class ManageController {
    @Autowired
    ApplyChargeRepository applyChargeRepository;
    @Autowired
    ChargerReportRepository chargerReportRepository;
    @Autowired
    UserRepository userRepository;

    // 충전 요청 목록
    @GetMapping("/api/request")
    public List<ApplyCharge> selectRequest() {
        List<ApplyCharge> applyChargeList = new ArrayList<>();
        
        for (int i = 0; i < applyChargeRepository.findAll().size(); i++) {
            User user = new User();
            user.setUserId(applyChargeRepository.findAll().get(i).getUserId().getUserId());

            ApplyCharge applyCharge = new ApplyCharge();
            applyCharge.setPostNumber(applyChargeRepository.findAll().get(i).getPostNumber());
            applyCharge.setUserId(user);
            applyCharge.setPostStartDate(applyChargeRepository.findAll().get(i).getPostStartDate());
            applyCharge.setPostEndDate(applyChargeRepository.findAll().get(i).getPostEndDate());
            applyCharge.setLat(applyChargeRepository.findAll().get(i).getLat());
            applyCharge.setLng(applyChargeRepository.findAll().get(i).getLng());
            applyChargeList.add(applyCharge);
        }
        
        return applyChargeList;
    }

    // 충전 요청 완료
    @PutMapping("/api/request")
    public String updateRequest(
        @RequestParam("postNumber") int postNumber,
        @RequestParam("userId") String userId
    ) {
        if (applyChargeRepository.findByPostNumber(postNumber).get(0).getPostEndDate() == null) {
            List<ApplyCharge> applyCharge = applyChargeRepository.findByPostNumber(postNumber);
            applyCharge.get(0).setPostEndDate(LocalDateTime.now().format(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss")));
            applyChargeRepository.saveAll(applyCharge);
            return "충전 완료";
        }
        else {
            return "에임 이슈";
        }
    }

    // 고장 신고 목록
    @GetMapping("/api/down")
    public List<ChargerReport> selectDown() {
        List<ChargerReport> chargerReportList = new ArrayList<>();
        
        for (int i = 0; i < chargerReportRepository.findAll().size(); i++) {
            User user = new User();
            user.setUserId(chargerReportRepository.findAll().get(i).getUserId().getUserId());

            ChargerReport chargerReport = new ChargerReport();
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
    public String updateDown(
        @RequestParam("postNum") int postNum,
        @RequestParam("userId") String userId
    ) {
        if (chargerReportRepository.findByPostNum(postNum).get(0).getPostEndDate() == null) {
            List<ChargerReport> chargerReport = chargerReportRepository.findByPostNum(postNum);
            chargerReport.get(0).setPostEndDate(LocalDateTime.now().format(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss")));
            chargerReportRepository.saveAll(chargerReport);

            User userInfo = userRepository.findByUserId(userId);
            userInfo.setUserPoint(userRepository.findByUserId(userId).getUserPoint() + 500);
            userRepository.save(userInfo);

            return "수리 완료";
        }
        else {
            return "에임 이슈";
        }
    }
}
