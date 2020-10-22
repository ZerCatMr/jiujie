//干保办体检工作/安排体检日程
layui.define(function(exports){
    layui.use(['laydate','table','element','hdk','form','tool','appconfig'], function(){
        var $ = layui.$
            ,laydate = layui.laydate
            ,router = layui.router()
            ,table = layui.table
            ,setter = layui.setter
            ,form = layui.form
            ,hdk = layui.hdk
            ,admin = layui.admin
            ,tool= layui.tool
            ,element = layui.element
            ,params = {}
            ,headers = {}
            ,userInfo = {}
            ,appconfig = layui.appconfig
            ,thisTab = 0;

        element.render();

        //配置唯一ID标识符,解决从右侧拖动到左侧时机构id重复问题
        var RIGHT = "right_";

        //获取体检批次号TODO
        var batchID = '201904';

        //初始化排程页面(show左侧级别名称和医院名称及右侧排班选项按钮)
        function initScheduConfig(batchID) {
            $("#Schedu_table_config").empty();
            // var data = layui.data("health").scheduConfig;
            var data = null;
            // if(data==null){
            var jsonStr = {
                "scheduID":batchID
            }
            //去后台查询
            $.ajax({
                url: appconfig.ExamWork.InitSchedules
                , contentType: "application/json"
                , type: 'post'
                , async: false
                , data: JSON.stringify(jsonStr)
                , dataType: 'json'
                , success: function (result) {
                    if (result.code == -1) {
                        layer.msg(result.message, {
                            offset: '15px'
                            , icon: 2
                            , time: 1000
                        });
                    } else {
                        data = result.data;
                    }
                }
            });
            var leftData = data[0];
            var rightData = data[1];

            var divStr = '<ul class="layui-tab-title tab_title_typeNam">';
            //遍历添加左侧页面参数到UI
            for(var i=0 ;i<leftData.length; i++){
                var map = leftData[i];
                if(i==0){
                    divStr += '<li class="layui-this" scheduId="'+map.scheduId+'" typeCode="'+map.levelCode+'">'+map.levelName+'</li>';
                }else {
                    divStr += '<li scheduId="'+map.scheduId+'" typeCode="'+map.levelCode+'">'+map.levelName+'</li>';
                }
            }
            divStr += '</ul><div class="layui-tab-content">';
            for(var s=0; s<leftData.length; s++){
                var map = leftData[s];
                if(s==0){
                    divStr += '<div class="layui-tab-item layui-show">';
                }else {
                    divStr += ' <div class="layui-tab-item">';
                }
                divStr += '   <div class="layui-tab" lay-filter="sched_left_tab"  style="margin-left: -20px;margin-right: -10px">' +
                    '                                    <ul class="layui-tab-title tab_title_hospNam" hospNamTypeCode="'+map.levelCode+'">';
                for( var j=0; j<map.hosps.length; j++){
                    var hosp = map.hosps[j];
                    if(j==0){
                        divStr += '<li class="layui-this" hospCode="'+hosp.HospCode+'" hosp_blockId="'+hosp.BlockID+'">'+hosp.HospName+'</li>';
                    }else {
                        divStr += '<li hospCode="'+hosp.HospCode+'" hosp_blockId="'+hosp.BlockID+'">'+hosp.HospName+'</li>';
                    }
                }
                divStr += '</ul><div class="layui-tab-content schedu_left_content">';
                for (var j=0; j<map.hosps.length; j++){
                    var hosp = map.hosps[j];
                    if(j==0){
                        divStr += '<div class="layui-tab-item layui-show">';
                    }else {
                        divStr += '<div class="layui-tab-item">';
                    }
                    divStr += '<button class="layui-btn layui-btn-primary check_add_plan" add_blockId="'+hosp.BlockID+'" add_sheduID='+map.scheduId+'>新增日程</button>' +
                        '<div class="layui-tab-content" style="height: 100px;" class="check_left_main">' +
                        '<div class="list-group col items check_left_main_body" blockId="'+hosp.BlockID+'" scheduId="'+map.scheduId+'" name="'+hosp.HospName+map.levelName+'">' +
                        '</div>' +
                        '</div>' +
                        '</div>';
                }
                divStr += '</div></div></div>';
            }
            //遍历添加右侧页面参数到UI
            var rightDiv = '';
            for(var k=0; k<rightData.length; k++){
                var ks = k+1;
                if(k==0){
                    rightDiv += '<div class="hyd-selected"><span hyd-value="'+ks+'" tagId="'+rightData[k].TagID+'" tagSource="'+rightData[k].TagSource+'">'+rightData[k].TagName+'</span></div>';
                }else {
                    rightDiv += '<div><span hyd-value="'+ks+'" tagId="'+rightData[k].TagID+'" tagSource="'+rightData[k].TagSource+'">'+rightData[k].TagName+'</span></div>';
                }
            }
            $("#Schedu_table_config").append(divStr)
            $("#sched_right_organview").append(rightDiv);

        }
        initScheduConfig(batchID)
        //加载右侧单位和人员列表
        function loadRightOrganPersons(organs) {
            var rightDiv = '';
            for (var k = 0; k < organs.length; k++) {
                var organ = organs[k];
                rightDiv += '      <div class="bellows__item" check_type="organ" draggable="false">' +
                    '                                <div class="bellows__header">' +
                    '                                    <h3 oranNam ='+organ.OrganName+' >'+organ.OrganName+'('+organ.personCount+'人)</h3>' +
                    '                                </div>' +
                    '<div class="bellows__content-wrapper" aria-hidden="true" style="display: none;">' +
                    '                                <div class="bellows__content"   aria-hidden="false"  organNam="'+organ.OrganName+'" name="organ" id="'+RIGHT+organ.OrganID+'" value="'+organ.OrganName+'('+organ.personCount+'人)">';
                if (organ.personList.length > 0) {
                    for (var s = 0; s < organ.personList.length; s++) {
                        rightDiv += '<div id="' + organ.personList[s].UserID + '" check_type="person" class="layui-btn layui-btn-sm" hidden>' + organ.personList[s].UserName + '</div>';
                    }
                }
                rightDiv += '</div></div></div>';
            }
            //添加到指定区域
            $("#check_right_main").append(rightDiv);
            form.render();
            // //加载右侧区域的拖动组件
            var exampleRight = document.getElementById('check_right_main');
            new Sortable(exampleRight, {
                group: {
                    name: 'shared'
                    ,pull: 'clone'
                    , put: false
                    ,handle: '.handle', // 只拖拽手型效果
                },
                animation: 150
                ,onEnd: function (event,ui) {
                }
            });
            for (var k = 0; k < organs.length; k++) {
                var organ = organs[k];
                //加载右侧单位信息中的人员名单拖动(如果有)
                if (organ.personList.length > 0) {
                    var rightPerson = document.getElementById(RIGHT+organ.OrganID);
                    new Sortable(rightPerson, {
                        group: {
                            name: 'shared'
                            ,pull: 'clone'
                            , put: false
                        }, // set both lists to same group
                        animation: 150
                        , onEnd: function (event, ui) {
                        }
                    });
                }
            }
        }

        //右侧单位或人员拖动到左侧排期div中
        function rightDIVtoLeftDIV(event,ui,divId) {

            //拖拽的对象
            var item = event.item;
            //拖拽前的父对象
            var target = event.from;
            //拖拽后的父对象
            var to  = event.to;
            var detailId = $(to).attr('sor_detailId');
            var blockId = $(to).attr('sor_blockId');


            //TODO 1 右侧拖动到左侧 存入sessionStrong
            var divLength = $('[blockid="'+blockId+'"]').scrollTop();
            console.log("当前divlength", divLength);

            //存入缓存
            localStorage.setItem("thisDivLength", divLength);


            //判断当前是添加人员还是添加单位
            switch ($(item).attr("check_type")){
                case "organ":
                    //获取原div的所有属性
                    var originalOrganID = $(item).find('[name="organ" ]').attr("id");

                    //由于右侧单位id加了特殊处理，所以此处需要截取掉right_之前的内容
                    var organId = originalOrganID.substr(originalOrganID.lastIndexOf("_")+1, originalOrganID.length);

                    var organNam = $(divId).find(" h3 ").attr("oranNam");
                    var personArr = new Array();
                    personArr = $(item).find('[check_type="person"]');
                    var personList = new Array();

                    for(var i=0;i<personArr.length; i++){
                        var personId = $(personArr[i]).attr("id");
                        var personNam = $(personArr[i]).html();
                        var person = {
                            "personCd":personId,
                            "personName":personNam
                        }
                        personList.push(person);
                    }

                    var organ = {
                        "detailId":detailId,
                        "organCd":organId,
                        "organName":organNam,
                        "personInfos":personList
                    }

                    //发送ajax请求新增单位和人员信息到日程安排中
                    $.ajax({
                        url: appconfig.ExamWork.ScheduleAddOrgan
                        , contentType: "application/json"
                        , type: 'post'
                        , data: JSON.stringify(organ)
                        , dataType: 'json'
                        , success: function (result) {
                            if(result.code==0){
                                LoadSchedule(blockId);
                            }else {
                                layer.msg(result.message, {
                                    offset: '15px'
                                    ,icon: 2
                                    ,time: 1000
                                });
                            }
                        }
                    });
                    //拿到的新数据重新渲染页面
                    break;
                case "person":
                    //获得当前人员id和所在机构信息
                    var personid = $(item).attr("id");
                    var personNam = $(item).html();
                    var originalOrganID = $(target).parent().find('[name="organ"]').attr("id");

                    //由于右侧单位id加了特殊处理，所以此处需要截取掉right_之前的内容
                    var organId = originalOrganID.substr(originalOrganID.lastIndexOf("_")+1,originalOrganID.length);

                    var organNam = $(target).parent().find('[name="organ"]').attr("organnam");
                    var organDom =  $(to).find('[organid="'+organId+'"]').html();

                    //当前人员所在的单位未被添加(添加人员和单位信息)
                    if(organDom==undefined){
                        var organ = {
                            "detailId":detailId,
                            "organCd":organId,
                            "organName":organNam,
                            "personInfos":[
                                {
                                    "personCd":personid,
                                    "personName":personNam
                                }
                            ]
                        }
                        $.ajax({
                            url: appconfig.ExamWork.ScheduleAddOrgan
                            , contentType: "application/json"
                            , type: 'post'
                            , data: JSON.stringify(organ)
                            , dataType: 'json'
                            , success: function (result) {
                                if(result.code==0){

                                    LoadSchedule(blockId);
                                }else {
                                    layer.msg(result.message, {
                                        offset: '15px'
                                        ,icon: 2
                                        ,time: 1000
                                    });
                                }
                            }
                        });
                    }else {
                        //当前人员所在的单位已被添加(只添加人员信息)
                        //到发送ajax请求
                        $.ajax({
                            url: appconfig.ExamWork.ScheduleAddPerson
                            , contentType: "application/json"
                            , type: 'post'
                            , data: JSON.stringify({
                                "detailid":detailId,
                                "organid":organId,
                                "userid":personid,
                                "username":personNam
                            })
                            , dataType: 'json'
                            , success: function (result) {
                                if(result.code==0){

                                    LoadSchedule(blockId);
                                }else {
                                    layer.msg(result.message, {
                                        offset: '15px'
                                        ,icon: 2
                                        ,time: 1000
                                    });
                                }
                            }
                        });
                    }
                    break;
                default:
                    break;
            }
        }

        //左侧新增一个日程JS事件
        function addPlanJS(schedule) {

            //初始化参数
            var blockId = schedule.blockId;
            var gearDate = schedule.gearDate;
            var organs = schedule.childen;
            var detailid = schedule.detailid;

            var thisDiv = '';
            //添加日程计划到页面
            thisDiv += '<div class="left_main_talbe layui-card" detailid="'+detailid+'"   gearDate="'+gearDate+'"> ' +
                '   <div class="layui-card-header">' +
                '<div class="layui-col-md9">' +
                '       <span >'+gearDate+'</span> ' +
                '       <span name="psersonCount" value="'+schedule.personCount+'">'+schedule.personCount+'/人</span> ' +
                '       <span name="organCount"  value="'+schedule.organCount+'">'+schedule.organCount+'/单位</span></div>' +
                '<div class="layui-col-md3">' +
                '       <svg class="icon check_left_main_body table_Telescopic" aria-hidden="true" font-size="25px" value="展开" show_detailid="'+detailid+'"><use xlink:href="#icon-zhankai2"></use></svg>' +
                '       <svg class="icon check_left_main_close" del_blockId="'+blockId+'" aria-hidden="true" font-size="25px" value="删除" del_detailid="'+detailid+'"><use xlink:href="#icon-delete"></use></svg>' +
                '    </div></div> ' +
                '  <div class="layui-card-body" id="left'+detailid+'" name="sortable" sor_blockId="'+blockId+'" sor_detailId="'+detailid+'">';
            //添加单位信息
            if(schedule.childen!=null){
                for(var i=0; i<organs.length; i++){
                    var organ = organs[i];
                    thisDiv += '<div class="layui-colla-item list-group-item tinted" organId="'+organ.organId+'"  organNam="'+organ.organNam+'"> ' +
                        '        <h2 class="layui-colla-title" name="organ" id="'+organ.organId+'">' +
                        '<div class="layui-col-md1">' +
                        '<i class="layui-icon layui-icon-delete organ_shanchu" org_blockId="'+blockId+'" org_organName="'+organ.organNam+'" org_detailId="'+detailid+'" org_organId="'+organ.organId+'"></i>' +
                        '</div>' +
                        '<div class="layui-col-md8">'+organ.organNam+'('+organ.personCount+'人)</div>' +
                        '<div class="layui-col-md3" organName="'+organ.organNam+'" personCount="'+organ.personCount+'" organId="'+organ.organId+'">' +
                        '<svg class="icon chakan_icon"  aria-hidden="true" font-size="22px"><use xlink:href="#icon-chakan"></use></svg>&nbsp;' +
                        '<svg class="icon person_icon"  aria-hidden="true" font-size="22px"><use xlink:href="#icon-piliangqianchu"></use></svg>' +
                        '        </div></h2> <div class="layui-colla-content"> ';
                    //添加人员信息
                    if(organ.childen.length>0){
                        for(var j=0; j<organ.childen.length; j++){
                            var person = organ.childen[j];
                            thisDiv += '<div id="'+person.userid+'" name="left_organ_person" class="layui-btn layui-btn-sm layui-btn-radius layui-btn-primary">'+person.username+'</div>';
                        }
                    }
                    thisDiv += "</div></div>";
                }
            }
            thisDiv += '</div></div>';
            //添加到左侧侧区域
            $('[blockid='+blockId+']').append(thisDiv);
            element.render();
            //将刚添加的左侧日期信息注册到拖动区域
            var divId = document.getElementById('left'+detailid);

            //设置当前页面高度
            var divLength = localStorage.getItem("thisDivLength");

            $('[blockid="'+blockId+'"]').scrollTop(divLength);

            st =  new Sortable(divId, {
                group: {
                    name:'shared'
                    //,pull: 'clone'
                    ,handle: '.handle' // 只拖拽部分手型效果
                    ,forceFallback: false
                }
                ,animation: 150
                ,onAdd: function (event,ui) {
                    //将单位或人员从右侧添加至左侧
                    rightDIVtoLeftDIV(event,ui,divId);
                },onEnd:function (event) {
                    //左侧已排程单位互相拖拽
                    updateLeftOrgan(event, divId);
                }
            });
        }

        //页面加载初始化(需要show左侧日程区域和右侧单位人员列表)
        function LoadSchedule(blockId) {
            //加载弹窗
            var loading = layer.load(1, {
                content: "<div style='margin-left:-30px;padding-top:60px;width:120px;color:#2b425b;'>正在查询请稍后...</div>",
                shade: [0.4, '#000']
            });

            //渲染之前，需要先移除
            $('[blockid='+blockId+']').empty();
            //移除右侧所有单位列表
            $("#check_right_main").empty();

            //获得选中的级别编码
            var levelCode =  $("#Schedu_table_config .layui-this").attr("typecode");
            //根据获取选中的级别编码查询医院编码
            var hospCode = $('[hospNamTypeCode="'+levelCode+'"] .layui-this').attr("hospcode");

            var jsonStr = {
                "blockId":blockId,
                "levelCode":  levelCode,
                "hospCode" : hospCode,
                "tagId": $("#sched_right_organview .hyd-selected span").attr("tagid")
            }

            $.ajax({
                url:appconfig.ExamWork.LoadSchedule
                , contentType: "application/json"
                , type: 'post'
                , data: JSON.stringify(jsonStr)
                , dataType: 'json'
                , success: function (result) {
                    //结束弹窗
                    layer.close(loading);
                    if(result.code==-1){
                        layer.msg(result.message, {
                            offset: '15px'
                            ,icon: 2
                            ,time: 1000
                        });
                    }else {
                        //加载左侧日程安排区域
                        if(result.data.length>0){
                            var schedules = result.data[0];
                            for(var i=0; i<schedules.length; i++){
                                var schedule = schedules[i];
                                //添加日程js
                                addPlanJS(schedule);
                            }
                            //添加右侧单位列表js
                            loadRightOrganPersons(result.data[1]);
                        }

                    }
                }
            });

        }
        LoadSchedule("20190401");

        //新增左侧区域的日程计划
        $(".check_add_plan", hdk.config.activeTab).click(function () {

            var blockId = $(this).attr("add_blockId");

            //打开弹出层
            layer.open({
                type: 1
                ,title: '新增计划' //不显示标题栏,,
                ,area: ['400px', '300px'] //长宽,
                ,closeBtn: 1
                ,shade: 0.8
                ,id: 'check_schedule_layer' //设定一个id，防止重复弹出,
                ,btnAlign: 'c'
                ,moveType: 0 //拖拽模式，0或者1,
                ,content: $("#check_add_plan_layer", hdk.config.activeTab).html()
                ,success: function () {


                    //初始化日期选择器
                    laydate.render({
                        elem: '#plan_layer_date' //指定元素
                        ,trigger:"click"
                    });
                    //点击确认后
                    $('#hyd_auth_sumbit').click(function () {

                        //获得日期
                        var date = $("#plan_layer_date").val();

                        //判断当前日程在当前页面是否已有
                        var st = $('[blockid="'+blockId+'"] [geardate="'+date+'"]').html();
                        if(date==null||date==''||st!=undefined){
                            layer.msg('当前日期为空或已存在', {
                                offset: '15px'
                                ,icon: 2
                                ,time: 1000
                            });
                        }else{
                            //初始化参数
                            var jsonStr = {
                                "blockId":blockId,
                                "schedDate":date
                            }
                            //去后台提交数据
                            $.ajax({
                                url:appconfig.ExamWork.AddSchedule
                                ,contentType: "application/json"
                                ,type: 'post'
                                ,dataType:"json"
                                ,data:JSON.stringify(jsonStr)
                                ,success:function (result) {
                                    if(result.code==0){
                                        layer.msg("添加日程成功",{
                                            offset: '15px'
                                            ,icon: 1
                                            ,time: 1000
                                        });

                                        //添加数据到页面TODO 每次新增后刷新日程计划
                                        LoadSchedule(blockId);
                                        // addPlanJS(jsonStr);
                                    }else {
                                        layer.msg(result.message,{
                                            offset: '15px'
                                            ,icon: 2
                                            ,time: 1000
                                        });
                                    }
                                }
                            });
                        }
                    });
                }
            });
        });

        //自定义按钮组点击事件
        $('.health-query .multi-checkbox div', hdk.config.activeTab).on('click',function () {
            $(this).siblings().removeClass("hyd-selected");
            $(this).toggleClass("hyd-selected");
        });

        //单个card内部的展开与缩放
        $(".check_left_main_body" , hdk.config.activeTab).delegate(".check_left_main_body","click",function(){
            //设置当前的文字
            if($(this).attr("value")=='展开'){
                // console.log("父节点", $(this).parents(".left_main_talbe").html());
                // console.log($(this).parents('[name="organCount"]').attr("value"))
                //计算展开后的
                var divLength = $(this).parent().parent().find('[name="organCount"]').attr("value")*65;
                if(divLength<270){
                    divLength = 270;
                }
                $(this).attr('value',"缩放");
                //设置父级div高度
                $(this).parents(".left_main_talbe").attr("style","height: "+divLength+"px;");
                //设置当前图标
                $(this).html('<use xlink:href="#icon-zhankai3"></use>');
            }else {
                $(this).attr('value',"展开");
                //设置父级div高度
                $(this).parents(".left_main_talbe").attr("style","height: 270px;");
                $(this).html('<use xlink:href="#icon-zhankai2"></use>');
            }
        });

        //删除已排期信息
        $(document).on('click','.check_left_main_close',function(){

            var detailid =  $(this).attr("del_detailid");
            var blockId = $(this).attr("del_blockid");

            layer.confirm('是否删除当前排期?', {
                btn: ['确认', '取消'],
                yes: function(index, layero) {
                    //去后台删除
                    var jsonStr = {
                        "detailid":detailid
                    }
                    $.ajax({
                        url: appconfig.ExamWork.DelSchedule
                        , contentType: "application/json"
                        , type: 'post'
                        , async: true
                        , data: JSON.stringify(jsonStr)
                        , dataType: 'json'
                        , success: function (result) {
                            layer.close(layer.index);
                            if(result.code==0){
                                layer.msg("删除成功", {
                                    offset: '15px'
                                    ,icon: 1
                                    ,time: 1000
                                });
                                //重新加载当前页面
                                LoadSchedule(blockId);
                            }else {
                                layer.msg(result.message, {
                                    offset: '15px'
                                    ,icon: 2
                                    ,time: 1000
                                });
                            }

                        }
                    });
                }
            });
        });

        //条件查询单位信息
        $('#right_queryOrgans_btn').click(function () {
            var organNam =  $('[name="right_queryOrgans_input"]').val();
            $.ajax({
                url: appconfig.ExamWork.QueryOrgans
                , contentType: "application/json"
                , type: 'get'
                , data: {
                    "organNam":organNam
                }
                , dataType: 'json'
                , success: function (result) {

                }
            });
        });

        //查看体检排期中的人员信息
        $(document).on("click",".chakan_icon", function () {
            //获取单位id
            var organId = $(this).parent().parent().parent().find('[name="organ"]').attr("id");
            console.log("当前对象",organId);

            layer.open({
                type: 1
                ,title: '查看人员'
                ,area: ['500px', '600px']
                ,closeBtn: 1
                ,shade: 0.8
                ,id: 'show_plan_person'
                ,moveType: 0
                ,content: $("#show_plan_persons").html()
                ,success: function () {
                    //根据当前机构的id查询机构中已排期的人员信息
                    $.ajax({
                        url: appconfig.ExamWork.QueryPlanOrganPersons
                        , contentType: "application/json"
                        , type: 'get'
                        , data: {
                            "organId":organId
                        }
                        , dataType: 'json'
                        , success: function (result) {

                        }
                    });
                }
            });
        });

        //操作体检排期中的人员信息
        $(document).on("click",".person_icon", function () {
            //获得渲染前的数据
            var blockId = $(this).parent().parent().parent().parent().attr("sor_blockid");
            var organName = $(this).parent().attr("organName");
            var organId = $(this).parent().attr("organid");
            var persounCount = $(this).parent().attr("personCount");

            var detailId =  $(this).parent().parent().parent().parent().attr("sor_detailid");
            var levelCode = $("#Schedu_table_config .tab_title_typeNam .layui-this").attr("typecode");

            layer.open({
                type: 1
                ,title: '批量检出'
                ,area: ['700px', '500px'] //宽,高
                ,closeBtn: 1
                ,btn:["确认",'取消']
                ,btnAlign: 'c'
                ,shade: 0.8
                ,id:'oper_plan_perosn'
                ,moveType: 1 //拖拽模式，0或者1,
                ,content: $("#oper_plan_perosns").html()
                ,success: function () {
                    //初始化UI
                    $("#plan_thisOrgan").attr("value", organName);
                    $("#plan_thisOrgan").attr("organId", organId);
                    $("#plan_thisValue").attr("value", persounCount);
                    $("#plan_thisValue").html(persounCount);


                    var jsonStr = {
                        "levelCode":levelCode,
                        "detailId":detailId
                    }
                    var data_select = null;
                    $.ajax({
                        url: appconfig.ExamWork.LoadLicensableDate
                        , contentType: "application/json"
                        , type: 'post'
                        , async:false
                        , data: JSON.stringify(jsonStr)
                        , dataType: 'json'
                        , success: function (result) {
                            data_select = result.data;
                            //渲染
                            var hospDiv = "";
                            var dateDiv = "";
                            for(var i=0; i<data_select.length; i++){
                                //添加医院
                                if(i==0){
                                    hospDiv += '<input type="radio" lay-filter="perosns_hosps" name="hospNam" value="'+data_select[i].hospName+'" title="'+data_select[i].hospName+'"checked>';
                                    dateDiv += '<div class="dateNam_select" style="display: block;" hospNam="'+data_select[i].hospName+'">'
                                }else {
                                    hospDiv += '<input type="radio" lay-filter="perosns_hosps" name="hospNam" value="'+data_select[i].hospName+'" title="'+data_select[i].hospName+'">';
                                    dateDiv += '<div class="dateNam_select" style="display: none;" hospNam="'+data_select[i].hospName+'">'
                                }
                                //添加日程
                                for(var j=0; j<data_select[i].twoList.length; j++){
                                    if(j==0){
                                        dateDiv+= '<input  type="radio" name="dateNam" value="'+data_select[i].twoList[j].detailId+'" title="'+data_select[i].twoList[j].schedDate+'">';
                                    }else {
                                        dateDiv+= '<input  type="radio" name="dateNam" value="'+data_select[i].twoList[j].detailId+'" title="'+data_select[i].twoList[j].schedDate+'">';
                                    }

                                }

                                dateDiv += '</div>'
                            }
                            $("#per_hosps").append(hospDiv);
                            $("#per_date").append(dateDiv);
                            element.render();
                            form.render();

                            //监听医院名称单选切换
                            form.on('radio(perosns_hosps)', function(data){

                                $('.dateNam_select').css("display","none");
                                $('[hospNam="'+data.value+'"]').css("display","block");

                            });
                        }
                    });




                }
                ,yes:function (layero,index) {
                    //校验输入参数是否正确
                    var checkCount = $("#personCount_input").val();
                    var afterDetailId = $('.dateNam_select .layui-form-radioed').prev().val();
                    var organId =  $("#plan_thisOrgan").attr("organId");
                    if(afterDetailId==""||checkCount==""){
                        layer.msg("请选中调出日程和输入调出人数",{
                            offset: '15px'
                            , icon: 2
                            , time: 2000
                        })
                    }else {
                        //判断调出人数是否有效
                        if(parseInt(checkCount) <=parseInt(persounCount) && parseInt(checkCount)>0){
                            //去后台提交
                            var jsonStr = {
                                "beforeDetailId":detailId,
                                "afterDetailId":afterDetailId,
                                "organId":organId,
                                "userNumber":checkCount
                            }
                            $.ajax({
                                url: appconfig.ExamWork.BringUpPersons
                                , contentType: "application/json"
                                , type: 'post'
                                , async:false
                                , data: JSON.stringify(jsonStr)
                                , dataType: 'json'
                                , success: function (result) {
                                    if(result.code==-1){
                                        layer.msg(result.message,{
                                            offset: '15px'
                                            , icon: 2
                                            , time: 2000
                                        });
                                    }else {
                                        layer.closeAll();
                                        layer.msg("调出成功",{
                                            offset: '15px'
                                            , icon: 1
                                            , time: 2000
                                        });
                                        //重新加载页面
                                        LoadSchedule(blockId);
                                    }
                                }
                            });
                        }else {
                            console.log("当前调出人数",checkCount);
                            console.log("当前已有人数", persounCount);
                            layer.msg("请输入有效的调出人数",{
                                offset: '15px'
                                , icon: 2
                                , time: 2000
                            });
                        }
                    }
                }
            });
        });

        //监听页面人员类别 医院级别的改变
        element.on('tab(sched_left_tab)', function(data){
            var blockId =  $(".layui-tab-content .layui-show div .schedu_left_content .layui-show .check_add_plan").attr("add_blockid");
            //去加载数据
            LoadSchedule(blockId);
        });

        //监听右侧可选项按钮改变(手动加载右侧单位列表)
        $("#sched_right_organview div").click(function () {
            if($(this).hasClass("hyd-selected")){
                var blockId =  $(".layui-tab-content .layui-show div .schedu_left_content .layui-show .check_add_plan").attr("add_blockid");
                //去加载数据
                LoadSchedule(blockId);
            }
        });

        //将机构从一个已安排日期拖动到另一个安排日期中
        function updateLeftOrgan(event, divId) {
            var item = event.item;
            var target = event.from;
            var to = event.to;


            //获得拖拽前的父节点属性
            var beforeBlockId = $(target).attr("sor_blockid");
            var beforeDetailId = $(target).attr("sor_detailid");
            //获得拖拽后的父节点属性
            var afterBlockId = $(to).attr("sor_blockid");
            var afterDetailId = $(to).attr("sor_detailid");
            //获得拖拽当前机构及机构人员信息
            var organId = $(item).attr("organid");
            var organNam = $(item).attr("organnam");
            var personArray = $(item).find('.layui-colla-content [name="left_organ_person"]');
            var personList = new Array();

            //TODO 2 内部单位互相拖拽 存入localStorage
            var divLength = $('[blockid="'+beforeBlockId+'"]').scrollTop();
            console.log("当前divlength", divLength);

            localStorage.setItem("thisDivLength", divLength);

            for(var i=0; i<personArray.length; i++){
                var personId = $(personArray[i]).attr("id");
                var personNam = $(personArray[i]).html();
                var personObj = {
                    "personCd":personId,
                    "personName":personNam
                }
                personList.push(personObj);
            }

            //由于事件是在拖动开始时触发,所以需要判断是否为有效更新
            if(afterDetailId!=beforeDetailId){
                var jsonStr = {
                    "beforeDetailId":beforeDetailId,
                    "afterDetailId":afterDetailId,
                    "organId":organId,
                    "organName":organNam,
                    "personList":personList
                }

                //去后台提交
                $.ajax({
                    url: appconfig.ExamWork.UpdateOrganPerson
                    , contentType: "application/json"
                    , type: 'post'
                    , async: false
                    , data: JSON.stringify(jsonStr)
                    , dataType: 'json'
                    , success: function (result) {
                        if(result.code==0){
                            //去刷新当前页面
                            LoadSchedule(beforeBlockId);
                        }else {
                            layer.msg(result.message, {
                                offset: '15px'
                                , icon: 2
                                , time: 1000
                            });
                        }
                    }
                });
            }
            else {
                //当前日期组内排序功能
                var organs = $(to).find(".list-group-item");
                var organArray = organs.toArray();
                var targetNo = 0;
                var organId =  $(item).attr("organid");
                for(var i=0; i<organArray.length; i++){
                    var thisOrganId = $(organArray[i]).attr("organid");
                    console.log(thisOrganId);
                    if(organId==thisOrganId){
                        targetNo = i +1;
                        continue;
                    }
                }

                var jsonStr = {
                    "detailID": afterDetailId,
                    "curOrganID": organId,
                    "targetNo": targetNo
                }
                //发送ajax到后台保存排序
                $.ajax({
                    url: appconfig.ExamWork.SortOrgan
                    , contentType: "application/json"
                    , type: 'post'
                    , async: false
                    , data: JSON.stringify(jsonStr)
                    , dataType: 'json'
                    , success: function (result) {
                        if(result.code==0){
                            //去刷新当前页面
                        }else {
                            layer.msg(result.message, {
                                offset: '15px'
                                , icon: 2
                                , time: 1000
                            });
                        }
                    }
                });
            }

        }

        //监听左侧删除机构按钮
        $(document).on("click", ".organ_shanchu", function () {
            var organName = $(this).attr("org_organName");
            //获取当前的detailId和organId
            var detailId = $(this).attr("org_detailid");
            var organId = $(this).attr("org_organid");
            var blockId = $(this).attr("org_blockid");

            layer.confirm('是否要移除'+organName, function(index){


                var jsonStr = {
                    "detailId":detailId,
                    "organCd":organId
                }
                //去后台移除
                $.ajax({
                    url: appconfig.ExamWork.DelOrganPerson
                    , contentType: "application/json"
                    , type: 'post'
                    , async: false
                    , data: JSON.stringify(jsonStr)
                    , dataType: 'json'
                    , success: function (result) {
                        if(result.code==0){
                            layer.msg("移除成功",{
                                offset: '15px'
                                , icon: 1
                                , time: 1000
                            });

                            //去刷新当前页面
                            LoadSchedule(blockId);
                        }else {
                            layer.msg(result.message, {
                                offset: '15px'
                                , icon: 2
                                , time: 1000
                            });
                        }
                    }
                });

                layer.close(index);
            });



        });

        //监听右侧单位列表的展开与缩放
        $(document).on("click", ".bellows__item", function () {
            var state = $(this).find(".bellows__content-wrapper").css("display");
            if(state=='block'){
                $(this).find(".bellows__content-wrapper").css("display","none");
            }else {
                $(this).find(".bellows__content-wrapper").css("display","block");
            }
        });


    });
    exports('examwork/examplan_schedule_assign', {})
});
