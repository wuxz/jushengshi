<%@ page contentType="text/html;charset=UTF-8" pageEncoding="UTF-8"%>
<%@include file="taglib.jsp"%>
<link rel="stylesheet" href="/resources/web/css/screenplay.css">
<link rel="stylesheet" href="/resources/web/css/nda.css">
<script src="/resources/web/js/nda.js"></script>
<title>保密协议 - 剧省事儿</title>
</head>
<body>
	<%@include file="header.jsp"%>
	<div class="content">
		<div class="aggrementCont">
			<div class="contTop">
				<a href="staff_home?staffId=${staffId}">剧本</a> > <span>保密协议</span>
			</div>
			<div class="contTable">
				<form id='fm1' method="post" action="/web/nda/save">
					<input type="hidden" name="staffId" value="${staffId}" />
					<textarea name="zhengWen"
						style="width: 800px; height: 400px; visibility: hidden;">${zhengWen}</textarea>
					<span class="saveAggrementBtn">保存</span>
				</form>
			</div>
		</div>
	</div>
</body>
</html>