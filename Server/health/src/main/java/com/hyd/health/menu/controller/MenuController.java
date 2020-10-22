package com.hyd.health.menu.controller;

import com.hyd.health.menu.service.MenuService;
import com.hyd.health.system.domain.JsonResult;
import com.hyd.health.system.factory.ResultFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * Created by xieshuai on 2020/7/20 下午 2:56
 */
@RequestMapping("/menu")
@RestController
public class MenuController {

    @Autowired
    private MenuService menuService;


    /**
     * 根据角色编码查询当前角色的菜单信息
     * @return
     */
    @RequestMapping("/loadMenu")
    public JsonResult loadMenu(String roleId){
        return ResultFactory.success("查询成功", menuService.loadMenus(roleId));
    }



}
