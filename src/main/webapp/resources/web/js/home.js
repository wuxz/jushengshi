$(document).ready(function(){
	var options = {
		type:'POST',
		url : '/api/proxy',
		dataType:'json',
		data:{
			targetUrl:'/staff/mylist'
		},
		success:function(data){
			if(data.code==0){
				var staffArr = data.data.list;
				for(var i=0;i<staffArr.length;i++){
					var staffName = staffArr[i].staffname;
					if(staffArr[i].status==10||staffArr[i].status==5){
						createTvList(staffName, staffArr[i].staffid);
					}else if(staffArr[i].status==15){
						createArchiveItem(staffName, staffArr[i].staffid);
					}
				}
			} else {
				alertMsg(data.msg);
			}
		},
		error:function(data){
			alertMsg(data.msg);
		}
	};
	ajaxPost(options);
	
	function createTvList (staffName, staffId){
		var node = '<div class = "listBox"><div class="tvList">'
		+'<h2 class="tvTitle staffTitle">'+staffName+'</h2><img class="arrowR" src="/resources/web/images/arrowRight.png"><a href="/web/staff_home?staffId=' + staffId + '" class="itemLink"></a></div></div>';
		$('.myStaffList').prepend(node);
	}
	function createArchiveItem(staffName, staffId){
		var node = '<div class = "listBox"><div class="archiveItem">'
					+'<h2 class="archiveStaffTitle staffTitle">'
					+staffName+'</h2><img class="arrowR" src="/resources/web/images/arrowR2.png"><a href="javascript:;"  id="' + staffId + '" class="itemLink"></a></div></div>';
		$('.archiveList').prepend(node);
		$('#'+staffId).click(function(){
			$staffID = $(this).attr('id');
			var options = {
				type : 'POST',
				url : '/api/proxy',
				dataType : 'json',
				data : {
					targetUrl : '/staff/detail',
					staffid : $staffID
				},
				success : function(data) {
					console.log(data)
					if (data.code == 0) {
						if (data.data.status == 15) {
							console
									.log(data.data.status)
							createStaffInfoDiv($staffID);
							$('.stafName')
									.html(
											data.data.staffname);
							$('.stafCompany')
									.html(
											data.data.staff_make);
							$('.stafType')
									.html(
											data.data.staff_type_name);
							$('.stafOpenTime')
									.html(
											data.data.opentime);
							$('.stafEditType')
									.html(
											data.data.screenplay_type_name);
						} else if (data.data.status == 5
								|| data.data.status == 10) {
							creatStaffInfoEdit();
							$('.stafName')
									.val(
											data.data.staffname);
							$('.stafCompany')
									.val(
											data.data.staff_make);
							$(
									'.stafType option[value ='
											+ data.data.staff_type
											+ ']')
									.attr(
											"selected",
											true);
							$('.stafOpenTime')
									.val(
											data.data.opentime);
							$('.stafEditType')
									.val(
											data.data.screenplay_type_name);
						}

					} else {
						alertMsg(data.msg);
					}
				},
				error : function(data) {
					alertMsg('获取失败');
				}
			}
			ajaxPost(options);
		});
	}


	$('#crateStaffBtn').click(function(){
		var $staffname = $('#staffNameVal').val();
		var $staff_make = $('#staff_makeVal').val();
		var $staff_type = $('#staff_typeVal').val();
		var $openTime = $('#openTime').val();
		var $screenplay_type = $('#screenplay_typeVal').val();
		var $realname = $('#realnameVal').val();
		var $mobilestatus = $('#mobilestatusVal').val();
		var $gender = $('#selectSex input:checked').val();
		var $jobname = $('#jobnameVal').val();
		var options = {
			type:'POST',
			url:'/api/proxy',
			dataType:'json',
			data:{
				targetUrl:'/staff/create',
				staffname:$staffname,
				staff_make:$staff_type,
				staff_type:$staff_type,
				opentime:$openTime + ' 00:00:00',
				screenplay_type:$screenplay_type,
				realname:$realname,
				mobilestatus:$mobilestatus,
				gender:$gender,
				jobname:$jobname,		
			},
			success:function(data){
				if(data.code==0){
					window.location.reload();
				}else{
					alertMsg(data.msg);
				}
			},
			error:function(data){
				alertMsg(data.msg)
			}
		}
		$('.notNull').each(function(){
			if(!MyTrim($(this).val())){
				$(this).css('border','1px solid #f00');
			}else{
				$(this).css('border','1px solid #999');		
			}
		});
		var val=MyTrim($realname)&&MyTrim($jobname)&&MyTrim($mobilestatus);
		if(val){
			ajaxPost(options);
		}	
	});
	function clearCreatForm (){
		$('.creatStaffBox').find('input[type!="radio"]').val('');
		$('.creatStaffBox').find('select').val('');
		$('.creatStaffBox').hide();
		$('.createStaffInfo').show();
		$('.createUserInfo').hide();
	}
	$(".createStaff").click(function(){
		$('.creatStaffBox').show();
	})
	$(".homeClose").click(function(){
		clearCreatForm();
	});
	$('#createStaffBtn').click(function(){
		$self=$(this);
		$('.noNull').each(function(){
			if(!MyTrim($(this).val())){
				$(this).css('border','1px solid #f00');
			}else{
				$(this).css('border','1px solid #999');		
			}
		});
		var val=MyTrim($('#staffNameVal').val())&&MyTrim($('#staff_makeVal').val())&&MyTrim($('#staff_typeVal').val())&&MyTrim($('#openTime').val())&&MyTrim($('#screenplay_typeVal').val());
		if(val){
			$self.parent('.createStaffInfo').hide();
			$('.createUserInfo').show();
		}
	});
	$('#prevBtn').click(function(){
		$(this).parents('.createUserInfo').hide();
		$('.createStaffInfo').show();
	});
	$(".radio label").click(function(){
		var maleChecked = document.getElementById("male").checked;
		var femaleChecked = document.getElementById("female").checked;
		if(maleChecked){
			$(".maleLabel .radioIcon").css("background","#25bfc1");
			$(".femaleLabel .radioIcon").css({"background":"#fff","border-radius":"50%","border":"1px solid #cfcfcf"});
			$(".maleLabel").css("border","1px solid #25bfc1");
			$(".femaleLabel").css("border","1px solid #cfcfcf");
		}else if(femaleChecked){
			$(".maleLabel .radioIcon").css({"background":"#fff","border-radius":"50%","border":"1px solid #cfcfcf"});
			$(".femaleLabel .radioIcon").css("background","#25bfc1");
			$(".maleLabel").css("border","1px solid #cfcfcf");
			$(".femaleLabel").css("border","1px solid #25bfc1");
		}	
	});
	laydate({
		elem:'#openTime'
	});//data控件
	$('.createStaff').hover(function(){
		$(this).children('img').attr('src','/resources/web/images/add.png');
	},function(){
		$(this).children('img').attr('src','/resources/web/images/createStaff.png');
	});
	function MyTrim(str) {
		if (str != "") {
			return str.replace(/(^\s*)|(\s*$)/g, "");
		} else {
			return ""
		}
	}
	function createStaffInfoDiv(id) {
		var node = '<div class="meng" style="display: block;"><div class="staffInfoDiv" style="background: #fff;width: 660px;position: absolute;left: 50%;top: 50%;transform:translate(-50%,-50%);max-height: 600px;padding-bottom:50px;"><h3>剧组信息</h3><img src="/resources/web/images/homeclose.png" alt="" class="close"><div class="contDiv" style="padding:0 70px;"><div class="stInL clearfix" ><span>剧名</span><div class="bLine stafName"></div></div><div class="stInL clearfix"><span>制作方</span><div class="bLine stafCompany"></div></div><div class="stInL clearfix"><span>项目类型</span><div class="bLine stafType"></div></div><div class="stInL clearfix"><span>开机时间</span><div class="bLine stafOpenTime"></div></div><div class="stInL clearfix"><span>剧本场次编辑</span><div class="bLine stafEditType"></div></div><img src="/resources/web/images/finished.png" alt="" class="finished"></div><div class="btnPar"><button id="delSta">删除</button><button id="recoverSta">恢复</button></div></div></div>';
		$('body').append(node);
		$('.close').click(function() {
			$(this).parents('.meng').remove();
		});
		$('.close').hover(function() {$(this).attr('src','/resources/web/images/closeHover.png');},
			function() {$(this)	.attr('src','/resources/web/images/homeclose.png');
		});
		$('#delSta').click(function() {
			var options = {
				type : 'POST',
				url : '/api/proxy',
				dataType : 'json',
				data : {
					targetUrl : '/staff/handlestatus',
					staffid : id,
					key : 'delete'
				},
				success : function(data) {
					if (data.code == 0) {
						console.log(data);
						alertMsg('删除成功！');
						window.location.href = "home";
					} else {
						alertMsg(data.msg);
					}
				},
				error : function(data) {
					alertMsg('获取失败');
				}
			}
			var res = confirm('确定要删除剧组吗？');
			if (res) {
				ajaxPost(options);
			}
		});
		$('#recoverSta').click(function() {
			var $self = $(this);
			var options = {
				type : 'POST',
				url : '/api/proxy',
				dataType : 'json',
				data : {
					targetUrl : '/staff/handlestatus',
					staffid : id,
					key : 'recovery'
				},
				success : function(data) {
					if (data.code == 0) {
						console.log(data);
						alertMsg('恢复成功！');
						window.location.href = "home";
					} else {
						alertMsg(data.msg);
					}
				},
				error : function(data) {
					alertMsg('获取失败');
				}
			}
			var res = confirm('确定要恢复剧组吗？');
			if (res) {
				ajaxPost(options);
			}
		});
	}
					
	function creatStaffInfoEdit() {
		var node = '<div class="meng" style="display: block;"><div class="staffInfoDiv" style="background: #fff;width: 660px;position: absolute;left: 50%;top: 50%;transform:translate(-50%,-50%);max-height: 600px;padding-bottom:50px;"><h3>剧组信息</h3><img src="/resources/web/images/homeclose.png" alt="" class="close"><div class="contDiv" style="padding:0 70px;"><div class="stInL clearfix" ><span>剧名</span><input class="bLine stafName"></div><div class="stInL clearfix"><span>制作方</span><input class="bLine stafCompany"></div><div class="stInL clearfix"><span>项目类型</span><select class="bLine stafType"><option value="1">电影</option><option value="2">电视剧</option><option value="3">网剧</option><option value="4">舞台剧</option><option value="5">综艺</option><option value="6">广告</option><option value="7">其他</option></select></div><div class="stInL clearfix"><span>开机时间</span><input id="stafOpenTime" class="bLine stafOpenTime"></div><div class="stInL clearfix"><span>剧本场次编辑</span><input class="bLine stafEditType" readonly="readonly" ></div></div><div class="btnPar"><button id="stafSave">保存</button></div></div></div>';
		$('body').append(node);
		$('.close').click(function() {
			$(this).parents('.meng').remove();
		});
		$('.close').hover(function() {$(this).attr('src','/resources/web/images/closeHover.png');},
			function() {$(this)	.attr('src','/resources/web/images/homeclose.png');
		});
		$('.stafEditType').click(function() {
			alertMsg('剧本场次编号不能修改');
		});
		laydate({
			elem : '#stafOpenTime'
		});
		$('#stafSave').click(function() {
			var stName = $('.stafName').val();
			var staff_make = $('.stafCompany').val();
			var staff_type = $('.stafType').val();
			var opentime = $('.stafOpenTime').val();
			var $self = $(this);
			var options = {
				type : 'POST',
				url : '/api/proxy',
				dataType : 'json',
				data : {
					targetUrl : '/staff/edit',
					staffid : staffId,
					staffname : stName,
					staff_make : staff_make,
					staff_type : staff_type,
					opentime : opentime,
				},
				success : function(data) {
					if (data.code == 0) {
						alertMsg('已成功保存更改信息');
						window.location.href = "home";
					} else {
						alertMsg(data.msg);
					}
				},
				error : function(data) {
					alertMsg('获取失败');
				}
			}
			var res = confirm('确定要变更剧组信息吗？');
			if (res) {
				ajaxPost(options);
			}
		});
	}

})