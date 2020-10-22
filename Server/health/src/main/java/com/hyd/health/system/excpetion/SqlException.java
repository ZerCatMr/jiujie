package com.hyd.health.system.excpetion;

/**
 * SQl异常
 */
public class SqlException extends RuntimeException {


    private String msg;

    private Integer code;

    private Object data;

    public SqlException(String msg){
        this.code = 500;
        this.msg = msg;
    }

    public SqlException(String msg, Object data){
        this.code = 500;
        this.msg = msg;
        this.data = data;
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
