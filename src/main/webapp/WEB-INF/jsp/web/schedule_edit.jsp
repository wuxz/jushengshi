<%@ page contentType="text/html;charset=UTF-8" pageEncoding="UTF-8"%>
<%@include file="taglib.jsp"%>
<title>期表 - 剧省事儿</title>
<link rel="stylesheet" href="/resources/web/css/screenplay.css">
<link rel="stylesheet" href="/resources/web/css/shoot_notice.css">
<link rel="stylesheet" href="/resources/web/css/round_info.css">
<script src="/resources/web/js/laydate.dev.js"></script>
<script src="/resources/web/js/mode_round_select.js"></script>
<script src="/resources/web/js/schedule_edit.js"></script>
</head>
<body>
	<%@include file="header.jsp"%>
	<div class="content">
		<div class="shootnoticeCont">
			<div class="breadcrumb">
				<a href="schedule_info?status=40&staffId=${staffId}">期表</a> > <span>编辑期表</span>
			</div>
			<div class="shNoInput">
				<div class="inRow">
					<label class="mr5">拍摄日期 <b class="notNull">*</b> <input
						type="text" class="w15" id="pdate">
				</div>
			</div>
			<form id="fm1">
				<div id="dynamicContent"></div>
			</form>
			<button class="add-tbl mb30">+添加新表</button>
			<div class="btfo">
				<button type="button" class="notice-btn-s btn-send">保存</button>
				<button type="button" class="notice-btn-s save_add">保存并编辑新日期</button>
			</div
		</div>
	</div>
</body>
</html>