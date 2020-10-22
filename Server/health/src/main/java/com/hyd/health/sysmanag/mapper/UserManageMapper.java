package com.hyd.health.sysmanag.mapper;

import com.hyd.health.sysmanag.domain.BasicManageUser;
import com.hyd.health.sysmanag.domain.info.BasicManageUserInfo;
import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;
import org.apache.ibatis.annotations.Update;

import java.util.List;

/**
 * <p>用户管理mapper</p>
 *
 * @author liuwenwen
 * @date 2020/10/21
 */

@Mapper
public interface UserManageMapper {

    /**
     * <p>根据类型获得管理用户列表</p>
     *
     * @param userType 用户类型
     * @return 管理用户列表
     * @author liuwenwen
     * @date 2020/10/21
     */
    @Select("SELECT manageid,loginaccount,gendercode,`name`,usertype,usertypename,phone,organid,officephone,`status`\n" +
            "from basic_manageuser \n" +
            "where  usertype = #{userType} ;")
    List<BasicManageUser> getManageUserListByType(int userType);

    /**
     * <p>修改管理用户</P>
     *
     * @param basicManageUserInfo 修改管理用户接收参数
     * @return int
     * @author : liuwenwen
     * @date : 2020/10/21
     */
    @Update("  <script>\n" +
            "            update basic_manageuser\n" +
            "            <set>\n" +
            "                <if test=\"loginaccount != null\">\n" +
            "                    loginaccount = #{loginaccount},\n" +
            "                </if>\n" +
            "                <if test=\"usertypename != null\">\n" +
            "                    usertypename = #{usertypename},\n" +
            "                </if>\n" +
            "                <if test=\"gendercode != null\">\n" +
            "                    gendercode = #{gendercode},\n" +
            "                </if>\n" +
            "                <if test=\"name != null\">\n" +
            "                    name = #{name},\n" +
            "                </if>\n" +
            "                <if test=\"phone != null\">\n" +
            "                    phone = #{phone},\n" +
            "                </if>\n" +
            "                <if test=\"officephone != null\">\n" +
            "                    officephone = #{officephone},\n" +
            "                </if>\n" +
            "                <if test=\"status >= 0\">\n" +
            "                    status = #{status},\n" +
            "                </if>\n" +
            "            </set>\n" +
            "            where manageid = #{manageid}\n" +
            "        </script>")
    int updateManageUser(BasicManageUserInfo basicManageUserInfo);

    /**
     * <p>添加管理用户</P>
     *
     * @author : liuwenwen
     * @date : 2020/10/22
     * @param  basicManageUser 管理用户实体
     * @return int
     */
    @Insert("insert into basic_manageuser " +
            "(manageid,loginaccount,gendercode,name,usertype," +
            "usertypename,organid,phone,officephone,creatime,lastmodtime,status) \n" +
            "VALUES (#{manageid},#{loginaccount},#{gendercode},#{name},#{usertype}," +
            "#{usertypename},#{organid},#{phone},#{officephone},now(),now(),1)")
    int addManageUser(BasicManageUser basicManageUser);
}
