layui.define(function(exports){
    //管理健康档案JS

    layui.use(['laydate','table','element','hdk','form','tool','appconfig','layer'], function(){
        var $ = layui.$
        ,laydate = layui.laydate
        ,router = layui.router()
        ,table = layui.table
        ,setter = layui.setter
        ,form = layui.form
        ,layer = layui.layer
        ,element = layui.element
        ,hdk = layui.hdk
        ,tool=layui.tool
        ,admin = layui.admin
        ,params = {}
        ,headers = {}
        ,userInfo = {}
        ,thisTab = 0
        ,appconfig = layui.appconfig
        ;

        //设置日期控件最小选择日期
        function minDate(){
            var now = new Date();
            return now.getFullYear()+"-" + (now.getMonth()+1) + "-" + now.getDate();
        }

        //获取页面宽度
        var documentWidth = $(document).width;

        var hyd_table = table.render({
            elem: $('#documentauthtb',hdk.config.activeTab)
            ,title:'保健对象清单'
            ,data:[]
            ,page: true
            ,limit:10
            ,loading: false
            ,cols: [
                [
                    {field: 'cd', title: '主键',sort:false, hide:true,width:92, align: 'center'}
                    ,{field: 'genderCd', title: '性别主键',sort:false, hide:true,width:92, align: 'center'}
                    ,{field: 'nam', title: '姓名',sort:false, hide:false,width:92, align: 'center'}
                    ,{field: 'genderCdNam', title: '性别',sort:false, hide:false,width:92, align: 'center'}
                    ,{field: 'birth', title: '出生日期',sort:false, hide:false,width:92, align: 'center'}
                    ,{field: 'idenID', title: '身份证号',sort:false, hide:false,width:300, align: 'center'}
                    ,{field: 'typeCd', title: '人员类型主键',sort:false, hide:true, width:92, align: 'center'}
                    ,{field: 'typeCdNam', title: '人员类型',sort:false, hide:false,width:92, align: 'center'}
                    ,{field: 'treatCd', title: '医疗类型编码',hide:true,sort:true, width:92, align: 'center'}
                    ,{field: 'treatCdNam', title: '医疗类型',hide:false,width:92,sort:false,align: 'center'}
                    ,{field: 'isYs', title: '是否授权',hide:false,width:92,align: 'center'}
                    ,{field: 'duty',title:'职务',hide:false,width:92,align:'center'}
                    ,{field: 'examOrgCd',title:'机构编码',hide:true,width:92,sort:true,align:'center'}
                    ,{field: 'examOrgNam',title:'机构名称',hide:false,width:100,sort:false,align:'left'}
                    ,{field: 'locOrgCd',title:'locOrgCd',hide:true,sort:true,width:92, align:'center'}
                    ,{field: 'phone',title:'手机',hide:false, width:150, align:'center'}
                    ,{field: 'isYXRC',title:'是否',hide:true, width:92, align:'center'}
                    ,{field: 'creaCd',title:'创建编码',hide:true,sort:true,width:92, align:'center'}
                    ,{field: 'creTime',title:'创建时间',hide:true,width:92, align:'center'}
                    ,{field: 'lastModiCd',title:'最后修改人',hide:true, width:92, align:'center'}
                    ,{field: 'lastModTime',title:'最后修改时间',hide:true,width:92, align:'center'}
                    ,{field: 'state',title:'状态',hide:true,align:'center'}
                    ,{title: '操作',align:'center',hide:false,templet: hdk.config.activeTab+' #operation'}
                ]
            ]
        });


        /**
         * 传入开始日期和结束日期,判断是否在当前有效期内
         * @param starttime
         * @param endtime
         * @returns {boolean}
         * @constructor
         */
        function CompareDate(starttime,endtime) {

            var thisTime = new Date(new Date().toLocaleDateString().replace("-", "/").replace("-", "/"))

            var start = new Date(starttime.replace("-", "/").replace("-", "/"));
            var end = new Date(endtime.replace("-", "/").replace("-", "/"));
            if(start<=thisTime&&thisTime<=end){
                return true;
            }else {
                return false;
            }
        }


        //根据条件查询健康档案信息
        $('[name="doc_queryView"]' ,hdk.config.activeTab).click(function () {
            //打开加载动画
            //加载弹窗
            loading = layer.load(1, {
                content: "<div style='margin-left:-30px;padding-top:60px;width:120px;color:#2b425b;'>正在查询请稍后...</div>",
                shade: [0.4, '#000']
            });

            //获取输入的值
            var typeCdNam =  $('[hyd-name="worktype"] .hyd-selected span' ,hdk.config.activeTab).html();
            var treatCdNam = $('[hyd-name="medtreat"] .hyd-selected span' ,hdk.config.activeTab).html();
            var isYS = $('[hyd-name="authstatus"] .hyd-selected span' ,hdk.config.activeTab).html();
            var nam = $('[name="personname"]' ,hdk.config.activeTab).val();
            var idenID = $('[name="personIdenNo"]' ,hdk.config.activeTab).val();
            var jsonStr = {
                userCd:layui.data('health').userinfo.userCd,
                treatCdNam:treatCdNam,
                typeCdNam:typeCdNam,
                isYS:isYS,
                nam:nam,
                idenID:idenID
            };
            //发送ajax请求到后台
            $.ajax({
                url: appconfig.Document.queryHealthDoc
                ,type: 'post'
                ,dataType: 'json'
                ,contentType: "application/json"
                ,data:JSON.stringify(jsonStr)
                ,success: function(result){
                    //关闭加载动画
                    layer.close(loading);

                    tableshow(result.data);
                    $('.health-filter.health-filter-input input[name="health-search"]', hdk.config.activeTab).keyup(function () {
                        filterdata =  tool.filterArray($(this).val(),result.data);
                        tableshow(filterdata);
                    });
                    $("table").width("100%");
                }
            });
        });

        //授权档案管理表格
        function tableshow(data){
            hyd_table.reload({
                data:data
            });
        }


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
        table.on('tool(documentauthtb)', function(obj){

            var data = obj.data;
            var layEvent = obj.event;
            var tr = obj.tr;

            if(layEvent == "documentauth"){ //授权
                //弹出档案授权框
              var myAuth = layer.open({
                    type: 1,
                    title: '修改权限' //不显示标题栏,
                    ,
                    area: ['650px', '700px'] //长宽
                    ,
                    shade: 0.8
                    ,
                    id: 'layui_auth_doc' //设定一个id，防止重复弹出
                    // ,
                    // btn: ['<span id="hyd_auth_sumbit">提交修改</span>', '<span id="hyd_auth_cancel">撤销修改</span>']
                    ,
                    btnAlign: 'c'
                    ,
                    moveType: 0 //拖拽模式，0或者1
                    ,
                    content: $("#manage_auth_doc").html()
                    ,
                    closeBtn:1
                    ,
                    success: function () {
                        //授权状态表格
                        var table_state = table.render({
                            elem: $('#manage_auth_doc_state_t',hdk.config.activeTab)
                            ,loading: true
                            ,cols: [
                                [
                                    {field: 'cd', title: '主键',sort:true, hide:true, width:150,align: 'center'}
                                    ,{field: 'creTime', title: '创建时间',sort:true, hide:true, width:150,align: 'center'}
                                    ,{field: 'psnCd', title: '档案编号',sort:true, hide:true, width:150,align: 'center'}
                                    ,{field: 'userName', title: '授权人',width:120, align:'center'}
                                    ,{field: 'userCd', title: '授权人主键',sort:true, hide:true, width:150,align: 'center'}
                                    ,{field: 'startDate', title: '生效时间',sort:true, hide:false,width:150, align: 'center'}
                                    ,{field: 'expireDate', title: '结束时间',sort:true, hide:false,width:150,align: 'center'}
                                    ,{field: '操作', title: '操作', align:'center', toolbar:'#barDemo'}
                                ]
                            ]
                        });
                        //授权历史表格
                        var table_record = table.render({
                            elem:$('#manage_auth_doc_record',hdk.config.activeTab)
                            ,loading: true
                            ,page:true
                            ,limit:5
                            ,cols: [
                                [
                                    {field: 'cd', title: '主键',sort:false, hide:true, width:120,align: 'center'}
                                    ,{field: 'creTime', title: '时间',sort:true, hide:false,width:150, align: 'center'}
                                    ,{field: 'psnCd', title: '档案编号',sort:false, hide:true, width:120, align: 'center'}
                                    ,{field: 'operateNam', title: '操作人',sort:false, hide:false,width:100, align: 'center'}
                                    ,{field: 'userNam', title: '授权人',width:100, align:'center'}
                                    ,{field: 'userCd', title: '授权人主键',sort:false, hide:true, width:120,align: 'center'}
                                    ,{field: 'authDesc', title: '描述',sort:false, hide:false, align: 'center'}
                                ]
                            ]
                        });
                        function tableshow(data) {
                            table_record.reload({
                                data: data.recoreds
                            });
                            table_state.reload({
                                data: data.authPsns
                            });
                        }

                        //发送ajax请求,渲染授权历史表格和授权状态表格
                        $.ajax({
                            url:appconfig.Document.loadManAuth
                            ,method:'post'
                            ,data:{
                                "psnCd":data.cd
                            }
                            ,async:false
                            ,dataType: 'json'
                            ,success:function (res) {
                                //渲染按钮组
                                var da = res.data.authPsns;
                                for(var i=0; i<da.length; i++){
                                    //获取当前索引时间
                                    var startDate = da[i].startDate;
                                    var endDate = da[i].expireDate;
                                    //判断权限按钮是否应该显示
                                    if(endDate==null||CompareDate(startDate,endDate)||endDate=='永久'){
                                        $("#hyd_doctor_stop").attr("class","layui-btn layui-btn-sm layui-btn-danger");
                                    }else if(!CompareDate(startDate,endDate)){
                                        $("#hyd_doctor_stop").attr("class","layui-btn layui-btn-sm layui-btn-disabled");
                                    }
                                }
                                table_state.reload();
                                //渲染表格
                                var resData = res.data;
                                tableshow(resData);
                                $('.health-filter.health-filter-input input[name="health-search"]',hdk.config.activeTab).keyup(function () {
                                    filterdata =  tool.filterArray($(this).val(),resData);
                                    tableshow(filterdata);
                                });
                            }
                        });
                        //加载档案名
                        $('[name="psnCd"]').attr('value', data.nam);
                        //加载所有用户名
                        var names = layui.data('health').archivesUserNames;
                        $.each(names,function (index, value) {
                            //获得用户名和Cd
                            var name = layui.data('health').archivesUserNames[index].name;
                            var cd = layui.data('health').archivesUserNames[index].userCd;
                            $('[name="authNams"]').append(
                                '<div><span  hyd-value='+cd+'>'+name+'</span></div>'
                            );
                        });
                        form.render();
                        //弹出层点击事件
                        $('.health-query .multi-checkbox div').click(function () {
                            $(this).siblings().removeClass("hyd-selected");
                            $(this).toggleClass("hyd-selected");

                            //判断永久有效和显示到期显示问题
                            var authdate = $('[name="authDate"] .hyd-selected span').html();
                            if(authdate=='永久有效'){
                                //隐藏结束时间选择框
                                $('[name="manage_endTime"]').attr("style","visibility:hidden;");
                            }
                            if(authdate=='限时到期'){
                                $('[name="manage_endTime"]').attr("style","visibility:visible;");
                            }
                        });
                        //加载时间控件
                        laydate.render({
                            elem: '#doc_startDate' //指定元素
                            ,closeStop: '#doc_startDate' //这里代表的意思是：点击 test1 所在元素阻止关闭事件冒泡。如果不设定，则无法弹出控件
                            ,min:minDate()
                        });
                        laydate.render({
                            elem: '#doc_expirtDate' //指定元素
                            ,closeStop: '#doc_expirtDate' //这里代表的意思是：点击 test1 所在元素阻止关闭事件冒泡。如果不设定，则无法弹出控件
                            ,min:minDate()
                        });

                        //移除授权状态
                        table.on('tool(manage_auth_doc_state)',function(tobj) {
                            var tData = tobj.data
                            var tlayEvent = tobj.event;
                            var ttr = tobj.tr;
                            var jsonStr = {
                                'cd':tData.cd,
                                'psnCd':tData.psnCd,
                                'userCd':tData.userCd,
                                'startDate':tData.startDate,
                                'expireDate':tData.expireDate,
                                'operateNam':layui.data('health').userinfo.username,
                            };


                            if(tlayEvent == "hyd_doctor_stop"){
                                layer.confirm('是否取消'+tData.userName+'的授权?', function(index){
                                    layer.close(layer.index);
                                    //取消授权
                                    $.ajax({
                                        url: appconfig.Document.delManageAuth
                                        , type: 'post'
                                        , dataType: 'json'
                                        , contentType: "application/json"
                                        , async: false
                                        , data: JSON.stringify(jsonStr)
                                        , success: function (result) {
                                            layer.msg(result.message, {
                                                offset: '15px'
                                                ,icon: 1
                                                ,time: 2000
                                            });
                                            if(result.code==0){
                                                table_record.reload();
                                                table_state.reload();
                                            }
                                            layer.close(myAuth);
                                        }
                                    });
                                });
                            }
                        });

                        //提交授权情况
                        $("#hyd_auth_sumbit").click(function () {


                            //获得修改/删除的值
                            var expireDate = null;
                            var authDate  = $('[name="authDate"] .hyd-selected span').html();
                            if(authDate == '限时到期'){
                                //点击永久时，时间选择框disable
                                $("#doc_startDate").removeAttr("disabled");
                                $("#doc_expirtDate").removeAttr("disabled");
                                expireDate = $('#doc_expirtDate').val();
                            }else {
                                //点击永久时，时间选择框disable
                                $("#doc_startDate").attr("disabled",'disabled');
                                $("#doc_expirtDate").attr("disabled",'disabled');
                                expireDate = '永久';
                            }


                            //获得输入的参数
                            var psnCd = data.cd;
                            var userCd = $('[name="authNams"] .hyd-selected span').attr('hyd-value');
                            var user =  $('[name="authNams"] .hyd-selected span').html()
                            var startDate = $('#doc_startDate').val();
                            var operateNam = layui.data('health').userinfo.username;

                            /**
                             * 授权人 授权时间 必须选中
                             * 授权开始时间必填 当授权时间为限时到期时 授权结束时间必填
                             * 授权开始时间不能晚于授权结束时间
                             */
                            if(user==undefined||authDate==undefined||startDate==''||(authDate=='限时到期'&&expireDate=='')||(authDate=='限时到期'&&startDate>expireDate)){

                                if(authDate=='限时到期'&&startDate>expireDate&&expireDate!=''&&startDate!=''){
                                    alert('授权生效时间不能晚于过期时间');
                                }else {
                                    alert('参数输入错误,请重试');
                                }
                            }
                            else {
                                //修改权限
                                 $.ajax({
                                    url: appconfig.Document.addManageAuth
                                    , type: 'post'
                                    , dataType: 'json'
                                    , async: false
                                    , contentType: "application/json"
                                    , data: JSON.stringify({
                                        psnCd:psnCd,
                                        userCd:userCd,
                                        startDate:startDate,
                                        operateNam:operateNam,
                                        expireDate:expireDate
                                    })
                                    , success: function (result) {
                                        layer.msg(result.message, {
                                            offset: '15px'
                                            ,icon: 1
                                            ,time: 2000
                                        });
                                        //重载权限历史修改记录
                                        if(result.code==0) {
                                            //对授权历史进行重载
                                            hyd_table.reload();
                                        }
                                    }
                                });
                            }
                        });


                    }
                });
            } else if(layEvent === 'viewdocument'){ //查看
                //跳转url和参数
                admin.urlenhash('document/persondocument$view:'+data.cd+'/title=档案-'+data.nam+'/nam='+data.nam+'/genderCdNam='+data.genderCdNam
                +'/birth='+data.birth+'/idenID='+data.idenID+'/typeCdNam='+data.typeCdNam+'/levelName='+data.levelName+'/treatCdNam='
                +data.treatCdNam+'/phone='+data.phone+'/examOrgNam='+data.examOrgNam+'/duty='+data.duty+'/cd='+data.cd);

            }
        });

    });
    exports('document/manage', {})
});
