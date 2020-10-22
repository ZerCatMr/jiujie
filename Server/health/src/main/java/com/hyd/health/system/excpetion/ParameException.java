package com.hyd.health.system.excpetion;

/**
 *  参数异常
 *  当前异常信息不会进入Log, 只响应异常提示信息
 */
public class ParameException extends RuntimeException {


    private String msg;

    private Integer code;

    private Object data;

    public ParameException(String msg, Object data) {
        this.msg = msg;
        this.data = data;
        this.code = 500;
    }

    public ParameException(String msg) {
        this.msg = msg;
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
