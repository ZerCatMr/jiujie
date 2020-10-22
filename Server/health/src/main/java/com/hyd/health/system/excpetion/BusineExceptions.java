package com.hyd.health.system.excpetion;



/**
 *   业务异常
 *   该状态下异常不会进入Log中，只响应提示信息
 */

public class BusineExceptions extends RuntimeException{

   private String msg;

   private String code;

   private Object data;

    public String getMsg() {
        return msg;
    }

    public void setMsg(String msg) {
        this.msg = msg;
    }

    public String getCode() {
        return code;
    }

    public void setCode(String code) {
        this.code = code;
    }

    public Object getData() {
        return data;
    }

    public void setData(Object data) {
        this.data = data;
    }

    public BusineExceptions(String msg){
        this.msg = msg;
    }


    public BusineExceptions(String msg,String code) {
        this.msg = msg;
        this.code = code;
    }

    public BusineExceptions(String msg,String code,Object data) {
        this.msg = msg;
        this.code = code;
        this.data = data;
    }
}
