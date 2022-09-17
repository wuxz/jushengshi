<%@ page contentType="text/html;charset=UTF-8" pageEncoding="UTF-8"%>
<script src="/resources/web/js/member_add.js"></script>
<div class="addMember" style="display: none;">
	<h3>邀人入组</h3>
	<img src="/resources/web/images/homeclose.png" class="close"
		id="closeAddMember">
	<form id="fm1">
		<div class="memInfoForm">
			<table id="memberAdd">
				<tr>					
					<td>
						<label varName="mobile"> <b class="notNull">*</b>电话
							<input type="text" readonly id="mobile" required>
						</label>
					</td>
					<td>
						<label varName="gender"> <b class="notNull">*</b>性别
								<select id="gender" required>
									<option value="1">男</option>
									<option value="2">女</option>
							</select>
						</label>
					</td>
				</tr>
				<tr>
					<td>
						<label varName="realname"> <b class="notNull">*</b>姓名
								<input type="text" id="realname" required>
						</label>
					</td>
					<td>
						<label varName="status"> <b class="notNull">*</b>状态
							<select id="status" required>
									<option value="-1">被踢出</option>
									<option value="1">待加入</option>
									<option value="2">拒绝邀请</option>
									<option value="5">已加入</option>
							</select>
						</label>
					</td>
				</tr>
				<tr>
					<td><label varName="jobnames"> <b class="notNull">*</b>职务
							<input type="text" id="jobnames" placeholder="请选择" required>
					</label></td>
					<td><label varName="instatus"> <b class="notNull">*</b>在组状态
							<select id="instatus" required>
								<option value="2">在组</option>
								<option value="1">离组</option>
								<option value="3">拒绝邀请</option>
								<option value="4">邀请中</option>
						</select>
					</label></td>
				</tr>
				<tr>
					<td><label varName="mobilestatus"> <b class="notNull">*</b>电话状态
							<select id="mobilestatus" required>
								<option value="2">公开</option>
								<option value="1">保密</option>
						</select>
					</label></td>
					<td class="row3"><label varName="role"> <b
							class="notNull">*</b>权限 <select id="role" required>
								<option value="3">管理员</option>
								<option value="1" selected="selected">成员</option>
						</select>
					</label> <a href="/web/mem_list_limit_info?staffId=${staffId}">权限说明</a></td>
				</tr>
				<tr>
					<td><label varName="isviewscreenplay"> <b
							class="notNull">*</b>是否查看剧本 <select 
							id="isviewscreenplay" required>
								<option value="2">可查看剧本</option>
								<option value="1">不可查看剧本</option>
						</select>
					</label></td>
					<td><label varName="idnumber"> <b class="notNull">*</b>身份证号
							<input type="text" id="idnumber">
					</label></td>
				</tr>
				<tr>
					<td><label varName="address">地址 <input type="text"
							id="address">
					</label></td>
					<td><label varName="sourcebank">开户银行 <input
							type="text" id="sourcebank">
					</label></td>
				</tr>
				<tr>
					<td><label varName="banknumber">银行账号 <input
							type="text" id="banknumber">
					</label></td>
					<td><label varName="in_date">进组日期 <input type="text"
							id="in_date" class="showdate" placeholder="选择日期">
					</label></td>
				</tr>
				<tr>
					<td><label varName="leave_date">离组日期 <input
							type="text" id="leave_date" class="showdate" placeholder="选择日期">
					</label></td>
					<td><label varName="performers">饰演角色 <input
							type="text" value="" id="performers">
					</label></td>
				</tr>
				<tr>
					<td><label varName="car_type">车辆类型 <input type="text"
							value="" id="car_type">
					</label></td>
					<td><label varName="car_num">车牌号码 <input type="text"
							value="" id="car_num">
					</label></td>
				</tr>
			</table>
			<div class="jobName clearfix" id="jobNameSelect">
				<div class="jobSection"></div>
				<div class="selfDefineJob">
					<input type="text" placeholder="添加自定义职务" id="resign">
					<button type="button" id="selfSaveJob">添加</button>
				</div>
				<button class="save" type="button" id="addMemberSave">保存</button>
			</div>
		</div>
	</form>
	<div class="btnDiv1">
		<button class="nextBtn" id="submitMemberInfo">完成</button>
	</div>
</div>