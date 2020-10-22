package com.hyd.health.examset.domain;

import lombok.Data;

import javax.validation.constraints.NotBlank;

/**
 * <p>体检疾病接收参数</p>
 * @author liuwenwen
 * @date 2020/10/20
 * */

@Data
public class SysDiseaseInfo {

    /**
     * 主键
     * */
    @NotBlank(message = "体检疾病分类不能为空！")
    private String id;

    /**
     * 疾病名称
     * */
    private String name;

    /**
     * 排序号
     * */
    private int itemorder;

    /**
     * 当前状态
     * */
    private int status;
}
