layui.define(function(exports){
    layui.use(['laydate','table','element','hdk','form','laytpl','appconfig'], function(){
        var $ = layui.$
        ,laydate = layui.laydate
        ,router = layui.router()
        ,table = layui.table
        ,setter = layui.setter
        ,form = layui.form
        ,element = layui.element
        ,hdk = layui.hdk
        ,admin = layui.admin
        ,laytpl=layui.laytpl
        ,params = {}
        ,headers = {}
        ,userInfo = {}
        ,appconfig = layui.appconfig
        ,thisTab = 0;

        var viewplanConfig={
            data: [
                {
                    hospitalCode: "yb1yy",
                    hospitalName: "宜宾市第一人民医院",
                    hospitalAddress: "市一医院主场：城区体检中心，文星街65号；非主场：南岸体检中心，南岸商贸路108号（沃尔玛旁）；联系",
                    levelData:[
                        {
                            levelCode:"01",
                            levelName:"厅级"
                        },{
                            levelCode:"02",
                            levelName:"县级"
                        }
                    ]
                },{
                    hospitalCode: "yb2yy",
                    hospitalName: "宜宾市第二人民医院",
                    hospitalAddress: "市二医院主场：南岸体检中心，蜀南大道133号（市委党校旁）；非主场：城区体检中心，北大街96号街 ；",
                    levelData:[
                        {
                            levelCode:"01",
                            levelName:"厅级"
                        },{
                            levelCode:"02",
                            levelName:"县级"
                        }
                    ]
                }
            ]
        };

        var examplancol=[[
            {field:'ExamDate',title:'安排日期', align:'center', minWidth:60, colspan:1}
            ,{field:'OrganName',title:'单位', align:'center', minWidth:80, colspan:1}
            ,{field:'HospitalPart',title:'院区', align:'center', minWidth:60, colspan:1}
            ,{field:'PersonNum',title:'体检人数', align:'center', minWidth:40, colspan:1}
        ]];

        var reportconfig=[
            {index:1,name:"查看体检项目",column:examplancol,url:"tj_person_hospital"},
            {index:2,name:"年度日程安排",column:examplancol,url:"examplan_organdate"},
            {index:3,name:"年度人员名单",column:examplancol,url:"tj_person_organ"},
            {index:4,name:"体检须知",column:examplancol,url:"examplan_notice"},
        ];
 
        var tableoption={
            page: true
            ,toolbar:true
            ,limit:10
            ,cellMinWidth:40
            ,loading: false
            ,cols:examplancol
            ,data:[]
        };
        //var hyd_table=table.render(tableoption);

        $('.health-query .multi-checkbox div',hdk.config.activeTab).on('click',function () {
            $(this).parent().children().removeClass("hyd-selected");
            $(this).toggleClass("hyd-selected");
        });

        var dymicTpl = $('#area-exam-plan',hdk.config.activeTab).html();

        var dymicView=document.getElementById('exam-plan-report-dymic');

        laytpl(dymicTpl).render(viewplanConfig, function(htmlresult){
            //console.log(htmlresult);
            //dymicView.html(htmlresult);
            dymicView.innerHTML=htmlresult;
        });

        function mergetablecell(datasource,tablecontainer) {
            var data = datasource.data;
            var mergeIndex = 0;//定位需要添加合并属性的行数
            var mark = 1; //这里涉及到简单的运算，mark是计算每次需要合并的格子数
            var columsName = ['ExamDate','OrganName'];//需要合并的列名称
            var columsIndex = [0,1];//需要合并的列索引值
        
            for (var k = 0; k < columsName.length; k++) { //这里循环所有要合并的列
                var trArr = $(".layui-table-body>.layui-table",tablecontainer).find("tr");//所有行
                    for (var i = 1; i < data.length; i++) { //这里循环表格当前的数据
                        var tdCurArr = trArr.eq(i).find("td").eq(columsIndex[k]);//获取当前行的当前列
                        var tdPreArr = trArr.eq(mergeIndex).find("td").eq(columsIndex[k]);//获取相同列的第一列
                        
                        if (data[i][columsName[k]] === data[i-1][columsName[k]]) { //后一行的值与前一行的值做比较，相同就需要合并
                            mark += 1;
                            tdPreArr.each(function () {//相同列的第一列增加rowspan属性
                                $(this).attr("rowspan", mark);
                            });
                            tdCurArr.each(function () {//当前行隐藏
                                $(this).css("display", "none");
                            });
                        }else {
                            mergeIndex = i;
                            mark = 1;//一旦前后两行的值不一样了，那么需要合并的格子数mark就需要重新计算
                        }
                    }
                mergeIndex = 0;
                mark = 1;
            }
        }

        var reportshow=function(){
            // var reportIndex=$('.multi-checkbox[hyd-name="quotaname"] .hyd-selected>span').attr("hyd-value");
            // console.log(reportIndex);
            // var findItem = $.grep(reportconfig, function(e){ return e.index == reportIndex; });
            var showItem=reportconfig[1];
            //if(findItem.length>0) showItem=findItem[0];
            
            $.ajax({
                url: '/mockup/'+showItem.url+'.json' 
                ,type: 'get'
                ,dataType: 'json'
                ,success: function(result){
                    //医院节点
                    $.each(result.data,function(hosIndex,hosItem){
                        var provinceData = $.grep(hosItem.OrganData, function(e){ 
                            return e.LevelName == "厅级"; 
                        });
                        provinceOption=$.extend({
                            elem: $('#tb-viewplan-'+hosItem.hospitalCode+'-01',hdk.config.activeTab)
                            ,title:hosItem.hospitalName+'-厅级-年度日程安排'
                            ,done: function(res, curr, count){
                                  mergetablecell(res,$('#div-viewplan-'+hosItem.hospitalCode+'-01',hdk.config.activeTab));
                            }
                            },tableoption);
                        provinceOption.data=provinceData;
                        table.render(provinceOption);

                        var countyData = $.grep(hosItem.OrganData, function(e){ 
                            return e.LevelName == "县级"; 
                        });
                        countyOption=$.extend({
                            elem: $('#tb-viewplan-'+hosItem.hospitalCode+'-02',hdk.config.activeTab)
                            ,title:hosItem.hospitalName+'-县级-年度日程安排'
                            ,done: function(res, curr, count){
                                mergetablecell(res,$('#div-viewplan-'+hosItem.hospitalCode+'-02',hdk.config.activeTab));
                            }
                            },tableoption);
                        countyOption.data=countyData;
                        table.render(countyOption);
                    });
                }
            });
        }

        //通过后端将数据导出到Excel
        $('#hyd_exam_toexcel').click(function () {
            //获取选中的体检计划和体检批次
            var tjjh = $('[hyd-name="quotaname"] .hyd-selected span').attr("hyd-value");
            var tjpc = $('[hyd-name="bathname"] .hyd-selected span').attr('hyd-value');
            switch (tjjh) {
                case '1':
                    //查看体检项目
                    window.open('_blank').location = appconfig.ExamWork.Project+"?batch="+tjpc;
                    break;
                case '2':
                    //年度日程安排
                    window.open('_blank').location = appconfig.ExamWork.Date+"?batch="+tjpc;
                    break;
                case '3':
                    //年度人员名单
                    window.open('_blank').location = appconfig.ExamWork.Person+"?batch="+tjpc;
                    break;
                case '4':
                    //体检须知
                    window.open('_blank').location = appconfig.ExamWork.Notice+"?batch="+tjpc;
                    break;
            }
        })

        //通过后端将所有数据导出到Excel
        $('#hyd_exam_toexcelAll').click(function () {
            window.open('_blank').location = appconfig.ExamWork.DateTest;
        })

        reportshow();
    });
    exports('examwork/exam_viewplan', {})
});
