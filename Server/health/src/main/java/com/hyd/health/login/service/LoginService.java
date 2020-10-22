package com.hyd.health.login.service;

import com.google.gson.Gson;
import com.google.gson.reflect.TypeToken;
import com.hyd.health.login.domain.*;
import com.hyd.health.menu.service.MenuService;
import com.hyd.health.login.mapper.LoginMapper;
import com.hyd.health.redis.RedisService;
import com.hyd.health.system.excpetion.BusineException;
import com.hyd.health.system.excpetion.BusinessErrorException;
import com.hyd.health.system.excpetion.BusinessMsgEnum;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.concurrent.atomic.AtomicReference;


/**
 * Created by xieshuai on 2020/7/21 上午 10:39
 * 
 */
@Service
public class LoginService {

    @Autowired
    private LoginMapper loginMapper;

    @Autowired
    private MenuService menuService;

    @Autowired
    private RedisService redisService;


    /**
     * 用户登录
     * @param info
     * @return
     */
    public LoginVO userLogin(LoginInfo info){

        //判断参数是否必填
        if(null==info.getLoginAccount()||null==info.getPassWord()){
            throw new BusinessErrorException(BusinessMsgEnum.PARMETER_NULL_EXCEPTION);
        }
        //验证数据库密码
        String userId = loginMapper.checkUser(info.getLoginAccount(), info.getPassWord());
        if(null==userId||"".equals(userId)){
            throw new BusinessErrorException("用户名或密码错误");
        }

        //查询角色信息
        LoginVO loginVO = new LoginVO();
        loginVO.setLoginAccount(info.getLoginAccount());

        UserRoleVO  userRoleVO= loginMapper.queryOrgan(userId);

        loginVO.setRoleName(userRoleVO.rolename);

        List<RoleDO> roleDOList = loginMapper.queryRoles(userRoleVO.roleid,userId);

        List<Relevance> list = loginMapper.queryRelevance(userId);

        if (list != null && list.size() != 0) {
            list.forEach(item->{
                roleDOList.addAll(loginMapper.queryRoles(item.roleid,item.targetuser));
            });
        }
        //查询姓名
        loginVO.setUserName(loginMapper.queryManageName(info.getLoginAccount()));

        if(null==roleDOList||roleDOList.size()==0){
            return loginVO;
        }
        //查询菜单信息
        roleDOList.forEach(s -> s.setMenuVOS(menuService.loadMenus(s.getRoleid())));
        loginVO.setRoleDOList(roleDOList);

        Gson gson = new Gson();
        //获取token
        String token = (String) redisService.getValue(userId);
        //当前用户不是第一次登录并且token未过期
        if(redisService.containsValueKey(userId)&&redisService.containsValueKey(token)){
            //第一步,移除相关缓存
            redisService.removeValue(userId);
//            redisService.removeValue(token);
            redisService.removeValues(userId);
            token = UUID.randomUUID().toString();
            //第二步,添加Redis缓存并设置有效期
            redisService.cacheValues(userId,gson.toJson(loginVO));
            redisService.cacheValue(token,userId,30*60);
            redisService.cacheValue(userId,token,30*60);
        }else{
            //当前用户第一次登录,直接放入缓存并设置有效期
            token = UUID.randomUUID().toString();
            redisService.cacheValues(userId, gson.toJson(loginVO));
            //redisService.cacheValue(UserEnum.ROLE + cd, roleVO);
            redisService.cacheValue(token,userId,30*60);
            redisService.cacheValue(userId,token,30*60);
        }
//        loginVO.setUsername(healthUserDO.getNam());
//        loginVO.setMenus(menuList);
//        loginVO.setToken(token);
//        loginVO.setRoles(roleVOS);
        loginVO.setOrganName(loginVO.getRoleDOList().get(0).getOrganname());
        loginVO.setToken(token);
        return loginVO;
    }

    /**
     * 用户退出登录
     * @return
     */
    @CacheEvict(value = "loginCache", allEntries = true)
    public String userLoginOut(){
        return null;
    }


    public Object test(LoginInfo loginInfo) {
        return null;
    }

    public LoginVO cutrole(CutRole cutRole) {
        Gson gson = new Gson();
        AtomicReference<Boolean> is = new AtomicReference<>(true);

        String data = redisService.getValues(cutRole.profile.getUserid());
        LoginVO loginVO = gson.fromJson(data.toString(), new TypeToken<LoginVO>() {
        }.getType());

        String cutUserid = "";
        String loginaccount = "";
        String organname = "";
        String roleName = "";
        for(RoleDO item:loginVO.getRoleDOList()){
            if(item.getRoleid().equals(cutRole.cutroleid)){
                is.set(false);
                cutUserid = item.getUserid();
                loginaccount = item.getLoginaccount();
                organname = item.getOrganname();
                roleName = item.getRoleName();
                break;
            }
        }
        if(is.get()){
            throw new BusineException("当前登陆账号没有此权限");
        }else {
            loginVO.setLoginAccount(loginaccount);
            loginVO.setOrganName(organname);
            loginVO.setRoleName(roleName);
            String token = redisService.getValue(cutRole.profile.getUserid());
            loginVO.setToken(token);
            redisService.removeValue(cutRole.profile.getUserid());
            redisService.removeValues(cutRole.profile.getUserid());
            redisService.cacheValues(cutUserid,gson.toJson(loginVO));
            redisService.cacheValue(cutUserid,token,30*60);
            redisService.cacheValue(token,cutUserid,30*60);
        }
        return loginVO;
    }
}
