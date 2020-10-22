package com.hyd.health.menu.service;

import com.hyd.health.menu.domain.MenuVO;
import com.hyd.health.menu.mapper.MenuMapper;
import com.hyd.health.system.excpetion.BusinessErrorException;
import com.hyd.health.system.excpetion.BusinessMsgEnum;
import com.hyd.health.system.util.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.ArrayList;
import java.util.List;

/**
 * Created by xieshuai on 2020/7/20 下午 3:21
 */

@Service
public class MenuService {

    @Autowired
    private MenuMapper menuMapper;

    /**
     * 根据角色ID 查询菜单信息
     * @param roleId
     * @return
     */
    public List<MenuVO> loadMenus(String roleId){
        //所有菜单信息
        List<MenuVO> rootMenu = null;
        //树菜单信息
        List<MenuVO> menuList = new ArrayList();
        try {
            rootMenu = menuMapper.queryMenu(roleId);
        }catch (Exception e){
            throw new BusinessErrorException(BusinessMsgEnum.SQL_EXCT_EXCEPTION);
        }
        // 先找到所有的一级菜单
        for (MenuVO menuVO : rootMenu) {
            // 一级菜单没有parentId
            if (StringUtils.isBlank(menuVO.getParentId())) {
                menuList.add(menuVO);
            }
        }

        // 为一级菜单设置子菜单
        for (MenuVO menu : menuList) {
            menu.setMenuList(getChild(menu.getId(), rootMenu));
        }
        return menuList;
    }


    /**
     * 递归查找子菜单
     * @param id 当前菜单id
     * @param rootMenu 要查找的列表
     * @return
     */
    private List<MenuVO> getChild(String id, List<MenuVO> rootMenu) {
        // 子菜单
        List<MenuVO> childList = new ArrayList<>();
        for (MenuVO menu : rootMenu) {
            // 遍历所有节点，将父菜单id与传过来的id比较
            if (null!=menu.getParentId()) {
                if (menu.getParentId().equals(id)) {
                    childList.add(menu);
                }
            }
        }
        // 把子菜单的子菜单再循环一遍
        for (MenuVO menu : childList) {
            // 没有url子菜单还有子菜单
            if (null==menu.getMenuSrc()) {
                // 递归
                menu.setMenuList(getChild(menu.getId(), rootMenu));
            }
        } // 递归退出条件
        if (childList.size() == 0) {
            return null;
        }
        return childList;
    }


}
