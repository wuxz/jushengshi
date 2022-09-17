<%@include file="taglib.jsp"%>
<%@ page contentType="text/html;charset=UTF-8" pageEncoding="UTF-8"%>
<title>登录 - 剧省事儿</title>
<link rel="stylesheet" href="/resources/web/css/register.css">
<script src="/resources/web/js/register.js"></script>
</head>
<body>
	<form id="formLogin">
		<div id="loginForm">
			<img src="/resources/web/images/logo.png" alt="" class="login_logo">
			<div class="warning"></div>
			<div class="userBox">
				<i class="homeIcon"></i> <input type="text" placeholder="请输入11位手机号"
					id="loginMobile" name="loginMobile">
			</div>
			<div class="passwdBox">
				<i class="homeIcon pwdIcon"></i> <input type="password" id="passwd"
					name="passwd" placeholder="输入6～10位数字密码">
			</div>
			<div class="submitBox">
				<input type="submit" value="登录" id="loginSubmit">
			</div>
			<div class="btn-s-cont clearfix">
				<span class="registerBtn">注册</span> <span class="forgetPwdBtn">忘记密码</span>
			</div>
		</div>
	</form>
	<div class="" id="register">
		<form id="formRegisterCode">
			<img src="/resources/web/images/logo.png" alt="" class="login_logo">
			<div class="warning"></div>
			<div class="userBox">
				<i class="homeIcon"></i> <input type="text" placeholder="请输入11位手机号"
					id="registerMobile" class="mobile">
			</div>
		</form>
		<form id="formRegister">
			<div class="userBox regCode">
				<i class="homeIcon codeIcon"></i> <input type="text" class="smscode"
					id="registerCode" placeholder="验证码">
				<button class="smscodeBtn" type="button" id="registCodeBtn">发送验证码</button>
			</div>
			<div class="passwdBox regPwd">
				<i class="homeIcon pwdIcon"></i> <input type="password"
					placeholder="输入6-10位数字密码" id="registerPasswd" class=""
					name="registerPasswd">
			</div>
			<div class="userBox regPwd2">
				<i class="homeIcon pwd2Icon"></i> <input type="password"
					placeholder="确认密码" id="registerPasswd2" class="passWd2">
			</div>
			<div class="submitBox">
				<input type="submit" id="registerSubmit" class="login-btn"
					value="注册">
			</div>
			<div class="btn-s-cont clearfix">
				<span class="registerBtn linkReg">登录</span>
			</div>
		</form>
	</div>
	<div class="foot">
		<h4 class="copyRight">Copyright © 2016All Right Reserved</h4>
	</div>
	<div class="meng">
		<div id="forgetPwd" class="seting-form">
			<h3>找回密码</h3>
			<img src="/resources/web/images/homeclose.png" alt="" class="close">
			<div class="warning"></div>
			<form id="formForgetPwdCode">
				<div class="userBox reset">
					<i class="homeIcon"></i> <input type="text" placeholder="请输入11位手机号"
						id="resetPwdFormMobile" class="mobile">
				</div>
			</form>
			<form id="formForgetPwd">
				<div class="userBox fogetPwd">
					<i class="homeIcon codeIcon"></i> <input type="text"
						class="smscode" name="fogetPwdCode" id="fogetPwdCode"
						placeholder="验证码">
					<button class="smscodeBtn" type="button" id="fogetCodeBtn">发送验证码</button>
				</div>
				<div class="userBox newpwd">
					<i class="homeIcon pwdIcon"></i> <input type="password"
						placeholder="输入6-10位数字新密码" id="newPasswd" class="passWd"
						name="newPasswd">
				</div>
				<div class="userBox passwdBox forget-login">
					<i class="homeIcon pwd2Icon"></i> <input type="password"
						placeholder="确认密码" id="newPasswd2" class="">
				</div>
				<div class="submitBox">
					<input type="submit" class="login-btn" id="foget-loginBtn"
						value="确定">
				</div>
		</div>
	</div>
	</form>
</body>
</html>