<%@ page contentType="text/html;charset=UTF-8" pageEncoding="UTF-8"%>
<%@include file="taglib.jsp"%>
<title>住宿表 - 剧省事儿</title>
<link rel="stylesheet" href="/resources/web/css/include/reset.css">
<link rel="stylesheet" href="/resources/web/css/header.css">
<link rel="stylesheet" href="/resources/web/css/screenplay.css">
<link rel="stylesheet" href="/resources/web/css/hotel_info.css">
<script src="/resources/web/js/laydate.dev.js"></script>
<script src="/resources/web/js/staff_hotel_edit.js"></script>
<script src="/resources/web/js/alertMemList.js"></script>
<script>
	var staffHotelId = '${staffHotelId}';
</script>
</head>
<body>
	<%@include file="header.jsp"%>
	<div class="content">
		<div class="hotelInfoCont" style="display: block;">
			<div class="contTop">
				<a href="javascript:importStaffInfo()" class="btn ">导入人员</a>
				<!--
				<a href="" class="btn btn-opa">导出Excel</a><!--
				-->
				<a href="javascript:deleteStaffInfo()" class="btn btn-opa">删除整个表</a>
				<!--
				-->
				<span class="searchBox">
					<!--
					-->
					<input type="text" class="search" placeholder="搜索姓名">
				<!--
					-->
					<i class="searchBtn"></i>
				<!--
				-->
				</span>
				<!--
			-->
			</div>
			<div class="breadcrumb">
				<a href="staff_hotel_list?staffId=${staffId}">住宿信息</a> > <span>住宿信息表</span>
			</div>
			<form id="fm1">
				<div class="hotel-tbl-name">
					<input id="hotelName" name="hotelName">
				</div>
				<div class="contTable">
					<table class="memberTabl">
						<thead>
							<tr>
								<th>序号</th>
								<th>房号</th>
								<th>姓名</th>
								<th>性别</th>
								<th>入住酒店</th>
								<th>房型</th>
								<th>入住日期</th>
								<th>离店日期</th>
								<th>入住天数</th>
								<th>价格/日（￥）</th>
								<th>总价（￥）</th>
								<th>操作</th>
							</tr>
						</thead>
						<tbody class="showMemberList">
						</tbody>
					</table>
				</div>
			</form>
		</div>
	</div>
</body>
</html>