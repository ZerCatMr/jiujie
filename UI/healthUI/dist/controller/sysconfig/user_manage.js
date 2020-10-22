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
			userManageTable = tablecolsdict.user_manage_table,
			type = 1;

		//初始化表格
		hdk.tableRender({
			elem: "#user_manage_table",
			cols: userManageTable,
			id: "userManageTable"
		});

		//初始化数据
		getManageUsers();

		//监听头部Tab点击事件
		$('.health-query .multi-checkbox div', hdk.config.activeTab).on('click', function() {
			$(this).siblings().removeClass("hyd-selected");
			$(this).addClass("hyd-selected");

			var tableType = parseInt($(this).attr("hyd-value"));
			if (type == tableType) {
				return;
			}
			type = tableType;
			getManageUsers();
		});

		//打开新增用户弹窗
		$('#sysconfig_user_manage [name="user_manage-add"]').click(function() {
		    var type = $('#userType .hyd-selected', hdk.config.activeTab).attr("hyd-value");
		    var typeName = type==2?"体检医院管理员":"参检单位管理员";
            layer.open({
					type: 1,
					title: '新增' + $('#userType .hyd-selected', hdk.config.activeTab).text()+"管理用户",
					area: ['700px', '500px'],
					resize: false,
					skin: 'layui-layer-molv',
					content: $("#sysconfig_addManageUser_layer").html(),
					success: function(index, layero) {
						if (type == "1") {
							$("#add_usertypes").removeClass("layui-hide");
							$("#add_accentType").addClass("layui-hide");
						} else {
							$("#add_usertypes").addClass("layui-hide");
							$("#add_accentType").removeClass("layui-hide");
							$("#add_accentTypeName").val(typeName);
						}
						form.render();
					},
					yes: function(index, layero) {
						var data = {
							add_name: top.$('input[name="add_name"]').val(),
							add_gendercode: top.$('input[name="add_gendercode"]:checked').val(),
							add_idcard: top.$('input[name="add_idcard"]').val(),
							add_phone: top.$('input[name="add_phone"]').val(),
							add_levelcode: top.$('input[name="add_levelcode"]').val(),
							add_typecode: top.$('input[name="add_typecode"]').val(),
							add_treatcode: top.$('input[name="add_treatcode"]').val(),
							add_isys: top.$('input[name="add_isys"]').val(),
							add_duty: top.$('input[name="add_duty"]').val(),
							add_examorgid: top.$('input[name="add_examorgid"]').val(),
							add_is_yxrc: top.$('input[name="add_is_yxrc"]').val()
						}
						if ($('#userType .hyd-selected', hdk.config.activeTab).attr("hyd-value") == "gbb") {
							data.add_usertype = top.$('input[name="add_usertype"]:checked').val()
						} else {
							if ($('#userType .hyd-selected', hdk.config.activeTab).attr("hyd-value") == "tjyy") {
								data.add_usertype = "hospadmin";
							}
							if ($('#userType .hyd-selected', hdk.config.activeTab).attr("hyd-value") == "cjdw") {
								data.add_usertype = "orgadmin";
							}
						}
						hdk.ajax({
							api: "123123",
							data: JSON.stringify(data)
						}, function(Data) {

						})

						//保存回调
					},
					btn2: function(index, layero) {
						//取消回调
					}
				});

				//修改样式，使下拉框可以超出边界
                $(".layui-layer-page .layui-layer-content").css("overflow", "visible");
		});

		//监听工具栏
		table.on("tool(user_manage_table)", function(obj) {
			var data = obj.data; //获得当前行数据
			var layEvent = obj.event; //获得 lay-event 对应的值（也可以是表头的 event 参数对应的值）
			var tr = obj.tr; //获得当前行 tr 的 DOM 对象（如果有的话）
			//修改信息
			if (layEvent == "edit") {
				//修改用户信息
				modifiyElent(data);
			}else if(layEvent == "start"){
				setManageUserStatus(1,obj);
			}else if(layEvent == "stop"){
				setManageUserStatus(0,obj);
			}else{
				restPassworld(data);
			}
		})

		//修改信息弹窗
		function modifiyElent(data) {
			layer.open({
				type: 1,
				title: '编辑' + $('#userType .hyd-selected', hdk.config.activeTab).text() + "管理用户信息",
				area: ['700px', '520px'],
				btnAlign: 'c',
				resize: false,
				skin: 'layui-layer-molv',
				content: $("#sysconfig_edituser_layer").html(),
				success: function(index, layero) {
					if ($('#userType .hyd-selected', hdk.config.activeTab).attr("hyd-value") == "1") {
						$("#edit_usertypes").removeClass("layui-hide");
						$('input[name="edit_usertype"]').each(function() {
							if ($(this).val() == data.usertypename) {
								$(this).prop("checked", true);
								return;
							}
						});
					} else {
						$("#edit_usertypes").addClass("layui-hide");
					}
					
					top.$('input[name="edit_manageid"]').val(data.manageid)
					top.$('input[name="edit_name"]').val(data.name)
					top.$('input[name="edit_loginaccount"]').val(data.loginaccount)
					top.$('input[name="edit_phone"]').val(data.phone)
					top.$('input[name="edit_officephone"]').val(data.officephone)

					top.$('#edit_idcards').addClass("layui-hide")

					top.$('input[name="edit_idcard"]').val("").addClass("layui-hide")
					//性别
					if (data.gendercode == "Sex001") {
						top.$('input[value="Sex001"]').prop("checked", true)
					} else {
						top.$('input[value="Sex002"]').prop("checked", true)
					}

					form.render();

				}
			});
			
			//修改样式，使下拉框可以超出边界
			$(".layui-layer-page .layui-layer-content").css("overflow", "visible");
		};

		//监听编辑提交按钮
		form.on('submit(edit_submit)', function(res) {
			var info = res.field;
			var data = {
				manageid:info.edit_manageid,
				gendercode: info.edit_gendercode,
				loginaccount: info.edit_loginaccount,
				name: info.edit_name,
				officephone: info.edit_officephone,
				phone: info.edit_phone,
				usertypename: info.edit_usertype == "请选择"?null:info.edit_usertype,
				status:-1
			};
			updataUserManage(data);
		});

        //监听新增提交按钮
		form.on('submit(add_submit)', function(data) {
		    var type = $('#userType .hyd-selected', hdk.config.activeTab).attr("hyd-value");
			var info = data.field;
			var data = {
			    gendercode:info.add_gendercode,
                loginaccount:info.add_loginaccount,
                name:info.add_name,
                officephone:info.add_officephone,
                phone:info.add_phone,
                usertype:type
			};
			data.typename = type==1?info.edit_usertype:info.add_usertype;

		});

		//初始化表格 type 1.干保办  2.体检医院  3.参检单位
		function getManageUsers() {
			hdk.ajax({
				api: appconfig.ExamSet.UserManage.QueryManageUserListByType,
				data: JSON.stringify({
					usertype: type
				})
			}, function(res) {
				reload(res.data);
				$('.health-filter.health-filter-input input[name="usermanage-health-search"]', hdk.config.activeTab).keyup(
					function() {
						filterdata = tool.filterArray($(this).val(), res.data);
						reload(filterdata);
					});
				$("table").width("100%");

			});
		};

		//重载表格
		function reload(data) {
			table.reload('userManageTable', {
				data: data
			});
		};
		
		//重置密码
		function restPassworld(data){
		    console.log(data);
			hdk.ajax({
				api: appconfig.ExamSet.UserManage.ResetPassWorld,
				data: JSON.stringify({
				    id:data.manageid
				})
			}, function(res) {
				layer.msg(res.msg, {
					offset: '6px'
				});
			});
		};
		
		//停用/启用管理人员 type 1 启用 2停用
		function setManageUserStatus(type,obj){
			var tip = type==1?"是否启用该用户":"是否停用该用户";
			var status = type==1?1:0;
			
			layer.confirm(tip, function(index) {
				var data = {
					manageid: obj.data.manageid,
					status: status
				};
				updataUserManage(data);
			});
		};
		
		//修改管理人员
		function updataUserManage(data){
			hdk.ajax({
				api: appconfig.ExamSet.UserManage.UpdataManageUser,
				data: JSON.stringify(data)
			}, function(res) {
				layer.msg(res.msg, {
					offset: '6px'
				});
				setTimeout(function() {
					layer.closeAll();
					getManageUsers();
				}, 500);
			});
		};

	});

	exports('sysconfig/user_manage', {})
});
