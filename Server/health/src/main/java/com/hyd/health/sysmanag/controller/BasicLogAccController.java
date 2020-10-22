package com.hyd.health.sysmanag.controller;

import com.hyd.health.sysmanag.domain.info.BasicLoginAccountInfo;
import com.hyd.health.sysmanag.service.LoginAccountService;
import com.hyd.health.system.domain.JsonResult;
import com.hyd.health.system.excpetion.SqlException;
import com.hyd.health.system.factory.ResultFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.validation.Valid;

/**
 * <p>登录账号控制层</p>
 *
 * @author ：liuwenwen
 * @date ：2020/10/21 17:51
 */

@RestController
@RequestMapping("/logAccount")
public class BasicLogAccController {

    //初始密码值
    private final String ORIGINAL_PASS = "123456";

    @Autowired
    private LoginAccountService loginAccountService;

    /**
     * <p>修改登录账号</P>
     *
     * @param basicLoginAccountInfo 接收参数
     * @return int
     * @author : liuwenwen
     * @date : 2020/10/21
     */
    public JsonResult updataLoginAccount(@Valid @RequestBody BasicLoginAccountInfo basicLoginAccountInfo){
        return ResultFactory.success("修改成功", loginAccountService.updataLoginAccount(basicLoginAccountInfo));
    }

    /**
     * <p>重置密码</P>
     *
     * @author : liuwenwen
     * @date : 2020/10/22
     * @param  basicLoginAccountInfo 接收参数
     * @return :
     */
    @RequestMapping("/resetPassWorld")
    public JsonResult resetPassWorld(@Valid @RequestBody BasicLoginAccountInfo basicLoginAccountInfo){
        basicLoginAccountInfo.setLoginpass(ORIGINAL_PASS);
        return ResultFactory.success("重置密码成功，初始值为: "+ORIGINAL_PASS, loginAccountService.updataLoginAccount(basicLoginAccountInfo));
    }
}
