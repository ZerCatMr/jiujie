package com.hyd.health.examwork.service;

import com.hyd.health.examwork.info.FillOrgInfo;
import com.hyd.health.examwork.info.FillisTake;
import com.hyd.health.examwork.mapper.FillbatchMapper;
import com.hyd.health.examwork.vo.FillOrgVO;
import com.hyd.health.examwork.vo.FillbatchVO;
import com.hyd.health.system.excpetion.BusineException;
import com.hyd.health.system.excpetion.SqlException;
import com.hyd.health.system.util.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class FillbatchService {

    @Autowired
    private FillbatchMapper fillbatchMapper;

    /**
     * 查询体检批次
     *
     * @return
     */
    public List<FillbatchVO> queryFillbatch() {
        try {
            return fillbatchMapper.queryFillbatch();
        } catch (Exception e) {
            throw new SqlException("查询体检批次失败！");
        }

    }

    public List<FillOrgVO> queryfillOrgan(FillOrgInfo fillOrgInfo) {
        try {
            fillOrgInfo.setStartNum(fillOrgInfo.getLimit() * (fillOrgInfo.getPage() - 1));
            return fillbatchMapper.queryfillOrgan(fillOrgInfo);
        } catch (Exception e) {
            e.printStackTrace();
            throw new SqlException("查询参检机构失败！");
        }
    }

    public Integer queryfillOrgancount(FillOrgInfo fillOrgInfo) {
        try {
            return fillbatchMapper.queryfillOrgancount(fillOrgInfo);
        } catch (Exception e) {
            e.printStackTrace();
            throw new SqlException("查询参检机构总数失败！");
        }
    }

    public String isTakeEffect(FillisTake fillisTake) {
        try {
            fillbatchMapper.isTakeEffect(fillisTake);
            if (StringUtils.isNotBlank(fillisTake.getErrMsg())) {
                throw new BusineException(fillisTake.getErrMsg());
            }
            return "更新状态成功";
        } catch (BusineException e) {
            throw new SqlException(e.getMsg());
        } catch (Exception e) {
            e.printStackTrace();
            throw new SqlException("更新批次状态失败！");
        }
    }

    public Boolean existState() {
        try {
            return fillbatchMapper.existState() > 0;
        } catch (Exception e) {
            e.printStackTrace();
            throw new SqlException("判断批次状态失败！");
        }
    }

    public String addFillbatch() {
        try {
             fillbatchMapper.addFillbatch();
             return "123";
        } catch (Exception e) {
            e.printStackTrace();
            throw new SqlException("判断批次状态失败！");
        }
    }
}
