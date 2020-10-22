package com.hyd.health.systerm.domain;

import lombok.Data;

/**
 * <p>系统术语实体</p>
 * @author liuwenwen
 * @date 2020/10/19
 * */

@Data
public class SysTerm {

    /**
     * 主键
     * */
    private String termid;

    /**
     * 名称
     * */
    private String termname;

    /**
     * 父术语编号
     * */
    private String partermid;

    /**
     * 术语分类编号
     * */
    private String cateid;

    /**
     * 排序号
     * */
    private int itemorder;

    /**
     * 当前状态 0停用 1启用
     * */
    private int status;
}
