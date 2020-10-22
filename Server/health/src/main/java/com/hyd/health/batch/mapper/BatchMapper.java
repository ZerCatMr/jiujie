package com.hyd.health.batch.mapper;

import com.hyd.health.batch.domain.Batch;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;

/**
 * <p>流程化处理工具mapper</p>
 *
 * @author liuwenwen
 * @date 2020/10/13
 */

@Mapper
public interface BatchMapper {

    /**
     * <p>在插入数据时获取序列号</p>
     *
     * @param prefix   前缀
     * @param datetype 数据类型
     * @param flowlens 填充长度
     * @return String
     * @author liuwenwen
     * @date 2020/10/13
     */
    @Select("call getBatchNumberByDate(#{prefix},#{datetype},#{flowlens}) ")
    String getBatchNumberByDate(String prefix, String datetype, int flowlens);

    /**
     * <p>在插入数据时获取序列号</p>
     *
     * @param batch
     * @return String
     * @author liuwenwen
     * @date 2020/10/13
     */
    @Select("call getBatchNumberByDate(#{prefix},#{datetype},#{flowlens}) ")
    String getBatchNumberByDates(Batch batch);
}
