//干保办体检工作/年度体检名单
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
        ,thisTab = 0
        ,appconfig = layui.appconfig
        ;
        //初始化表格
        table.render({
            elem: '#yearexampersontb'
            ,title:'干部健康检查信息统计表'
            ,page: true
            ,limit:30
            ,cellMinWidth:40
            ,loading: false
            ,cols: [
                [
                    {field:'cd', title: '主键', sort: false, hide:true, align: 'center',fixed:'left'},
                    {field:'batch', title: '体检批次', sort: true,  align: 'center',fixed:'left'}
                    ,{field:'organLevel', title: '机构性质',sort: false,  align: 'left',fixed:'left' ,width:92}
                    ,{field:'organName', title: '参建单位',sort:true,  align: 'center',fixed:'left' ,width:92}
                    ,{field:'psnName', title: '姓名',sort:false,  align: 'center',fixed:'left' ,width:92}
                    ,{field:'gender', title: '性别', sort:false, align: 'center',fixed:'left' ,width:92}
                    ,{field:'age', title: '年龄',sort:true, align: 'left', fixed:'left' ,width:92}
                    ,{field:'birth',title:'出生日期',sort:true,align:'center',fixed:'left' ,width:92}
                    ,{field:'idenId',title:'身份证号',sort:false,align:'center' ,width:92}
                    ,{field:'medTreat',title:'医疗待遇',sort:false, align:'left' ,width:92}
                    ,{field:'psnLevel',title:'人员级别',sort:false, align:'center' ,width:92}
                    ,{field:'workType',title:'人员类型',sort:false, align:'left' ,width:92}
                    ,{field:'duty',title:'职务',sort:false, align:'center' ,width:92}
                    ,{field:'joinExam',title:'joinExam',sort:false, align:'center',hide:true}
                    ,{field:'isLeader',title:'主要领导',sort:false, align:'center' ,width:92}
                    ,{field:'vipName',title:'特殊标记',sort:false, align:'left' ,width:92}
                    ,{field:'arrangeHospName',title:'安排体检医院',sort:false,align:'left' ,width:92}
                    ,{field:'factHospName', title:'实际体检医院', sort:false,align:'left' ,width:92}
                    ,{field:'scheduleCd',title:'是否安排',sort:false, align:'left' ,width:92}
                    ,{field:'scheduleDate',title:'安排日期',sort:true ,align:'left'}
                ]]
        });

        //加载下拉框 和 动态按钮组
        // var loadSete = function (){
        //     $.ajax({
        //         url: appconfig.Menu.YearMenu
        //         ,type: 'get'
        //         ,async: true
        //         ,dataType: 'json'
        //         ,success: function(result){
        //             //获取缓存中的数据
        //             var batch = result.data.batch;
        //             var hospital = result.data.hospital;
        //             var organ = result.data.organ;
        //             var levNam = result.data.levNam;
        //             var mark = result.data.mark;
        //             var noExam = result.data.noExam;
        //             var orgType = result.data.orgType;
        //             var pay = result.data.pay;
        //             var treatNam = result.data.treatNam;
        //             var typeNam = result.data.typeNam;
        //             var markCd = result.data.markCd;
        //
        //             //每次执行下拉框之前，需要删除相应下拉和动态
        //             $("#hyd_year_batch option").remove();
        //             $("hyd_year_organ option:gt(0)").remove();
        //             $("[name='rptHospCd'] option:gt(0)").remove();
        //             $("[name='hospCd'] option:gt(0)").remove();
        //             //移除所有动态按钮组
        //             $(".multi-checkbox div").remove();
        //
        //             //添加动态按钮组
        //             $.each(batch,function (index,value) {
        //                 $("#hyd_year_batch").append('<option value='+value+'>'+value+'</option>');
        //             })
        //             $.each(organ,function (index,value) {
        //                 $("#hyd_year_organ").append('<option value='+value+'>'+value+'</option>');
        //             })
        //             $.each(hospital,function (index,value) {
        //                 //设置医院编码和Value
        //                 $(".hyd_year_hosptail").append("<option value="+hospital[index].cd+">"+hospital[index].nam+"</option>");
        //             })
        //             $.each(levNam,function (index,value) {
        //                 $("#hyd_year_levNam").append
        //                 ('<div value='+value+'><span>'+value+'</option></div>');
        //             })
        //             $.each(mark,function (index,value) {
        //                 $("#hyd_year_mark").append
        //                 ('<div value='+markCd[index]+'><span>'+value+'</option></div>');
        //             })
        //             $.each(orgType,function (index,value) {
        //                 $("#hyd_year_orgType").append
        //                 ('<div value='+value+'><span>'+value+'</option></div>');
        //             })
        //             $.each(noExam,function (index,value) {
        //                 $("#hyd_year_noExam").append
        //                 ('<div value='+value+'><span>'+value+'</option></div>');
        //             })
        //             $.each(pay,function (index,value) {
        //                 $("#hyd_year_pay").append
        //                 ('<div value='+value+'><span>'+value+'</option></div>');
        //             })
        //             $.each(treatNam,function (index,value) {
        //                 $("#hyd_year_treatNam").append
        //                 ('<div value='+value+'><span>'+value+'</option></div>');
        //             })
        //             $.each(typeNam,function (index,value) {
        //                 $("#hyd_year_typeNam").append
        //                 ('<div value='+value+'><span>'+value+'</option></div>');
        //             })
        //             //点击事件
        //             $('.health-query .multi-checkbox div').on('click',function () {
        //                 $(this).toggleClass("hyd-selected")
        //             });
        //             //farstQuery();
        //             form.render();
        //         }
        //     });
        // }

        // loadSete();

        //点击查询事件
        form.on('submit(years)', function (data) {
            var btn = $(this).children("i").html();
            if(btn == '查询'){
                loadTable(data);
            }
        });

        //获取动态下拉和按钮组中的值
        var getMenu = function (data) {
            //获取动态菜单中的值
            var batch = data.field.batch;
            var organ = data.field.organ;
            var hospCd = data.field.hospCd;
            var rptHospCd = data.field.rptHospCd;

            var typeNamStr = $('#hyd_year_typeNam .hyd-selected');
            var typeNamArr = [];
            $.each(typeNamStr,function (index,value) {
                typeNamArr.push($($('#hyd_year_typeNam .hyd-selected')[index]).attr('value'));
            });
            var typeNam = typeNamArr.join(',');

            var treatNamStr = $('#hyd_year_treatNam .hyd-selected');
            var treatNamArr = [];
            $.each(treatNamStr,function (index,value) {
                treatNamArr.push($($('#hyd_year_treatNam .hyd-selected')[index]).attr('value'));
            });
            var treatNam = treatNamArr.join(',');

            var markStr = $('#hyd_year_mark .hyd-selected');
            var markArr = [];
            $.each(markStr,function (index,value) {
                markArr.push($($('#hyd_year_mark .hyd-selected')[index]).attr('value'));
            });
            var mark = markArr.join(',');

            var orgTypeStr = $('#hyd_year_orgType .hyd-selected');
            var orgTypeArr = [];
            $.each(orgTypeStr,function (index,value) {
                orgTypeArr.push($($('#hyd_year_orgType .hyd-selected')[index]).attr('value'));
            });
            var orgType = orgTypeArr.join(',');

            var payStr = $('#hyd_year_pay .hyd-selected');
            var payArr = [];
            $.each(payStr,function (index,value) {
                payArr.push($($('#hyd_year_pay .hyd-selected')[index]).attr('value'));
            });
            var pay = payArr.join(',');

            var noExamStr = $('#hyd_year_noExam .hyd-selected');
            var noExamArr = [];
            $.each(noExamStr,function (index,value) {
                noExamArr.push($($('#hyd_year_noExam .hyd-selected')[index]).attr('value'));
            });
            var noExam = noExamArr.join(',');

            var levNamStr = $('#hyd_year_levNam .hyd-selected');
            var levNamArr = [];
            $.each(levNamStr,function (index,value) {
                levNamArr.push($($('#hyd_year_levNam .hyd-selected')[index]).attr('value'));
            });
            var levNam = levNamArr.join(',');

            //将动态菜单中的值解析为json字符串
            var jsonStr = {
                'batch':batch,
                'organ':organ,
                'hospCd':hospCd,
                'rptHospCd':rptHospCd,
                'typeNam':typeNam,
                'treatNam':treatNam,
                'mark':mark,
                'orgType':orgType,
                'pay':pay,
                'noExam':noExam,
                'levNam':levNam
            };
            return jsonStr;
        }

        $("#hyd_year_toExcel").click(function () {
            var data  = {
                "batch":$("#hyd_year_batch").val(),
                "organ":$("#hyd_year_organ").val(),
                "hospCd":$('[name="hospCd"]').val(),
                "rptHospCd":$('[name="rptHospCd"]').val()
            }
            yearToExcel(data);
        })

        //根据条件去后台查询年度体检名单信息
        var loadTable = function (data) {
            //打开加载动画
            //加载弹窗
            loading = layer.load(1, {
                content: "<div style='margin-left:-30px;padding-top:60px;width:120px;color:#2b425b;'>正在查询请稍后...</div>",
                shade: [0.4, '#000']
            });

           var token= window.localStorage.getItem("health-login-cache-token");
            var cache=window.sessionStorage.getItem("health-login-cache");
            var reg = new RegExp("(^|&)roleIndex=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
            var r = window.location.search.substr(1).match(reg);  //匹配目标参数

            var jsonStr =  getMenu(data);
            //*** 执行api方法
            var api = {
                event:function(){
                    hdk.ajax({
                        // url: appconfig.ExamWork.YearQuery
                        api: "/api/login/test"
                        , data: JSON.stringify({"passWord": "123"})
                        // , headers: {
                        //     "token": token,
                        //     "roleid": JSON.parse(cache).roleDOList[unescape(r[2])].roleid
                        // }
                    },function (result) {
                            //关闭加载动画
                            layer.close(loading);
                            //初始化表格
                            table.render({
                                elem: '#yearexampersontb'
                                ,title:'年度体检名单'
                                ,data:result.data
                                ,page: true
                                ,limit:10
                                ,loading: true
                                ,cols: [
                                    [
                                        {field:'cd', title: '主键', sort: false, hide:true,  align: 'center',fixed:'left'},
                                        {field:'batch', title: '体检批次', sort: true,  align: 'center',fixed:'left'}
                                        ,{field:'organLevel', title: '机构性质',sort: false,  align: 'left',fixed:'left'}
                                        ,{field:'organName', title: '参建单位',sort:true,  align: 'center',fixed:'left'}
                                        ,{field:'psnName', title: '姓名',sort:false,  align: 'center',fixed:'left'}
                                        ,{field:'gender', title: '性别', sort:false, align: 'center',fixed:'left'}
                                        ,{field:'age', title: '年龄',sort:true, align: 'left', fixed:'left'}
                                        ,{field:'birth',title:'出生日期',sort:true ,align:'center',fixed:'left'}
                                        ,{field:'idenId',title:'身份证号',sort:false, align:'center'}
                                        ,{field:'medTreat',title:'医疗待遇',sort:false, align:'left'}
                                        ,{field:'psnLevel',title:'人员级别',sort:false, align:'center'}
                                        ,{field:'workType',title:'人员类型',sort:false, align:'left'}
                                        ,{field:'duty',title:'职务',sort:false, align:'center'}
                                        ,{field:'joinExam',title:'joinExam',sort:false, align:'center',hide:true}
                                        ,{field:'isLeader',title:'主要领导',sort:false, align:'center'}
                                        ,{field:'vipName',title:'特殊标记',sort:false, align:'left'}
                                        ,{field:'arrangeHospName',title:'安排体检医院',sort:false ,align:'left'}
                                        ,{field:'factHospName', title:'实际体检医院', sort:false ,align:'left'}
                                        ,{field:'scheduleCd',title:'是否安排',sort:false, align:'left'}
                                        ,{field:'scheduleDate',title:'安排日期',sort:true,align:'left'}
                                    ]
                                ]
                            });
                    });
                    form.render();
                }
            }
            api.event();
        }

        //导出数据到Excel后台()
        var yearToExcel = function (data) {

            //获取选中的值
            var batch = data.batch;
            var organ = data.organ;
            var hospCd = data.hospCd;
            var rptHospCd = data.rptHospCd;
            var typeNamStr = $('#hyd_year_typeNam .hyd-selected');
            var typeNamArr = [];
            $.each(typeNamStr,function (index,value) {
                typeNamArr.push($($('#hyd_year_typeNam .hyd-selected')[index]).attr('value'));
            });
            var typeNam = typeNamArr.join(',');

            var treatNamStr = $('#hyd_year_treatNam .hyd-selected');
            var treatNamArr = [];
            $.each(treatNamStr,function (index,value) {
                treatNamArr.push($($('#hyd_year_treatNam .hyd-selected')[index]).attr('value'));
            });
            var treatNam = treatNamArr.join(',');

            var markStr = $('#hyd_year_mark .hyd-selected');
            var markArr = [];
            $.each(markStr,function (index,value) {
                markArr.push($($('#hyd_year_mark .hyd-selected')[index]).attr('value'));
            });
            var mark = markArr.join(',');

            var zoneStr = $('#hyd_year_zone .hyd-selected');
            var zoneArr = [];
            $.each(zoneStr,function (index,value) {
                zoneArr.push($($('#hyd_year_zone .hyd-selected')[index]).attr('value'));
            });
            var zone = zoneArr.join(',');

            var orgTypeStr = $('#hyd_year_orgType .hyd-selected');
            var orgTypeArr = [];
            $.each(orgTypeStr,function (index,value) {
                orgTypeArr.push($($('#hyd_year_orgType .hyd-selected')[index]).attr('value'));
            });
            var orgType = orgTypeArr.join(',');

            var payStr = $('#hyd_year_pay .hyd-selected');
            var payArr = [];
            $.each(payStr,function (index,value) {
                payArr.push($($('#hyd_year_pay .hyd-selected')[index]).attr('value'));
            });
            var pay = payArr.join(',');

            var noExamStr = $('#hyd_year_noExam .hyd-selected');
            var noExamArr = [];
            $.each(noExamStr,function (index,value) {
                noExamArr.push($($('#hyd_year_noExam .hyd-selected')[index]).attr('value'));
            });
            var noExam = noExamArr.join(',');

            var levNamStr = $('#hyd_year_levNam .hyd-selected');
            var levNamArr = [];
            $.each(levNamStr,function (index,value) {
                levNamArr.push($($('#hyd_year_levNam .hyd-selected')[index]).attr('value'));
            });
            var levNam = levNamArr.join(',');

            window.open('_blank').location= appconfig.ExamWork.SaveExcel +
                "?batch="+batch+"&organ="+organ+"&hospCd="+hospCd+"&rptHospCd="+rptHospCd+
                "&typeNam="+typeNam+"&treatNam="+treatNam+"&noExam="+noExam+"&levNam="+levNam;
        }

    });



    exports('examwork/year_examperson', {})
});

