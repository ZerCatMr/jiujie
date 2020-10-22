package com.hyd.health.examset.domain;

import lombok.Data;

import javax.validation.constraints.NotBlank;

/**
 * <p>体检项目分类接收参数</p>
 * @author liuwenwen
 * @date 2020/10/20
 * */

@Data
public class SysExamprojectCateInfo {

    /**
     * 主键
     */
    @NotBlank(message = "体检分类编码不能为空！")
    private String id;

    /**
     * 名称
     */
    private String name;

    /**
     * 排序号
     */
    private int cateorder;

    /**
     * 当前状态
     */
    private int status;
}
