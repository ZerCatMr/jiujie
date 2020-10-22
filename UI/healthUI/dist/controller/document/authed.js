layui.define(function(exports){
    
    layui.use(['laydate','table','element','hdk','form','appconfig'], function(){
        var $ = layui.$
        ,laydate = layui.laydate
        ,router = layui.router()
        ,table = layui.table
        ,setter = layui.setter
        ,form = layui.form
        ,element = layui.element
        ,hdk = layui.hdk
        ,admin = layui.admin
        ,appconfig = layui.appconfig;

         /**
         * 表单赋值
         */
        form.render();

        table.render({
            elem: '#area'
            ,url: appconfig.Document.area //模拟接口
            ,method: 'get'
            ,contentType: 'application/json'
            ,response: {
                statusCode: 200
                ,msgName: 'message'
            }
            ,page: true
            ,cols: [[
                {field: 'code', title: '地区编号', sort: true}
                ,{field: 'name', title: '地区名称',sort: true, align: 'center'}
                ,{field: 'province', title: '所属区县',width:180,sort: true, align: 'center'}
                ,{field: 'province', title: '所属乡镇',sort: true, align: 'center'}
                ,{field:'', title: '操作',toolbar:"#areabar",sort: true,align:'center'}
            ]]
        });

        $('[lay-filter=areaAdd]').on('click', function(o) {
            layer.open({
                title:'添加地区信息',
                type: 1,
                area: ['700px', '400px'],
                btn:['确定','取消'],
                content:$("#areaAdd").html()
                ,success: function(layero, index){
                    /**
                     * 加载下拉框数据
                     */
                    //加载区县下拉框的数据

                }
                ,yes:function (index,layero) {


                    form.on('submit()',function () {

                        return false;
                    })
                },
                btn2:function (index,layero) {
                    /**
                     * 新增取消按钮
                     */
                    parent.layer.close(index);
                }
            })
        });


        /***
         * 编辑按钮
         */
        table.on('tool(area_filter)', function(obj){
            var data = obj.data;
            if(obj.event === 'detail'){
                layer.open({
                    title:'编辑',
                    type: 1,
                    area: ['700px', '350px'],
                    btn:['确定','取消'],
                    content:$('#areaAdd').html(),
                    success: function(layero, index){

                        /**
                         * 表单赋值
                         */
                        form.render();
                    }
                    ,yes:function (index,layero) {

                        /**
                         * 编辑成功
                         */
                        layer.msg("编辑成功");
                    },
                    btn2:function (index,layero) {
                        /**
                         * 编辑取消按钮
                         */
                        parent.layer.close(index);
                    }
                })
            } else if(obj.event === 'del'){
                layer.confirm('确认停用', function(index){

                    /**
                     * 创建传入对象
                     */
                    /**
                     * 停用按钮事件
                     */
                    layer.msg("停用成功");
                });
            } else if(obj.event === 'edit'){
                layer.msg("启用成功");
            }
        });

    });
    exports('manage/area', {})
});
