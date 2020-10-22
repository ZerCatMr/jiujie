package com.hyd.health.sysmanag.domain;

import lombok.Data;

/**
 * <p>参检机构变更日志实体</p>
 * @author liuwenwen
 * @date 2020/10/16
 * */

@Data
public class BasicExamOrganLog {

    /**
     * 机构编码
     * */
    private String organid;

    /**
     * 机构名
     * */
    private String organname;

    /**
     * 机构前缀
     * */
    private String orgnaprefix;

    /**
     * 操作人员名称
     * */
    private String actionname;

    /**
     * 事件
     * */
    private int logaction;

    /**
     * 时间名称
     * */
    private String logdescript;

    /**
     * 变更前记录值
     * */
    private String srcvalue;

    /**
     * 变更后记录值
     * */
    private String tarvalue;
}
