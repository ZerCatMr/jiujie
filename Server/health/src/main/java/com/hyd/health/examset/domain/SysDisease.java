package com.hyd.health.examset.domain;

import lombok.Data;

import javax.validation.constraints.NotBlank;

/**
 * <p>体检疾病名单</p>
 *
 * @author liuwenwen
 * @date 2020/10/12
 */
@Data
public class SysDisease {

    /**
     * 主键
     * */
    private String id;

    /**
     * 疾病名称
     * */
    @NotBlank(message = "疾病名称不能为空！")
    private String name;

    /**
     * 疾病分类编码
     * */
    private String cateid;

    /**
     * 排序号
     * */
    private int itemorder;

    /**
     * 当前状态
     * */
    private int status;

}
