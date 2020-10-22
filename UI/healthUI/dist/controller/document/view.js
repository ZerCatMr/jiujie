layui.define(function(exports){
    //查看健康档案
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
        ,appconfig = layui.appconfig
        ,params = {}
        ,headers = {}
        ,userInfo = {}
        ,thisTab = 0;

        var hyd_table = table.render({
            elem: $('#documentviewtb',hdk.config.activeTab)
            ,title:'健康档案列表'
            ,page: true
            ,limit:10
            ,data:[]
            ,loading: false
            ,toolbar:false
            ,cols: [
                [{field: 'cd', title: '主键',sort:false, hide:true, minWidth:80,align: 'center'}
                ,{field: 'nam', title: '姓名',sort:false, minWidth:80,align: 'center'}
                ,{field: 'genderCd', title: '性别',sort:false, minWidth:60,align: 'center',templet: function (d) {
                        if(d.genderCd == 'Sex001'){
                            return '男'
                        }else if(d.genderCd == 'Sex002'){
                            return '女'
                        }else {
                            return '未知'
                        }
                    }}
                ,{field: 'birth',sort:true, title: '出生日期', align: 'center',minWidth:120}
                ,{field: 'idenID',sort:false, title:'身份证号',minWidth:150,align:'center'}
                ,{field: 'typeCdNam',title:'人员类型',sort:false,minWidth:80,align:'center'}
                ,{field: 'treatCdNam',title:'医疗待遇',sort:false,minWidth:80,align:'center'}
                ,{field: 'phone',title:'手机',minWidth:80,align:'center'}
                ,{field: 'duty',title:'职务',minWidth:80,align:'center'}
                // ,{field: 'examOrgCd',title:'单位编码',sort:true,minWidth:80,align:'center'}
                ,{field: 'examOrgNam',title:'参检单位',sort:false,minWidth:80,align:'center'}
                ,{field: 'isYs',title:'授权情况',minWidth:80,align:'center'}
                ,{title: '操作',align:'center',templet: hdk.config.activeTab+' #operation'}
                ]
            ]
        }); 

        //根据条件查询健康档案信息
        $('[name="doc_queryView"]',hdk.config.activeTab).click(function () {
            //打开加载动画
            //加载弹窗
            loading = layer.load(1, {
                content: "<div style='margin-left:-30px;padding-top:60px;width:120px;color:#2b425b;'>正在查询请稍后...</div>",
                shade: [0.4, '#000']
            });

           //获取输入的值
           var typeCdNam =  $('[hyd-name="worktype"] .hyd-selected span' ,hdk.config.activeTab).html();
           var treatCdNam = $('[hyd-name="medtreat"] .hyd-selected span',hdk.config.activeTab).html();
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
                    $('.health-filter.health-filter-input input[name="health-search"]',hdk.config.activeTab).keyup(function () {
                        filterdata =  tool.filterArray($(this).val(),result.data);
                        tableshow(filterdata);
                    });
                }
            });
        });

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

        //跳转到查看单个用户的健康档案信息
        table.on('tool(documentviewtb)', function(obj){
            var data = obj.data;
            var layEvent = obj.event;
            var tr = obj.tr;
            admin.urlenhash('document/persondocument$view:'+data.cd+'/title=档案-'+data.nam+'/nam='+data.nam+'/genderCdNam='+data.genderCdNam
                +'/birth='+data.birth+'/idenID='+data.idenID+'/typeCdNam='+data.typeCdNam+'/levelName='+data.levelName+'/treatCdNam='
                +data.treatCdNam+'/phone='+data.phone+'/examOrgNam='+data.examOrgNam+'/duty='+data.duty+'/cd='+data.cd);
        });

    });
    exports('document/view', {})
});
