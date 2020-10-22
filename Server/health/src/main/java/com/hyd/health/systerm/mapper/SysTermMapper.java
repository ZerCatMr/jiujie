package com.hyd.health.systerm.mapper;

import com.hyd.health.systerm.domain.SysTerm;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;

import java.util.List;

/**
 * <p>系统术语mapper</p>
 * @author liuwenwen
 * @date 2020/10/19
 * */

@Mapper
public interface SysTermMapper {

    /**
     * <p>根据术语分类获得术语字典</p>
     * @author liuwenwen
     * @date 2020/10/19
     * @param cateId
     * @return list
     * */
    @Select("SELECT termid,termname,partermid,cateid,itemorder,status from sys_term where cateid = #{cateId}")
    List<SysTerm> getSysTermByCateId(String cateId);
}
