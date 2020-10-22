package com.hyd.health.sysmanag.domain.info;

import lombok.Data;

import javax.validation.constraints.NotBlank;

/**
 * <P>管理机构控制层接收参数</P>
 * @author liuwenwen
 * @date 2020/10/20
 * */

@Data
public class BasicOrganInfo {

    /**
     * 主键
     */
    @NotBlank(message = "机构id不能为空")
    private String id;

    /**
     * 机构名
     */
    @NotBlank(message = "机构名称不能为空")
    private String organname;
}
