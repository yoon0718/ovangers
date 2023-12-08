package com.example.kepco_mec_springboot.controller;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin(origins = "*")
public class SearchController {

    // 검색
    @PostMapping("/api/search")
    public String search() {
        return "";
    }

    // 검색 기록
    @GetMapping("/api/search")
    public String searchList() {
        return "";
    }
}
