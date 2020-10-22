
//健康档案授权页面
layui.define(function(exports){
    layui.use(['laydate','table','element','hdk','form','tool','appconfig','form','layer'], function(){
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

        //加载所有用户名按钮
        loadauthnames();

        //设置日期控件最小选择日期
        function minDate(){
            var now = new Date();
            return now.getFullYear()+"-" + (now.getMonth()+1) + "-" + now.getDate();
        }

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

        function CompareDateStart(starttime) {
            var thisTime = new Date(new Date().toLocaleDateString().replace("-", "/").replace("-", "/"))
            var start = new Date(starttime.replace("-", "/").replace("-", "/"));
            if(start<=thisTime){
                return true;
            }else {
                return false;
            }
        }


        //初始化历史授权记录表格
        var hyd_table = table.render({
            elem: $('#hyd_ahtu_record',hdk.config.activeTab)
            ,title:'历史授权记录'
            ,data:[]
            ,page: true
            ,limit:10
            ,loading: false
            ,cols: [
                [
                    {field: 'creTime', title: '时间',sort:false, width:'20%',  align: 'center',minWidth:100,align: 'center'}
                    ,{field: 'operateNam', title: '操作人',sort:false,width:'20%',   align: 'center',minWidth:100,align: 'center'}
                    ,{field:'authDesc',title:'操作记录',sort:false,  width:'60%',   align:'center',align: 'left'}
                ]
            ]
        });

        //加载授权用户中所有用户名按钮
        function loadauthnames(data){
            //加载弹窗
            var loading = layer.load(1, {
                content: "<div style='margin-left:-30px;padding-top:60px;width:120px;color:#2b425b;'>正在查询请稍后...</div>",
                shade: [0.4, '#000']
            });

            //获取用户名集合
            if(data==null){
                data = layui.data('health').archivesUserNames;
            };
            //需要先移除动态按钮组
            $.each(data,function(index,value){
                //获得用户名
                $('[hyd-name="quotaname"]').empty();
            });
            //再添加按钮
            $.each(data,function(index,value){
                //获得用户名
                var name = layui.data('health').archivesUserNames[index].name;
                var cd = layui.data('health').archivesUserNames[index].cd;
                $('[hyd-name="quotaname"]').append(
                    '<div class=""><span name="auth_name" hyd-value='+cd+'>'+name+'</span></div>'
                );
            });

            //单击用户名按钮加载用户信息事件
            $('[hyd-name="quotaname"] div').on('click',function () {

                //渲染用户名选中状态
                $(this).parent().children().removeClass("hyd-selected");
                $(this).toggleClass("hyd-selected");

                if($(this).attr("class")=="hyd-selected"){
                    //已被选中，修改权限按钮可用
                    $("#hyd_auth_modifyAuth").attr("class","layui-btn layui-btn-sm layui-btn-normal");
                }else{
                    //修改权限按钮不可用
                    $("#hyd_auth_modifyAuth").attr("class","layui-btn layui-btn-sm layui-btn-disabled");
                    //移除权限按钮不可用
                    $("#hyd_auth_remove").attr("class","layui-btn layui-btn-sm layui-btn-disabled");
                    // //移除文本中的HTml
                    // $("#hyd_auth_name div").empty();
                    // $("#hyd_auth_levName div").empty();
                    // $("#hyd_auth_isAuth div").empty();
                    // $("#hyd_auth_startDate div").empty();
                    // $("#hyd_auth_expireDate div").empty();
                }


                //获取已选中用户名
                var thisName = $(this).find('span').html();
                //去数据库查询
                $.ajax({
                    url: appconfig.Document.queryAuthUserInfo
                    , async: false
                    , type: 'post'
                    , data: {
                        username:thisName
                    }
                    , dataType: 'json'
                    , success: function (result) {
                        //加载动画
                        layer.load(1, {time: 1*1000});
                        //获取返回值数据
                        var data = result.data.userDO;
                        //先移除之前的Html
                        $("#hyd-authlevel-user").html();
                        $("#hyd-authlevel-user").attr("hyd-value","");
                        $("#hyd-authlevel-user").attr("username","");
                        $("#hyd-authlevel-user").attr("userauth","");
                        $("#hyd_auth_levName div").empty();
                        $("#hyd_auth_authtype div").empty();
                        $("#hyd_auth_startDate div").empty();
                        $("#hyd_auth_expireDate div").empty();
                        //再添加value
                        $("#hyd-authlevel-user").attr("hyd-value",data.cd);
                        $("#hyd-authlevel-user").attr("username",data.name);
                        $("#hyd-authlevel-user").attr("userauth",data.isAuth);
                        if(data.isAuth == '是'){
                            $("#hyd-authlevel-user").html(data.name+"-已授权");
                        }else{
                            $("#hyd-authlevel-user").html(data.name+"-未授权");
                        }
                        $("#hyd_auth_levName div").append(data.levNam);
                        if(data.isAuth == '是'){
                            $("#hyd_auth_startDate div").append(data.startDate);
                            if(data.expireDate=="永久"){
                                $("#hyd_auth_authtype div").append("永久");
                            }else{
                                $("#hyd_auth_authtype div").append("临时");
                                $("#hyd_auth_expireDate div").append(data.expireDate);
                            }
                        }
                        var resData = result.data.recDOS;
                        //加载历史授权记录
                        tableshow(resData);
                        $('.health-filter.health-filter-input input[name="health-search"]',hdk.config.activeTab).keyup(function () {
                            filterdata =  tool.filterArray($(this).val(),resData);
                            tableshow(filterdata);
                        });

                        //加载移除权限按钮
                        var startD = $("#hyd_auth_startDate div").html();
                        var expireD = $("#hyd_auth_expireDate div").html();
                        var dat = $("#hyd_auth_authtype div").html();

                        if((dat=='永久'&&CompareDateStart(startD))||CompareDate(startD,expireD)){
                            //使移除权限按钮生效
                            $("#hyd_auth_remove").attr("class","layui-btn layui-btn-sm layui-btn-normal");

                        }else {
                            //时移除权限按钮失效
                            $("#hyd_auth_remove").attr("class","layui-btn layui-btn-sm layui-btn-disabled");
                        }

                    }
                });



            });

            layer.close(loading);
        }

        //点击修改权限，弹出弹出框
        $('#hyd_auth_modifyAuth').click(function () {

            //给表单赋值
            layer.open({
                type: 1,
                title: '修改权限' //不显示标题栏,
                ,
                area: ['900px', '600px'] //长宽
                ,
                closeBtn: 1
                ,
                shade: 0.8
                ,
                id: 'LAY_layuipro' //设定一个id，防止重复弹出
                // ,
                // btn: ['<span id="hyd_auth_sumbit">提交修改</span>', '<span id="hyd_auth_cancel">撤销修改</span>']
                ,
                btnAlign: 'c'
                ,
                moveType: 0 //拖拽模式，0或者1
                ,
                content: $("#a").html()
                ,
                success: function () {

                    //弹出层点击事件
                    $('#a_form .multi-checkbox div').click(function () {
                        $(this).siblings().removeClass("hyd-selected");
                        $(this).toggleClass("hyd-selected");

                        //判断永久有效和显示到期显示问题
                        var authdate = $('[name="authDate"] .hyd-selected span').html();
                        if(authdate=='永久有效'){
                            //隐藏结束时间选择框
                            $('[name="auth_endTime"]').attr("style","visibility:hidden;");
                        }
                        if(authdate=='限时到期'){
                            $('[name="auth_endTime"]').attr("style","visibility:visible;");
                        }
                    });

                    //点击开始时间和结束时间事件
                    //加载时间控件
                    laydate.render({
                        elem: '#a_startDate' //指定元素
                        ,closeStop: '#a_startDate' //这里代表的意思是：点击 test1 所在元素阻止关闭事件冒泡。如果不设定，则无法弹出控件
                        ,min:minDate()
                    });
                    laydate.render({
                        elem: '#a_expirtDate' //指定元素
                        ,closeStop: '#a_expirtDate' //这里代表的意思是：点击 test1 所在元素阻止关闭事件冒泡。如果不设定，则无法弹出控件
                        ,min:minDate()
                    });
                    //获取已选中的值
                    var name = $("#hyd-authlevel-user").attr("username");
                    var hyd_auth_levName = $('#hyd_auth_levName div').html();
                    var hyd_auth_isAuth = $("#hyd-authlevel-user").attr("userauth");
                    var startDate = $("#hyd_auth_startDate div").html();
                    var expireDate = $("#hyd_auth_expireDate div").html();
                    //给弹出层按钮赋值
                    $('[name="username"]').attr('value',name);
                    $('#a_startDate').attr('value',startDate);
                    if(expireDate!='永久') {
                        $('#a_expirtDate').attr('value', expireDate);
                    }
                    //添加默认选中效果
                    $('[name="isAuth"] div').each(function (index,value) {
                        //获得当前的按钮
                        var sp_isAuth = $($('[name="isAuth"] div')[index]).find("span").html();
                        if(sp_isAuth==hyd_auth_isAuth){
                            $($('[name="isAuth"] div')[index]).attr("class","hyd-selected");
                        }
                    });

                    $('[name="levNam"] div').each(function (index,value) {
                        //获得当前的按钮
                        var sp_levNam =  $($('[name="levNam"] div')[index]).find("span").html();
                        if(sp_levNam==hyd_auth_levName){
                            $($('[name="levNam"] div')[index]).attr("class","hyd-selected");
                        }
                        if(sp_levNam=='全部'&&hyd_auth_levName=='厅级,省级'){
                            $($('[name="levNam"] div')[index]).attr("class","hyd-selected");
                        }
                    });

                    $('[name="authDate"] div').each(function (index,value) {
                        //获得当前的授权时间按钮
                        var sp_authDate = $($('[name="authDate"] div')[index]).find("span").html();
                        //如果当前过期时间为永久则选中永久有效按钮
                        if(sp_authDate=='永久有效'&&expireDate=='永久'){
                            $($('[name="authDate"] div')[index]).attr("class","hyd-selected");
                            $('[name="auth_endTime"]').attr("style","visibility:hidden;");
                            //如果当前过期时间不为空且不为永久则选中限时到期按钮
                        }if(expireDate!=''&&sp_authDate=='限时到期'&&expireDate!='永久'){
                            $($('[name="authDate"] div')[index]).attr("class","hyd-selected");
                            $('[name="auth_endTime"]').attr("style","visibility:visible;");
                        }
                    });
                }
            });

            //点击提交修改按钮,去后台修改用户权限
            $("#hyd_auth_sumbit").click(function () {

                var levNam = $('[name="levNam"] .hyd-selected span').html();
                if(levNam == '全部'){
                    levNam = '厅级,省级';
                }
                var expireDate = null;
                var authDate  = $('[name="authDate"] .hyd-selected span').html();
                if(authDate == '限时到期'){
                    expireDate = $('#a_expirtDate').val();
                }else {
                    expireDate = '永久'
                }
                var stateDate = $('#a_startDate').val();

                //进行参数校验
                /**
                 * 用户名name 授权范围levNam 授权时间authDate 开始时间startDate不为Null
                 * 当授权时间为限时到期时 结束时间expireDate不为Null
                 */
                if(levNam==undefined||authDate==undefined||stateDate==''||(authDate=='限时到期'&&expireDate=='')||(stateDate>expireDate)){
                    alert('参数输入错误,请重试');
                }else {
                    var jsonStr = {
                        'cd': $('#hyd-authlevel-user').attr('hyd-value'),
                        'name': $('[name="username"]').val(),
                        'startDate': stateDate,
                        'expireDate': expireDate,
                        'levNam': levNam,
                        'operateNam': layui.data('health').userinfo.username,
                    };
                    var authRecord = null;
                    var archivesUser = null;
                    // //发送Ajax请求到后台提交数据
                    $.ajax({
                        url: appconfig.Document.alertUser
                        , contentType: "application/json"
                        , async: false
                        , type: 'post'
                        , data: JSON.stringify(jsonStr)
                        , dataType: 'json'
                        , success: function (result) {
                            layer.msg(result.message, {
                                offset: '15px'
                                , icon: 1
                                , time: 1000
                            });
                            if (result.code == 0) {
                                //获得后台返回的数据集合
                                authRecord = result.data.authRecordVOS;
                                archivesUser = result.data.archivesUserDOS;
                                //重新渲染授权历史记录
                                tableshow(authRecord);

                                //重新渲染动态按钮组
                                function loadBtnState(btnData) {


                                    /**
                                     * 移除已选中所有用户按钮和信息栏
                                     */
                                    var thisNam = $('[hyd-name="quotaname"] .hyd-selected span').html();
                                    var thisUser = null;
                                    //从btnData对象集合中获取当前对象
                                    for(var i=0; i<btnData.length ; i++){
                                        if(btnData[i].name==thisNam){
                                            thisUser = btnData[i];
                                        }
                                    }
                                    //设置授权状态
                                    $('#hyd-authlevel-user').attr("userauth",thisUser.isAuth);
                                    var userState = thisUser.isAuth=='是'?'已授权':'未授权';
                                    //设置授权描述
                                    $('#hyd-authlevel-user').html(thisNam+"-"+userState);
                                    //判断移除权限按钮是否应该生效
                                    if((thisUser.isAuth=='是'&&CompareDate(thisUser.startDate,thisUser.expireDate))||(thisUser.isAuth=='是'&&thisUser.expireDate=='永久'&&CompareDateStart(thisUser.startDate))){
                                        $("#hyd_auth_remove").attr("class","layui-btn layui-btn-sm layui-btn-normal");
                                    }else {
                                        $("#hyd_auth_remove").attr("class","layui-btn layui-btn-sm layui-btn-disabled");
                                    }
                                    //设置下方label的值
                                    $("#hyd_auth_levName div").html(thisUser.levNam);
                                    var expireState = null;
                                    if(thisUser.isAuth=='是'){
                                        if(thisUser.expireDate=='永久'){
                                            expireState = '永久';
                                        }else {
                                            expireState = '临时';
                                        }
                                    }
                                    $("#hyd_auth_authtype div").html(expireState);
                                    $("#hyd_auth_startDate div").html(thisUser.startDate);
                                    $("#hyd_auth_expireDate div").html(thisUser.expireDate=='永久'?null:thisUser.expireDate);
                                }
                                loadBtnState(archivesUser);

                                //loadauthnames(archivesUser);
                                // $('.health-filter.health-filter-input input[name="health-search"]', hdk.config.activeTab).keyup(function () {
                                //     filterdata = tool.filterArray($(this).val(), result.data);
                                //     tableshow(filterdata);
                                //     loadauthnames(archivesUser);
                                // });


                                layer.closeAll();
                            }
                        }
                    });
                }
            });

        });

        //点击移除权限, 弹出询问框
        $("#hyd_auth_remove").click(function () {
            layer.confirm('是否取消'+$('#hyd-authlevel-user').attr('username')+'的授权?', function(index){
                layer.close(layer.index);
                var jsonStr = {
                    'cd':$('#hyd-authlevel-user').attr('hyd-value'),
                    'name':$('#hyd-authlevel-user').attr('username'),
                    'operateNam':layui.data('health').userinfo.username,
                };
                //取消授权
                $.ajax({
                    url: appconfig.Document.removeAuthUser
                    , type: 'post'
                    , dataType: 'json'
                    , contentType: "application/json"
                    , async: false
                    , data:JSON.stringify(jsonStr)
                    , success: function (result) {
                        layer.msg(result.message, {
                            offset: '15px'
                            ,icon: 1
                            ,time: 1000
                        });
                        if(result.code==0){
                            //获得后台返回的数据集合
                            authRecord = result.data.authRecordVOS;
                            archivesUser = result.data.archivesUserDOS;
                            //重新渲染授权历史记录
                            tableshow(authRecord);
                            //重新渲染动态按钮组
                            function loadBtnState(btnData) {

                                /**
                                 * 移除已选中所有用户按钮和信息栏
                                 */
                                var thisNam = $('[hyd-name="quotaname"] .hyd-selected span').html();
                                var thisUser = null;
                                //从btnData对象集合中获取当前对象
                                for(var i=0; i<btnData.length ; i++){
                                    if(btnData[i].name==thisNam){
                                        thisUser = btnData[i];
                                    }
                                }
                                //设置授权状态
                                $('#hyd-authlevel-user').attr("userauth",thisUser.isAuth);
                                var userState = thisUser.isAuth=='是'?'已授权':'未授权';
                                //设置授权描述
                                $('#hyd-authlevel-user').html(thisNam+"-"+userState);
                                //判断移除权限按钮是否应该生效
                                if((thisUser.isAuth=='是'&&CompareDate(thisUser.startDate,thisUser.expireDate))||(thisUser.isAuth=='是'&&thisUser.expireDate=='永久'&&CompareDateStart(thisUser.startDate))){
                                    $("#hyd_auth_remove").attr("class","layui-btn layui-btn-sm layui-btn-normal");
                                }else {
                                    $("#hyd_auth_remove").attr("class","layui-btn layui-btn-sm layui-btn-disabled");
                                }
                                //设置下方label的值
                                $("#hyd_auth_levName div").html(thisUser.levNam);
                                var expireState = null;
                                if(thisUser.isAuth=='是'){
                                    if(thisUser.expireDate=='永久'){
                                        expireState = '永久';
                                    }else {
                                        expireState = '临时';
                                    }
                                }
                                $("#hyd_auth_authtype div").html(expireState);
                                $("#hyd_auth_startDate div").html(thisUser.startDate);
                                $("#hyd_auth_expireDate div").html(thisUser.expireDate=='永久'?null:thisUser.expireDate);
                            }
                            loadBtnState(archivesUser);


                            //loadauthnames(archivesUser);
                            // $('.health-filter.health-filter-input input[name="health-search"]', hdk.config.activeTab).keyup(function () {
                            //     filterdata = tool.filterArray($(this).val(), result.data);
                            //     tableshow(filterdata);
                            //     loadauthnames(archivesUser);
                            // });

                            function tableshow(data) {
                                hyd_table.reload({
                                    data: data
                                });
                            }
                            layer.closeAll();
                        }
                    }
                });
            });
        });





        //页面加载事件
        function tableshow(data){
            hyd_table.reload({
                data:data
            });
        }
    });
    exports('document/auth', {})
});