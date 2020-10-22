package com.hyd.health.sysmanag.controller;

import com.hyd.health.batch.domain.BatchParam;
import com.hyd.health.sysmanag.domain.BasicLoginAccount;
import com.hyd.health.sysmanag.domain.BasicManageUser;
import com.hyd.health.sysmanag.domain.info.BasicLoginAccountInfo;
import com.hyd.health.sysmanag.domain.info.BasicManageUserInfo;
import com.hyd.health.sysmanag.service.UserManageService;
import com.hyd.health.system.domain.JsonResult;
import com.hyd.health.system.excpetion.SqlException;
import com.hyd.health.system.factory.ResultFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.transaction.interceptor.TransactionAspectSupport;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.validation.Valid;

/**
 * <p>用户管理控制层</p>
 *
 * @author ：liuwenwen
 * @date ：2020/10/21 10:59
 */

@RestController
@RequestMapping("/userManage")
public class BasicUserManageController {

    @Autowired
    private UserManageService userManageService;

    /**
     * <p>根据类型获得管理用户列表</P>
     *
     * @param basicManageUser 用户类型
     * @return : JsonResult
     * @author : liuwenwen
     * @date : 2020/10/21
     */
    @RequestMapping("/getManageUserListByType")
    public JsonResult getManageUserListByType(@RequestBody BasicManageUser basicManageUser) {
        return ResultFactory.success("查询成功", userManageService.getManageUserListByType(basicManageUser.getUsertype()));
    }

    /**
     * <p>修改管理用户信息</P>
     *
     * @author : liuwenwen
     * @date : 2020/10/21
     * @param  basicManageUserInfo 修改管理用户 接收参数
     * @return JsonResult
     */
    @RequestMapping("/updataManageUser")
    public JsonResult updataManageUser(@Valid @RequestBody BasicManageUserInfo basicManageUserInfo){
        return ResultFactory.success("修改成功", userManageService.updateManageUser(basicManageUserInfo));
    }

    /**
     * <p>添加管理用户</P>
     *
     * @param basicManageUser 管理用户实体
     * @return int
     * @author : liuwenwen
     * @date : 2020/10/22
     */
    @RequestMapping("/addManageUser")
    public JsonResult addManageUser(@Valid @RequestBody BasicManageUser basicManageUser) {
        return ResultFactory.success("添加成功", userManageService.addManageUser(basicManageUser));
    }
}
