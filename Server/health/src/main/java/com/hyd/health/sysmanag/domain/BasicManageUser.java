package com.hyd.health.sysmanag.domain;

import lombok.Data;

import javax.validation.constraints.Max;

/**
 * <p>管理人员表实体</p>
 * @author liuwenwen
 * @date 2020/10/21
 * */

@Data
public class BasicManageUser {

    /**
     * 登录账户主键
     * */
    private String manageid;

    /**
     * 登录账户
     * */
    @Max(value = 50)
    private String loginaccount;

    /**
     * 人员性别编码
     * */
    private String gendercode;

    /**
     * 人员姓名
     * */
    @Max(value = 10)
    private String name;

    /**
     * 人员类型 1.干保办  2.体检医院  3.参检单位
     * */
    private int usertype;

    /**
     * 人员类型名称
     * */
    private String usertypename;

    /**
     * 机构编码
     * */
    private String organid;

    /**
     * 手机号码
     * */
    private String phone;

    /**
     * 座机号
     * */
    private String officephone;

    /**
     * 状态 1 启用 0停用
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
