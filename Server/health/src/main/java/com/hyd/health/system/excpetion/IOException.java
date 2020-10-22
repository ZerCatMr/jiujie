package com.hyd.health.system.excpetion;

/**
 * 进行IO操作时异常提醒
 */
public class IOException extends RuntimeException {

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

    public IOException(String msg){
        this.msg = msg;
        this.code = 500;
    }

    public IOException(String msg, Object data){
        this.msg = msg;
        this.data = data;
        this.code = 500;
    }
}
