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

import com.example.kepco_mec_springboot.model.ChargerMap;
import com.example.kepco_mec_springboot.model.Search;
import com.example.kepco_mec_springboot.repository.ChargerMapRepository;
import com.example.kepco_mec_springboot.repository.SearchRepository;
import com.example.kepco_mec_springboot.repository.UserRepository;

@RestController
@CrossOrigin(origins = "*")
public class SearchController {
    @Autowired
    SearchRepository searchRepository;
    @Autowired
    ChargerMapRepository chargerMapRepository;
    @Autowired
    UserRepository userRepository;

    // 검색
    @PostMapping("/api/search/{sessionId}")
    public List<ChargerMap> searchUser(
        @PathVariable String sessionId,
        @RequestParam("addr") String addr,
        @RequestParam("lat") float lat,
        @RequestParam("lng") float lng
    ) {
        List<ChargerMap> search = chargerMapRepository.findChargerMapWithinRadius(addr, lat, lng, 1);
        Search saveSearch = new Search();
        saveSearch.setUserId(userRepository.findByUserId(sessionId));
        saveSearch.setStart("현위치");
        saveSearch.setEnd(addr);
        searchRepository.save(saveSearch);

        return search;
    }

    @PostMapping("/api/search")
    public List<ChargerMap> searchNotUser(
        @RequestParam("addr") String addr,
        @RequestParam("lat") float lat,
        @RequestParam("lng") float lng
    ) {
        List<ChargerMap> search = chargerMapRepository.findChargerMapWithinRadius(addr, lat, lng, 1);

        return search;
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
