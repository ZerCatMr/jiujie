layui.define(function(exports){
    //参检机构管理
    layui.use(['laydate','table','element','hdk','form','tool','appconfig'], function(){
        var $ = layui.$
            ,laydate = layui.laydate
            ,router = layui.router()
            ,table = layui.table
            ,setter = layui.setter
            ,form = layui.form
            ,element = layui.element
            ,hdk = layui.hdk
            ,tool=layui.tool
            ,admin = layui.admin
            ,params = {}
            ,headers = {}
            ,userInfo = {}
            ,thisTab = 0
            ,appconfig = layui.appconfig;
        //自定义按钮点击事件
        $("button[lay-filter='hyd-query']",hdk.config.activeTab).on('click',function (){
            var reqdata={
                worktype:$('div[hyd-name="worktype"]>div.hyd-selected>span',hdk.config.activeTab).attr("hyd-value")||'',
                medtreat:$('div[hyd-name="medtreat"]>div.hyd-selected>span',hdk.config.activeTab).attr("hyd-value")||'',
                authstatus:$('div[hyd-name="authstatus"]>div.hyd-selected>span',hdk.config.activeTab).attr("hyd-value")||'',
                personname:$('input[name="personname"]',hdk.config.activeTab).val(),
                personIdenNo:$('input[name="personIdenNo"]',hdk.config.activeTab).val()
            }

        });
        $('.health-query .multi-checkbox div',hdk.config.activeTab).on('click',function (){
            $(this).siblings().removeClass("hyd-selected");
            $(this).toggleClass("hyd-selected");
        });

        //初始化表格
        table.render({
            elem: '#userrelatemanage_table'
            ,url: '../../../mockup/organ_manage_record_table.json' //数据接口
            ,page: false //开启分页
            ,cols: [[ //表头
                {field: 'organid', title: '名称', width:150, fixed: 'left'}
                ,{field: 'organorder', title: '主用户', width:150, fixed:'left'}
                ,{field: 'organname', title: '关联用户', width:150, fixed:'left'}
                ,{field: 'null', title: '操作', templet: '#userrelatemanage_table_bloder'}
            ]]
        });

        //监听工具条
        table.on('tool(userrelatemanage_table)', function(obj){ //注：tool 是工具条事件名，test 是 table 原始容器的属性 lay-filter="对应的值"
            var data = obj.data; //获得当前行数据
            var layEvent = obj.event; //获得 lay-event 对应的值（也可以是表头的 event 参数对应的值）
            var tr = obj.tr; //获得当前行 tr 的 DOM 对象（如果有的话）


            if(layEvent === 'del_related'){ //删除
                layer.confirm('是否移除当前账号的关联关系', function(index){
                    //向服务端发送删除指令
                });
            }
        });

        //打开弹窗
        $('#sysconfig_related_manage [name="add"]').click(function () {
            //打开弹窗
            layer.open({
                type: 1,
                title: '新增参检机构',
                area: ['700px', '500px'],
                content: $("#sysconfig_related_manage_layer").html(),
                success: function (layero, index) {
                }
            });
        });



    });
    exports('sysconfig/user_related_manage', {})
});
