//干保办体检工作/体检批次管理
layui.define(function(exports){
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


        //初始化表格
        var batchmanage_table = hdk.tableRender({
            url: appconfig.Examwork.Fillbatch.QueryFillbatch
            ,elem: '#examwork_batchmanage_table'
            ,cols: [[ //表头 from form
                {field: 'batchyear', title: '体检年度', width:150, fixed: 'left'}
                ,{field: 'batchname', title: '体检批次', width:150, fixed: 'left'}
                ,{field: 'title', title:'标题', width:150, fixed:'left'}
                ,{field: 'batch_starttime', title:'批次开始日期', width:150, fixed:'left'}
                ,{field: 'batch_endtime', title:'批次结束日期', width:150, fixed:'left'}
                ,{field: 'is_effective', title:'批次状态', width:150, fixed:'left',templet: function (d) {
                        return d.is_effective == "0" ? "失效" : "生效";
                    }}
                ,{field: 'null', title: '操作', templet: '#examwork_batchmanage_table_bolder'}
            ]]
        });
        //重载搜索框
        function tableshow(data){
            batchmanage_table.reload({
                data:data
            });
        }
        //监听左侧搜索框事件
        $('#examwork_batchmanage input[name="health-search"]', hdk.config.activeTab).keyup(function () {
            tableshow(tool.filterArray($(this).val(),testData));
        });



        //监听工具条
        table.on('tool(examwork_batchmanage_table)', function(obj){ //注：tool 是工具条事件名，test 是 table 原始容器的属性 lay-filter="对应的值"
            var data = obj.data; //获得当前行数据
            var layEvent = obj.event; //获得 lay-event 对应的值（也可以是表头的 event 参数对应的值）
            var tr = obj.tr; //获得当前行 tr 的 DOM 对象（如果有的话）
            switch (layEvent){
                case "start":
                    //生效
                    layer.confirm('是否要使当前批次生效?', function(index){
                        hdk.ajax({
                            api: appconfig.Examwork.Fillbatch.IsTakeEffect,
                            data: JSON.stringify({"batchid":data.batchid,"state":'0'})
                        },function (result) {
                            batchmanage_table.reload();
                            layer.msg("更新状态成功");
                        })
                    });
                    break;
                case "stop":
                    //失效
                    layer.confirm('是否要使当前批次失效?', function(index){
                        hdk.ajax({
                            api: appconfig.Examwork.Fillbatch.IsTakeEffect,
                            data: JSON.stringify({"batchid":data.batchid,"state":'1'})
                        },function (result) {
                            batchmanage_table.reload();
                            layer.msg("更新状态成功");
                        })
                    });
                    break;
                case "view":
                    $('#LAY_app_tabsheader li').each(function (index, el) {
                        if ($(this).attr('lay-id') == '/examwork/batch_manage_query') {
                            $('#LAY_app_tabsheader li').eq(index).find('.layui-tab-close').trigger('click');
                        }
                    });
                // <a class="layui-btn  layui-btn-xs" lay-event="view" lay-href='examwork/batch_manage_query$view:{{d.examyear}}/title={{d.examyear}}体检批次'>查看</a>
                    admin.urlenhash('examwork/batch_manage_query/year='+data.batchyear+'/id='+data.batchid+'/title='+data.title)
                    break
                case "edit":
                    $('#LAY_app_tabsheader li').each(function (index, el) {
                        if ($(this).attr('lay-id') == '/examwork/batch_manage_edit') {
                            $('#LAY_app_tabsheader li').eq(index).find('.layui-tab-close').trigger('click');
                        }
                    });
                    admin.urlenhash('examwork/batch_manage_edit/year='+data.batchyear+'/id='+data.batchid+'/title=编辑'+data.title)
                    break
                default:
                    break;
            }

        });

        //新增体检疾病分类按钮
        $('#examwork_batchmanage [name="add"]').click(function () {
            debugger
            //打开弹窗
            layer.open({
                type: 1,
                title: '新增体检批次弹窗',
                area: ['700px', '500px'],
                content: $("#examwork_batchmanage_addlayer").html(),
                success: function (layero, index) {
                }
            });
        });

        //跳转到新增体检批次详情页面
        $("#examwork_batchmanage #add").click(function () {
            hdk.ajax({
                api:appconfig.Examwork.Fillbatch.AddFillbatch
            },function (result) {
                if(result.data){
                    layer.alert('已存在生效批次！', {
                        icon: 5,
                        skin: 'layer-ext-moon',
                        title:"新增失败"
                    })
                }else {
                    hdk.ajax({
                        api:""
                    },function (result) {

                    })
                    admin.urlenhash('examwork/batch_manage_add/title=新增体检批次');
                }
            })
        });

    });
    exports('examwork/batch_manage', {})
});
