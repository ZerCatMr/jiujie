layui.define(['jquery'], function(exports) {
    var $ = layui.$;
    'use strict';
    var form;
    var MESSAGE = {
        required: "当前选项不能为空！",
        min: 0,
        max: 0,
        minlength: 0,
        maxlength: 0,
        rule: "",
        equal: "",
        mobile: "请输入有效的手机号码",
        email: "请输入规则的电子邮箱",
        idcard: "请输入有效的身份证号码",
        select: "请选择选项",
        radio: "请选择选项",
        checkbox: "请选择选项"
    };
    var change;
    function validate(e){
        var data = {
            required: required,
            min: minOrMax,
            max: minOrMax,
            minlength: lengths,
            maxlength: lengths,
            rule: rules,
            equal: equal,
            mobile: mobile,
            email: email,
            idcard: IdCard,
            select: select,
            radio: radio,
            checkbox: checkbox
        };
        var objects = e.target ? e.target : e;
        for (var item in data) {
            if (objects.getAttribute("data-" + item)) {
                data[item]()
            }
        }
        function radio(){
           //判断当前radio 是否有 class layui-form-radioed 
           //有则表示选中了
           _this = objects;
           let className = new Array();
           //radio
           let radio_length = _this.childNodes.length;
           let radio = _this.childNodes;
           for(let i=0;i<radio_length;i++){
              className.push(radio[i].className);
           }
           console.log(className);
           if(className.indexOf("layui-unselect layui-form-radio layui-form-radioed")==-1){
             error_tag("请选择选项", _this);
           }
        }
        
        function checkbox(){
            //判断当前checkbox 是否有 class layui-form-checked 
            //有则表示选中了
            _this = objects;
            let className = new Array();
            //checkbox
            let checkbox_length = _this.childNodes.length;
            let checkbox = _this.childNodes;
            for(let i=0;i<checkbox_length;i++){
               className.push(checkbox[i].className);
            }
            console.log(className);
            if(className.indexOf("layui-unselect layui-form-checkbox layui-form-checked")==-1){
              error_tag("请选择选项", _this);
            }
         }
        function select(){
            var value = objects.value,
                errorMessage = objects.getAttribute("data-select");
                //alert(value);
            if (value == '' || value == 0 || value == null || value==NaN) {
                error_tag(errorMessage, objects);
                return false
            }
            return true
        }
        function required() {
            var value = objects.value,
                errorMessage = objects.getAttribute("data-required");
            if (value == '' || value == null) {
                error_tag(errorMessage, objects);
                return false
            }
            return true
        }

        function minOrMax() {
            var value = (objects.value),
                min = parseInt(objects.getAttribute("data-min")),
                max = parseInt(objects.getAttribute("data-max"));
            value = parseInt(value);
            if (value) {
                if (isNaN(value) || min > value) {
                    error_tag("最小值为：" + min, objects);
                    return false
                } else if (!isNaN(max) && max < value) {
                    error_tag("最大值为：" + max, objects);
                    return false
                }
            }
            return true
        }

        function lengths() {
            var value = objects.value.length,
                max = parseInt(objects.getAttribute("data-maxlength")),
                min = parseInt(objects.getAttribute("data-minlength"));
            if (value < min) {
                error_tag("最少输入" + min + "个字符", objects);
                return false
            } else if (value > max) {
                error_tag("最多输入" + max + "个字符", objects);
                return false
            }
            return true
        }

        function rules() {
            var value = objects.value,
                rule = objects.getAttribute("data-rule"),
                errorMessage = objects.getAttribute("data-rule-message");
            if (!errorMessage) errorMessage = "格式错误!";
            rule = new RegExp(rule);
            if (value) {
                if (!rule.test(value)) {
                    error_tag(errorMessage, objects);
                    return false
                }
            }
            return true
        }

        function equal() {
            var value = objects.value,
                equal = document.querySelector(objects.getAttribute("data-equal")).value,
                errorMessage = "两次输入内容不一致";
            if (value != equal) {
                error_tag(errorMessage, objects);
                return false
            }
            return true
        }

        function mobile() {
            var value = objects.value,
                rule_tel = /^(0\d{2,3}\d{7,8}|0\d{2,3}-)\d{7,8}$/,
                rule_phone = /^(13[0-9]|14[579]|15[0-3,5-9]|16[6]|17[0135678]|18[0-9]|19[89])\d{8}$/,
                errorMessage = objects.getAttribute("data-mobile");
                if(value==''||value==null){
                    error_tag("当前输入不能为空", objects);
                    return false
                }     
            if (value && !rule_phone.test(value) && !rule_tel.test(value)) {
                error_tag(errorMessage, objects);
                return false
            }
            return true
        }

        function email() {
            var value = objects.value,
                rule_email = /^([0-9A-Za-z\-_\.]+)@([0-9a-z]+\.[a-z]{2,3}(\.[a-z]{2})?)$/g,
                errorMessage = objects.getAttribute("data-email");
            if (value && !rule_email.test(value)) {
                error_tag(errorMessage, objects);
                return false
            }
            return true
        }

        function IdCard() {
            var value = objects.value,
                rule_email = /^([1-9]\d{5}[1]\d{3}(0[1-9]|1[0-2])(0[1-9]|[1-2]\d|3[0-1])\d{3}[0-9xX]|[1-9]\d{5}\d{2}(0[1-9]|1[0-2])(0[1-9]|[1-2]\d|3[0-1])\d{3})$/,
                errorMessage = objects.getAttribute("data-idcard");
            if(value==''||value==null){
                error_tag("当前输入不能为空", objects);
                return false
            }    
            if (value && !rule_email.test(value)) {
                error_tag(errorMessage, objects);
                return false
            }
            return true
        }
    }
    function error_tag(errorMessage, target) {
        clear_error(target);
        var block = target.getAttribute("data-block");
        target.classList.add("ver-error-input");
        var errorTag = document.createElement("span");
        if (!block) {
            var iconCarets = document.createElement("i");
            iconCarets.className = "verJsFont ver-icon-carets ver-error-caret";
            errorTag.appendChild(iconCarets);
            errorTag.className = "ver-errors"
        } else {
            errorTag.className = "ver-errors ver-errorMessageBlock"
        }
        var iconInfo = document.createElement("i");
        iconInfo.className = "verJsFont icon-info-o";
        errorTag.appendChild(iconInfo);
        var span = document.createElement("span");
        span.innerText = errorMessage;
        errorTag.appendChild(span);
        insertAfter(errorTag, target);
        var iconcolor = target.getAttribute("data-icon-color");
        if (iconcolor) {
            var parent = (target.offsetParent);
            var iconcirle = parent.querySelector("iconcirle");
            iconcirle.classList.add("ver-error-inputs")
        }
    }
    function clear_error(e) {
        if (e.target) {
            var _0 = e.target
        } else {
            var _0 = e
        }
        var parent = _0.parentElement;
        var errorTag = "";
        if (parent) {
            errorTag = parent.querySelector(".ver-errors");
            if (errorTag) {
                parent.removeChild(errorTag)
            }
            _0.classList.remove("ver-error-input");
            var iconcolor = _0.getAttribute("data-icon-color");
            if (iconcolor) {
                var parent = (_0.offsetParent);
                var iconcirle = parent.querySelector("iconcirle");
                iconcirle.classList.remove("ver-error-inputs")
            }
        }
    }
    function insertAfter(item, afters) {
        var parent = afters.parentNode;
        if (parent.lastChild == afters) {
            parent.appendChild(item)
        } else {
            parent.insertBefore(item, afters.nextSibling)
        }
    }
    
    var FormValidate=function(param){
        this.init(param);
    };
    FormValidate.prototype={
        constructor:FormValidate,
        init:function(param){
            form = document.querySelector(param);
            this.bind(param.data, param.message);
        },
        validateAll:function() {
            this.verifications();
            var error = form.querySelectorAll(".ver-error-input").length;
            if (error > 0) {
                form.querySelector(".ver-error-input").focus();
                return false
            }
            return true
        },
        verifications:function() {
            for (var i in MESSAGE) {
                var names = form.querySelectorAll("[data-" + i + "]");
                if (names.length > 0) {
                    [].forEach.call(names, function(e) {
                        validate(e);
                    })
                }
            }
        },
        bind:function(data, message){
            if (data) {
                for (var i in data) {
                    var names = document.getElementsByName(i);
                    [].forEach.call(names, function(item) {
                        for (var j in data[i]) {
                            var messages = message && message[i] && message[i][j] ? message[i][j] : _0.messages[j];
                            if (j != "min" && j != "max" && j != "minlength" && j != "maxlength" && j != "rule" && j != "equal") {
                                item.setAttribute("data-" + j, messages)
                            } else if (j == "rule") {
                                item.setAttribute("data-rule", data[i][j]);
                                item.setAttribute("data-rule-message", messages)
                            } else {
                                item.setAttribute("data-" + j, data[i][j])
                            }
                        }
                    })
                }
            }
            for (var i in MESSAGE) {
                var names = form.querySelectorAll("[data-" + i + "]");
                [].forEach.call(names, function(items) {
                    var val = items.getAttribute("data-" + i);
                    if (val == "true" || val == "false") {
                        items.setAttribute("data-" + i, MESSAGE[i])
                    };
                    console.log(items);
                    //当前的元素为input
                    if(items.tagName.toLocaleLowerCase() == 'input'){
                        items.onblur = function(e){
                            validate(e);
                        };
                        items.change = function(e) {
                            validate(e);
                        };
                        items.onfocus = function(e) {
                            clear_error(e);
                        };
                        if (change == "keyup") {
                            items.onkeyup = function(e) {
                                validate(e);
                            }
                        }
                    }else if(items.tagName.toLocaleLowerCase() == 'select')
                    {
                       //当前元素为select 垃圾没有点击事件 
                       items.onclick = function(e){
                           alert("你点击了我");
                       }
                       //这里一点不灵活 难维护
                       let dd_length=items.parentNode.childNodes[2].childNodes[1].childNodes.length;
                       for(var i=1;i<dd_length;i++){
                           items_div = items.parentNode.childNodes[2].childNodes[1].childNodes[i];
                           items_div.onclick = function(){
                            let items_span=items.parentNode.childNodes[2];
                            if(items_span.tagName.toLocaleLowerCase() == 'span'){
                                items.classList.remove("ver-error-input");
                               items_span.remove();
                            }

                         }
                       }
                    }
                    else if(items.tagName.toLocaleLowerCase() == 'div')
                    {
                       
                        //radio
                        //这里一点不灵活 难维护
                       if(items.attributes.hasOwnProperty("data-radio")){
                            radio_length = items.childNodes.length;
                            radio = items.childNodes;
                            for(let i=0;i<radio_length;i++){
                                radio[i].onclick = function(){
                                let items_span=items.parentNode.childNodes[4];
                                if(items_span.tagName!=undefined){
                                    if(items_span.tagName.toLocaleLowerCase() == 'span'){
                                        items.classList.remove("ver-error-input");
                                        items_span.remove();
                                    }
                                }
                            }   
                            }
                       } 
                       //checkbox
                       if(items.attributes.hasOwnProperty("data-checkbox")){
                            checkbox_length = items.childNodes.length;
                            checkbox = items.childNodes;
                            for(let i=0;i<checkbox_length;i++){
                                checkbox[i].onclick = function(){
                                let items_span=items.parentNode.childNodes[4];
                                if(items_span.tagName!=undefined){
                                    if(items_span.tagName.toLocaleLowerCase() == 'span'){
                                        items.classList.remove("ver-error-input");
                                        items_span.remove();
                                    }
                                }
                            }   
                            }
                        } 
                    } 
                    else
                    {

                    }  
                })
            }
        }
    };

    FormValidate.other=$.formvalidate;

    $.formvalidate=function(){
       return new FormValidate();
    };
    $.formvalidate.FormValidate = FormValidate;

    $.formvalidate.noConflict = function () {
        $.formvalidate = FormValidate.other;
        return this;
    };
    exports('formvalidate', FormValidate);
});