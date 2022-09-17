var token = $.cookie('token');
if(typeof(token)=='undefined'){
	token='';
}
if(token.length==0){
	location.href="/weixin/bind_mobile"	
}
$(document).ready(function(){
	var staffId;
	FastClick.attach(document.body);//fastclick
	
	
	
	// 接受参数
	var args = GetUrlParms();
	function GetUrlParms() {
		var args = new Object();
		var query = location.search.substring(1);// 获取查询串
		var pairs = query.split("&");// 在逗号处断开
		for (var i = 0; i < pairs.length; i++) {
			var pos = pairs[i].indexOf('=');// 查找name=value
			if (pos == -1)
				continue;// 如果没有找到就跳过
			var argname = pairs[i].substring(0, pos);// 提取name
			var value = pairs[i].substring(pos + 1);// 提取value
			args[argname] = unescape(value);// 存为属性
		}
		return args;
	}
	
	function getTGInfo(){
		var getShootInfo = {
			url : '/api/proxy',
			dataType : 'json',
			type : 'POST',
			beforeSend:function(request) {
				request.setRequestHeader("staffid",args.staffId);
				request.setRequestHeader("userToken",token);
			},
			async:false,
			data:{
				targetUrl : '/shootnotice/detail',
				shoot_notice_id:args.tongGaoId,
				userid:userId
			},
			success : function(data) {
				if (data.code == 0) {
					var num;
					if(data.data.shoot_number.length==1){
						num = "00"+data.data.shoot_number;
					}else if(data.data.shoot_number.length==2){
						num = "0"+data.data.shoot_number;
					}else{
						num = data.data.shoot_number;
					}					
					$("#title_id").html(data.data.title);
					$("#shoot_day_id").html(data.data.shoot_day);
					$("#shoot_city_id").html(data.data.shoot_city);
					$("#shoot_number_id").html(num);
					$("#page_count_id").html(data.data.page_count);
					$("#shoot_place_id").html(data.data.shoot_place);
					$("#weather_id").html(data.data.weather);
					$("#sunrise_id").html(data.data.sunrise);
					$("#sunset_id").html(data.data.sunset);
					var moduleArr = data.data.module;
					var othertSelfBlock = [];
					//显示通告场次					
					for(i=0;i<moduleArr.length;i++){
						if(moduleArr[i].module_title=="拍摄场次"){
							roundinfo = round_info(moduleArr[i].data);
							$("#round_info .tbl").remove();
							$("#round_info").append(roundinfo);	
						}else if(moduleArr[i].module_title=="工作人员时间安排"){
								jobInfo = otherBlockInfo(moduleArr[i].data);
								$("#job_info .Tit,#job_info .Desc").remove();
								$("#job_info").append(jobInfo);		
						}else if(moduleArr[i].module_title=="主要演员时间安排"){
								roleInfo = otherBlockInfo(moduleArr[i].data);
								$("#role_info .Tit,#role_info .Desc").remove();
								$("#role_info").append(roleInfo);		
						}else if(moduleArr[i].module_title=="其他演员时间安排"){
								actorInfo = otherBlockInfo(moduleArr[i].data);
								$("#actor_info .Tit,#actor_info .Desc").remove();
								$("#actor_info").append(actorInfo);		
						}else if(moduleArr[i].module_title=="用餐时间安排"){
								foodInfo = otherBlockInfo(moduleArr[i].data);
								$("#food_info .Tit,#food_info .Desc").remove();
								$("#food_info").append(foodInfo);		
						}else if(moduleArr[i].module_title=="置景陈设，道具及特别效果"){
								setOutInfo = otherBlockInfo(moduleArr[i].data);
								$("#setOut_info .Tit,#setOut_info .Desc").remove();
								$("#setOut_info").append(setOutInfo);		
						}else if(moduleArr[i].module_title=="摄影器材，灯光器材及场务用品"){
								toolsInfo = otherBlockInfo(moduleArr[i].data);
								$("#tools_info .Tit,#tools_info .Desc").remove();
								$("#tools_info").append(toolsInfo);		
						}else if(moduleArr[i].module_title=="来日计划"){							
							plan_info = round_info(moduleArr[i].data);							
							$("#plan_info .tbl").remove();
							$("#plan_info").append(plan_info);
						}else{
							var str ={
										"module_title" : moduleArr[i].module_title,
										"data" : moduleArr[i].data
									}
									othertSelfBlock.push(str);
						}
					}
					
					//自创建板块展示
					for(r=0;r<othertSelfBlock.length;r++){						
						var otherBlockSelfList = '';
						var otherBlockSelfInfo = '';
						selfList = otherBlockSelfListInfo(othertSelfBlock[r].module_title,r);
						otherBlockSelfList += selfList												
						listContent = otherBlockContent(othertSelfBlock[r].data,r);
						otherBlockSelfInfo +=listContent;
						
						$("#plan").before(otherBlockSelfList);
						
						$("#plan_info").before(otherBlockSelfInfo);	
					}
					
					
					$(".otherBlock").each(function(){
						var $self = $(this);
						$self.click(function(){
							var otherBlockId = $self.attr("id");
							
							$('.meng,#otherBlockInfo'+otherBlockId).show();
						})						
					})
					//审批人
					var audit = data.data.audit;
					if(typeof(audit)!='undefined'){											
						var auditInfo = '';
						for(p=0;p<audit.length;p++){						
							auditInfo +='<span>'+audit[p].name+'</span>'						
							$("#auditList").html(auditInfo);
						}	
					}
						
				}else{
					alert(data.msg);
				}									
			},
			error : function() {
				alert("获取通告详情失败");
			}
		}
		$.ajax(getShootInfo);
	}
	getTGInfo()
	function round_info(data){
		var node = '';
		for(j=0;j<data.length;j++){
			day_night='';
			side='';
			if(data[j].day_night==1){
				day_night="日";
			}else if(data[j].day_night==2){
				day_night="夜";
			}else if(data[j].day_night==3){
				day_night="晨";
			}else if(data[j].day_night==4){
				day_night="昏";
			}else if(data[j].day_night==5){
				day_night="其他";
			}				
			if(data[j].side==1){
				side="内";
			}else if(data[j].side==2){
				side="外";
			}else if(data[j].side==3){
				side="其他";
			}
			node +='<div class="tbl">'
					+'<div class="row clearfix">'
						+'<span class="titl">场次：</span>'
						+'<span class="titl red">第'+data[j].round+'场</span>'
					+'</div>'
					+'<div class="row clearfix">'
					+'<div class="col6">'
						+'<span class="titl">'
							+'场景：'
						+'</span>'
						+'<span class="desc">'+data[j].scene+'</span>'
					+'</div>'
					+'<div class="col6 col6-r">'
						+'<span class="titl">'
							+'日/夜：'
						+'</span>'
						+'<span class="desc">'
							+day_night
						+'</span>'
					+'</div>'
				+'</div>'
				+'<div class="row clearfix">'
				+'<div class="col6">'
					+'<span class="titl">'
						+'内/外：'
					+'</span>'
					+'<span class="desc">'+side+'</span>'
				+'</div>'
				+'<div class="col6 col6-r">'
					+'<span class="titl">'
						+'页数：'
					+'</span>'
					+'<span class="desc">'
						+data[j].page_count
					+'</span>'
				+'</div>'
			+'</div>'
			+'<div class="row">'
				+'<span class="titl">'
					+'拍摄地：'
				+'</span>'
				+'<span class="desc">'+data[j].shoot_place+'</span>'
			+'</div>'
			+'<div class="row clearfix">'
				+'<span class="titl">'
					+'主演：'
				+'</span>'
				+'<span class="desc desc-r">'
					+data[j].main_role
				+'</span>'
			+'</div>'
			+'<div class="row clearfix">'
				+'<span class="titl">'
					+'特约/临演：'
				+'</span>'
				+'<span class="desc desc-r">'
					+data[j].actor
				+'</span>'
			+'</div>'
			+'<div class="section">'
				+'<h3 class="titl">内容梗概：</h3>'
				+'<div class="desc">'
					+data[j].summary
				+'</div>'
			+'</div>'
			+'<div class="section no-b-b">'
				+'<h3 class="titl">补充内容：</h3>'
				+'<div class="desc">'+data[j].remark+'</div>'
			+'</div>'
			+'</div>'
		}		
		return node;
	}
	function otherBlockSelfListInfo(title,num){
		var node = ''; 
		node +='<div class="list otherBlock" id="'+num+'">'
			 +'<div class="item">'
				+'<span>'+title+'</span>'
				+'<span class="arrow">&gt;</span>'
			   +'</div>'
			+'</div>'
		return node;	
	}

	function otherBlockContent(data,num){
		 var node ='';
		 
		 node +='<div class="body" style="display:none" id="otherBlockInfo'+num+'">'
		 for(y=0;y<data.length;y++){		
			node+='<img src="/resources/weixin/images/close.png" class="close">'
				+'<div class="Tit">'
				+data[y].content_name
			+'</div>'
			+'<div class="Desc">'
				+data[y].content_value
			+'</div>'
					
		 }
		 node+='</div>'
		 return node;
		
	}
	
	
	function otherBlockInfo(data){
		var node  = '';
		for(j=0;j<data.length;j++){
			node +='<div class="Tit">'
						+data[j].content_name
					+'</div>'
					+'<div class="Desc">'
						+data[j].content_value
					+'</div>'
		}
		return node;
	}	
	
	
	
	$('#round').click(function(){
		$('.meng,#round_info').show();
	});
	$("#plan").click(function(){		
		$('.meng,#plan_info').show();
	})
	$("#job").click(function(){		
		$('.meng,#job_info').show();
	})
	$("#role").click(function(){		
		$('.meng,#role_info').show();
	})
	$("#actor").click(function(){		
		$('.meng,#actor_info').show();
	})
	$("#food").click(function(){		
		$('.meng,#food_info').show();
	})
	$("#setOut").click(function(){		
		$('.meng,#setOut_info').show();
	})
	$("#tools").click(function(){		
		$('.meng,#tools_info').show();
	})
	
	$('.close').click(function(){
		$(this).parents('.meng').hide();
		$(this).parents('div').hide();
	});
	
	
	
});