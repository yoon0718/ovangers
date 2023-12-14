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
import com.example.kepco_mec_springboot.model.ChargerMap;
import com.example.kepco_mec_springboot.model.ChargerReport;
import com.example.kepco_mec_springboot.model.Point;
import com.example.kepco_mec_springboot.model.User;
import com.example.kepco_mec_springboot.repository.ApplyChargeRepository;
import com.example.kepco_mec_springboot.repository.ChargerMapRepository;
import com.example.kepco_mec_springboot.repository.ChargerReportRepository;
import com.example.kepco_mec_springboot.repository.PointRepository;
import com.example.kepco_mec_springboot.repository.StatRepository;
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
    @Autowired
    ChargerMapRepository chargerMapRepository;
    @Autowired
    StatRepository statRepository;
    @Autowired
    PointRepository pointRepository;

    // 충전 요청 목록
    @GetMapping("/api/request")
    public List<ApplyCharge> selectRequest(@RequestParam("userId") String userId) {
        List<ApplyCharge> applyChargeList = new ArrayList<>();

        if (userId.equals("admin") == true) {
            for (int i=0; i<applyChargeRepository.findAll().size(); i++) {
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
        else {
            User user = new User();
            user.setUserId(userRepository.findByUserId(userId).getUserId());

            for (int i=0; i<applyChargeRepository.findByUserId(user).size(); i++) {
                ApplyCharge applyCharge = new ApplyCharge();
                applyCharge.setPostNumber(applyChargeRepository.findByUserId(user).get(i).getPostNumber());
                applyCharge.setUserId(user);
                applyCharge.setPostStartDate(applyChargeRepository.findByUserId(user).get(i).getPostStartDate());
                applyCharge.setPostEndDate(applyChargeRepository.findByUserId(user).get(i).getPostEndDate());
                applyCharge.setLat(applyChargeRepository.findByUserId(user).get(i).getLat());
                applyCharge.setLng(applyChargeRepository.findByUserId(user).get(i).getLng());
                applyChargeList.add(applyCharge);
            }
            return applyChargeList;
        }
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
            return "완료된 요청입니다";
        }
    }

    // 고장 신고 목록
    @GetMapping("/api/down")
    public List<ChargerReport> selectDown(@RequestParam("userId") String userId) {
        List<ChargerReport> chargerReportList = new ArrayList<>();
        
        if (userId.equals("admin") == true) {
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
        else {
            User user = new User();
            user.setUserId(userRepository.findByUserId(userId).getUserId());

            for (int i = 0; i < chargerReportRepository.findByUserId(user).size(); i++) {
                ChargerReport chargerReport = new ChargerReport();
                chargerReport.setPostNum(chargerReportRepository.findByUserId(user).get(i).getPostNum());
                chargerReport.setStchId(chargerReportRepository.findByUserId(user).get(i).getStchId());
                chargerReport.setUserId(user);
                chargerReport.setPostStartDate(chargerReportRepository.findByUserId(user).get(i).getPostStartDate());
                chargerReport.setPostEndDate(chargerReportRepository.findByUserId(user).get(i).getPostEndDate());
                chargerReportList.add(chargerReport);
            }
            return chargerReportList;
        }
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

            ChargerMap chargerMap = chargerReportRepository.findByPostNum(postNum).get(0).getStchId();
            chargerMap.setStat(statRepository.findByStat(2));
            chargerMapRepository.save(chargerMap);

            Point point = new Point();
            point.setPostEndDate(LocalDateTime.now().format(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss")));
            point.setPoint(500);
            point.setUserId(userRepository.findByUserId(userId));
            pointRepository.save(point);

            return "수리 완료";
        }
        else {
            return "완료된 신고입니다";
        }
    }

    // 포인트 지급 내역
    @GetMapping("/api/point")
    public List<Point> point(@RequestParam("userId") String userId) {
        List<Point> pointList = new ArrayList<>();

        if (userId.equals("admin") == true) {
            for (int i=0; i<pointRepository.findAll().size(); i++) {
                User user = new User();
                user.setUserId(pointRepository.findAll().get(i).getUserId().getUserId());

                Point point = new Point();
                point.setUserId(user);
                point.setPostEndDate(pointRepository.findAll().get(i).getPostEndDate());
                point.setPoint(pointRepository.findAll().get(i).getPoint());
                pointList.add(point);
            }
            return pointList;
        }
        else {
            User user = new User();
            user.setUserId(userRepository.findByUserId(userId).getUserId());

            for (int i=0; i<pointRepository.findByUserId(user).size(); i++) {
                Point point = new Point();
                point.setUserId(user);
                point.setPostEndDate(pointRepository.findByUserId(user).get(i).getPostEndDate());
                point.setPoint(pointRepository.findByUserId(user).get(i).getPoint());
                pointList.add(point);
            }
            return pointList;
        }
    }
}
