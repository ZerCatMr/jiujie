package com.hyd.health.sysmanag.domain.vo;

import com.hyd.health.systerm.domain.SysTerm;
import lombok.Data;

import java.util.List;

/**
 * <p>添加参检单位时，必要结果返回集</p>
 * @author liuwenwen
 * @date 2020/10/20
 * */

@Data
public class ExamOrganVO {
    private int order;
    private List<SysTerm> sysTermList;
}
