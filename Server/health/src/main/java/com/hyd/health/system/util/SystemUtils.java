package com.hyd.health.system.util;

import org.springframework.stereotype.Component;
import java.lang.management.ManagementFactory;


/**
 * Created by xieshuai on 2020/5/13 10:44
 */

@Component
public class SystemUtils {

    /**
     * 记录当前运行JVM的Pid
     * @return
     */
    public static String  getSystemPid(){
        String name = ManagementFactory.getRuntimeMXBean().getName();
        String pid =  name.split("@")[0];
        return pid;
    }
}
