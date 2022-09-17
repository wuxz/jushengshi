<%@ page contentType="text/html;charset=UTF-8" pageEncoding="UTF-8"%>
<%@include file="taglib.jsp"%>
<link rel="stylesheet"
	href="/resources/web/css/home.css" />
<title>我的剧组</title>
<script src="/resources/web/js/laydate.dev.js"></script>
<script src="/resources/web/js/home.js"></script>
</head>
<body>
<%@include file="common_header.jsp"%>
	<div class="container">
		<div class="invitationStaff">
			<div class="invitationTitle">
				<h3>正在参与的剧组</h3>
				<div class="line"></div>
			</div>
			<div class="myStaffList list">
				<div class = "listBox">
					<div class="createStaff">
						<img src="/resources/web/images/createStaff.png" alt="">
						<h3>创建剧组</h3>
					</div>
				</div>
			</div>
		</div>
		<div class="archiveStaff">
			<div class="archiveTitle">
				<h3>已归档的剧组</h3>
				<div class="line"></div>
			</div>	
			<div class="archiveList list">
			</div>
		</div>
	</div>
	<div class="footer">
		Copyright &copy;2016All Rights Reserved
	</div>
	<div class="creatStaffBox meng">
		<div class="createStaffInfo  creatForm">
			<h3>剧组信息</h3>
			<img src="/resources/web/images/homeclose.png" alt="" class="homeClose close">
			<div class="">
				<label for="staffNameVal">剧名</label>
				<input type="text" id="staffNameVal" class="noNull">
			</div>
			<div>
				<label for="staff_makeVal">制作方</label>
				<input type="text" id="staff_makeVal" class="noNull">
			</div>
			<div>
				<label for="staff_typeVal">项目类型</label>
				<select name="" id="staff_typeVal" class="noNull">
					<option value="">请选择</option>
					<option value="1">电影</option>
					<option value="2">电视剧</option>
					<option value="3">网剧</option>
					<option value="4">舞台剧</option>
					<option value="5">综艺</option>
					<option value="6">广告</option>
					<option value="7">其他</option>
				</select>
			</div>
			<div>
				<label for="">开机时间</label>
				<input type="text" id="openTime" class="noNull">
			</div>
			<div>
				<label for="screenplay_typeVal">剧本场次编号</label>
				<select name="" id="screenplay_typeVal" class="noNull">
					<option value="">请选择</option>
					<option value="1">顺序编辑</option>
					<option value="2">分集编辑</option>
				</select>
			</div>
			<p>顺序编辑：指场次编号是1，2，...这样的</p>
			<p>分集编辑：指场次编号是第1集，2，...,第2集1，2，...这样的</p>		
			<button id="createStaffBtn" class="creatBtn">下一步</button>		
		</div> 
		<div class="createUserInfo creatForm">
				<h3>创建者信息</h3>
				<img src="/resources/web/images/homeclose.png" alt="" class="homeClose close">
				<div class="">
					<label for="realnameVal">姓名</label>
					<input type="text" id="realnameVal" class="notNull">
				</div>
				<div id="selectSex" class="clearfix">
					<span>性别</span>			
					<div class="radio radio1">
						<label for="male" class="maleLabel">
							<input type="radio" name="sex"value="1" id="male" checked>
							<i class="radioIcon"></i><span>男</span>
						</label>
					</div>
					<div class="radio">
						<label for="female" class="femaleLabel">
							<input type="radio" name="sex" value="2" id="female">
							<i class="radioIcon"></i><span>女</span>
						</label>
					</div>
				</div>
				<div>
					<label for="jobnameVal">职务</label>
					<select name="" id="jobnameVal" class="notNull">
						<option value="">请选择</option>
						<option value="制片人">制片人</option>
						<option value="执行制片">执行制片</option>
						<option value="导演">导演</option>
						<option value="兼职">兼职</option>
						<option value="制片主任">制片主任</option>
						<option value="编剧">编剧</option>
						<option value="摄影指导">摄影指导</option>
						<option value="灯光指导">灯光指导</option>
						<option value="美术指导">美术指导</option>
						<option value="服装指导">服装指导</option>
						<option value="动作指导">动作指导</option>
						<option value="副导演">副导演</option>
						<option value="第一副导演">第一副导演</option>
						<option value="第二副导演">第二副导演</option>
						<option value="演员副导演">演员副导演</option>
						<option value="场记">场记</option>
						<option value="演员">演员</option>
						<option value="现场制片">现场制片</option>
						<option value="外联制片">外联制片</option>
						<option value="生活制片">生活制片</option>
						<option value="车辆管理">车辆管理</option>
						<option value="音响师">音响师</option>
						<option value="散工">散工</option>
						<option value="其他">其他</option>
					</select>
				</div>
				<div>
					<label for="mobilestatusVal">电话状态</label>
					<select name="" id="mobilestatusVal" class="notNull">
						<option value="2">公开</option>
						<option value="1">保密</option>
					</select>
				</div>
				<div class="btnBox">
					<button class="creatBtn" id="prevBtn">上一步</button>
					<button id="crateStaffBtn" class="creatBtn">完成
					</button>	
				</div>
		</div>
	</div>
</body>
</html>