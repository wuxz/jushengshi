var loginRules = {
	loginMobile : {
		mobile : true,
	},
	passwd : {
		password : true,
	},
};

var registerRules = {
	registerMobile : {
		mobile : true,
	},
	smscode : {
		regex : /^[0-9]{6}$/,
	},
	registerPasswd : {
		password : true,
	},
	registerPasswd2 : {
		password : true,
	},
};

var registerSendCodeRules = {
	registerMobile : {
		mobile : true,
	},
};

var forgetPwdSendCodeRules = {
	resetPwdFormMobile : {
		mobile : true,
	},
};

var forgetPwdRules = {
	fogetPwdCode : {
		regex : /^[0-9]{6}$/,
	},
	newPasswd : {
		password : true,
	},
	newPasswd2 : {
		password : true,
	},
};
(
	function isIE8(){		
		if(!!window.ActiveXObject || "ActiveXObject" in window){				
				var isIE6 = navigator.userAgent.indexOf("MSIE 6.0")
				var isIE7 = navigator.userAgent.indexOf("MSIE 7.0")
				var isIE8 = navigator.userAgent.indexOf("MSIE 8.0")						
				if((isIE6!=-1)||(isIE7!=-1)||(isIE8!=-1)) {				
					alert('您的浏览器版本太低，您可以升级浏览器版本或使用360、火狐、谷歌等标准浏览器')
					window.location.href="http://www.firefox.com.cn/";
				}
		}	
		
	}
)()
$(document)
		.ready(
				function() {
					var loginValidator = validform("#formLogin", loginRules);
					var registerValidator = validform("#formRegister",
							registerRules);
					var registerSendCodeValidator = validform("#formRegisterCode",
							registerSendCodeRules);
					var forgetPwdSendCodeValidator = validform("#formForgetPwdCode",
							forgetPwdSendCodeRules);
					var forgetPwdValidator = validform("#formForgetPwd",
							forgetPwdRules);

					$("#loginSubmit").click(
							function() {
								if (!loginValidator.form()) {
									alertMsg('请填写正确的内容');

									return;
								}

								var $mobile = $("#loginMobile").val();
								var $passwd = $("#passwd").val();
								var $self = $(this);
								var btnInitVal = $self.val();
								var options = {
									url : '/api/proxy',
									dataType : 'json',
									beforeSend : function(request) {
										request.setRequestHeader("Test",
												"Chenxizhang");
									},
									data : {
										targetUrl : "/account/login",
										mobile : $mobile,
										passwd : hex_md5($passwd)
									},
									success : function(data) {
										if (data.code == 0) {
											location.href = "/web/home";
										} else {
											initFormStatus($self, btnInitVal);
											alertMsg(data.msg);
										}

									},
									error : function() {
										initFormStatus($self, btnInitVal);
									}
								};

								$(this).val("登录中...");
								ajaxPost(options);
								return false;
							});
					$("#registerSubmit").click(function() {
						if (!registerValidator.form()) {
							alertMsg('请填写正确的内容');

							return;
						}

						var $mobile = $("#registerMobile").val();
						var $passwd = $("#registerPasswd").val();
						var $passwd2 = $("#registerPasswd2").val();
						var $smscode = $("#registerCode").val();
						var $self = $(this);
						var btnInitVal = $self.val();
						var options = {
							url : '/api/proxy',
							dataType : 'json',
							data : {
								targetUrl : "/account/register",
								mobile : $mobile,
								passwd : hex_md5($passwd),
								smscode : $smscode
							},
							success : function(data) {
								if (data.code == 0) {
									location.href = "";
								} else {
									initFormStatus($self, btnInitVal);
									alertMsg(data.msg);
								}
							},
							error : function() {
								initFormStatus($self, btnInitVal);
							}
						};
						$(this).val("注册中...");
						ajaxPost(options);
						return false;
					});
					$('#registCodeBtn').click(function() {
						if (!registerSendCodeValidator.form()) {
							alertMsg('请填写正确的内容');

							return;
						}

						sendCodePrepare($(this));
						var $self = $(this);
						var $mobile = $("#registerMobile").val();
						var options = {
							url : '/api/proxy',
							dataType : 'json',
							data : {
								targetUrl : "/sms/register",
								mobile : $mobile
							},
							success : function(data) {
								if (data.code == 0) {
									codeBtncountdown(60, $self);
								} else {
									alertMsg(data.msg);
								}
							}
						};
						ajaxPost(options);
					});

					$("#foget-loginBtn").click(function() {
						if (!forgetPwdValidator.form()) {
							alertMsg('请填写正确的内容');

							return;
						}

						var $mobile = $("#resetPwdFormMobile").val();
						var $passwd = $("#newPasswd").val();
						var $passwd2 = $("#newPasswd2").val();
						var $smscode = $("#fogetPwdCode").val();
						var $self = $(this);
						var btnInitVal = $self.val();
						var options = {
							url : '/api/proxy',
							dataType : 'json',
							data : {
								targetUrl : '/account/forget',
								mobile : $mobile,
								passwd : hex_md5($passwd),
								smscode : $smscode
							},
							success : function(data) {
								if (data.code == 0) {
									location.href = "/web/home";
								} else {
									initFormStatus($self, btnInitVal);
									alertMsg(data.msg);
								}
							},
							error : function() {
								initFormStatus($self, btnInitVal);
							}
						};
						$(this).val("登录中...");
						ajaxPost(options);
						return false;
					});
					$("#fogetCodeBtn").click(function() {
						if (!forgetPwdSendCodeValidator.form()) {
							alertMsg('请填写正确的内容');

							return;
						}

						sendCodePrepare($(this));
						var $self = $(this);
						var $mobile = $("#resetPwdFormMobile").val();
						var options = {
							url : '/api/proxy',
							dataType : 'json',
							data : {
								targetUrl : '/sms/forget',
								mobile : $mobile
							},
							success : function(data) {
								if (data.code == 0) {
									codeBtncountdown(60, $self);
								} else {
									alertMsg(data.msg);
								}
							}
						};
						ajaxPost(options);
					});

					$(".registerBtn").click(function() {
						$("#register").show();
						$('#loginForm').hide();
						$('#loginMobile').val("");
						$('#passwd').val("");
					});
					$(".forgetPwdBtn").click(function() {
						$('.meng').show();
						$("#forgetPwd").show();
					});
					$(".close").click(
							function() {
								$(this).parent(".seting-form").hide().find(
										'input:not(#foget-loginBtn)').val('');
								$(this).parents('.meng').hide();
							});
					$('.linkReg').click(
							function() {
								$('#register').hide();
								$('#register').find(
										'input:not(#registerSubmit)').val('');
								$('#loginForm').show();
							});
					function sendCodePrepare($codeBtn) {
						$codeBtn.attr("disabled", "true");
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
					;

					function initFormStatus($btn, InitVal) {
						$btn.val(InitVal);
					}

					function MyTrim(str) {
						if (str != "") {
							return str.replace(/(^\s*)|(\s*$)/g, "");
						} else {
							return ""
						}
					}
					$(document).keyup(function(event) {
						if (event.keyCode == 13) {
							$('#loginSubmit').trigger('click');
						}
					});
				});
