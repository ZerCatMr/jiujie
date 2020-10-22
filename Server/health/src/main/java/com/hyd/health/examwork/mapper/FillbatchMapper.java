package com.hyd.health.examwork.mapper;

import com.hyd.health.examwork.info.FillOrgInfo;
import com.hyd.health.examwork.info.FillisTake;
import com.hyd.health.examwork.vo.FillOrgVO;
import com.hyd.health.examwork.vo.FillbatchVO;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Options;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Select;
import org.apache.ibatis.mapping.StatementType;

import java.util.List;

@Mapper
public interface FillbatchMapper {

    @Select("select * from fill_batch")
    List<FillbatchVO> queryFillbatch();

    @Select("With " +
            "cte1 as (select E.organorder order_code,E.organname organ_name,(select termname from sys_term where termid= E.organnature) organ_type,O.fill_state fillin_status,O.organid,O.year from  fill_organ O  LEFT JOIN basic_examorgan E ON O.organid=E.organid where O.batchid=#{FillOrgInfo.batchid} and O.year=#{FillOrgInfo.batchyear})," +
            "cte2 as (select cte1.*,EC.contact_posname as manage_online,EC.contact_phone as phone_online from cte1 left join basic_examorgan_contact EC on cte1.organid=EC.organid and EC.contact_position='在职' and EC.status='1') " +
            "select cte2.*,EC.contact_posname as manage_offline,EC.contact_phone as phone_offline from cte2 left join basic_examorgan_contact EC on cte2.organid=EC.organid and EC.contact_position='离职' "+
            "and EC.status='1' order by cte2.order_code asc limit #{FillOrgInfo.startNum},#{FillOrgInfo.limit}")
    List<FillOrgVO> queryfillOrgan(@Param("FillOrgInfo") FillOrgInfo fillOrgInfo);

    @Select("With " +
            "cte1 as (select O.organid,O.year from  fill_organ O  LEFT JOIN basic_examorgan E ON O.organid=E.organid where O.batchid=#{FillOrgInfo.batchid} and O.year=#{FillOrgInfo.batchyear})," +
            "cte2 as (select cte1.organid from cte1 left join basic_examorgan_contact EC on cte1.organid=EC.organid and EC.contact_position='在职' and EC.status='1')," +
            "cte3 as (select 1 from cte2 left join basic_examorgan_contact EC on cte2.organid=EC.organid and EC.contact_position='离职' and EC.status='1')" +
            "select count(1) from cte3")
    Integer queryfillOrgancount(@Param("FillOrgInfo") FillOrgInfo fillOrgInfo);

    @Select("{call isTakeEffect(" +
            "#{FillisTake.batchid,mode=IN,jdbcType=VARCHAR},"+
            "#{FillisTake.state,mode=IN,jdbcType=VARCHAR}," +
            "#{FillisTake.errMsg,mode=OUT,jdbcType=VARCHAR})}")
    @Options(statementType = StatementType.CALLABLE)
    void isTakeEffect(@Param("FillisTake") FillisTake fillisTake);

    @Select("select count(1) from fill_batch WHERE is_effective='1'")
    Long existState();

    @Select("")
    void addFillbatch();

}
