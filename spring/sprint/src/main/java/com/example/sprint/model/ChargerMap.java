package com.example.sprint.model;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import lombok.Data;

@Data
@Entity
public class ChargerMap{
    @Id
    private String stchId;
    private String busiId;
    private int stat;
    private String chgerType;
    private String zcode;
    private String zscode;
    private String kind;
    private String kindDetail;
    private String statNm;
    private String statId;
    private String chgerId;
    private String addr;
    private String location;
    private float lat;
    private float lng;
    private String useTime;
    private String bnm;
    private String busiNm;
    private String busiCall;
    private String statUpdDt;
    private String lastTsdt;
    private String lastTedt;
    private String nowTsdt;
    private int output;
    private String method;
    private String parkingFree;
    private String note;
    private String limiYn;
    private String limitDetail;
    private String delYn;
    private String delDetail;
    private String trafficYn;
}
