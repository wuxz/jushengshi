<%@ page contentType="text/html;charset=UTF-8" pageEncoding="UTF-8"%>
					<span class="latestVersonScreenPlay"><a
						href="staff_home?staffId=${staffId}">最新发布的剧本</a></span> <span
						class="hestoryVersonScreenPlay"><a
						href="juben_history?staffId=${staffId}">剧本历史版本</a></span> <span
						class="unpush"> <a
						href="juben_unpublished?staffId=${staffId}">未发布的剧本</a></span>
<script>
	url = window.location.href;
	if (url.indexOf("staff_home") >= 0) {
		$(".contTblHead span").eq(0).addClass("active");
	} else if (url.indexOf("juben_history") >= 0) {
		$(".contTblHead span").eq(1).addClass("active");
	} else if (url.indexOf("juben_unpublished") >= 0) {
		$(".contTblHead span").eq(2).addClass("active");
	}
</script>