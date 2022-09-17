var fields = [ "pdate", "pagenum", "scene", "side", "day_night", "address",
		"main_role", "actor", "summary", "remark" ];
var parentSelector = "#dynamicContent";
var prefix = "c";

var pdate = getParameterByName("pdate");
var status = getParameterByName("status");

$(document).ready(
		function() {
			laydate({
				elem : '#pdate',
				choose : onPdateChanged,
			});
			
			var validator = validform("#fm1");

			$('#pdate').change(function() {
				onPdateChanged();
			});

			saveVars(prefix, parentSelector, fields);

			if (pdate && status) {
				initForm();
			} else {
				addRoundHtml(prefix, parentSelector, fields);
			}

			$(".add-tbl.mb30").click(function() {
				addRoundHtml(prefix, parentSelector, fields);
			})

			$(".notice-btn-s.btn-send").click(
					function() {
						if (!validator.form()) {
							alertMsg('请填写正确的内容');

							return;
						}

						var datas = collectRoundsData(prefix, parentSelector);
						//console.log(datas);
						for (var i = 0; i < datas.length; i++) {
							var data = datas[i];
							if (!saveSchedule(data)) {
								return;
							}
						}

						window.location.href = "schedule_editing?staffId="
								+ staffId + "&status=10";
					})

					$(".notice-btn-s.save_add").click(
							function() {
								if (!validator.form()) {
									alertMsg('请填写正确的内容');

									return;
								}

								var datas = collectRoundsData(prefix, parentSelector);
								//console.log(datas);
								for (var i = 0; i < datas.length; i++) {
									var data = datas[i];
									if (!saveSchedule(data)) {
										return;
									}
								}

								window.location.href = "schedule_edit?staffId="
									+ staffId + "&status=10";
							})
		});

function onPdateChanged() {
	pdate = $('#pdate').val();
	initForm();
}
/**
 * 初始化表单
 */
function initForm() {
	var options = {
		url : '/api/proxy',
		dataType : 'json',
		beforeSend : function(request) {
			request.setRequestHeader("staffId", staffId);
		},
		data : {
			targetUrl : "/schedule/index",
			pdate : pdate,
			staffid : staffId,
			ispublish : (status == 40 ? 1 : 2),
		},
		success : function(data) {
			if (data.code == 0) {
				$("#pdate").val(pdate);

				var datas = [];
				for (var i = 0; i < data.data.list.length; i++) {
					var entry = data.data.list[i];
					entry.round = entry.round;

					datas.push(entry);
				}

				initFormWithData(datas, prefix, parentSelector, fields, true)
			}
		},
		error : function(data) {
			alertMsg(data.msg);
		}
	};

	ajaxPost(options);
}

/**
 * 保存期表数据
 * 
 * @param lineData
 */
function saveSchedule(lineData) {
	var isDeleted = lineData.isDeleted;
	lineData.staffid = staffId, delete lineData.isDeleted;

	if (isDeleted) {
		var options = {
			url : '/api/proxy',
			dataType : 'json',
			async : false,
			beforeSend : function(request) {
				request.setRequestHeader("staffId", staffId);
			},
			data : {
				targetUrl : "/schedule/del",
				staffid : staffId,
				id : lineData.id,
			},
			success : function(data) {
				if (data.code == 0) {
					alertMsg('ok');
				} else {
					alertMsg(data.msg);
				}
			},
			error : function(data) {
				alertMsg(data);
			}
		};

		ajaxPost(options);

		return;
	} else if (lineData.id > 0) {
		// 是修改
		lineData.targetUrl = "/schedule/edit";
		lineData.pday = $("#pday").val();
	} else {
		// 是新增
		lineData.targetUrl = "/schedule/add";
		delete lineData.id;
	}

	lineData.pdate = $("#pdate").val();
	if (lineData.pdate == '') {
		alertMsg('数据不全');
		return false;
	}

	var options = {
		url : '/api/proxy',
		dataType : 'json',
		async : false,
		beforeSend : function(request) {
			request.setRequestHeader("staffId", staffId);
		},
		data : lineData,
		success : function(data) {
			if (data.code == 0) {
			} else {
				alertMsg(data.msg);
			}
		},
		error : function(data) {
			alertMsg(data);
		}
	};

	ajaxPost(options);

	return true;
}
