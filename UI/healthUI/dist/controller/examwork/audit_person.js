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
            elem: '#auditpersontable'
            ,url: '../../../mockup/organ_manage_table.json' //数据接口
            ,page: true //开启分页
            ,cols: [[ //表头
                {type: 'checkbox', fixed: 'left'}
                , {field: 'organid', title: '标题', width:100, fixed: 'left'}
                ,{field: 'organorder', title: '人员名称', width:100, sort: true}
                ,{field: 'organname', title: '填报人数', width:100, sort: true}
                ,{field: 'organnature', title: '新增人数', width:100}
                ,{field: 'organprefix', title: '减少人数', width: 100}
                ,{field: 'sevretorgan', title: '变更人数', width: 100}
                ,{field: 'status', title: '参检人数', width: 100, sort: true}
                ,{field: 'creatime', title: '预计不参检人数', width: 100}
                ,{field: 'lastmodtime', title: '状态',width:100}
                ,{field: 'lastmodtime', title: '提交时间',width:100}
                ,{field: 'lastmodtime', title: '审核结果',width:100}
                ,{field: 'lastmodtime', title: '审核状态',width:100}
                ,{field: 'null', title: '操作', templet: '#auditpersontable_bolder'}
            ]]
        });
        //监听工具条
        table.on('tool(auditpersontable)', function(obj){ //注：tool 是工具条事件名，test 是 table 原始容器的属性 lay-filter="对应的值"
            let data = obj.data; //获得当前行数据
            let layEvent = obj.event; //获得 lay-event 对应的值（也可以是表头的 event 参数对应的值）
            let tr = obj.tr; //获得当前行 tr 的 DOM 对象（如果有的话）
            switch (layEvent){
                case "query_audit":
                    //跳转到查看审核人员名单详情
                    admin.urlenhash('examwork/audit_person_view$view='+data.organid+'/title=查看审核人员名单');
                    break;
                case "edit_audit":
                    //跳转到编辑审核人员名单详情
                    admin.urlenhash('examwork/audit_person_edit$view='+data.organid+'/title=编辑审核人员名单');
                    break;
                case "stop_audit":
                    //打开确认框
                    layer.confirm('是否停用人员'+data.organorder, {
                        btn: ['确认', '取消'],
                        yes: function(index, layero) {
                            //获得输入的参数...
                            //发送ajax到后台change...
                            //渲染更新页面
                            layer.close(index);
                        }
                    });
                    break;
                case "start_audit":
                    //打开确认框
                    layer.confirm('是否启用人员'+data.organorder, {
                        btn: ['确认', '取消'],
                        yes: function (index, layero) {
                            //获得输入的参数...
                            //发送ajax到后台change...
                            //渲染更新页面
                            layer.close(index);
                        }
                    });
                    break;
                default:
                    break;
            }
        });
        //跳转到批量审核人员名单结果页
        $('#examwork_auditperson [name="audit"]').click(function () {
            //获取选中的人员名单ID

            //到后台请求change
            var resultData = null;
            //打开弹窗并show结果
            layer.open({
                title:'批量审核人员名单',
                type: 1,
                closeBtn:1,
                skin: 'layui-layer-rim', //加上边框
                area: ['500px', '500px'], //宽高
                content: $("#batchcheck_layer",hdk.config.activeTab).html(),
                success: function (layero, index) {
                    //通过数据渲染页面
                    table.render({
                        elem: '#batchcheck_successtable'
                        ,data: resultData
                        ,loading: false
                        ,cols: [[ //表头
                            {field: 'organid', title: '机构名称', width:100, fixed: 'left'}
                            ,{field: 'organorder', title: '审核结果', width:100}
                            ,{field: 'organname', title: '原因'}
                        ]]
                    });
                    table.render({
                        elem: '#batchcheck_failuretable'
                        ,data: resultData
                        ,loading: false
                        ,cols: [[ //表头
                             {field: 'organid', title: '机构名称', width:100, fixed: 'left'}
                            ,{field: 'organorder', title: '审核结果', width:100}
                            ,{field: 'organname', title: '原因'}
                        ]]
                    });
                }
            })
        });


    });
    exports('examwork/audit_person', {})
});
