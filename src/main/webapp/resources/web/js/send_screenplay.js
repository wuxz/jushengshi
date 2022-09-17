$(document).ready(function(){	
	$('#sendScreenplay').click(function(){
		config.initMebList();
		config.isShowDepartment=true;
		config.title = '选择发布范围';
		config.callBack=send_screenplay;
	});
	function send_screenplay(data){
		var usersStr = "[";
		var groupsStr = "[";
		for(var i=0;i<data.length;i++){
			usersStr += '{"mobile":"'+ data[i].userMob +'",' +'"name":"' + data[i].userName + '"}'+',';
			if(data[i].department.length>0){
				for(var j=0;j<data[i].department.length;j++){
					groupsStr += '"' + data[i].department[j] +'",';
				}
			}else{
				groupsStr += "";
			}		
		}
		if(usersStr.substr(-1)==','){
			usersStr = usersStr.substring(0,usersStr.length-1) + ']';
		}else{
			usersStr +=']';
		}
		if(groupsStr.substr(-1)==','){
			groupsStr = groupsStr.substring(0,groupsStr.length-1) + ']';
		}else{
			groupsStr +=']';
		}
		var userJson;
		var groupJson;
		var options = {
			type:'POST',
			url:'/api/proxy',
			dataType:'json',
			data:{
				targetUrl:'/apply/send',
				staffid:staffId,
				types:1,
				users:usersStr,
				groups:groupsStr
			},
			success:function(data){
				if(data.code==0){
					
				}else{
					alertMsg(data.msg);					
				}
			},
			error:function(data){
				alertMsg('获取失败');
			}
		}
		ajaxPost(options);
	}
	
});