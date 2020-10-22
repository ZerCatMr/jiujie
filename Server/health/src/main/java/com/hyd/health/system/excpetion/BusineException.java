package com.hyd.health.system.excpetion;



/**
 *   业务异常
 *   该状态下异常不会进入Log中，只响应提示信息
 */

public class BusineException extends RuntimeException{

   private String msg;

   private Integer code;

   private Object data;

    public String getMsg() {
        return msg;
    }

    public void setMsg(String msg) {
        this.msg = msg;
    }

    public Integer getCode() {
        return code;
    }

    public void setCode(Integer code) {
        this.code = code;
    }

    public Object getData() {
        return data;
    }

    public void setData(Object data) {
        this.data = data;
    }

    public BusineException(String msg){
        this.msg = msg;
        this.code = 500;
    }

    public BusineException(String msg, Object data){
        this.msg = msg;
        this.data = data;
        this.code = 500;
    }
}
