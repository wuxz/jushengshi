<%@ page contentType="text/html;charset=UTF-8" pageEncoding="UTF-8"%>
<%@include file="taglib.jsp"%>
<title>拍摄通告 - 剧省事儿</title>
<link rel="stylesheet" href="/resources/web/css/screenplay.css">
<link rel="stylesheet" href="/resources/web/css/shoot_notice.css">
<script src="/resources/web/js/shoot_notice.js"></script>
</head>
<body>
	<%@include file="header.jsp"%>
	<div class="content">
		<div class="shootnoticeCont">
			<div class="contTop">
				<a href="javascript:;" id="addShootNotice" class="btn">新建通告</a>
			</div>
			<div class="contTable">
				<table class="roundTbl shoot-list">
					<thead>
						<tr>
							<th style="width:65%;">全部</th>
							<th style=" width:17%;" class="shootTimeTh">发布时间</th>
						</tr>
					</thead>
					<tbody>
					</tbody>
				</table>
			</div>
		</div>
	</div>
</body>
</html>