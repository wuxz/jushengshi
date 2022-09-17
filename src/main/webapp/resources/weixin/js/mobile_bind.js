$(document).ready(function(){
	var bindstatus;
	var mobileVerify = {
		url : '/api/proxy',
		dataType:'json',
		type:'POST',
		async:false,
		
		data:{
			targetUrl:'/open/verify',//待定
			source:'weixin',
			openid:openId,	
		},
		success:function(data){			
			if(data.code==0){							
				var token = $.cookie('token');				
				if(typeof(token)=='undefined'){
					token = '';
				}				
				bindstatus = data.data.bindstatus;				
				if(bindstatus ==3&&token.length!=0){								
					$("#bindMobileTips").html("此微信号和手机号："+data.data.bindmobile+"已绑定 <br/><a href='/weixin/invite_list'>邀请列表</a>");
					$("#bindMobileTips").css({"display":"block"});
					$("#bindMobileDiv").css({"display":"none"})									
				}else{
					$("#bindMobileTips").css({"display":"none"});
					$("#bindMobileDiv").css({"display":"block"})
				}
			}else{
				alert("请求接口失败");
			}
		}
	}
	$.ajax(mobileVerify)
	var flag=0;	
	$(".send_code_btn").click(function(){
		
		var mobile = $("#mobile").val();		
		var mobileReg = /^1(3|5|4|8|7)\d{9}$/
		if(mobile.length==0 || !mobileReg.test(mobile)){
			alert('请填写正确手机号码');
			return false;
		}
		var $self = $(this);
		$self.attr("disabled", "true");
		codeBtncountdown(60,$self);
		
		var sendSmsCode = {
			url : '/api/proxy',
			dataType:'json',
			type:'POST',
			async:false,
			
			data:{
				targetUrl:'/sms/register',//待定
				mobile:mobile	
			},
			success:function(data){	
				if(data.code==0){
					flag = 1;					
				}else if(data.code=='-1002'){
					//用户存在调用忘记密码发送验证码接口						
					forgetSendSmsCode(mobile);
				}else{
					alert("发送验证码失败，请60s后重新发送");
				}		
				
			}
		}
		$.ajax(sendSmsCode);		
	})
	function forgetSendSmsCode(mobile){
		
		var fsendSmsCode = {
			url : '/api/proxy',
			dataType:'json',
			type:'POST',
			async:false,
			
			data:{
				targetUrl:'/sms/forget',//待定
				mobile:mobile	
			},
			success:function(data){					
				if(data.code==0){
					flag=2;
				}else{
					alert("发送验证码失败，请60s后重新发送");
				}						
			}
		}
		$.ajax(fsendSmsCode);
	}
	$("#bind_mobile").click(function(){
		var mobile = $("#mobile").val();
		var passwd = hex_md5($("#password").val());
		var smsCode = $("#smsCode").val();
		var repassword = hex_md5($("#repassword").val());
		if(mobile.length==0){
			alert("请填写正确的手机号码");
			return false;
		}
		if(smsCode.length==0){
			alert("请填写验证码");
			return false;
		}
		if(passwd.length==0){
			alert("请填写密码");
			return false;
		}
		if(passwd != repassword){
			alert("密码和重新输入密码内容必须相同");
			return false;
		}		
		if(flag==1){
			//注册验证验证码有效性
			var smsCodeReg = {
				url : '/api/proxy',
				dataType:'json',
				type:'POST',
				async:false,
				
				data:{
					targetUrl:'/account/register',//待定
					mobile:mobile,
					passwd:passwd,
					smscode:smsCode	
				},
				success:function(data){
					if(data.code==0){
						$.cookie('token',data.data.userToken,{expires: 365});
						if(bindstatus==3){
							location.href='/weixin/bind_mobile';
						}else{
							weixinBindMobile(mobile);//微信绑定手机号	
						}
						
					}else{
						alert("绑定失败，请重新绑定");
					}
				}
			}
			$.ajax(smsCodeReg);			
		}else if(flag==2){
			//忘记密码验证验证码有效性
			var smsCodeReset = {
				url : '/api/proxy',
				dataType:'json',
				type:'POST',
				async:false,
				
				data:{
					targetUrl:'/account/forget',//待定
					mobile:mobile,
					passwd:passwd,
					smscode:smsCode	
				},
				success:function(data){						
					if(data.code==0){						
						$.cookie('token',data.data.userToken,{expires: 365});								
						if(bindstatus==3){
							location.href='/weixin/bind_mobile';
						}else{
							weixinBindMobile(mobile);//微信绑定手机号	
						}
					}else{
						alert("绑定失败，请重新绑定");
					}
				}
			}
			$.ajax(smsCodeReset);			
		}else if(flag==0){
			alert("请重新获取验证码");
		}
	})
	function weixinBindMobile(mobile){
		var weixinBind = {
			url : '/api/proxy',
			dataType:'json',
			type:'POST',
			async:false,
			
			data:{
				targetUrl:'/open/bind',//待定
				source:'weixin',
				openid:openId,
				bindmobile:mobile	
			},
			success:function(data){
				if(data.code==0){
					location.href='/weixin/bind_mobile';
				}else{
					alert("绑定失败，请重新绑定");	
				}
			}
		}
		$.ajax(weixinBind);
	}
	
	function codeBtncountdown(time, $codeBtn) {
		if (typeof time !== "number") {
			//console.log("参数错误");
			return;
		}
		var timerSendCode = setInterval(function() {
			$codeBtn.html(time);
			if (time == 0) {
				$codeBtn.removeAttr('disabled').html('发送验证码');
				clearInterval(timerSendCode);
			}
			;
			time--;
		}, 1000);
	}
	
	
	
	
});