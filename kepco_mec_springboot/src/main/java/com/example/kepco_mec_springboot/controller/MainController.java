package com.example.kepco_mec_springboot.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.kepco_mec_springboot.repository.ChargerMapRepository;

@RestController
@CrossOrigin(origins = "*")
public class MainController {
    @Autowired
    ChargerMapRepository chargerMapRepository;

    @PostMapping("/api/request")
    public String insertRequest(
        @RequestParam("lat") float lat,
        @RequestParam("lng") float lng
    ) {
        

        return "";
    }
}
