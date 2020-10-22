//<!-- 体检管理/体检项目维护-->
layui.define(function(exports) {
	layui.use(['laydate', 'table', 'element', 'hdk', 'form', 'tool', 'appconfig'], function() {
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
			userInfo = {},
			thisTab = 0,
			appconfig = layui.appconfig,
			cateList = [];
		//自定义按钮点击事件
		$("button[lay-filter='hyd-query']", hdk.config.activeTab).on('click', function() {
			var reqdata = {
				worktype: $('div[hyd-name="worktype"]>div.hyd-selected>span', hdk.config.activeTab).attr("hyd-value") || '',
				medtreat: $('div[hyd-name="medtreat"]>div.hyd-selected>span', hdk.config.activeTab).attr("hyd-value") || '',
				authstatus: $('div[hyd-name="authstatus"]>div.hyd-selected>span', hdk.config.activeTab).attr("hyd-value") ||
					'',
				personname: $('input[name="personname"]', hdk.config.activeTab).val(),
				personIdenNo: $('input[name="personIdenNo"]', hdk.config.activeTab).val()
			}

		});
		$('.health-query .multi-checkbox div', hdk.config.activeTab).on('click', function() {
			$(this).siblings().removeClass("hyd-selected");
			$(this).toggleClass("hyd-selected");
		});




		//初始化表头
		var projectmaintain_table = table.render({
			elem: '#examset_projectmaintain_table',
			limit: 30, //显示的数量
			cols: [
				[ //表头
					{
						field: 'cateorder',
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
						templet: '#examset_projectmaintaintable_bloder'
					}
				]
			],

		});

		//渲染表格数据
		function getdata() {
			//初始化信息
			hdk.ajax({
				api: appconfig.ExamSet.ExamProject.QueryExamProjectCate,
				data: {}
			}, function(res) {
				tableshow(res.data);
				$('.health-filter.health-filter-input input[name="health-search"]', hdk.config.activeTab).keyup(function() {
					filterdata = tool.filterArray($(this).val(), res.data);
					tableshow(filterdata);
				});
				$("table").width("100%");
			});
		};

		//表格数据重载渲染
		function tableshow(data) {
			cateList = data;
			projectmaintain_table.reload({
				data: data
			});
		};
		getdata();


		//当前双击事件
		table.on('rowDouble(examset_projectmaintain_table)', function(obj) {
			var data = obj.data;
			layer.alert(JSON.stringify(data), {
				title: '当前行数据：'
			});
			//标注选中样式
			obj.tr.addClass('layui-table-click').siblings().removeClass('layui-table-click');

		})


		//新增体检分类按钮
		$('#examset_project_maintain [id="add_projectcate"]').click(function() {
			getExamCateMaxOrder(function(res) {
				let order = res.data + 1;
				layer.open({
					type: 1,
					title: '新增体检分类',
					area: ['390px', '300px'],
					content: $("#examset_projectmaintain_addlayer").html(),
					success: function(layero, index) {
						$('input[name="addcate_order"]').val(order);
					}
				});
			});

		});

		//新增体检项目按钮
		$('#examset_project_maintain [id="add_project"]').click(function() {
			QueryExamProjMaxOrder(function(res) {
				let order = res.data + 1;
				layer.open({
					type: 1,
					title: '新增体检项目',
					area: ['390px', '300px'],
					content: $("#examset_projectdetail_addlayer").html(),
					success: function(layero, index) {
						// 填充选择框
						var sel = document.getElementById("project_check");
						for (var i = 0; i < cateList.length; i++) {
							var opt = new Option();
							opt.value = cateList[i].id;
							opt.text = cateList[i].name;
							sel.append(opt);
						}
						form.render('select');
						
						//填充序号
						$('input[name="add_project_order"]').val(order);
					}
				});
				$(".layui-layer-page .layui-layer-content").css("overflow", "visible");
			});
		});

		//初始化体检分类明细表头
		var project_table = table.render({
			elem: '#examset_projectdetail_table',
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
								return '<input type="checkbox" name="open" id="' + d.id +
									'"  lay-skin="switch" lay-filter="switch_detail_status" checked>'
							} else if (d.status == 0) {
								return '<input type="checkbox" name="open" id="' + d.id +
									'"  lay-skin="switch" lay-filter="switch_detail_status">'
							} else {
								return ''
							}
						}
					}, {
						field: '',
						title: '操作',
						align: 'center',
						templet: '#examset_projectdetailtable_bloder'
					}
				]
			]
		});

		//监听工具条
		table.on('tool(examset_projectmaintain_table)', function(obj) {
			var data = obj.data;
			var layEvent = obj.event;
			if (layEvent === "query") {
				getExamProjectByCate(data)
			} else if (layEvent === "edit") {
				//编辑弹窗
				layer.open({
					type: 1,
					title: '编辑体检分类详情',
					area: ['390px', '300px'],
					content: $("#examset_projectmaintain_editlayer").html(),
					success: function(layero, index) {
						$('input[name="projectcate_order"]').val(data.cateorder);
						$('input[name="projectcate_id"]').val(data.id);
						$('input[name="projectcate_name"]').val(data.name);
					}
				});
			}
		});

		//活动体检分类明细列表
		function getExamProjectByCate(data) {
			console.log(data);
			hdk.ajax({
					api: appconfig.ExamSet.ExamProject.QueryExamProjectByCate,
					data: JSON.stringify(data)
				},
				function(res) {
					projectshow(res.data);
					$('.health-filter.health-filter-input input[name="health-project"]', hdk.config.activeTab).keyup(function() {
						filterdata = tool.filterArray($(this).val(), res.data);
						projectshow(filterdata);
					});
					$("table").width("100%");
				});
		}

		//重载体检分类明细表格
		function projectshow(data) {
			project_table.reload({
				data: data
			});
		};

		//页面加载时初始化体检分类明细
		projectshow([]);

		//监听工具条
		table.on('tool(examset_projectdetail_table)', function(obj) {
			var data = obj.data;
			var layEvent = obj.event;
			if (layEvent == 'edit') {
				//编辑弹窗
				layer.open({
					type: 1,
					title: '编辑体检疾病详情',
					id: "exam_cate_edit",
					area: ['390px', '300px'],
					content: $("#examset_projectdetail_editlayer").html(),
					success: function(layero, index) {
						$('input[name="edit_project_id"]').val(data.id);
						$('input[name="edit_project_name"]').val(data.name);
						$('input[name="edit_project_cateid"]').val(data.cateid);
						$('input[name="edit_project_order"]').val(data.itemorder);
						
					}
				});
			}
		});
		add_project

		//监听项目分类开关
		form.on('switch(switchTest)', function(obj) {
			var data = {
				id: obj.elem.attributes['id'].nodeValue,
				status: this.checked ? 1 : 0
			};
			updataExamById(data, 1, function() {});
		});

		//监听项目分类明细开关
		form.on('switch(switch_detail_status)', function(obj) {
			var data = {
				id: obj.elem.attributes['id'].nodeValue,
				status: this.checked ? 1 : 0
			};
			updataExamById(data, 2, function() {});
		});

		//监听体检分类编辑提交
		form.on('submit(formCate)', function(res) {
			var info = res.field;
			var data = {
				id: info.projectcate_id,
				name: info.projectcate_name,
				status: -1
			};
			updataExamById(data, 1, function() {
				//关闭弹窗
				setTimeout(function() {
					layer.closeAll();
					//更新数据
				}, 500);
				getdata();
			});

		});

		//监听体检分类明细编辑
		form.on('submit(formDetail)', function(res) {
			var info = res.field;
			var cateid = info.edit_project_cateid;
			var data = {
				id: info.edit_project_id,
				name: info.edit_project_name,
				status: -1
			};
			updataExamById(data, 2, function() {
				//关闭弹窗
				setTimeout(function() {
					layer.closeAll();
				}, 500);
				getExamProjectByCate({
					id: cateid
				});
			});
		});

		//监听体检分类新增提交
		form.on('submit(addcateSubmit)', function(res) {
			var info = res.field;
			var cateid = info.project_hide;
			var data = {
				name: info.addcate_name,
				cateorder: info.addcate_order
			};
			addExamCate(data, 1, function() {
				//关闭弹窗
				setTimeout(function() {
					layer.closeAll();
				}, 500);
				getdata();
			});
		});

		//监听体检项目新增提交
		form.on('submit(addSubmit)', function(res) {
			var info = res.field;
			var cateid = info.add_project_cateid;
			if(cateid=='请选择'){
				layer.msg("请选择项目分类", {
					offset: '6px'
				});
				return;
			}
			var data = {
				cateid: cateid,
				name: info.add_project_name,
				itemorder: info.add_project_order
			};
			addExamCate(data, 2, function() {
				//关闭弹窗
				setTimeout(function() {
					layer.closeAll();
				}, 500);
				getExamProjectByCate({
					id: cateid
				});
			});
		});

		//编辑体检分类和明细 type：1 分类 2 明细
		function updataExamById(data, type, callback) {
			var cateApi = appconfig.ExamSet.ExamProject.UpdateExamProjectCate;
			var projectApi = appconfig.ExamSet.ExamProject.UpdateExamProject;
			hdk.ajax({
				api: type == 1 ? cateApi : projectApi,
				data: JSON.stringify(data)
			}, function(res) {
				layer.msg(res.msg, {
					offset: '6px'
				});
				callback();
			});
		};

		//新增体检分类和明细 type：1 分类 2 明细
		function addExamCate(data, type, callback) {
			var cateApi = appconfig.ExamSet.ExamProject.AddProjectCate;
			var projectApi = appconfig.ExamSet.ExamProject.AddExamProject;
			hdk.ajax({
				api: type == 1 ? cateApi : projectApi,
				data: JSON.stringify(data)
			}, function(res) {
				layer.msg(res.msg, {
					offset: '6px'
				});
				callback();
			});
		};

		//查询体检项目分类的最大排序数
		function getExamCateMaxOrder(callback) {
			hdk.ajax({
					api: appconfig.ExamSet.ExamProject.QueryExamProjectCateMaxOrder,
					data: {}
				},
				function(res) {
					callback(res);
				});
		};

		//查询体检项目最大的排序数
		function QueryExamProjMaxOrder(callback) {
			hdk.ajax({
					api: appconfig.ExamSet.ExamProject.QueryExamProjectMaxOrder,
					data: {}
				},
				function(res) {
					callback(res);
				});
		};
	});
	exports('examset/project_maintain', {})
});
