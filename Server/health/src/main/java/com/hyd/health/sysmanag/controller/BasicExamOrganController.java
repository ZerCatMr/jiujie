package com.hyd.health.sysmanag.controller;

import com.hyd.health.sysmanag.domain.*;
import com.hyd.health.sysmanag.domain.info.ExamOrganInfo;
import com.hyd.health.sysmanag.service.SysManagService;
import com.hyd.health.sysmanag.domain.vo.ExamOrganVO;
import com.hyd.health.system.domain.JsonResult;
import com.hyd.health.system.factory.ResultFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

/**
 * <p>参检机构管理层</p>
 *
 * @author liuwenwen
 * @date 2020/10/16
 */

@RestController
@RequestMapping("/sysManag")
public class BasicExamOrganController {

    @Autowired
    private SysManagService sysManagService;

    /**
     * <p>添加参检单位</p>
     * @author liuwenwen
     * @date 2020/10/19
     * @param basicExamorgan 参检机构实体
     * @return int
     * */
    @RequestMapping("/addBasicExamorgan")
    public JsonResult addBasicExamorgan(@Valid @RequestBody BasicExamOrgan basicExamorgan){
        int row = sysManagService.addBasicExamorgan(basicExamorgan);
        return ResultFactory.success("查询成功", row);
    }

    /**
     * <p>修改参检单位</p>
     *
     * @param examOrganInfo 参检机构接收参数实体
     * @author liuwenwen
     * @date 2020/10/19
     * @Return int
     */
    @RequestMapping("/updataBasicExamorgan")
    public JsonResult updataBasicExamorgan(@Valid @RequestBody ExamOrganInfo examOrganInfo) {
        int row = sysManagService.updataBasicExamorgan(examOrganInfo);
        return ResultFactory.success("修改成功", row);
    }

    /**
     * <p>获得参检机构列表</p>
     *
     * @author liuwenwen
     * @date 2020/10/16
     */
    @RequestMapping("/getBasicExamorganList")
    public JsonResult getBasicExamorganList() {
        List<BasicExamOrgan> basicExamOrganList = sysManagService.getBasicExamorganList();
        return ResultFactory.success("查询成功", basicExamOrganList);
    }

    /**
     * <p>获得新建参检机构时的必要参数，最大排序号和系统术语列表</p>
     * @author liuwenwen
     * @date 2020/10/18
     * @return object
     * */
    @RequestMapping("/getAddExamOrganBasicParam")
    public JsonResult getAddExamOrganBasicParam(){
        //参检单位性质
        String cateId = "ExamUnitNature";
        ExamOrganVO examOrganVO = sysManagService.getAddExamOrganBasicParam(cateId);
        return ResultFactory.success("查询成功", examOrganVO);
    }
}
