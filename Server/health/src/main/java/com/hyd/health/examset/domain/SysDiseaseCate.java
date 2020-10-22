package com.hyd.health.examset.domain;

import lombok.Data;

import javax.validation.constraints.NotBlank;

/**
 * <p>体检疾病分类实体</p>
 * @author liuwenwen
 * @date 2020/10/12
 * */
@Data
public class SysDiseaseCate {

    /**
     * 主键
     * */
    private String id;

    /**
     * 分类名称
     * */
    @NotBlank(message = "疾病分类名称不能为空！")
    private String name;

    /**
     * 分类编码 停用
     * */
    private String cateid;

    /**
     * 排序号
     * */
    private int cateorder;

    /**
     * 当前状态
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
