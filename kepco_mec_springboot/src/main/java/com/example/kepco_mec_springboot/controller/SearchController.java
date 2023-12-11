package com.example.kepco_mec_springboot.controller;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
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
    @PostMapping("/api/search/{sessionId}")
    public void search(
        @PathVariable String sessionId,
        @RequestParam("start") String start,
        @RequestParam("end") String end
    ) {
        Search search = new Search();
        search.setUserId(searchRepository.findByUserId_UserId(sessionId).get(0).getUserId());
        search.setStart(start);
        search.setEnd(end);
        searchRepository.save(search);
    }

    // 검색 기록
    @GetMapping("/api/search/{sessionId}")
    public List<Search> searchList(@PathVariable String sessionId) {
        List<Search> searchList = new ArrayList<>();
        List<Search> userId = searchRepository.findByUserId_UserId(sessionId);
        
        for (int i = 0; i < userId.size(); i++) {
            Search search = new Search();
            search.setSeq(userId.get(i).getSeq());
            search.setStart(userId.get(i).getStart());
            search.setEnd(userId.get(i).getEnd());
            searchList.add(search);
        }

        return searchList;
    }
}
