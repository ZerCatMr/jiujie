//干保办体检工作/体检批次管理/新增体检批次
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
        //设置测试数据
        const testJsonData = [
            {
                "order_code":"1",
                "organ_name":"机构名称aaa",
                "organ_type":"市级机关",
                "manage_online":"张三",
                "phone":"8223780",
                "manage_offline":"李四",
                "phone_offline":"8105745",
                "fillin_status":"已填报"
            },
            {
                "order_code":"2",
                "organ_name":"机构名称bb",
                "organ_type":"市级企事业单位",
                "manage_online":"王五",
                "phone":"8223755",
                "manage_offline":"赵六",
                "phone_offline":"8105786",
                "fillin_status":"已填报"
            },
            {
                "order_code":"3",
                "organ_name":"机构名称ccc",
                "organ_type":"其他",
                "manage_online":"李二三",
                "phone":"8223782",
                "manage_offline":"李小龙",
                "phone_offline":"754254",
                "fillin_status":"未填报"
            },
            {
                "order_code":"4",
                "organ_name":"机构名称addd",
                "organ_type":"市级机关",
                "manage_online":"钱八",
                "phone":"8223781",
                "manage_offline":"成龙",
                "phone_offline":"8105781",
                "fillin_status":"未填报"
            }
        ];
        //初始化表单
        form.render();

        //加载日期选择器
        laydate.render({
            elem: '#start_date' //指定元素
        });
        laydate.render({
            elem: '#end_date' //指定元素
        });

        //初始化表格
        const leftTable = table.render({
            elem: '#examwork_batchmanage_addtable'
            ,url: null //数据接口
            ,page: false //开启分页
            ,cols: [[ //表头
                {field: 'order_code', title: '序号', width:100, fixed: 'left'}
                ,{field: 'organ_name', title: '机构名称', width:100}
                ,{field: 'organ_type', title: '机构性质', width:100}
                ,{field: 'manage_online', title: '管理员(在职)', width:100}
                ,{field: 'phone', title:'联系电话(在职)', width:100}
                ,{field: 'manage_offline', title:'管理员(离职)', width:100}
                ,{field: 'phone_offline', title:'联系电话(离职)', width:100}
                ,{field: 'fillin_status', title:'填报状态'}
            ]]
            ,data: testJsonData
        });
        //渲染未添加单位表格
        const rightTable = table.render({
            skin: 'line' //行边框风格
            ,elem: '#add_organ_table'
            ,url: null //数据接口
            ,page: false //开启分页
            ,loading: false
            ,cols: [[ //表头
                {field: 'order_code', title: '序号', width:100, fixed: 'left', hide: true}
                ,{field: 'organ_name', title: '机构名称',  fixed: 'left'  ,
                    templet: function(d){
                        return '<div class="layui-col-md12">' +
                            '<div class="layui-col-md8">'+d.organ_name+'</div>' +
                            '<div class="layui-col-md4" name="right_add_organ" organid="'+d.order_code+'">' +
                            '<i class="right_add_organ layui-icon layui-icon-add-circle" style="font-size: 30px; color: #808080;"></i></div>'
                }}
            ]]
            ,data: testJsonData
            ,done:function () {
                $('[lay-id="add_organ_table"] th').hide();//表头隐藏的样式
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
        $('#examwork_batchmanage_add input[name="health-search"]', hdk.config.activeTab).keyup(function () {
            reloadLeftTable(tool.filterArray($(this).val(),testJsonData));
        });
        $('#examwork_batchmanage_add input[name="health-search-right"]', hdk.config.activeTab).keyup(function () {
            reloadRigthTable(tool.filterArray($(this).val(),testJsonData));
        });


        //提交和关闭页面
        $("#examwork_batchmanage_add #submitTab").click(function () {

        });
        $("#examwork_batchmanage_add #closeTab").click(function () {
            admin.closeThisTabs();
        });

        //监听右侧添加机构按钮
        $('[name="right_add_organ"]').click(function () {
            //获取当前的的机构编码
            const organId = $(this).attr("organid");
            //发送ajax请求后台更新table
            //重新渲染页面
        });


    });
    exports('examwork/batch_manage_add', {})
});

