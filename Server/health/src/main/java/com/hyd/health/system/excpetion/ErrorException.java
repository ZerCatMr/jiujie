package com.hyd.health.system.excpetion;

/**
 * 指定业务抛出自定义异常时，请使用此异常
 * 当前异常不会进入log, 只会响应提示信息
 */
public class ErrorException extends RuntimeException {


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

    public ErrorException(String msg){
        this.msg = msg;
        this.code = 500;
    }

    public ErrorException(String msg, Object data){
        this.msg = msg;
        this.data = data;
        this.code = 500;
    }

}
