<%@ page contentType="text/html;charset=UTF-8" pageEncoding="UTF-8"%>
<%@include file="common_header.jsp"%>
	<div class="nav">
		<ul>
			<li class="screenplay"><i class="icon"></i><a href="staff_home?staffId=${staffId}">剧本</a></li>
			<li class="memberlist"><i class="icon"></i><a href="member_list?staffId=${staffId}">通讯录</a></li>
			<li class="hotelInfo"><i class="icon"></i><a href="staff_hotel_list?staffId=${staffId}">住宿信息</a></li>
			<li class="shootnotice"><i class="icon"></i><a href="shoot_notice?staffId=${staffId}">通告</a></li>
			<li class="schedule"><i class="icon"></i><a href="schedule_info?staffId=${staffId}&status=40">期表</a></li>
			<li class="round"><i class="icon"></i><a href="round_info?staffId=${staffId}">分场表</a></li>
		</ul>
	</div>
<script>
	url = window.location.href;
	if (url.indexOf("staff_home") >= 0 || url.indexOf("juben_") >= 0 || url.indexOf("screenplay_") >= 0) {
		$(".nav li").eq(0).addClass("navActive");
	} else if (url.indexOf("mem") >= 0) {
		$(".nav li").eq(1).addClass("navActive");
	} else if (url.indexOf("hotel") >= 0) {
		$(".nav li").eq(2).addClass("navActive");
	} else if (url.indexOf("shoot") >= 0) {
		$(".nav li").eq(3).addClass("navActive");
	} else if (url.indexOf("schedule") >= 0) {
		$(".nav li").eq(4).addClass("navActive");
	} else if (url.indexOf("round") >= 0) {
		$(".nav li").eq(5).addClass("navActive");
	}
</script>