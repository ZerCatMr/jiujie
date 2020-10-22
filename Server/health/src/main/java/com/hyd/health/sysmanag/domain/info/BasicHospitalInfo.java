package com.hyd.health.sysmanag.domain.info;

import lombok.Data;

import javax.validation.constraints.NotBlank;

/**
 * <P>体检医院控制层接收参数</P>
 * @author liuwenwen
 * @date 2020/10/20
 * */

@Data
public class BasicHospitalInfo {
    /**
     * 医院编码
     * */
    @NotBlank(message = "医院编号不能为空")
    private String hospid;

    /**
     * 医院名称
     * */
    private String hospname;

    /**
     * 机构类型
     * */
    private String organtype;

    /**
     * 状态
     * */
    private int status;
}
