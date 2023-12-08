package com.example.kepco_mec_springboot.controller;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin(origins = "*")
public class MainController {
    @PostMapping("/api/request")
    public String insertRequest() {
        return "";
    }
}
