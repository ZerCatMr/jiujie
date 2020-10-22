package com.hyd.health.redis;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.core.StringRedisTemplate;
import org.testng.annotations.Test;

import java.util.concurrent.TimeUnit;

public class test {
    //注入redisTemplate
    @Autowired
    private StringRedisTemplate redisTemplate;

    @Test
    public void setRedis() {  //缓存中最常用的方法
        redisTemplate.opsForValue().set("first","siwei"); //设置缓存过期时间为30   单位：秒　　　　 //关于TimeUnit下面有部分源码截图
        redisTemplate.opsForValue().set("second","siweiWu",30, TimeUnit.SECONDS);
        System.out.println("存入缓存成功");
    }
    @Test
    public void getRedis(){
        String first = redisTemplate.opsForValue().get("first");
        String second = redisTemplate.opsForValue().get("second");

        System.out.println("取出缓存中first的数据是:"+first);
        System.out.println("取出缓存中second的数据是:"+second);

    }
    @Test
    public void delRedis() {
        //根据key删除缓存
        Boolean first1 = redisTemplate.delete("first");

        System.out.println("是否删除成功:"+first1);
    }
}
