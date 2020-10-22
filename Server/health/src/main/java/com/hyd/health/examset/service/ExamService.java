package com.hyd.health.examset.service;

import com.hyd.health.batch.domain.BatchParam;
import com.hyd.health.batch.mapper.BatchMapper;
import com.hyd.health.examset.domain.*;
import com.hyd.health.examset.mapper.ExamMapper;
import com.hyd.health.system.excpetion.SqlException;
import com.hyd.health.system.util.TimeUntil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * @author liuwenwen
 * @date 2020/10/12
 */

@Service
public class ExamService {

    @Autowired
    private ExamMapper examMapper;

    @Autowired
    private BatchMapper batchMapper;

    /**
     * </p>导航注释-- 体检项目分类</p>
     *
     * */

    /**
     * <p>新增体检项目分类</p>
     *
     * @param sysExamprojectCate 体检项目分类实体
     * @return int
     * @author liuwenwen
     * @date 2020/10/14
     */
    public int addSysExamCate(SysExamprojectCate sysExamprojectCate) {
        String id = "";
        try {
            id = batchMapper.getBatchNumberByDate(BatchParam.EXAM_CATE_PREFIX, BatchParam.EXAM_CATE_DATATYPE, BatchParam.EXAM_CATE_FLOWLEN);
        } catch (Exception e) {
            e.printStackTrace();
            throw new SqlException("生成体检项目分类编码失败！");
        }

        String time = TimeUntil.getTimeStr(null);

        sysExamprojectCate.setId(id);
        sysExamprojectCate.setCreatime(time);
        sysExamprojectCate.setLastmodtime(time);
        sysExamprojectCate.setStatus(1);

        try {
            return examMapper.addSysExamCate(sysExamprojectCate);
        } catch (Exception e) {
            e.printStackTrace();
            throw new SqlException("添加体检项目分类失败！");
        }
    }

    /**
     * <p>修改体检项目分类</p>
     *
     * @param sysExamprojectCateInfo 体检项目分类实体
     * @return int
     * @author liuwenwen
     * @date 2020/10/13
     */
    public int updataExamcateById(SysExamprojectCateInfo sysExamprojectCateInfo) {
        try {
            return examMapper.updataExamcateById(sysExamprojectCateInfo);
        } catch (Exception e) {
            e.printStackTrace();
            throw new SqlException("修改体检项目分类失败");
        }
    }

    /**
     * <p>获得体检项目分类列表</p>
     *
     * @return List  SysExamprojectCate
     * @author lww
     * @date 2020/10/12
     */
    public List<SysExamprojectCate> getExamCateList() {
        try {
            return examMapper.getExamCateList();
        } catch (Exception e) {
            e.printStackTrace();
            throw new SqlException("查询体检项目分类失败！");
        }
    }

    /**
     * <p>获取最大体检项目分类排序号</p>
     *
     * @return int
     * @author liuwenwen
     * @date 2020/10/14
     */
    public int getMaxExamCateOrder() {
        try {
            return examMapper.getMaxExamCateOrder();
        } catch (Exception e) {
            e.printStackTrace();
            throw new SqlException("获取体检项目分类排序号失败！");
        }
    }


    /**
     * </p>导航注释-- 体检项目</p>
     *
     * */

    /**
     * <p>新增体检项目</p>
     *
     * @param sysExamProject 体检项目实体
     * @return int
     * @author liuwenwen
     * @date 2020/10/15
     */
    public int addSysExamProject(SysExamProject sysExamProject) {
        String id = "";
        try {
            id = batchMapper.getBatchNumberByDate(BatchParam.EXAM_PROJ_PREFIX, BatchParam.EXAM_PROJ_DATATYPE, BatchParam.EXAM_PROJ_FLOWLEN);
        } catch (Exception e) {
            e.printStackTrace();
            throw new SqlException("生成体检项目编码失败");
        }

        String time = TimeUntil.getTimeStr(null);

        sysExamProject.setId(id);
        sysExamProject.setStatus(1);
        sysExamProject.setCreatime(time);
        sysExamProject.setLastmodtime(time);

        try {
            return examMapper.addSysExamProject(sysExamProject);
        } catch (Exception e) {
            e.printStackTrace();
            throw new SqlException("新增体检项目失败");
        }
    }

    /**
     * <p>修改体检项目</p>
     *
     * @param sysExamProjectInfo 体检项目实体
     * @return int
     * @author liuwenwen
     * @date 2020/10/12
     */
    public int updateExamProjectById(SysExamProjectInfo sysExamProjectInfo) {
        try {
            return examMapper.updateExamProjectById(sysExamProjectInfo);
        } catch (Exception e) {
            e.printStackTrace();
            throw new SqlException("修改体检项目失败");
        }
    }

    /**
     * <p>获取体检项目列表</p>
     *
     * @param cateId 分类
     * @return List  SysExamProject
     * @author liuwenwen
     * @date 2020/10/12
     */
    public List<SysExamProject> getExamProjsByCateId(String cateId) {
        try {
            return examMapper.getExamProjsByCateId(cateId);
        } catch (Exception e) {
            e.printStackTrace();
            throw new SqlException("查询体检项目失败");
        }
    }

    /**
     * <p>获得最大的体检项目排序号</p>
     *
     * @return int
     * @author liuwenwen
     * @date 2020/10/15
     */
    public int getMaxExamProjectOrder() {
        try {
            return examMapper.getMaxExamProjectOrder();
        } catch (Exception e) {
            e.printStackTrace();
            throw new SqlException("获取最大体检排序号失败");
        }
    }


    /**
     * </p>导航注释-- 体检疾病分类</p>
     *
     * */

    /**
     * <p>新增体检疾病分类</p>
     *
     * @param sysDiseaseCate 体检疾病分类实体
     * @return int
     * @author liuwenwen
     * @date 2020/10/15
     */
    public int addDiseaseCate(SysDiseaseCate sysDiseaseCate) {
        String id = "";
        try {
            id = batchMapper.getBatchNumberByDate(BatchParam.DISEASE_CATE_PREFIX, BatchParam.DISEASE_CATE_DATATYPE, BatchParam.DISEASE_CATE_FLOWLEN);
        } catch (Exception e) {
            e.printStackTrace();
            throw new SecurityException("生成体检疾病分类编码失败！");
        }

        String time = TimeUntil.getTimeStr(null);

        sysDiseaseCate.setId(id);
        sysDiseaseCate.setCreatime(time);
        sysDiseaseCate.setLastmodtime(time);
        sysDiseaseCate.setStatus(1);

        try {
            return examMapper.addDiseaseCate(sysDiseaseCate);
        } catch (Exception e) {
            e.printStackTrace();
            throw new SecurityException("新增体检疾病分类失败！");
        }
    }

    /**
     * <p>获取疾病分类列表</p>
     *
     * @author liuwenwen
     * @date 2020/10/12
     * return list
     */
    public List<SysDiseaseCate> getDiseaseCateList() {
        try {
            return examMapper.getDiseaseCateList();
        } catch (Exception e) {
            e.printStackTrace();
            throw new SqlException("查询疾病分类列表失败");
        }
    }

    /**
     * <p>修改疾病分类</p>
     *
     * @param sysDiseaseCate return int
     * @author liuwenwen
     * @date 2020/10/12
     */
    public int updateDiseaseCateById(SysDiseaseCateInfo sysDiseaseCateInfo) {
        try {
            return examMapper.updateDiseaseCateById(sysDiseaseCateInfo);
        } catch (Exception e) {
            e.printStackTrace();
            throw new SqlException("修改疾病分类失败");
        }
    }

    /**
     * <p>获取最大的体检疾病分类排序号</p>
     *
     * @author liuwenwen
     * @date 2020/10/15
     */
    public int getMaxDiseCateOrder() {
        try {
            return examMapper.getMaxDiseCateOrder();
        } catch (Exception e) {
            e.printStackTrace();
            throw new SqlException("获取体检疾病分类排序号失败！");
        }
    }


    /**
     * </p>导航注释-- 体检疾病</p>
     *
     * */

    /**
     * <p>新增体检疾病</p>
     *
     * @param sysDisease 体检疾病实体
     * @author liuwenwen
     * @date 2020/10/15
     */
    public int addDisease(SysDisease sysDisease) {
        String id = "";
        try {
            id = batchMapper.getBatchNumberByDate(BatchParam.DISEASE_PREFIX, BatchParam.DISEASE_DATATYPE, BatchParam.DISEASE_FLOWLEN);
        } catch (Exception e) {
            e.printStackTrace();
            throw new SqlException("生成体检疾病编码失败");
        }

        sysDisease.setId(id);
        sysDisease.setStatus(1);

        try {
            return examMapper.addDisease(sysDisease);
        } catch (Exception e) {
            e.printStackTrace();
            throw new SqlException("新增体检疾病失败！");
        }
    }

    /**
     * <p>修改体检疾病</p>
     *
     * @param sysDiseaseInfo return int
     * @author liuwenwen
     * @date 2020/10/12
     */
    public int updateDiseaseById(SysDiseaseInfo sysDiseaseInfo) {
        try {
            return examMapper.updateDiseaseById(sysDiseaseInfo);
        } catch (Exception e) {
            e.printStackTrace();
            throw new SqlException("修改体检疾病成功");
        }
    }

    /**
     * <p>获取体检疾病列表</p>
     *
     * @param cateId return list
     * @author liuwenwen
     * @date 2020/10/12
     */
    public List<SysDisease> getDiseaseList(String cateId) {
        try {
            return examMapper.getDiseaseList(cateId);
        } catch (Exception e) {
            e.printStackTrace();
            throw new SqlException("查询体检疾病失败！");
        }
    }

    /**
     * <p>获取体检疾病最大排序号</p>
     *
     * @author liuwenwen
     * @date 2020/10/15
     */
    public int getMaxDiseOrder() {
        try {
            return examMapper.getMaxDiseOrder();
        } catch (Exception e) {
            e.printStackTrace();
            throw new SqlException("查询体检疾病排序号失败！");
        }
    }
}
