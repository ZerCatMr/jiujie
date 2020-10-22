package com.hyd.health.sysmanag.domain.info;

import lombok.Data;

import javax.validation.constraints.NotBlank;

/**
 * <P>参检机构控制层接收参数</P>
 * @author liuwenwen
 * @date 2020/10/20
 * */

@Data
public class ExamOrganInfo {

    /**
     * 机构编码
     */
    @NotBlank(message = "参检机构id不能为空")
    private String organid;


    /**
     * 机构名称
     */
    private String organname;

    /**
     * 机构排序号
     */
    private int organorder;

    /**
     * 机构状态
     */
    private int status;

    /**
     * 机构性质
     */
    private String organnature;

    /**
     * 机构类型
     */
    private String organtype;

    /**
     * 机构地址
     */
    private String organaddress;

    /**
     * 机构电话
     */
    private String organphone;

    /**
     * 保密单位 0否1是
     * */
    private int secretorgan;

    /**
     * 机构前缀
     */
    private String organprefix;

}
