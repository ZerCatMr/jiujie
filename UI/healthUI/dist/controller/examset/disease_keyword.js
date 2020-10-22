layui.define(function(exports) {
	layui.use(['laydate', 'table', 'element', 'hdk', 'form', 'tool', 'appconfig', 'layedit'], function() {
		var $ = layui.$,
			laydate = layui.laydate,
			router = layui.router(),
			table = layui.table,
			setter = layui.setter,
			form = layui.form,
			element = layui.element,
			hdk = layui.hdk,
			tool = layui.tool,
			admin = layui.admin,
			params = {},
			headers = {},
			layedit = layui.layedit,
			userInfo = {},
			thisTab = 0,
			appconfig = layui.appconfig;


		/**
		 * 关键词分类部分
		 * 
		 * */


		//监听tab点击事件
		$('.health-query .multi-checkbox div', hdk.config.activeTab).on('click', function() {
			$(this).siblings().removeClass("hyd-selected");
			$(this).addClass("hyd-selected");
		
			var index = $(this).attr("hyd-value");
			var html = $("#add_button_html").html();
			var button_box = $("#orgin_manage_add");
		});

		//建立编辑器
		$("#keyworld_box").click(function() {
			var keyword = $("#keyworld_box");
			var text = keyword.html();
			keyword.remove();
			$("#demo").val(text);

			//建立编辑器
			var index = layedit.build('demo', {
				height: 380 ,//设置编辑器高度
				tool: []
			});
			$("#demo").css("lineHeight","80px");
			//save_keyworld
			$("#save_keyworld").addClass("hyd-selected");
		});
		
		//保存信息
		$("#save_keyworld").click(function(){
			//移除编辑器
			var keyword = $("#keyworld_box");
			var text_edit =  $("#demo");
			var text = text_edit.val();
			text_edit.remove();
			keyword.val(text);
			console.log("获得值",text);
			//
			$("#save_keyworld").removeClass("hyd-selected");
		});

		//初始化键词分类表格表头
		var keyworldcate_table = table.render({
			elem: '#disease_keyworldcate_table',
			url: '../../mockup/disease_keyword_cate.json',
			cols: [
				[ //表头
					{
						field: 'cateid',
						title: '序号',
						width: '24.6%'
					} //24.6
					, {
						field: 'name',
						title: '名称',
						width: '44.8%'
					} //44.8
					, {
						field: 'status',
						title: '状态',
						align: 'center',
						width: '12.8%', //8.4
						templet: function(d) {
							if (d.status == 1) {
								return '<input type="checkbox"  id="' + d.id +
									'" name="open"   lay-skin="switch"  lay-filter="cate_switch" checked>'
							} else if (d.status == 0) {
								return '<input type="checkbox"  id="' + d.id +
									'" name="open" lay-skin="switch"  lay-filter="cate_switch">'
							} else {
								return ''
							}
						}
					}, {
						field: '',
						title: '操作',
						align: 'center',
						templet: '#examset_diseasekeywordcatetable_bloder'
					}
				]
			]
		});

		//渲染关键词分类表格数据
		function getcatedata() {
			//初始化信息
			hdk.ajax({
				api: appconfig.ExamSet.ExamProject.QueryExamProjectCate,
				data: {}
			}, function(res) {
				tableshow(res.data);
				$('.health-filter.health-filter-input input[name="cate_search"]', hdk.config.activeTab).keyup(function() {
					filterdata = tool.filterArray($(this).val(), res.data);
					tableshow(filterdata);
				});
				$("table").width("100%");
			});
		};

		//表格数据重载渲染
		function tableshow(data) {
			keyworldcate_table.reload({
				data: data
			});
		};

		//加载数据
		getcatedata();

		//监听工具条
		table.on('tool(disease_keyworldcate_table)', function(obj) {
			var data = obj.data;
			var layEvent = obj.event;
			if (layEvent === "query") {
				getKeyworld(data);
			} else if (layEvent === "edit") {
				layer.open({
					type: 1,
					title: '修改关键词分类',
					area: ['390px', '300px'],
					content: $("#examset_diseasekeyworldcate_editlayer").html(),
					success: function(layero, index) {}
				});
			}
		});

		//监听新增关键词分类
		$('#add_disease_keyworldcate').click(function() {
			layer.open({
				type: 1,
				title: "新增关键词分类",
				area: ['390px', '300px'],
				content: $("#examset_diseasekeyworldcate_addlayer").html(),
				success: function(layero, index) {}
			});
		});

		//监听表格开关状态
		form.on('switch(cate_switch)', function(obj) {
			var msg = this.checked ? "打开" : "关闭";
			layer.msg(msg, {
				offset: '6px'
			});
		});

		/**
		 * 关键词部分
		 * 
		 * */

		//初始化关键词表格表头
		var keyworld_table = table.render({
			elem: '#disease_keyworld_table',
			cols: [
				[ //表头
					{
						field: 'itemorder',
						title: '序号',
						width: '24.6%'
					} //24.6
					, {
						field: 'name',
						title: '名称',
						width: '44.8%'
					} //44.8
					, {
						field: 'status',
						title: '状态',
						align: 'center',
						width: '12.8%', //8.4
						templet: function(d) {
							if (d.status == 1) {
								return '<input type="checkbox"  id="' + d.id +
									'" name="open"   lay-skin="switch"  lay-filter="switchTest" checked>'
							} else if (d.status == 0) {
								return '<input type="checkbox"  id="' + d.id +
									'" name="open" lay-skin="switch"  lay-filter="switchTest">'
							} else {
								return ''
							}
						}
					}, {
						field: '',
						title: '操作',
						align: 'center',
						templet: '#examset_diseasekeywordtable_bloder'
					}
				]
			]
		});

		//获得后台数据
		function getKeyworld(data) {
			//初始化信息
			hdk.ajax({
				api: appconfig.ExamSet.ExamProject.QueryExamProjectByCate,
				data: JSON.stringify(data)
			}, function(res) {
				keyworldshow(res.data);
				$('.health-filter.health-filter-input input[name="keyworld-search"]', hdk.config.activeTab).keyup(function() {
					filterdata = tool.filterArray($(this).val(), res.data);
					keyworldshow(filterdata);
				});
				$("table").width("100%");
			});
		};

		//表格数据重载渲染
		function keyworldshow(data) {
			keyworld_table.reload({
				data: data
			});
		};
		keyworldshow([]);

		//监听工具条
		table.on('tool(disease_keyworld_table)', function(obj) {
			var data = obj.data;
			var layEvent = obj.event;
			if (layEvent == 'edit') {
				//编辑弹窗
				layer.open({
					type: 1,
					title: '修改关键词分类',
					area: ['390px', '300px'],
					content: $("#examset_diseasekeyworld_editlayer").html(),
					success: function(layero, index) {}
				});
			}
		});

		//监听新增关键词
		$('#add_disease_keyworld').click(function() {
			layer.open({
				type: 1,
				title: "新增关键词分类",
				area: ['390px', '300px'],
				content: $("#examset_diseasekeyworld_addlayer").html(),
				success: function(layero, index) {}
			});
		});

	});
	exports('examset/disease_keyword', {})
});
