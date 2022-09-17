<%@ page contentType="text/html;charset=UTF-8" pageEncoding="UTF-8"%>
<%@include file="taglib.jsp"%>
<title>期表 - 剧省事儿</title>
<link rel="stylesheet" href="/resources/web/css/screenplay.css">
<link rel="stylesheet" href="/resources/web/css/shoot_notice.css">
<script src="/resources/web/js/shoot_approve.js"></script>
<script src="/resources/web/js/shoot_notice_detail.js"></script>
</head>
<body>
	<%@include file="header.jsp"%>
	<div class="content">
		<div class="shootnoticeCont">
			<div class="contTop">
				<a href="javascript:;" class="btn" id="sh_cancel">撤销</a><!--
				--><a href="javascript:;" class="btn reEdit" >重新编辑</a><!--
				--><a href="javascript:;" class="btn btn-warn" id="app_status">审批中</a>
			</div>
			<div class="breadcrumb">
				<a href="shoot_notice?staffId=${staffId}">通告</a> >
				<span>审批中通告</span>
			</div>
			<div class="shNoSection">
				<h2 class="shNoTitle">
					
				</h2>
				<div class="shNoDec">
					<span>拍摄日期：</span>
					<span class="shDate"></span>
					<span>拍摄地：</span>
					<span class="shAddress"></span>
					<span>拍摄第</span>
					<span class=" "></span>
					<span class="mr">天</span>
					<span>总页数：</span>
					<span class="allPage"></span>
				</div>
				<div class="shNoDec">
					<span>天气情况：</span>
					<span class="shWeather"></span>
					<span>日出时间：</span>
					<span class="sunriseTime"></span>
					<span>日落时间：</span>
					<span class="sundownTime"></span>
				</div>
			</div>	
		</div>
	</div>
</body>
</html>