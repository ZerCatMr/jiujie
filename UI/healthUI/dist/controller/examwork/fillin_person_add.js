layui.define(function (exports) {
    //干保办体检工作/填报人员名单/新增填报人员名单
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
            , thisTab = 0
            , laypage = layui.laypage
            , appconfig = layui.appconfig;
        form.render();
        //初始化假数据 int totalPage = (totalRows+pageSize-1)/pageSize;
        let testData = [
            {
                "userName":"李四",
                "userAge":"47",
                "userStatus": "已填报",
                "userGender": "女",
                "examMark": "参检",
                "examLevel": "正厅级",
                "duty": "副县长",
                "vipMark": "VIP",
                "idCard":"510000*********",
                "phone":"18100009999",
                "exaltype":"实职",
                "status": "退休",
                "examMeal": ["套餐A"],
                "hosp":"四川省人民医院"
            },
            {
                "userName":"张先生",
                "userAge":"38",
                "userStatus": "填报中",
                "userGender": "男",
                "examMark": "参检",
                "examLevel": "处级",
                "duty": "局长",
                "vipMark": "VIP",
                "status":"离休",
                "idCard":"510000*********",
                "phone":"18100009999",
                "exaltype":"享受待遇",
                "examMeal": ["套餐B", "套餐C"],
                "hosp":"四川大学华西医院"
            },
            {
                "userName":"张三三",
                "userAge":"22",
                "userStatus": "未填报",
                "userGender": "男",
                "examMark": "参检",
                "examLevel": "副县级",
                "duty": "科长",
                "vipMark": "",
                "idCard":"510000*********",
                "phone":"18100009999",
                "exaltype":"实职",
                "status":"在职",
                "examMeal": ["套餐A", "套餐B", "套餐C"],
                "hosp":"四川省人民医院"
            },
            {
                "userName":"张三三",
                "userAge":"22",
                "userStatus": "未填报",
                "userGender": "男",
                "examMark": "参检",
                "examLevel": "省级",
                "duty": "科长",
                "vipMark": "",
                "idCard":"510000*********",
                "phone":"18100009999",
                "exaltype":"实职",
                "status":"在职",
                "examMeal": ["套餐A", "套餐B", "套餐C"],
                "hosp":"四川省人民医院"
            },
            {
                "userName":"张三三",
                "userAge":"22",
                "userStatus": "未填报",
                "userGender": "男",
                "examMark": "参检",
                "examLevel": "副县级",
                "duty": "科长",
                "vipMark": "",
                "idCard":"510000*********",
                "phone":"18100009999",
                "exaltype":"实职",
                "status":"在职",
                "examMeal": ["套餐A", "套餐B", "套餐C"],
                "hosp":"四川省人民医院"
            },
            {
                "userName":"张三三",
                "userAge":"22",
                "userStatus": "未填报",
                "userGender": "男",
                "examMark": "参检",
                "examLevel": "省级",
                "duty": "科长",
                "vipMark": "",
                "idCard":"510000*********",
                "phone":"18100009999",
                "exaltype":"实职",
                "status":"在职",
                "examMeal": ["套餐A", "套餐B", "套餐C"],
                "hosp":"四川省人民医院"
            },
            {
                "userName":"张三三",
                "userAge":"22",
                "userStatus": "未填报",
                "userGender": "男",
                "examMark": "参检",
                "examLevel": "副县级",
                "duty": "科长",
                "vipMark": "",
                "idCard":"510000*********",
                "phone":"18100009999",
                "exaltype":"实职",
                "status":"在职",
                "examMeal": ["套餐A", "套餐B", "套餐C"],
                "hosp":"四川省人民医院"
            },
            {
                "userName":"张三三",
                "userAge":"22",
                "userStatus": "未填报",
                "userGender": "男",
                "examMark": "参检",
                "examLevel": "副县级",
                "duty": "科长",
                "vipMark": "",
                "idCard":"510000*********",
                "phone":"18100009999",
                "exaltype":"实职",
                "status":"在职",
                "examMeal": ["套餐A", "套餐B", "套餐C"],
                "hosp":"四川省人民医院"
            }, {
                "userName":"张三三",
                "userAge":"22",
                "userStatus": "未填报",
                "userGender": "男",
                "examMark": "参检",
                "examLevel": "副县级",
                "duty": "科长",
                "vipMark": "",
                "idCard":"510000*********",
                "phone":"18100009999",
                "exaltype":"实职",
                "status":"在职",
                "examMeal": ["套餐A", "套餐B", "套餐C"],
                "hosp":"四川省人民医院"
            },
            {
                "userName":"张三三",
                "userAge":"22",
                "userStatus": "未填报",
                "userGender": "男",
                "examMark": "参检",
                "examLevel": "副县级",
                "duty": "科长",
                "vipMark": "",
                "idCard":"510000*********",
                "phone":"18100009999",
                "exaltype":"实职",
                "status":"在职",
                "examMeal": ["套餐A", "套餐B", "套餐C"],
                "hosp":"四川省人民医院"
            }, {
                "userName":"张三三",
                "userAge":"22",
                "userStatus": "未填报",
                "userGender": "男",
                "examMark": "参检",
                "examLevel": "副县级",
                "duty": "科长",
                "vipMark": "",
                "idCard":"510000*********",
                "phone":"18100009999",
                "exaltype":"实职",
                "status":"在职",
                "examMeal": ["套餐A", "套餐B", "套餐C"],
                "hosp":"四川省人民医院"
            },
            {
                "userName":"李胜利 ",
                "userAge":"22",
                "userStatus": "未填报",
                "userGender": "男",
                "examMark": "参检",
                "examLevel": "副县级",
                "duty": "科长",
                "vipMark": "",
                "idCard":"510000*********",
                "phone":"18100009999",
                "exaltype":"实职",
                "status":"在职",
                "examMeal": ["套餐A", "套餐B", "套餐C"],
                "hosp":"四川省人民医院",
                "divStatus":"删除",
            }, {
                "userName":"王德发",
                "userAge":"22",
                "userStatus": "未填报",
                "userGender": "男",
                "examMark": "参检",
                "examLevel": "副县级",
                "duty": "科长",
                "vipMark": "",
                "idCard":"510000*********",
                "phone":"18100009999",
                "exaltype":"实职",
                "status":"在职",
                "examMeal": ["套餐A", "套餐B", "套餐C"],
                "hosp":"四川省人民医院",
                "divStatus": "新增"
            }
            ,{
                "userName":"T1",
                "userAge":"24",
                "userStatus": "未填报",
                "userGender": "男",
                "examMark": "参检",
                "examLevel": "副县级",
                "duty": "科长",
                "vipMark": "",
                "idCard":"510000*********",
                "phone":"18100009999",
                "exaltype":"实职",
                "status":"在职",
                "examMeal": ["套餐A", "套餐B", "套餐C"],
                "hosp":"四川省人民医院",
                "divStatus": "新增"
            },
            {
                "userName":"T2",
                "userAge":"25",
                "userStatus": "已填报",
                "userGender": "男",
                "examMark": "参检",
                "examLevel": "副科级",
                "duty": "局长",
                "vipMark": "",
                "idCard":"510000*********",
                "phone":"18100009999",
                "exaltype":"实职",
                "status":"退休",
                "examMeal": ["套餐B", "套餐C"],
                "hosp":"四川省人民医院"
            }, {
                "userName":"T3",
                "userAge":"26",
                "userStatus": "未填报",
                "userGender": "女",
                "examMark": "参检",
                "examLevel": "副县级",
                "duty": "科长",
                "vipMark": "",
                "idCard":"510000*********",
                "phone":"18100009999",
                "exaltype":"享受待遇",
                "status":"离休",
                "examMeal": [''],
                "hosp":"四川省人民医院"
            },
            {
                "userName":"T4",
                "userAge":"35",
                "userStatus": "已填报",
                "userGender": "女",
                "examMark": "不参检",
                "examLevel": "县级",
                "duty": "科长",
                "vipMark": "",
                "idCard":"510000*********",
                "phone":"18100009999",
                "exaltype":"实职",
                "status":"离休",
                "examMeal": [''],
                "hosp":"四川大学华西医院"
            },
            {
                "userName":"T5",
                "userAge":"26",
                "userStatus": "未填报",
                "userGender": "女",
                "examMark": "参检",
                "examLevel": "副县级",
                "duty": "科长",
                "vipMark": "",
                "idCard":"510000*********",
                "phone":"18100009999",
                "exaltype":"享受待遇",
                "status":"离休",
                "examMeal": [''],
                "hosp":"四川省人民医院"
            }
        ]

        //监听顶部自定义按钮的点击事件
        $('.health-query .multi-checkbox div',hdk.config.activeTab).on('click',function () {
            $(this).siblings().removeClass("hyd-selected");
            $(this).toggleClass("#examwork_fillinperson_add hyd-selected");
            let checkStr = "";
            for (let i = 0; i < $("#examwork_fillinperson_add .hyd-selected").length; i++) {
                checkStr += $("#examwork_fillinperson_add .hyd-selected").eq(i).find("span").html() + " ";
            }
            loadUserByReport(tool.filterArray(checkStr, testData));
        });
        //监听筛选框
        $('#examwork_fillinperson_add input[name="health-search"]', hdk.config.activeTab).keyup(function () {
            loadUserByReport(tool.filterArray($(this).val(), testData));
        });

        //遍历并添加到页面上
        function loadUserByReport(data){
            //先清除之前的所有数据
            $("#examwork_fillinperson_add").find("#center_card_main").empty();
            //初始化分页条
            laypage.render({
                elem: 'fillin_person_add_page' //注意，这里的 test1 是 ID，不用加 # 号
                ,count: data.length //数据总数，从服务端得到
                ,limit:16//每页显示数量
                ,jump: function (obj, first) {
                    let thisPage = obj.curr;
                    //使得当前页显示,其他页码隐藏
                    $('#examwork_fillinperson_add #center_card_main [thisPage="'+thisPage+'"]').css("display", "block");
                    $('#examwork_fillinperson_add #center_card_main .userDiv:not([thisPage="'+thisPage+'"])').css("display", "none");
                }
            });
            for(let i=0; i<data.length; i++){
                const thisDO = data[i];
                var borderName = null;
                var fillinStatus = thisDO.divStatus;
                //计算当前页码  当前页码数 = (当前条数/每页显示条数)向上取整
                var page= Math.ceil((i+1)/16);
                switch (fillinStatus){
                    case "新增":
                        borderName = "addDiv";
                        break;
                    case "删除":
                        borderName = "delDiv";
                        break;
                    default:
                        borderName = "ordinaryDiv";
                        break
                };
                var userDiv =
                    '<div class="userDiv" divName="' + borderName + '" thisPage="' + page + '" style="display: block">' +
                    '<div class="userDiv_head">' +
                    '<div class="layui-col-md12 name=line_0">' +
                    '<div class="layui-col-md4 left">' +
                    '<div name="username">' + thisDO.userName + '</div>' +
                    '</div>' +
                    '<div class="layui-col-md4 center">' +
                    '<span name="gender">' + thisDO.userGender + '</span>&nbsp;&nbsp;&nbsp;<span name="age">' + thisDO.userAge + '</span>' +
                    '</div>' +
                    '<div class="layui-col-md4 right"><div  name="status">' + thisDO.userStatus + '</div>' +
                    '</div>' +
                    '</div>' +
                    '</div>' +
                    '<div class="userDiv_body">' +
                    '<div class="layui-col-md12" name="line_1">' +
                    '<div class="layui-col-md3 username" name="col">' + thisDO.duty + '</div>' +
                    '<div class="layui-col-md3 age" name="col">' + thisDO.examLevel + '</div>' +
                    '<div class="layui-col-md3 age" name="col">' + thisDO.status + '</div>' +
                    '</div>' +
                    '<div class="layui-col-md12" name="line_2">' +
                    '<div class="examMark" name="col">' + thisDO.idCard + '</div>' +
                    '</div>' +
                    '<div class="layui-col-md12" name="line_3">' +
                    '<div class="examMark" name="col">' + thisDO.phone + '</div>' +
                    '</div>' +
                    '<div class="layui-col-md12" name="line_4">' +
                    '<div class="layui-col-md4 username" name="col">' + thisDO.exaltype + '</div>' +
                    '<div class="layui-col-md3 age" name="col">' + thisDO.examMark + '</div>' +
                    '<div class="layui-col-md3 age" name="col">' + thisDO.vipMark + '</div>' +
                    '</div>' +
                    '<div class="layui-col-md12" name="line_5">' +
                    '<div class="examMark" name="col">' + thisDO.hosp + '</div>' +
                    '</div>' +
                    '<div class="layui-col-md12" name="line_6">' +
                    '<div class="examMark" name="col">' + thisDO.examMeal[0] + '</div>' +
                    '</div>' +
                    '</div>' +
                    '<div class="userDIv_bottom">' +
                    '<div class="layui-col-md12" name="line_7"><div style="margin:5px">' +
                    '<div class="layui-btn layui-btn-primary edit_user" style="height: 30px;line-height: 30px; margin-left: 20px;">编辑</div>' +
                    '<div class="layui-btn layui-btn-primary remove_user" style="height: 30px; line-height: 30px;">减少</div>' +
                    '</div>' +
                    '</div>' +
                    '</div>' +
                    '</div>';
                $('#examwork_fillinperson_add #center_card_main', hdk.config.activeTab).append(userDiv);
                //默认只显示第一页的数据
                $('#examwork_fillinperson_add #center_card_main [thisPage="1"]').css("display", "block");
                $('#examwork_fillinperson_add #center_card_main .userDiv:not([thisPage="1"])').css("display", "none");
            }
        }
        loadUserByReport(testData);
        form.render();
        //点击选中div事件
        $('#examwork_fillinperson_add').find('.userDiv').click(function () {
            if($(this).find('.userDiv_head .layui-form-checkbox').hasClass('layui-form-checked')){
                $(this).find('.userDiv_head .layui-form-checkbox').removeClass('layui-form-checked')
            }else {
                $(this).find('.userDiv_head .layui-form-checkbox').addClass('layui-form-checked')
            }
        })
        //点击导入用户
        $("#import_user").click(function () {
            //打开新增用户弹窗
            layer.open({
                type: 1,
                title: '导入人员信息',
                btn: ['确认','关闭'],
                area: ['700px', '550px'],
                content: $("#examworkfillinpersonadd_addperson_layer",hdk.config.activeTab).html(),
                success: function () {
                    //加载表单
                    form.render();
                }
            });
        });
        //点击减少用户
        $('#examwork_fillinperson_add').find('.remove_user').click(function () {
            //打开减少人员弹窗
            layer.open({
                type: 1,
                title: '减少人员信息',
                btn: ['确认','关闭'],
                area: ['700px', '550px'],
                btnAlign: 'c',
                content: $("#examworkfillinpersonadd_dellperson_layer", hdk.config.activeTab).html(),
                success: function () {
                }
            });
        })
        //点击编辑人员详情
        $('#examwork_fillinperson_add').find('.edit_user').click(function () {
            //打开编辑用户弹窗
            layer.open({
                type: 1,
                title: '编辑人员信息',
                btn: ['确认','关闭'],
                area: ['800px', '600px'],
                content: $("#examworkfillinpersonadd_editperson_layer", hdk.config.activeTab).html(),
                btnAlign: 'c',
                success: function (layero, index) {
                    //加载表单和日期选择器
                    form.render();
                    laydate.render({
                        elem: '#birthDate' //指定元素
                    });
                }
            });
        });
        //点击保存按钮
        $("#examwork_fillinperson_add").find("#save").click(function () {
            //弹出询问框
            //打开确认管理员信息弹窗
            layer.open({
                type: 1,
                title: '确认联络方式',
                btn: ['确认','关闭'],
                area: ['700px', '550px'],
                content: $("#examworkfillinpersonadd_confirmmanage_layer",hdk.config.activeTab).html(),
                success: function () {
                    //加载表单
                    form.render();
                }
            });
            //去后台
        });
        //点击取消按钮
        $("#examwork_fillinperson_add").find("#cancel").click(function () {
            //关闭当前页面
            admin.closeThisTabs();
        });
        //点击编辑管理人员信息
        $('#examwork_fillinperson_add').find('#top_card [name="left/right"] a').click(function () {
            layer.open({
                type: 1,
                title: '编辑人员信息',
                btn: ['确认','关闭'],
                area: ['700px', '550px'],
                content: $("#examworkfillinpersonadd_editmanage_layer", hdk.config.activeTab).html()
            });
        });
    });
    exports('examwork/fillin_person_add', {})
});
