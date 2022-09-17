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
			args[argname]=unescape(value);//存为属性   
		}		
		return args;
	}	
	optionList = {
		type:'POST',
		url : '/api/proxy',
		dataType:'json',
		beforeSend :function(request) {
			request.setRequestHeader("staffid", staffId);
		},
		data:{
			targetUrl:'/audit/list',
			sourceid:args.shoot_notice_id,
			type:1
		},
		success:function(data){//console.log(data);
			if(data.code==0){
				var resArr = data.data;
				var staArr = ['批复中','被拒绝','已同意'];
				var isRef = false;
				if(resArr instanceof Array){
					for(var i=0;i<resArr.length;i++){
						if(resArr[i].audit_status==2){
							isRef = true;
							break;
						}
					}
				}
				
				if(isRef){
					$('#app_status').html('被拒绝');
					$('#sh_cancel').hide();
				}else{
					$('.reEdit').hide();
				}
				

			}else{
				alertMsg(data.msg);
			}
		},
		error:function(data){
			alertMsg('获取失败');
		}
	}
	ajaxPost(optionList);
	

	
	


	
	//-----------------------审批详情------------------------------
	$('#app_status').click(function(){
		loadApproInfo();
	});
	function loadApproInfo(){
		var options = {
			type:'POST',
			url : '/api/proxy',
			dataType:'json',
			beforeSend :function(request) {
				request.setRequestHeader("staffid", staffId);
			},
			data:{
				targetUrl:'/audit/list',
				sourceid:args.shoot_notice_id,
				type:1
			},
			success:function(data){//console.log(data)
				if(data.code==0){
					var resArr = data.data;
					var staArr = ['批复中','被拒绝','已同意'];
					creatApproDetail(resArr.length);
					for(var a=0;a<resArr.length;a++){
						$('.res_list_name').eq(a).html(resArr[a].name);
						// $('.res_list_job').eq(a).html(resArr[a].);
						$('.appro_status').eq(a).html(staArr[resArr[a].audit_status-1]);
						if(resArr[a].audit_status==1){
							$('.appro_status').eq(a).addClass('appr_ing');
						}else if(resArr[a].audit_status==2){
							$('.appro_status').eq(a).addClass('appr_refuse');
							$('.res_list').eq(a).after('<div class="reason"><img src="/resources/web/images/appr_refuse.png" alt="" class="appr_refu"><p>'+resArr[a].reason+'</p></div>');
						}else if(resArr[a].audit_status==3){
							$('.appro_status').eq(a).addClass('appr_agree');
						}
					}
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
	function creatApproDetail(num){
		var node = '';
		for(var i=0;i<num;i++){
			node =node +'<div class="res_list clearfix"><span class="res_list_name"></span><span class="res_list_job"></span><span class="appro_status appr_ing"></span></div>';
		}
		node = '<div class="meng" style="display:block;"><div class="appro_detail"><h3>审批详情</h3><img src="/resources/web/images/homeclose.png" alt="" class="close"><div class="appro_section">'+node +'</div></div></div>';
		$('body').append(node);
		$('.close').click(function(){
			$(this).parents('.meng').remove();
		});
	}
	// loadApproInfo();
	//-------------------撤销通告----------------------------------
	$('#sh_cancel').click(function(){
		cancelShoot('shoot_notice?staffId='+staffId);
	});
	//---------------------------重新编辑----------------------------
	$('.reEdit').click(function(){
		cancelShoot('shoot_notice_new?staffId='+staffId +'&shoot_notice_id='+args.shoot_notice_id);
	});
	function  cancelShoot(url){
		var options = {
			type:'POST',
			url : '/api/proxy',
			dataType:'json',
			beforeSend :function(request) {
				request.setRequestHeader("staffid", staffId);
			},
			data:{
				targetUrl:'/audit/cancel',
				action:'cancel',
				sourceid:args.shoot_notice_id,
				type:1
			},
			success:function(data){
				if(data.code==0){
					window.location = url;
				}else{
					alertMsg(data.msg);
				}
			},
			error:function(data){
				alertMsg('获取失败');
			}
		}
		ajaxPost(options);
	};
});