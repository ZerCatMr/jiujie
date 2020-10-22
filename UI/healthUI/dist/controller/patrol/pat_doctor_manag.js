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
        ,appconfig = layui.appconfig
        ,thisTab = 0
        ,layer = layui.layer;

        //设置日期控件最小选择日期
        function minDate(){
            var now = new Date();
            return now.getFullYear()+"-" + (now.getMonth()+1) + "-" + now.getDate();
        }

        var hyd_table = table.render({
            elem: '#documentauthtb'
            ,url: appconfig.Patrol.Doctor
            ,toolbar: false
            ,title:'保健医生名单'
            ,data:[]
            ,page: true
            ,limit:10
            ,loading: true
            ,cols: [
                [{field:'cd', title: '主键',sort:true, minWidth:80,align: 'center',hide:true}
                ,{field:'nam', title: '姓名',sort:true, minWidth:80,align: 'center'}
                ,{field:'genderCd', title: '性别',sort:true, minWidth:60,align: 'center',templet:function (d) {
                        if(d.genderCd == 'Sex001'){
                            return '男'
                        }else {
                            return '女'
                        }
                    }}
                ,{field:'hospitalName', title: '所属医院',sort:true, align: 'center',minWidth:120}
                ,{field:'title',title:'职称',minWidth:150,align:'center'}
                ,{field:'duty',title:'职务',minWidth:80,align:'center'}
                ,{field:'profession',title:'专业',minWidth:120,align:'left'}
                ,{field:'birthDay',title:'出生年月',sort:true,minWidth:80,align:'center'}
                ,{field:'mobilePhone',title:'手机号码',minWidth:80,align:'center'}
                ,{field:'state',title:'状态',minWidth:80,align:'center',templet:function (d) {
                        if (d.state =='-1'){
                            return '停用'
                        }if(d.state == '1') {
                            return '启用'
                        }
                    }}
                ,{fixed: '',title:'操作', width:150, align:'center', toolbar: '#manag_tool'}
                ]]

        });
        //hyd_table.reload();
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


        //根据条件查询页面
        var $ = layui.$, active = {
            reload: function(){
                //获取条件查询框的值
                // var hosp = $('[name="hospital"] option').html();
                // var title = $('[name="title"] option').html();
                var name = $('[name="name"]').val();
                var duty = $('[name="Duty"]').val();
                var profession = $('[name="profession"]').val();
                var phone = $('[name="phone"]').val();

                //执行重载
                table.reload('documentauthtb', {
                    page: {
                        curr: 1 //重新从第 1 页开始
                    }
                    ,where: {
                        key: {
                            nam:name,
                            // hospitalName: hosp,
                            // title:title,
                            duty:duty,
                            profession:profession,
                            mobilePhone:phone
                        }
                    }
                }, 'data');
            }
        };

        //查询操作
        $('#hyd_pat_doctor').on('click', function(){
            // var type = $(this).data('type');
            // active[type] ? active[type].call(this) : '';
            active.reload();
        });

        //监听工具条(表格工具条操作)
        table.on('tool(documentauthtb)', function(obj){ //注：tool 是工具条事件名，test 是 table 原始容器的属性 lay-filter="对应的值"
            var data = obj.data; //获得当前行数据
            var layEvent = obj.event; //获得 lay-event 对应的值（也可以是表头的 event 参数对应的值）
            var tr = obj.tr; //获得当前行 tr 的 DOM 对象（如果有的话）

            //判断当前事件名
            if($(this).html()=='编辑'){
                //弹出编辑框
                layer.open({
                    title:'编辑保健医生',
                    type: 1,
                    closeBtn:1,
                    skin: 'layui-layer-rim', //加上边框
                    area: ['700px', '550px'], //宽高
                    content: $("#alertDoctor").html()
                });

                //加载表单
                form.render();

                //加载日期选择器
                laydate.render({
                    elem: '#alertDocDate' //指定元素
                    ,closeStop: '#alertDocDate'
                    ,min:minDate()
                });
                //给输入框赋值
                $('#alertDocid').attr('value',data.cd);
                $('#alerDocNam').attr('value',data.nam);
                $('#alertDocDuty').attr('value',data.duty);
                $('#alertDocFession').attr('value',data.profession);
                $('#alertDocDate').attr('value',data.birthDay);
                $('#alertDocPhone').attr('value',data.mobilePhone);


                //点击提交
                form.on('submit(alertDoctor)', function(data){
                    // alert(data.elem); //被执行事件的元素DOM对象，一般为button对象
                    // alert(data.form);//被执行提交的form对象，一般在存在form标签时才会返回
                    //alert(JSON.stringify(data.field));//当前容器的全部表单字段，名值对形式：{name: value}
                    //修改当前保健医生
                    alertDoctor(data.field);
                });
                //点击关闭
                $('[name="hyd_auth_colse"]').click(function () {
                    layer.close(layer.index);
                })


            }
            if($(this).html()=='启用'){
                layer.confirm('是否启用保健医生'+data.nam+'?', function(index){
                    layer.close(layer.index);
                    //向服务端发送数据
                    var jsonStr = {
                        cd:data.cd,
                        state:'1'
                    }
                    //调用ajax
                    alertDoctorState(jsonStr);
                });
            }
            if($(this).html()=='停用'){
                layer.confirm('是否停用保健医生'+data.nam+'?', function(){
                    layer.close(layer.index);
                    //向服务端发送数据
                    var jsonStr = {
                        cd:data.cd,
                        state:'-1'
                    };
                    //调用ajax
                    alertDoctorState(jsonStr);
                });
            }
        });

        //打开新增保健医生弹窗
        $('[lay-filter="doctorbaseAdd"]').on('click',function () {

            //弹出新增框
            layer.open({
                title:'新增保健医生',
                type: 1,
                closeBtn:1,
                skin: 'layui-layer-rim', //加上边框
                area: ['650px', '500px'], //宽高
                content: $("#addDoctor").html()
            });
            //加载表单
            form.render();

            //加载日期选择器
            laydate.render({
                elem: '#addtDocDate' //指定元素
                ,closeStop: '#addtDocDate'
            });

            //点击提交
            form.on('submit(commitDoctor)', function(data){
                //新增保健医生
                addDoctor(data.field);
            });
            //点击关闭
            $('[name="hyd_auth_colse_btn"]').click(function () {
                layer.close(layer.index);
            })
        });
        
        //新增保健医生
        function addDoctor(data) {
            $.ajax({
                url: appconfig.Patrol.AddDoctor
                , contentType: "application/json"
                , type: 'post'
                , data: JSON.stringify(data)
                , dataType: 'json'
                , success: function () {
                    layer.msg('新增成功', {
                        offset: '15px'
                        ,icon: 1
                        ,time: 1000
                    });
                    //调用表格重载方法
                    hyd_table.reload();
                }
            })
        }

        //修改保健医生
        function alertDoctor(jsonStr) {
            $.ajax({
                url: appconfig.Patrol.AlertDoctor
                , contentType: "application/json"
                , type: 'post'
                , data: JSON.stringify(jsonStr)
                , dataType: 'json'
                , success: function () {
                    layer.msg('修改成功', {
                        offset: '15px'
                        ,icon: 1
                        ,time: 1000
                    });
                    //调用表格重载方法
                    hyd_table.reload();
                }
            })
        }

        //修改保健医生状态
        function alertDoctorState(jsonStr) {
            $.ajax({
                url: appconfig.Patrol.AlertState
                , contentType: "application/json"
                , type: 'post'
                , data: JSON.stringify(jsonStr)
                , dataType: 'json'
                , success: function () {
                    layer.msg('修改成功', {
                        offset: '15px'
                        ,icon: 1
                        ,time: 1000
                    });
                    //调用表格重载方法
                    hyd_table.reload();
                }
            });
        }

    });
    exports('patrol/pat_doctor_manag', {})
});
