//干保办体检工作/体检批次管理/修改体检批次详情
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
        //初始化表单
        form.render();

        //查询统计信息和标题
        $.ajax({

        });
        //加载日期选择器
        laydate.render({
            elem: '#start_date' //指定元素
        });
        laydate.render({
            elem: '#end_date' //指定元素
        });

        //初始化表格
        const leftTable = hdk.tableRender({
                url: appconfig.Examwork.Fillbatch.FillOrgan
                ,elem: '#examwork_batchmanage_edittable'
                ,where: {"batchid":router.search.id,"batchyear":router.search.year}
                ,toolbar: "#toolbarDemo"
                ,defaultToolbar: ['filter', 'exports', 'print', { //自定义头部工具栏右侧图标。如无需自定义，去除该参数即可
                    title: '提示'
                    ,layEvent: 'LAYTABLE_TIPS'
                    ,icon: 'layui-icon-tips'
                }]
                ,cols: [[ //表头
                    {field: 'order_code', title: '序号', width:100, fixed: 'left'}
                    ,{field: 'organ_name', title: '机构名称', width:100}
                    ,{field: 'organ_type', title: '机构性质', width:100}
                    ,{field: 'manage_online', title: '管理员(在职)', width:100}
                    ,{field: 'phone', title:'联系电话(在职)', width:100}
                    ,{field: 'manage_offline', title:'管理员(离职)', width:100}
                    ,{field: 'phone_offline', title:'联系电话(离职)', width:100}
                    ,{field: 'fillin_status', title:'填报状态',templet:function (d) {
                            return d.fillin_status=='0'?"未填报":(d.fillin_status=='1'?"填报中":"已填报")
                        }}
                ]]
            });

        //渲染未添加单位表格
        const rightTable = table.render({
            skin: 'line' //行边框风格
            ,elem: '#edit_organ_table'
            ,url: null //数据接口
            ,page: false //开启分页
            ,cols: [[ //表头
                {field: 'order_code', title: '序号', width:100, fixed: 'left', hide: true}
                ,{field: 'organ_name', title: '机构名称',  fixed: 'left'  ,
                    templet: function(d){
                        return '<div class="layui-col-md12">' +
                            '<div class="layui-col-md8">'+d.organ_name+'</div>' +
                            '<div class="layui-col-md4" name="right_edit_organ">' +
                            '<i class="layui-icon layui-icon-add-circle" style="font-size: 30px; color: #808080;"></i></div>'
                    }}

            ]]
            ,data: testJsonData
            ,done:function () {
                $('[lay-id="edit_organ_table"] th').hide();//表头隐藏的样式
            }
        });

        //左右表格的重载
        function reloadLeftTable(data) {
            leftTable.reload({
                data:data
            })
        }
        function reloadRigthTable(data) {
            rightTable.reload({
                data:data
            })
        }

        //监听左右表格过滤框事件
        $('#examwork_batchmanage_edit input[name="health-search"]', hdk.config.activeTab).keyup(function () {
            reloadLeftTable(tool.filterArray($(this).val(),testJsonData));
        });
        $('#examwork_batchmanage_edit input[name="health-search-right"]', hdk.config.activeTab).keyup(function () {
            reloadRigthTable(tool.filterArray($(this).val(),testJsonData));
        });

        //提交和关闭页面
        $("#examwork_batchmanage_edit #submitTab").click(function () {

        });
        $("#examwork_batchmanage_edit #closeTab").click(function () {
            admin.closeThisTabs();
        });

        //右侧机构添加到左侧列表
        $('[name="right_edit_organ"]').click(function () {
            //获取当前的的机构编码
            const organId = $(this).attr("organid");
            //发送ajax请求后台更新table
            //重新渲染页面
        })

    });
    exports('examwork/batch_manage_edit', {})
});
