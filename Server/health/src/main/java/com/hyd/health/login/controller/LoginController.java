package com.hyd.health.login.controller;

import com.hyd.health.login.domain.CutRole;
import com.hyd.health.login.domain.LoginInfo;
import com.hyd.health.login.service.LoginService;
import com.hyd.health.system.domain.JsonResult;
import com.hyd.health.system.factory.ResultFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.concurrent.Callable;

/**
 * Created by xieshuai on 2020/7/21 上午 10:26
 */
@RequestMapping("/login")
@RestController
public class LoginController {

    @Autowired
    private LoginService loginService;


    @RequestMapping("/test")
    public JsonResult tests(@RequestBody LoginInfo ss){
        System.out.println(ss);
        return ResultFactory.success("123", loginService.test(ss));
    }

    /**
     * 切换登陆账号
     * @return
     */
    @RequestMapping("/cutRole")
    public JsonResult cutrole(@RequestBody CutRole cutRole){
        return ResultFactory.success("切换成功", loginService.cutrole(cutRole));
    }

    /**
     * 通过用户名密码登录
     * @return
     */
    @RequestMapping("/userLogin")
    public JsonResult userLogin(@RequestBody LoginInfo loginInfo){
        return ResultFactory.success("登录成功", loginService.userLogin(loginInfo));
    }

    /**
     * 用户退出登录
     * @return
     */
    @RequestMapping("/userLoginOut")
    public JsonResult userLoginOut(){
        return ResultFactory.success(loginService.userLoginOut());
    }

    /**
     * CA登录
     * @return
     */
    @RequestMapping("/caLogin")
    public JsonResult caLogin(){
        return null;
    }

    /**
     * 手机号短信登录
     * @return
     */
    @RequestMapping("/phoneLogin")
    public JsonResult phoneLogin(){
        return null;
    }

}
