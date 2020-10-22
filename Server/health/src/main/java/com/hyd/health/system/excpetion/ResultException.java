package com.hyd.health.system.excpetion;

/**
 * 在拦截器解析返回值时如果发生异常，则抛出此异常， 例如返回值为Null
 *  当前异常不会进入log，只响应提示信息
 */
public class ResultException extends RuntimeException {

    private String msg;

    private Integer code;

    private Object data;

    public ResultException(String msg, Object data) {
        this.msg = msg;
        this.data = data;
        this.code = 500;
    }

    public ResultException(String msg) {
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
