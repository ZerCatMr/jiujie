
layui.define(['layer'],function(exports){
  var $ = layui.jquery
  var hydcommon = {
    getDictToFrom : function(id,dictname,type){
        //从缓存里拿数据 to do
        var dictData = sessionStorage.getItem(dictname);
        var value='';
        if(dictData=null||dictData==undefined){
            //根据ditname获取数据
           var input = {
                  ExtInfoObj: {                                           //之后去掉ExtInfoObj 现在方便调取重金接口
           			Count: 2147483647,
           			Operator: "U17091300004",
           			OrganCode: "Org000001123",
           			PsnCd: "U17091300004",
           		},
                 DictTypeCd: dictname
           }
           $.ajax({
                 url: "/api/BasicService/QueryDictInfo", //调用重精接口
                 data: JSON.stringify(input),
                 dataType: 'json',
                 type: 'post',
                 async: false,
                 headers: {
                     'Content-Type': 'application/json'
                 },
                 success: function(Data) {
                     if(Data.code == "1") {
                         dealDictToFrom(id,type,dictname,Data.data);
                     }
                     //sessionStorage.setItem(dictname,JSON.stringify(Data.data));
                     console.log("获取字典成功：" + dictname + "类型：" + dictname);
                 },
                 error: function(xhr, type, errorThrown) {
                     console.log("获取字典出错：" + dictname + "类型：" + dictname);
                 }
             });
        }else{
        dealDictToFrom(dictData);
        }
    },
    setDictToFrom : function(id,dictname,value,type){
        //从缓存里拿数据 to do
        var dictData = sessionStorage.getItem(dictname);
        if(dictData==null||dictData==undefined){
             //根据ditname获取数据
             var input = {
                   DictTypeCd: dictname
             }
             $.ajax({
                   url: "",
                   data: JSON.stringify(input),
                   dataType: 'json',
                   type: 'get',
                   async: false,
                   headers: {
                       'Content-Type': 'application/json'
                   },
                   success: function(Data) {
                       if(Data.code == "1") {
                           dealDictToFrom(id,type,dictname,Data.data);
                       }
                       //sessionStorage.setItem(dictname,JSON.stringify(Data.data));
                       console.log("获取字典成功：" + dictname + "类型：" + dictname);
                   },
                   error: function(xhr, type, errorThrown) {
                       console.log("获取字典出错：" + dictname + "类型：" + dictname);
                   }
               });
        }else{
        dealDictToFrom(dictData);
        }
    }
  }
  function dealDictToFrom(id,type,value,data){
      switch (type){
          case "select":setDictToSelect(id,value,data);
          break;
          case "radio":setDictToRadio(id,value,data);
          break;
          case "checkbox":setDictToCheckBox(id,value,data);
          break;
      }
  }
  function setDictToSelect(id,value,data){
      var html="<option value='0'>---请选择---</option>";
      $.each(data, function() {
          if(data.Cd==value){
              html+="<option value='" + this.Cd + "' id='" + this.Cd + "'selected>" + this.Nam + "</option>";
          }else{
              html+="<option value='" + this.Cd + "' id='" + this.Cd + "'>" + this.Nam + "</option>";
          }
      })
      $("#LAY_app_body .layadmin-tabsbody-item.layui-show "+ "#" + id + "").append(html);
  }
  function setDictToRadio(id,value,data){
      var html='';
      $.each(data,function(){
           if(data.Cd==value){
             html+="<input type='radio' id='"+this.Cd+"' name='"+id+"' value='"+this.Cd+"' title='"+this.Nam+"' checked=''>";
           }else{
             html+="<input type='radio' id='"+this.Cd+"' name='"+id+"' value='"+this.Cd+"' title='"+this.Nam+"'>";
           }
      });
      $("#LAY_app_body .layadmin-tabsbody-item.layui-show "+ "#" + id + "").html(html);
  }
  function setDictToCheckBox(id,value,data){
      var html='';
      $.each(data,function(){
          if(data.Cd==value){
             html+="<input type='checkbox' id='"+this.Cd+"' name='"+id+"["+this.Cd+"]' lay-skin='primary' value='"+this.Cd+"' title='"+this.Nam+"' checked=''>";
          }else{
             html+="<input type='checkbox' id='"+this.Cd+"' name='"+id+"["+this.Cd+"]' lay-skin='primary' value='"+this.Cd+"' title='"+this.Nam+"'>";
          }
      });
      $("#LAY_app_body .layadmin-tabsbody-item.layui-show "+ "#" + id + "").html(html);
  }
  //对外输出
   exports('hydcommon', hydcommon);
});