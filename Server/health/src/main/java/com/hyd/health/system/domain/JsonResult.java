package com.hyd.health.system.domain;

/**
 * Created by xieshuai on 2020/7/20 上午 11:05
 */
public class JsonResult {

    private String code;

    private String msg;

    private Object data;

    public JsonResult(){
        this.code = "200";
        this.msg = "请求成功";
    }

    public JsonResult(String code, String msg){
        this.code = code;
        this.msg = msg;
    }

    public JsonResult(String code, String msg, Object data){
        this.code = code;
        this.msg = msg;
        this.data = data;
    }

    public String getCode() {
        return code;
    }

    public void setCode(String code) {
        this.code = code;
    }

    public String getMsg() {
        return msg;
    }

    public void setMsg(String msg) {
        this.msg = msg;
    }

    public Object getData() {
        return data;
    }

    public void setData(Object data) {
        this.data = data;
    }
}
