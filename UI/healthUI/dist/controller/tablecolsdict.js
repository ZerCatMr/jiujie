layui.define(function(exports) {
	var clos = {

		//体检医院
		hospitalCol: [
			[{
				field: 'hospid',
				title: '医院编码',
				align: 'center',
				minWidth: 60,
				colspan: 1
			}, {
				field: 'hospname',
				title: '医院名称',
				align: 'center',
				minWidth: 60,
				colspan: 1
			}, {
				field: 'organtype',
				title: '机构类型',
				align: 'center',
				minWidth: 60,
				colspan: 1
			}, {
				field: 'status',
				title: '状态',
				align: 'center',
				minWidth: 60,
				colspan: 1,
				templet: function(data) {
					return data.status == "1" ? "启用" : "停用"
				}
			}, {
				field: 'null',
				title: '操作',
				align: 'center',
				colspan: 1,
				templet: '#hospital_table_bolder'
			}]
		],

		//参检机构
		organ_manage: [
			[ //表头 
				{
					field: 'organorder',
					title: '机构排序号',
					align: 'center',
					width: 200,
					sort: true
				}, {
					field: 'organname',
					title: '机构名称',
					align: 'center',
					width: 200,
					sort: true
				}, {
					field: 'organnature',
					title: '机构性质',
					align: 'center',
					width: 150
				}, {
					field: 'organprefix',
					title: '账户前缀',
					align: 'center',
					width: 150
				}, {
					field: 'organphone',
					title: '机构电话',
					align: 'center',
					width: 150,
					sort: true
				}, {
					field: 'organaddress',
					title: '机构地址',
					width: 150
				}, {
					field: 'sevretorgan',
					title: '保密单位',
					align: 'center',
					width: 150,
					sort: true,
					templet: function(data) {
						return data.secretorgan == "1" ? "是" : "否"
					}
				}, {
					field: 'status',
					title: '账户状态',
					width: 150,
					align: 'center',
					sort: true,
					templet: function(data) {
						return data.status == "1" ? "启用" : "停用"
					}
				}, {
					field: 'null',
					title: '操作',
					align: 'center',
					mainWidth: 150,
					templet: '#manage_table_bolder'
				}
			]
		],

		//管理机构
		genderCol: [
			[{
				field: 'id',
				title: '机构编码',
				align: 'center',
				minWidth: 60,
				colspan: 1
			}, {
				field: 'organname',
				title: '机构名',
				align: 'center',
				minWidth: 60,
				colspan: 1
			}, {
				field: 'id',
				title: '管理机构编码',
				align: 'center',
				minWidth: 60,
				colspan: 1
			}, {
				field: 'organtype',
				title: '机构类型',
				align: 'center',
				minWidth: 60,
				colspan: 1
			}, {
				field: 'null',
				title: '操作',
				align: 'center',
				colspan: 1,
				templet: '#manageOrgan_table_bolder'
			}]
		],

		//保健对象 
		bjdx_manage_table: [
			[{
				field: 'organname',
				title: '参检单位',
				width: 150
			}, {
				field: 'name',
				title: '姓名',
				width: 100
			}, {
				field: 'gendercode',
				title: '性别',
				width: 100,
				templet: function(data) {
					return data.gendercode == 'Sex1' ? "男" : "女"
				}
			}, {
				field: 'phone',
				title: '手机号',
				width: 150
			}, {
				field: 'birth',
				title: '年龄',
				width: 100
			}, {
				field: 'birth',
				title: '出生日期',
				width: 100
			}, {
				field: 'identid',
				title: '身份证号',
				width: 150
			}, {
				field: 'treatcode',
				title: '医疗待遇',
				width: 100
			}, {
				field: 'levelcode',
				title: '人员级别',
				width: 100
			}, {
				field: 'typecode',
				title: '人员类型',
				width: 100
			}, {
				field: 'duty',
				title: '职务',
				width: 100
			}, {
				field: 'duty',
				title: '主要领导',
				width: 100
			}, {
				field: 'null',
				title: '操作',
				mainWidth: 150,
				templet: '#usermanage_table_bolder'
			}]
		],
		//用户管理
		user_manage_table: [
			[ //表头
				{
					field: 'loginaccount',
					title: '登录名',
					align: 'center',
					sort: true,
					width: 200
				}, {
					field: 'name',
					title: '姓名',
					align: 'center',
					width: 200
				}, {
					field: 'gendercode',
					title: '性别',
					align: 'center',
					sort: true,
					width: 200,
					templet: function(data) {
						return data.gendercode == 'Sex001' ? "男" : "女"
					}
				}, {
					field: 'phone',
					title: '手机号',
					align: 'center',
					sort: true,
					width: 200
				}, {
					field: 'officephone',
					title: '座机号',
					align: 'center',
					width: 200
				}, {
					field: 'usertypename',
					title: '人员类型',
					align: 'center',
					sort: true,
					width: 200
				}, {
					field: 'status',
					title: '账户状态',
					align: 'center',
					sort: true,
					width: 200,
					templet: function(data) {
						return data.status == '1' ? "启用" : "停用"
					}
				}, {
					field: 'null',
					title: '操作',
					mainWidth: 150,
					align: 'center',
					templet: '#usermanage_table_bolder'
				}
			]
		]
	};
	exports('tablecolsdict', clos);
});
