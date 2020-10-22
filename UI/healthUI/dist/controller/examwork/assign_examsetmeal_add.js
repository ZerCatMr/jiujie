layui.define(function(exports){
    //指定体检套餐/编辑体检套餐
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
        //去重方法
        Array.prototype.clearRepeat = function () {
            var res = [];
            var json = {};
            $.each(this,function (i,item) {
                //this 表示当前待处理数据，this可能是一个集合或是一个单独字段
                if (!json[this.CateCdNam]) {
                    res.push(this);
                    json[this.CateCdNam] = 1;
                }
            });
            return res;
        };

        //创建测试数据源
        const testData2 = {
            "code": 1,
            "data": [{
                "bigId": "test222",
                "bigName": "套餐大项aaa",
                "smallObj": [{"smallId": "xx1", "smallName": "套餐小项bbb"}]
            },
                {
                    "bigId": "test1",
                    "bigName": "套餐大项bb",
                    "smallObj": [{"smallId": "xx2", "smallName": "套餐小项aaa"}, {
                        "smallId": "xx3",
                        "smallName": "套餐小项ccc"
                    }, {"smallId": "xx4", "smallName": "套餐小项dd"}, {"smallId": "xxe", "smallName": "套餐小项fff"}]
                }
                , {
                    "bigId": "test3", "bigName": "套餐大项ccc", "smallObj": [{"smallId": "s1", "smallName": "套餐小项s1"},
                        {"smallId": "s2", "smallName": "套餐小项s2"}, {
                            "smallId": "s3",
                            "smallName": "套餐小项s3"
                        }, {"smallId": "s4", "smallName": "套餐小项s4"},
                        {"smallId": "s5", "smallName": "套餐小项s5"}, {
                            "smallId": "s6",
                            "smallName": "套餐小项s6"
                        }, {"smallId": "s7", "smallName": "套餐小项s7"}]
                }]
        };
        const testData = {
            "code": 1,
            "data": [{
                "Cd": "EXItem000000002",
                "CateCd": "EXCATE001",
                "CateCdNam": "一般检查(内外、肛门指检、眼部、耳鼻喉口腔）",
                "Nam": "外科",
                "StCd": "启用",
                "SortNum": "2",
                "CreaCd": "HUser000000001",
                "CreTime": "2017-04-11 17:02:21",
                "State": "1"
            }, {
                "Cd": "EXItem000000003",
                "CateCd": "EXCATE001",
                "CateCdNam": "一般检查(内外、肛门指检、眼部、耳鼻喉口腔）",
                "Nam": "肛门指检",
                "StCd": "启用",
                "SortNum": "3",
                "CreaCd": "HUser000000001",
                "CreTime": "2017-04-11 17:02:39",
                "State": "1"
            }, {
                "Cd": "EXItem000000004",
                "CateCd": "EXCATE001",
                "CateCdNam": "一般检查(内外、肛门指检、眼部、耳鼻喉口腔）",
                "Nam": "眼部",
                "StCd": "启用",
                "SortNum": "4",
                "CreaCd": "HUser000000001",
                "CreTime": "2017-04-11 17:02:50",
                "State": "1"
            }, {
                "Cd": "EXItem000000005",
                "CateCd": "EXCATE001",
                "CateCdNam": "一般检查(内外、肛门指检、眼部、耳鼻喉口腔）",
                "Nam": "耳鼻喉口腔",
                "StCd": "启用",
                "SortNum": "5",
                "CreaCd": "HUser000000001",
                "CreTime": "2017-04-11 17:03:08",
                "State": "1"
            }, {
                "Cd": "EXItem000000006",
                "CateCd": "EXCATE004",
                "CateCdNam": "生化全套",
                "Nam": "肝功",
                "StCd": "启用",
                "SortNum": "1",
                "CreaCd": "HUser000000001",
                "CreTime": "2017-04-11 17:03:44",
                "LastModiCd": "LUser0000164",
                "LastModTime": "2017-04-14 15:53:19",
                "State": "1"
            }, {
                "Cd": "EXItem000000007",
                "CateCd": "EXCATE004",
                "CateCdNam": "生化全套",
                "Nam": "肾功",
                "StCd": "启用",
                "SortNum": "2",
                "CreaCd": "HUser000000001",
                "CreTime": "2017-04-11 17:03:54",
                "LastModiCd": "LUser0000164",
                "LastModTime": "2017-04-14 15:43:58",
                "State": "1"
            }, {
                "Cd": "EXItem000000008",
                "CateCd": "EXCATE004",
                "CateCdNam": "生化全套",
                "Nam": "血脂",
                "StCd": "启用",
                "SortNum": "3",
                "CreaCd": "HUser000000001",
                "CreTime": "2017-04-11 17:04:05",
                "LastModiCd": "HUser000000001",
                "LastModTime": "2017-04-11 17:06:00",
                "State": "1"
            }, {
                "Cd": "EXItem000000009",
                "CateCd": "EXCATE004",
                "CateCdNam": "生化全套",
                "Nam": "血糖",
                "StCd": "启用",
                "SortNum": "4",
                "CreaCd": "HUser000000001",
                "CreTime": "2017-04-11 17:04:14",
                "LastModiCd": "HUser000000001",
                "LastModTime": "2017-04-11 17:06:07",
                "State": "1"
            }, {
                "Cd": "EXItem000000010",
                "CateCd": "EXCATE004",
                "CateCdNam": "生化全套",
                "Nam": "微量元素钙镁磷等",
                "StCd": "启用",
                "SortNum": "5",
                "CreaCd": "HUser000000001",
                "CreTime": "2017-04-11 17:04:49",
                "LastModiCd": "HUser000000001",
                "LastModTime": "2017-04-11 17:06:19",
                "State": "1"
            }, {
                "Cd": "EXItem000000101",
                "CateCd": "ExItmCate000000201",
                "CateCdNam": "肿瘤十项",
                "Nam": "CEA",
                "StCd": "启用",
                "SortNum": "1",
                "CreaCd": "HUser000000001",
                "CreTime": "2017-04-12 10:19:19",
                "State": "1"
            }, {
                "Cd": "EXItem000000102",
                "CateCd": "ExItmCate000000201",
                "CateCdNam": "肿瘤十项",
                "Nam": "AFP",
                "StCd": "启用",
                "SortNum": "2",
                "CreaCd": "HUser000000001",
                "CreTime": "2017-04-12 10:19:34",
                "State": "1"
            }, {
                "Cd": "EXItem000000103",
                "CateCd": "ExItmCate000000201",
                "CateCdNam": "肿瘤十项",
                "Nam": "CA19-9",
                "StCd": "启用",
                "SortNum": "3",
                "CreaCd": "HUser000000001",
                "CreTime": "2017-04-12 10:19:49",
                "State": "1"
            }, {
                "Cd": "EXItem000000104",
                "CateCd": "ExItmCate000000201",
                "CateCdNam": "肿瘤十项",
                "Nam": "CA242",
                "StCd": "启用",
                "SortNum": "4",
                "CreaCd": "HUser000000001",
                "CreTime": "2017-04-12 10:20:01",
                "State": "1"
            }, {
                "Cd": "EXItem000000105",
                "CateCd": "ExItmCate000000201",
                "CateCdNam": "肿瘤十项",
                "Nam": "NSE",
                "StCd": "启用",
                "SortNum": "5",
                "CreaCd": "HUser000000001",
                "CreTime": "2017-04-12 10:20:15",
                "State": "1"
            }, {
                "Cd": "EXItem000000106",
                "CateCd": "ExItmCate000000201",
                "CateCdNam": "肿瘤十项",
                "Nam": "HGH",
                "StCd": "启用",
                "SortNum": "6",
                "CreaCd": "HUser000000001",
                "CreTime": "2017-04-12 10:20:23",
                "State": "1"
            }, {
                "Cd": "EXItem000000107",
                "CateCd": "ExItmCate000000201",
                "CateCdNam": "肿瘤十项",
                "Nam": "FERRITIN",
                "StCd": "启用",
                "SortNum": "7",
                "CreaCd": "HUser000000001",
                "CreTime": "2017-04-12 10:20:47",
                "State": "1"
            }, {
                "Cd": "EXItem000000108",
                "CateCd": "ExItmCate000000201",
                "CateCdNam": "肿瘤十项",
                "Nam": "CA125",
                "StCd": "启用",
                "SortNum": "8",
                "CreaCd": "HUser000000001",
                "CreTime": "2017-04-12 10:21:00",
                "State": "1"
            }, {
                "Cd": "EXItem000000109",
                "CateCd": "ExItmCate000000201",
                "CateCdNam": "肿瘤十项",
                "Nam": "CA15-3",
                "StCd": "启用",
                "SortNum": "9",
                "CreaCd": "HUser000000001",
                "CreTime": "2017-04-12 10:21:13",
                "State": "1"
            }, {
                "Cd": "EXItem000000110",
                "CateCd": "ExItmCate000000201",
                "CateCdNam": "肿瘤十项",
                "Nam": "男性：F-PSA",
                "StCd": "启用",
                "SortNum": "10",
                "CreaCd": "HUser000000001",
                "CreTime": "2017-04-12 10:21:45",
                "State": "1"
            }, {
                "Cd": "EXItem000000111",
                "CateCd": "ExItmCate000000201",
                "CateCdNam": "肿瘤十项",
                "Nam": "女性：β-HCG",
                "StCd": "启用",
                "SortNum": "11",
                "CreaCd": "HUser000000001",
                "CreTime": "2017-04-12 10:22:47",
                "State": "1"
            }, {
                "Cd": "EXItem000000201",
                "CateCd": "EXCATE001",
                "CateCdNam": "一般检查(内外、肛门指检、眼部、耳鼻喉口腔）",
                "Nam": "内科",
                "StCd": "启用",
                "SortNum": "5",
                "CreaCd": "LUser0000164",
                "CreTime": "2017-04-14 15:33:28",
                "LastModiCd": "LUser0000164",
                "LastModTime": "2017-04-14 15:33:36",
                "State": "1"
            }, {
                "Cd": "EXItem000000301",
                "CateCd": "EXCATE007",
                "CateCdNam": "腹部彩超全套",
                "Nam": "上腹部",
                "StCd": "启用",
                "SortNum": "1",
                "CreaCd": "wsj002",
                "CreTime": "2019-03-13 12:53:34",
                "State": "1"
            }, {
                "Cd": "EXItem000000302",
                "CateCd": "EXCATE007",
                "CateCdNam": "腹部彩超全套",
                "Nam": "下腹部",
                "StCd": "启用",
                "SortNum": "2",
                "CreaCd": "wsj002",
                "CreTime": "2019-03-13 12:53:45",
                "State": "1"
            }, {
                "Cd": "EXItem000000303",
                "CateCd": "ExItmCate000000401",
                "CateCdNam": "神经系统",
                "Nam": "同型半胱氨酸",
                "StCd": "启用",
                "SortNum": "1",
                "CreaCd": "wsj002",
                "CreTime": "2019-03-13 12:59:41",
                "State": "1"
            }, {
                "Cd": "EXItem000000304",
                "CateCd": "ExItmCate000000401",
                "CateCdNam": "神经系统",
                "Nam": "糖化血红蛋白",
                "StCd": "启用",
                "SortNum": "2",
                "CreaCd": "wsj002",
                "CreTime": "2019-03-13 12:59:56",
                "State": "1"
            }, {
                "Cd": "EXItem000000305",
                "CateCd": "ExItmCate000000401",
                "CateCdNam": "神经系统",
                "Nam": "颈动脉彩超",
                "StCd": "启用",
                "SortNum": "3",
                "CreaCd": "wsj002",
                "CreTime": "2019-03-13 13:00:08",
                "State": "1"
            }, {
                "Cd": "EXItem000000306",
                "CateCd": "ExItmCate000000401",
                "CateCdNam": "神经系统",
                "Nam": "头颅CT",
                "StCd": "启用",
                "SortNum": "4",
                "CreaCd": "wsj002",
                "CreTime": "2019-03-13 13:00:19",
                "State": "1"
            }, {
                "Cd": "EXItem000000307",
                "CateCd": "ExItmCate000000402",
                "CateCdNam": "心脑血管",
                "Nam": "心肌酶",
                "StCd": "启用",
                "SortNum": "1",
                "CreaCd": "wsj002",
                "CreTime": "2019-03-13 13:00:34",
                "State": "1"
            }, {
                "Cd": "EXItem000000308",
                "CateCd": "ExItmCate000000402",
                "CateCdNam": "心脑血管",
                "Nam": "心脏彩超",
                "StCd": "启用",
                "SortNum": "2",
                "CreaCd": "wsj002",
                "CreTime": "2019-03-13 13:00:52",
                "State": "1"
            }, {
                "Cd": "EXItem000000309",
                "CateCd": "ExItmCate000000402",
                "CateCdNam": "心脑血管",
                "Nam": "颈动脉彩超",
                "StCd": "启用",
                "SortNum": "3",
                "CreaCd": "wsj002",
                "CreTime": "2019-03-13 13:01:04",
                "State": "1"
            }, {
                "Cd": "EXItem000000310",
                "CateCd": "ExItmCate000000402",
                "CateCdNam": "心脑血管",
                "Nam": "肌钙蛋白",
                "StCd": "启用",
                "SortNum": "4",
                "CreaCd": "wsj002",
                "CreTime": "2019-03-13 13:01:15",
                "State": "1"
            }, {
                "Cd": "EXItem000000311",
                "CateCd": "ExItmCate000000403",
                "CateCdNam": "消化系统",
                "Nam": "幽门螺杆菌C14呼吸试验",
                "StCd": "启用",
                "SortNum": "1",
                "CreaCd": "wsj002",
                "CreTime": "2019-03-13 13:01:38",
                "State": "1"
            }, {
                "Cd": "EXItem000000312",
                "CateCd": "ExItmCate000000403",
                "CateCdNam": "消化系统",
                "Nam": "胃功能",
                "StCd": "启用",
                "SortNum": "2",
                "CreaCd": "wsj002",
                "CreTime": "2019-03-13 13:01:53",
                "State": "1"
            }, {
                "Cd": "EXItem000000313",
                "CateCd": "ExItmCate000000403",
                "CateCdNam": "消化系统",
                "Nam": "CA72-4",
                "StCd": "启用",
                "SortNum": "3",
                "CreaCd": "wsj002",
                "CreTime": "2019-03-13 13:02:04",
                "State": "1"
            }, {
                "Cd": "EXItem000000314",
                "CateCd": "ExItmCate000000403",
                "CateCdNam": "消化系统",
                "Nam": "大便常规",
                "StCd": "启用",
                "SortNum": "4",
                "CreaCd": "wsj002",
                "CreTime": "2019-03-13 13:02:17",
                "State": "1"
            }, {
                "Cd": "EXItem000000315",
                "CateCd": "ExItmCate000000403",
                "CateCdNam": "消化系统",
                "Nam": "隐血",
                "StCd": "启用",
                "SortNum": "5",
                "CreaCd": "wsj002",
                "CreTime": "2019-03-13 13:02:27",
                "State": "1"
            }, {
                "Cd": "EXItem000000316",
                "CateCd": "ExItmCate000000403",
                "CateCdNam": "消化系统",
                "Nam": "肝纤维化监测",
                "StCd": "启用",
                "SortNum": "6",
                "CreaCd": "wsj002",
                "CreTime": "2019-03-13 13:02:39",
                "State": "1"
            }, {
                "Cd": "EXItem000000317",
                "CateCd": "ExItmCate000000404",
                "CateCdNam": "内分泌系统",
                "Nam": "糖化血红蛋白",
                "StCd": "启用",
                "SortNum": "1",
                "CreaCd": "wsj002",
                "CreTime": "2019-03-13 13:02:55",
                "State": "1"
            }, {
                "Cd": "EXItem000000318",
                "CateCd": "ExItmCate000000404",
                "CateCdNam": "内分泌系统",
                "Nam": "颈动脉彩超",
                "StCd": "启用",
                "SortNum": "2",
                "CreaCd": "wsj002",
                "CreTime": "2019-03-13 13:03:06",
                "State": "1"
            }, {
                "Cd": "EXItem000000319",
                "CateCd": "ExItmCate000000404",
                "CateCdNam": "内分泌系统",
                "Nam": "尿微量蛋白",
                "StCd": "启用",
                "SortNum": "3",
                "CreaCd": "wsj002",
                "CreTime": "2019-03-13 13:03:17",
                "State": "1"
            }, {
                "Cd": "EXItem000000320",
                "CateCd": "ExItmCate000000404",
                "CateCdNam": "内分泌系统",
                "Nam": "甲功三项",
                "StCd": "启用",
                "SortNum": "4",
                "CreaCd": "wsj002",
                "CreTime": "2019-03-13 13:03:28",
                "State": "1"
            }, {
                "Cd": "EXItem000000321",
                "CateCd": "ExItmCate000000404",
                "CateCdNam": "内分泌系统",
                "Nam": "β2微球蛋白",
                "StCd": "启用",
                "SortNum": "5",
                "CreaCd": "wsj002",
                "CreTime": "2019-03-13 13:03:38",
                "State": "1"
            }, {
                "Cd": "EXItem000000322",
                "CateCd": "ExItmCate000000404",
                "CateCdNam": "内分泌系统",
                "Nam": "眼底照相",
                "StCd": "启用",
                "SortNum": "6",
                "CreaCd": "wsj002",
                "CreTime": "2019-03-13 13:03:49",
                "State": "1"
            }, {
                "Cd": "EXItem000000323",
                "CateCd": "ExItmCate000000405",
                "CateCdNam": "运动系统",
                "Nam": "颈椎CT(C4-C7)",
                "StCd": "启用",
                "SortNum": "1",
                "CreaCd": "wsj002",
                "CreTime": "2019-03-13 13:04:05",
                "State": "1"
            }, {
                "Cd": "EXItem000000324",
                "CateCd": "ExItmCate000000405",
                "CateCdNam": "运动系统",
                "Nam": "腰椎CT(L3-D1)",
                "StCd": "启用",
                "SortNum": "2",
                "CreaCd": "wsj002",
                "CreTime": "2019-03-13 13:04:16",
                "State": "1"
            }, {
                "Cd": "EXItem000000325",
                "CateCd": "ExItmCate000000406",
                "CateCdNam": "妇科",
                "Nam": "女性激素",
                "StCd": "启用",
                "SortNum": "1",
                "CreaCd": "wsj002",
                "CreTime": "2019-03-13 13:04:28",
                "State": "1"
            }, {
                "Cd": "EXItem000000326",
                "CateCd": "ExItmCate000000406",
                "CateCdNam": "妇科",
                "Nam": "HPV",
                "StCd": "启用",
                "SortNum": "2",
                "CreaCd": "wsj002",
                "CreTime": "2019-03-13 13:04:39",
                "State": "1"
            }],
            "count": 47
        }
        //自定义按钮的点击事件
        $('.health-query .multi-checkbox div',hdk.config.activeTab).on('click',function (){
            $(this).siblings().removeClass("hyd-selected");
            $(this).toggleClass("hyd-selected");
        });

        //初始化表单
        form.render();
        //加载右侧体检大项列表
        function loadRightDiv() {
            var rightData = testData.data.clearRepeat();
            //加载体检项目列表
            var rightDiv = '';
            //第一次遍历  添加大项
            for (let k = 0; k < rightData.length; k++) {
                rightDiv += '<div class="bellows__item list-group-item tinted" draggable="false" id="right'+rightData[k].CateCd+'">' +
                    '           <div class="bellows__header"  CreaNam="'+rightData[k].CateCdNam+'" CreaCd="'+rightData[k].CateCd+'">' +
                    '             <h4 >'+rightData[k].CateCdNam+'</h4>' +
                    '           </div>' +
                    '        <div class="bellows__content-wrapper" aria-hidden="true" style="display: none;">' +
                    '        <div class="bellows__content layui-btn-container" aria-hidden="false">';
                //第二次遍历 添加小项
                for (let s = 0; s < testData.data.length; s++) {
                    if(rightData[k].CateCdNam===testData.data[s].CateCdNam){
                        rightDiv += '<div id="'+testData.data[s].Cd+'" class="bllows_small layui-btn layui-btn-sm" hidden>' + testData.data[s].Nam+ '</div>';
                    }
                }
                rightDiv += '</div></div></div>';
            }
            $("#examwork_assignexamsetmeal_add #add_right_setmeal").append(rightDiv);
            //加载拖拽事件
            var divId = document.getElementById('add_right_setmeal');
            new Sortable(divId, {
                group: {
                    name:'examsetmeal'
                    //,pull: 'clone'
                    ,handle: '.handle' // 只拖拽部分手型效果
                    ,put: false
                }
                ,animation: 150
                ,sort: false
            });

        }
        //加载左侧指定体检套餐列表
        function loadLeftDiv() {
            const data = testData2.data;
            let leftDiv = '';
            for(let i=0;i<data.length; i++){
                const bigID = data[i].bigId;
                const bigName = data[i].bigName;
                leftDiv += '<div class="left_setmeal list-group-item tinted layui-col-md12">' +
                    '<div class="big layui-col-md4">' +
                    '  <span class="big_name" bigId="'+bigID+'">'+bigName+'</span>' +
                    '  <span class="big_del"><i class="layui-icon layui-icon-close-fill"></i></span>' +
                    '</div>' +
                    '<div class="small layui-col-md8">';
                //添加体检小项
                for(let j=0; j<data[i].smallObj.length; j++){
                    const smallId = data[i].smallObj[j].smallId;
                    const smallName = data[i].smallObj[j].smallName;
                    leftDiv += '<div class="layui-col-md4 left_small">' +
                        '<span class="small_center" smallid="'+smallId+'">'+smallName+'</span>' +
                        '<span class="escalate_sort" data-title="升序"><i class="layui-icon layui-icon-up" style="font-size: 18px;font-weight: bold;"></i></span>' +
                        '<span class="dell_sort" data-title="移除"><i class="layui-icon layui-icon-close" style="font-size: 18px;font-weight:bold;"></i></span>' +
                        '</div>';
                }
                leftDiv += '</div></div>';
            }
            $("#add_left_center_setmeal").append(leftDiv);
            let divId = document.getElementById('add_left_center_setmeal');
            new Sortable(divId, {
                group: {
                    name:'examsetmeal'
                    //,pull: 'clone'
                    ,handle: '.handle' // 只拖拽部分手型效果
                }
                ,animation: 150
                ,onAdd: function (event, ui) {
                    rightDivToLeft(event, ui, divId)
                }
                ,onEnd: function (event) {
                    updateLeftDiv(event, divId);
                }
            });

        }
        loadRightDiv();
        loadLeftDiv();

        //监听右侧体检项目列表的展开与缩放
        $(document).on("click", ".bellows__header", function () {
            let state = $(this).parent().find(".bellows__content-wrapper").css("display");
            if(state==='block'){
                $(this).parent().find(".bellows__content-wrapper").css("display","none");
            }else {
                $(this).parent().find(".bellows__content-wrapper").css("display","block");
            }
        });

        //点击title区域的编辑
        $('#examwork_assignexamsetmeal_add [name="title_icon"]').click(function () {
            //获取title中的文本框
            let title = $(this).parent().find('[name="title_size"]').html();
            $('#examwork_assignexamsetmeal_add [name="title_input"] input').attr("value", title);
            $('#examwork_assignexamsetmeal_add [name="title_center"]').css("display", "none");
            $('#examwork_assignexamsetmeal_add [name="title_input"]').css("display", "block");
            $('#examwork_assignexamsetmeal_add [name="title_button"]').css("display", "block");
        });
        //点击title区域的取消
        $('#examwork_assignexamsetmeal_add #add_title_cancel').click(function () {
            //获取title中的文本框
            let title = $(this).parent().find('[name="title_size"]').html();
            $('#examwork_assignexamsetmeal_add [name="title_center"]').css("display", "block");
            $('#examwork_assignexamsetmeal_add [name="title_input"]').css("display", "none");
            $('#examwork_assignexamsetmeal_add [name="title_button"]').css("display", "none");
        });
        //点击title区域的确认
        $('#examwork_assignexamsetmeal_add #add_title_submit').click(function () {
            //获取title中的文本框
            let title = $(this).parent().find('[name="title_size"]').html();
            //去后台保存最新名称...
            //去前端切换UI显示
            $('#examwork_assignexamsetmeal_add [name="title_center"]').css("display", "block");
            $('#examwork_assignexamsetmeal_add [name="title_input"]').css("display", "none");
            $('#examwork_assignexamsetmeal_add [name="title_button"]').css("display", "none");
        });

        //右侧体检大项拖动到左侧套餐列表中
        function rightDivToLeft(event, ui, divId) {
            //拖拽的当前对象
            let item = event.item;
            //拖拽前的父对象
            let target = event.from;
            //获得当前拖拽对象的 套餐大项和套餐小项 大项编码 大项名称 小项编码 小项名称
            var bigId = $(item).find('.bellows__header').attr("CreaCd");
            var bigNam = $(item).find('.bellows__header').attr("CreaNam");
            var smallObj = $(item).find('.bllows_small');
            var smallArr = new Array();
            for(var i=0; i<smallObj.length; i++){
                var small = {
                    "smallId": $(smallObj[i]).attr("id"),
                    "smallNam": $(smallObj[i]).html
                }
                smallArr.push(small);
            }
            console.log("请求到后台增加套餐大项及小项");

            //发送Ajax请求到后台增加体检大项和小项...
            //后台请求完成，重新渲染页面
        }
        //左侧体检大项排序
        function updateLeftDiv(event, divId) {
            //拖拽的当前对象
            let item = event.item;
            //拖拽前的父对象
            let target = event.from;
            //拖拽后的父对象
            let to = event.to;
            //获得当前拖拽对象的 套餐大项和套餐小项 大项编码 大项名称 小项编码 小项名称
            var bigId = $(item).find('.bellows__header').attr("CreaCd");
            var bigNam = $(item).find('.bellows__header').attr("CreaNam");
            var smallObj = $(item).find('.bllows_small');
            var smallArr = new Array();
            for(var i=0; i<smallObj.length; i++){
                var small = {
                    "smallId": $(smallObj[i]).attr("id"),
                    "smallNam": $(smallObj[i]).html
                }
                smallArr.push(small);
            }
            alert("请求到后台改变排序")
        }
        //左侧体检小项排序
        $("#examwork_assignexamsetmeal_add .left_center .escalate_sort").click(function () {
            var smallId = $(this).parent().find(".small_center").attr("smallid");
            var smallName = $(this).parent().find(".small_center").html();
            var bigId = $(this).parent().parent().parent().find(".big_name").attr("bigid");
            var bigName = $(this).parent().parent().parent().find(".big_name").html();
            //发送ajax到后台改变当前排序
            console.log("this is sort change escalate:"+ smallId);
        });
        //删除左侧体检小项
        $("#examwork_assignexamsetmeal_add .left_center .dell_sort").click(function () {
           var smallId = $(this).parent().find(".small_center").attr("smallid");
           var smallName = $(this).parent().find(".small_center").html();
           var bigId = $(this).parent().parent().parent().find(".big_name").attr("bigid");
           var bigName = $(this).parent().parent().parent().find(".big_name").html();
            $(this).parent().remove();
           //发送ajax到后台改变当前排序
            console.log("this is sort change reduce:"+smallId);
        });
        //删除左侧体检套餐
        $("#examwork_assignexamsetmeal_add .left_center .big_del i").click(function () {
            $(this).parent().parent().parent().remove();
            //获取要删除的体检大项编码和所有体检小项编码
            let bigId =  $(this).parent().prev().attr("bigid");
            //到后台移除套餐大项及套餐内所有小项
            console.log("del this leftCenter div:"+ bigId);
        });
        //右侧添加体检小项
        $("#examwork_assignexamsetmeal_add .bellows__content .bllows_small").click(function () {
           //获取当前的小项名称和编号 大项名称和编号
            let smallId = $(this).attr("id");
            let smallName = $(this).html();
            let bigName = $(this).parent().parent().prev().attr("creanam");
            let bigId = $(this).parent().parent().prev().attr("creacd");

            $(this).remove();
            //发送到Ajax到后台更新数据...
            //到UI更新页面...
            const jsonStr = {
                "smallId": smallId,
                "smallName": smallName,
                "bigId": bigId,
                "bigName": bigName
            }
            //到UI更新页面...
            console.log("右侧套餐小项添加到左侧"+JSON.stringify(jsonStr))
        });
    });
    exports('examwork/assign_examsetmeal_add', {})
});
