package com.hyd.health.menu.domain;

import lombok.Data;

import java.util.List;

/**
 * 当前操作员返回信息
 */
@Data
public class Profile {
    //操作员账号
    private String loginAccount;
    private String userid;
    private String organName;
    private String roleName;
    //操作员级别
    private String roleid;

}
