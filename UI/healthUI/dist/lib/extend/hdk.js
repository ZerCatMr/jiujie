/**

 @Name：Hdk 核心模块
 @Author：徐豪

 */

layui.define(['view', 'admin'], function(exports) {
	var $ = layui.jquery,
		laytpl = layui.laytpl,
		layer = layui.layer,
		setter = layui.setter,
		device = layui.device(),
		hint = layui.hint(),
		view = layui.view,
		admin = layui.admin
	hdk = {
		REGEX: {
			positiveInteger: /^\+?[1-9][0-9]{0,9}$/,
			postiveFloat: /^[0-9]{1,10}(\.[0-9]{0,2})?$/,
			identity: /(^\d{17}(x|X|\d)$)/,
			date: /^(\d{4})[-\/](\d{1}|0\d{1}|1[0-2])([-\/](\d{1}|0\d{1}|[1-2][0-9]|3[0-1]))*$/,
			phone: /^((\+?86)|(\+86))?(1[3-9][0-9]{9})$/,
			mobilePhone: /^([0-9]{3,4}-)?[0-9]{7,8}$/
		},
		openWindow: function(options) {
			layer.open($.extend({
				type: 1
			}, options));
		},
		getReqParams: function() {
			var params = {};
			params[setter.request['owner']] = layui.data(setter.tableName)[setter.request['owner']];
			return params;
		},
		getReqHeaders: function() {
			var headers = {};
			headers[setter.request.tokenName] = layui.data(setter.tableName)[setter.request.tokenName];
			return headers;
		},
		tab: {
			open: function(options) {
				if ((options.module && typeof options.module === 'string') && (options.params && typeof options.params ===
						'object')) {
					layui.data[options.module] = function() {
						layui.use(options.module, function(module) {
							var o = {
								data: options.params,
								container: $('#LAY_app_body').find('.layadmin-tabsbody-item.layui-show')
							};
							module(o);
						});
					}
				}
				location.hash = admin.correctRouter(options.href);
			},
			close: function() {

			}
		},
		initSelectBox: function(options) {
			var init = function(obj) {
				var elem = $(obj.elem),
					isEmpty = obj.isEmpty || true;

				var str = '';

				if (isEmpty) {
					$(obj.elem).empty();
				}

				$.each(obj.data, function(i, o) {
					if (obj.mapping) {
						str += '<li value=' + o[obj.mapping.value] + ' class="' + (obj.defaultValue === o.value ? 'selected' : '') +
							'">' + o[obj.mapping.name] + '</li>';
					} else {
						str += '<li value=' + o.value + ' class="' + (obj.defaultValue === o.value ? 'selected' : '') + '" >' + o.name +
							'</li>';
					}
				});

				elem.append(str);

				elem.on('click', function(e) {
					$(e.currentTarget).find('li.selected').toggleClass('selected');
					$(e.target).toggleClass('selected');
				});


				if (obj.callback) {
					obj.callback();
				}
			}

			if ($.isArray(options)) {
				$.each(options, function(i, o) {
					init(o);
				});
			} else {
				init(options);
			}
		},
		flow: {
			config: null,
			render: function(options) {
				this.config = options;
				var that = this,
					page = 1,
					ui = options.ui,
					LIMIT = options.limit,
					more = $('<div lay-filter="flow-more" class="hyd-flow-more"></div>'),
					start = $('<span style="cursor: pointer;">↓ 下滑加载更多</span>'),
					end = $('<span>已经到底啦</span>'),
					icon = $('<i class="layui-icon layui-icon-loading-1 layui-anim layui-anim-rotate" />'),
					noRes = $('<span>无数据</span>'),
					stop = false;

				var init = function(fn) {
					view.req({
						url: options.url,
						type: 'post',
						data: $.extend({}, {
							page: page,
							limit: LIMIT
						}, (options.where || {})),
						done: function(res) {
							if (fn && typeof fn === 'function') fn.call();
							that.show(res.data);
							if (options.done && typeof options.done === 'function') {
								options.done(res.data, page);
							}
							if ($(options.elem).parent().find('[lay-filter=flow-more]').length === 0) {
								$(options.elem).parent().append(more);
							}
							if (0 === res.count) {
								$(options.elem).parent().find('[lay-filter=flow-more]').html(noRes);
								return that;
							}
							if (page * LIMIT >= res.count) {
								$(options.elem).parent().find('[lay-filter=flow-more]').html(end);
								stop = true;
							} else if (page * LIMIT < res.count) {
								start.off('click').on('click', function(e) {
									var tmp = $(options.elem).parent().find('[lay-filter=flow-more]').html();
									$(options.elem).parent().find('[lay-filter=flow-more]').html(icon);
									setTimeout(function() {
										init(function() {
											$(options.elem).parent().find('[lay-filter=flow-more]').html(tmp);
										});
									}, 500);
								});
								$(options.elem).parent().find('[lay-filter=flow-more]').html(start);
							}
							page++;
							$(options.elem).parents('.layadmin-tabsbody-item').off('scroll').on('scroll', function(e) {
								if ($(e.target).find(options.elem).length === 0) {
									$(e.target).off('scroll');
								}

								var viewH = $(e.target).height(),
									contentH = $(e.target).get(0).scrollHeight,
									scrollTop = $(e.target).scrollTop();

								if ((contentH - viewH) - scrollTop <= 0) {
									if (stop) return;
									var tmp = $(options.elem).parent().find('[lay-filter=flow-more]').html();
									$(options.elem).parent().find('[lay-filter=flow-more]').html(icon);
									setTimeout(function() {
										init(function() {
											$(options.elem).parent().find('[lay-filter=flow-more]').html(tmp);
										});
									}, 500);
								}
							});
						}
					});
				};
				init();

				return that;
			},
			show: function(data) {
				var that = this;
				$.each(data, function(i, o) {
					var keys = Object.keys(o),
						currUi = that.config.ui;
					$.each(keys, function(idx, key) {
						currUi = currUi.replace('$' + key + '$', o[key]);
					});
					var uiElem = $(currUi);
					if (that.config.dbClick && typeof that.config.dbClick === 'function') {
						uiElem.on('dblclick', function(e) {
							that.config.dbClick({
								that: e,
								data: o
							})
						});
					}
					$(that.config.elem).append(uiElem);
				});
			},
			reload: function(options) {
				var that = this;
				$(that.config.elem).empty();
				that.render($.extend(that.config, options));
			}
		},
		config: {
			activeTab: '#LAY_app_body>div.layadmin-tabsbody-item.layui-show'
		},
		ajax: function(params, callback) {
			return $.ajax({
				url: params.api,
				cache: false,
				contentType: "application/json; charset=utf-8",
				dataType: 'json',
				data: params.data,
				type: params.method || 'POST',
				headers: {
					"token": window.sessionStorage.getItem("health-login-cache-token")
				},
				async: !params.async || false,  //async=true同步
				success: function(result) {
					if (result.code == '-1') {
							// layer.msg('请求失败: ' + result.message);
							layer.alert(result.msg, {
								icon: 2,
								skin: 'layer-ext-moon',
								title:"失败"
							})
					} else if (result.code == "-9") {
						layer.msg(result.msg, {
							icon: 5,
							time: 2000,
							shade: [0.8, '#393D49']
						}, function() {
							window.sessionStorage.clear();
							window.localStorage.clear();
							window.parent.parent.parent.parent.location.href = "/login.html";
						});
					} else {
						if (callback != undefined) {
							callback(result)
						}
					}
				},
				beforeSend: function() {
					if (params.showLoading == undefined || params.showLoading) {
						layer.load();
					}
				},
				complete: function() {
					if (params.showLoading == undefined || params.showLoading) {
						layer.closeAll('loading');
					}
				},
				error: function(xhr) {
					layer.msg('请求失败: ' + xhr.responseText);
				}
			});
		},
		tableRender: function(params, callback) {

			var tablerender=layui.table.render({
				elem: params.elem,
				url: params.url, //数据接口
				id: params.id,
				method: params.method || 'POST',
				contentType: 'application/json',
				dataType: 'json',
				toolbar: params.toolbar,
				page:params.page||{ //支持传入 laypage 组件的所有参数（某些参数除外，如：jump/elem） - 详见文档
					layout: ['prev', 'page', 'next', 'limit', 'count', 'skip'] //自定义分页布局
					, curr: 1 //设定初始在第 5 页
					, groups: 5 //只显示 1 个连续页码
					, first: false //不显示首页
					, last: false //不显示尾页
					,limit: 10
				},
				where: params.where,
				headers: {
					"token": window.sessionStorage.getItem("health-login-cache-token")
				},
				cols: params.cols,
				response: params.response || {
					statusName: 'code' //规定数据状态的字段名称，默认：code
						,
					statusCode: 200 //规定成功的状态码，默认：0
						,
					msgName: 'msg' //规定状态信息的字段名称，默认：msg
					// ,countName: 'total' //规定数据总数的字段名称，默认：count
					// ,dataName: 'rows' //规定数据列表的字段名称，默认：data
				},
				defaultToolbar: params.defaultToolbar,
				done: function(result, curr, count) {
					if (result.code == '-1') {
						layer.msg('请求失败: ' + result.msg);
					} else if (result.code == "-9") {
						layer.msg(result.msg, {
							icon: 5,
							time: 2000,
							shade: [0.8, '#393D49']
						}, function() {
							window.sessionStorage.clear();
							window.localStorage.clear();
							window.parent.parent.parent.parent.location.href = "/login.html";
						});
					} else {
						if (callback != undefined) {
							callback(result)
						}
					}
				}
			});
			return tablerender;
		},

		checkCode: function(val) {
			var p = /^[1-9]\d{5}(18|19|20)\d{2}((0[1-9])|(1[0-2]))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/;
			var factor = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2];
			var parity = [1, 0, 'X', 9, 8, 7, 6, 5, 4, 3, 2];
			var code = val.substring(17);
			if (p.test(val)) {
				var sum = 0;
				for (var i = 0; i < 17; i++) {
					sum += val[i] * factor[i];
				}
				if (parity[sum % 11] == code.toUpperCase()) {
					return true;
				}
			}
			return false;
		},
		checkDate: function(val) {
			var pattern = /^(18|19|20)\d{2}((0[1-9])|(1[0-2]))(([0-2][1-9])|10|20|30|31)$/;
			if (pattern.test(val)) {
				var year = val.substring(0, 4);
				var month = val.substring(4, 6);
				var date = val.substring(6, 8);
				var date2 = new Date(year + "-" + month + "-" + date);
				if (date2 && date2.getMonth() == (parseInt(month) - 1)) {
					return true;
				}
			}
			return false;
		},
		checkProv: function(val) {
			var pattern = /^[1-9][0-9]/;
			var provs = {
				11: "北京",
				12: "天津",
				13: "河北",
				14: "山西",
				15: "内蒙古",
				21: "辽宁",
				22: "吉林",
				23: "黑龙江 ",
				31: "上海",
				32: "江苏",
				33: "浙江",
				34: "安徽",
				35: "福建",
				36: "江西",
				37: "山东",
				41: "河南",
				42: "湖北 ",
				43: "湖南",
				44: "广东",
				45: "广西",
				46: "海南",
				50: "重庆",
				51: "四川",
				52: "贵州",
				53: "云南",
				54: "西藏 ",
				61: "陕西",
				62: "甘肃",
				63: "青海",
				64: "宁夏",
				65: "新疆",
				71: "台湾",
				81: "香港",
				82: "澳门"
			};
			if (pattern.test(val)) {
				if (provs[val]) {
					return true;
				}
			}
			return false;
		},
		//验证身份证
		VerificationIDCode: function(val) {
			if (hdk.checkCode(val)) {
				var date = val.substring(6, 14);
				if (hdk.checkDate(date)) {
					if (hdk.checkProv(val.substring(0, 2))) {
						return true;
					}
				}
			}
			return false;
		}


	};

	//对外输出
	exports('hdk', hdk);
});
