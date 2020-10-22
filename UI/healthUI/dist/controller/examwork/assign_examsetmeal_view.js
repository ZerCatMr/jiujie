layui.define(function(exports){
    //指定体检套餐/查看体检套餐
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
        //初始化表单
        form.render();
        //加载表格
        table.render({
            elem: '#examworkassignexamsetmealview'
            ,url: '../../../mockup/organ_manage_table.json' //数据接口
            ,page: true //开启分页
            ,cols: [[ //表头
                {field: 'examyear', title: '体检年度', width:150, fixed: 'left'}
                ,{field: 'exambatch', title: '体检批次', width:150, fixed: 'left'}
                ,{field: 'title', title:'标题', width:150, fixed:'left'}
                ,{field: 'examstartdate', title:'批次开始日期', width:150, fixed:'left'}
                ,{field: 'examstopdate', title:'批次结束日期', width:150, fixed:'left'}
                ,{field: 'examstatus', title:'批次状态', fixed:'left'}
            ]]
        });
    });
    exports('examwork/assign_examsetmeal_view', {})
});
