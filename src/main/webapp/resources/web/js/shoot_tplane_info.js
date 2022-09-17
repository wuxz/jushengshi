var fields = [ "pdate", "pagenum", "scene", "side", "day_night", "main_role",
		"actor", "summary", "remark" ];
var parentSelector = "#t_roundData";
var prefix = "t";
$(document).ready(function() {
	saveVars(prefix, parentSelector, fields);
	addRoundHtml(prefix, parentSelector, fields,'',false);
	$("#addTomorrow").click(function() {// 新增按钮
		addRoundHtml(prefix, parentSelector, fields);
	})
});
