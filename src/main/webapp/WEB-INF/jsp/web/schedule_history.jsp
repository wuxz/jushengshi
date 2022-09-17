<%@ page contentType="text/html;charset=UTF-8" pageEncoding="UTF-8"%>
<%@include file="taglib.jsp"%>
<title>期表 - 剧省事儿</title>
<link rel="stylesheet" href="/resources/web/css/screenplay.css">
<link rel="stylesheet" href="/resources/web/css/schedule.css">
<script src="/resources/web/js/schedule_history.js"></script>
</head>
<body>
	<%@include file="header.jsp"%>
	<div class="content">
		<div class="scheduleCont">
			<%@include file="schedule_header.jsp"%>
			<div class="contTable">
				<table class="memberTabl schedule">
					<thead>
						<tr>
							<th>日期</th>
							<th>场次</th>
							<th>场景</th>
							<th>日/夜</th>
							<th>内/外</th>
							<th>拍摄地点</th>
							<th>内容梗概</th>
							<th>主演</th>
							<th>临演/特约</th>
							<th>补充内容</th>
							<th>操作</th>
						</tr>
					</thead>
					<tbody>
					</tbody>
				</table>
				<div class="apprPerson">
					审批人： <span id="auditor"></span>
				</div>
			</div>
		</div>
	</div>
	<div class="meng">
		<div class="shedu_round_info" style="display: none;">
			<h3>场次详情</h3>
			<img src="/resources/web/images/homeclose.png" alt="" class="close">
			<div class="round_info_box">
				<div class="descTop">
					<span class="roundScene">20.家里</span> | <span class="day_night">日</span>
					| <span class="screenplaySide">内</span>
				</div>
				<div class="round_text"></div>
			</div>
		</div>
	</div>
</body>
</html>