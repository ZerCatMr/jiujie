layui.define(function(exports){
    //干保办体检工作/填报人员名单
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
        var tableIns = table.render({
            elem: '#fillinpersontable'
            ,url: null
            ,data: null
            ,loading: false
            ,cols: [[ //表头
                {field: 'organid', title: '标题', width:100, fixed: 'left'}
                ,{field: 'organorder', title: '单位名称', width:100}
                ,{field: 'organname', title: '填报人数', width:100}
                ,{field: 'organnature', title: '新增人数', width:100}
                ,{field: 'organprefix', title: '减少人数', width: 100}
                ,{field: 'sevretorgan', title: '变更人数', width: 100}
                ,{field: 'status', title: '参检人数', width: 100}
                ,{field: 'creatime', title: '预计不参检人数', width: 100}
                ,{field: 'lastmodtime', title: '状态',width:100}
                ,{field: 'lastmodtime', title: '提交时间',width:100}
                ,{field: 'lastmodtime', title: '审核结果',width:100}
                ,{field: 'lastmodtime', title: '审核状态'}
                ,{field: 'null', title: '操作', templet: '#fillinpersontable_bolder'}
            ]]
        });
        //表格重载事件
        function tableReload(data) {
            tableIns.reload({
                data: data
            })
        }
        //监听工具条
        table.on('tool(fillinpersontable)', function(obj){ //注：tool 是工具条事件名，test 是 table 原始容器的属性 lay-filter="对应的值"
            var data = obj.data; //获得当前行数据
            var layEvent = obj.event; //获得 lay-event 对应的值（也可以是表头的 event 参数对应的值）
            var tr = obj.tr; //获得当前行 tr 的 DOM 对象（如果有的话）
            if(layEvent==="bolder_query"){
                var organId = data.organid
                //跳转到查看详情页面
                admin.urlenhash('examwork/fillin_person_show$view='+organId+'/title=查看填报人员名单详情页');
                return;
            }
            if(layEvent==="bolder_edit"){
                var organId = data.organid
                //跳转到编辑详情页
                admin.urlenhash('examwork/fillin_person_edit$view='+organId+'/title=编辑填报人员名单详情页');
                return;
            }
            if(layEvent==="bolder_del"){
                layer.confirm('是否移除当前行数据', function(index){
                    obj.del(); //删除对应行（tr）的DOM结构，并更新缓存
                    layer.close(index);
                    //向服务端发送删除指令...
                });
            }
        });
        //点击查询事件
        $('#examwork_fillinperson [name="query"]').click(function () {
            //获得批次和机构
            let batchName = $('#examwork_fillinperson').find('[name="batch"]').next().find(".layui-this").html();
            let batchId = $('#examwork_fillinperson').find('[name="batch"]').next().find(".layui-this").attr("lay-value");
            let organName = $('#examwork_fillinperson').find('[name="organ"]').next().find(".layui-this").html();
            let organId = $('#examwork_fillinperson').find('[name="organ"]').next().find(".layui-this").attr("lay-value");
            $.ajax({
                url:'../../../mockup/organ_manage_table.json',
                contentType:'application/json',
                type: 'get',
                dataType:'json',
                success: function (result) {
                    tableIns.reload({
                        data: result.data
                    });
                    //监听搜索框
                    $('#examwork_fillinperson input[name="health-search"]', hdk.config.activeTab).keyup(function () {
                        tableReload(tool.filterArray($(this).val(), result.data));
                    });
                }
            });
        });
        //点击新增事件
        $('#examwork_fillinperson [name="audit"]').click(function () {
            //获得批次和机构
            let batchName = $('#examwork_fillinperson').find('[name="batch"]').next().find(".layui-this").html();
            let batchId = $('#examwork_fillinperson').find('[name="batch"]').next().find(".layui-this").attr("lay-value");
            let organName = $('#examwork_fillinperson').find('[name="organ"]').next().find(".layui-this").html();
            let organId = $('#examwork_fillinperson').find('[name="organ"]').next().find(".layui-this").attr("lay-value");
            //判断输入参数
            if(batchId==null||organId==null){
                layer.msg("请选择批次和机构", {
                    offset: '15px'
                    ,icon: 2
                    ,time: 1000
                });
            }else{
                //打开新增UI
                admin.urlenhash('examwork/fillin_person_add/title=新增填报人员');
            }
        });
    });
    exports('examwork/fillin_person', {})
});
