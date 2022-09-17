$(document).ready(function(){
	var screenplay_type;
	//获取分场表列表
	var breakOutList = {
		url : '/api/proxy',
		dataType:'json',
		type:'POST',
		beforeSend :function(request) {
			request.setRequestHeader("staffId", staffId);
		},
		async:false,
		data:{
			targetUrl:'/rounds/index',
			staffid:staffId,
			size:100000,	
		},
		success:function(data){		
			if(data.code==0){
				breakOut_list_html(data);
			}else{
				//console.log(data.msg)
			}		
			
		}
	}
	ajaxPost(breakOutList);
				
	

	//获取剧组信息
	var castInfo = {
		url : '/api/proxy',
		dataType:'json',
		type:'POST',
		async:false,	
		data:{
			targetUrl:'/staff/detail',
			staffid:staffId,	
		},
		success:function(data){
			if(data.code==0){
				screenplay_type = data.data.screenplay_type;
			}else{
				//console.log(data.msg)
			}		
			
		}
	}
	ajaxPost(castInfo);

	//添加分场表
	$("#addBreakOutTable").click(function(){
		//console.log(screenplay_type);
		if(screenplay_type==1){			
			location.href="/web/round_film_info?staffId="+staffId+"&markInfo=add";	
		}else if(screenplay_type==2){
			location.href="/web/round_TV_info?staffId="+staffId+"&markInfo=add";	
		}else{
			alertMsg("此类型剧种尚未确定")
		}
		
	})
	//关键词搜索
	$("#searchBtn").click(function(){
		var searchContent = $("#searchContent").val();
		if(searchContent.length>0){
			location.href="/web/round_info_search?staffId="+staffId+"&searchContent="+encodeURIComponent(encodeURIComponent(searchContent));	
		}else{			
			$("#searchContent").addClass("bordercolor");
			
		}
		
	});
	$("#searchContent").keyup(function(event) {
		if (event.keyCode == 13) {
			var searchContent = $("#searchContent").val();
			if(searchContent.length>0){
				location.href="/web/round_info_search?staffId="+staffId+"&searchContent="+encodeURIComponent(encodeURIComponent(searchContent));	
			}else{			
				$("#searchContent").addClass("bordercolor");
				
			}
		}
	});
	
	$("#roundSelectTime .selectUl li").click(function(){
		var searchHtml = $(this).html();		
		searchRound(searchHtml,'');				
	})
	$("#roundSelectSide .selectUl li").click(function(){
		var searchSide = $(this).html();
		searchRound('',searchSide);		
	})
	function searchRound(v_searchHtml,v_searchSide){
		var keyword = $("searchContent").val();
		var searchHtml;
		var searchSide;
		if(v_searchHtml==''){
			searchHtml = $("#roundSelectTime .select").html();	
		}else{
			searchHtml = v_searchHtml;	
		}
		if(v_searchSide==''){
			searchSide = $("#roundSelectSide .select").html();
		}else{
			searchSide=v_searchSide;
		}	
		var day_night=0
		if(searchHtml=="日"){
			day_night=1;
		}else if(searchHtml=="夜"){
			day_night=2;
		}else if(searchHtml=="晨"){
			day_night=3;
		}else if(searchHtml=="昏"){
			day_night=4;
		}else if(searchHtml=="其他"){
			day_night=5;
		}
				
		var side=0;		
		if(searchSide=="内"){
			side=1;
		}else if(searchSide=="外"){
			side=2;
		}else if(searchSide=="其他"){
			side=3;
		}
		
		var searchList = {
			url : '/api/proxy',
			dataType:'json',
			type:'POST',
			async:false,
			beforeSend :function(request) {
						request.setRequestHeader("staffId", staffId);
			},
			data:{
				targetUrl:'/search/rounds',
				staffid:staffId,
				keyword:keyword,
				side:side,
				day_night:day_night,	
			},
			success:function(data){			
				if(data.code==0){
					breakOut_list_html(data)				
				}else{
					//console.log(data.msg)
				}		
				
			}
		}
		ajaxPost(searchList);
	}

	function breakOut_list_html(data){
		var node ='';
		var itemArr = data.data.list;
		if(itemArr.length>0){
			var number=0;
			for(i=0;i<itemArr.length;i++){
				if(itemArr[i].status==-1){
					continue;
				}
				number++;
				var str ='';
				var dayside ='';
				var day_night='';
				var side='';
				
				if(itemArr[i].day_night==1){
					day_night="日";
				}else if(itemArr[i].day_night==2){
					day_night="夜";
				}else if(itemArr[i].day_night==3){
					day_night="晨";
				}else if(itemArr[i].day_night==4){
					day_night="昏";
				}else if(itemArr[i].day_night==5){
					day_night="其他";
				}
				
				if(itemArr[i].side==1){
					side="内";
				}else if(itemArr[i].side==2){
					side="外";
				}else if(itemArr[i].side==3){
					side="其他";
				}
				
				if(itemArr[i].status==-1){
					str +="<td class='delete screenplayList'>";
				}else{
					str +="<td class='screenplayList'>";
				}
				if(itemArr[i].mode==0){
					if(itemArr[i].status==-1){
						str +=  "<a href='javascript:;'>"+number+"."+itemArr[i].scene+"</td>";
					}else{
						str +=  "<a href='/web/round_film_info?staffId="+staffId+"&markInfo=edit&id="+itemArr[i].id+"'>"+number+"."+itemArr[i].scene+"</td>";	
					}
					
				}else{
					if(itemArr[i].status==-1){
						str +=  "<a href='javascript:;'>"+number+"."+itemArr[i].scene+"</td>";
					}else{
						str +=  "<a href='/web/round_TV_info?staffId="+staffId+"&markInfo=edit&id="+itemArr[i].id+"'>"+number+"."+itemArr[i].scene+"</td>";	
					}
					
				}
				if(itemArr[i].status==-1){
					dayside += "<td class='delete tblTime'>"+day_night+"</td>"
							 +"<td class='delete side'>"+side+"</td>"
				}else{
					dayside += "<td class='tblTime'>"+day_night+"</td>"
							 +"<td class='side'>"+side+"</td>"
				}				
				node += "<tr class='tblRows'>"				
				+str+dayside
				+"<td></td>"
				+"<tr>"
			}
			$(".roundTbl tbody").html('');
			$(".roundTbl tbody").html(node);			
		}else{
			$(".roundTbl tbody").html('');
		}		
	}
	
	$("#sendBreakOutTable").click(function(){
		
		config.isShowDepartment = true;
		config.isview.round=true;
		config.title = '开通查看分场表权限';
		config.callBack = sendBreakOutTable;
		config.initMebList();
	});
	function sendBreakOutTable(userList,userArr,cuserArr){
		//console.log(data);
		var usersStr = "[";
		var groupsStr = "[";
		var cuserStr = "[";
		for (var i = 0; i < userArr.length; i++) {
			usersStr += '{"mobile":"' + userArr[i].userMob + '",' + '"name":"'+ userArr[i].userName + '"}' + ',';							
		 	if(userArr[i].department.length>0){
				for(var j=0;j<userArr[i].department.length;j++){
					groupsStr += '"' + userArr[i].department[j] +'",';
				}
			}else{
				groupsStr += "";
			}	
		}
		switch(usersStr.substr(-1)==','){
			case true:
				usersStr = usersStr.substring(0,usersStr.length-1) + ']';
				break;
			case false:
				usersStr +=']';	
				break;
		}
		for(var i=0;i<cuserArr.length;i++){
			cuserStr += '{"mobile":"'+ cuserArr[i].userMob +'",' +'"name":"' + cuserArr[i].userName + '"}'+',';	
		}
		switch(cuserStr.substr(-1)==','){
			case true:
				cuserStr = cuserStr.substring(0,cuserStr.length-1) + ']';
				break;
			case false:
				cuserStr +=']';
				break;	
		}
		switch(groupsStr.substr(-1)==','){
			case true:
				groupsStr = groupsStr.substring(0,groupsStr.length-1) + ']';
				break;
			case false:
				groupsStr +=']';
				break;
		}	
		var options = {
		 	type : 'POST',
		 	url : '/api/proxy',
		 	dataType : 'json',
		 	data : {
		 		targetUrl : '/apply/send',
		 		staffid : staffId,
		 		types : 2,
		 		users : usersStr,
		 		cusers:cuserStr,
		 		groups : groupsStr
		 	},
		 	success : function(data) {
		 		if (data.code == 0) {			 			
		 			alertMsg("发送分场表成功");
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
	
})