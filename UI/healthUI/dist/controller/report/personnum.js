//体检信息统计js
layui.define(function(exports){
    
    layui.use(['laydate','table','element','hdk','form','appconfig'], function(){
        var $ = layui.$
        ,laydate = layui.laydate
        ,router = layui.router()
        ,table = layui.table
        ,setter = layui.setter
        ,form = layui.form
        ,element = layui.element
        ,hdk = layui.hdk
        ,admin = layui.admin
        ,params = {}
        ,headers = {}
        ,userInfo = {}
        ,thisTab = 0
        ,appconfig = layui.appconfig;


        var hospitalCol=[
            [
                {field: 'hospitalName', title:'体检医院', align: 'center',rowspan:2}
                ,{title:'干部合计', align:'center',colspan:3}
                ,{title:'省级干部', align:'center',colspan:3}
                ,{title:'厅级干部', align:'center',colspan:3}
            ],[
                {field:'leaderExpectCount',title:'应检', align:'center', minWidth:60, colspan:1}
                ,{field:'leaderActualCount',title:'实检', align:'center', minWidth:60, colspan:1}
                ,{field:'leaderProport',title:'体检率(%)', align:'center', minWidth:60, colspan:1}
                ,{field:'countyExpectCount',title:'应检', align:'center', minWidth:60, colspan:1}
                ,{field:'countyActualCount',title:'实检', align:'center', minWidth:60, colspan:1}
                ,{field:'countyLeaderProport',title:'体检率(%)', align:'center', minWidth:60, colspan:1}
                ,{field:'hallExpectCount',title:'应检', align:'center', minWidth:60, colspan:1}
                ,{field:'hallActualCount',title:'实检', align:'center', minWidth:60, colspan:1}
                ,{field:'hallLeaderProport',title:'体检率(%)', align:'center', colspan:1}
            ]
        ];
        var genderCol=[[
            {field:'leaderSex',title:'男女干部', align:'center', minWidth:60, colspan:1}
            ,{field:'leaderExpectCount',title:'应检', align:'center', minWidth:60, colspan:1}
            ,{field:'leaderActualCount',title:'实检', align:'center', minWidth:60, colspan:1}
            ,{field:'leaderProport',title:'体检率(%)', align:'center',  colspan:1}
        ]];
        var organCol=[
            [
                {field: 'orginName', title:'参检单位', align: 'center',rowspan:2}
                ,{title:'干部合计', align:'center',colspan:3}
                ,{title:'省级干部', align:'center',colspan:3}
                ,{title:'厅级干部', align:'center',colspan:3}
            ],[
                {field:'leaderExpectCount',title:'应检', align:'center', colspan:1}
                ,{field:'leaderActualCount',title:'实检', align:'center', colspan:1}
                ,{field:'leaderProport',title:'体检率(%)', align:'center', colspan:1}
                ,{field:'countyExpectCount',title:'应检', align:'center', colspan:1}
                ,{field:'countyActualCount',title:'实检', align:'center', colspan:1}
                ,{field:'countyLeaderProport',title:'体检率(%)', align:'center', colspan:1}
                ,{field:'hallExpectCount',title:'应检', align:'center', colspan:1}
                ,{field:'hallActualCount',title:'实检', align:'center', colspan:1}
                ,{field:'hallLeaderProport',title:'体检率(%)', align:'center', colspan:1}
            ]
        ];
        var persontypeCol=[[
            {field:'typeName',title:'干部', align:'center', minWidth:60}
            ,{field:'leaderExpectCount',title:'应检', align:'center', minWidth:60}
            ,{field:'leaderActualCount',title:'实检', align:'center', minWidth:60}
            ,{field:'leaderProport',title:'体检率(%)', align:'center', minWidth:60}
        ]];
        var provincelevCol=[[
            {field:'typeName',title:'省级干部', align:'center', minWidth:60}
            ,{field:'leaderExpectCount',title:'应检', align:'center', minWidth:60}
            ,{field:'leaderActualCount',title:'实检', align:'center', minWidth:60}
            ,{field:'leaderProport',title:'体检率(%)', align:'center', minWidth:60}
        ]];
        var citylevCol=[[
            {field:'typeName',title:'厅级干部', align:'center'}
            ,{field:'leaderExpectCount',title:'应检', align:'center'}
            ,{field:'leaderActualCount',title:'实检', align:'center'}
            ,{field:'leaderProport',title:'体检率(%)', align:'center'}
        ]];

        var reportconfig=[
            {index:1,name:"医院参检人数",column:hospitalCol,url:"tj_person_hospital"},
            {index:2,name:"男女干部参检人数",column:genderCol,url:"tj_person_gender"},
            {index:3,name:"单位参检人数",column:organCol,url:"tj_person_organ"},
            {index:4,name:"在职离退干部参检人数",column:persontypeCol,url:"tj_person_level"},
            {index:5,name:"省级待遇干部参检人数",column:provincelevCol,url:"tj_person_province"},
            {index:6,name:"厅级待遇干部参检人数",column:citylevCol,url:"tj_person_city"},
        ];
 
        var tableoption={
            elem: '#personcounttb'
            ,title:'干部健康检查信息统计表'
            ,toolbar: false
            ,defaultToolbar: ['exports', 'print']
            ,page: true
            ,cellMinWidth:40
            ,loading: true
        };
        //var hyd_table=table.render(tableoption);

        $('.health-query .multi-checkbox div').on('click',function () {
            $(this).parent().children().removeClass("hyd-selected");
            $(this).toggleClass("hyd-selected");
            reportshow();
        });

        //根据条件查询体检信息统计表
        var reportshow=function(){
            //加载弹窗
            loading = layer.load(1, {
                content: "<div style='margin-left:-30px;padding-top:60px;width:120px;color:#2b425b;'>正在查询请稍后...</div>",
                shade: [0.4, '#000']
            });


            var reportIndex=$('.multi-checkbox[hyd-name="quotaname"] .hyd-selected>span').attr("hyd-value");

            var findItem = $.grep(reportconfig, function(e){ return e.index == reportIndex; });
            var showItem=reportconfig[0];
            if(findItem.length>0) showItem=findItem[0];
            //获取体检年份和批次
            var year = $('#per-yearname .hyd-selected').attr("hyd-value");
            var jsonStr = {
                'year':year
            };
            //体检信息名单
            $.ajax({
                url: appconfig.Report.Check+showItem.url
                ,contentType: "application/json"
                ,type: "post"
                ,data: JSON.stringify(jsonStr)
                ,async:false
                ,dataType: 'json'
                ,success: function(result){
                    //关闭加载弹窗
                    layer.close(loading);
                    //渲染页面
                    table.render($.extend(tableoption,{
                        cols:showItem.column
                        ,data:result.data
                    }));
                }
            });
        }

        reportshow();

        //发送请求到后台导出数据到Excel
        $("#hyd_info_toExcel").click(function () {
            var year = Base64.encode($('#per-yearname .hyd-selected').attr("hyd-value"));
            var batch = Base64.encode($("#per-batchname .hyd-selected span").html());
            var quotaname = $("#per-quotaname .hyd-selected span").html();
            switch (quotaname) {
                case "医院":
                    window.open('_blank').location = appconfig.Report.Excel.hospital+"?batch="+batch+"&year="+year;
                    break;
                case "男女干部":
                    window.open('_blank').location = appconfig.Report.Excel.gender+"?batch="+batch+"&year="+year;
                    break;
                case "参检单位":
                    window.open('_blank').location = appconfig.Report.Excel.orgin+"?batch="+batch+"&year="+year;
                    break;
                case "人员类型":
                    window.open('_blank').location = appconfig.Report.Excel.person+"?batch="+batch+"&year="+year;
                    break;
                case "省级干部":
                    window.open('_blank').location = appconfig.Report.Excel.provin+"?batch="+batch+"&year="+year;
                    break;
                case "厅级干部":
                    window.open('_blank').location = appconfig.Report.Excel.hall+"?batch="+batch+"&year="+year;
                    break;
            }

        })
    });
    exports('report/personnum', {})
});
