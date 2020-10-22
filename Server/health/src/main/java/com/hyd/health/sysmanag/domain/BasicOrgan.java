package com.hyd.health.sysmanag.domain;

import lombok.Data;

/**
 * <p>管理机构实体</p>
 *
 * @author liuwenwen
 * @date 2020/9/16
 */
@Data
public class BasicOrgan {

    /**
     * 主键
     */
    private String id;

    /**
     * 机构类型
     */
    private String organtype;

    /**
     * 机构名
     */
    private String organname;

    /**
     * 管理机构编码
     */
    private String organid;

    /**
     * 创建时间
     */
    private String creatime;

    /**
     * 最后修改时间
     */
    private String lastmodtime;

}
