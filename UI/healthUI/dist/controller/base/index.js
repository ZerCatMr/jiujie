//健康档案授权页面
layui.define(function(exports){
    layui.use(['laydate','table','element','hdk','form','tool','appconfig','form','layer'], function(){
        var $ = layui.$
            ,laydate = layui.laydate
            ,router = layui.router()
            ,table = layui.table
            ,setter = layui.setter
            ,form = layui.form
            ,layer = layui.layer
            ,element = layui.element
            ,hdk = layui.hdk
            ,tool=layui.tool
            ,admin = layui.admin
            ,params = {}
            ,headers = {}
            ,userInfo = {}
            ,thisTab = 0
            ,appconfig = layui.appconfig
        ;
    //从缓存中获取已登录用户的状态信息
    var roleIndex =   window.location.search.substring("11");
        roleIndex === "" ? roleIndex = 0 : roleIndex = roleIndex;
    var roleName =  JSON.parse(sessionStorage.getItem("health-login-cache")).roleDOList[roleIndex].roleName;



    if(roleName == "干保办体检管理员"){
        //$("#index_iframe", hdk.config.activeTab).attr("src",appconfig.Menu.MangerHomeUrl);
    }

    if(roleName == "干保办领导"){
        //$("#index_iframe", hdk.config.activeTab).attr("src", appconfig.Menu.LaderHomeUrl);
    }


    });
    exports('index', {})
});