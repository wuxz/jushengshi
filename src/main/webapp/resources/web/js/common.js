function validform(selector, rules) {
	/* 关键在此增加了一个return，返回的是一个validate对象，这个对象有一个form方法，返回的是是否通过验证 */
	return $(selector).validate({
		errorPlacement : function(error, element) {
		},
		rules : rules,
	});
}

$.validator.setDefaults({
	onkeyup : false,
});

jQuery.validator.addMethod("regex", function(value, element, tel) {
	// var tel = /^[0-9]{6}$/;
	return (this.optional(element) || (tel.test(value))) == true;
}, "内容无效");

jQuery.validator.addMethod("mobile", function(value, element) {
	return (this.optional(element) || (/^1[0-9]{10}$/.test(value))) == true;
}, "内容无效");

jQuery.validator
		.addMethod(
				"realname",
				function(value, element) {
					return (this.optional(element) || (/^[\u4e00-\u9fa5]{1,10}[·.]{0,1}[\u4e00-\u9fa5]{1,10}$/
							.test(value))) == true;
				}, "内容无效");

jQuery.validator.addMethod("password", function(value, element) {
	return (this.optional(element) || (/^.{6,15}$/.test(value))) == true;
}, "内容无效");

function getParameterByName(name, url) {
	if (!url)
		url = window.location.href;
	name = name.replace(/[\[\]]/g, "\\$&");
	var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"), results = regex
			.exec(url);
	if (!results)
		return null;
	if (!results[2])
		return '';

	return decodeURIComponent(results[2].replace(/\+/g, " "));
}

function createLoad(id) {
	var node = '<div id="'
			+ id
			+ '" style="position:fixed;width:100%;height:100%;z-index:15000;left:0;top:0;background:rgba(145,145,145,.5);display:table-cell;vertical-align:middle;"><img src="/resources/web/images/loading52.gif" style="width:100px;position:absolute;left:50%;top:50%;transform:translate(-50%,-50%);"></div>'
	$('body').append(node);
}

function ajaxPost(options) {
	var id = "_post_id";
	createLoad(id);
	var oriSuccess = options.success;
	var oriCancel = options.cancel;
	var oriError = options.error;
	options.success = function(data) {
		$("#" + id).remove();
		options.success = oriSuccess;
		options.cancel = oriCancel;
		options.error = oriError;

		options.success(data);
	};
	options.cancel = function(data) {
		$("#" + id).remove();
		options.success = oriSuccess;
		options.cancel = oriCancel;
		options.error = oriError;

		options.cancel(data);
	};
	options.error = function(data) {
		$("#" + id).remove();
		options.success = oriSuccess;
		options.cancel = oriCancel;
		options.error = oriError;

		alertMsg("应用出错，请稍后重试");
	};

	$.ajax(options);
}
$(document).ready(function(){
	$('.close').hover(function(){
		$(this).attr('src','/resources/web/images/closeHover.png');
	},function(){
		$(this).attr('src','/resources/web/images/homeclose.png');
	});
});

function alertMsg(msg) {
	var text = '<div id="dialog-message" title="剧省事儿" style="display:none;">' + msg + '</div>';
	$("body").append(text);
	$( "#dialog-message" ).dialog({
	      modal: true,
	      buttons: {
	        Ok: function() {
	        	$( "#dialog-message" ).remove();
	        }
	      }
	    });
}