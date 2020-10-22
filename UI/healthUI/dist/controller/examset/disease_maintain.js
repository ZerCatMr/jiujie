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
				authstatus: $('div[hyd-name="authstatus"]>div.hyd-selected>span', hdk.config.activeTab).attr("hyd-value") || '',
				personname: $('input[name="personname"]', hdk.config.activeTab).val(),
				personIdenNo: $('input[name="personIdenNo"]', hdk.config.activeTab).val()
			}

		});
		$('.health-query .multi-checkbox div', hdk.config.activeTab).on('click', function() {
			$(this).siblings().removeClass("hyd-selected");
			$(this).toggleClass("hyd-selected");
		});

		//初始化表格
		var diseasemaintain_table = table.render({
			elem: '#examset_diseasemaintain_table',
			limit: 30,
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
								return '<input type="checkbox" name="open" id="' + d.id +
									'" lay-skin="switch" lay-filter="switchTest" checked>'
							} else if (d.status == 0) {
								return '<input type="checkbox" name="open" id="' + d.id +
									'" lay-skin="switch" lay-filter="switchTest">'
							} else {
								return ''
							}
						}
					}, {
						field: '',
						title: '操作',
						align: 'center',
						templet: '#examset_diseasemaintaintable_bloder'
					} //181  814  22.2
				]
			]
		});

		//渲染表格数据
		function getDiseaseCate() {
			//初始化信息
			hdk.ajax({
				api: appconfig.ExamSet.ExamProject.QueryDiseaseCate,
				data: {}
			}, function(res) {
				diseaseCateShow(res.data);
				$('.health-filter.health-filter-input input[name="health-search"]', hdk.config.activeTab).keyup(function() {
					filterdata = tool.filterArray($(this).val(), res.data);
					diseaseCateShow(filterdata);
				});
				$("table").width("100%");
			});
		};

		//表格数据重载渲染
		function diseaseCateShow(data) {
			cateList = data;
			diseasemaintain_table.reload({
				data: data
			});
		};

		getDiseaseCate();

		//新增疾病分类按钮
		$('#examset_projectmaintain [id="addcate"]').click(function() {
			//打开弹窗
			layer.open({
				type: 1,
				title: '新增体检分类',
				area: ['390px', '300px'],
				content: $("#examset_projectmaintain_addlayer").html(),
				success: function(layero, index) {}
			});
		});

		//监听工具条
		table.on('tool(examset_diseasemaintain_table)', function(obj) { //注：tool 是工具条事件名，test 是 table 原始容器的属性 lay-filter="对应的值"
			var data = obj.data; //获得当前行数据
			var layEvent = obj.event; //获得 lay-event 对应的值（也可以是表头的 event 参数对应的值）
			var tr = obj.tr; //获得当前行 tr 的 DOM 对象（如果有的话）
			if (layEvent === "query") {
				//打开弹窗
				layer.open({
					type: 1,
					title: '查看体检疾病详情',
					area: ['390px', '300px'],
					content: $("#sysconfig_organ_manage_querylayer").html(),
					success: function(layero, index) {}
				});
			} else if (layEvent === "edit") {
				//编辑弹窗
				layer.open({
					type: 1,
					title: '编辑体检疾病详情',
					area: ['390px', '300px'],
					content: $("#sysconfig_organ_manage_editlayer").html(),
					success: function(layero, index) {}
				});
			} else if (layEvent === "dell") {
				layer.confirm('是否要删除当前体检疾病项目?', function(index) {
					obj.del(); //删除对应行（tr）的DOM结构，并更新缓存

				});
			}
		});

		//新增疾病分类按钮
		$('#examset_disease_maintain [id="add_diseasecate"]').click(function() {
			//打开弹窗
			getMaxOrder(1, function(res) {
				let order = res.data + 1;
				layer.open({
					type: 1,
					title: '新增体检疾病分类',
					area: ['390px', '300px'],
					content: $("#examset_diseasemaintain_addlayer").html(),
					success: function(layero, index) {
						//填充序号
						$("input[name='add_cate_order']").val(order);
					}
				});
			})
		});

		//新增体检疾病按钮
		$('#examset_disease_maintain [id="add_disease"]').click(function() {
			getMaxOrder(2,function(res){
				let order = res.data + 1;
				//打开弹窗
				layer.open({
					type: 1,
					title: '新增体检疾病',
					area: ['390px', '300px'],
					content: $("#examset_diseasedetail_addlayer").html(),
					success: function(layero, index) {
						var sel = document.getElementById("add_disease_select");
						for (var i = 0; i < cateList.length; i++) {
							var opt = new Option();
							opt.value = cateList[i].id;
							opt.text = cateList[i].name;
							sel.append(opt);
						}
						form.render('select');
						$("input[name='add_disease_order']").val(order);
					}
				});
				$(".layui-layer-page .layui-layer-content").css("overflow", "visible");
			});
		});

		table.on('tool(examset_diseasemaintain_table)', function(obj) {
			var data = obj.data;
			var layEvent = obj.event;
			if (layEvent === "query") {
				$('#examset_diseasedetail_table').empty();
				getDisease(data);
			} else if (layEvent === "edit") {
				//编辑弹窗
				layer.open({
					type: 1,
					title: '编辑疾病分类详情',
					area: ['390px', '300px'],
					content: $("#examset_diseasemaintain_editlayer").html(),
					success: function(layero, index) {
						$('input[name="edit_cate_order"]').val(data.cateorder);
						$('input[name="edit_cate_name"]').val(data.name);
						$('input[name="edit_cate_id"]').val(data.id);
					}
				});
			}
		});



		var diseasedetail_table = table.render({
			elem: '#examset_diseasedetail_table',
			limit: 30,
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
									'" lay-skin="switch" lay-filter="switch_detail_status" checked>'
							} else if (d.status == 0) {
								return '<input type="checkbox" name="open" id="' + d.id +
									'" lay-skin="switch" lay-filter="switch_detail_status">'
							} else {
								return ''
							}
						}
					}, {
						field: '',
						title: '操作',
						align: 'center',
						templet: '#examset_diseasedetailtable_bloder'
					}
				]
			]
		});

		//监听工具条
		table.on('tool(examset_diseasedetail_table)', function(obj) {
			var data = obj.data;
			var layEvent = obj.event;
			if (layEvent == 'edit') {
				//编辑弹窗
				layer.open({
					type: 1,
					title: '编辑体检疾病详情',
					area: ['390px', '300px'],
					content: $("#examset_diseasedetail_editlayer").html(),
					success: function(layero, index) {
						$('input[name="edit_disease_order"]').val(data.itemorder);
						$('input[name="edit_disease_name"]').val(data.name);
						$('input[name="edit_disease_id"]').val(data.id);
						$('input[name="edit_disease_cateid"]').val(data.cateid);
					}
				});
			}

		});

		//活动体检分类明细列表
		function getDisease(data) {
			hdk.ajax({
					api: appconfig.ExamSet.ExamProject.QueryDisease,
					data: JSON.stringify(data)
				},
				function(res) {
					Diseasetshow(res.data);
					$('.health-filter.health-filter-input input[name="project-search"]', hdk.config.activeTab).keyup(function() {
						filterdata = tool.filterArray($(this).val(), res.data);
						Diseasetshow(filterdata);
					});
					$("table").width("100%");
				});
		}

		//重载体检分类明细表格
		function Diseasetshow(data) {
			diseasedetail_table.reload({
				data: data
			});
		};

		//页面加载时初始化体检分类明细
		Diseasetshow([]);

		//监听疾病分类开关
		form.on('switch(switchTest)', function(obj) {
			var data = {
				id: obj.elem.attributes['id'].nodeValue,
				status: this.checked ? 1 : 0
			};
			console.log(data);
			updataExamById(data, 1, function() {});
		});

		//监听疾病详情开关
		form.on('switch(switch_detail_status)', function(obj) {
			var data = {
				id: obj.elem.attributes['id'].nodeValue,
				status: this.checked ? 1 : 0
			};
			updataExamById(data, 2, function() {});
		});


		//监听体检疾病分类添加提交
		form.on('submit(add_cate_submit)', function(res) {
			var info = res.field;
			var cateid = info.project_hide;
			var data = {
				cateorder: info.add_cate_order,
				name: info.add_cate_name,
			};
			addDisease(data, 1, function() {
				//关闭弹窗
				setTimeout(function() {
					layer.closeAll();
				}, 500);
				getDiseaseCate();
			});
		});
		
		//监听体检疾病添加提交
		form.on('submit(add_disease_submit)', function(res) {
			var info = res.field;
			var cateid = info.add_disease_cateid;
			if(cateid=='请选择'){
				layer.msg("请选择疾病分类", {
					offset: '6px'
				});
				return;
			}
			
			var data = {
				itemorder: info.add_disease_order,
				name: info.add_disease_name,
				cateid:cateid,
			};
			addDisease(data, 2, function() {
				//关闭弹窗
				setTimeout(function() {
					layer.closeAll();
				}, 500);
				getDisease({
					id:cateid
				})
			});
		});

		//监听体检疾病分类编辑提交
		form.on('submit(cate_submit)', function(res) {
			var info = res.field;
			var cateid = info.project_hide;
			var data = {
				id: info.edit_cate_id,
				name: info.edit_cate_name,
				status: -1
			};
			updataExamById(data, 1, function() {
				//关闭弹窗
				setTimeout(function() {
					layer.closeAll();
				}, 500);
				getDiseaseCate();
			});
		});

		//监听体检疾病编辑提交
		form.on('submit(disease_submit)', function(res) {
			var info = res.field;
			var cateid = info.edit_disease_cateid;
			var data = {
				id: info.edit_disease_id,
				name: info.edit_disease_name,
				status: -1
			};
			updataExamById(data, 2, function() {
				//关闭弹窗
				setTimeout(function() {
					layer.closeAll();
				}, 500);
				getDisease({
					id: cateid
				});
			});
		});

		/**
		 * 公用请求工具方法  type： 1 体检疾病分类 2，体检疾病
		 * */

		//新增疾病分类和疾病
		function addDisease(data,type,callback){
			var cateApi = appconfig.ExamSet.ExamProject.AddDiseaseCate;
			var projApi = appconfig.ExamSet.ExamProject.AddDisease;
			hdk.ajax({
				api: type == 1 ? cateApi : projApi,
				data: JSON.stringify(data)
			}, function(res) {
				layer.msg(res.msg, {
					offset: '6px'
				});
				callback();
			});
		};

		//编辑疾病分类和疾病
		function updataExamById(data, type, callback) {
			var cateApi = appconfig.ExamSet.ExamProject.UpdateDiseaseCate;
			var projectApi = appconfig.ExamSet.ExamProject.UpdateDisease;
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

		//获取最大排序数  
		function getMaxOrder(type, callback) {
			var cateApi = appconfig.ExamSet.ExamProject.QueryDiseaseCateMaxOrder;
			var projApi = appconfig.ExamSet.ExamProject.QueryDiseaseMaxOrder;
			hdk.ajax({
				api: type == 1 ? cateApi : projApi,
				data: {}
			}, function(res) {
				callback(res);
			});
		};



	});
	exports('examset/disease_maintain', {})
});
