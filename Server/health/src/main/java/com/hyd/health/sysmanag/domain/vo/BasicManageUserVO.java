package com.hyd.health.sysmanag.domain.vo;

import com.hyd.health.sysmanag.domain.BasicManageUser;
import lombok.Data;

/**
 * <p>用户管理返回数据</p>
 *
 * @author ：liuwenwen
 * @date ：2020/10/21 13:53
 */

@Data
public class BasicManageUserVO extends BasicManageUser {

    /**
     * 机构名称
     * */
    private String organname;
}
