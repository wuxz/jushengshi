var round_fields = [ "pdate", "pagenum", "scene", "side", "day_night","main_role", "actor", "summary", "remark" ];
var round_parentSelector = "#c_roundData";
var round_prefix = "c";
$(document).ready(
	function() {						
		saveVars(round_prefix, round_parentSelector, round_fields);			
		addRoundHtml(round_prefix, round_parentSelector, round_fields,'',false);		
		$("#addRoundData").click(function() {//新增按钮				
			addRoundHtml(round_prefix, round_parentSelector, round_fields);
		})			
});
