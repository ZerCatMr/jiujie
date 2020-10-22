package com.hyd.health.system.factory;

import com.hyd.health.system.domain.JsonPageResult;



public class ResultPageFactory {

    public static JsonPageResult success(String msg, Object data,Integer count){
        return new JsonPageResult("200",msg,data,count);
    }


}
