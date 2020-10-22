package com.hyd.health.sysmanag.controller;

import com.hyd.health.sysmanag.domain.BasicHospital;
import com.hyd.health.sysmanag.domain.info.BasicHospitalInfo;
import com.hyd.health.sysmanag.service.SysManagService;
import com.hyd.health.system.domain.JsonResult;
import com.hyd.health.system.factory.ResultFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.validation.Valid;
import java.util.List;

/**
 * <p>体检医院控制层</p>
 * @author liuwenwen
 * @date 2020/10/20
 * */

@RestController
@RequestMapping("/hospital")
public class BasicHospitalController {
    @Autowired
    private SysManagService sysManagService;

    /**
     * <p>修改体检医院</p>
     * @param basicHospitalInfo
     * @date 2020/10/20
     * @author liuwenwen
     * @return int
     * */
    @RequestMapping("/updataBasichospital")
    public JsonResult updataBasichospital(@Valid @RequestBody BasicHospitalInfo basicHospitalInfo){
        return ResultFactory.success("修改成功", sysManagService.updataBasichospital(basicHospitalInfo));
    }

    /**
     * <p>获得体检医院列表</p>
     * @author liuwenwen
     * @date 2020/10/16
     * @return list
     * */
    @RequestMapping("/getBasicHospitalList")
    public JsonResult getBasicHospitalList(){
        List<BasicHospital> basicHospitalList = sysManagService.getBasicHospitalList();
        return ResultFactory.success("查询成功", basicHospitalList);
    }
}
