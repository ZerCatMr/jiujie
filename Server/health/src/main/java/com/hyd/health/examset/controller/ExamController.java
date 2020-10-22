package com.hyd.health.examset.controller;


import com.hyd.health.examset.domain.SysExamProject;
import com.hyd.health.examset.domain.SysExamProjectInfo;
import com.hyd.health.examset.domain.SysExamprojectCate;
import com.hyd.health.examset.domain.SysExamprojectCateInfo;
import com.hyd.health.examset.service.ExamService;
import com.hyd.health.system.domain.JsonResult;
import com.hyd.health.system.factory.ResultFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

/**
 * <p>体检项目控制层</p>
 * @author liuwenwen
 * @date 2020/10/12
 */
@RestController
@RequestMapping("/exam")
public class ExamController {

    @Autowired
    private ExamService examService;


    /**
     *
     * </p>导航注释-- 体检项目分类</p>
     *
     * */

    /**
     * <p>新增体检项目分类</p>
     *
     * @param sysExamprojectCate 体检项目分类实体
     * @return int
     * @author liuwenwen
     * @date 2020/10/14
     */
    @RequestMapping("/addSysExamCate")
    public JsonResult addSysExamCate(@Valid @RequestBody SysExamprojectCate sysExamprojectCate) {
        int row = examService.addSysExamCate(sysExamprojectCate);
        return ResultFactory.success("添加成功", row);
    }

    /**
     * <p>改体检项目分类</p>
     *
     * @param sysExamprojectCateInfo
     * @author liuwenwen
     * @date 2020/10/13
     */
    @RequestMapping("/updataExamcateById")
    public JsonResult updataExamcateById(@Valid @RequestBody SysExamprojectCateInfo sysExamprojectCateInfo) {
        int row = examService.updataExamcateById(sysExamprojectCateInfo);
        return ResultFactory.success("修改成功", row);
    }

    /**
     * <p>获得体检项目分类列表</p>
     *
     * @author lww
     * @date 2020/10/12
     */
    @RequestMapping("/getExamCateList")
    public JsonResult getExamCateList() {
        List<SysExamprojectCate> list = examService.getExamCateList();
        return ResultFactory.success("查询成功", list);
    }

    /**
     * <p>获取体检项目分类最大排序号</p>
     *
     * @return int
     * @author liuwenwen
     * @date 2020/10/14
     */
    @RequestMapping("/getMaxExamCateOrder")
    public JsonResult getMaxExamCateOrder() {
        int maxCateOrder = examService.getMaxExamCateOrder();
        return ResultFactory.success("查询成功", maxCateOrder);
    }


    /**
     *
     * </p>导航注释-- 体检项目</p>
     *
     * */

    /**
     * <p>新增体检项目</p>
     *
     * @param sysExamProject 体检项目实体
     * @return int
     * @author liuwenwen
     * @date 2020/10/15
     */
    @RequestMapping("/addSysExamProject")
    public JsonResult addSysExamProject(@Valid @RequestBody SysExamProject sysExamProject) {
        int row = examService.addSysExamProject(sysExamProject);
        return ResultFactory.success("添加成功", row);
    }

    /**
     * <p>修改体检项目</p>
     *
     * @param sysExamProjectInfo 体检项目实体
     * @return int
     * @author liuwenwen
     * @date 2020/10/12
     */
    @RequestMapping("/updateExamProjectById")
    public JsonResult updateExamProjectById(@Valid @RequestBody SysExamProjectInfo sysExamProjectInfo) {
        int row = examService.updateExamProjectById(sysExamProjectInfo);
        return ResultFactory.success("修改成功", row);
    }

    /**
     * <p>获取体检项目列表</p>
     *
     * @author liuwenwen
     * @date 2020/10/12
     */
    @RequestMapping("/getExamProjsByCateId")
    public JsonResult getExamProjsByCateId(@RequestBody SysExamprojectCate sysExamprojectCate) {
        List<SysExamProject> list = examService.getExamProjsByCateId(sysExamprojectCate.getId());
        return ResultFactory.success("查询成功", list);
    }

    /**
     * <p>获取体检项目最大排序号</p>
     *
     * @return int
     * @author liuwenwen
     * @date 2020/10/15
     */
    @RequestMapping("/getMaxExamProjectOrder")
    public JsonResult getMaxExamProjectOrder() {
        int order = examService.getMaxExamProjectOrder();
        return ResultFactory.success("查询成功", order);
    }
}
