layui.define(function(exports) {
    //健康个案信息js
    layui.use(['laydate', 'table', 'element', 'hdk', 'form', 'tool', 'appconfig'], function () {
        var $ = layui.$
            , laydate = layui.laydate
            , router = layui.router()
            , table = layui.table
            , setter = layui.setter
            , form = layui.form
            , element = layui.element
            , hdk = layui.hdk
            , tool = layui.tool
            , admin = layui.admin
            , params = {}
            , headers = {}
            , userInfo = {}
            , appconfig = layui.appconfig
            , thisTab = 0;

        //设置日期控件最小选择日期
        function minDate(){
            var now = new Date();
            return now.getFullYear()+"-" + (now.getMonth()+1) + "-" + now.getDate();
        }

        var hyd_table = table.render({
            elem: '#pathealthtb'
            , url:appconfig.Patrol.Health
            , toolbar: false
            , title: '查询结果'
            , page: true
            , limit: 10
            , loading: true
            , cols: [
                [   {field: 'cd', title: '主键', sort: true, minWidth: 80, align: 'center',hide:true},
                    {field: 'userName', title: '姓名', sort: true, minWidth: 80, align: 'center'}
                    , {
                    field: 'genderCd', title: '性别', sort: true, minWidth: 40, align: 'center', templet: function (d) {
                        if (d.genderCd == 'Sex001') {
                            return '男'
                        } else {
                            return '女'
                        }
                    }
                }
                    , {field: 'joinDate', title: '个案日期', sort: true, minWidth: 60, align: 'center'}
                    , {field: 'examOrganName', title: '参检单位', align: 'center', minWidth: 120}
                    , {field: 'levelName', title: '级别', minWidth: 50, align: 'center'}
                    , {field: 'typeName', title: '类型', sort: true, minWidth: 50, align: 'center'}
                    , {field: 'medTreatName', title: '待遇', sort: true, minWidth: 50, align: 'left'}
                    , {field: 'duty', title: '职务', sort: true, minWidth: 80, align: 'center'}
                    , {field: 'birthDay', title: '出生年月', minWidth: 80, align: 'center'}
                    , {field: 'identID', title: '身份证号', minWidth: 80, align: 'center'}
                    , {field: 'doctorNams', title: '保健医生', minWidth: 80, align: 'center'}
                    , {fixed: '', title: '操作', align: 'center', toolbar: '#info_tool'}
                ]
            ]
        });

        //动态加载单位信息
        var loadSete = function () {
            //移除下拉选项
            $("#hyd_healthinfo_organ option:gt(0)").remove();
            $("#examOrganID_add option:gt(0)").remove();
            //从缓存中获取动态按钮的值(由于按钮组不再每次查询后刷新，所以此处按钮的值直接get)
            var organList = layui.data('health').organ;
            $.each(organList, function (index, value) {
                var organ = organList[index];
                $("#hyd_healthinfo_organ").append('<option value=' + organ.cd + '>' + organ.nam + '</option>');
                $("#examOrganID_add").append('<option value='+organ.cd+'>'+organ.nam+'</option>');
            })
        }
        loadSete();


        form.render();

        $("button[lay-filter='hyd-query']", hdk.config.activeTab).on('click', function () {
            var reqdata = {
                worktype: $('div[hyd-name="worktype"]>div.hyd-selected>span', hdk.config.activeTab).attr("hyd-value") || '',
                medtreat: $('div[hyd-name="medtreat"]>div.hyd-selected>span', hdk.config.activeTab).attr("hyd-value") || '',
                authstatus: $('div[hyd-name="authstatus"]>div.hyd-selected>span', hdk.config.activeTab).attr("hyd-value") || '',
                personname: $('input[name="personname"]', hdk.config.activeTab).val(),
                personIdenNo: $('input[name="personIdenNo"]', hdk.config.activeTab).val()
            }

        });
        $('.health-query .multi-checkbox div', hdk.config.activeTab).on('click', function () {
            $(this).siblings().removeClass("hyd-selected");
            $(this).toggleClass("hyd-selected");
        });



        $('#hyd_pat_doctor').on('click', function () {

            var name = $('[name="name"]').val();
            var duty = $('[name="Duty"]').val();
            var profession = $('[name="profession"]').val();
            var phone = $('[name="phone"]').val();

            table.reload('pat_health_info_pathealthtb', {
                page: {
                    curr: 1 //重新从第 1 页开始
                }
            });
        });

        //点击新增健康个案信息
        $('[lay-filter="doctorbaseAdd"]',hdk.config.activeTab).on('click', function () {

            //弹出新增框
            layer.open({
                title: '新增健康个案',
                type: 1,
                closeBtn:1,
                skin: 'layui-layer-rim', //加上边框
                area: ['750px', '500px'], //宽高
                content: $("#info_addLayer",hdk.config.activeTab).html(),
            });
            loadSete();
            // //加载表单
            form.render();

            //加载日期选择器
            laydate.render({
                elem: '#addtDocDate' //指定元素
                ,closeStop: '#addtDocDate'
                ,min:minDate()
            });

            //点击查询(查询未生效的健康个案信息)
            form.on('submit(queryHealth)', function (data) {
                //查询未建立档案的个案信息
                $.ajax({
                    url: appconfig.Patrol.QueryHealth
                    , async: true
                    , contentType: "application/json"
                    , type: 'post'
                    , dataType: 'json'
                    , data: JSON.stringify(data.field)
                    , success: function (result) {
                        table.render({
                            elem: $('#healthdocu',hdk.config.activeTab)
                            , id: 'queryhealthresult'
                            , title: '查询结果'
                            , data: result.data
                            , page: true
                            , limit: 10
                            , loading: true
                            , cols: [
                                [
                                    {field: 'cd', title: '个案表主键', sort: true, minWidth: 80, align: 'center', hide:true}
                                    ,{field: 'userName', title: '姓名', sort: true, minWidth: 80, align: 'center'},
                                    {
                                    field: 'genderCd',
                                    title: '性别',
                                    sort: true,
                                    minWidth: 60,
                                    align: 'center',
                                    templet: function (d) {
                                        if (d.genderCd == 'Sex001') {
                                            return '男'
                                        } else {
                                            return '女'
                                        }
                                    }
                                    }
                                    , {field: 'identID', title: '身份证', sort: true, minWidth: 120, align: 'center'}
                                    , {field: 'examOrganName', title: '参检单位', align: 'center', minWidth: 120}
                                    , {field: 'typeName', title: '类型', sort: true, minWidth: 80, align: 'center'}
                                    , {field: 'medTreatName', title: '待遇', sort: true, minWidth: 80, align: 'left'}
                                    , {fixed: '', title: '操作', width: 80, align: 'center', toolbar: '#add_info_tool'}
                                ]
                            ]
                        });
                        //点击table中的新增个案
                        $("#add_info_tool_submit",hdk.config.activeTab).click(function () {
                            var cd = $(this).parent().parent().parent().children("td:first").children("div").html();
                            var jsonStr = {
                                cd:cd
                            }
                            //发送AJax请求
                            $.ajax({
                                url: appconfig.Patrol.AddHealthInfo
                                , type: 'post'
                                , dataType: 'json'
                                , data:JSON.stringify(jsonStr)
                                , contentType: "application/json"
                                , success: function () {
                                    //关闭当前弹窗
                                    layer.close(layer.index);
                                    hyd_table.reload();
                                }
                            });
                        })
                    }
                });
                //点击关闭
                $('[name="hyd_auth_colse"]',hdk.config.activeTab).click(function (index) {
                    layer.close(layer.index);
                })

            });

        });


        //监听数据表格栏动态按钮事件
        table.on('tool(pathealthtb)', function(obj) { //注：tool 是工具条事件名，test 是 table 原始容器的属性 lay-filter="对应的值"
                var data = obj.data; //获得当前行数据
                var layEvent = obj.event; //获得 lay-event 对应的值（也可以是表头的 event 参数对应的值）
                var tr = obj.tr; //获得当前行 tr 的 DOM 对象（如果有的话）

                //判断当前事件名
                if ($(this).html() == '新增医生'||$(this).html() == '编辑医生'){
                   //打开新增医生弹窗
                    layer.open({
                        title:'编辑保健医生',
                        type: 1,
                        closeBtn:1,
                        skin: 'layui-layer-rim', //加上边框
                        area: ['700px', '550px'], //宽高
                        content: $("#info_editDoctoLayer").html(),
                        success:function () {
                            //show到当前页面
                            var biudTable = table.render({
                                elem: '#info_layerAddDoctor_table'
                                ,url:appconfig.Patrol.QueryDoctorByPsnCd
                                ,method:'post'
                                ,contentType: 'application/json'
                                ,where:{psnCd:data.cd}
                                ,page: true
                                ,limit:10
                                ,loading: true
                                ,cols: [
                                    [
                                        {field:'cd', title: '主键',sort:true, minWidth:50,align: 'center',hide:true}
                                        ,{field:'doctorCd', title: '人员主键',sort:true, minWidth:50,align: 'center',hide:true}
                                        ,{field:'doctorNam', title: '姓名',sort:true, minWidth:50,align: 'center'}
                                        ,{field:'hospitalCd', title: '医院',sort:true, minWidth:50,align: 'center',templet:function (d) {
                                            if(d.hospitalCd=='sc1huaxi'){
                                                return '四川大学华西医院'
                                            }
                                            if(d.hospitalCd == 'sc2peopsn'){
                                                return '四川省人民医院'
                                            }
                                        }}
                                        ,{field:'title', title: '职务',sort:true, minWidth:50,align: 'center'}
                                        ,{field:'duty', title: '科室',sort:true, minWidth:50,align: 'center'}
                                        ,{fieLd:'', title:'操作',sort:true, minWidth:50,align: 'center',toolbar:'#hospTalBar'}
                                    ]
                                ]
                            });

                            //判断编辑医生中的table
                            table.on('tool(info_layerAddDoctor_table)', function(obj) { //注：tool 是工具条事件名，test 是 table 原始容器的属性 lay-filter="对应的值"
                                var data = obj.data; //获得当前行数据
                                var layEvent = obj.event; //获得 lay-event 对应的值（也可以是表头的 event 参数对应的值）
                                var tr = obj.tr; //获得当前行 tr 的 DOM 对象（如果有的话）
                                //判断当前事件名
                                if ($(this).html() == '移除医生'){
                                    layer.confirm('是否移除该医生?', function(index){
                                        layer.close(index);
                                        //获得保健对象cd 和医生cd
                                        var jsonStr = {
                                            cd:data.cd
                                        }
                                        //到后台移除医生
                                        $.ajax({
                                            url: appconfig.Patrol.DelDoctorByHealth
                                            , contentType: "application/json"
                                            , type: 'post'
                                            , data: JSON.stringify(jsonStr)
                                            , dataType: 'json'
                                            , success: function () {
                                                //调用reload事件
                                                biudTable.reload();
                                                //调用父节点的reload
                                                hyd_table.reload();
                                            }
                                        });
                                    });
                                }
                            });

                            //点击安排保健医生按钮
                            $("#info_editDoctoLayer_addDoc").click(function () {
                                //打开弹窗
                                layer.open({
                                    title:'编辑保健医生',
                                    type: 1,
                                    closeBtn:1,
                                    skin: 'layui-layer-rim', //加上边框
                                    area: ['900px', '650px'], //宽高
                                    content: $("#info_addtDoctoLayer").html(),
                                    success:function () {
                                        //获得当前用户的主键
                                        var jsonStr = {
                                            psnCd:data.cd
                                        }
                                        //发送ajax请求渲染所有保健医生表单
                                        $.ajax({
                                            //查询所有已生效的保健医生名单
                                            url: appconfig.Patrol.RuntimeDoctor
                                            , contentType: "application/json"
                                            , type: 'post'
                                            , dataType: 'json'
                                            , data:JSON.stringify(jsonStr)
                                            , success: function (result) {
                                                //show到当前页面
                                                table.render({
                                                    elem: '#info_adddDoctoLayer_table'
                                                    ,id:"info_adddDoctoLayer_table_id"
                                                    ,title:'保健医生名单'
                                                    ,data:result.data
                                                    ,page: true
                                                    ,limit:10
                                                    ,loading: true
                                                    ,cols: [
                                                        [
                                                            {field:'', title: '操作',sort:true, minWidth:80,align: 'center',toolbar: '#info_radio_tool'}
                                                            ,{field:'cd', title: '主键',sort:true, minWidth:80,align: 'center',hide:true}
                                                            ,{field:'nam', title: '姓名',sort:true, minWidth:80,align: 'center'}
                                                            ,{field:'genderCd', title: '性别',sort:true, minWidth:60,align: 'center',templet:function (d) {
                                                                if(d.genderCd == 'Sex001'){
                                                                    return '男'
                                                                }else {
                                                                    return '女'
                                                                }
                                                            }}
                                                            ,{field:'hospitalName', title: '所属医院', align: 'center',minWidth:120}
                                                            ,{field:'title',title:'职称',minWidth:150,align:'center'}
                                                            ,{field:'duty',title:'职务',sort:true,minWidth:80,align:'center'}
                                                            ,{field:'profession',title:'专业',sort:true,minWidth:120,align:'left'}
                                                        ]]
                                                });
                                            }
                                        });

                                        //点击添加医生
                                        $("#info_addtDoctoLayer_addDoc").click(function () {
                                            //获取选中的医生cd
                                            var doctorCd = $('[type="radio"]:checked').parent().parent().parent().find("td").eq(1).find("div").html();
                                            //获取jSON
                                            var jsonStr = {
                                                psnCd:data.cd,
                                                doctorCd:doctorCd
                                            }
                                            //发送ajax请求为保健对象绑定医生
                                            $.ajax({
                                                //查询所有已生效的保健医生名单
                                                url: appconfig.Patrol.AddDoctorInfo
                                                , contentType: "application/json"
                                                , type: 'post'
                                                , dataType: 'json'
                                                , data:JSON.stringify(jsonStr)
                                                , success: function () {
                                                    //调用reload事件
                                                    biudTable.reload();
                                                    //调用父节点的reload
                                                    hyd_table.reload();
                                                }
                                            });
                                        })
                                    }
                                })
                            })


                        }
                    });
                    //加载事件
                }
            }
            );

        exports('patrol/pat_health_info', {})
    });
});
