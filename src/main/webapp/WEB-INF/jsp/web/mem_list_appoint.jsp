<%@ page contentType="text/html;charset=UTF-8" pageEncoding="UTF-8"%>
<%@include file="taglib.jsp"%>
<title>通讯录 - 剧省事儿</title>
<link rel="stylesheet" href="/resources/web/css/include/reset.css">
<link rel="stylesheet" href="/resources/web/css/header.css">
<link rel="stylesheet" href="/resources/web/css/screenplay.css">
<link rel="stylesheet" href="/resources/web/css/mem_lists_delete.css">
<script src="/resources/web/js/select.js"></script>
<script src="/resources/web/js/member_list_appoint.js"></script>


</head>
<body>
	<%@include file="header.jsp"%>
	<div class="content">
		<div class="memberListCont" style="display: block;">
			<div class="contTop">
				<a href="javascript:;" id="apppointDepartment" class="btn">完成</a>
				<!--
				-->
				<a href="javascript:history.back(-1);" class="btn btn-opa">取消</a>
				<!--
				-->
				<span class="searchBox">
					<!--
					-->
					<input type="text" class="search" id="searchKeyWord"
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
				<a href="/web/member_list?staffId=${staffId}">通讯录</a> > <span>任命部门长</span>
			</div>
			<div class="memberListSelect">
				<div class="selectBox" id="selectMemAll">
					<div class="select">制作组</div>
					<i class="selectIcon"></i>
					<ul class="selectUl">
						<li>制作组</li>
					</ul>
				</div>
				<!--
				<div class="selectBox" id="selectMemStatus">
					<div class="select">全部状态</div>
					<i class="selectIcon"></i>
					<div class="selectIconLine"></div>
					<ul class="selectUl">
						<li data="-2">全部状态</li>
						<li data="-1">被踢出</li>
						<li data="1">待加入</li>
						<li data="2">拒绝邀请</li>
						<li data="5">已加入</li>
					</ul>
				</div>
				<div class="selectBox" id="selectMemPermission">
					<div class="select">全部权限</div>
					<i class="selectIcon"></i>
					<div class="selectIconLine"></div>
					<ul class="selectUl">
						<li>全部权限</li>
						<li>创建者</li>
						<li>管理员</li>
						<li>部门长</li>
						<li>成员</li>
					</ul>
				</div>
				<div class="selectBox" id="selectMemBook">
					<div class="select">是否可查看剧本</div>
					<i class="selectIcon"></i>
					<div class="selectIconLine"></div>
					<ul class="selectUl">
						<li>是否可查看剧本</li>
						<li>可查看剧本</li>
						<li>不可查看剧本</li>
					</ul>
				</div>-->
			</div>
			<div class="contTable">
				<table class="memberTabl">
					<thead>
						<tr>
							<th>选择</th>
							<th>姓名</th>
							<th>性别</th>
							<th>电话</th>
							<th>电话状态</th>
							<th>职务</th>
							<th>身份证号</th>
							<th>权限</th>
							<th>状态（邀请）</th>
							<th>是否可查看剧本</th>
						</tr>
					</thead>
					<tbody class="showMemberList">

					</tbody>
				</table>
			</div>
		</div>
	</div>

</body>
</html>