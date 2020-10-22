package com.hyd.health.examset.domain;

import lombok.Data;

import javax.validation.constraints.NotBlank;

/**
 * <p>体检项目明细</p>
 * @author liuwenwen
 * @date 2020/9/14
 * */
@Data
public class SysExamProject {

    /**
     * 主键
     * */
    private String id;

    /**
     * 名称
     * */
    @NotBlank(message = "项目名称不能为空！")
    private String name;

    /**
     * 分类
     * */
    private String cateid;

    /**
     *排序号
     * */
    private int itemorder;

    /**
     * 当前状态 0：停用 1：启用
     * */
    private int status;

    /**
     * 创建时间
     * */
    private String creatime;

    /**
     * 最后修改时间
     * */
    private String lastmodtime;
}
