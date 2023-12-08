package com.example.kepco_mec_springboot.controller;

import java.util.*;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
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
    public List<ChargerMap> location(
        @RequestParam("lat_start") float lat_start,
        @RequestParam("lat_end") float lat_end,
        @RequestParam("lng_start") float lng_start,
        @RequestParam("lng_end") float lng_end
    ) {
        List<ChargerMap> locations = chargerMapRepository.findAllByLatBetweenAndLngBetween(lat_start, lat_end, lng_start, lng_end);

        return locations;
    }
}
