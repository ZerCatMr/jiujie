package com.hyd.health.systerm.service;

import com.hyd.health.system.excpetion.SqlException;
import com.hyd.health.systerm.domain.SysTerm;
import com.hyd.health.systerm.mapper.SysTermMapper;
import org.apache.ibatis.annotations.Select;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * <p>系统术语服务层</p>
 * @author liuwenwen
 * @date 2020/10/18
 * */
@Service("sysTermService")
public class SysTermService {

    @Autowired
    private SysTermMapper sysTermMapper;

    /**
     * <p>根据术语分类获得术语字典</p>
     * @author liuwenwen
     * @date 2020/10/19
     * @param cateId 术语分类id
     * @return list
     * */
    public List<SysTerm> getSysTermByCateId(String cateId){
       try {
          return sysTermMapper.getSysTermByCateId(cateId);
       }catch (Exception e){
           e.printStackTrace();
           throw new SqlException("查询术语字典失败！");
       }
    }
}
