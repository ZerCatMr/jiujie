layui.define(['sysconfig'], function(exports) {
	var sysconfig = layui.sysconfig;

	var appconfig = {
		//登录模块
		Login: {
			//使用账号密码登录
			login: sysconfig.apiroot + '/login/userLogin',

			//退出登录
			loginOut: sysconfig.apiroot + '/login/userLoginOut'
		},
		ExamSet: {
			/**
			 * 体检项目设置模块
			 * @author liuwenwen
			 * */
			ExamProject: {
				/**
				 * 体检项目
				 * @author liuwenwen
				 * */

				//新增体检项目分类
				AddProjectCate: sysconfig.apiroot + '/exam/addSysExamCate',

				//修改体检项目分类
				UpdateExamProjectCate: sysconfig.apiroot + '/exam/updataExamcateById',

				//获取体检项目分类列表
				QueryExamProjectCate: sysconfig.apiroot + '/exam/getExamCateList',

				//获得体检项目分类最大的排序数,
				QueryExamProjectCateMaxOrder: sysconfig.apiroot + '/exam/getMaxExamCateOrder',


				/**
				 * 体检项目
				 * @author liuwenwen
				 * */

				//新增体检项目
				AddExamProject: sysconfig.apiroot + '/exam/addSysExamProject',

				//修改体检项目
				UpdateExamProject: sysconfig.apiroot + '/exam/updateExamProjectById',

				//获取体检项目列表
				QueryExamProjectByCate: sysconfig.apiroot + '/exam/getExamProjsByCateId',

				//获得体检项目最大排序数
				QueryExamProjectMaxOrder: sysconfig.apiroot + '/exam/getMaxExamProjectOrder',


				/**
				 * 体检疾病分类
				 * @author liuwenwen
				 * */

				//新增体检疾病分类 
				AddDiseaseCate: sysconfig.apiroot + '/disease/addDiseaseCate',

				//修改体检疾病分类
				UpdateDiseaseCate: sysconfig.apiroot + '/disease/updateDiseaseCateById',

				//获取体检疾病分类列表
				QueryDiseaseCate: sysconfig.apiroot + '/disease/getDiseaseCateList',

				//获取体检疾病分类最大排序数 
				QueryDiseaseCateMaxOrder: sysconfig.apiroot + '/disease/getMaxDiseCateOrder',


				/**
				 * 体检疾病
				 * @author liuwenwen
				 * */

				//添加体检疾病 
				AddDisease: sysconfig.apiroot + '/disease/addDisease',

				//修改体检疾病
				UpdateDisease: sysconfig.apiroot + '/disease/updateDiseaseById',

				//获取体检疾病列表
				QueryDisease: sysconfig.apiroot + '/disease/getDiseaseList',

				//获取体检疾病最大排序数 
				QueryDiseaseMaxOrder: sysconfig.apiroot + '/disease/getMaxDiseOrder',

				/**
				 * 疾病关键词分类
				 * @author liuwenwen
				 * */

				/**
				 * 疾病关键词
				 * @author liuwenwen
				 * */
			},

			/**
			 * 系统管理模块
			 * @author liuwenwen
			 * */
			SysManag: {

				/**
				 * 参检机构管理
				 * */

				//新增参检机构
				AddBasicExamorgan: sysconfig.apiroot + '/sysManag/addBasicExamorgan',

				//修改参检机构
				UpdataBasicExamorgan: sysconfig.apiroot + '/sysManag/updataBasicExamorgan',

				//获取参检机构列表
				QueryBasicExamorganList: sysconfig.apiroot + '/sysManag/getBasicExamorganList',

				//获取添加参检机构的基础参数
				QueryAddExamOrganBasicParam: sysconfig.apiroot + '/sysManag/getAddExamOrganBasicParam',


				/**
				 * 管理机构
				 * */

				//修改管理机构 
				UpdataBasicOrgan: sysconfig.apiroot + '/basicOrgan/updataBasicOrgan',

				//获取管理机构列表 
				QueryBasicOrganList: sysconfig.apiroot + '/basicOrgan/getBasicOrganList',


				/**
				 * 体检医院
				 * */

				//修改体检医院 
				UpdataBasichospital: sysconfig.apiroot + '/hospital/updataBasichospital',

				//获取体检医院列表 
				QueryBasicHospitalList: sysconfig.apiroot + '/hospital/getBasicHospitalList',

			},

			/**
			 * 用户管理模块
			 * @author liuwenwen
			 * */
			 UserManage:{

				 //添加用户管理
				 AddManageUser：sysconfig.apiroot + '/userManage/addManageUser',

				 //重置账号密码 
				 ResetPassWorld:sysconfig.apiroot + '/logAccount/resetPassWorld',
				 
				 //修改管理用户列表
				 UpdataManageUser:sysconfig.apiroot + '/userManage/updataManageUser',
				 
				//根据类型获得管理用户列表
				QueryManageUserListByType:sysconfig.apiroot + '/userManage/getManageUserListByType',
			 },

			/**
			 * 术语模块
			 * @author liuwenwen
			 * */
			Term: {
				//根据术语分类查询下属术语
				QueryTermByCateCode: sysconfig.apiroot + '/sysTerm/getSysTermByCateId',
			}
		},
		Examwork: { //
			Fillbatch: {
				//批次列表
				QueryFillbatch: sysconfig.apiroot + '/Fillbatch/queryFillbatch',
				//参检机构填报列表
				FillOrgan: sysconfig.apiroot + '/Fillbatch/queryfillOrgan',
				//修改批次状态
				IsTakeEffect: sysconfig.apiroot + '/Fillbatch/isTakeEffect',
				//创建批次
				AddFillbatch: sysconfig.apiroot + '/Fillbatch/w',
			}
		}


	};
	exports('appconfig', appconfig);
});
