<%@include file="taglib.jsp"%>
<%@ page contentType="text/html;charset=UTF-8" pageEncoding="UTF-8"%>
<head>
	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width, initial-scale=1.0,user-scalable=no">

	<title>绑定手机号</title>
	<link rel="stylesheet" href="/resources/weixin/css/reset.css">
	<link rel="stylesheet" href="/resources/weixin/css/index.css">
	<script type="text/javascript" src="/resources/weixin/js/jquery-2.0.2.min.js"></script>
	<script type="text/javascript" src="/resources/weixin/js/jquery.cookie.js"></script>
	
	<script type="text/javascript" src="/resources/weixin/js/md5.js"></script>
	<script type="text/javascript" src="/resources/weixin/js/mobile_bind.js"></script>	
</head>
<body>
	<div id="bindMobileTips" class="successText"></div>
	<div id="bindMobileDiv" >
		<div class="inputDiv">
			<input type="text" placeholder="请输入11位手机号码" id="mobile"  class="telNum">		
			<input type="text" name="smsCode" id="smsCode" placeholder="请输入验证码" class="telNum"><button class="send_code_btn">发送验证码</button>
			<input type="password" placeholder="请输入密码" id="password"  class="telNum">
			<input type="password" placeholder="请重新输入密码" id="repassword">		
			
		</div>
		<button class="bind_btn" id="bind_mobile">绑定</button>
	</div>
</body>
