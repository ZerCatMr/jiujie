package com.hyd.health.sysmanag.controller;

import com.hyd.health.sysmanag.domain.info.BasicOrganInfo;
import com.hyd.health.sysmanag.service.SysManagService;
import com.hyd.health.system.domain.JsonResult;
import com.hyd.health.system.factory.ResultFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.validation.Valid;

/**
 * <p>管理机构管理层</p>
 *
 * @author liuwenwen
 * @date 2020/10/20
 */

@RestController
@RequestMapping("/basicOrgan")
public class BasicOrganController {

    @Autowired
    private SysManagService sysManagService;

    /**
     * <p>修改管理机构</p>
     * @param basicOrganInfo
     * @date 2020/10/20
     * @author liuwenwen
     * @return int
     * */
    @RequestMapping("/updataBasicOrgan")
    public JsonResult updataBasicOrgan(@Valid @RequestBody BasicOrganInfo basicOrganInfo){
        return ResultFactory.success("查询成功", sysManagService.updataBasicOrgan(basicOrganInfo));
    }

    /**
     * <p>获得管理机构列表</p>
     *
     * @return list
     * @author liuwenwen
     * @date 2020/10/16
     */
    @RequestMapping("/getBasicOrganList")
    public JsonResult getBasicOrganList() {
        return ResultFactory.success("查询成功", sysManagService.getBasicOrganList());
    }
}
