package com.hyd.health.system.factory;

import com.hyd.health.system.domain.JsonResult;

/**
 * Created by xieshuai on 2020/7/20 下午 3:25
 */
public class ResultFactory {

    public static JsonResult success(){
        JsonResult jsonResult = new JsonResult();
        jsonResult.setMsg("success");
        jsonResult.setCode("200");
        return jsonResult;
    }

    public static JsonResult success(String msg){
        JsonResult jsonResult = new JsonResult();
        jsonResult.setMsg(msg);
        jsonResult.setCode("200");
        return jsonResult;
    }

    public static JsonResult success(String msg, Object data){
        JsonResult jsonResult = new JsonResult();
        jsonResult.setMsg(msg);
        jsonResult.setData(data);
        return jsonResult;
    }

    public static JsonResult error(){
        JsonResult jsonResult = new JsonResult();
        jsonResult.setCode("-1");
        return jsonResult;
    }

    public static JsonResult error(String msg){
        JsonResult jsonResult = new JsonResult();
        jsonResult.setMsg(msg);
        jsonResult.setCode("-1");
        return jsonResult;
    }

    public static JsonResult error(String msg, Object data){
        JsonResult jsonResult = new JsonResult();
        jsonResult.setMsg(msg);
        jsonResult.setData(data);
        jsonResult.setCode("-1");
        return jsonResult;
    }

    public static JsonResult errors(String code,String msg){
        JsonResult jsonResult = new JsonResult();
        jsonResult.setMsg(msg);
        jsonResult.setCode(code);
        return jsonResult;
    }

}
