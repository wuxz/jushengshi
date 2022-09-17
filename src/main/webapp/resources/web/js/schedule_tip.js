$(document).ready(function() {
	
	var version = getParameterByName("version");
	if (version == null || version == undefined) {
		version = '';
	}
	approveList(20,version)		
})
function approveList(status,version){
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
			
			if(data.code==0){
				var listLen = data.data.list.length;
				if(listLen>0){
					$(".scheNav .scheNavItem4").html("审批中（1）");
				}
			}
		},
		error : function(data) {
			alert(data.msg);
		}
	};
	ajaxPost(options);	
}