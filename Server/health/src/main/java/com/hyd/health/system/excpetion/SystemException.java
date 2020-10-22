package com.hyd.health.system.excpetion;

/**
 * 系统级别的异常信息
 */
public class SystemException extends RuntimeException{

    private String msg;

    private Integer code;

    private Object data;

    public SystemException(String msg){
        this.code = 500;
        this.msg = msg;
    }

    public SystemException(String msg, Object data){
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
