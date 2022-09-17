var currId = 0; // 当前行的ID
var oldId = 0;
var hiddenUserIds = [];

$(document).ready(function() {
	loadForm();

	$("#hotelName").blur(function() {
		var oldVal = $(this).attr("oldval");
		var val = $(this).val();
		if (oldVal == val) {
			return;
		}

		saveStaffHotelName();
	});

	$(".searchBtn").click(function() {
		loadForm();
	});
});

function loadForm() {
	var options = {
		type : 'POST',
		url : '/api/list_hotel_info',
		dataType : 'json',
		data : {
			staffId : staffId,
			staffHotelId : staffHotelId,
			keyword : $(".search").val(),
		},
		success : function(data) {
			if (data.code == 0) {
				$("#hotelName").val(data.data.staffHotel.name);
				$(".showMemberList").html('');
				$(".search").val('');

				hiddenUserIds.length = 0;

				for (var i = 0; i < data.data.list.length; i++) {
					var item = data.data.list[i];

					if (item.userId != null) {
						hiddenUserIds.push(item.userId);
					}

					html = '<tr class="tblRows" rowId="' + item.id + '">';
					html += '<td>' + (i + 1) + '</td>';
					html += '<td><input id="roomNum' + item.id
							+ '" name="roomNum' + item.id + '" value="'
							+ printData(item.roomNum) + '"></td>';
					html += '<td>' + item.realname + '</td>';
					html += '<td>' + printGender(item.gender) + '</td>';
					html += '<td><input id="hotelName' + item.id
							+ '" name="hotelName' + item.id + '" value="'
							+ printData(item.hotelName) + '"></td>';
					html += '<td><input id="roomType' + item.id
							+ '" name="roomType' + item.id + '" value="'
							+ printData(item.roomType) + '"></td>';
					html += '<td><input id="inDate' + item.id
							+ '" name="inDate' + item.id + '" value="'
							+ printData(item.inDate)
							+ '" class="showdate" ></td>';
					html += '<td><input id="leaveDate' + item.id
							+ '" name="leaveDate' + item.id + '" value="'
							+ printData(item.leaveDate)
							+ '" class="showdate" ></td>';
					html += '<td><input id="days' + item.id + '" name="days'
							+ item.id + '" value="' + item.days
							+ '" readonly></td>';
					html += '<td><input id="price' + item.id + '" name="price'
							+ item.id + '" value="' + item.price + '"></td>';
					html += '<td><input id="totalPrice' + item.id
							+ '" name="totalPrice' + item.id + '" value="'
							+ item.totalPrice + '"></td>';
					html += '<td><span class="del_hotel_info" onclick="javascript:deleteHotelInfo(\''
							+ item.id + '\')">移除</span></td>';

					$('.contTable .memberTabl .showMemberList').append(html);

					laydate({
						elem : '#inDate' + item.id,
						id : item.id,
						choose : function(data, options) {
							calcPrice($(options.elem));
						},
					});
					laydate({
						elem : '#leaveDate' + item.id,
						id : item.id,
						choose : function(data, options) {
							calcPrice($(options.elem));
						},
					});

					// $("#days" + item.id).change(function() {
					// calcPrice(this);
					// });

					$("#price" + item.id).change(function() {
						calcPrice(this);
					});
				}

				$('.contTable .memberTabl .showMemberList')
						.append(
								"<tr><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td><label id='daysTotal'></label></td><td>总计</td><td><label id='priceTotal'></label></td></tr>");

				calcTotalPrice();

				$("#fm1").find("input").each(function(index, element) {
					$(element).attr("oldval", $(element).val());
				})

				$("#fm1 .showMemberList .tblRows input")
						.focusin(
								function() {
									oldId = currId;
									currId = $(this).parent().parent().attr(
											"rowId");
									if (currId == undefined || currId == oldId) {
										// 如果新焦点不在输入区域，不能保存currId。
										currId = oldId;
										return;
									}

									var modified = false;
									var oldTr = $("#fm1 .showMemberList .tblRows[rowId='"
											+ oldId + "']");
									$(oldTr)
											.find("input")
											.each(
													function(index, element) {
														if ($(element).attr(
																"oldval") != $(
																element).val()) {
															modified = true;
														}
													})

									if (modified) {
										saveHotelInfo(oldTr);
									}
								});
			} else {
				alertMsg(data.msg);
			}
		},
		error : function(data) {
			alertMsg('获取失败');
		}
	}

	ajaxPost(options);
}

function printGender(gender) {
	return gender == 1 ? '男' : gender == 2 ? '女' : '';
}

function printData(data) {
	return data == null ? '' : data;
}

function deleteStaffInfo() {
	if (!confirm('你确认要删除整张表吗？')) {
		return;
	}

	var options = {
		type : 'POST',
		url : '/api/delete_staff_hotel',
		dataType : 'json',
		data : {
			staffId : staffId,
			staffHotelId : staffHotelId,
		},
		success : function(data) {
			if (data.code == 0) {
				window.location.href = "staff_hotel_list?staffId=" + staffId;
			} else {
				alertMsg(data.msg);
			}
		},
		error : function(data) {
			alertMsg('获取失败');
		}
	}

	ajaxPost(options);
}

function importStaffInfo() {
	config.isShowDepartment = true;
	config.title = '选择联系人';
	config.callBack = doImportStaaffInfo;
	config.hiddenUserIds = hiddenUserIds;
	config.initMebList();
}

function doImportStaaffInfo() {
	var userIds = "";
	for (var i = 0; i < config.userInfoList.length; i++) {
		userIds = userIds + "," + config.userInfoList[i].userid;
	}

	var options = {
		type : 'POST',
		url : '/api/import_staff_hotel',
		dataType : 'json',
		data : {
			staffId : staffId,
			staffHotelId : staffHotelId,
			userIds : userIds,
		},
		success : function(data) {
			if (data.code == 0) {
				alertMsg("导入人员成功");
				window.location.reload();
			} else {
				alertMsg(data.msg);
			}
		},
		error : function(data) {
			alertMsg('获取失败');
		}
	}

	ajaxPost(options);
}

function saveStaffHotelName() {
	var options = {
		type : 'POST',
		url : '/api/update_staff_hotel',
		dataType : 'json',
		data : {
			staffId : staffId,
			id : staffHotelId,
			name : $("#hotelName").val(),
		},
		success : function(data) {
			if (data.code == 0) {
				alertMsg("保存新名称成功");
			} else {
				alertMsg(data.msg);
			}
		},
		error : function(data) {
			alertMsg('获取失败');
		}
	}

	ajaxPost(options);
}

function saveHotelInfo(trObj) {
	var rowId = $(trObj).attr('rowId');
	var options = {
		type : 'POST',
		url : '/api/save_hotel_info',
		contentType : "application/json",
		dataType : 'json',
		data : JSON.stringify({

			staffId : staffId,
			staffHotelId : staffHotelId,
			id : rowId,
			roomNum : $("#roomNum" + rowId).val(),
			hotelName : $("#hotelName" + rowId).val(),
			roomType : $("#roomType" + rowId).val(),
			inDate : $("#inDate" + rowId).val(),
			leaveDate : $("#leaveDate" + rowId).val(),
			days : $("#days" + rowId).val(),
			price : $("#price" + rowId).val(),
			totalPrice : $("#totalPrice" + rowId).val(),
		}),
		success : function(data) {
			if (data.code == 0) {
			} else {
				alertMsg(data.msg);
			}
		},
		error : function(data) {
			alertMsg('获取失败');
		}
	}

	ajaxPost(options);
	$(trObj).find("input").each(function(index, element) {
		$(element).attr("oldval", $(element).val());
	})
}

function deleteHotelInfo(rowId) {
	var options = {
		type : 'POST',
		url : '/api/delete_hotel_info',
		dataType : 'json',
		data : {
			staffId : staffId,
			hotelInfoId : rowId,
		},
		success : function(data) {
			if (data.code == 0) {
				window.location.reload();
			} else {
				alertMsg(data.msg);
			}
		},
		error : function(data) {
			alertMsg('获取失败');
		}
	}

	ajaxPost(options);
}

function calcPrice(obj) {
	var id = $(obj).parent().parent().attr("rowId");
	var inDate = new Date($("#inDate" + id).val());
	var leaveDate = new Date($("#leaveDate" + id).val());
	if (inDate == "" || leaveDate == "") {
		return;
	}
	var days = (leaveDate.getTime() - inDate.getTime()) / 86400000;
	$("#days" + id).val(days);
	var price = $("#price" + id).val();
	$("#totalPrice" + id).val(days * price);

	calcTotalPrice();
}

function calcTotalPrice() {
	var daysTotal = 0;
	var priceTotal = 0;
	$("#fm1 .showMemberList .tblRows").each(function(index, element) {
		var rowId = $(element).attr("rowId");
		daysTotal += parseInt($("#days" + rowId).val());
		priceTotal += parseInt($("#totalPrice" + rowId).val());
	});

	$("#daysTotal").html(daysTotal);
	$("#priceTotal").html(priceTotal);
}