function staff_archive(staffId, key) {
	if (staffId == "undefined" || staffId == undefined) {
		alertMsg("请选择剧组");

		return;
	}

	var text = (key == "archive" ? "归档" : "删除");

	if (confirm("你确定要" + text + "本剧组吗？")) {
		var options = {
			type : 'POST',
			url : '/api/proxy',
			dataType : 'json',
			beforeSend : function(request) {
				request.setRequestHeader("staffId", staffId);
			},
			data : {
				targetUrl : '/staff/handlestatus',
				staffid : staffId,
				key : key,
			},
			success : function(data) {
				if (data.code == 0) {
					window.location.href = "home";
				} else {
					alertMsg(data.msg);
				}
			},
			error : function(data) {
				alertMsg(data.msg);
			}
		};

		ajaxPost(options);
	}
}

// ----------------------------设置btn-------------------------------------------
$(document)
		.ready(
				function() {
					url = window.location.href;
					$(".setting").hide();
					$(".title").hide();
					if (url.indexOf("?staffId=") >= 0) {
						$(".setting").show();
						$(".title").show();
					}
					$(".exit").click(function() {
						if (confirm("确定要退出吗？")) {
							window.location.href = "login";
						}
					});
					$(".feedback").click(function() {
						$(".feedbackForm").show();
					});

					$('.setting').click(function() {
						$('.settingList').slideToggle();
					});
					$('.settingList li').hover(
							function() {
								$(this).addClass('active').siblings()
										.removeClass('active');
							});
					$('.settingList').mouseleave(function() {
						$(this).slideUp();
					});

					$(document)
							.ready(
									function() {
										$(".feedbackSubmitBtn")
												.click(
														function() {
															var options = {
																type : 'POST',
																url : '/api/feedback',
																dataType : 'json',
																beforeSend : function(
																		request) {
																	request
																			.setRequestHeader(
																					"userId",
																					'${userId}');
																	request
																			.setRequestHeader(
																					"userToken",
																					'${userToken}');
																	request
																			.setRequestHeader(
																					"deviceAgent",
																					'${deviceAgent}');
																	request
																			.setRequestHeader(
																					"deviceType",
																					'${deviceType}');
																	request
																			.setRequestHeader(
																					"deviceVersion",
																					'${deviceVersion}');
																	request
																			.setRequestHeader(
																					"deviceId",
																					'${deviceId}');
																	request
																			.setRequestHeader(
																					"appchannel",
																					'${appchannel}');
																	request
																			.setRequestHeader(
																					"appversion",
																					'${appversion}');
																},
																data : {
																	content : $(
																			"#content")
																			.val(),
																},
																success : function(
																		data) {
																	if (data.code == 0) {
																		alertMsg("提交成功。感谢您的宝贵意见");
																	} else {
																		alertMsg(data.msg);
																	}

																	$(
																			".feedbackForm")
																			.hide();
																},
																error : function(
																		data) {
																	alertMsg(data.msg);
																	$(
																			".feedbackForm")
																			.hide();
																}
															};

															ajaxPost(options);
														});
									})

					// ------------------------------剧组信息---------------------------------------
					$('#stafInfoBtn')
							.click(
									function() {
										var options = {
											type : 'POST',
											url : '/api/proxy',
											dataType : 'json',
											data : {
												targetUrl : '/staff/detail',
												staffid : staffId
											},
											success : function(data) {
												console.log(data)
												if (data.code == 0) {
													if (data.data.status == 15) {
														console
																.log(data.data.status)
														createStaffInfoDiv();
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
					function createStaffInfoDiv() {
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
									staffid : staffId,
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
									staffid : staffId,
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
					;
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

				});