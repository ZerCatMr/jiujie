layui.define(function(exports) {
	//参检机构管理
	layui.use(['laydate', 'table', 'element', 'hdk', 'form', 'tool', 'appconfig', 'tablecolsdict'], function() {
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
			tablecolsdict = layui.tablecolsdict,
			//体检医院
			hospitalCol = tablecolsdict.hospitalCol,
			//机构管理
			organ_manage = tablecolsdict.organ_manage,
			//参检机构
			genderCol = tablecolsdict.genderCol;

		//监听tab点击事件
		$('.health-query .multi-checkbox div', hdk.config.activeTab).on('click', function() {
			$(this).siblings().removeClass("hyd-selected");
			$(this).addClass("hyd-selected");

			var index = $(this).attr("hyd-value");
			var html = $("#add_button_html").html();
			var button_box = $("#orgin_manage_add");

			//显示/隐藏添加按钮
			if (index == '3') {
				button_box.append(html);
				//绑定事件
				addOrgan();
			} else {
				$("#add_button").remove();
			}
			getOrganList(index);
		});

		//渲染表格数据 type 1 管理机构 2体检医院 3.参检机构
		getOrganList('1');


		//监听工具条
		table.on('tool(managetable)', function(obj) { 
			var data = obj.data; 
			var layEvent = obj.event; 
			var tr = obj.tr; 
			if (layEvent === "check_organ") {
				//打开弹窗
				checkExamOrgan(data);
			} else if (layEvent === "edit_organ") {
				//编辑参检机构
				editExamOrgan(data);
			} else if (layEvent === "stop_organ") {
				//停用参检机构
				setExamOrganStatus(2,obj);
			} else if (layEvent === "start_organ") {
				//启用参检机构
				setExamOrganStatus(1,obj);
			}else if (layEvent === "stop_hospital") {
				//停用参检机构
				setHospitalStatus(2,obj);
			} else if (layEvent === "start_hospital") {
				//启用参检机构
				setHospitalStatus(1,obj);
			}else if(layEvent === "edit_basicOrgan"){
				//编辑管理机构
				editBasicOrgan(data);
			}else{
				//编辑体检医院 
				editHospital(data);
			}

		});
		
		//查看参检机构
		function checkExamOrgan(data){
			layer.open({
				type: 1,
				title: '查看机构详情',
				area: ['700px', '500px'],
				skin: 'layui-layer-molv',
				resize: false,
				content: $("#query_organ_layer").html(),
				success: function(layero, index) {
					top.$('input[name="edit_organorder"]').addClass("layui-disabled").attr("disabled", "").val(data.organorder);
					top.$('input[name="edit_organname"]').addClass("layui-disabled").attr("disabled", "").val(data.organname);
					top.$('input[name="edit_organnature"]').addClass("layui-disabled").attr("disabled", "").val(data.organnature);
					top.$('input[name="edit_organaddress"]').addClass("layui-disabled").attr("disabled", "").val(data.organaddress);
					top.$('input[name="edit_organprefix"]').addClass("layui-disabled").attr("disabled", "").val(data.organprefix);
					top.$('input[name="edit_secretorgan"]').addClass("layui-disabled").attr("disabled", "").val(data.secretorgan ==
						1 ? "是" : "否");
					top.$('input[name="edit_organphone"]').addClass("layui-disabled").attr("disabled", "").val(data.organphone);
				}
			});
		};
		
		//编辑参检机构
		function editExamOrgan(data){
			getTerm(function(res){
				let list = res.data;
				//编辑弹窗
				layer.open({
					type: 1,
					title: '编辑机构详情',
					area: ['700px', '540px'],
					skin: 'layui-layer-molv',
					resize: false,
					content: $("#edit_organ_layer").html(),
					success: function(layero, index) {
						//设置下拉框
						var sel = document.getElementById("edit_organ_organnature");
						for (var i = 0; i < list.length; i++) {
							var opt = new Option();
							opt.value = list[i].termid;
							opt.text = list[i].termname;
							sel.append(opt);
						}
						form.render('select');
						//设置参数
						top.$('input[name="edit_organid"]').addClass("layui-disabled").attr("disabled", "").val(data.organid)
						top.$('input[name="edit_organorder"]').val(data.organorder)
						top.$('input[name="edit_organname"]').val(data.organname);
						top.$('input[name="edit_organnature"]').val(data.organnature);
						top.$('input[name="edit_organaddress"]').val(data.organaddress);
						top.$('input[name="edit_organphone"]').val(data.organphone);
						top.$('input[name="edit_organprefix"]').val(data.organprefix);
						top.$('input[name="edit_secretorgan"]').val(data.sevretorgan);
					}
				});
				$(".layui-layer-page .layui-layer-content").css("overflow", "visible");
			});
		};
		
		//停用/启用参检机构 type 1 启用 2停用
		function setExamOrganStatus(type,obj){
			var tip = type==1?"是否启用当前机构":"是否停用当前机构";
			var status = type==1?1:0;
			
			layer.confirm(tip, function(index) {
				var data = {
					organid: obj.data.organid,
					status: status
				};
				updataExamOrgan(data);
			});
		};
		
		//编辑体检医院
		function editHospital(data){
			layer.open({
				type: 1,
				title: '编辑管理机构',
				area: ['700px', '400px'],
				skin: 'layui-layer-molv',
				resize: false,
				content: $("#edit_hospital_layer").html(),
				success: function(layero, index) {
					top.$('input[name="edit_hosptial_hospid"]').addClass("layui-disabled").attr("disabled", "").val(data.hospid);
					top.$('input[name="edit_hosptial_hospname"]').val(data.hospname);
				}
			});
		};
		
		//停用/启用参检机构 type 1 启用 2停用
		function setExamOrganStatus(type,obj){
			var tip = type==1?"是否启用当前机构":"是否停用当前体检机构";
			var status = type==1?1:0;
			
			layer.confirm(tip, function(index) {
				var data = {
					organid: obj.data.organid,
					status: status
				};
				//UpdataBasichospital
				updataExamOrgan(data);
			});
		};
		
		//停用/启用体检医院 type 1 启用 2停用
		function setHospitalStatus(type,obj){
			var tip = type==1?"是否启用当前体检医院":"是否停用当前体检医院";
			var status = type==1?1:0;
			
			layer.confirm(tip, function(index) {
				var data = {
					hospid: obj.data.hospid,
					status: status
				};
				//UpdataBasichospital
				updatahospital(data);
			});
		};
		
		//编辑管理机构
		function editBasicOrgan(data){
			layer.open({
				type: 1,
				title: '编辑管理机构',
				area: ['790px', '400px'],
				skin: 'layui-layer-molv',
				resize: false,
				content: $("#edit_basicOrgan_layer").html(),
				success: function(layero, index) {
					top.$('input[name="edit_basic_id"]').addClass("layui-disabled").attr("disabled", "").val(data.id);
					top.$('input[name="edit_basic_organname"]').val(data.organname);
				}
			});
		};
		
		//获取术语列表
		function getTerm(callback){
			hdk.ajax({
				api: appconfig.ExamSet.Term.QueryTermByCateCode,
				data: JSON.stringify({
					cateid:"ExamUnitNature"
				})
			}, function(res) {
				callback(res);
			});
		};

		//给添加按钮绑定点击事件
		function addOrgan() {
			$('#add_button').click(function(res) {
				QueryBasicParam(function(res) {
					let order = res.data.order + 1;
					let list = res.data.sysTermList;
					layer.open({
						type: 1,
						title: '添加参检机构',
						area: ['700px', '540px'],
						skin: 'layui-layer-molv',
						resize: false,
						content: $("#add_organ").html(),
						success: function(layero, index) {
							var sel = document.getElementById("add_organ_organnature");
							for (var i = 0; i < list.length; i++) {
								var opt = new Option();
								opt.value = list[i].termid;
								opt.text = list[i].termname;
								sel.append(opt);
							}
							form.render('select');
							$("#add_organ_order").val(order);
						}
					});
					$(".layui-layer-page .layui-layer-content").css("overflow", "visible");
				});
			});
		};
		
		//监听参检机构编辑提交按钮
		form.on('submit(edit_organ_submit)', function(res) {
			let info = res.field;
			var data = {
				organid:info.edit_organid,
				organorder: info.edit_organorder,
				organnature: info.edit_organ_organnature == "请选择"?null:info.edit_organ_organnature,
				organaddress: info.edit_organaddress,
				organname: info.edit_organname,
				organprefix: info.edit_organprefix,
				organphone: info.edit_organphone,
				secretorgan:info.eidt_organ_secret == "请选择"?-1:info.eidt_organ_secret,
				status:-1
			};
			hdk.ajax({
				api: appconfig.ExamSet.SysManag.UpdataBasicExamorgan,
				data: JSON.stringify(data)
			}, function(res) {
				layer.msg(res.msg, {
					offset: '6px'
				});
				setTimeout(function() {
					layer.closeAll();
					if (res.data == 1) {
						getOrganList('3');
					}
				}, 500);
			});
		})

		//监听添加参检机构提交按钮
		form.on('submit(add_organ_submit)', function(res) {
			let info = res.field;
			var data = {
				organorder: info.add_organ_order,
				organnature: info.add_organ_organnature,
				secretorgan: info.add_organ_secret,
				organaddress: info.add_organaddress,
				organname: info.add_organname,
				organprefix: info.add_organprefix,
				organphone: info.add_organaddphone
			};
			updataExamOrgan(data);
		});
			
		//修改参检机构
		function updataExamOrgan(data){
			hdk.ajax({
				api: appconfig.ExamSet.SysManag.UpdataBasicExamorgan,
				data: JSON.stringify(data)
			}, function(res) {
				layer.msg(res.msg, {
					offset: '6px'
				});
				setTimeout(function() {
					layer.closeAll();
					if (res.data == 1) {
						getOrganList('3');
					}
				}, 500);
			});
		};
		
		//修改体检医院
		function updatahospital(data){
			hdk.ajax({
				api: appconfig.ExamSet.SysManag.UpdataBasichospital,
				data: JSON.stringify(data)
			}, function(res) {
				layer.msg(res.msg, {
					offset: '6px'
				});
				setTimeout(function() {
					layer.closeAll();
					if (res.data == 1) {
						getOrganList('2');
					}
				}, 500);
			});
		}
		
		// 监听管理机构编辑提交
		form.on('submit(edit_basicOrgan_submit)',function(res){
			let info = res.field;
			var data = {
				id:info.edit_basic_id,
				organname:info.edit_basic_organname,
			};
			
			hdk.ajax({
				api: appconfig.ExamSet.SysManag.UpdataBasicOrgan,
				data: JSON.stringify(data)
			}, function(res) {
				layer.msg(res.msg, {
					offset: '6px'
				});
				setTimeout(function() {
					layer.closeAll();
					if (res.data == 1) {
						getOrganList('1');
					}
				}, 500);
			});
		});
		
		// 监听体检医院编辑提交
		form.on('submit(edit_hospital_submit)',function(res){
			let info = res.field;
			var data = {
				hospid:info.edit_hosptial_hospid,
				hospname:info.edit_hosptial_hospname,
				status:-1
			};
			updatahospital(data);
		});

		//渲染表格数据
		function getOrganList(type) {
			initTable(type, function() {
				//管理机构
				var manageApi = appconfig.ExamSet.SysManag.QueryBasicOrganList;
				//体检医院
				var hospatApi = appconfig.ExamSet.SysManag.QueryBasicHospitalList;
				//参检机构
				var organmApi = appconfig.ExamSet.SysManag.QueryBasicExamorganList;

				var api = (type == '1') ? manageApi : ((type == '2') ? hospatApi : organmApi);

				hdk.ajax({
					api: api,
					data: {}
				}, function(res) {
					tableshow(res.data);
					$('.health-filter.health-filter-input input[name="manage-search"]', hdk.config.activeTab).keyup(function() {
						filterdata = tool.filterArray($(this).val(), res.data);
						tableshow(filterdata);
					});
					$("table").width("100%");
				});
			});
		};

		//初始化表格
		function initTable(type, callback) {
			var clos = [];
			switch (type) {
				case '1':
					clos = genderCol;
					break;
				case '2':
					clos = hospitalCol;
					break;
				default:
					clos = organ_manage;
					break;
			}

			//初始化表格
			hdk.tableRender({
				elem: '#managetable',
				id: 'manage_table',
				cols: clos
			});
			callback();
		};

		//重载表格
		function tableshow(data) {
			table.reload('manage_table', {
				data: data
			});
		};

		//加载添加参检机构的最大排序数和系统术语列表
		function QueryBasicParam(callback) {
			hdk.ajax({
				api: appconfig.ExamSet.SysManag.QueryAddExamOrganBasicParam,
				data: {}
			}, function(res) {
				callback(res);
			});
		};

	});
	exports('sysconfig/organ_manage', {})
});
