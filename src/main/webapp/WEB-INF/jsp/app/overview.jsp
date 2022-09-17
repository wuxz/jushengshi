<%@include file="taglib.jsp"%>
<%@ page contentType="text/html;charset=UTF-8" pageEncoding="UTF-8"%>
<title>剧省事儿</title>
<link rel="stylesheet" href="/resources/app/css/reset.css">
<link rel="stylesheet" href="/resources/app/css/home.css">
<link rel="stylesheet" href="/resources/app/css/play-detail.css">
</head>
<body>
	<div class="headSection clearfix">
		<h2>总场次</h2>
		<h1>${data.total}</h1>
		<div class="status">
			<p>已拍</p>
			<p>${data.shoted}</p>
		</div>
		<div class="status status-center">
			<p>未拍</p>
			<p>${data.unshot}</p>
		</div>
		<div class="status">
			<p>未拍完</p>
			<p>${data.shoting}</p>
		</div>
	</div>
	<div class="todayCont cont">
		<c:forEach var="item" items="${data.list}" varStatus="status">
			<h3 class="title-m">${item.pdate}</h3>
			<div class="screenRound no-pb">
				<div class="bb">
					<span class="title">计划拍摄场次:</span>
					<c:forEach var="item2" items="${item.plan}" varStatus="status2">
						<span class="item"><c:if test="${item2.mode > 0}">${item2.mode}-</c:if>${item2.round}</span>
					</c:forEach>
				</div>
			</div>
			<div class="screenRound">
				<span class="title">实际拍摄场次:</span>
				<c:forEach var="item2" items="${item.actual}" varStatus="status2">
					<span class="item"><c:if test="${item2.mode > 0}">${item2.mode}-</c:if>${item2.round}</span>
				</c:forEach>
			</div>
		</c:forEach>
	</div>
</body>
</html>