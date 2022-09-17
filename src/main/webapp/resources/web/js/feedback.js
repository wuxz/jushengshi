$(document).ready(function() {
	$(".feedbackSubmitBtn").click(function() {
		var options = {
			type : 'POST',
			url : '/api/feedback',
			dataType : 'json',
			beforeSend : function(request) {
				request.setRequestHeader("userId", userId);
				request.setRequestHeader("userToken", userToken);
				request.setRequestHeader("deviceAgent", deviceAgent);
				request.setRequestHeader("deviceType", deviceType);
				request.setRequestHeader("deviceVersion", deviceVersion);
				request.setRequestHeader("deviceId", deviceId);
				request.setRequestHeader("appchannel", appchannel);
				request.setRequestHeader("appversion", appversion);
			},
			data : {
				content : $("#content").val(),
			},
			success : function(data) {
				if (data.code == 0) {
					alertMsg("提交成功。感谢您的宝贵意见");
				} else {
					alertMsg(data.msg);
				}
			},
			error : function(data) {
				alertMsg(data.msg);
			}
		};

		ajaxPost(options);
	});
})