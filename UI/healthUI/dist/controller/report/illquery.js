layui.define(function(exports){
    //体检疾病查询js

    layui.use(['laydate','table','element','hdk','form','tool','appconfig'], function(){
        var $ = layui.$
            ,laydate = layui.laydate
            ,router = layui.router()
            ,table = layui.table
            ,setter = layui.setter
            ,form = layui.form
            ,element = layui.element
            ,hdk = layui.hdk
            ,admin = layui.admin
            ,tool= layui.tool
            ,params = {}
            ,headers = {}
            ,userInfo = {}
            ,appconfig = layui.appconfig
            ,thisTab = 0;

        //初始化表格表头
        table.render({
            elem: '#illquerytb'
            ,title:'干部健康检查信息统计表'
            ,page: true
            ,limit:30
            ,cellMinWidth:40
            ,data:[]
            ,loading: false
            ,cols:[ [
                {field: 'diseaseNam', title:'体检结果', align: 'center',rowspan:2,fixed:'left'}
                ,{title:'50岁以下', align:'center',colspan:3}
                ,{title:'50-59岁', align:'center',colspan:3}
                ,{title:'60-69岁', align:'center',colspan:3}
                ,{title:'70-79岁', align:'center',colspan:3}
                ,{title:'80-89岁', align:'center',colspan:3}
                ,{title:'90岁以上', align:'center',colspan:3}
            ],[
                {field:'manA',title:'男', align:'center', colspan:1}
                ,{field:'woManA',title:'女', align:'center',  colspan:1}
                ,{field:'probabilityA',title:'患病率(%)', align:'center', colspan:1}
                ,{field:'manB',title:'男', align:'center',  colspan:1}
                ,{field:'woManB',title:'女', align:'center',  colspan:1}
                ,{field:'probabilityB',title:'患病率(%)', align:'center',  colspan:1}
                ,{field:'manC',title:'男', align:'center',  colspan:1}
                ,{field:'woManC',title:'女', align:'center',  colspan:1}
                ,{field:'probabilityC',title:'患病率(%)', align:'center',  colspan:1}
                ,{field:'manD',title:'男', align:'center',  colspan:1}
                ,{field:'woManD',title:'女', align:'center',  colspan:1}
                ,{field:'probabilityD',title:'患病率(%)', align:'center',  colspan:1}
                ,{field:'manE',title:'男', align:'center',  colspan:1}
                ,{field:'woManE',title:'女', align:'center',  colspan:1}
                ,{field:'probabilityE',title:'患病率(%)', align:'center',  colspan:1}
                ,{field:'manF',title:'男', align:'center',  colspan:1}
                ,{field:'woManF',title:'女', align:'center',  colspan:1}
                ,{field:'probabilityF',title:'患病率(%)', align:'center',  colspan:1}
            ]]});

        $('.health-query .multi-checkbox div',hdk.config.activeTab).on('click',function () {
            $(this).siblings().removeClass("hyd-selected");
            $(this).toggleClass("hyd-selected");
        });

        //点击查询
        $('#query_illnum').click(function () {
            //加载弹窗
            loading = layer.load(1, {
                content: "<div style='margin-left:-30px;padding-top:60px;width:120px;color:#2b425b;'>正在查询请稍后...</div>",
                shade: [0.4, '#000']
            });
            table.render({
                elem: '#illquerytb'
                ,title:'干部健康检查信息统计表'
                ,url:appconfig.Report.loadExamStatistics
                ,method:'post'
                ,page: true
                ,limit:30
                ,cellMinWidth:40
                ,loading: false
                ,cols:[ [
                    {field: 'diseaseNam', title:'体检结果', align: 'center',rowspan:2,fixed:'left'}
                    ,{title:'50岁以下', align:'center',colspan:3}
                    ,{title:'50-59岁', align:'center',colspan:3}
                    ,{title:'60-69岁', align:'center',colspan:3}
                    ,{title:'70-79岁', align:'center',colspan:3}
                    ,{title:'80-89岁', align:'center',colspan:3}
                    ,{title:'90岁以上', align:'center',colspan:3}
                ],[
                    {field:'manA',title:'男', align:'center', colspan:1}
                    ,{field:'woManA',title:'女', align:'center',  colspan:1}
                    ,{field:'probabilityA',title:'患病率(%)', align:'center', colspan:1}
                    ,{field:'manB',title:'男', align:'center',  colspan:1}
                    ,{field:'woManB',title:'女', align:'center',  colspan:1}
                    ,{field:'probabilityB',title:'患病率(%)', align:'center',  colspan:1}
                    ,{field:'manC',title:'男', align:'center',  colspan:1}
                    ,{field:'woManC',title:'女', align:'center',  colspan:1}
                    ,{field:'probabilityC',title:'患病率(%)', align:'center',  colspan:1}
                    ,{field:'manD',title:'男', align:'center',  colspan:1}
                    ,{field:'woManD',title:'女', align:'center',  colspan:1}
                    ,{field:'probabilityD',title:'患病率(%)', align:'center',  colspan:1}
                    ,{field:'manE',title:'男', align:'center',  colspan:1}
                    ,{field:'woManE',title:'女', align:'center',  colspan:1}
                    ,{field:'probabilityE',title:'患病率(%)', align:'center',  colspan:1}
                    ,{field:'manF',title:'男', align:'center',  colspan:1}
                    ,{field:'woManF',title:'女', align:'center',  colspan:1}
                    ,{field:'probabilityF',title:'患病率(%)', align:'center',  colspan:1}
                ]]
                ,done:function () {
                    //关闭加载弹窗
                    layer.close(loading);
                }
            });

        });

        //请求后台数据导出到Excel
        $("#hyd_examina_toexcel").click(function () {

            var bathname = Base64.encode($("#hyd_exam_bathname .hyd-selected span").html());
            var hospitalnam = Base64.encode($("#hyd_exam_hospitalnam .hyd-selected span").html());
            var orgtype = Base64.encode($("#hyd_exam_orgtype .hyd-selected span").html());
            var type = Base64.encode($("#hyd_exam_type .hyd-selected span").html());
            var treat = Base64.encode($("#hyd_exam_treat .hyd-selected span").html());
            var treattype = Base64.encode($("#hyd_exam_treattype .hyd-selected span").html());
            var levl = Base64.encode($("#hyd_exam_levl .hyd-selected span").html());

            window.open('_blank').location = appconfig.Report.Disase +
                "?bathname="+bathname+"&hospitalnam="+hospitalnam+"&orgtype"+orgtype+
                "&type="+type+"&treat"+treat+"&treattype"+treattype+"&levl"+levl;
        })

    });
    exports('report/illquery', {})
});
