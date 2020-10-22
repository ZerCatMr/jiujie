package com.hyd.health.system.aop;

import com.alibaba.fastjson.JSON;
import com.google.gson.Gson;
import com.google.gson.reflect.TypeToken;
import com.hyd.health.login.domain.LoginVO;
import com.hyd.health.login.domain.RoleDO;
import com.hyd.health.login.service.ExamWorkService;
import com.hyd.health.redis.RedisService;
import com.hyd.health.system.excpetion.BusineException;
import com.hyd.health.system.excpetion.BusineExceptions;
import com.hyd.health.system.util.StringUtils;
import lombok.SneakyThrows;
import org.aspectj.lang.ProceedingJoinPoint;
import org.aspectj.lang.Signature;
import org.aspectj.lang.annotation.Around;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Pointcut;
import org.aspectj.lang.reflect.MethodSignature;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.web.context.request.RequestAttributes;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;

import javax.servlet.http.HttpServletRequest;
import java.lang.reflect.Method;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.concurrent.atomic.AtomicReference;

/**
 * Created by xieshuai on 2020/8/6 上午 10:00
 * 1.@Pointcut：定义一个切面，即上面所描述的关注的某件事入口。
 * 2.@Before：在做某件事之前做的事。
 * 3.@After：在做某件事之后做的事。
 * 4.@AfterReturning：在做某件事之后，对其返回值做增强处理。
 * 5.@AfterThrowing：在做某件事抛出异常时，处理。
 */
@Aspect
@Component
public class LogAspectHandler {

    @Autowired
    ExamWorkService examWorkService;

    @Autowired
    RedisService redisService;

    /**
     * 定义一个切面，拦截com.itcodai.course09.controller包和子包下的所有方法
     * execution() 为表达式主体
     * 第一个 * 号的位置：表示返回值类型， * 表示所有类型
     * 包名：表示需要拦截的包名，后面的两个句点表示当前包和当前包的所有子包，
     * com.itcodai.course09.controller 包、子包下所有类的方法
     * 第二个 * 号的位置：表示类名， * 表示所有类
     * *(..) ：这个星号表示方法名， * 表示所有的方法，后面括弧里面表示方法的参数，两个句点
     * 表示任何参数
     */
//    @Pointcut("execution(* com.itcodai.course09.controller..*.*(..))")
//    public void pointCut() {}

    @Pointcut("@annotation(org.springframework.web.bind.annotation.GetMapping)")
    public void annotationCut() {}



    /**
     * @throws Throwable
     * @return
     */
    @SneakyThrows
    @Around(value = "execution(* com.hyd..controller.*Controller.*(..))&& !execution(* com.hyd..controller.LoginController.userLogin*(..))" )
    public Object beforMehhod(ProceedingJoinPoint pjp){
        HttpServletRequest request = ((ServletRequestAttributes) RequestContextHolder.getRequestAttributes()).getRequest();
//        RequestAttributes requestAttributes = RequestContextHolder.getRequestAttributes();
//        HttpServletRequest request = (HttpServletRequest) requestAttributes.resolveReference(RequestAttributes.REFERENCE_REQUEST);
        //IP地址
//        String ipAddr = getRemoteHost(request);
        String token = request.getHeader("token");
//        String url = request.getRequestURL().toString();
//        System.out.println("请求源IP:【"+ipAddr+"】,请求URL:【"+url+"】,请求参数:【"+reqParam+"】");

//        Object result= null;
//        try {
//            result = pjp.proceed();
//        } catch (Throwable throwable) {
//            throwable.printStackTrace();
//        }
//        String respParam = postHandle(result);
//        System.out.println("请求源IP:【"+ipAddr+"】,请求URL:【"+url+"】,返回参数:【"+respParam+"】");

        Object data=null;
        //验证token
        if (StringUtils.isNotBlank(token)) {
            data = examWorkService.queryWorkReport(token);
        }else {
            throw new BusineExceptions("当前账号已过期,请重新登陆!", "-9");
        }
        Gson gson = new Gson();
        LoginVO loginVO = gson.fromJson(data.toString(), new TypeToken<LoginVO>() {
        }.getType());
        //更新过期时间
        String uid = redisService.getValue(token);
        redisService.cacheValue(token,uid,30*60);
        redisService.cacheValue(uid,token,30*60);

        Object[] args = pjp.getArgs();
        if(args.length>0) {
            String s = gson.toJson(args[0]);
            if (!"{}".equals(s)) {
                StringBuffer buffer = new StringBuffer(s);

                StringBuffer stringBuffer = new StringBuffer();
                stringBuffer.append(",profile:{")
                        .append("\"loginAccount\":\"" + loginVO.getLoginAccount())
                        .append("\",\"userid\":\"" + uid)
                        .append("\",\"organName\":\"" + (loginVO.getOrganName() == null ? "" : loginVO.getOrganName()))
                        .append("\"}");
                buffer.insert(s.length() - 1, stringBuffer.toString());
                args[0] = gson.fromJson(buffer.toString(), preHandle(pjp, request));
            }
        }
             return pjp.proceed(args);
    }

    /**
     * 入参数据
     * @param joinPoint
     * @param request
     * @return
     */
    private Class<?> preHandle(ProceedingJoinPoint joinPoint,HttpServletRequest request) {

        String reqParam = "";
        Signature signature = joinPoint.getSignature();
        MethodSignature methodSignature = (MethodSignature) signature;
        Method targetMethod = methodSignature.getMethod();
        Class<?> parameterTypes = targetMethod.getParameterTypes()[0];
//        Annotation[] annotations = targetMethod.getAnnotations();
//        for (Annotation annotation : annotations) {
//            //此处可以改成自定义的注解
//            if (annotation.annotationType().equals(RequestMapping.class)) {
//                reqParam = JSON.toJSONString(request.getParameterMap());
//                break;
//            }
//        }
        return parameterTypes;
    }

    /**
     * 返回数据
     * @param retVal
     * @return
     */
    private String postHandle(Object retVal) {
        if(null == retVal){
            return "";
        }
        return JSON.toJSONString(retVal);
    }


    /**
     * 获取目标主机的ip
     * @param request
     * @return
     */
    private String getRemoteHost(HttpServletRequest request) {
        String ip = request.getHeader("x-forwarded-for");
        if (ip == null || ip.length() == 0 || "unknown".equalsIgnoreCase(ip)) {
            ip = request.getHeader("Proxy-Client-IP");
        }
        if (ip == null || ip.length() == 0 || "unknown".equalsIgnoreCase(ip)) {
            ip = request.getHeader("WL-Proxy-Client-IP");
        }
        if (ip == null || ip.length() == 0 || "unknown".equalsIgnoreCase(ip)) {
            ip = request.getRemoteAddr();
        }
        return "0:0:0:0:0:0:0:1".equals(ip) ? "127.0.0.1" : ip;
    }

}
