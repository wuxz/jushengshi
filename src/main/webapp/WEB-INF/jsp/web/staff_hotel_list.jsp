<%@ page contentType="text/html;charset=UTF-8" pageEncoding="UTF-8"%>
<%@include file="taglib.jsp"%>
<link rel="stylesheet" href="/resources/web/css/screenplay.css">
<link rel="stylesheet" href="/resources/web/css/shoot_notice.css">
<script src="/resources/web/js/staff_hotel_list.js"></script>
<title>住宿表 - 剧省事儿</title>
</head>
<body>
	<%@include file="header.jsp"%>
	<div class="content">
		<div class="hotelInfoCont" style="display: block;">
			<div class="contTop">
				<a href="create_staff_hotel?staffId=${staffId}" class="btn">新建住宿表</a>
			</div>
			<div class="contTable">
				<div class="contTblHead">
					<span class="item1 noticeItem1">全部</span>
					<span class="item2">发布时间</span>
				</div>
				<table class="roundTbl">
					<tbody>
					</tbody>
				</table>
			</div>
		</div>
	</div>
</body>
</html>