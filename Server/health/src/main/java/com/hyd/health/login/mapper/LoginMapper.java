package com.hyd.health.login.mapper;

import com.hyd.health.login.domain.LoginVO;
import com.hyd.health.login.domain.Relevance;
import com.hyd.health.login.domain.RoleDO;
import com.hyd.health.login.domain.UserRoleVO;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;

import java.util.List;

/**
 * Created by xieshuai on 2020/7/21 上午 11:02
 */
@Mapper
public interface LoginMapper {

        /**
         * 执行登录存储过程
         * @param userName
         * @param passWord
         * @return
         */
        LoginVO userLogin(String userName, String passWord);

        /**
         * 校验用户名密码
         * @param userName
         * @param passWord
         * @return
         */
        @Select("select id from basic_login_account where loginaccount = #{userName} and loginpass = #{passWord}")
        String checkUser(String userName, String passWord);

        /**
         * 根据用户编码查询角色信息
         * @param userId
         * @return
         */
        @Select("<script>" +
                "select * from " +
                "(select r.*,u.userid from portal_roleuser u left join portal_role r on u.roleid = r.roleid  WHERE u.userid =#{userId})as user left join "+
                "<choose> " +
                "<when test='roleid==\"examperson\" or roleid==\"hospdoc\"'> (select examorgid organid,examorganame organname,careuserid,a.loginaccount from basic_careuser c left join basic_login_account a on c.careuserid=a.id) </when>" +
                "<when test='roleid==\"examadmin\" or roleid==\"adminleader\"  or roleid==\"admin\" or roleid==\"spmedadmin\"'> (select o.id organid,o.organname organname,m.manageid careuserid,m.loginaccount from basic_organ o left join basic_manageuser m on o.id=m.organid ) </when>" +
                "<when test='roleid==\"orgadmin\"'> (select e.organid organid,e.organname organname,m.manageid careuserid,m.loginaccount from basic_examorgan e left join basic_manageuser m on e.organid=m.organid) </when>" +
                "<when test='roleid==\"hospadmin\"'> (select h.hospid organid,h.hospname organname,m.manageid careuserid,m.loginaccount from basic_hospital h left join basic_manageuser m on h.hospid=m.organid) </when>" +
                "</choose>" +
                "as organ on organ.careuserid=user.userid" +
                "</script>")
        List<RoleDO> queryRoles(String roleid,String userId);

        @Select("select name FROM basic_manageuser where loginaccount = #{loginAccount}")
        String queryManageName(String loginAccount);


        /**
         * 查询关联的账号
         * @param userId
         */
        @Select("select r.targetuser,p.roleid from basic_user_related r left join portal_roleuser p on r.targetuser=p.userid  where sourceuser=#{userId}")
        List<Relevance> queryRelevance(String userId);

        @Select("select u.roleid,r.rolename from portal_roleuser u left join  portal_role r on u.roleid=r.roleid  where u.userid=#{userId}")
        UserRoleVO queryOrgan(String userId);
}
