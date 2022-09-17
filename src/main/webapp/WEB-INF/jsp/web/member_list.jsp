<%@ page contentType="text/html;charset=UTF-8" pageEncoding="UTF-8"%>
<%@include file="taglib.jsp"%>
<title>通讯录 - 剧省事儿</title>
<link rel="stylesheet" href="/resources/web/css/include/reset.css">
<link rel="stylesheet" href="/resources/web/css/header.css">
<link rel="stylesheet" href="/resources/web/css/screenplay.css">
<link rel="stylesheet" href="/resources/web/css/memberList.css">
<script src="/resources/web/js/laydate.dev.js"></script>
<script src="/resources/web/js/select.js"></script>
<script src="/resources/web/js/memberlist.js"></script>
</head>
<body>
	<%@include file="header.jsp"%>
	
		<div class="content">
		
			<div class="memberListCont" style="display: block;">
				<div class="contTop">
					<a href="javascript:;" class="btn" id="addmember">邀人入组</a>
					<!--
				-->
					<a href="javascript:;" class="btn" id="addGroup">添加分组</a>
					<!--
				-->
					<!--<a href="" class="btn">批量删除</a>
					
				-->
					<a href="javascript:;" class="btn btn-opa" id="memberSetting">通讯录设置</a>
					<!--
				-->
					<a href="/web/staff_export?staffId=${staffId}" class="btn btn-opa" id="outMemExcel">导出为Excel</a>
					<!--
				-->
					<a href="mem_list_limit_info?staffId=${staffId}" target="_blank" class="btn btn-opa" id="">用户权限说明</a>
					<!--
				-->
					<span class="searchBox memberSearch"> <!--
					--> <input type="text" class="search" id="keyword"
						placeholder="搜索姓名/职位"> <!--
					--> <i class="searchBtn" id="searchButton"></i> <!--
				-->
					</span>
					<!--
			-->
				</div>
				<div class="memberListSelect">
					<div class="selectBox" id="selectMemAll">
						<div class="select">全部人员</div>
						<i class="selectIcon"></i>
						<ul class="selectUl">
							
						</ul>
					</div>
					<div class="selectBox" id="selectMemStatus">
						<div class="select">全部状态</div>
						<i class="selectIcon"></i>
						<div class="selectIconLine"></div>
						<ul class="selectUl" id="searchStatus">
							<li>全部状态</li>
							<li>离组</li>
							<li>在组</li>
							<li>拒绝邀请</li>
							<li>邀请中</li>
							
						</ul>
					</div>
					<div class="selectBox" id="selectMemPermission">
						<div class="select">全部权限</div>
						<i class="selectIcon"></i>
						<div class="selectIconLine"></div>
						<ul class="selectUl" id="searchPrivilege">
							<li>全部权限</li>
							<li>创建者</li>
							<li>管理员</li>
							<li>组长</li>
							<li>成员</li>
						</ul>
					</div>
					<div class="selectBox" id="selectMemBook">
						<div class="select">是否可查看剧本</div>
						<i class="selectIcon"></i>
						<div class="selectIconLine"></div>
						<ul class="selectUl" id="searchScreenpty">
							<li>是否可查看剧本</li>
							<li>可查看剧本</li>
							<li>不可查看剧本</li>
						</ul>
					</div>
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
								<th>进组日期</th>
								<th>离组日期</th>
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
			<%@include file="member_setting.jsp"%>
			<%@include file="member_group.jsp"%>		
		</div>
</body>
</html>