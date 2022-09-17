<%@ page contentType="text/html;charset=UTF-8" pageEncoding="UTF-8"%>
<%@include file="taglib.jsp"%>
<title>分场表 - 剧省事儿</title>
<link rel="stylesheet" href="/resources/web/css/screenplay.css">
<link rel="stylesheet" href="/resources/web/css/round_info.css">
<script src="/resources/web/js/select.js"></script>
<script src="/resources/web/js/round_search.js"></script>
</head>
<body>
	<%@include file="header.jsp"%>
	<div class="content">
		<div class="roundCont">
			<div class="contTop">
					<span class="searchBox"><!--
					--><input type="text" class="search" id="searchContent" placeholder="搜索场景/角色"><!--
					--><i class="searchBtn" id="searchBtn"></i><!--
				--></span>
			</div>
			<div class="breadcrumb">
				<a href="/web/round_info?staffId=${staffId}">分场表</a> >
				<span>搜索“场景/角色”</span>
			</div>
			<div class="contTable">
				<div class="contTblHead">
					<div class="selectBox round_day" id="searchDayNight">
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
					<div class="selectBox round_side" id="searchSide">
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