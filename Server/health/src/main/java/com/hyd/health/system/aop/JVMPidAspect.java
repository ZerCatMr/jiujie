package com.hyd.health.system.aop;

import com.hyd.health.system.util.SystemUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;

import javax.annotation.PostConstruct;
import java.io.BufferedWriter;
import java.io.File;
import java.io.FileWriter;

/**
 * Created by xieshuai on 2020/5/13 11:09
 */
@Component
public class JVMPidAspect {

    private final static Logger logger = LoggerFactory.getLogger(JVMPidAspect.class);

    @PostConstruct
    public void systemWritePid(){
        String pid = SystemUtils.getSystemPid();
        try {
            String content = "pid:"+pid;
            File file = new File(System.getProperty("user.dir")+"//pid.txt");
            if(!file.exists()){
                file.createNewFile();
            }
            FileWriter fileWriter = new FileWriter(file.getAbsoluteFile());
            BufferedWriter bw = new BufferedWriter(fileWriter);
            bw.write(content);
            bw.close();
            logger.info("pid文件写入成功:"+file.getPath());
        }catch (Exception e){
            logger.error("pid文件写入失败", e);
        }
    }


    @PostConstruct
    public void systemWriteBat(){
        String pid = SystemUtils.getSystemPid();
        try {
            String context = "taskkill /f /pid "+ pid;
            File file = new File(System.getProperty("user.dir")+"//closeServer.bat");
            FileWriter fileWriter = new FileWriter(file.getAbsoluteFile());
            BufferedWriter bf = new BufferedWriter(fileWriter);
            bf.write(context);
            bf.close();
            logger.info("bat文件写入成功:"+file.getPath());
        }catch (Exception e){
            logger.error("pid文件写入失败", e);
        }
    }
}
