package com.example.kepco_mec_springboot.controller;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.kepco_mec_springboot.model.ChargerMap;
import com.example.kepco_mec_springboot.repository.ChargerMapRepository;

@RestController
@CrossOrigin(origins = "*")
public class MapController {
    @Autowired
    ChargerMapRepository chargerMapRepository;

    @GetMapping("/api/location")
    public List<Map<String,Object>> location(
        @RequestParam("lat_start") float lat_start,
        @RequestParam("lat_end") float lat_end,
        @RequestParam("lng_start") float lng_start,
        @RequestParam("lng_end") float lng_end
    ) {
        List<Map<String,Object>> locations = chargerMapRepository.findGroupByAddrAndLatAndLngWithNativeQuery(lat_start, lat_end, lng_start, lng_end);

        return locations;
    }

    @PostMapping("/api/find")
    public List<ChargerMap> find(@RequestParam("addr") String addr) {
        return chargerMapRepository.findByAddr(addr);
    }

    @GetMapping("/api/finds")
    public List<ChargerMap> findsAll(
        @RequestParam("lat_start") float lat_start,
        @RequestParam("lat_end") float lat_end,
        @RequestParam("lng_start") float lng_start,
        @RequestParam("lng_end") float lng_end
    ) {
        List<ChargerMap> locations = chargerMapRepository.findAllByLatBetweenAndLngBetween(lat_start, lat_end, lng_start, lng_end);

        return locations;
    }

    @GetMapping("/api/down/{sessionId}")
    public List<ChargerMap> downReport(
        @PathVariable String sessionId,
        @RequestParam("lat") float lat,
        @RequestParam("lng") float lng
    ) {
        // ChargerReport chargerReport = new ChargerReport();
        // chargerReport.setStchId(chargerMapRepository.findByLatAndLng(lat, lng).get(0));
        return chargerMapRepository.findByLat(lat);
    }

    @GetMapping("/api/route")
    public void route(
        @RequestParam("lat_start") float lat_start,
        @RequestParam("lng_start") float lng_start,
        @RequestParam("lat_end") float lat_end,
        @RequestParam("lng_end") float lng_end
    ) {

    }
}
