package com.hyd.health.system.excpetion;

/**
 * Created by xieshuai on 2020/7/20 上午 10:04
 */
public class BusinessErrorException extends RuntimeException {

    private static final long serialVersionUID = -7480022450501760611L;
    /**
     * 异常码
     */
    private String code;
    /**
     * 异常提示信息
     */
    private String message;


    public BusinessErrorException(BusinessMsgEnum msgEnum){
        this.code = msgEnum.getCode();
        this.message = msgEnum.getMsg();
    }

    public BusinessErrorException(String msg){
        this.message = msg;
        this.code = "101";
    }

    public static long getSerialVersionUID() {
        return serialVersionUID;
    }

    public String getCode() {
        return code;
    }

    public void setCode(String code) {
        this.code = code;
    }

    @Override
    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }
}
