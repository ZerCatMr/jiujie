package com.hyd.health.examwork.controller;

import com.hyd.health.examwork.info.FillOrgInfo;
import com.hyd.health.examwork.info.FillisTake;
import com.hyd.health.examwork.service.FillbatchService;
import com.hyd.health.system.domain.JsonPageResult;
import com.hyd.health.system.domain.JsonResult;
import com.hyd.health.system.factory.ResultFactory;
import com.hyd.health.system.factory.ResultPageFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * 体检批次管理
 */
@RequestMapping("/Fillbatch")
@RestController
public class FillbatchController {

    @Autowired
    private FillbatchService fillbatchService;

    /**
     * 查询体检批次
     * @return
     */
    @PostMapping("/queryFillbatch")
    JsonResult queryFillbatch() {
        return ResultFactory.success("查询成功",fillbatchService.queryFillbatch());
    }

    /**
     * 查询体检批次包含机构
     * @return
     */
    @PostMapping("/queryfillOrgan")
    JsonPageResult queryfillOrgan(@RequestBody FillOrgInfo fillOrgInfo) {
        return ResultPageFactory.success("查询成功",fillbatchService.queryfillOrgan(fillOrgInfo),fillbatchService.queryfillOrgancount(fillOrgInfo));
    }


    /**
     * 更新批次状态
     * @return
     */
    @PostMapping("/isTakeEffect")
    JsonResult isTakeEffect(@RequestBody FillisTake fillisTake) {
        return ResultFactory.success("查询成功",fillbatchService.isTakeEffect(fillisTake));
    }

    /**
     * 判断是否存在生效批次
     * @return
     */
    @PostMapping("/existState")
    JsonResult existState() {
        return ResultFactory.success("查询成功",fillbatchService.existState());
    }

    /**
     * 添加批次
     * @return
     */
    @PostMapping("/addFillbatch")
    JsonResult addFillbatch() {
        return ResultFactory.success("添加成功",fillbatchService.addFillbatch());
    }


}
