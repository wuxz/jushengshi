<%@ page contentType="text/html;charset=UTF-8" pageEncoding="UTF-8"%>
<%@include file="taglib.jsp"%>
<link rel="stylesheet"	href="/resources/web/css/screenplay.css" />
<link rel="stylesheet" href="/resources/web/css/detailInfo.css">
<script src="/resources/web/js/screenplay_detail.js"></script>
<title>剧本详情 - 剧省事儿</title>
</head>
<body>
	<%@include file="header.jsp"%>
	<div class="content">
		<div class="detaileInfoCont">
			<div class="contTop">
				<a href="/web/staff_home?staffId=${staffId}" >剧本</a>
				> <span>剧本详情</span>
			</div>
			<div class="contTable">
				<div class="contTblHead">
					<span class="diff  now active">修改后</span>
					<span class="diff prev">修改前</span>
					<span id="add" style="display:none;">增加场</span>
					<span id="delete" style="display:none;">已删除</span>
				</div>
				<div class="desc">
					<div class="descTitle">
						<span class="roundScene"></span> 
						<span class="day_night"></span> 
						<span class="screenplaySide"></span>
					</div>
					<div class="contShow">
					</div>
				</div>
				<div class="descBtnBox">
					<button class="perBtn" id="prevBtn">上一场</button>
					<button id="nextBtn">下一场</button>
				</div>
			</div>
		</div>
	</div>	
</body>
</html>