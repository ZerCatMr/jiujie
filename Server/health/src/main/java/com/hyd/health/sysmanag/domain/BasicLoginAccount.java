package com.hyd.health.sysmanag.domain;

import lombok.Data;

/**
 * <p>登录账户表实体</p>
 *
 * @author ：liuwenwen
 * @date ：2020/10/21 17:28
 */

@Data
public class BasicLoginAccount {

    /**
     * 主键
     * */
    private String id;

    /**
     * 登录账号
     * */
    private String loginaccount;

    /**
     * 登录密码
     * */
    private String loginpass;

    /**
     * 登录时间
     * */
    private String logintime;

    /**
     * 状态
     * */
    private int status;
  
}
