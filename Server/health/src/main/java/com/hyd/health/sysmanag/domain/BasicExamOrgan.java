package com.hyd.health.sysmanag.domain;

import lombok.Data;

import javax.validation.constraints.NotBlank;

/**
 * <p>参检机构实体</p>
 *
 * @author liuwnewen
 * @date 2020/10/16
 */

@Data
public class BasicExamOrgan {

    /**
     * 机构编码
     */
    private String organid;


    /**
     * 机构名称
     */
    @NotBlank(message = "机构名不能为空！")
    private String organname;

    /**
     * 机构状态
     */
    private int status;

    /**
     * 机构排序号
     */
    private int organorder;


    /**
     * 机构性质
     */
    @NotBlank(message = "机构性质不能为空！")
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
     * 机构前缀
     */
    private String organprefix;

    /**
     * 保密单位 0否1是
     * */
    private int secretorgan;

    /**
     * 创建时间
     * */
    private String creatime;

    /**
     * 最后修改时间
     * */
    private String lastmodtime;

}
