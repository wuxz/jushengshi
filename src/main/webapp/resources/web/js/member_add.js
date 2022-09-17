$(document).ready(function() {
	var rules = {
//		realname : {
//			realname : true,
//		},
//		idnumber : {
//			regex : /^(\d{15}$|^\d{18}$|^\d{17}(\d|X|x))$/,
//		},
		mobile : {
			mobile : true,
		},
	};
	var validator = validform("#fm1", rules);

	$("#addmember").click(function() {
		initMemberInfoForm();
	});

	// 保存通讯录
	$("#submitMemberInfo").click(function() {
		$("#fm1").find("input").each(function(index, element) {
			$(element).attr("name", $(element).attr("id"));
		});

		$("#fm1").find("select").each(function(index, element) {
			$(element).attr("name", $(element).attr("id"));
		});

		if (!validator.form()) {
			alertMsg('请填写正确的内容');

			return;
		}

		saveMemberInfo();
	})

	// 入住日期 离开日期计算天数
	$("#hotel_in_date").blur(function() {
		calculateDay();
	})
	$("#hotel_leave_date").blur(function() {
		calculateDay();
	})

	// 聚焦到职务
	$("#jobnames").focus(function() {
		$("#jobNameSelect").css({
			'display' : 'block'
		})

		loadResignList();
	})

	// 添加职务
	$("#selfSaveJob").click(function() {
		var resign = $("#resign").val();
	  var jobSection = document.getElementById('jobNameSelect').childNodes[1];

		var options = {
			url : '/api/proxy',
			dataType : 'json',
			type : 'POST',
			data : {
				targetUrl : '/organization/addresign',
				staffid : staffId,
				resign : resign,
			},
			success : function(data) {
				//loadResignList();
				$("#resign").val('');
				$("#jobNameSelect .jobSection").append("<div class='jobItem on'><h5>"+resign+"</h5><i class='memItem_close'></i></div>");
				jobSection.scrollTop = jobSection.scrollHeight;
        enableDeleteJobName();
			}
		}
		ajaxPost(options);
	})

	// 保存职务信息
	$("#addMemberSave").click(function(){
		var node = '';
		$("#jobNameSelect .jobSection .on h5").each(function() {
			var str = $(this).html();
			node += str + ","
		})
		var newstr = node.substring(0, node.length - 1);
		$("#jobnames").val(newstr);
		$("#jobNameSelect").css({
			"display" : "none"
		})
	   if(newstr.match('演员')&&!newstr.match("司机")){
			$('#performers').parent().parent().show();
			$('#car_type').parent().parent().parent().css({'display':'none'});
		}else if(newstr.match('司机')&&!newstr.match("演员")){
			$('#performers').parent().parent().hide();
			$('#car_type').parent().parent().parent().css({'display':'table-row'});
		}else if(newstr.match("演员")&&newstr.match("司机")){
			$('#performers').parent().parent().show();
			$('#car_type').parent().parent().parent().css({'display':'table-row'});
		}else{
		   $('#performers').parent().parent().hide();
		   $('#car_type').parent().parent().parent().css({'display':'none'});
		}
		if(newstr.match('制片人')){			
			$("#role").html('<option value="0" selected="selected">创建者</option>');
			$("#isviewscreenplay").html('<option value="2" selected="selected">可查看剧本</option>');
			$("#mobilestatus").find("option[value='1']").attr('selected','true');	
		}else if(newstr.match('导演') && !newstr.match('制片人')){				
			$("#role").html('<option value="3">管理员</option><option value="1">成员</option>');
			$("#isviewscreenplay").html('<option value="2">可查看剧本</option><option value="1">不可查看剧本</option>');
			$("#role").find("option[value='3']").attr('selected','true');			
			$("#isviewscreenplay").find("option[value='1']").attr('selected','true');
			$("#mobilestatus").find("option[value='1']").attr('selected','true');
		}else if(!newstr.match('导演') && !newstr.match('制片人') && newstr.match('演员')){
			$("#role").html('<option value="3">管理员</option><option value="1">成员</option>');
			$("#isviewscreenplay").html('<option value="2">可查看剧本</option><option value="1">不可查看剧本</option>');
			$("#mobilestatus").find("option[value='1']").attr('selected','true');	
		}else{
			$("#role").html('<option value="3">管理员</option><option value="1">成员</option>');
			$("#isviewscreenplay").html('<option value="2">可查看剧本</option><option value="1">不可查看剧本</option>');			
		}		
	})
})
function mobileCheck(fieldList){

	//手机号码填写正确后字段可填写
	$("#mobile").blur(function(){
		var mobile = $("#mobile").val();
		var mobileReg = /^1(3|5|4|8|7)\d{9}$/
		if(mobileReg.test(mobile)){			
			for(i=0;i<fieldList.length;i++){
				$("#"+fieldList[i].k).removeAttr("disabled");
				$("#memberAdd input[varName='"+fieldList[i].field+"']").removeAttr("disabled");
			}						
			var memberInfo = getMemberInfo(mobile);
			if(memberInfo!=null){
				for ( var field in fieldList) {									
					if (fieldList[field].type == 1) {									
						var value = eval("memberInfo." + fieldList[field].k);
						if (value != undefined) {
							$("#" + fieldList[field].k).val(array2String(value));
						}												
					} else {
						var fieldValue='';						
						fieldValue = searcInExtra(memberInfo.extra,fieldList[field].field);						
						$("#memberAdd input[varName='"+fieldList[field].field+"']").val(fieldValue);
							
					}
				}
				if(memberInfo.iscreator==2){						
					$("#role").html('<option value="0" selected="selected">创建者</option>');
				}else if(memberInfo.isadmin==2){
					$("#role").html('<option value="3" selected="selected">管理员</option>');
				}else if(memberInfo.isleader==2){
					$("#role").html('<option value="2" selected="selected">组长</option>');
				}else{
					$("#role").html('<option value="3">管理员</option><option value="1" selected="selected">成员</option');
				}
					
			}
		}
	})
}

// 把数组值转换为逗号分隔的字符串。如果值不是数组，则直接返回值本身。
function array2String(arrayValue) {
	var result = "";
	if (arrayValue instanceof Array) {
		for (i in arrayValue) {
			result += arrayValue[i] + ",";
		}

		result = result.substring(0, result.length - 1);
	} else {
		result = arrayValue;
	}

	return result;
}

function searcInExtra(extra, field) {
	if(extra.length>0){
		for (var i = 0; i < extra.length; i++) {
			if (extra[i].key == field) {
				if(extra[i].value=='undefined'){
					return "";
				}else{
					return extra[i].value;
				}

			}
		}
	}
	return "";
}

// 初始化表单。
function initMemberInfoForm(mobile) {
	// 是否是修改状态，否则为新增状态
	var isModify = (mobile != undefined && mobile != '');
	var fieldList = null;
	var memberInfo = null;

	if (isModify) {
		$("#mobile").attr("readonly", "readonly");
		memberInfo = getMemberInfo(mobile);
	} else {
		$("#instatus").html('<option value="4" selected="selected">邀请中</option>');
		$("#mobile").removeAttr("readonly");
	}
	
	// 取模板字段列表
	var options = {
		url : '/api/proxy',
		dataType : 'json',
		beforeSend : function(request) {
			request.setRequestHeader("staffId", staffId);
		},
		data : {
			targetUrl : "/addressbook/templatefieldlist",
			staffid : staffId,
		},
		success : function(data) {
			if (data.code == 0) {
				fieldList = data.data.list;
				//添加人员时检测手机号是否合法，除去电话字段外disabled
				if(!isModify){mobileCheck(fieldList);}
				
				$("#memberAdd .selfAdd").remove();
				// 先隐藏所有字段，只显示模板中有的字段
				$("label").hide();
				$("label[varName='']").remove();

				for ( var field in fieldList) {
					if (fieldList[field].status != "2") {
						continue;
					}
					$("#"+ fieldList[field].k).removeAttr("disabled");
					if (fieldList[field].type == 1) {
						// 默认字段
						$("label[varName='" + fieldList[field].k + "']").show();
						if (memberInfo != null) {
							var value = eval("memberInfo." + fieldList[field].k);
							if (value != undefined) {
								$("#" + fieldList[field].k).val(array2String(value));
							}
						} else {
							if(fieldList[field].k!='mobile'){
								$("#"+ fieldList[field].k).attr("disabled",true);	
							}							
							$("#" + fieldList[field].k).val('');
						}
					} else {
						var fieldValue='';
						if (memberInfo != null) {
							fieldValue = searcInExtra(memberInfo.extra,
									fieldList[field].field);
						}

						// 自定义字段
						$("#memberAdd").append(
							"<tr class='selfAdd'><td><label varName=\"\">"
									+ fieldList[field].field
									+ "<input varName=\""
									+ fieldList[field].field
									+ "\" value=\"" + fieldValue
									+ "\"></label></td></tr>");
						if(memberInfo==null){
							$("#memberAdd input[varName='"+fieldList[field].field+"']").attr("disabled",true);
						}			


					}
				}
				if($("#againRequest").length>0){$("#againRequest").remove();}
				
				var mobileMemeberInfo = getMemberInfo(userMobile);
				if(memberInfo!=null){					
					if(memberInfo.iscreator==2){						
						$("#role").html('<option value="0" selected="selected">创建者</option>');
					}else if(memberInfo.isadmin==2){
						if(mobileMemeberInfo.iscreator==2){
							$("#role").html('<option value="3" selected="selected">管理员</option><option value="1">成员</option');
						}else{
							$("#role").html('<option value="3" selected="selected">管理员</option>');	
						}						
					}else if(memberInfo.isleader==2){
						$("#role").html('<option value="2" selected="selected">组长</option>');
					}else{
						$("#role").html('<option value="3">管理员</option><option value="1" selected="selected">成员</option');
					}
					if(memberInfo.instatus==4){
						$(".btnDiv1").append("<button style='margin-left:25px;' class='nextBtn' id='againRequest'>再次邀请</button>");
						$("#instatus").html('<option value="1">离组</option><option value="4" selected="selected">邀请中</option>')
						$("#againRequest").click(function(){
							againRequest(memberInfo.mobile)	
						})
					}else if(memberInfo.instatus==2){												
						$("#instatus").html('<option value="1">离组</option><option value="2" selected="selected">在组</option>')
					}else if(memberInfo.instatus==1){
						$(".btnDiv1").append("<button style='margin-left:25px;' class='nextBtn' id='againRequest'>再次邀请</button>");
						$("#instatus").html('<option value="1" selected="selected">离组</option><option value="4" >邀请中</option>')
						$("#againRequest").click(function(){
							againRequest(memberInfo.mobile)	
						})
					}else if(memberInfo.instatus==3){
						$(".btnDiv1").append("<button style='margin-left:25px;' class='nextBtn' id='againRequest'>再次邀请</button>");
						$("#instatus").html('<option value="3" selected="selected">拒绝邀请</option><option value="4">邀请中</option>')
						$("#againRequest").click(function(){
							againRequest(memberInfo.mobile)	
						})						
					}
					
					if(userId==memberInfo.userid){
						$("#role").attr("disabled",true);
						$("#isviewscreenplay").attr("disabled",true);
						$("#jobnames").attr("disabled",true);					
					}	
				}
								
				$(".meng,.addMember").css({
					'display' : 'block'
				})
			} else {
				alertMsg(data.msg);
			}

		},
		error : function() {
		}
	};

	ajaxPost(options);
}
function againRequest(mobile){
	
	// 取模板字段列表
	var options = {
		url : '/api/proxy',
		dataType : 'json',
		type:"POST",
		beforeSend : function(request) {
			request.setRequestHeader("staffId", staffId);
		},
		data : {
			targetUrl : "/organization/againinvitation",
			staffid : staffId,
			mobile:mobile,
		},
		success:function(data){
			if(data.code==0){
				alertMsg("邀请已发出");
			}else{
				alertMsg("发送再次邀请失败");
			}
		},
		error:function(){
			alertMsg("发送再次邀请失败");
		}
	}
	ajaxPost(options);
}
// 保存人员信息
function saveMemberInfo() {
	var data = {
		targetUrl : '/staff/addmember',
		staffid : staffId,
	};
	if ($("#mobile").attr("readonly") != undefined) {
		data.targetUrl = '/organization/editmemberinfo';
		data.sync = 3;
	}

	var extra = [];

	$("table input").each(function(index) {
		if (!$(this).is(":visible")) {
			return;
		}

		var varName = $(this).attr("id");
		var value = $(this).val();
		if (varName == undefined) {
			varName = $(this).attr("varName");
			if (varName == undefined) {
				return;
			}

			var entry = {};
			entry.key = varName;
			entry.value = value;
			extra.push(entry);
		} else {
			eval("data." + varName + " = value");
		}
	});
	$("table select").each(function(index) {
		if (!$(this).is(":visible")) {
			return;
		}

		var varName = $(this).attr("id");
		if (varName == undefined) {
			return;
		}
		var value = $(this).val();
		eval("data." + varName + " = value");
	});

	data.extra = "";
	for (var i = 0; i < extra.length; i++) {
		data.extra += extra[i].key + ":" + extra[i].value;
		if (i < extra.length - 1) {
			data.extra += ";";
		}
	}

	delete data.onames;

	var options = {
		url : '/api/proxy',
		dataType : 'json',
		type : 'POST',
		data : data,
		success : function(data) {
			if (data.code == 0) {
				location.href = "/web/member_list?staffId=" + staffId;
				$(".meng,.addMember").css({
					'display' : 'none'
				})
			} else {
				alertMsg(data.msg);
			}
		},
		error : function() {
			alertMsg('网络发生故障，添加通讯录成员发生错误！');
		}
	}

	ajaxPost(options);
}
// 允许通过点击职务名称来切换职务的选中状态
function enableSelectJobName() {
	$("#jobNameSelect .jobSection div").each(function(index) {
		var $self = $(this);
		$self.click(function() {
			var bool = $self.hasClass('off');
			if (bool) {
				$self.removeClass('off');
				$self.addClass('on');
			} else {
				$self.removeClass('on');
				$self.addClass('off');
			}
		});
	})
}

// 查询指定用户的信息
function getMemberInfo(mobile) {
	var memberInfo = null;
	var options = {
		url : '/api/proxy',
		dataType : 'json',
		async : false,
		beforeSend : function(request) {
			request.setRequestHeader("staffId", staffId);
		},
		data : {
			targetUrl : "/organization/memberinfo",
			staffid : staffId,
			mobile : mobile,
		},
		success : function(data) {
			if (data.code == 0) {
				memberInfo = data.data;
				//console.log("load memberinfo:" + mobile);
				//console.log(memberInfo);
			}

		},
		error : function() {
		}
	};

	ajaxPost(options);

	return memberInfo;
}

// 允许通过点击关闭按钮来删除职务
function enableDeleteJobName() {
	$("#jobNameSelect .jobSection .jobItem .memItem_close").each(function() {
		var $self = $(this);
		$self.click(function() {
			var resgin = $self.siblings("h5").html();
			var options = {
				url : '/api/proxy',
				dataType : 'json',
				type : 'POST',
				data : {
					targetUrl : '/organization/deleteresign',
					staffid : staffId,
					resign : resgin,
				},
				success : function(data) {
					loadResignList();
				}
			}

			ajaxPost(options);
		})
	})
}

function getDefaultResignList() {
	var jobnamesArr = $("#jobnames").val().split(',');
	
	// 获取默认职务列表
	var options = {
		url : '/api/proxy',
		dataType : 'json',
		type : 'POST',
		async : false,
		data : {
			targetUrl : '/organization/defaultresignlist',
		},
		success : function(data) {
			if (data.code == 0) {
				var item = data.data.list;

				var node1 = '';
				for (var i = 0; i < item.length; i++) {
					var keyPoint = $.inArray(item[i],jobnamesArr);
					if(keyPoint==-1){
						node1 += "<div class='jobItem off'>" + "<h5>" + item[i]
							+ "</h5></div>"	
					}else{
						node1 += "<div class='jobItem on'>" + "<h5>" + item[i]
							+ "</h5></div>"
					}
					
				}
				$("#jobNameSelect .jobSection").html('');
				$("#jobNameSelect .jobSection").html(node1);
			} else {
				alertMsg(data.msg);
			}
		}
	}

	ajaxPost(options);
}

// 获取自定义职务列表
function getResignList() {
	var jobnamesArr = $("#jobnames").val().split(',');
	var options = {
		url : '/api/proxy',
		dataType : 'json',
		type : 'POST',
		async : false,
		data : {
			targetUrl : '/organization/getresignlist',
			staffid : staffId,
		},
		success : function(data) {
			if (data.code == 0) {
				var node = '';
				var item1 = data.data.list;
				if (item1) {
					for (var i = 0; i < item1.length; i++) {
						var keyPoint = $.inArray(item1[i],jobnamesArr);
						if(keyPoint==-1){
								node += "<div class='jobItem off'>" + "<h5>" + item1[i]
								+ "</h5><i class='memItem_close'></i></div>"
						}else{
							node += "<div class='jobItem on'>" + "<h5>" + item1[i]
								+ "</h5><i class='memItem_close'></i></div>"
						}
						
					}
					$("#jobNameSelect .jobSection").append(node);
				}
			} else {
				alertMsg(data.msg);
			}
		}
	}

	ajaxPost(options);
}

function loadResignList() {
	getDefaultResignList();
	getResignList();
	enableSelectJobName();
	enableDeleteJobName();
}
