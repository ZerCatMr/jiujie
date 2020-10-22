package com.hyd.health.system.info;


import lombok.Data;

@Data
public class Pageinfo {

    //当前页
    private Integer page;

    //每页条数
    private Integer limit=10;

    //总条数
    private Integer count;

    //返回错误
    private String errMsg;

    //开始页码
    private Integer startNum;

    //结束页码
    private Integer endNum;



}
