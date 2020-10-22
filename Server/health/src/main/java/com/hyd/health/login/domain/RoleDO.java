package com.hyd.health.login.domain;

import com.hyd.health.menu.domain.MenuVO;
import lombok.Data;
import java.util.List;

/**
 * Created by xieshuai on 2020/7/21 下午 4:44
 */
@Data
public class RoleDO {

    private String loginaccount;

    private String userid;

    private String organid;

    private String organname;

    private String roleid;

    private String roleName;

    private String roleCode;

    private String status;

    private String creaTime;

    private String lastModTime;

    private List<MenuVO> menuVOS;
}
