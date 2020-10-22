package com.hyd.health.system.excpetion;

/**
 * 业务异常提示信息枚举类
 */
public enum BusinessMsgEnum {

    /** 参数异常 */
    PARMETER_EXCEPTION("102", "参数异常!"),

    PARMETER_NULL_EXCEPTION("103", "必填参数未传入"),

    /** 等待超时 */
    SERVICE_TIME_OUT("104", "服务调用超时！"),

    /** 参数过大 */
    PARMETER_BIG_EXCEPTION("105", "传入参数超出范围"),

    SQL_EXCT_EXCEPTION("106", "SQL执行异常"),

    SQL_TIME_OUT("107", "数据库连接异常"),

    // 还可以定义更多的业务异常

    /** 500 : 一劳永逸的提示也可以在这定义 */
    UNEXPECTED_EXCEPTION("500", "系统发生异常，请联系管理员！");




    /**
     * 消息码
     */
    private String code;

    /**
     * 消息内容
     */
    private String msg;
    private BusinessMsgEnum(String code, String msg) {
        this.code = code;
        this.msg = msg;
    }

    public String getCode() {
        return code;
    }

    public void setCode(String code) {
        this.code = code;
    }

    public String getMsg() {
        return msg;
    }

    public void setMsg(String msg) {
        this.msg = msg;
    }
}


