<%@ page contentType="text/html;charset=UTF-8" pageEncoding="UTF-8"%>
<%@include file="taglib.jsp"%>
<link rel="stylesheet" href="/resources/web/css/home.css" />
<title>意见反馈</title>
<meta name="viewport"
	content="width=device-width, initial-scale=1.0,user-scalable=no">
<script>
var userId = '${userid}';
if (userId === '') {
	userId = '${userId}';
}
var userToken = '${usertoken}';
if (userToken === '') {
	userToken = '${userToken}';
}
var deviceAgent = '${deviceAgent}';
var deviceType = '${deviceType}';
var deviceVersion = '${deviceVersion}';
var deviceId = '${deviceId}';
var appchannel = '${appchannel}';
var appversion = '${appversion}';
</script>
<script src="/resources/web/js/feedback.js"></script>
</head>
<body>
	<div class="feedbackForm">
		<input type="hidden" id="staffId" value="${staffId}">
		<textarea name="" id="content" rows=10 placeholder="填写您的反馈内容"></textarea>
		<input type="button" value="提交" class="feedbackSubmitBtn">
	</div>
</body>
</html>