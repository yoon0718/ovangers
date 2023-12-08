package com.example.sprint.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.example.sprint.model.ChargerMap;
import com.example.sprint.repository.ChargerMapRepository;

@RestController
@CrossOrigin(origins = "*", methods = RequestMethod.POST)
public class ChargerMapController {
    @Autowired
    ChargerMapRepository chargerMapRepository;

    @PostMapping("/test")
    public String dataGet(
        @RequestBody ChargerMap[] data
    ){
        for (ChargerMap each:data){
            System.out.println(each);
            String stchId = each.getStatId().toString()+each.getChgerId().toString();
            each.setStchId(stchId);
            chargerMapRepository.save(each);
        }
        return "저장되었습니다";
    }
}