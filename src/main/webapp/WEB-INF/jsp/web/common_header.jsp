<%@ page contentType="text/html;charset=UTF-8" pageEncoding="UTF-8"%>
<script src="/resources/web/js/common_header.js"></script>
<script src="/resources/web/js/laydate.dev.js"></script>
	<div class="header">
		<div class="logoBox">
			 <img src="/resources/web/images/logoS.png" alt="" class="logo">
			 <div class="head_home_div">
			 	<a href="home"><i class="home_icon"></i></a>
			 </div>
		</div>
		<h3 class="title">${staffName}</h3>
		<div class="headerRight">
			<a href="feedback" class="feedback"><i class="icon"></i>反馈</a>
			<!--
			-->
			<a href="javascript:;" class="setting"><i class="icon"></i>设置</a>
			<!--
			-->
			<a href="javascript:;" class="exit"><i class="icon"></i>退出</a>
			<!--
		-->
		</div>
		<div class="settingList">
			<ul>
				<li class="active"><a href="javascript:;" id="stafInfoBtn">剧组信息</a></li>
				<li><a href="javascript:staff_archive('${staffId}', 'archive')">归档剧组</a></li>
				<li><a href="javascript:staff_archive('${staffId}', 'delete')">删除剧组</a></li>
			</ul>
		</div>
	</div>
	<div class="feedbackForm" style="display:none;">
			<textarea name="" id="content" rows=10 placeholder="填写您的反馈内容"></textarea>
			<input type="button" value="提交" class="feedbackSubmitBtn">
	</div>
