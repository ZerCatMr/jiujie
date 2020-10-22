package com.hyd.health.sysmanag.mapper;

import com.hyd.health.sysmanag.domain.*;
import com.hyd.health.sysmanag.domain.info.BasicHospitalInfo;
import com.hyd.health.sysmanag.domain.info.BasicOrganInfo;
import com.hyd.health.sysmanag.domain.info.ExamOrganInfo;
import org.apache.ibatis.annotations.*;

import java.util.List;

/**
 * <p>系统管理mapper</p>
 *
 * @author liuwenwen
 * @date 2020/10/16
 */

@Mapper
public interface SysManagMapper {

    /**
     * <p>导航注释-- 参检机构</p>
     *
     * */

    /**
     * <p>添加参检机构</p>
     *
     * @param basicExamorgan
     * @return int
     * @author liuwenwen
     * @date 2020/10/19
     */
    @Insert("insert into basic_examorgan " +
            "(organid,organname,organorder,organnature,organaddress," +
            "organphone,organprefix,secretorgan,creatime,lastmodtime,status) \n" +
            "VALUES (#{organid},#{organname},#{organorder},#{organnature},#{organaddress}," +
            "#{organphone},#{organprefix},#{secretorgan},#{creatime},#{lastmodtime},1)")
    int addBasicExamorgan(BasicExamOrgan basicExamorgan);

    /**
     * <p>修改参检机构</p>
     *
     * @param examOrganInfo
     * @author liuwenwen
     * @date 2020/10/19
     * @Return int
     */
    @Update("<script> UPDATE basic_examorgan\n" +
            " <set>" +
            "   <if test=\"organname != null\">\n" +
            "        organname = #{organname},\n" +
            "    </if>\n" +
            "    <if test=\"organaddress != null\">\n" +
            "        organaddress = #{organaddress},\n" +
            "    </if>\n" +
            "    <if test=\"organphone != null\">\n" +
            "       organphone = #{organphone},\n" +
            "    </if>\n" +
            "    <if test=\"organnature != null\">\n" +
            "        organnature = #{organnature},\n" +
            "    </if>\n" +
            "   <if test=\"organprefix != null\">\n" +
            "      organprefix = #{organprefix},\n" +
            "   </if>\n" +
            "   <if test=\"status >= 0\">\n" +
            "       status = #{status},\n" +
            "   </if>\n" +
            "   <if test=\"secretorgan >= 0\">\n" +
            "       secretorgan = #{secretorgan},\n" +
            "   </if>\n" +
            "   <if test=\"organorder >= 0\">\n" +
            "       organorder = #{organorder},\n" +
            "   </if>\n" +
            " </set>" +
            " where organid = #{organid}\n" +
            "</script>")
    int updataBasicExamorgan(ExamOrganInfo examOrganInfo);

    /**
     * <p>获得参检机构列表</p>
     *
     * @return list
     * @author liuwenwen
     * @date 2020/10/16
     */
    @Select("SELECT a.organid,a.organname,a.organorder,a.organprefix,a.secretorgan,a.organaddress,a.organphone,a.status,b.termname as organnature from basic_examorgan a,sys_term b\n" +
            "WHERE a.organnature = b.termid ORDER BY a.organorder desc")
    List<BasicExamOrgan> getBasicExamorganList();

    /**
     * <p>获得参检机构最大排序数</p>
     *
     * @author liuwenwen
     * @date 2020/10/19
     */
    @Select("SELECT IFNULL(a.organorder,0) from (select max(organorder) as organorder from basic_examorgan) a;")
    int getBasicExamorganMaxOrder();

    /**
     * <p>导航注释-- 管理机构</p>
     *
     * */

    /**
     * <p>修改管理机构</p>
     * @param basicOrganInfo
     * @date 2020/10/20
     * @author liuwenwen
     * @return int
     * */
    @Update("<script> UPDATE basic_organ\n" +
            " <set>" +
            "   <if test=\"organname != null\">\n" +
            "        organname = #{organname},\n" +
            "    </if>" +
            " </set>" +
            " where id = #{id}\n" +
            "</script>")
    int updataBasicOrgan(BasicOrganInfo basicOrganInfo);

    /**
     * <p>获得管理机构列表</p>
     *
     * @return list
     * @author liuwenwen
     * @date 2020/10/16
     */
    @Select("SELECT id,organtype,organname,organid,creatime,lastmodtime from basic_organ")
    List<BasicOrgan> getBasicOrganList();

    /**
     * <p>导航注释-- 体检医院</p>
     *
     * */

    /**
     * <p>修改体检医院</p>
     * @param basicHospitalInfo
     * @date 2020/10/20
     * @author liuwenwen
     * @return int
     * */
    @Update("<script> UPDATE basic_hospital\n" +
            " <set>" +
            "   <if test=\"hospname != null\">\n" +
            "        hospname = #{hospname},\n" +
            "    </if>" +
            "   <if test=\"status >=0 \">\n" +
            "       status = #{status},\n" +
            "   </if>\n" +
            " </set>" +
            " where hospid = #{hospid}\n" +
            "</script>")
    int updataBasichospital(BasicHospitalInfo basicHospitalInfo);

    /**
     * <p>获得体检医院列表</p>
     *
     * @return list
     * @author liuwenwen
     * @date 2020/10/16
     */
    @Select("SELECT hospid,hospname,organtype,creatime,lastmodtime,status from basic_hospital")
    List<BasicHospital> getBasicHospitalList();
}
