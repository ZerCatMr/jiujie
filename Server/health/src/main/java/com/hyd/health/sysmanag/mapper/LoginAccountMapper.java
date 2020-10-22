package com.hyd.health.sysmanag.mapper;

import com.hyd.health.sysmanag.domain.BasicLoginAccount;
import com.hyd.health.sysmanag.domain.info.BasicLoginAccountInfo;
import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Update;

/**
 * <p>登录账号mapper</p>
 *
 * @author ：liuwenwen
 * @date ：2020/10/21 17:39
 */

@Mapper
public interface LoginAccountMapper {

    /**
     * <p>修改登录账号</P>
     *
     * @param basicLoginAccountInfo 接收参数
     * @return int
     * @author : liuwenwen
     * @date : 2020/10/21
     */
    @Update("  <script>\n" +
            "            update basic_login_account\n" +
            "            <set>\n" +
            "                <if test=\"loginaccount != null\">\n" +
            "                    loginaccount = #{loginaccount},\n" +
            "                </if>\n" +
            "                <if test=\"loginpass != null\">\n" +
            "                    loginpass = #{loginpass},\n" +
            "                </if>\n" +
            "                <if test=\"status >= 0\">\n" +
            "                    status = #{status},\n" +
            "                </if>\n" +
            "            </set>\n" +
            "            where id = #{id}\n" +
            "        </script>")
    int updataLoginAccount(BasicLoginAccountInfo basicLoginAccountInfo);

    /**
     * <p>新增登录账号</P>
     *
     * @author : liuwenwen
     * @date : 2020/10/22
     * @param  basicLoginAccount 登录账号实体
     * @return int
     */
    @Insert("insert into basic_login_account " +
            "(id,loginaccount,loginpass,logintime,status) \n" +
            "VALUES (#{id},#{loginaccount},'123456',now(),1)")
    int addLoginAccount(BasicLoginAccount basicLoginAccount);
}
