package com.hyd.health.sysmanag.domain.info;

import lombok.Data;

import javax.validation.constraints.NotBlank;

/**
 * <p>登录账户表实体</p>
 *
 * @author ：liuwenwen
 * @date ：2020/10/21 17:28
 */

@Data
public class BasicLoginAccountInfo {

    /**
     * 主键
     * */
    @NotBlank(message = "账号编码不能为空！")
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
     * 状态
     * */
    private int status;
  
}
