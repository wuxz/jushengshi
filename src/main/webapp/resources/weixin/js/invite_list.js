var token = $.cookie('token');
if(typeof(token)=='undefined'){
	token='';
}
if(token.length==0){
	location.href="/weixin/bind_mobile"		
}
$(document).ready(function(){
		
	var inviteList = {
		url : '/api/proxy',
		dataType:'json',
		type:'POST',
		async:false,
		beforeSend : function(request) {
			request.setRequestHeader("userToken",token);
		},	
		data:{
			targetUrl:'/staff/invitationlist',				
		},
		success:function(data){
			
			if(data.code==0){
				var itemArr = data.data.list;
				
				var node = '';
			
				for(i=0;i<itemArr.length;i++){
					if(itemArr[i].status==1){
						node += '<div class="msg2">'
									+'<div class="intiteInfo">'
										+'<span>'+itemArr[i].invitation_username+'</span>邀请你加入<span>“'+itemArr[i].staffname+'”</span>剧组'
									 +'</div>'	
									+'<div class="intiteBtnDiv">'
										+'<input type="hidden" name="inviteId" value="'+itemArr[i].id+'">'
										+'<button class="cancel_btn">拒绝</button><button class="add_btn">加入</button>'
									+'</div>'
								+'</div>'
					}else if(itemArr[i].status==2){
						node += '<div class="msg1 clearfix">'
									+'<img class="icon ic_cancel" src="/resources/weixin/images/cancel.png">'
									+'<div class="left_div">您拒绝加入<span>'+itemArr[i].staffname+'</span>剧组</div>'
									+'<div class="right">'+itemArr[i].invitation_time+'</div>'
								+'</div>'
					}else if(itemArr[i].status==5){
						node += '<div class="msg1 clearfix">'
									+'<img class="icon ic_sure" src="/resources/weixin/images/sure.png">'
									+'<div class="left_div">您同意加入<span>'+itemArr[i].staffname+'</span>剧组</div>'
									+'<div class="right">'+itemArr[i].invitation_time+'</div>'
								+'</div>'
					}						
				}
				if(node.length==0){
					node += '<div class="outGroup">您还未加入任何剧组</div>';
				}
				$("body").html(node);
				$(".cancel_btn").each(function(){
					var $self = $(this);
					$self.click(function(){
						var inviteId = $self.siblings("input").val();
						inviteSure(inviteId,2);
					})
				})
				
				$(".add_btn").each(function(){
					var $self = $(this);
					$self.click(function(){
						var inviteId = $self.siblings("input").val();
						inviteSure(inviteId,5);
					})
				})				
			}else{
				alert(data.msg)
			}	
			
		}
	}
	$.ajax(inviteList)
	function inviteSure(InviteId,status){
		var invitationhandle = {
			url : '/api/proxy',
			dataType:'json',
			type:'POST',
			async:false,
			beforeSend : function(request) {
				request.setRequestHeader("userToken",token);
			},	
			data:{
				targetUrl:'/staff/invitationhandle',
				id:InviteId,
				status:status,				
			},
			success:function(data){
				if(data.code==0){
					location.href="/weixin/invite_list"
				}else{
					alert(data.msg)
				}
			}
		}
		$.ajax(invitationhandle);
		
	}	
})