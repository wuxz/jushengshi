<%@ page contentType="text/html;charset=UTF-8" pageEncoding="UTF-8"%>
<%@include file="taglib.jsp"%>
<title>通讯录 - 剧省事儿</title>
<link rel="stylesheet" href="/resources/web/css/include/reset.css">
<link rel="stylesheet" href="/resources/web/css/header.css">
<link rel="stylesheet" href="/resources/web/css/screenplay.css">
<link rel="stylesheet" href="/resources/web/css/memberList.css">
<link rel="stylesheet" href="/resources/web/css/mem_lists_delete.css">
<script src="/resources/web/js/member_search.js"></script>

<script src="/resources/web/js/select.js"></script>
</head>
<body>
	<%@include file="header.jsp"%>
	<div class="content">
		<div class="memberListCont" style="display: block;">
			<div class="contTop">
				<span class="searchBox">
					<!--
					-->
					<input type="text" class="search" id="searchContent"
					placeholder="搜索姓名/职位">
				<!--
					-->
					<i class="searchBtn" id="searchButton"></i>
				<!--
				-->
				</span>
				<!--
			-->
			</div>
			<div class="breadcrumb">
				<a href="/web/member_list?staffId=${staffId}">通讯录</a> > <span>搜索</span>“<span
					class="keywords">演员</span>”
			</div>
			<div class="contTable">
				<table class="memberTabl">
					<thead>
						<tr>
							<th>序号</th>
							<th>姓名</th>
							<th>性别</th>
							<th>电话</th>
							<th>电话状态</th>
							<th>职务</th>
							<th>身份证号</th>
							<th>权限</th>
							<th>状态（邀请）</th>
							<th>是否可查看剧本</th>
							<th>操作</th>
						</tr>
					</thead>
					<tbody class="showMemberList">

					</tbody>
				</table>
			</div>
		</div>
	</div>
	<div class="meng">
		<%@include file="member_add.jsp"%>
	</div>
</body>
</html>