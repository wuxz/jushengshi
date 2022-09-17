<%@include file="taglib.jsp"%>
<%@ page contentType="text/html;charset=UTF-8" pageEncoding="UTF-8"%>
<title>剧省事儿</title>
<link rel="stylesheet" href="/resources/app/css/reset.css">
<link rel="stylesheet" href="/resources/app/css/round-detail.css">
<link rel="stylesheet" href="/resources/app/css/play-detail.css">
</head>
<body>
	<div class="row clearfix">
		<span class="titl">场次：</span>
		<span class="titl">第<c:if test="${data.mode > 0}">${data.mode}-</c:if>${data.round}场</span>
		<!-- a href="screenplay_round_detail?id=${srId}" class="linkScreen">查看剧本</a-->
	</div>
	<div class="row">
		<span class="titl">场景：</span>
		<span class="desc">${data.scene}</span>
	</div>
	<div class="row clearfix">
		<div class="col6">
			<span class="titl">
				日/夜：
			</span>
			<span class="desc"><c:choose>
						<c:when test="${data.day_night == 1}">日</c:when>
						<c:when test="${data.day_night == 2}">夜</c:when>
						<c:when test="${data.day_night == 3}">晨</c:when>
						<c:when test="${data.day_night == 4}">昏</c:when>
						<c:otherwise>其他</c:otherwise>
					</c:choose></span>
		</div>
		<div class="col6">
			<span class="titl">
				内/外：
			</span>
			<span class="desc"><c:choose>
						<c:when test="${data.side == 1}">内</c:when>
						<c:when test="${data.side == 2}">外</c:when>
						<c:otherwise>其他</c:otherwise>
					</c:choose></span>
		</div>
	</div>
	<div class="row clearfix">
		<span class="titl">
			主演：
		</span>
		<span class="desc desc-r">
			${data.main_role}
		</span>
	</div>
	<div class="row clearfix">
		<span class="titl">
			特约/临演：
		</span>
		<span class="desc desc-r">
			${data.actor}
		</span>
	</div>
	<div class="section">
		<h3 class="titl">内容梗概：</h3>
		<div class="desc">
			${data.summary}
		</div>
	</div>
	<div class="section no-b-b">
		<h3 class="titl">补充内容：</h3>
		<div class="desc">
			${data.remark}
		</div>
	</div>
</body>
</html>