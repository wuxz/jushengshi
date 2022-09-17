<%@ page contentType="text/html;charset=UTF-8" pageEncoding="UTF-8"%>
<%@include file="taglib.jsp"%>
<link rel="stylesheet" href="/resources/web/css/screenplay.css">
<link rel="stylesheet" href="/resources/web/css/shoot_notice.css">
<link rel="stylesheet" href="/resources/web/css/round_info.css">
<link href="/resources/web/css/alertMemList.css">
<script src="/resources/web/js/laydate.dev.js"></script>
<script src="/resources/web/js/mode_round_select.js"></script>
<script src="/resources/web/js/shoot_round_info.js"></script>
<script src="/resources/web/js/shoot_tplane_info.js"></script>

<script src="/resources/web/js/alertMemList.js"></script>
<script src="/resources/web/js/shoot_notice_new.js"></script>
<style>
.bordercolor{
	border:1px solid red;
}
</style>
</head>
<body>
	<%@include file="header.jsp"%>
	<div class="content">
		<div class="shootnoticeCont">
			<div class="contTop">
				<a href="javascript:;" id="addNewBlock" class="btn">创建新板块</a>
				<input type='hidden' id="othertBlockNum" value="1"/>
				<a href="javascript:;" class="btn publishShootNotice">发布</a>
				<a href="javascript:;" class="btn btn-opa shootNoticeSave">暂时保存</a>
				<a href="javascript:;" class="btn btn-opa backBreakOutList">取消</a>
			</div>
			<div class="breadcrumb">
				<a href="/web/shoot_notice?staffId=${staffId}">通告</a> >
				<span id='TGTip'>添加通告</span>
			</div>
			<div class="shNoInput">
				<div class="inRow inRow1">
					<label>通告标题
						<b class="notNull">*</b>
						<input type="text" id="title_id">
					</label> 
				</div>
				<div class="inRow">
					<label class="mr5">拍摄日期
						<b class="notNull">*</b>
						<input id="shoot_day_id" type="text" class="w15">
					</label>
					<label class="mr5">拍摄所在城市
						<b class="notNull">*</b>
						<input id="shoot_city_id" type="text" placeholder="输入城市查找" class="w15">
						<input id="regin_city_id" type="hidden" placeholder="输入城市查找" class="w15">
						<div class="round_city_option round_ji_city" style="display:none;">
							<ul>
								
							</ul>
						</div>
					</label>
					<label class="mr5">拍摄第
						<b class="notNull">*</b>
						<input type="text" id="shoot_number_id" class="w10">
						天
					</label>
					<label>总页数
						<b class="notNull">*</b>
						<input type="text" id="page_count_id" class="w10">
					</label>
				</div>
				<div class="inRow">
					<label class="ml14 mr8">拍摄地
						<b class="notNull">*</b>
						<input type="text" id="shoot_place_id" class="w15">
					</label>
					<label>天气情况
						<b class="notNull">*</b>
						<input type="text" id="weather_id" class="mr4 w15">
					</label>
					<label>日出时间
						<b class="notNull">*</b>
						<input type="text" id="sunrise_id" class="mr55 w10">
					</label>
					<label>日落时间
						<b class="notNull">*</b>
						<input type="text" id="sunset_id" class="w10">
					</label>
				</div>     
			</div>
			
			<%@include file="shoot_round.jsp"%>
			
			
			
			
			<div class="shTab jobBlock">
				<h3>工作人员时间安排</h3>
				<input type="hidden" class="otherBlock" id="job_module_title" value="工作人员时间安排"/>
				<input type="hidden" id="jobLen" value="1">
				<div class="shTabItem">
					<div class="inRow">
						<input type="text" id="job_content_name_1"  placeholder="事件描述或人名" class="decEevent">
					</div>
					<div class="inRow">
						<input type="text" id="job_content_value_1" placeholder="填写时间及其他内容" class="person-plan">
					</div>					
					<div class="waveLine"></div>
				</div>				
				<button class=" add-tbl" id="addjob">+添加新表</button>
			</div>
			<div class="shTab rolerBlock">
				<h3>主要演员时间安排</h3>
				<input type="hidden" class='otherBlock' id="roler_module_title" value="主要演员时间安排"/>
				<div class="shTabItem">
					<div class="inRow">
						<input type="text" id ="roler_content_name_1" placeholder="事件描述或人名" class="decEevent">
						<input type="hidden" id="rolerLen" value="1">
					</div>
					<div class="inRow">
						<input type="text" id ="roler_content_value_1" placeholder="填写时间及其他内容" class="person-plan">
					</div>					
					<div class="waveLine"></div>
				</div>
				
				<button class=" add-tbl" id="addroler">+添加新表</button>
			</div>
			<div class="shTab otherrolerBlock">
				<h3>其他演员时间安排</h3>
				<input type="hidden" class='otherBlock' id="otherroler_module_title" value="其他演员时间安排"/>
				<input type="hidden" id="otherrolerLen" value="1">
				<div class="shTabItem">
					<div class="inRow">
						<input type="text" id ="otherroler_content_name_1" placeholder="事件描述或人名" class="decEevent">
					</div>
					<div class="inRow">
						<input type="text" id ="otherroler_content_value_1" placeholder="填写时间及其他内容" class="person-plan">
					</div>
					
					<div class="waveLine"></div>
				</div>
				
				<button class=" add-tbl" id="addotherroler">+添加新表</button>
			</div>
			<div class="shTab  foodBlock">
				<h3>用餐时间安排</h3>
				<input type="hidden" class="otherBlock" id="food_module_title" value="用餐时间安排"/>
				<input type="hidden" id="foodLen" value="3">
				<div class="shTabItem">
					<div class="inRow">
						<input type="text" id ="food_content_name_1" placeholder="事件描述或人名" value="早餐" class="decEevent">
					</div>
					<div class="inRow">
						<input type="text" id ="food_content_value_1" placeholder="填写时间及其他内容" class="person-plan">
					</div>
					
					<div class="waveLine"></div>
				</div>
				<div class="shTabItem">
					<div class="inRow">
						<input type="text" id ="food_content_name_2" placeholder="事件描述或人名" value="午餐" class="decEevent">
					</div>
					<div class="inRow">
						<input type="text" id ="food_content_value_2" placeholder="填写时间及其他内容" class="person-plan">
					</div>
					
					<div class="waveLine"></div>
				</div>
				<div class="shTabItem">
					<div class="inRow">
						<input type="text" id ="food_content_name_3" placeholder="事件描述或人名" value="晚餐" class="decEevent">
					</div>
					<div class="inRow">
						<input type="text" id ="food_content_value_3" placeholder="填写时间及其他内容" class="person-plan">
					</div>
					
					<div class="waveLine"></div>
				</div>
				
					<button class=" add-tbl" id="addfood">+添加新表</button>
			</div>
			<div class="shTab setOutBlock">
				<h3>置景陈设，道具及特别效果</h3>
				<input type="hidden" class="otherBlock" id="setOut_module_title" value="置景陈设，道具及特别效果"/>
				<input type="hidden" id="setOutLen" value="1">
				<div class="shTabItem">
					<div class="inRow">
						<input type="text" id ="setOut_content_name_1"  placeholder="事件或器材名称" class="decEevent">
					</div>
					<div class="text-in-div">
						<textarea type="text" id ="setOut_content_value_1" placeholder="填写需要说明的内容" class="person-plan"></textarea>
					</div>					
					<div class="waveLine"></div>
				</div>
				
				<button class=" add-tbl" id="addsetOut">+添加新表</button>
			</div>
			<div class="shTab toolsBlock">
				<h3>摄影器材，灯光器材及场务用品 </h3>
				<input type="hidden" class="otherBlock" id="tools_module_title" value="摄影器材，灯光器材及场务用品"/>
				<input type="hidden" id="toolsLen" value="1">
				<div class="shTabItem">
					<div class="inRow">
						<input type="text" id="tools_content_name_1" placeholder="事件或器材名称" class="decEevent">
					</div>
					<div class="text-in-div">
						<textarea type="text" id ="tools_content_value_1" placeholder="填写需要说明的内容" class="person-plan"></textarea>
					</div>					
					<div class="waveLine"></div>
				</div>				
				<button class=" add-tbl" id="addtools">+添加新表</button>
			</div>
			<%@include file="shoot_tplane.jsp"%>
			
			
					
			<div class="auditor">
				<button type="button" class="notice-btn-s btn-send publishShootNotice">发布</button>
				<button type="button"  class="notice-btn-s del-tbl shootNoticeSave">暂时保存</button>
				<button type="button" class="notice-btn-s del-tbl backBreakOutList">取消</button>
			</div>
		</div>
	</div>
	<div class="meng" style="display: none;">
		<div class="add-new-section" style="display: none;">
			<h3>创建新板块 </h3>
			<img src="/resources/web/images/homeclose.png" alt="" class="close closeCreateBlock">
			<div class="sec-name-input">
				<input type="text" id="newBlockTitle" placeholder="新板块名称">
			</div>
			<div class="btnBox">
				<button class="btn-t" id="createNewBlock" >创建</button><button class="btn-f closeCreateBlock">取消</button>
			</div>
		</div>		
	</div>
</body>
</html>
