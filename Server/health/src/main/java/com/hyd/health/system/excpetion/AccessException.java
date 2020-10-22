package com.hyd.health.system.excpetion;


/**
 *  权限控制异常
 *  当无相关api权限用户请求相关api时,请抛出当前异常
 */
public class AccessException  extends RuntimeException{


    private String msg;

    private Integer code;

    private Object data;

    public AccessException(String msg){
        this.msg = msg;
        this.code = 500;
    }

    public AccessException(String msg, Object data){
        this.msg = msg;
        this.data = data;
        this.code = 500;
    }

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
}
