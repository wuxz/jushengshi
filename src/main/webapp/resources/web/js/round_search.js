$(document).ready(function(){
	//接受参数
	var args = GetUrlParms();	
	function GetUrlParms(){
		var args=new Object();   
		var query=location.search.substring(1);//获取查询串   	
		var pairs=query.split("&");//在逗号处断开   
		for(var i=0;i<pairs.length;i++){   
			var pos=pairs[i].indexOf('=');//查找name=value   
			if(pos==-1)   continue;//如果没有找到就跳过   
			var argname=pairs[i].substring(0,pos);//提取name   
			var value=pairs[i].substring(pos+1);//提取value   
			args[argname]=unescape(value);//存为属性   
		}
		
		return args;
	}
	keyword = decodeURIComponent(args.searchContent)
	$("#searchContent").val(keyword);
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
	
	function breakOut_list_html(data){
		var node ='';
		var itemArr = data.data.list;
		if(itemArr.length>0){
			var number = 0;
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
			$(".roundTbl tbody").html(node);			
		}else{
			$(".roundTbl tbody").html('');
		}		
	}
	
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
	
	
	
	$("#searchDayNight .selectUl li").click(function(){
		var search_daynight = $(this).html();
		searchRound(search_daynight,'');		
	})
	$("#searchSide .selectUl li").click(function(){
		var search_side = $(this).html();
		searchRound('',search_side);		
	})
	function searchRound(v_search_daynight,v_searchSide){
		var keyword = $("#searchContent").val();		
		
		if(v_search_daynight.length>0){
			var searchHtml = v_search_daynight;
		}else{
			var searchHtml = $("#searchDayNight .select").html();	
		}
		
		if(v_searchSide.length>0){
			var searchSide = v_searchSide;
		}else{
			var searchSide = $("#searchSide .select").html();
		}
				
		var day_night=0;		
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
		
		var side=0		
		if(searchSide=='内'){
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
			beforeSend :function(request) {
				request.setRequestHeader("staffId", staffId);
			},
			async:false,
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
	
})