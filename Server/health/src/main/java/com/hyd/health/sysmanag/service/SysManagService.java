package com.hyd.health.sysmanag.service;

import com.hyd.health.batch.domain.BatchParam;
import com.hyd.health.batch.mapper.BatchMapper;
import com.hyd.health.sysmanag.domain.*;
import com.hyd.health.sysmanag.domain.info.BasicHospitalInfo;
import com.hyd.health.sysmanag.domain.info.BasicOrganInfo;
import com.hyd.health.sysmanag.domain.info.ExamOrganInfo;
import com.hyd.health.sysmanag.mapper.SysManagMapper;
import com.hyd.health.sysmanag.domain.vo.ExamOrganVO;
import com.hyd.health.system.excpetion.SqlException;
import com.hyd.health.system.util.TimeUntil;
import com.hyd.health.systerm.domain.SysTerm;
import com.hyd.health.systerm.mapper.SysTermMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * <p>系统管理服务层</p>
 *
 * @author liuwenwen
 * @date 2020/10/16
 */

@Service("sysManagService")
public class SysManagService {

    @Autowired
    private SysManagMapper sysManagMapper;

    @Autowired
    private SysTermMapper sysTermMapper;

    @Autowired
    private BatchMapper batchMapper;

    /**
     * <p>导航注释-- 参检机构</p>
     *
     * */

    /**
     * <p>添加参检单位</p>
     *
     * @param basicExamorgan 参检机构实体
     * @return int
     * @author liuwenwen
     * @date 2020/10/19
     */
    public int addBasicExamorgan(BasicExamOrgan basicExamorgan) {
        String id = "";
        try {
            id = batchMapper.getBatchNumberByDate(BatchParam.EXAM_ORGAN_PREFIX, BatchParam.EXAM_ORGAN_DATATYPE, BatchParam.EXAM_ORGAN_FLOWLEN);
        } catch (Exception e) {
            e.printStackTrace();
            throw new SqlException("生成参检单位编码失败!");
        }

        String time = TimeUntil.getTimeStr(null);

        basicExamorgan.setOrganid(id);
        basicExamorgan.setCreatime(time);
        basicExamorgan.setLastmodtime(time);

        try {
            return sysManagMapper.addBasicExamorgan(basicExamorgan);
        } catch (Exception e) {
            e.printStackTrace();
            throw new SqlException("添加参检单位失败!");
        }
    }

    /**
     * <p>修改参检单位信息</p>
     *
     * @param examOrganInfo 参检机构实体
     * @author liuwenwen
     * @date 2020/10/19
     * @Return int
     */
    public int updataBasicExamorgan(ExamOrganInfo examOrganInfo) {
        try {
            return sysManagMapper.updataBasicExamorgan(examOrganInfo);
        } catch (Exception e) {
            e.printStackTrace();
            System.out.println(e.getMessage());
            throw new SqlException("修改参检单位失败！");
        }
    }

    /**
     * <p>获得参检单位列表</p>
     *
     * @return list
     * @author liuwenwen
     * @date 2020/10/16
     */
    public List<BasicExamOrgan> getBasicExamorganList() {
        try {
            return sysManagMapper.getBasicExamorganList();
        } catch (Exception e) {
            e.printStackTrace();
            throw new SqlException("查询参检单位失败！");
        }
    }

    /**
     * <p>获得新建参检机构时的必要参数，最大排序号和系统术语列表</p>
     *
     * @param cateId 系统术语的类型id
     * @return object
     * @author liuwenwen
     * @date 2020/10/18
     */
    public ExamOrganVO getAddExamOrganBasicParam(String cateId) {
        ExamOrganVO examOrganVO = new ExamOrganVO();

        try {
            int order = sysManagMapper.getBasicExamorganMaxOrder();
            List<SysTerm> sysTermList = sysTermMapper.getSysTermByCateId(cateId);
            examOrganVO.setOrder(order);
            examOrganVO.setSysTermList(sysTermList);
            return examOrganVO;
        } catch (Exception e) {
            e.printStackTrace();
            throw new SqlException("获取必要参数失败！");
        }
    }


    /**
     * <p>导航注释-- 管理机构</p>
     *
     * */

    /**
     * <p>修改管理机构</p>
     *
     * @param basicOrganInfo
     * @return int
     * @date 2020/10/20
     * @author liuwenwen
     */
    public int updataBasicOrgan(BasicOrganInfo basicOrganInfo) {
        try {
            return sysManagMapper.updataBasicOrgan(basicOrganInfo);
        } catch (Exception e) {
            e.printStackTrace();
            throw new SqlException("修改管理机构失败！");
        }
    }

    /**
     * <p>获得管理机构列表</p>
     *
     * @return list
     * @author liuwenwen
     * @date 2020/10/16
     */
    public List<BasicOrgan> getBasicOrganList() {
        try {
            return sysManagMapper.getBasicOrganList();
        } catch (Exception e) {
            e.printStackTrace();
            throw new SqlException("查询管理机构失败！");
        }
    }


    /**
     * <p>导航注释-- 体检医院</p>
     *
     * */

    /**
     * <p>修改体检医院</p>
     *
     * @param basicHospitalInfo
     * @return int
     * @date 2020/10/20
     * @author liuwenwen
     */
    public int updataBasichospital(BasicHospitalInfo basicHospitalInfo) {
        try {
            return sysManagMapper.updataBasichospital(basicHospitalInfo);
        } catch (Exception e) {
            e.printStackTrace();
            throw new SqlException("修改体检医院失败");
        }
    }

    /**
     * <p>获得体检医院列表</p>
     *
     * @return list
     * @author liuwenwen
     * @date 2020/10/16
     */
    public List<BasicHospital> getBasicHospitalList() {
        try {
            return sysManagMapper.getBasicHospitalList();
        } catch (Exception e) {
            e.printStackTrace();
            throw new SqlException("查询体检医院失败");
        }
    }
}
