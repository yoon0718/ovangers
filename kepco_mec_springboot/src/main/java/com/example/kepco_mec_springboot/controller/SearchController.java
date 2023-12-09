package com.example.kepco_mec_springboot.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.kepco_mec_springboot.model.Search;
import com.example.kepco_mec_springboot.repository.SearchRepository;

@RestController
@CrossOrigin(origins = "*")
public class SearchController {
    @Autowired
    SearchRepository searchRepository;

    // 검색
    @PostMapping("/api/search")
    public void search(
        @RequestParam("userId") String userId,
        @RequestParam("end") String end
    ) {

    }

    // 검색 기록
    @GetMapping("/api/search")
    public List<Search> searchList(@RequestParam("userId") String userId) {
        return searchRepository.findByUserId_UserId(userId);
    }
}
