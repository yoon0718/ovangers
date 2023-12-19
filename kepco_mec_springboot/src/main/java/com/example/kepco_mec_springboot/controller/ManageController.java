package com.example.kepco_mec_springboot.controller;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
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
    @GetMapping("/api/request/{sessionId}")
    public List<ApplyCharge> selectRequest(@PathVariable String sessionId) {
        List<ApplyCharge> applyChargeList = new ArrayList<>();
        
        if (userRepository.findByUserId(sessionId).getManagerCheck().equals("A") || userRepository.findByUserId(sessionId).getManagerCheck().equals("CM")) {
            for (int i = applyChargeRepository.findAll().size()-1; i >= 0; i--) {
                User user = new User();
                user.setUserId(applyChargeRepository.findAll().get(i).getUserId().getUserId());

                ApplyCharge applyCharge = new ApplyCharge();
                applyCharge.setPostNumber(applyChargeRepository.findAll().get(i).getPostNumber());
                applyCharge.setUserId(user);
                applyCharge.setPostInnerDate(applyChargeRepository.findAll().get(i).getPostInnerDate());
                applyCharge.setPostStartDate(applyChargeRepository.findAll().get(i).getPostStartDate());
                applyCharge.setPostEndDate(applyChargeRepository.findAll().get(i).getPostEndDate());
                applyCharge.setLat(applyChargeRepository.findAll().get(i).getLat());
                applyCharge.setLng(applyChargeRepository.findAll().get(i).getLng());
                applyCharge.setBnm(applyChargeRepository.findAll().get(i).getBnm());
                applyChargeList.add(applyCharge);
            }
            
            return applyChargeList;
        }
        else {
            User user = new User();
            user.setUserId(userRepository.findByUserId(sessionId).getUserId());

            for (int i = applyChargeRepository.findByUserId(user).size()-1; i >= 0; i--) {
                ApplyCharge applyCharge = new ApplyCharge();
                applyCharge.setPostNumber(applyChargeRepository.findByUserId(user).get(i).getPostNumber());
                applyCharge.setUserId(user);
                applyCharge.setPostInnerDate(applyChargeRepository.findByUserId(user).get(i).getPostInnerDate());
                applyCharge.setPostStartDate(applyChargeRepository.findByUserId(user).get(i).getPostStartDate());
                applyCharge.setPostEndDate(applyChargeRepository.findByUserId(user).get(i).getPostEndDate());
                applyCharge.setLat(applyChargeRepository.findByUserId(user).get(i).getLat());
                applyCharge.setLng(applyChargeRepository.findByUserId(user).get(i).getLng());
                applyCharge.setBnm(applyChargeRepository.findByUserId(user).get(i).getBnm());
                applyChargeList.add(applyCharge);
            }
            
            return applyChargeList;
        }
    }

    // 충전 요청 접수
    @PutMapping("/api/request/inner")
    public String innerRequest(
        @RequestParam("postNumber") int postNumber,
        @RequestParam("userId") String userId
    ) {
        if (applyChargeRepository.findByPostNumber(postNumber).get(0).getPostInnerDate() == null) {
            List<ApplyCharge> applyCharge = applyChargeRepository.findByPostNumber(postNumber);
            applyCharge.get(0).setPostInnerDate(LocalDateTime.now().format(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss")));
            applyCharge.get(0).setBnm(userId);
            applyChargeRepository.saveAll(applyCharge);

            return "충전 요청 접수";
        }
        else {
            return "접수된 요청입니다";
        }
    }

    // 충전 요청 완료
    @PutMapping("/api/request")
    public String updateRequest(
        @RequestParam("postNumber") int postNumber,
        @RequestParam("userId") String userId
    ) {
        if(applyChargeRepository.findByPostNumber(postNumber).get(0).getPostInnerDate() != null){
            if(applyChargeRepository.findByPostNumber(postNumber).get(0).getBnm().equals(userId)){
                if (applyChargeRepository.findByPostNumber(postNumber).get(0).getPostEndDate() == null) {
                    List<ApplyCharge> applyCharge = applyChargeRepository.findByPostNumber(postNumber);
                    applyCharge.get(0).setPostEndDate(LocalDateTime.now().format(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss")));
                    applyChargeRepository.saveAll(applyCharge);
                    return "충전 완료";
                }
                else {
                    return "완료된 요청입니다";
                }
            } else{
                return "담당 업체만 완료처리할 수 있습니다.";
            }
        } else {
            return "접수가 먼저 진행되어야합니다";
        }
    }

    // 충전 요청 취소
    @DeleteMapping("/api/request")
    public String deleteRequest(
        @RequestParam("postNumber") int postNumber,
        @RequestParam("userId") String userId
        ) {
        if(applyChargeRepository.findByPostNumber(postNumber).get(0).getPostInnerDate() == null){
                    
            return "접수부터 진행해주세요.";
        }else{
            if(applyChargeRepository.findByPostNumber(postNumber).get(0).getBnm().equals(userId)){
                if(applyChargeRepository.findByPostNumber(postNumber).get(0).getPostEndDate() == null){
                    applyChargeRepository.delete(applyChargeRepository.findByPostNumber(postNumber).get(0));
                    
                    return "충전 요청 취소";
                } else {
                    return "완료한 내용은 취소할 수 없습니다.";
                }
            } else {
                return "담당 업체만 취소할 수 있습니다.";
            }
        }
    }

    // 고장 신고 목록
    @GetMapping("/api/down")
    public List<ChargerReport> selectDown() {
        List<ChargerReport> chargerReportList = new ArrayList<>();
    
        for (int i = chargerReportRepository.findAll().size()-1; i >= 0 ; i--) {
            User user = new User();
            user.setUserId(chargerReportRepository.findAll().get(i).getUserId().getUserId());

            ChargerReport chargerReport = new ChargerReport();
            chargerReport.setPostNum(chargerReportRepository.findAll().get(i).getPostNum());
            chargerReport.setStchId(chargerReportRepository.findAll().get(i).getStchId());
            chargerReport.setAddr(chargerReportRepository.findAll().get(i).getAddr());
            chargerReport.setUserId(user);
            chargerReport.setPostInnerDate(chargerReportRepository.findAll().get(i).getPostInnerDate());
            chargerReport.setPostStartDate(chargerReportRepository.findAll().get(i).getPostStartDate());
            chargerReport.setPostEndDate(chargerReportRepository.findAll().get(i).getPostEndDate());
            chargerReport.setBnm(chargerReportRepository.findAll().get(i).getBnm());
            chargerReportList.add(chargerReport);
        }
        return chargerReportList;
    }

    // 고장 신고 접수
    @PostMapping("/api/down/inner")
    public String innerDown(
        @RequestParam("postNum") int postNum,
        @RequestParam("userId") String userId
    ) {
        if (chargerReportRepository.findByPostNum(postNum).get(0).getPostInnerDate() == null) {
            List<ChargerReport> chargerReport = chargerReportRepository.findByPostNum(postNum);
            chargerReport.get(0).setPostInnerDate(LocalDateTime.now().format(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss")));
            chargerReport.get(0).setBnm(userId);
            chargerReportRepository.saveAll(chargerReport);

            return "고장 신고 접수";
        }
        else {
            return "접수된 신고입니다";
        }
    }

    // 고장 신고 완료
    @PutMapping("/api/down")
    public String updateDown(
        @RequestParam("postNum") int postNum,
        @RequestParam("userId") String userId
    ) {
        if(chargerReportRepository.findByPostNum(postNum).get(0).getPostInnerDate() != null){
            if(chargerReportRepository.findByPostNum(postNum).get(0).getBnm().equals(userId)){
                if (chargerReportRepository.findByPostNum(postNum).get(0).getPostEndDate() == null) {
                    List<ChargerReport> chargerReport = chargerReportRepository.findByPostNum(postNum);
                    chargerReport.get(0).setPostEndDate(LocalDateTime.now().format(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss")));
                    chargerReportRepository.saveAll(chargerReport);

                    String reportUser = chargerReportRepository.findByPostNum(postNum).get(0).getUserId().getUserId();

                    User userInfo = userRepository.findByUserId(reportUser);
                    userInfo.setUserPoint(userRepository.findByUserId(reportUser).getUserPoint() + 500);
                    userRepository.save(userInfo);

                    ChargerMap chargerMap = chargerReportRepository.findByPostNum(postNum).get(0).getStchId();
                    chargerMap.setStat(statRepository.findByStat(2));
                    chargerMapRepository.save(chargerMap);

                    Point point = new Point();
                    point.setPostEndDate(LocalDateTime.now().format(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss")));
                    point.setPoint(500);
                    point.setUserId(userRepository.findByUserId(reportUser));
                    pointRepository.save(point);

                    return "수리 완료";
                }
                else {
                    return "완료된 신고입니다";
                }
            } else{
                return "담당 업체만 완료할 수 있습니다";
            }
        } else {
            return "접수부터 진행해주세요";
        }
    }

    // 고장 신고 취소
    @DeleteMapping("/api/down")
    public String delete(
        @RequestParam("postNum") int postNum,
        @RequestParam("userId") String userId
        ) {
        ChargerReport target = chargerReportRepository.findByPostNum(postNum).get(0);
        if(target.getPostInnerDate() != null){
            if(target.getBnm().equals(userId)){
                if(target.getPostEndDate() == null){
                    chargerReportRepository.delete(chargerReportRepository.findByPostNum(postNum).get(0));
                    return "고장 신고 취소";
                }else{
                    return "완료된 신고는 삭제할 수 없습니다.";
                }
            } else {
                return "담당 업체만 취소할 수 있습니다.";
            }
        } else {
            return "접수부터 진행해주세요";
        }
    }

    // 포인트 지급 내역
    @GetMapping("/api/point")
    public List<Point> point(@RequestParam("userId") String userId) {
        List<Point> pointList = new ArrayList<>();

        if (userId.equals("admin") == true) {
            for (int i = pointRepository.findAll().size()-1; i >= 0; i--) {
                User user = new User();
                user.setUserId(pointRepository.findAll().get(i).getUserId().getUserId());

                Point point = new Point();
                point.setSeq(pointRepository.findAll().get(i).getSeq());
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

            for (int i = pointRepository.findByUserId(user).size()-1; i >= 0; i--) {
                Point point = new Point();
                point.setSeq(pointRepository.findByUserId(user).get(i).getSeq());
                point.setUserId(user);
                point.setPostEndDate(pointRepository.findByUserId(user).get(i).getPostEndDate());
                point.setPoint(pointRepository.findByUserId(user).get(i).getPoint());
                pointList.add(point);
            }
            return pointList;
        }
    }
}
