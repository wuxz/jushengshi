$(document).ready(function(){
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
			args[argname]=decodeURI(value);//存为属性   
		}		
		return args;
	}
	var options = {
		type:'POST',
		url : '/api/proxy',
		dataType:'json',
		beforeSend :function(request) {
			request.setRequestHeader("staffId", staffId);
		},
		data:{
			targetUrl:'/shootnotice/detail',
			shoot_notice_id:args.shoot_notice_id,
			userid:userId 
		},
		success:function(data){//console.log(data)
			if(data.code==0){
				$('.pushTime').html(data.data.releasetime);
				$('.shNoTitle').html(data.data.title);
				$('.shDate').html(data.data.shoot_day);
				$('.shAddress').html(data.data.shoot_place);
				$('.allPage').html(data.data.page_count);
				$('.shWeather').html(data.data.weather);
				$('.shoot_num').html(data.data.shoot_number);
				$('.sunriseTime').html(data.data.sunrise);
				$('.sundownTime').html(data.data.sunset);
				var sideArr=['内场','外场','其它'];
				var dayArr = ['日','夜','晨','昏','其他'];
				var moduleList = data.data.module;
				modLen = moduleList.length;				
				for(var h=0;h<modLen;h++){
					if(moduleList[h].module_title=='拍摄场次'){
						var num = moduleList[h].data.length;
						createRoundTab(num);
						$('.biaoTitle').html(moduleList[h].module_title);
						for(var i=0;i<num;i++){
							$('.sh_round').eq(i).html(moduleList[h].data[i].round);//console.log(i)
							// $('.round_a').eq(i).attr('href','/web/screenplay_detail?id='+moduleList[h].data[i].id +'&staffId='+staffId);							
							$('.sh_scene').eq(i).html(moduleList[h].data[i].scene);
							$('.sh_day_night').eq(i).html(dayArr[moduleList[h].data[i].day_night-1]);
							$('.sh_side').eq(i).html(sideArr[moduleList[h].data[i].side-1]);
							$('.shoot_day').eq(i).html(moduleList[h].data[i].shoot_day);
							$('.sh_page_count').eq(i).html(moduleList[h].data[i].page_count);
							$('.sh_actor').eq(i).html(moduleList[h].data[i].main_role);
							$('.sh_summary').eq(i).html(moduleList[h].data[i].summary);
							$('.remark').eq(i).html(moduleList[h].data[i].remark);
						}
					}else if(moduleList[h].module_title=='来日计划'){
						creatPlanTab(moduleList[h].data.length);
						for(var a=0;a<moduleList[h].data.length;a++){
							$('.pl_round').eq(a).html(moduleList[h].data[a].round);
							$('.pl_scene').eq(a).html(moduleList[h].data[a].scene);
							$('.plan_a').eq(i).attr('href','/web/screenplay_detail?id='+moduleList[h].data[a].id);	
							$('.pl_day').eq(a).html(dayArr[moduleList[h].data[a].day_night-1]);
							$('.pl_side').eq(a).html(sideArr[moduleList[h].data[a].side-1]);
							$('.pl_shoot_time').eq(a).html(moduleList[h].data[a].shoot_day);
							$('.pl_page_count').eq(a).html(moduleList[h].data[a].page_count);
							$('.pl_role').eq(a).html(moduleList[h].data[a].main_role);
							$('.pl_summary').eq(a).html(moduleList[h].data[a].summary);
							$('.pl_remark').eq(a).html(moduleList[h].data[a].remark);
						}
					}else{
						var node = '';
						for(var k=0;k<moduleList[h].data.length;k++){
							if(moduleList[h].module_title==moduleList[h].data[k].module_title){
								var node = node + '<div class="shTabItem"><h6 class="h6tit">'+moduleList[h].data[k].content_name+'</h6><p class="descr">'+moduleList[h].data[k].content_value+'</p><div class="waveLine"></div></div>';		
							}else{
								continue;
							}							
						}
						node = '<div class="shTab"><h3 class="h3Tit">'+moduleList[h].module_title+'</h3>' + node + '</div>';
						$('.shootnoticeCont').append(node);
					}
					
				};
				createReplay();
			}else{
				alertMsg(data.msg);
			}
		},
		error:function(data){
			alertMsg('获取失败');
		}
	}
	ajaxPost(options);

	function createReplay(){
		var option = {
			type:'POST',
			url : '/api/proxy',
			dataType:'json',
			beforeSend :function(request) {
				request.setRequestHeader("staffId", staffId);
			},
			data:{
				targetUrl:'/shootnotice/detail',
				shoot_notice_id:args.shoot_notice_id,
				userid:userId 
			},
			success:function(data){//console.log(data);
				if(data.code==0){
					var auditName = '';
					if(data.data.audit instanceof Array){
						for(var s=0;s<data.data.audit.length;s++){
							auditName = auditName + '<span class="pps">' + data.data.audit[s].name + '</span>|';
						}
					}
					auditName = auditName.substring(0,auditName.length-1);
					createAuditor(auditName,data.data.unread_number,data.data.view_number);
					$('.alink').click(function(){
						$('.appro_detail').parent('.meng').show();
					});
					
					var replay = data.data.reply;
					if(replay!==undefined){
						var unreadT = '';
						var view = '';
						for(var x=0;x<replay.unread.length;x++){
							unreadT = unreadT + '<div class="res_list clearfix"><span class="res_list_name l15">'
							+ replay.unread[x].name +'</span><span class="res_list_job"></span><span class="appro_status r15">'
							+ replay.unread[x].phone+'</span></div>';
						}
						unreadT = '<div class="sect-line unread"><span>还未查看人员</span><div class="line"></div></div>' + unreadT;
						var m = Math.ceil(replay.view.length/3);
						for(var z=0;z<m;z++){
							view = view + '<div class="res_list clearfix"><span class="res_list_name l15 name-r">'
							 +'</span><span class="res_list_job name-r">'
							+ '</span><span class="appro_status r15 name-r">'
							+'</span></div>';
						}
						view = '<div class="sect-line view"><span>已查看人员</span><div class="line"></div></div>' + view;
						var resNode = '<div class="meng" style=""><div class="appro_detail"><h3>回执详情</h3><img src="/resources/web/images/homeclose.png" alt="" class="close"><div class="appro_section">'
									+ unreadT + view 
									+ '</div></div></div>';
						$('body').append(resNode);
						$('.close').click(function(){
							$(this).parents('.meng').hide();
						});
						for(var y=0;y<replay.view.length;y++){
							$('.name-r').eq(y).html(replay.view[y].name);
						}
					}					
				}else{
					alertMsg(data.msg);
				}
			},
			error:function(data){
				alertMsg('error');
			}
		}
		ajaxPost(option);
	}




	function createRoundTab(num){
		var node = '';
		for(var i=0;i<num;i++){
			node =node + '<div class="shTabItem"><div class="shItemList"><span>选择场次：</span><span class="sh_round mr"></span><a href="" class="mr round_a">查看剧本</a><span>场景：</span><span class="mr sh_scene"></span><span>日/夜：</span><span class="mr sh_day_night"></span><span>内/外：</span><span class="mr sh_side"></span><span>拍摄时间：</span><span class="mr shoot_day"></span><span>页数：</span><span class="sh_page_count"></span></div><div class="shItemList"><span>主要角色：</span><span class="sh_actor"></span></div><div class="shItemList"><span>内容梗概：</span><span class="sh_summary"></span></div><div class="shItemList"><span>补充内容：</span><span class="remark"></span></div><div class="waveLine"></div>';
		}
		node = '<div class="shTab"><h3 class="biaoTitle"></h3>' + node +'</div>';
		$('.shootnoticeCont').append(node);
		$('.round_a').hide();
	}

	function creatPlanTab(num){
		var node = '';
		for(var i=0;i<num;i++){
			node = node + '<div class="shTabItem"><div class="shItemList"><span>选择场次：</span><span class="pl_round mr"></span><a href="" class="mr plan_a">查看剧本</a><span>场景：</span><span class="mr pl_scene"></span><span>日/夜：</span><span class="mr pl_day"></span><span>内/外：</span><span class="mr pl_side"></span><span>拍摄时间：</span><span class="mr pl_shoot_time"></span><span>页数：</span><span class="pl_page_count"></span></div><div class="shItemList"><span>主要角色：</span><span class="pl_role"></span></div><div class="shItemList"><span>内容梗概：</span><span class="pl_summary"></span></div><div class="shItemList"><span>补充内容：</span><span class="pl_remark"></span></div><div class="waveLine"></div></div>';
		}
		node = '<div class="shTab plan"><h3>来日计划</h3>' + node +'</div>';
		$('.shootnoticeCont').append(node);
		$('.plan_a').hide();
	}
	
	
	function createAuditor(name,unlook,allook){
		var node = '<div class="auditor">审核人：<span class="appr_name">'
		+name+'</span><br>回执： <span >未查看</span><span class="un_look">('
		+unlook+')</span>|<span class="ml5">已查看</span><span class="already_look">('
		+allook+')</span><a href="javascript:;" class="alink">查看详情</a></div>';
		$('.shootnoticeCont').append(node);
	}	
	


});