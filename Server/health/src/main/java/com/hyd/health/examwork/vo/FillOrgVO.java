package com.hyd.health.examwork.vo;

import lombok.Data;

@Data
public class FillOrgVO {
   private String  order_code;
   private String  organ_name;
   private String  organ_type;
   private String  manage_online;
   private String  phone_online;
   private String  manage_offline;
   private String  phone_offline;
   private String  fillin_status;
}