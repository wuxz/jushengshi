var version;
$(document).ready(function() {
	var status = getParameterByName("status");
	if (status == null || status == '' || status == undefined) {
		status = 0;
	}

	version = getParameterByName("version");
	if (version == null || version == undefined) {
		version = '';
	}

	// ------------------获取最新列表---------------
	var options = {
		url : '/api/schedule_list',
		dataType : 'json',
		beforeSend : function(request) {
			request.setRequestHeader("staffId", staffId);
		},
		data : {
			staffId : staffId,
			status : status,
			version : version
		},
		success : function(data) {
			showSearchHtml(data, status);
		},
		error : function(data) {
			alertMsg(data.msg);
		}
	};
	ajaxPost(options);
});

function publishSchedule() {
	config.isShowDepartment = false;
	config.title = '选择审批人';
	config.callBack = publishSheduleStep2;
	config.initMebList();
}

function publishSheduleStep2(data) {
	if (data.length == 0) {
		publishScheduleDirectly(data);
		
		return;
	} else {
		applyPublishSchedule(data);
	}
}

function publishScheduleDirectly(data) {
	options = {
			url : '/api/proxy',
			dataType : 'json',
			beforeSend : function(request) {
				request.setRequestHeader("staffId", staffId);
			},
			data : {
				targetUrl : "/schedule/publish",
				version : version,
			},
			success : function(data) {
				alertMsg('发布期表成功');
				window.location.href = "schedule_info?staffId=" + staffId
						+ "&status=40";
			},
			error : function(data) {
				alertMsg(data.msg);
			}
		};
	
		ajaxPost(options);
}

function applyPublishSchedule(data) {
	// var usersStr = "[";
	// var groupsStr = "[";
	// for (var i = 0; i < data.length; i++) {
	// 	usersStr += '{"mobile":"' + data[i].userMob + '",' + '"name":"'
	// 			+ data[i].userName + '"}' + ',';
	// 	for (var j = 0; j < data[i].department.length; j++) {
	// 		groupsStr += '"' + data[i].department[j] + '",';
	// 	}
	// }
	// usersStr = usersStr.substring(0, usersStr.length - 1) + ']';
	// groupsStr = groupsStr.substring(0, groupsStr.length - 1) + ']';
	// var userJson;
	// var groupJson;
	// var options = {
	// 	type : 'POST',
	// 	url : '/api/proxy',
	// 	dataType : 'json',
	// 	data : {
	// 		targetUrl : '/apply/send',
	// 		staffid : staffId,
	// 		types : 2,
	// 		users : usersStr,
	// 		groups : groupsStr
	// 	},
	// 	success : function(data) {
	// 		if (data.code == 0) {
	// 			console.log(data);
	// 			alertMsg("提交审核成功");
	// 		} else {
	// 			alertMsg(data.msg);
	// 		}
	// 	},
	// 	error : function(data) {
	// 		alertMsg('获取失败');
	// 	}
	// }
	
	// ajaxPost(options);

	 var usersStr = "[";
	for (var i = 0; i < data.length; i++) {
		usersStr += '{"mobile":"' + data[i].userMob + '",'+'"userid":"' +data[i].userid +  '",' + '"name":"'	+ data[i].userName + '"}' + ',';
		
	}
	usersStr = usersStr.substring(0, usersStr.length - 1) + ']';
	var breakAudit = {
		url : '/api/proxy',
		dataType : 'json',
		type : 'POST',
		beforeSend : function(request) {
			request.setRequestHeader("staffid", staffId);
		},
		async : false,
		data : {
			targetUrl : '/audit/add',
			staffid : staffId,
			audit : usersStr,
			sourceid : version,
			type : 2,
		},
		success : function(data) {
			
			if (data.code == 0) {
				location.href="/web/schedule_auditing?staffId="+staffId+"&status=20"	
			} else {
				alertMsg(data.msg)
			}

		},
		error : function() {
			alertMsg("提交审批时遇到问题");
		}
	}
	ajaxPost(breakAudit);
}

function showSearchHtml(data, status) {
	if (data.code == 0) {
		$('.memberTabl tbody').html('');

		var listArr = data.data.list;
		var length = listArr.length;
		var sideArr = [ '内场', '外场', '其它' ];
		var dayArr = [ '日', '夜', '晨', '昏', '其他' ];

		var html = "";
		version = "";
		for (var i = 0; i < length; i++) {
			for (var ii = 0; ii < listArr[i].rounds.length; ii++) {
				html += "<tr class=\"tblRows\">";
				if (ii == 0) {
					html += "<td class=\"\" rowspan=\""
							+ listArr[i].rounds.length + "\">"
							+ listArr[i].pdate + "</td>";
					version = listArr[i].version;
				}
				var round = listArr[i].rounds[ii];
				var roundName = (round.mode == 0 ? round.round : ''
						+ round.mode + '-' + round.round);
				html += "<td class=\"round\" roundId=\"" + round.id + "\">"
						+ roundName + "</td>";
				html += "<td>" + round.scene + "</td>";
				html += "<td>" + dayArr[round.dayNight - 1] + "</td>";
				html += "<td>" + sideArr[round.side - 1] + "</td>";
				html += "<td>" + round.address + "</td>";
				html += "<td>" + round.summary + "</td>";
				html += "<td>" + round.mainRole + "</td>";
				html += "<td>" + round.actor + "</td>";
				html += "<td>" + (round.remark == undefined ? "" : round.remark)
						+ "</td>";

				if (ii == 0 && status == 10) {
					html += "<td rowspan=\"" + listArr[i].rounds.length
							+ "\"><a href=\"javascript:editSchedule('"
							+ staffId + "', '" + listArr[i].pdate + "', '"
							+ listArr[i].status
							+ "')\"><span class=\"editMem\" scheduleId=\""
							+ listArr[i].id + "\">编辑</span></a></td>";
					html += "</tr>";
				}
			}
		}

		$('.memberTabl tbody').html(html);

		if (version == "" || version == null) {
			return;
		}

		// ------------------获取审批人列表---------------
		options = {
			url : '/api/proxy',
			dataType : 'json',
			beforeSend : function(request) {
				request.setRequestHeader("staffId", staffId);
			},
			data : {
				targetUrl : "/audit/list/",
				sourceid : version,
				staffid : staffId,
				type : 2,
			},
			success : function(data) {
				if (data.code == 0) {
					var text = "";
					for (var i = 0; i < data.data.length; i++) {
						text = data.data[i].name + " ";
					}
					if(text.length==0){
						$("#auditor").html('无');
					}else{
						$("#auditor").html(text);	
					}
					
				} else {
					alertMsg(data.msg);
				}
			},
			error : function(data) {
				alertMsg(data.msg);
			}
		};
		ajaxPost(options);
	} else {
		alertMsg(data.msg);
	}
}

function editSchedule(staffId, pdate, status) {
	document.location.href = "schedule_edit?staffId=" + staffId + "&pdate="
			+ pdate + "&status=" + status;
}



