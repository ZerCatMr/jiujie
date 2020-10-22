package com.hyd.health.sysmanag.domain.info;

import lombok.Data;

/**
 * <p>保健对象表实体</p>
 *
 * @author ：liuwenwen
 * @date ：2020/10/21 14:44
 */

@Data
public class BasicCareuser {

    /**
     * 登录账户主键
     * */
    private String careuserid;

    /**
     * 人员姓名
     * */
    private String carename;

    /**
     * 性别编码
     * */
    private String gendercode;

    /**
     * 生日
     * */
    private String birth;

    /**
     * 身份证号
     * */
    private String idenid;

    /**
     * 人员等级编码
     * */
    private String levelcode;

    /**
     * 人员等级名称
     * */
    private String levelname;

    /**
     * 人员类型编码
     * */
    private String typecode;

    /**
     * 医疗待遇级别
     * */
    private String treatcode;

    /**
     * 职位
     * */
    private String duty;

    /**
     * 电话号码
     * */
    private String phone;

    /**
     * 主要领导
     * */
    private int isleader;

    /**
     * 享受待遇
     * */
    private int istreat;

    /**
     * 是否死亡
     * */
    private int isdead;

    /**
     * 参检单位编码
     * */
    private String examorgid;

    /**
     * 参检单位名称
     * */
    private String examorgname;

}
