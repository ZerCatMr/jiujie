package com.hyd.health.sysmanag.service;

import com.hyd.health.batch.domain.BatchParam;
import com.hyd.health.batch.mapper.BatchMapper;
import com.hyd.health.sysmanag.domain.BasicLoginAccount;
import com.hyd.health.sysmanag.domain.BasicManageUser;
import com.hyd.health.sysmanag.domain.info.BasicLoginAccountInfo;
import com.hyd.health.sysmanag.domain.info.BasicManageUserInfo;
import com.hyd.health.sysmanag.mapper.LoginAccountMapper;
import com.hyd.health.sysmanag.mapper.UserManageMapper;
import com.hyd.health.system.excpetion.SqlException;
import org.apache.ibatis.annotations.Insert;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.transaction.interceptor.TransactionAspectSupport;

import java.util.List;

/**
 * <p>用户管理服务层</p>
 *
 * @author ：liuwenwen
 * @date ：2020/10/21 10:37
 */

@Service("userManageService")
public class UserManageService {

    private final int SUCCESS_BACK = 1;

    @Autowired
    private UserManageMapper userManageMapper;

    @Autowired
    private LoginAccountMapper loginAccountMapper;

    @Autowired
    private BatchMapper batchMapper;

    /**
     * <p>根据类型获得管理用户表格</P>
     *
     * @param userType 用户类型
     * @return :
     * @author : liuwenwen
     * @date : 2020/10/21
     */
    public List<BasicManageUser> getManageUserListByType(int userType) {
        try {
            return userManageMapper.getManageUserListByType(userType);
        } catch (Exception e) {
            e.printStackTrace();
            throw new SqlException("查询管理用户失败");
        }
    }

    /**
     * <p>修改管理用户，修改完成后更新登录账号表，开启事务使之可以同步更新，
     * 需要注意的是：
     * （1）遇到检测异常时，事务默认不回滚，
     * （2） 在业务层捕捉异常后，发现事务不生效 ，添加TransactionAspectSupport
     * .currentTransactionStatus().setRollbackOnly();使spring可以正常检测
     * <p>
     * 作者：yizhiwazi
     * 链接：https://www.jianshu.com/p/380a9d980ca5
     * 来源：简书
     * 著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。</P>
     *
     * @param basicManageUserInfo 修改管理用户接收参数
     * @return int
     * @author : liuwenwen
     * @date : 2020/10/21
     */
    @Transactional(rollbackFor = Exception.class)
    public int updateManageUser(BasicManageUserInfo basicManageUserInfo) {
        try {
            userManageMapper.updateManageUser(basicManageUserInfo);
            if (basicManageUserInfo.getLoginaccount() != null) {
                BasicLoginAccountInfo ba = new BasicLoginAccountInfo();
                ba.setId(basicManageUserInfo.getManageid());
                ba.setLoginaccount(basicManageUserInfo.getLoginaccount());
                ba.setStatus(-1);
                loginAccountMapper.updataLoginAccount(ba);
            }
            return SUCCESS_BACK;
        } catch (Exception e) {
            //设置手动回滚
            TransactionAspectSupport.currentTransactionStatus().setRollbackOnly();
            throw new SqlException("修改管理用户失败");
        }
    }

    /**
     * <p>添加管理用户</P>
     *
     * @param basicManageUser 管理用户实体
     * @return int
     * @author : liuwenwen
     * @date : 2020/10/22
     */
    @Transactional(rollbackFor = Exception.class)
    public int addManageUser(BasicManageUser basicManageUser) {
        try {
            String id = batchMapper.getBatchNumberByDate(BatchParam.MANAGE_USER_PREFIX, BatchParam.MANAGE_USER_DATATYPE, BatchParam.MANAGE_USER_FLOWLEN);
            BasicLoginAccount basicLoginAccount = new BasicLoginAccount();

            //添加管理人员
            basicManageUser.setManageid(id);
            userManageMapper.addManageUser(basicManageUser);

            //添加登录账号
            basicLoginAccount.setId(id);
            basicLoginAccount.setLoginaccount(basicManageUser.getLoginaccount());
            return loginAccountMapper.addLoginAccount(basicLoginAccount);
        } catch (Exception e) {
            e.printStackTrace();
            TransactionAspectSupport.currentTransactionStatus().setRollbackOnly();
            throw new SqlException("体检管理人员失败！");
        }
    }
}
