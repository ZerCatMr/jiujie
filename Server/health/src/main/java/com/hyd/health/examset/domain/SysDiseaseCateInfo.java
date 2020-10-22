package com.hyd.health.examset.domain;

import lombok.Data;
import javax.validation.constraints.NotBlank;

/**
 * <P>疾病分类接收参数</P>
 * @author liuwenwen
 * @date 2020/10/20
 * */

@Data
public class SysDiseaseCateInfo {
    /**
     * 主键
     * */
    @NotBlank(message = "疾病分类编号不能为空!")
    private String id;

    /**
     * 分类名称
     * */
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
