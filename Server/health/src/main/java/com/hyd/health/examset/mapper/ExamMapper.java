package com.hyd.health.examset.mapper;

import com.hyd.health.examset.domain.*;
import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;
import org.apache.ibatis.annotations.Update;

import java.util.List;

/**
 * @author liuwenwen
 * @date 2020/10/12
 */

@Mapper
public interface ExamMapper {

    /**
     * <p>导航注释-- 体检项目分类</p>
     *
     * */

    /**
     * <p>新增体检项目分类</p>
     *
     * @param sysExamprojectCate
     * @return int
     * @author liuwenwen
     * @date 2020/10/12
     */
    @Insert("insert into sys_examproject_cate (id,name,cateorder,status,creatime,lastmodtime) \n" +
            "VALUES (#{id},#{name},#{cateorder},#{status},#{creatime},#{lastmodtime})")
    int addSysExamCate(SysExamprojectCate sysExamprojectCate);

    /**
     * <p>修改体检项目分类</p>
     *
     * @param sysExamprojectCateInfo
     * @return int
     * @author liuwenwen
     * @date 2020/10/13
     */
    @Update("<script>" +
            " UPDATE sys_examproject_cate \n" +
            " <set>" +
            "   <if test=\"name != null\">\n" +
            "       name = #{name},\n" +
            "   </if>\n" +
            "   <if test=\"status >= 0\">\n" +
            "       status = #{status},\n" +
            "   </if>\n" +
            " </set>" +
            " where id = #{id}" +
            "</script>")
    int updataExamcateById(SysExamprojectCateInfo sysExamprojectCateInfo);

    /**
     * <p>获得体检项目分类列表</p>
     *
     * @author liuwenwen
     * @date 2020/10/12
     */
    @Select("select id,name,cateorder,status,creatime,lastmodtime from sys_examproject_cate")
    List<SysExamprojectCate> getExamCateList();

    /**
     * <p>获取最大的体检项目分类排序号</p>
     *
     * @return int
     * @author liuwenwen
     * @date 2020/10/14
     */
    @Select("SELECT IFNULL(a.cateorder,0) from (select max(cateorder) as cateorder from sys_examproject_cate) a;")
    int getMaxExamCateOrder();

    /**
     * <p>导航注释-- 体检项目</p>
     *
     * */

    /**
     * <p>新增体检项目</p>
     *
     * @param sysExamProject
     * @return int
     * @author liuwenwen
     * @date 2020/10/15
     */
    @Insert("insert into sys_examproject (id,name,cateid,itemorder,status,creatime,lastmodtime) \n" +
            "VALUES (#{id},#{name},#{cateid},#{itemorder},#{status},#{creatime},#{lastmodtime})")
    int addSysExamProject(SysExamProject sysExamProject);

    /**
     * <p>修改体检项目</p>
     *
     * @param sysExamProjectInfo
     * @return int
     * @author liuwenwen
     * @date 2020/10/12
     */
    @Update("<script>" +
            " UPDATE sys_examproject \n" +
            " <set>" +
            "   <if test=\"name != null\">\n" +
            "       name = #{name},\n" +
            "   </if>\n" +
            "   <if test=\"status >= 0\">\n" +
            "       status = #{status},\n" +
            "   </if>\n" +
            "  </set>" +
            "  where id = #{id}" +
            "</script>")
    int updateExamProjectById(SysExamProjectInfo sysExamProjectInfo);

    /**
     * <p>获取体检项目列表</p>
     *
     * @param cateid 分类
     * @return List  SysExamProject
     * @author liuwenwen
     * @date 2020/10/12
     */
    @Select("select id,name,itemorder,status,creatime,lastmodtime,cateid from sys_examproject where cateid = #{cateid}")
    List<SysExamProject> getExamProjsByCateId(String cateid);

    /**
     * <p>获得最大的体检项目排序号</p>
     *
     * @return int
     * @author liuwenwen
     * @date 2020/10/15
     */
    @Select("SELECT IFNULL(a.itemorder,0) from (select max(itemorder) as itemorder from sys_examproject) a;")
    int getMaxExamProjectOrder();


    /**
     * <p>导航注释-- 体检疾病分类</p>
     *
     * */

    /**
     * <p>新增体检疾病分类</p>
     *
     * @param sysDiseaseCate
     * @return int
     * @author liuwenwen
     * @date 2020/10/15
     */
    @Insert("insert into sys_disease_cate (id,name,cateorder,status,creatime,lastmodtime) \n" +
            "VALUES (#{id},#{name},#{cateorder},#{status},#{creatime},#{lastmodtime})")
    int addDiseaseCate(SysDiseaseCate sysDiseaseCate);

    /**
     * <p>获取体检疾病分类列表</p>
     *
     * @author liuwenwen
     * @date 2020/10/12
     * return list
     */
    @Select("SELECT id,name,cateid,cateorder,status,creatime,lastmodtime from sys_disease_cate")
    List<SysDiseaseCate> getDiseaseCateList();

    /**
     * <p>修改体检疾病分类</p>
     *
     * @param sysDiseaseCateInfo return int
     * @author liuwenwen
     * @date 2020/10/12
     */
    @Update("<script>\n" +
            " UPDATE sys_disease_cate \n" +
            " <set>" +
            "   <if test=\"name != null\">\n" +
            "       name = #{name},\n" +
            "   </if>\n" +
            "   <if test=\"status >= 0\">\n" +
            "       status = #{status},\n" +
            "   </if>\n" +
            "  </set>" +
            "  where id = #{id}\n" +
            "</script>")
    int updateDiseaseCateById(SysDiseaseCateInfo sysDiseaseCateInfo);

    /**
     * <p>获取最大的体检疾病分类排序号</p>
     *
     * @author liuwenwen
     * @date 2020/10/15
     */
    @Select("SELECT IFNULL(a.cateorder,0) from (select max(cateorder) as cateorder from sys_disease_cate) a;")
    int getMaxDiseCateOrder();


    /**
     * <p>导航注释-- 体检疾病</p>
     *
     * */

    /**
     * <p>新增体检疾病</p>
     * @param sysDisease
     * @author liuwenwen
     * @date 2020/10/15
     * */
    @Insert("insert into sys_disease (id,name,cateid,itemorder,status) \n" +
            "VALUES (#{id},#{name},#{cateid},#{itemorder},#{status})")
    int addDisease(SysDisease sysDisease);

    /**
     * <p>修改体检疾病</p>
     *
     * @param sysDiseaseInfo return int
     * @author liuwenwen
     * @date 2020/10/12
     */
    @Update("<script>\n" +
            " UPDATE sys_disease \n" +
            " <set>" +
            "  <if test=\"name != null\">\n" +
            "      name = #{name},\n" +
            "   </if>\n" +
            "   <if test=\"status >= 0\">\n" +
            "      status = #{status},\n" +
            "   </if>\n" +
            " </set>" +
            " where id = #{id}\n" +
            "</script>")
    int updateDiseaseById(SysDiseaseInfo sysDiseaseInfo);

    /**
     * <p>获取体检疾病列表</p>
     *
     * @param cateId return list
     * @author liuwenwen
     * @date 2020/10/12
     */
    @Select("SELECT id,name,cateid,itemorder,status from sys_disease where cateid= #{cateid} ")
    List<SysDisease> getDiseaseList(String cateId);

    /**
     * <p>获取体检疾病最大排序号</p>
     * @author liuwenwen
     * @date 2020/10/15
     * */
    @Select("SELECT IFNULL(a.itemorder,0) from (select max(itemorder) as itemorder from sys_disease) a;")
    int getMaxDiseOrder();
}
