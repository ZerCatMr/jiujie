package com.hyd.health.systerm.controller;

import com.hyd.health.system.domain.JsonResult;
import com.hyd.health.system.factory.ResultFactory;
import com.hyd.health.systerm.domain.SysTerm;
import com.hyd.health.systerm.service.SysTermService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import java.util.List;

@RestController
@RequestMapping("/sysTerm")
public class SysTermController {

    @Autowired
    private SysTermService SysTermService;

    /**
     * <p>根据术语分类获得术语字典</p>
     * @author liuwenwen
     * @date 2020/10/19
     * @param sysTerm 系统术语实体
     * @return list
     * */
    @RequestMapping("/getSysTermByCateId")
   public JsonResult getSysTermByCateId(@RequestBody SysTerm sysTerm){
        List<SysTerm> sysTermList = SysTermService.getSysTermByCateId(sysTerm.getCateid());
        return ResultFactory.success("查询成功", sysTermList);
    }
}
