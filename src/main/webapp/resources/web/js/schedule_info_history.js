$(document).ready(function() {
	// ------------------获取最新发布列表---------------
	var options = {
		url : '/api/schedule_history_summary',
		dataType : 'json',
		beforeSend : function(request) {
			request.setRequestHeader("staffId", staffId);
		},
		data : {
			staffId : staffId,
		},
		success : function(data) {
			if (data.code == 0) {
				$('.contTable tbody').html('');

				var listArr = data.data.list;
				var length = listArr.length;

				var html = "";
				for (var i = 0; i < length; i++) {
					html += "<tr class=\"tblRows\"><td><a href=\"schedule_history?staffId=" + staffId + "&version=" + listArr[i].version + "\">" + listArr[i].pubTime + " 修改版</a></td></tr>";
				}

				$('.contTable tbody').html(html);
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
