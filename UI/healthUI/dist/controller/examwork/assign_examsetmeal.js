layui.define(function(exports){
    //干保办体检工作/制定体检套餐
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
        let examsetTable = table.render({
            elem: '#assignexamsetmealtable'
            ,url: '../../../mockup/organ_manage_table.json' //数据接口
            ,page: true //开启分页
            ,loading: false
            ,cols: [[ //表头
                {field: 'organid', title: '年度', width:100, fixed: 'left'}
                ,{field: 'organorder', title: '批次', width:100, sort: true}
                ,{field: 'organname', title: '体检项目类型', width:100, sort: true}
                ,{field: 'null', title: '操作', templet: '#assignexamsetmealtable_bolder'}
            ]]
        });
        //监听工具条
        table.on('tool(assignexamsetmealtable)', function(obj){ //注：tool 是工具条事件名，test 是 table 原始容器的属性 lay-filter="对应的值"
            const data = obj.data; //获得当前行数据
            const layEvent = obj.event; //获得 lay-event 对应的值（也可以是表头的 event 参数对应的值）
            const tr = obj.tr; //获得当前行 tr 的 DOM 对象（如果有的话）
            const organId = data.organId;
            if(layEvent==="bolder_query"){
                //跳转到查看体检套餐详情页面
                admin.urlenhash('examwork/assign_examsetmeal_view$view='+organId+'/title=查看体检套餐');
            }
            else if(layEvent==="bolder_edit"){
                //跳转到编辑体检套餐详情
                admin.urlenhash('examwork/assign_examsetmeal_edit$view='+organId+'/title=编辑体检套餐');
            }
        });
        //点击新增体检套餐
        $('#examwork_assignexamsetmeal').find('[name="add"]').click(function () {
            //获取选中体检批次和体检单位
            const batchId = $('#examwork_assignexamsetmeal').find('[name="batch"]').next().find(".layui-this").attr("lay-value");
            const batchName = $('#examwork_assignexamsetmeal').find('[name="batch"]').next().find(".layui-this").html();
            if(batchId==null){
                layer.msg("请选择一个体检批次", {
                    icon: 2
                    ,time: 1000
                    ,offset: '200px'
                });
            }else {
                //跳转到新增体检套餐页
                admin.urlenhash('examwork/assign_examsetmeal_add/title=新增体检套餐');
            }
        });
        //点击查询体检套餐
        $('#examwork_assignexamsetmeal').find('[name="query"]').click(function () {
            //获取选中体检批次和体检单位
            const batchId = $('#examwork_assignexamsetmeal').find('[name="batch"]').next().find(".layui-this").attr("lay-value");
            const batchName = $('#examwork_assignexamsetmeal').find('[name="batch"]').next().find(".layui-this").html();
            const organId = $('#examwork_assignexamsetmeal').find('[name="organ"]').next().find(".layui-this").attr("lay-value");
            const organName = $('#examwork_assignexamsetmeal').find('[name="organ"]').next().find(".layui-this").html();

            //发送ajax到后台处理查询请求...
            var data = null;
            //重新渲染页面
            examsetTable.reload({
                data:data
            })
        });

    });
    exports('examwork/assign_examsetmeal', {})
});
