package com.hyd.health.login.domain;

import lombok.Data;
import java.util.List;

/**
 * Created by xieshuai on 2020/7/21 上午 11:07
 * 登录结果返回值
 */
@Data
public class LoginVO {

    /**
     * 用户绑定Token
     */
    private String token;


    /**
     * 登录账户
     */
    private String loginAccount;

    /**
     *
     * 登录姓名
     */
    private String userName;

    private String organName;

    private String roleName;

    /**
     * 该账户下角色信息
     */
    private List<RoleDO> roleDOList;
}
