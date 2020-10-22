package com.hyd.health.menu.mapper;

import com.hyd.health.menu.domain.MenuVO;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;


import java.util.List;

/**
 * Created by xieshuai on 2020/7/20 下午 3:53
 */
@Mapper
public interface MenuMapper {

    /**
     * 根据角色编码查询所有菜单信息
     * @param roleId
     * @return
     */
    @Select("SELECT m.menuid AS id, m.menuname AS name, m.parentId AS parentId, r.resource AS menuSrc FROM portal_resource r, portal_menu m  " +
            "WHERE r.menuid = m.menuid   AND r.roleid = #{roleId}  ORDER BY  m.menusort")
    List<MenuVO> queryMenu(String roleId);
}
