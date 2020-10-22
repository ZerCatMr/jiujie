layui.define(function(exports){
    //参检机构管理
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
        //自定义按钮点击事件
        $("button[lay-filter='hyd-query']",hdk.config.activeTab).on('click',function (){
            var reqdata={
                worktype:$('div[hyd-name="worktype"]>div.hyd-selected>span',hdk.config.activeTab).attr("hyd-value")||'',
                medtreat:$('div[hyd-name="medtreat"]>div.hyd-selected>span',hdk.config.activeTab).attr("hyd-value")||'',
                authstatus:$('div[hyd-name="authstatus"]>div.hyd-selected>span',hdk.config.activeTab).attr("hyd-value")||'',
                personname:$('input[name="personname"]',hdk.config.activeTab).val(),
                personIdenNo:$('input[name="personIdenNo"]',hdk.config.activeTab).val()
            }

        });
        $('.health-query .multi-checkbox div',hdk.config.activeTab).on('click',function (){
            $(this).siblings().removeClass("hyd-selected");
            $(this).toggleClass("hyd-selected");
            console.log($(this).attr("hyd-value"));
            hdk.ajax({
                api: appconfig.ExamSet.Term.QueryTermByCateCode,
                data: JSON.stringify({
                    code: $(this).attr("hyd-value")
                })
            }, function (result) {
                console.log(result);
                exportZonedata = result.data;
                //返回数据加载到数据表格中
                table.reload('managetable', {
                    data: result.data
                });
            });

        });

        $(':checkbox[class="multi-checkbox"]').each(function(){
            $(this).click(function(){
                if($(this).attr('checked')){
                    $(':checkbox[class="multi-checkbox"][name='+$(this).attr("name")+']').removeAttr('checked');
                    $(this).attr('checked','checked');
                }
            });
        });




        //初始化表格
        table.render({
            elem: '#managetable'
            // ,url: '../../../mockup/organ_manage_table.json' //数据接口
            ,page: true //开启分页
            ,cols: [[ //表头
                ,{field: 'itemorder', title: '排序号', width:'30%' ,sort:true}
                ,{field: 'termname', title: '名称', width:'30%'}
                ,{
                    field: 'status',
                    title: '状态',
                    width: '10%',
                    templet: function (d) {
                        if (d.status==1){
                            return '<input type="checkbox" name="open" lay-skin="switch" lay-filter="switchTest" checked>'
                        } else if(d.status==0){
                            return '<input type="checkbox" name="open" lay-skin="switch" lay-filter="switchTest">'
                        } else {
                            return ''
                        }
                    }
                }
                ,{field: 'null', title: '操作', width: '30%', templet: '#termdetail_bloder'}
            ]]
            ,initSort:{field:'itemorder', type:'asc'}
            ,data:[]
        });
        //监听工具条
        table.on('tool(managetable)', function(obj){ //注：tool 是工具条事件名，test 是 table 原始容器的属性 lay-filter="对应的值"
            var data = obj.data; //获得当前行数据
            var layEvent = obj.event; //获得 lay-event 对应的值（也可以是表头的 event 参数对应的值）
            var tr = obj.tr; //获得当前行 tr 的 DOM 对象（如果有的话）
            if(layEvent==="query_organ"){
                //打开弹窗
                layer.open({
                    type: 1,
                    title: '查看机构详情',
                    area: ['700px', '500px'],
                    content: $("#query_organ_layer").html(),
                    success: function (layero, index) {
                    }
                });
            }
            else if(layEvent==="eidt_organ"){
                //编辑弹窗
                layer.open({
                    type: 1,
                    title: '编辑机构详情',
                    area: ['700px', '500px'],
                    content: $("#edit_organ_layer").html(),
                    success: function (layero, index) {
                    }
                });
            }
            else if(layEvent==="stop_organ"){
                layer.confirm('是否停用当前机构?', function(index){
                    obj.del(); //删除对应行（tr）的DOM结构，并更新缓存

                });
            }
            else if(layEvent==="start_organ"){
                layer.confirm('是否启用当前机构?', function(index){
                    obj.del(); //删除对应行（tr）的DOM结构，并更新缓存

                });
            }

        });

        //根据条件查询指定机构
        $('#sysconfig_organ_manage [name="query"]').click(function () {

        });
        //打开新增机构弹窗
        $('#sysconfig_organ_manage [name="add"]').click(function () {
            //打开弹窗
            layer.open({
                type: 1,
                title: '新增参检机构',
                area: ['700px', '500px'],
                content: $("#add_organ_layer").html(),
                success: function (layero, index) {
                }
            });
        });


    });
    exports('examset/term_maintain', {})
});
