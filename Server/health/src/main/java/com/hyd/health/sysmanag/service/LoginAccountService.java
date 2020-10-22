package com.hyd.health.sysmanag.service;

import com.hyd.health.sysmanag.domain.info.BasicLoginAccountInfo;
import com.hyd.health.sysmanag.mapper.LoginAccountMapper;
import com.hyd.health.system.excpetion.SqlException;
import org.apache.ibatis.annotations.Update;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 * <p>登录账号服务层</p>
 *
 * @author ：liuwenwen
 * @date ：2020/10/21 17:46
 */

@Service("loginAccountService")
public class LoginAccountService {

    @Autowired
    private LoginAccountMapper loginAccountMapper;

    /**
     * <p>修改登录账号</P>
     *
     * @param basicLoginAccountInfo 接收参数
     * @return int
     * @author : liuwenwen
     * @date : 2020/10/21
     */
    public int updataLoginAccount(BasicLoginAccountInfo basicLoginAccountInfo){
        try {
            return loginAccountMapper.updataLoginAccount(basicLoginAccountInfo);
        } catch (Exception e) {
            e.printStackTrace();
            throw new SqlException("修改登录账户失败！");
        }
    }

}
