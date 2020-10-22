package com.hyd.health.login.service;


import com.hyd.health.menu.domain.Exam;
import com.hyd.health.redis.RedisService;
import com.hyd.health.system.domain.JsonResult;
import com.hyd.health.system.excpetion.BusineException;
import com.hyd.health.system.excpetion.BusineExceptions;
import com.hyd.health.system.factory.ResultFactory;
import com.hyd.health.system.util.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Iterator;
import java.util.Set;


@Service
public class ExamWorkService {

    @Autowired
    RedisService redisService;

    public Object queryWorkReport(String k) {
        if (redisService.containsValueKey(k)) {
            String uid = redisService.getValue(k);
            if (redisService.containsValueKey(uid)) {
                String token = redisService.getValue(uid);
                if (!token.equals(k)) {
                    throw new BusineExceptions("当前账号已在其他地方登陆!", "-9");
                }else {
                    return redisService.getValues(uid);
                }
            } else {
                throw new BusineExceptions("当前账号已过期,请重新登陆!", "-9");
            }
        } else {
            throw new BusineExceptions("当前账号已过期,请重新登陆!", "-9");
        }
    }


}
