//体检报告明细JS
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
        //获取从页面传递过来的参数
        var meprotData  = layui.admin.decryRouter().search;

        // 导出word(后端导出)
        $("#add_note_icon", hdk.config.activeTab).click(function (event) {
            //体检批次和体检编号并使用base64加密
            var batch  = Base64.encode(meprotData.batch);
            var indexNo = Base64.encode(meprotData.indexNo);

            //跳转并导出
            window.open('_blank').location= appconfig.Document.docMetoWord + "?batch="+batch+"&indexNo="+indexNo;
        });

        //根据体检批次 体检医院 体检编号查询体检报告
        //加载表格
        $.ajax({
            url:appconfig.Document.loadMePort
            ,type: 'post'
            ,dataType: 'json'
            ,data:{
                batch:meprotData.batch,
                indexNo:meprotData.indexNo,
            }
            ,success: function(result){
                //获得体检首页VO
                var mePortTopVO = result.data.mePortTopVO;

                //设置医院名称
                var hospNam = mePortTopVO.mePortDate.substring(0,mePortTopVO.mePortDate.indexOf('-'))+"年" +meprotData.hospNam+"体检报告";

                $('[name="hospNam"]', hdk.config.activeTab).append(hospNam);

                //为体检首页VO赋值
                $('[name="name"]', hdk.config.activeTab).append(mePortTopVO.name);
                $('[name="gender"]', hdk.config.activeTab).append(mePortTopVO.genderNam);
                $('[name="date"]', hdk.config.activeTab).append(mePortTopVO.mePortDate);
                $('[name="type"]', hdk.config.activeTab).append(mePortTopVO.mePortType);
                $('[name="indexNo"]', hdk.config.activeTab).append(mePortTopVO.indexNo);
                //为体检总结赋值
                $('[name="mePoCompletion"]', hdk.config.activeTab).append(result.data.mePoCompletion);
                //为体检建议赋值
                if(result.data.meSuggest!=null) {
                    $('#meSuggest_h2', hdk.config.activeTab).html('体检建议:');
                    $('[name="meSuggest"]', hdk.config.activeTab).append(result.data.meSuggest);
                }
                //获得体检二级菜单
                var secondaryMenuVOS = result.data.secondaryMenuVOS;
                var text = "<br/>";
                for(var i=0; i<secondaryMenuVOS.length; i++){
                    //二级菜单VO
                    var SecondaryMenuVO = secondaryMenuVOS[i];

                    /**
                     * 以下情况不显示科室 综合 体检项
                     */
                    if(SecondaryMenuVO.ksmc!=null&&SecondaryMenuVO.ksmc!='undefined'&&SecondaryMenuVO.thiGradeVOS.length>0) {
                        /**
                         * 以下情况不显示科室名称
                         * （1） 科室名称为null
                         *  (2)  科室名称在数据库为''
                         *  (3)  科室名称为 无
                         */
                        if (SecondaryMenuVO.ksmc != null && SecondaryMenuVO.ksmc != 'undefined'
                            && SecondaryMenuVO.ksmc != '无'&&SecondaryMenuVO.thiGradeVOS.length>0) {
                            text += "<div class='layui-col-md12' name='ksmc'><h3 name='title_font'>" + SecondaryMenuVO.ksmc + "</h3></div>&nbsp;<br/>";
                        }
                        /**
                         * 以下情况不显示综合名称
                         * （1） 科室名称和综合名称相同
                         * （2） 综合名称为 小结
                         * @type {string}
                         */
                        if (SecondaryMenuVO.zhmc != SecondaryMenuVO.ksmc && SecondaryMenuVO.zhmc != '小结' &&SecondaryMenuVO.zhmc != '无') {
                            text += "<div class='layui-col-md12' name='zhmc'><h5 name='title_font'>" + SecondaryMenuVO.zhmc + "</h5></div>";
                        }

                        /**
                         *  以下情况下不显示表格
                         * //如果体检小结不为null，添加后续综合名称，体检表格，体检小结
                         */
                        if (SecondaryMenuVO.minResult != '' && SecondaryMenuVO != null && SecondaryMenuVO.thiGradeVOS.length > 0) {

                            /**
                             *  /**
                             * 科室名称   ksmc;
                             * 综合名称   zhmc;
                             * 三级菜单集合(一次查询)  List<SubMenuVO> thiGradeVOS;
                             * 检查小结    minResult;
                             */
                            text += "<table class='layui-table' id='details_table'><tbody name='mePortTop'>";
                            text += "   <tr>\n" +
                                "      <th name='details_table_th_t1'>项目名称</th>\n" +
                                "      <th name='details_table_th_t2'>结果</th>\n" +
                                "      <th name='details_table_th_t3'>参考值</th>\n" +
                                "    </tr>";
                            var thiGradeVOS = SecondaryMenuVO.thiGradeVOS;
                            for (var j = 0; j < thiGradeVOS.length; j++) {
                                //获得索引中的subMenu集合
                                var subMenus = thiGradeVOS[j];
                                //判断当前列是否有异常
                                if(subMenus.jcycbz==""||subMenus.jcycbz==null||subMenus.jcycbz=='正常'||subMenus.jcycbz=='无') {
                                    text += " <tr><td name= 'proJeName' >" + subMenus.proJeName + "</td> " +
                                        "                                        <td name='result'>" + subMenus.result + "</td> " +
                                        "                                        <td name= 'reference' >";
                                    if (subMenus.reference != null && subMenus.reference!= '检查参考值') {
                                        text += subMenus.reference;
                                    }
                                    text += "</td></tr>";
                                }else {
                                    var bz = subMenus.jcycbz=="异常"?"*":subMenus.jcycbz;
                                    //当前列有异常
                                    text += " <tr name='deta_table_yc'><td name= 'proJeName' >" + subMenus.proJeName + "</td> " +
                                        "                                        <td name='result'><span name='jcycbz'>" + subMenus.result +bz+"</span></td>" +
                                        "                                        <td name= 'reference' >";
                                    if (subMenus.reference != null && subMenus.reference!= '检查参考值') {
                                        text += subMenus.reference;
                                    }
                                    text += "</td></tr>";
                                }
                            }
                            text += "</tbody></table>";
                            //添加小结:需要判定体检小结不等于null
                            if (SecondaryMenuVO.minResult != 'null' && SecondaryMenuVO.minResult != null &&SecondaryMenuVO.minResult != '') {
                                text += "<div class='layui-col-md12'><h5 style=\"font-weight:bold\" name='tjxj'>体检小结:</h5>" + SecondaryMenuVO.minResult + "</div>";
                            }else {
                                text += "<div class='lyaui-col-md12'><h5 style=\"font-weight:bold\" name='tjxj'>体检小结:  无</h5></div>";
                            }
                        }else {
                            text += "<div class='lyaui-col-md12'><h5 style=\"font-weight:bold\" name='tjxj'>体检小结:  无</h5></div>";
                        }
                        text += "<br/><hr/><br/>";
                    }
                };
                $('[name="secondary"]', hdk.config.activeTab).append(text);
            }
        });

    });
    exports('document/mePortDetails', {})
});
