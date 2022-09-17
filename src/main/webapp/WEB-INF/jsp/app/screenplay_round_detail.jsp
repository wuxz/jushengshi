<%@include file="taglib.jsp"%>
<%@ page contentType="text/html;charset=UTF-8" pageEncoding="UTF-8"%>
<title>${data.diff_p_status}</title>
<link rel="stylesheet" href="/resources/app/css/reset.css">
<link rel="stylesheet" href="/resources/app/css/play-detail.css">
<title>剧省事儿</title>
</head>
<body>
	<div class="tab clearfix">
		<c:if test="${data.diff_p_status == 3}">
			<button class="after_modify active">修改后</button>
			<button class="pre_modify">修改前</button>
		</c:if>
	</div>
	<div class="header">
		<div class="row">
			<span class="titl">状态：</span> <span class="sh-status"><c:choose>
					<c:when test="${data.status == -1}">删除</c:when>
					<c:when test="${data.status == 1}">未拍</c:when>
					<c:when test="${data.status == 1}">未拍完</c:when>
					<c:otherwise>已拍</c:otherwise>
				</c:choose></span>
		</div>
		<div class="row clearfix no-b-b">
			<div class="col6">
				<span class="titl"> 日/夜： </span> <span class="desc"><c:choose>
						<c:when test="${data.day_night == 1}">日</c:when>
						<c:when test="${data.day_night == 2}">夜</c:when>
						<c:when test="${data.day_night == 3}">晨</c:when>
						<c:when test="${data.day_night == 4}">昏</c:when>
						<c:otherwise>其他</c:otherwise>
					</c:choose></span>
			</div>
			<div class="col6">
				<span class="titl"> 内/外： </span> <span class="desc"><c:choose>
						<c:when test="${data.side == 1}">内</c:when>
						<c:when test="${data.side == 2}">外</c:when>
						<c:otherwise>其他</c:otherwise>
					</c:choose></span>
			</div>
		</div>
	</div>
	<div class="cont">
		<div class="status">
			<c:choose>
				<c:when test="${data.diff_p_status == 2 }">
					<img src="/resources/app/images/status-add.png" alt="">
				</c:when>
				<c:when test="${data.diff_p_status == 4 }">
					<img src="/resources/app/images/status-del.png" alt="">
				</c:when>
			</c:choose>
		</div>
		<div class="play-text" id="nowContent">
			<c:choose>
				<c:when test="${data.diff_p_status == 4 }">
				${data.precontent}
			</c:when>
				<c:otherwise>
				${data.nowcontent}
			</c:otherwise>
			</c:choose>
		</div>
		<div class="play-text" style="display: none" id="prevContent">${data.precontent}</div>
	</div>
	<div class="btnDiv">
		<c:if test="${data.prev != null && data.prev.length() != 0 }">
			<a
				href="/app/screenplay_round_detail?roundId=${data.prev}&staffId=${staffId}&userId=${userId}&userToken=${userToken}&deviceType=${deviceType}&deviceAgent=${deviceAgent}"><button
					class="btn-pre">上一场</button></a>
		</c:if>
		<c:if test="${data.next != null && data.next.length() != 0 }">
			<a
				href="/app/screenplay_round_detail?roundId=${data.next}&staffId=${staffId}&userId=${userId}&userToken=${userToken}&deviceType=${deviceType}&deviceAgent=${deviceAgent}"><button
					class="btn-nex">下一场</button></a>
		</c:if>
	</div>
	<script>
		$(document).ready(function() {
			$(".after_modify").click(function() {
				$(this).addClass("active");
				$(".pre_modify").removeClass("active");
				$("#nowContent").show();
				$("#prevContent").hide();
			});

			$(".pre_modify").click(function() {
				$(this).addClass("active");
				$(".after_modify").removeClass("active");
				$("#prevContent").show();
				$("#nowContent").hide();
			});
		});
	</script>
</body>
</html>
