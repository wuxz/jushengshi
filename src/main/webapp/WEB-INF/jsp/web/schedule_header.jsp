<%@ page contentType="text/html;charset=UTF-8" pageEncoding="UTF-8"%>
<link rel="stylesheet" href="/resources/web/css/alertMemList.css">
<script src="/resources/web/js/alertMemList.js"></script>
<script src="/resources/web/js/schedule_send.js"></script>
<div class="contTop">
	<a href="javascript:publishSchedule();" class="btn schedule_publish" style="display:none">发布</a>
	<a href="schedule_edit?staffId=${staffId}&status=10" class="btn">选择日期编辑</a>
	<a href = 'javascript:;' class="btn schedule_send" style="display:none">发送期表</a>
	<a href="schedule_export?staffId=${staffId}" class="btn btn-opa">导出最新期表</a>
	<a href="schedule_history_export?staffId=${staffId}" class="btn btn-opa" id="">导出所有历史期表</a>
</div>
<div class="scheNav">
	<a href="schedule_info?staffId=${staffId}&status=40"><span
		>最新发布版本</span></a> <a href="schedule_info_history?staffId=${staffId}"><span>历史版本期表</span></a>
	<a href="schedule_editing?staffId=${staffId}&status=10"><span>编辑中</span></a> <a
		href="schedule_auditing?staffId=${staffId}&status=20"><span
		class="scheNavItem4">审核中</a></span>
</div>
<script>
	url = window.location.href;
	$(".btn.schedule_publish").hide();
	$(".btn.schedule_send").hide();
	if (url.indexOf("schedule_info?") >= 0) {
		$(".scheNav span").eq(0).addClass("scheNavActive");
		$(".btn.schedule_send").show();
	} else if (url.indexOf("schedule_info_history") >= 0) {
		$(".scheNav span").eq(1).addClass("scheNavActive");
	} else if (url.indexOf("schedule_editing") >= 0) {
		$(".scheNav span").eq(2).addClass("scheNavActive");
		$(".btn.schedule_publish").show();
	} else if (url.indexOf("schedule_auditing") >= 0) {
		$(".scheNav span").eq(3).addClass("scheNavActive");
	}
</script>