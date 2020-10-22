package com.hyd.health.sysmanag.domain;

import lombok.Data;

/**
 * <p>参检医院院区实体</p>
 * @author liuwenwen
 * @date 2020/10/16
 * */

@Data
public class BasicHospital {

    /**
     * 医院编码
     * */
    private String hospid;

    /**
     * 医院名称
     * */
    private String hospname;

    /**
     * 机构类型
     * */
    private String organtype;

    /**
     * 状态
     * */
    private int status;

    /**
     * 创建时间
     * */
    private String creatime;

    /**
     * 最后修改时间
     * */
    private String lastmodtime;
}
