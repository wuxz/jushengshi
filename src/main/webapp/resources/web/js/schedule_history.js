$(document).ready(function() {
	var version = getParameterByName("version");
	if (version == null || version == undefined) {
		version = '';
	}

	// ------------------获取最新发布列表---------------
	var options = {
		url : '/api/schedule_history_list',
		dataType : 'json',
		beforeSend : function(request) {
			request.setRequestHeader("staffId", staffId);
		},
		data : {
			staffId : staffId,
			version : version
		},
		success : function(data) {
			showSearchHtml(data);
		},
		error : function(data) {
			alertMsg(data.msg);
		}
	};
	ajaxPost(options);

	// ------------------获取审批人列表---------------
	options = {
		url : '/api/proxy',
		dataType : 'json',
		beforeSend : function(request) {
			request.setRequestHeader("staffId", staffId);
		},
		data : {
			targetUrl:"/audit/list/",
			sourceid : version,
			staffid : staffId,
			type : 2,
		},
		success : function(data) {
			if (data.code == 0){
				var text = "";
				for (var i = 0; i < data.data.length; i ++) {
					text = data.data[i].name + " ";
				}
				
				$("#auditor").html(text);
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

function showSearchHtml(data) {
	if (data.code == 0) {
		$('.memberTabl tbody').html('');

		var listArr = data.data.list;
		var length = listArr.length;
		var sideArr = [ '内场', '外场', '其它' ];
		var dayArr = [ '日', '夜', '晨', '昏', '其他' ];

		var html = "";
		for (var i = 0; i < length; i++) {
			for (var ii = 0; ii < listArr[i].rounds.length; ii++) {
				html += "<tr class=\"tblRows\">";
				if (ii == 0) {
					html += "<td class=\"\" rowspan=\""
							+ listArr[i].rounds.length + "\">"
							+ listArr[i].pdate + "</td>";
				}
				var round = listArr[i].rounds[ii];
				var roundName = (round.mode == 0 ? round.round : ''
						+ round.mode + '-' + round.round);
				html += "<td class=\"round\" roundId=\"" + round.id + "\">"
						+ roundName + "</td>";
				html += "<td>" + round.scene + "</td>";
				html += "<td>" + dayArr[round.dayNight - 1] + "</td>";
				html += "<td>" + dayArr[round.side - 1] + "</td>";
				html += "<td>" + round.address + "</td>";
				html += "<td>" + round.summary + "</td>";
				html += "<td>" + round.mainRole + "</td>";
				html += "<td>" + round.actor + "</td>";
				html += "<td>" + (round.extra == undefined ? "" : round.extra)
						+ "</td>";

				if (ii == 0) {
					html += "</tr>";
				}
			}
		}

		$('.memberTabl tbody').html(html);
	} else {
		alertMsg(data.msg);
	}
}