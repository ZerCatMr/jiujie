layui.define(['view','admin'], function(exports){
	var $ = layui.jquery
	,laytpl = layui.laytpl
	,layer = layui.layer
	,setter = layui.setter
	,device = layui.device()
	,hint = layui.hint()
	,view = layui.view
    ,admin = layui.admin
	
	var tool ={
		filterArray: function(txtsearch,jsondata) {
			if(txtsearch==undefined || txtsearch==null || txtsearch===''){
				return jsondata;
			}
			//中文空格替换为英文
			var cleansearch=$.trim(txtsearch);
			if(cleansearch===''){
				return jsondata;
			}
            var resultjson = [];
            var txtarr=cleansearch.split(' ');
            //txtarr=$.grep(txtarr, function (x) { return $.trim(x).length > 0; });
            for(var i=0;i<jsondata.length;i++){
            	var rowstr=JSON.stringify(jsondata[i]);
            	var ismath=true;
            	for(var j=0;j<txtarr.length;j++){
            		if(rowstr.indexOf(txtarr[j])<0){
            			ismath=false;
            			break;
            		}
            	}
                if(ismath){
                    resultjson.push(jsondata[i]);
                }
			}
            return resultjson;
        },
        findIndex: function(itemarray,itemdata,itemfield){
        	var i=-1;
        	$.each(itemarray, function(index,item) {
        		if(item[itemfield]==itemdata[itemfield]){
        			i=index;
        			return;
        		}
        	});
        	return i;
        },
        initDropdown: function(control,parentctrl,data,selname,selvalue){
        	$.each(data, function (index, item) {
        		if(selname==null || selname==undefined || selvalue==null || selvalue==undefined)
                	$(control,parentctrl).append(new Option(item.Name, item.Code));
                else
                	$(control,parentctrl).append(new Option(item[selname], item[selvalue]));
            });
        },
        initDropdownByString: function(control,parentctrl,data){
        	$.each(data, function (index, item) {
        		$(control,parentctrl).append(new Option(item, item));
            });
        },
		getNowFormatDate:function() {
			var date = new Date();
			var seperator1 = "-";
			var year = date.getFullYear();
			var month = date.getMonth() + 1;
			var strDate = date.getDate();
			if (month >= 1 && month <= 9) {
				month = "0" + month;
			}
			if (strDate >= 0 && strDate <= 9) {
				strDate = "0" + strDate;
			}
			var currentdate = year + seperator1 + month + seperator1 + strDate;
			return currentdate;
		},
		compareDate:function(date1, date2) {
			var date1 = new Date(date1);
			var date2 = new Date(date2);
			if (date1.getTime() > date2.getTime()) {
				return true;
			} else {
				return false;
			}
		}
	}
	exports('tool', tool);
});