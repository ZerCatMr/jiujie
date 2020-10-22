package com.hyd.health.system.domain;

import lombok.Data;

@Data
public class JsonPageResult {

    private Integer count;

    private String code;

    private String msg;

    private Object data;

    public JsonPageResult(){
        this.code = "200";
        this.msg = "请求成功";
    }


    public JsonPageResult(String code, String msg, Object data,Integer count){
        this.code = code;
        this.msg = msg;
        this.data = data;
        this.count = count;
    }


}
