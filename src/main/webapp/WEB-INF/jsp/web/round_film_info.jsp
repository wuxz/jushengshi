<%@ page contentType="text/html;charset=UTF-8" pageEncoding="UTF-8"%>
<%@include file="taglib.jsp"%>
<title>分场表 - 剧省事儿</title>
<script src="/resources/web/js/round.js"></script>
<link rel="stylesheet" href="/resources/web/css/screenplay.css">
<link rel="stylesheet" href="/resources/web/css/round_info.css">
<link rel="stylesheet" href="/resources/web/css/shoot_notice.css">
<script src="/resources/web/js/mode_round_select.js"></script>
<script src="/resources/web/js/round_film_info.js"></script>

</head>
<body>
	<%@include file="header.jsp"%>
	<div class="content">
		<div class="roundCont roud-edit">
			<div class="breadcrumb">
				<a href="/web/round_info?staffId=${staffId}">分场表</a> > <span>编辑分场表</span>
			</div>
			<input type="hidden" id="markInfo" value="" /> <input type="hidden"
				id="barakOutId" value="" />
				<!--<input type="hidden" id="prev_round" value="" />
				<input type="hidden" id="next_round" value="" />-->
		</div>
		<form name="fm1" id="fm1">
			<div id="filmContent"></div>
		</form>
		<div id="buttonDiv"></div>
		
	</div>
</body>
</html>