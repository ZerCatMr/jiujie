package com.hyd.health.menu.domain;

import lombok.Data;

import java.util.List;

/**
 * Created by xieshuai on 2020/7/20 下午 3:09
 */
@Data
public class MenuVO {

    /**
     * 菜单编码
     */
    private String id;

    /**
     * 菜单名称
     */
    private String name;

    /**
     * 菜单路径
     */
    private String menuSrc;

    /**
     * 父菜单编码
     */
    private String parentId;

    /**
     * 子菜单集合
     */
    private List<MenuVO> menuList;
}
