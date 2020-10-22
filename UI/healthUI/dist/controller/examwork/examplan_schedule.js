//安排体检日程
layui.define(['laydate','table','element','hdk','form','tool','appconfig'],function(exports){
    //layui.use(, function(){
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
            ,elem: '#examplan_schedule__table'
            ,cols: [[ //表头 from form
                {field: 'batchyear', title: '体检年度', width:150, fixed: 'left'}
                ,{field: 'batchname', title: '体检批次', width:150, fixed: 'left'}
                ,{field: 'title', title:'标题', width:150, fixed:'left'}
                ,{field: 'null', title: '操作'}
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

        //体检日程 /id=2020/title=安排体检日程
        $('#examplan_schedule_add', hdk.config.activeTab).click(function () {
            admin.urlenhash('examwork/examplan_schedule_assign/id=2020/title=安排体检日程');
        });


    //});
    exports('examwork/examplan_schedule', {})
});
