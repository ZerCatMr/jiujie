//干保办体检工作/体检批次管理/查看体检批次详情
layui.define(function(exports){
    layui.use(['laydate','table','element','hdk','form','tool','appconfig'], function(){
        var $ = layui.$
            ,laydate = layui.laydate
            ,router = layui.admin.decryRouter()
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

        // //查询统计信息和标题
        // $.ajax({
        // });

        var statisInfo = "已安排：  - 52  其他 - 2  市级机关 - 88   总数：142";


        //初始化表格
        hdk.tableRender({
            url: appconfig.Examwork.Fillbatch.FillOrgan
            ,elem: '#examwork_batchmanage_table_view'
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

        //初始化表单
        form.render();
        //渲染统计信息和标题
        $("#toolbarDemo_info").html(statisInfo)
        $("#examwork_batchmanage_query .title").html(router.search.title);


    });
    exports('examwork/batch_manage_query', {})
});
