package com.hyd.health.sysmanag.domain.info;

import lombok.Data;

import javax.validation.constraints.NotBlank;

/**
 * <p>用户管理接收参数</p>
 *
 * @author ：liuwenwen
 * @date ：2020/10/21 11:06
 */

@Data
public class BasicManageUserInfo {

    /**
     * 主键
     * */
    @NotBlank(message = "管理人员编码不能为空！")
    private String manageid;

    /**
     * 登录账户
     * */
    private String loginaccount;

    /**
     * 用户名称
     * */
    private String name;

    /**
     * 电话
     * */
    private String phone;

    /**
     * 办公室电话
     * */
    private String officephone;

    /**
     * 状态
     * */
    private int status;

    /**
     * 性别编码
     * */
    private String gendercode;

    /**
     * 用户类别名称
     * */
    private String usertypename;
}
