var screenplayType = getScreenplayType();
var hasScreenplay = hasScreenplay();
var modeRoundList = new Array();
var nowLen = 0;

if (hasScreenplay) {
	// 已经有剧本，直接取集数场次列表
	modeRoundList = getModeRoundList();
} else {
	// 没有剧本，自动填充集数场次列表
	var modeCount = (screenplayType == 1 ? 1 : 200);
	for (var i = 1; i <= modeCount; i++) {
		var entry = {};
		entry.mode = i;
		entry.data = new Array();
		for (var ii = 1; ii <= 200; ii++) {
			var dataEntry = {};
			dataEntry.id = 0;
			dataEntry.round = ii;

			entry.data.push(dataEntry);
		}

		modeRoundList.push(entry);
	}
}

function findRoundId(mode, round) {
	for (var i = 0; i < modeRoundList.length; i++) {
		if (modeRoundList[i].mode == mode) {
			for (var ii = 0; ii < modeRoundList[i].data.length; ii++) {
				if (modeRoundList[i].data[ii].round == round) {
					return modeRoundList[i].data[ii].id;
				}
			}
		}
	}

	return 0;
}

function enableDeleteRound() {
	$(".btn-opa.del-tbl").unbind('click');

	$(".btn-opa.del-tbl").bind(
			'click',
			function() {
				var dataId = $(this).parent().attr('dataId');
				var parentSelector = $(this).parent().parent().find(
						".hidden_parentSelector").val();
				var prefix = $(this).parent().parent().find(".hidden_prefix")
						.val();
				var fields = $(this).parent().parent().find(".hidden_fields")
						.val();

				if (dataId == 0) {
					$(this).parent().remove();
				} else {
					$(this).parent().hide();
				}

				if ($(parentSelector).find(".roundBlock:visible").length == 0) {
					addRoundHtml(prefix, parentSelector, fields.split(","),
							undefined, true);
				}
			})
}

/**
 * 收集容器内所有控件的值，用于数据提交
 * 
 * @param prefix
 * @param parentSelector
 */
function collectRoundsData(prefix, parentSelector) {
	var result = [];
	$(parentSelector).find(".roundBlock").each(function(item, block) {
		var dataId = $(this).attr('dataId');
		var entry = {
			id : dataId,
			isDeleted : false,
		};
		if (!$(this).is(":visible")) {
			entry.isDeleted = true;
			if (dataId == 0) {
				return;
			}
		}

		$(block).find(".roundItem").each(function(item2, element) {
			var id = $(element).attr("id");
			if (id.indexOf("_mode_") > 0) {
				entry.mode = $(element).val();
			} else if (id.indexOf("_round_") > 0) {
				entry.round = $(element).val();
			} else if (id.indexOf("_day_night_") > 0) {
				entry.day_night = $(element).val();
			} else if (id.indexOf("_side_") > 0) {
				entry.side = $(element).val();
			} else if (id.indexOf("_pagenum_") > 0) {
				entry.pagenum = $(element).val();
			} else if (id.indexOf("_scene_") > 0) {
				entry.scene = $(element).val();
			} else if (id.indexOf("_address_") > 0) {
				entry.address = $(element).val();
			} else if (id.indexOf("_main_role_") > 0) {
				entry.main_role = $(element).val();
			} else if (id.indexOf("_actor_") > 0) {
				entry.actor = $(element).val();
			} else if (id.indexOf("_summary_") > 0) {
				entry.summary = $(element).val();
			} else if (id.indexOf("_remark_") > 0) {
				entry.remark = $(element).val();
			}
		});

		result.push(entry);
	});

	return result;
}

/**
 * 使用数据初始化表单
 * 
 * @param data
 *            数据格式：[{id:1, mode:1, round:"2", pagenum:1, scene:"", side:1,
 *            day_night:1, address:"", main_role:"", actor:"", summary:"",
 *            remark:""}]
 * @param prefix
 * @param parentSelector
 * @param canDeleteFirst
 *            第一个场次是否允许删除
 */
function initFormWithData(data, prefix, parentSelector, fields, canDeleteFirst) {
	if (canDeleteFirst == undefined) {
		canDeleteFirst = true;
	}

	$(parentSelector).find(".roundBlock").remove();

	if (data.length == 0) {
		addRoundHtml(prefix, parentSelector, fields, undefined, canDeleteFirst);

		return;
	}

	for (var i = 0; i < data.length; i++) {
		addRoundHtml(prefix, parentSelector, fields, data[i], canDeleteFirst
				|| i > 0);
	}
}

function saveVars(prefix, parentSelector, fields) {
	var html = "";
	html += "<input class='hidden_prefix' type='hidden' value='" + prefix
			+ "'>";
	html += "<input class='hidden_parentSelector' type='hidden' value='"
			+ parentSelector + "'>";
	html += "<input class='hidden_fields' type='hidden' value='"
			+ fields.toString() + "'>";
	$(parentSelector).html(html);
}

/**
 * 生成一套分场表信息字段控件
 * 
 * @param prefix
 *            控件ID前缀
 * @param parentSelector
 *            控件的容器对象的选择器
 * @param fields
 *            字段列表["pagenum", "scene", "side", "day_night", "address",
 *            "main_role", "actor", "summary", "remark"]
 * @param data
 *            初始化数据 {id:1, mode:1, round:"2", pagenum:1, scene:"", side:1,
 *            day_night:1, address:"", main_role:"", actor:"", summary:"",
 *            remark:""}
 */
function addRoundHtml(prefix, parentSelector, fields, data, canDeleteFirst) {
	if (canDeleteFirst == undefined) {
		canDeleteFirst = true;
	}
	
	var modeLabelId = prefix + "_label-mode_" + nowLen;
	var modeInputId = prefix + "_mode_" + nowLen;
	var modeDivId = prefix + "_jiopt-mode_" + nowLen;
	var roundInputId = prefix + "_round_" + nowLen;
	var roundDivId = prefix + "_jiopt-round_" + nowLen;
	var modeAreaId = prefix + "_jiarea-mode_" + nowLen;
	var roundAreaId = prefix + "_jiarea-round_" + nowLen;

	var html = "";
	html += "<div class=\"shTabItem roundBlock pp_round_info_vv\" dataId='"
			+ (data ? data.id : 0) + "'>";

	html += "<div class=\"inRow\">";

	html += "<span id='" + modeAreaId + "'><label class=\"mr5\" style=\"display: none;\" id=\""
			+ modeLabelId
			+ "\"><b class=\"notNull\">*</b>选择集数  <input type=\"text\" name='"+prefix+"_mode_"+nowLen+"' class=\"w10 roundItem\" id=\""
			+ modeInputId + "\" value=\"0\" digits required> <!--<a href=\"viewScreenplay('"
			+ modeInputId + "', '" + roundInputId + "');\">查看剧本</a>--></label>";
	html += "<div class=\"round_ji_option\" style=\"display: none;\" id=\""
		+ modeDivId + "\"></div></span>";
	html += "<span id='" + roundAreaId + "'><label class=\"mr5\"><b class=\"notNull\">*</b>选择场次  <input ";
	html += "type=\"text\" class=\"w10 roundItem\" name='"+prefix+"_round_"+nowLen+"' id=\"" + roundInputId
			+ "\" value=\"1\" required> <!--<a href=\"viewScreenplay('" + modeInputId
			+ "', '" + roundInputId + "');\">查看剧本</a>-->";
	html += "</label>";
	html += "<div class=\"round_ji_option\" style=\"display: none;\" id=\""
			+ roundDivId + "\"></div></span>";

	if ($.inArray("day_night", fields) >= 0) {
		html += "<label class=\"mr5 shSele\"><b class=\"notNull\">*</b>日/夜\n"
				+ "						<select name='"+prefix+"_day_night_"+nowLen+"' class='w10 roundItem' id=\"" + prefix
				+ "_day_night_" + nowLen + "\" required>\n"
				+ "							<option value=\"1\">日</option>\n"
				+ "							<option value=\"2\">夜</option>\n"
				+ "							<option value=\"3\">晨</option>\n"
				+ "							<option value=\"4\">昏</option>\n"
				+ "							<option value=\"5\">其他</option>\n"
				+ "						</select>\n" + "					</label>\n";
	}
	if ($.inArray("side", fields) >= 0) {
		html += "					<label class=\"mr5 shSele\"><b class=\"notNull\">*</b>内/外\n"
				+ "						<select class='roundItem' name='"+prefix+"_side_"+nowLen+"' required id=\"" + prefix + "_side_"
				+ nowLen + "\">\n" + "							<option value=\"1\">内</option>\n"
				+ "							<option value=\"2\">外</option>\n"
				+ "							<option value=\"3\">其他</option>\n"
				+ "						</select>\n" + "					</label>\n";
	}

	if ($.inArray("pagenum", fields) >= 0) {
		html += "					<label>页数\n"
				+ "						<input type=\"text\" class=\"w10 roundItem\" id=\""
				+ prefix + "_pagenum_" + nowLen + "\" value='0'>\n"
				+ "					</label>";
	}

	html += "</div>";// inRow

	if ($.inArray("day_night", fields) >= 0) {
		html += "<div class='inRow extr'><span class=\"ml32\"><b class=\"notNull\">*</b>场景</span><input  required name='"+prefix+"_scene_"+nowLen+"' class='w10 roundItem' id=\""
				+ prefix + "_scene_" + nowLen + "\">\n" + "				</div>\n";
	}

	if ($.inArray("address", fields) >= 0) {
		html += "				<div class=\"inRow extr\">\n";
		html += "					<span class=\"marl16\">拍摄地</span>\n"
				+ "					<input class='roundItem' name=\"\" id=\"" + prefix
				+ "_address_" + nowLen + "\">\n"
		html += "				</div>\n";
	}

	if ($.inArray("main_role", fields) >= 0) {
		html += "				<div class=\"div_ext\">\n" + "					<span>主要角色</span>\n"
				+ "					<textarea class='roundItem' name=\"\" id=\"" + prefix
				+ "_main_role_" + nowLen + "\"></textarea>		\n"
				+ "				</div>\n";
	}

	if ($.inArray("actor", fields) >= 0) {
		html += "				<div class=\"div_ext\">\n"
				+ "					<span class=\"marl\">临演/特约</span>\n"
				+ "					<textarea class='roundItem' name=\"\" id=\"" + prefix
				+ "_actor_" + nowLen + "\"></textarea>		\n" + "				</div>\n";
	}

	if ($.inArray("summary", fields) >= 0) {
		html += "				<div class=\"div_ext\">\n" + "					<span>内容梗概</span>\n"
				+ "					<textarea class='roundItem' name=\"\" id=\"" + prefix
				+ "_summary_" + nowLen + "\"></textarea>\n" + "				</div>\n";
	}

	if ($.inArray("remark", fields) >= 0) {
		html += "				<div class=\"inRow extr\">\n" + "					<span>补充内容</span>\n"
				+ "					<input class='roundItem' name=\"\" id=\"" + prefix
				+ "_remark_" + nowLen + "\" placeholder=\"没有可不填\">\n"
				+ "				</div>\n";
	}

	if (canDeleteFirst) {
		html += "<button type='button' class='btn-opa del-tbl'>删除该表</button>\n";
	}

	html += "<div class=\"waveLine\"></div>";
	html += "</div>";// shTabItem

	$(parentSelector).append(html);

	if (data) {
		$('#' + modeInputId).val(data.mode);
		$('#' + roundInputId).val(data.round);
		$('#' + prefix + "_day_night_" + nowLen).val(data.day_night);
		$('#' + prefix + "_side_" + nowLen).val(data.side);
		$('#' + prefix + "_pagenum_" + nowLen).val(data.pagenum);
		$('#' + prefix + "_scene_" + nowLen).val(data.scene);
		$('#' + prefix + "_address_" + nowLen).val(data.address);
		$('#' + prefix + "_main_role_" + nowLen).val(data.main_role);
		$('#' + prefix + "_actor_" + nowLen).val(data.actor);
		$('#' + prefix + "_summary_" + nowLen).val(data.summary);
		$('#' + prefix + "_remark_" + nowLen).val(data.remark);
	}

	enableDeleteRound();

	initModeRoundSelect(prefix, nowLen);

	nowLen++;
}

function initModeRoundSelect(prefix, surffix) {
	var modeLabelId = "#" + prefix + "_label-mode_" + surffix;
	var modeInputId = "#" + prefix + "_mode_" + surffix;
	var modeDivId = "#" + prefix + "_jiopt-mode_" + surffix;
	var roundInputId = "#" + prefix + "_round_" + surffix;
	var roundDivId = "#" + prefix + "_jiopt-round_" + surffix;
	var modeAreaId = "#" + prefix + "_jiarea-mode_" + surffix;
	var roundAreaId = "#" + prefix + "_jiarea-round_" + surffix;
	
	$(roundAreaId).on('mouseleave', function(){
		$(roundDivId).hide();
	});

	if (screenplayType == 2) {
		$(modeLabelId).show();
		$(modeInputId).click(function() {
			if ($(modeDivId).is(":visible")) {
				$(modeDivId).hide();
				return;
			}
			if ($(roundDivId).is(":visible")) {
				$(roundDivId).hide();
				return;
			}

			creatJiOption($(modeDivId), true, 0, this);
		});

		// $("#mode").blur(function() {
		// $("#jiopt_mode").hide();
		// })
	} else {
		$(modeInputId).val(0);
	}

	$(roundInputId).click(function() {
		if ($(modeDivId).is(":visible")) {
			$(modeDivId).hide();
			return;
		}
		if ($(roundDivId).is(":visible")) {
			$(roundDivId).hide();
			return;
		}

		$(roundDivId).show();

		creatJiOption($(roundDivId), false, $(modeInputId).val(), this);
	});

	// $("#round").blur(function() {
	// $("#jiopt_round").hide();
	// })
	$(modeInputId).change(function() {
		loadRoundData(this);
	});
	$(roundInputId).change(function() {
		loadRoundData(this);
	});
}

/**
 * 加载分场表数据到各个控件中
 * 
 * @param obj
 *            触发加载的控件对象
 */
function loadRoundData(obj) {
	var id = $(obj).attr("id");
	var prefix = id.substr(0, id.indexOf("_"));
	var index = $(obj).parent().parent().parent().attr("nowLen");
	var modeInputId = "#" + prefix + "_mode_" + index;
	var roundInputId = "#" + prefix + "_round_" + index;

	var mode = $(modeInputId).val();
	var round = $(roundInputId).val();
	var id = findRoundId(mode, round);
	if (id == 0) {
		return;
	}

	var options = {
		url : '/api/proxy',
		dataType : 'json',
		async : false,
		beforeSend : function(request) {
			request.setRequestHeader("staffId", staffId);
		},
		data : {
			targetUrl : "/rounds/detail",
			id : id,
		},
		success : function(data) {
			if (data.code == 0) {
				$("#" + prefix + "_scene_" + index).val(data.data.scene);
				$("#" + prefix + "_side_" + index).val(data.data.side);
				$("#" + prefix + "_day_night_" + index)
						.val(data.data.day_night);
				$("#" + prefix + "_main_role_" + index)
						.val(data.data.main_role);
				$("#" + prefix + "_actor_" + index).val(data.data.actor);
				$("#" + prefix + "_summary_" + index).val(data.data.summary);
				$("#" + prefix + "_remark_" + index).val(data.data.remark);
			}
		},
		error : function(data) {
			alertMsg(data.msg);
		}
	};

	ajaxPost(options);
}

/**
 * 创建集数和场次的下拉列表，点击后更新指定的输入框的值
 * 
 * @param parent
 *            列表从属的div
 * @param isJi
 *            是否为填充集数
 * @param mode
 *            当前集数
 * @param controller
 *            待更新的输入框
 */
function creatJiOption(parent, isJi, mode, controller) {
	parent.html('');

	var currentValue = $(controller).val();
	if (modeRoundList == null || modeRoundList == undefined
			|| modeRoundList.length == 0)
		return;

	var node = '';
	if (isJi) {
		for (var i = 0; i < modeRoundList.length; i++) {
			var classText = "";
			if (modeRoundList[i].mode == currentValue) {
				classText = "ji_checked";
			}

			node += '<li class=\'' + classText + '\'>' + modeRoundList[i].mode
					+ '</li>';
		}
	} else {
		// 集数可能不全，必须一一对比进行匹配
		for (var i = 0; i < modeRoundList.length; i++) {
			if (modeRoundList[i].mode == mode) {
				for (var ii = 0; ii < modeRoundList[i].data.length; ii++) {
					var classText = "";
					if (modeRoundList[i].data[ii].round == currentValue) {
						classText = "ji_checked";
					}

					node += '<li class=\'' + classText + '\'>'
							+ modeRoundList[i].data[ii].round + '</li>';
				}

				break;
			}
		}
	}
	node = '<ul>' + node + '</ul>';
	parent.append(node);

	$(parent).find('li').bind('click', (function() {
		var value = $(this).html();
		var id = $(this).parent().parent().attr("id");
		$('#' + id.replace('jiopt-', '')).val(value);
		loadRoundData($('#' + id.replace('jiopt-', '')));

		$(this).parent().parent().hide();
	}));

	parent.show();
}

/**
 * 获得剧组的场次类型 1顺序编号 2分集编号
 * 
 * @returns {Number}
 */
function getScreenplayType() {
	var type = 0;
	var options = {
		url : '/api/proxy',
		dataType : 'json',
		async : false,
		beforeSend : function(request) {
			request.setRequestHeader("staffId", staffId);
		},
		data : {
			targetUrl : "/staff/detail",
			staffid : staffId,
		},
		success : function(data) {
			if (data.code == 0) {
				type = data.data.screenplay_type;
			}
		},
		error : function(data) {
			alertMsg(data.msg);
		}
	};

	ajaxPost(options);

	return type;
}

/**
 * 是否已经有已发布的剧本 true有 false无
 */
function hasScreenplay() {
	var result;

	var options = {
		url : '/api/proxy',
		dataType : 'json',
		async : false,
		beforeSend : function(request) {
			request.setRequestHeader("staffId", staffId);
		},
		data : {
			targetUrl : "/screenplay/index",
			staffid : staffId,
			size : 1,
		},
		success : function(data) {
			if (data.code == 0) {
				result = data.data.list.length > 0;
			}
		},
		error : function(data) {
			alertMsg(data.msg);
		}
	};

	ajaxPost(options);

	return result;

}

/**
 * 获得当前已发布剧本的场次列表 [ { "mode": "1", "data": [ { "id": "3", "round": "1C" } ] }, {
 * "mode": "2", "data": [ { "id": "4", "round": "2D" } ] } ]
 * 
 * @returns
 */
function getModeRoundList() {
	var result;

	var options = {
		url : '/api/proxy',
		dataType : 'json',
		async : false,
		beforeSend : function(request) {
			request.setRequestHeader("staffId", staffId);
		},
		data : {
			targetUrl : "/rounds/list",
			staffid : staffId,
		},
		success : function(data) {
			if (data.code == 0) {
				result = data.data.list;
			} else {
				alertMsg(data.msg);
			}
		},
		error : function(data) {
			alertMsg(data.msg);
		}
	};

	ajaxPost(options);

	return result;

}
