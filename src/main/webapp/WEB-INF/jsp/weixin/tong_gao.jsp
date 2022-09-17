<%@include file="taglib.jsp"%>
<%@ page contentType="text/html;charset=UTF-8" pageEncoding="UTF-8"%>
<head>
	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width, initial-scale=1.0,user-scalable=no">
	<title>通告详情</title>
	<link rel="stylesheet" type="text/css" href="/resources/weixin/css/reset.css">
	<link rel="stylesheet" type="text/css" href="/resources/weixin/css/index.css">
	<link rel="stylesheet" type="text/css" href="/resources/weixin/css/round-detail.css">
	
	<script type="text/javascript" src="/resources/weixin/js/fastclick.js"></script>
	<script type="text/javascript" src="/resources/weixin/js/jquery.cookie.js"></script>
	<script type="text/javascript" src="/resources/weixin/js/tong_gao.js"></script>
</head>
<style type="text/css">
.meng div{
	min-height:100px;
}
</style>
<body>
	<div class="detail_header clearfix">
		<div class="date">
			<img src="/resources/weixin/images/calendar.png" class="calendar">
			<p class="cal_day" id="shoot_number_id"></p>
			<p class="cal_date" id="shoot_day_id" ></p>
		</div>
		<div class="head_r">
			<div class="head_row">
				天气：<span id="weather_id"></span>
			</div>
			<div class="head_row clearfix">
				<div class="h_row_l">
					日出：<span id="sunrise_id"></span>
				</div>
				<div class="h_row_r">
					日落：<span id="sunset_id"></span>
				</div>
			</div>
			<div class="head_row clearfix">
				<div class="h_row_l">
					拍摄地点：<span id="shoot_place_id"></span>
				</div>
			</div>
			<div class="head_row clearfix">
				<div class="h_row_l">
					总页数：<span id="page_count_id"></span>
				</div>
			</div>
		</div>
	</div>
	<div class="list" id="round">
		<div class="item">
			<span>拍摄场次</span>
			<span class="arrow">&gt;</span>
		</div>
	</div>
	<div class="list" id="job">
		<div class="item">
			<span>工作人员时间安排</span>
			<span class="arrow">&gt;</span>
		</div>
	</div>
	<div class="list" id="role">
		<div class="item">
			<span>主要演员时间安排</span>
			<span class="arrow">&gt;</span>
		</div>
	</div>
	<div class="list" id="actor">
		<div class="item">
			<span>其他演员时间安排</span>
			<span class="arrow">&gt;</span>
		</div>
	</div>
	
	<div class="list" id="food">
		<div class="item">
			<span>用餐时间安排</span>
			<span class="arrow">&gt;</span>
		</div>
	</div>
	<div class="list" id="setOut">
		<div class="item">
			<span>置景陈设，道具及特别效果</span>
			<span class="arrow">&gt;</span>
		</div>
	</div>
	<div class="list" id="tools">
		<div class="item">
			<span>摄影器材，灯光器材及场务用品</span>
			<span class="arrow">&gt;</span>
		</div>
	</div>
	
	
	
	<div class="list" id="plan">
		<div class="item no_b_b">
			<span>来日计划</span>
			<span class="arrow">&gt;</span>
		</div>
	</div>
	<h2 class="h2">审批人</h2>
	<div class="appr clearfix" id="auditList"></div>
	<div class="meng">		
		<div class="body" id="round_info" style="display:none">
			<img src="/resources/weixin/images/close.png" class="close"><!--close关闭按钮-->			
		</div>		
		<div class="body" id="job_info" style="display:none">
			<img src="/resources/weixin/images/close.png" class="close">
		</div>
		<div class="body" id="role_info" style="display:none">
			<img src="/resources/weixin/images/close.png" class="close">
		</div>
		<div class="body" id="actor_info" style="display:none">
			<img src="/resources/weixin/images/close.png" class="close">
		</div>
		<div class="body" id="food_info" style="display:none">
			<img src="/resources/weixin/images/close.png" class="close">
		</div>
		<div class="body" id="setOut_info" style="display:none">
			<img src="/resources/weixin/images/close.png" class="close">
		</div>
		<div class="body" id="tools_info" style="display:none">
			<img src="/resources/weixin/images/close.png" class="close">
		</div>
		
		<div class="body" id="plan_info" style="display:none">
			<img src="/resources/weixin/images/close.png" class="close"><!--close关闭按钮-->			
		</div>


		
	</div>
</body>
</html>