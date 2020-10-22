package com.hyd.health.examset.controller;

import com.hyd.health.examset.domain.SysDisease;
import com.hyd.health.examset.domain.SysDiseaseCate;
import com.hyd.health.examset.domain.SysDiseaseCateInfo;
import com.hyd.health.examset.domain.SysDiseaseInfo;
import com.hyd.health.examset.service.ExamService;
import com.hyd.health.system.domain.JsonResult;
import com.hyd.health.system.factory.ResultFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.validation.Valid;
import java.util.List;

/**
 * <p>疾病体检分类控制层</p>
 * @author liuwenwen
 * @date 2020/10/19
 * */

@RestController
@RequestMapping("/disease")
public class DiseaseController {

    @Autowired
    private ExamService examService;

    /**
     * </p>导航注释-- 体检疾病分类</p>
     *
     * */

    /**
     * <p>新增体检疾病分类</p>
     *
     * @param sysDiseaseCate 体检疾病实体
     * @return int
     * @author liuwenwen
     * @date 2020/10/15
     */
    @RequestMapping("/addDiseaseCate")
    public JsonResult addDiseaseCate(@Valid @RequestBody SysDiseaseCate sysDiseaseCate) {
        int row = examService.addDiseaseCate(sysDiseaseCate);
        return ResultFactory.success("添加成功", row);
    }

    /**
     * <p>获取体检疾病分类列表</p>
     *
     * @author liuwenwen
     * @date 2020/10/12
     * return list
     */
    @RequestMapping("/getDiseaseCateList")
    public JsonResult getDiseaseCateList() {
        List<SysDiseaseCate> list = examService.getDiseaseCateList();
        return ResultFactory.success("查询成功", list);
    }

    /**
     * <p>修改体检疾病分类</p>
     *
     * @param sysDiseaseCateInfo return int
     * @author liuwenwen
     * @date 2020/10/12
     */
    @RequestMapping("/updateDiseaseCateById")
    public JsonResult updateDiseaseCateById(@Valid @RequestBody SysDiseaseCateInfo sysDiseaseCateInfo) {
        int row = examService.updateDiseaseCateById(sysDiseaseCateInfo);
        return ResultFactory.success("修改成功", row);
    }

    /**
     * <p>获取最大的体检疾病分类排序号</p>
     *
     * @author liuwenwen
     * @date 2020/10/15
     */
    @RequestMapping("/getMaxDiseCateOrder")
    public JsonResult getMaxDiseCateOrder() {
        int order = examService.getMaxDiseCateOrder();
        return ResultFactory.success("查询成功", order);
    }

    /**
     * </p>导航注释-- 体检疾病</p>
     *
     * */

    /**
     * <p>新增体检疾病</p>
     * @param sysDisease 体检疾病实体
     * @author liuwenwen
     * @date 2020/10/15
     * */
    @RequestMapping("/addDisease")
    public JsonResult addDisease(@Valid @RequestBody SysDisease sysDisease){
        int row = examService.addDisease(sysDisease);
        return ResultFactory.success("添加成功", row);
    }

    /**
     * <p>获取体检疾病列表</p>
     *
     * @param sysDiseaseCate return list
     * @author liuwenwen
     * @date 2020/10/12
     */
    @RequestMapping("/getDiseaseList")
    public JsonResult getDiseaseList(@RequestBody SysDiseaseCate sysDiseaseCate) {
        List<SysDisease> list = examService.getDiseaseList(sysDiseaseCate.getId());
        return ResultFactory.success("查询成功", list);
    }

    /**
     * <p>修改体检疾病</p>
     *
     * @param sysDisease return int
     * @author liuwenwen
     * @date 2020/10/12
     */
    @RequestMapping("/updateDiseaseById")
    public JsonResult updateDiseaseById(@Valid @RequestBody SysDiseaseInfo sysDisease) {
        int row = examService.updateDiseaseById(sysDisease);
        return ResultFactory.success("修改成功", row);
    }

    /**
     * <p>获取体检疾病最大排序号</p>
     * @author liuwenwen
     * @date 2020/10/15
     * */
    @RequestMapping("/getMaxDiseOrder")
    public JsonResult getMaxDiseOrder(){
        int order = examService.getMaxDiseOrder();
        return ResultFactory.success("查询成功", order);
    }
}
