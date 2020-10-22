package com.hyd.health.examset.domain;

import lombok.Data;

import javax.validation.constraints.NotBlank;

/**
 * <p>体检项目接收参数</p>
 * @author liuwenwen
 * @date 2020/10/20
 * */

@Data
public class SysExamProjectInfo {

    /**
     * 主键
     * */
    @NotBlank(message = "体检项目编码不能为空！")
    private String id;

    /**
     * 名称
     * */
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
}
