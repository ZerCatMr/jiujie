package com.hyd.health.system.handle;

import java.io.PrintWriter;
import java.io.StringWriter;

/**
 * Created by xieshuai on 2019/8/16 14:42
 * 获取异常堆栈信息工具类
 */
class StactException {


    static String getStackTrace(Throwable throwable) {
        StringWriter sw = new StringWriter();

        try (PrintWriter pw = new PrintWriter(sw)) {
            throwable.printStackTrace(pw);
            return sw.toString();
        }
    }
}
