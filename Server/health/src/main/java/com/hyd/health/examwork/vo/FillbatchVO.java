package com.hyd.health.examwork.vo;


import lombok.Data;

@Data
public class FillbatchVO {
    private String batchid;
    private String batchname;
    private String batchyear;
    private String title;
    private String batch_starttime;
    private String batch_endtime;
    private String creatime;
    private String lastmodtime;
    private String is_effective;
}
