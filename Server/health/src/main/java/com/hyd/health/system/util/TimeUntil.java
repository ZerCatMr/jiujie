package com.hyd.health.system.util;

import java.text.SimpleDateFormat;
import java.util.Date;

/**
 * <p>时间工具类</p>
 * @author liuwenwen
 * @date 2020/10/12
 * */
public class TimeUntil {

    /**
     * <p>获得当前时间字符串</p>
     * @author liuwenwen
     * @date 2020/10/12有
     * @param pattern 时间格式 默认为 "yyyy-MM-dd HH:mm:ss"
     * @return String
     * */
    public static String getTimeStr(String pattern){
        if(pattern == null){
            pattern = "yyyy-MM-dd HH:mm:ss";
        }
        Date date = new Date();
        SimpleDateFormat sf = new SimpleDateFormat(pattern);
        String timeStr = sf.format(date);
        return timeStr;
    }
}
