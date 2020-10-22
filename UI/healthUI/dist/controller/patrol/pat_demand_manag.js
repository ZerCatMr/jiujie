layui.define(function(exports){
    //巡诊需求管理
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

        //设置日期控件最小选择日期
        function minDate(){
            var now = new Date();
            return now.getFullYear()+"-" + (now.getMonth()+1) + "-" + now.getDate();
        }

         //初始化表格事件
         var hyd_table = table.render({
            url:appconfig.Patrol.Demand
            ,toolbar: false
            ,elem: '#demandmanag'
            ,data:[]
            ,title:'查询列表'
            ,page: true
            ,limit:10
            ,loading:true
            ,cols: [
                [
                 {field:'cd', title: '主键',sort:true, minWidth:50,align: 'center',hide:true}
                ,{field:'psnCd', title: '人员主键',sort:true, minWidth:50,align: 'center',hide:true}
                ,{field:'nam', title: '姓名', minWidth:50,align: 'center'}
                ,{field:'genderCd', title: '性别',sort:true, minWidth:50,align: 'center',templet:function (d) {
                        if(d.genderCd == 'Sex001'){
                            return '男'
                        }if(d.genderCd == 'Sex002'){
                            return  '女'
                        }
                    }}
                ,{field:'examOrgNam', title: '参检单位', align: 'center',minWidth:80}
                ,{field:'description',title:'需求描述',minWidth:150,align:'center'}
                ,{field:'startDate',title:'开始日期',sort:true,minWidth:80,align:'center'}
                ,{field:'endDate',title:'结束日期',sort:true, minWidth:80,align:'left'}
                ,{field:'effecDate',title:'生效日期',sort:true, align:'center'}
                ,{field:'roundState',title:'状态', align:'center',templet:function (d) {
                        if (d.state =='-1'){
                            return '停用'
                        }if(d.state == '1') {
                            return '启用'
                        }
                    }}
                ,{fixed: '',title:'操作', align:'center',width:150, toolbar: '#demand_manag_tool'}
                ]
            ]
        });

        //加载日期选择器
        laydate.render({
            elem: '#demand_effecDate' //指定元素
            ,closeStop: '#demand_effecDateOne' //这里代表的意思是：点击 test1 所在元素阻止关闭事件冒泡。如果不设定，则无法弹出控件
        });
        //重载表单
        form.render();


        $("button[lay-filter='hyd-query']",hdk.config.activeTab).on('click',function (){
            var reqdata={
                worktype:$('div[hyd-name="worktype"]>div.hyd-selected>span',hdk.config.activeTab).attr("hyd-value")||'',
                medtreat:$('div[hyd-name="medtreat"]>div.hyd-selected>span',hdk.config.activeTab).attr("hyd-value")||'',
                authstatus:$('div[hyd-name="authstatus"]>div.hyd-selected>span',hdk.config.activeTab).attr("hyd-value")||'',
                personname:$('input[name="personname"]',hdk.config.activeTab).val(),
                personIdenNo:$('input[name="personIdenNo"]',hdk.config.activeTab).val()
            }
            
        });
        $('.health-query .multi-checkbox div',hdk.config.activeTab).on('click',function () {
            $(this).siblings().removeClass("hyd-selected");
            $(this).toggleClass("hyd-selected");
        });
        //数据表格动态按钮点击事件(查看/安排/删除/生效)
        table.on('tool(demandmanag)', function(obj){
            var data = obj.data;
            var layEvent = obj.event;
            var tr = obj.tr;

            //生效
            if(layEvent === 'takeEffect'){
                layer.confirm('是否生效当前巡诊需求?', function(index){
                    layer.close(layer.index);
                    //向服务端发送数据
                    var jsonStr = {
                        cd:data.cd
                    }
                    //调用ajax(使一个状态为-1的巡诊需求生效)
                    $.ajax({
                        url: appconfig.Patrol.StartPatDemand
                        , contentType: "application/json"
                        , type: 'post'
                        , dataType: 'json'
                        , data:JSON.stringify(jsonStr)
                        , success: function(result) {
                            hyd_table.reload()
                        }
                    });
                });
            }
            //删除
            if(layEvent === 'dell'){
                layer.confirm('是否删除当前巡诊需求?', function(index){
                    layer.close(layer.index);
                    //向服务端发送数据
                    var jsonStr = {
                        cd:data.cd
                    }
                    //调用ajax(使一个状态为-1的巡诊需求生效)
                    $.ajax({
                        url: appconfig.Patrol.DelPatDemand
                        , contentType: "application/json"
                        , type: 'post'
                        , dataType: 'json'
                        , data:JSON.stringify(jsonStr)
                        , success: function() {
                            hyd_table.reload();
                        }
                    });
                });
            }
            //查看
            if(layEvent === 'show'){
                //打开查看弹窗
                layer.open({
                    title:'巡诊安排',
                    type: 1,
                    closeBtn:1,
                    skin: 'layui-layer-rim', //加上边框
                    area: ['700px', '700px'], //宽高
                    content: $("#demand_showment",hdk.config.activeTab).html(),
                    success:function () {
                        //获得当前表格cd
                        var jsonStr = {
                            demaCd:data.cd
                        }
                        //发送ajax请求，查询已安排医生列表
                        $.ajax({
                            url: appconfig.Patrol.QueryArrPatDemand
                            , contentType: "application/json"
                            , type: 'post'
                            , dataType: 'json'
                            , data : JSON.stringify(jsonStr)
                            , success: function(result) {
                                table.render({
                                    elem: $('#demand_showment_doctor')
                                    ,id:'demand_showment_doctor_table'
                                    ,data:result.data
                                    ,page: true
                                    ,limit:10
                                    ,loading: true
                                    ,cols: [
                                        [
                                            {field:'roundTaskCd', title: '主键',sort:true, minWidth:50,align: 'center' ,hide:true}
                                            ,{field:'doctorNam', title: '医护人员',sort:true, minWidth:50,align: 'center'}
                                            ,{field:'planDate', title: '计划巡诊日期',sort:true, minWidth:50,align: 'center'}
                                            ,{field:'date', title: '巡诊日期',sort:true, minWidth:50,align: 'center'}
                                            ,{field:'state', title: '状态', align: 'center',minWidth:80}
                                        ]
                                    ]
                                });
                            }
                        });
                    }
                });
                //给弹窗show数据
                $('[name="PsnCdNam"]').attr("value",data.nam);
                $('[name="GenderCdNam"]').attr("value",data.genderCd=='Sex001'?'男':'女');
                $('[name="EffecDate"]').attr("value",data.effecDate);
                $('[name="StartDate"]').attr("value",data.startDate);
                $('[name="EndDate"]').attr("value",data.endDate);
                $('[name="Description"]').html(data.description);
            }
            //安排
            if(layEvent === 'arrangement'){
                //打开安排弹窗
                layer.open({
                    title:'巡诊安排',
                    type: 1,
                    closeBtn:1,
                    skin: 'layui-layer-rim', //加上边框
                    area: ['700px', '700px'], //宽高
                    content: $("#demand_arrangement",hdk.config.activeTab).html(),
                    success:function () {
                        //加载时间控件
                        //获得当前表格cd
                        var jsonStr = {
                            demaCd:data.cd
                        }
                        //发送ajax请求，查询已安排医生列表
                        $.ajax({
                            url: appconfig.Patrol.QueryArrPatDemand
                            , contentType: "application/json"
                            , type: 'post'
                            , dataType: 'json'
                            , data : JSON.stringify(jsonStr)
                            , success: function(result) {
                                table.render({
                                    elem: '#demand_doctor_table'
                                    ,data:result.data
                                    ,page: true
                                    ,limit:10
                                    ,loading: true
                                    ,cols: [
                                        [
                                            {field:'roundTaskCd', title: '主键',sort:true, minWidth:50,align: 'center', hide:true}
                                            ,{field:'doctorNam', title: '医护人员',sort:true, minWidth:50,align: 'center'}
                                            ,{field:'planDate', title: '计划巡诊日期',sort:true, minWidth:50,align: 'center'}
                                            ,{field:'date', title: '巡诊日期',sort:true, minWidth:50,align: 'center'}
                                            ,{field:'state', title: '状态', align: 'center',minWidth:80}
                                        ]
                                    ]
                                });
                            }
                        });
                    }
                });
                //给弹窗show数据
                $('[name="PsnCdNam"]').attr("value",data.nam);
                $('[name="GenderCdNam"]').attr("value",data.genderCd=='Sex001'?'男':'女');
                $('[name="EffecDate"]').attr("value",data.effecDate);
                $('[name="StartDate"]').attr("value",data.startDate);
                $('[name="EndDate"]').attr("value",data.endDate);
                $('[name="Description"]').html(data.description);
                var loadDoc = null;
                //点击安排医生
                $('#appenddoc').click(function () {
                    //打开安排医生弹窗
                    layer.open({
                        title:'安排巡诊医生',
                        type: 1,
                        closeBtn:1,
                        skin: 'layui-layer-rim', //加上边框
                        area: ['900px', '700px'], //宽高
                        content: $("#demand_arrangment_doctor",hdk.config.activeTab).html(),
                        success:function(){
                            loadDoc =  table.render({
                                elem: '#patrolrecords-doctor'
                                ,url:appconfig.Patrol.Doctor
                                ,title:'保健医生名单'
                                ,page: true
                                ,limit:10
                                ,loading: true
                                ,cols: [
                                    [   {fixed: '',title:'选择', width:150, align:'center', toolbar: '#demand_radio_tool'}
                                        ,{field:'cd', title: '医生主键',sort:true, minWidth:80,align: 'center',hide:true}
                                        ,{field:'nam', title: '姓名',sort:true, minWidth:80,align: 'center'}
                                        ,{field:'genderCd', title: '性别',sort:true, minWidth:60,align: 'center',templet:function (d) {
                                            if(d.genderCd == 'Sex001'){
                                                return '男'
                                            }else {
                                                return '女'
                                            }
                                        }}
                                        ,{field:'title',title:'职称',minWidth:150,align:'center'}
                                        ,{field:'duty',title:'职务',sort:true,minWidth:80,align:'center'}
                                        ,{field:'profession',title:'专业',sort:true,minWidth:120,align:'left'}
                                    ]]
                            });
                        }
                    });

                    //加载日期选择器
                    laydate.render({
                        elem: '#RoundPlanDate' //指定元素
                        ,closeStop: '#RoundPlanDate'
                        ,min:minDate()
                    });

                    //点击确定后为巡诊需求安排巡诊医生
                    $('[class="layui-layer-btn0"]').click(function () {
                        //获得当前巡诊表主键
                        var demandCd = data.cd;
                        //获得人员主键
                        var psnCd = data.psnCd;
                        //获得当前选中的保健医生主键
                        var docCd = $('[name="demand_doctor_checkbox"]:checked').parent("div").parent("td").next("td").children("div").html();
                        //获得输入的日期
                        var date = $('#RoundPlanDate').val();
                        var jsonStr = {
                            demandCd:demandCd,
                            psnCd:psnCd,
                            doctorCd:docCd,
                            date:date
                        }
                        //发送请求到后台(为已生效的巡诊需求安排巡诊医生)
                        $.ajax({
                            url: appconfig.Patrol.AddDemandDoc
                            , contentType: "application/json"
                            , type: 'post'
                            , data: JSON.stringify(jsonStr)
                            , dataType: 'json'
                            , success: function () {
                                loadDoc.reload();
                            }

                        });

                    })
                });
            }
        });

        //新增巡诊需求按钮
        $('[lay-filter="doctorbaseAdd"]',hdk.config.activeTab).click(function () {

            //打开弹窗
            layer.open({
                title:'新增巡诊需求',
                type: 1,
                closeBtn:1,
                skin: 'layui-layer-rim', //加上边框
                area: ['900px', '700px'], //宽高
                content: $("#demand_addVisitVisit",hdk.config.activeTab).html(),
                success:function(){
                    //加载数据库中所有已生成个案时间的健康个案信息
                    $.ajax({
                        url: appconfig.Patrol.Health
                        , contentType: "application/json"
                        , type: 'post'
                        , dataType: 'json'
                        , success: function(result) {
                            //show到当前table页
                            table.render({
                                elem: '#patrolrecords-add'
                                ,page: true
                                ,limit:10
                                ,loading: true
                                ,data:result.data
                                ,cols: [
                                    [   {fixed: '',title:'选择', width:150, align:'center', toolbar: '#demand_radio_tool'}
                                        ,{field:'cd', title: '个案主键',sort:true, minWidth:80,align: 'center',hide:true}
                                        ,{field:'userName', title: '姓名',sort:true, minWidth:80,align: 'center'}
                                        ,{field:'genderCd', title: '性别',sort:true, minWidth:60,align: 'center',templet:function (d) {
                                            if(d.genderCd == 'Sex001'){
                                                return '男'
                                            }else {
                                                return '女'
                                            }
                                        }}
                                        ,{field:'examOrganName',title:'单位',minWidth:150,align:'center'}
                                        ,{field:'medTreatName',title:'待遇',sort:true,minWidth:80,align:'center'}
                                        ,{field:'levelName',title:'级别',sort:true,minWidth:120,align:'left'}
                                        ,{field:'typeName',title:'类型',sort:true,minWidth:120,align:'left'}
                                    ]]
                            });
                        }
                    })
                }
            });
            //加载时间控件
            laydate.render({
                elem: '#addVisitVisit_StartDate' //指定元素
                ,closeStop: '#addVisitVisit_StartDate' //这里代表的意思是：点击 test1 所在元素阻止关闭事件冒泡。如果不设定，则无法弹出控件
                ,min:minDate()
            });
            laydate.render({
                elem: '#addVisitVisit_EndDate' //指定元素
                ,closeStop: '#addVisitVisit_EndDate' //这里代表的意思是：点击 test1 所在元素阻止关闭事件冒泡。如果不设定，则无法弹出控件
                ,min:minDate()
            });


            //点击(确定)
            $('.layui-layer-addVisitVisit').click(function () {
                //获得个案信息主键
                var psnCd = $('[name="demand_doctor_checkbox"]:checked').parent("div").parent("td").next("td").children("div").html();
                //获得姓名
                var psnNam = $('[name="demand_doctor_checkbox"]:checked').parent("div").parent("td").next("td").next("td").children("div").html();
                //获得开始时间
                var startDate = $("#addVisitVisit_StartDate").val();
                var endDate = $("#addVisitVisit_EndDate").val();
                var descr = $("#Description_addVisitVisit").val();
                //获取输入的值
                var jsonStr = {
                    startDate:startDate,
                    endDate:endDate,
                    psnCd:psnCd,
                    description:descr,
                    psnNam:psnNam
                }
                //发送ajax请求到后台新增巡诊需求
                $.ajax({
                    url: appconfig.Patrol.AddPatrolDemand
                    , contentType: "application/json"
                    , type: 'post'
                    , dataType: 'json'
                    , data:JSON.stringify(jsonStr)
                    , success: function(result) {
                        //调用表格重载方法
                        hyd_table.reload();
                    }
                });


            })
        });

        //根据条件查询页面
        var $ = layui.$, active = {
            reload: function(){
                var demoReload = $('#demoReload');
                //执行重载
                hyd_table.reload();
            }
        };

        //点击查询按钮
        $('#hyd_pat_doctor').on('click', function(){
            var type = $(this).data('type');
            active[type] ? active[type].call(this) : '';
        });




    });
    exports('patrol/pat_demand_manag', {})
});
