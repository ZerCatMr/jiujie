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
        ,thisTab = 0;

        //获取从页面传递过来的参数
        var searchData = layui.admin.decryRouter().search;


        var userName = searchData.nam;
        var genderCd = searchData.genderCdNam;
        var birthDay = searchData.birth;
        var identId = searchData.idenID;
        var typeName = searchData.typeCdNam;
        var levelName = searchData.levelName;
        var medTreatName = searchData.treatCdNam;
        var phone = searchData.phone;
        var examOrganName = searchData.examOrganName;
        var duty = searchData.duty;
        if(userName=='undefined'||userName=='null'){
            userName = '无';
        }
        if(genderCd=='undefined'||genderCd=='null'){
            genderCd = '无'
        }
        if(birthDay=='undefined'||birthDay=='null'){
            birthDay = '无'
        }
        if(identId=='undefined'||identId=='null'){
            identId = '无'
        }
        if(typeName=='undefined'||typeName=='null'){
            typeName = '无'
        }
        if(levelName=='undefined'||levelName=='null'){
            levelName = '无'
        }
        if(medTreatName=='undefined'||medTreatName=='null'){
            medTreatName = '无'
        }
        if(phone=='undefined'||phone=='null'){
            phone = '无'
        }
        if(examOrganName=='undefined'||examOrganName=='null'||examOrganName==''){
            examOrganName = '无'
        }
        if(duty=='null'||duty=='undefined'||duty==''){
            duty = '无'
        }

        //为当前用户赋值
        $('[name="userName"]',hdk.config.activeTab).html(userName);
        $('[name="genderCd"]',hdk.config.activeTab).html(genderCd);
        $('[name="birthDay"]',hdk.config.activeTab).html(birthDay);
        $('[name="identId"]',hdk.config.activeTab).html(identId);
        $('[name="typeName"]', hdk.config.activeTab).html(typeName);
        $('[name="levelName"]', hdk.config.activeTab).html(levelName);
        $('[name="medTreatName"]', hdk.config.activeTab).html(medTreatName);
        $('[name="phone"]', hdk.config.activeTab).html(phone);
        $('[name="examOrganName"]', hdk.config.activeTab).html(examOrganName);
        $('[name="duty"]', hdk.config.activeTab).html(duty);

        table.render({
            id:searchData.cd,
            elem: $('[name="tjbg_table"]',hdk.config.activeTab) //指定原始表格元素选择器（推荐id选择器）
            ,height: 315 //容器高度
            ,cols: [{}] //设置表头
            //,…… //更多参数参考右侧目录：基本参数选项
        });

        //加载当前用户的体检报告
        function loadUserByReport() {
            $.ajax({
                url: appconfig.Document.queryDocMePort
                ,type: 'post'
                ,async:false
                ,dataType: 'json'
                ,data:{
                    psnCd:searchData.cd
                }
                ,success: function(result){
                    //添加当前用户的体检报告
                    var data = result.data;
                    if(data==''){
                        $('#doc_Report_All', hdk.config.activeTab).append('<div class="nodoc_tips layui-col-md3 layui-col-sm3">' +
                            '<div class="hyd-card-panel layadmin-contact-box">' +
                            '<h3 ">当前用户无体检报告</h3></div></div>')
                        //show档案基本信息
                        $(".layui-card-body", hdk.config.activeTab).attr("class", "layui-card-body");
                    }
                    for(var i=0; i<data.length; i++){
                        var indexDO = data[i];
                        //获得体检年份
                        var year = indexDO.healthYear+"年";
                        //获得报告日期
                        var date = indexDO.healthTime.substr(0,indexDO.healthTime.lastIndexOf(" "));
                        var batchNam = indexDO.batchNam == null?"无":indexDO.batchNam;
                        var hospNam = indexDO.hospNam;
                        var indexNo = indexDO.indexNo;

                        var divStr =
                            "<div class='layui-col-md3 layui-col-sm6 layui-col-xs12' style='border: 1px;solid-color:red'>" +
                            "  <div class='persondocument_card'>" +
                            "<div class='per_col'>" +
                            "  <div class='per_header'>" +
                            "                        <div class='per_hospNam'><font>"+hospNam+"</font></div>" +
                            "                        <div class='per_data'><font>"+date+"</font></div>" +
                            "                </div>" +
                            "                <div class='per_center'>" +
                            "                    <br/>" +
                            "                    <div class='center_lin'>" +
                            "                        <span class='lin_userName'>"+userName+"</span>" +
                            "                        &nbsp;" +
                            "                        <span>"+genderCd+"</span>" +
                            "                    </div>" +
                            "                    <br/>" +
                            "<div class='center_lin'><span>出生日期:"+birthDay+"</span></div><br/>" +
                            "                    <div class='center_lin'>" +
                            "                        <span>享受待遇:"+medTreatName+"</span>" +
                            "                        <span>在职离职:"+typeName+"</span>" +
                            "                    </div>" +
                            "                    <br/>" +
                            "                    <div class='center_lin'>" +
                            "                        <span>职务: "+duty+"</span>" +
                            "                    </div>" +
                            "                    <br/>" +
                            "                    <div class='center_lin'>" +
                            "                        <span name='index'>体检批次: "+year+"</span>" +
                            "                    </div>" +
                            "                </div>" +
                            "                <div class='per_tail' name='queryMePort'" +
                            " batch='"+batchNam+"' indexNo='"+indexNo+"' hospNam='"+hospNam+"' userNam='"+userName+"' year='"+year+"'>" +
                            "                    <div class='per_btn'>查看体检报告</div>" +
                            "                </div>" +
                            "</div></div></div>";
                        $('#doc_Report_All' ,hdk.config.activeTab).append(divStr);
                    }
                }
            })
        }
        loadUserByReport();



        //查看当前用户的指定体检报告详情
        $('[name="queryMePort"]', hdk.config.activeTab).click(function () {


            var indexNo = $(this).attr('indexNo');
            var hospNam = $(this).attr("hospNam");
            var userNam = $(this).attr("userNam");
            var year = $(this).attr("year");
            year = year.substr(0, year.lastIndexOf("年"));

            //跳转到mePortDetails详情页
            admin.urlenhash('document/mePortDetails$view:'+year+'/title='+year+"年"+userNam+'体检报告/indexNo='+indexNo+
            '/batch='+year+'/hospNam='+hospNam);
        });

        //show或关闭当前lab的档案信息
        $('#query_per_doc', hdk.config.activeTab).click(function () {

            if($("#per_doc_cardBody", hdk.config.activeTab).css("display")!="none"){
                $("#per_doc_cardBody", hdk.config.activeTab).css("display","none");
            }else{
                $("#per_doc_cardBody", hdk.config.activeTab).css("display","block");
            };
        });






    });
    exports('document/persondocument', {})
});
