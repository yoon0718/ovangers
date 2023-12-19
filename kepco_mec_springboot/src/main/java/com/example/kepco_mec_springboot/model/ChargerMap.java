package com.example.kepco_mec_springboot.model;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.Data;

@Data
@Entity
public class ChargerMap {
    @Id
    private String stchId;

    @ManyToOne
    @JoinColumn(name = "busiId")
    private BusiId busiId;

    @ManyToOne
    @JoinColumn(name = "stat")
    private Stat stat;

    @ManyToOne
    @JoinColumn(name = "chgerType")
    private ChgerType chgerType;

    @ManyToOne
    @JoinColumn(name = "zcode")
    private Zcode zcode;

    @ManyToOne
    @JoinColumn(name = "zscode")
    private Zscode zscode;

    @ManyToOne
    @JoinColumn(name = "kind")
    private Kind kind;

    @ManyToOne
    @JoinColumn(name = "kindDetail")
    private KindDetail kindDetail;

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
    private String limitYn;
    private String limitDetail;
    private String delYn;
    private String delDetail;
    private String trafficYn;
}
