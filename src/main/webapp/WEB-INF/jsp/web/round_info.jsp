<%@ page contentType="text/html;charset=UTF-8" pageEncoding="UTF-8"%>
<%@include file="taglib.jsp"%>
<style type="text/css">
	.contTop .searchBox .bordercolor{
		border:1px solid red;
	} 
</style>
<title>分场表 - 剧省事儿</title>
<link rel="stylesheet" href="/resources/web/css/screenplay.css">
<script src="/resources/web/js/select.js"></script>
<script src="/resources/web/js/alertMemList.js"></script>
<script src="/resources/web/js/round_info.js"></script>
</head>
<body>
	<%@include file="header.jsp"%>
	<div class="content">
		<div class="roundCont">
			<div class="contTop">
				<a href="javascript:;" id="addBreakOutTable" class="btn">添加分场表</a>
				<a href="javascript:;" id="sendBreakOutTable" class="btn">发送分场表</a>
				<span class="searchBox">
					<input type="text" class="search" id="searchContent" placeholder="请选择或输入场次数字">
					<i class="searchBtn" id="searchBtn" ></i>
				</span>
			</div>
			<div class="contTable">
				<div class="contTblHead">
					<span class="item1">全部</span>
					<div class="selectBox" id="roundSelectTime">
						<div class="select">日/夜</div>
						<i class="selectIcon"></i>
						<ul class="selectUl">
							<li>日/夜</li>
							<li>日</li>
							<li>夜</li>
							<li>晨</li>
							<li>昏</li>
							<li>其他</li>	
						</ul>
					</div>
					<div class="selectBox" id="roundSelectSide">
						<div class="select">内/外</div>
						<i class="selectIcon"></i>
						<ul class="selectUl">
							<li>内/外</li>
							<li>内</li>
							<li>外</li>
							<li>其他</li>	
						</ul>
					</div>
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