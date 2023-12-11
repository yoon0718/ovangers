package com.example.kepco_mec_springboot.controller;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.kepco_mec_springboot.model.ApplyCharge;
import com.example.kepco_mec_springboot.repository.ApplyChargeRepository;
import com.example.kepco_mec_springboot.repository.ChargerMapRepository;
import com.example.kepco_mec_springboot.repository.UserRepository;

@RestController
@CrossOrigin(origins = "*")
public class MainController {
    @Autowired
    ApplyChargeRepository applyChargeRepository;
    @Autowired
    UserRepository userRepository;
    @Autowired
    ChargerMapRepository chargerMapRepository;

    @PostMapping("/api/request/{sessionId}")
    public String insertRequest(
        @PathVariable String sessionId,
        @RequestParam("stchId") String stchId
    ) {
        ApplyCharge applyCharge = new ApplyCharge();
        applyCharge.setStchId(chargerMapRepository.findByStchId(stchId));
        applyCharge.setUserId(userRepository.findByUserId(sessionId));
        applyCharge.setPostStartDate(LocalDateTime.now().format(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss")));
        applyChargeRepository.save(applyCharge);

        return "접수되었습니다";
    }
}
