$(document).ready(
		function() {
			$("#memberSetting").click(function() {
				$(".meng,.memSet").css({
					"display" : "block"
				});

				reloadFields();
				enableSelectFieldDiv();
			})

			// 点击创建字段
			$("#createOneField").click(
					function() {
						var selfFieldValue = $("#selfDefine").val();
						if (selfFieldValue.length == 0) {
							$("#selfDefine").addClass('bordercolor');
							return false;
						}

						var node = '';
						node += "<div class='memItem on'>" + "<h4>"
								+ selfFieldValue
								+ "</h4><i class='memItem_close'></i>"
								+ "</div>"
						$(".memSet .setSection").append(node);
						$("#selfDefine").val('');

						enableSelectFieldDiv();
					})

			// 
			$("#saveSettings").click(function() {
				saveSettings();
			});

			// 关闭弹窗
			$("#closeSettings").click(function() {
				$(".meng,.memSet").css({
					"display" : "none"
				});
			});
		});

// 重新加载数据并展示
function reloadFields() {
	var protectedFields = [ "姓名", "性别", "电话", "职务", "权限", "身份证号", "银行帐号",
			"开户银行" ];

	var fieldList = getFieldList(); // 当前选中的字段列表
	var node = '';
	for (i = 0; i < fieldList.length; i++) {
		if (fieldList[i].status == 2) {
			// 已经选中的
			var lockedText = "";
			if ($.inArray(fieldList[i].field, protectedFields) != -1) {
				// 是受保护的字段
				lockedText = " locked";
			}
			node += "<div class='memItem on" + lockedText + "'>" + "<h4>"
					+ fieldList[i].field + "</h4>" + "</div>";
		} else {
			node += "<div class='memItem off'>" + "<h4>" + fieldList[i].field
					+ "</h4>" + "</div>"
		}
	}

	$(".memSet .setSection").html(node);
}

// 设置指定的字段的状态
function setApiFieldStatus(field, status) {
	var options = {
		url : '/api/proxy',
		dataType : 'json',
		type : 'POST',
		data : {
			targetUrl : '/addressbook/changlefieldstatus',
			staffid : staffId,
			field : field,
			status : status,
		},
		success : function(data) {
		}
	}

	ajaxPost(options);

}

function addApiField(Field) {
	var saveSelfField = {
		url : '/api/proxy',
		dataType : 'json',
		type : 'POST',
		async : false,
		data : {
			targetUrl : '/addressbook/addtemplatefield',
			staffid : staffId,
			field : Field,
		},
		success : function(data) {
		},
		error : function(data) {
			alertMsg('error');
		}
	}
	ajaxPost(saveSelfField);
}

// 查询当前选中的字段列表
function getFieldList() {
	var fields = [];

	// 获创建字段
	var options = {
		url : '/api/proxy',
		dataType : 'json',
		type : 'POST',
		async : false,
		data : {
			targetUrl : '/addressbook/templatefieldlist',
			staffid : staffId,
		},
		success : function(data) {
			for ( var i in data.data.list) {
				// if (data.data.list[i].status == 2) {
				fields.push(data.data.list[i]);
				// }
			}
		}
	}

	ajaxPost(options);

	return fields;
}

// 根据字段名称，在列表里查找
function findItemByField(title, fieldList) {
	for ( var i in fieldList) {
		if (fieldList[i].field == title) {
			return fieldList[i];
		}
	}

	return null;
}

// 允许切换各个字段的选中状态
function enableSelectFieldDiv() {
	$(".memSet .setSection .memItem").unbind('click');
	enableDelFieldDiv();

	$(".memSet .setSection .memItem").click(function() {
		if ($(this).hasClass("locked")) {
			return;
		}

		var $self = $(this);
		var bool = $self.hasClass('off');
		if (bool) {
			$self.removeClass('off');
			$self.addClass('on');
		} else {
			$self.removeClass('on');
			$self.addClass('off');
		}
	})
}

// 允许删除新添加的自定义字段
function enableDelFieldDiv() {
	$(".memSet .setSection .memItem .memItem_close").unbind('click');

	$(".memSet .setSection .memItem .memItem_close").click(function() {
		$(this).parent('.memItem').remove();
	})
}

function saveSettings() {
	var fieldList = getFieldList();
	var selectedFields = [];
	var unselectedFields = [];
	var newFields = [];
	$(".memSet .setSection .memItem").each(function() {
		var $self = $(this)
		var bool = $self.hasClass("on");
		if (bool) {
			selectedFields.push($self.find('h4').html());
		} else {
			unselectedFields.push($self.find('h4').html());
		}
	})

	for (i = 0; i < selectedFields.length; i++) {
		var item = findItemByField(selectedFields[i], fieldList);
		if (item == null) {
			// 原来没有这个字段，这是新增的字段
			newFields.push(selectedFields[i]);

			// 从选中字段中去除此字段
			delete selectedFields[i];
		} else if (item.status == "1") {
			// 字段被选中，原来是未选中。不做操作。保留此字段用于选中。
		} else {
			// 字段被选中，原来就是选中。去除此字段，不用重复选中。
			delete selectedFields[i];
		}
	}

	for (i = 0; i < unselectedFields.length; i++) {
		var item = findItemByField(unselectedFields[i], fieldList);
		if (item == null) {
			// 原来没有这个字段，应该不可能发生。
			// 从选中字段中去除此字段，不用重复未选中。
			delete unselectedFields[i];
		} else if (item.status == "1") {
			// 字段未选中，原来是未选中。去除此字段，不用重复未选中。
			delete unselectedFields[i];
		} else {
			// 字段被选中，原来就是选中。不做操作。保留此字段用于未选中。
		}
	}

	for (i = 0; i < newFields.length; i++) {
		addApiField(newFields[i])
	}

	for (i = 0; i < selectedFields.length; i++) {
		if (selectedFields[i]) {
			setApiFieldStatus(selectedFields[i], 2);
		}
	}

	for (i = 0; i < unselectedFields.length; i++) {
		if (unselectedFields[i]) {
			setApiFieldStatus(unselectedFields[i], 1);
		}
	}

	$(".meng,.memSet").css({
		"display" : "none"
	});
}
