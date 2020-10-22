layui.define(function(exports){
    //干保办体检工作/审核人员名单
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

        //初始化表格
        table.render({
            elem: $('#auditpersonviewtable',hdk.config.activeTab)
            ,url: '../../../mockup/organ_manage_table.json' //数据接口
            ,page: true //开启分页
            ,cols: [[ //表头
                {field: 'organid', title: '标题', width:100, fixed: 'left'}
                ,{field: 'organorder', title: '单位名称', width:100, sort: true}
                ,{field: 'organname', title: '填报人数', width:100, sort: true}
                ,{field: 'organnature', title: '新增人数', width:100}
                ,{field: 'organprefix', title: '减少人数', width: 100}
                ,{field: 'sevretorgan', title: '变更人数', width: 100}
                ,{field: 'status', title: '参检人数', width: 100, sort: true}
                ,{field: 'creatime', title: '预计不参检人数', width: 100}
                ,{field: 'lastmodtime', title: '状态',width:100}
                ,{field: 'lastmodtime', title: '提交时间',width:100}
                ,{field: 'lastmodtime', title: '审核结果',width:100}
                ,{field: 'lastmodtime', title: '审核状态'}
            ]]
        });

    });
    exports('examwork/audit_person_view', {})
});
