$(document)
		.ready(
				function() {
					// url获取参数
					GetUrlParms();
					function GetUrlParms() {
						var args = new Object();
						var query = location.search.substring(1);
						var pairs = query.split("&");
						for (var i = 0; i < pairs.length; i++) {
							var pos = pairs[i].indexOf('=');
							if (pos == -1)
								continue;
							var argname = pairs[i].substring(0, pos);
							var value = pairs[i].substring(pos + 1);
							args[argname] = unescape(value);
						}
						var keyword = decodeURIComponent(args.keyword)
						
						successSearch(keyword);
					}
					$("#searchContent").keyup(function(event) {
						if (event.keyCode == 13) {
							searchMember();
						}
					});

					$("#searchButton").click(function() {
						searchMember();
					})

					// 搜索结果处理
					function successSearch(keyword) {
						$(".keywords").html(keyword);
						
						// 关键词搜索
						var options = {
							url : '/api/search_staff_member',
							dataType : 'json',
							type : 'POST',
							data : {
								staffId : staffId,
								keyword : keyword,
								inStatus : -2,
								privilege : -2,
								canViewScreenplay : -2
							},
							success : function(data) {
								if (data.code == 0) {
									var itemArr = data.data.list;
									var node = '';
									var genderArr = [ '', '男', '女', '未知' ];
									var moblieStatus = [ '', '保密', '显示' ];
									var isViewScreenpty = [ '', '否', '是' ];
									var number = 0;
									if (itemArr.length > 0) {
										for (i = 0; i < itemArr.length; i++) {
											number++;
											var showStatus = '';
											if (itemArr[i].InStatus == 1) {
												showStatus = '离组';
											} else if (itemArr[i].InStatus == 2) {
												showStatus = '在组';
											} else if (itemArr[i].InStatus == 3) {
												showStatus = '拒绝邀请';
											} else if (itemArr[i].InStatus == 4) {
												showStatus = '邀请中';
											}

											var role;
											if (itemArr[i].isCreate == 2) {												
												role = "创建者";
											}else if (itemArr[i].isAdmin == 2) {
												role = "管理员";
											} else if (itemArr[i].isLeader == 2) {
												role = "部门长";
											} else {
												role = "成员";
											}
											node += "<tr class='tblRows'>"
													+ "<td class='index'>"
													+ number
													+ "</td>"
													+ "<td class='hotelTableTime'>"
													+ itemArr[i].realName
													+ "</td>"
													+ "<td>"
													+ genderArr[itemArr[i].gender]
													+ "</td>"
													+ "<td>"
													+ itemArr[i].mobile
													+ "</td>"
													+ "<td>"
													+ moblieStatus[itemArr[i].mobileStatus]
													+ "</td>"
													+ "<td>"
													+ itemArr[i].jobs
													+ "</td>"
													+ "<td>"
													+ itemArr[i].idNumber
													+ "</td>"
													+ "<td>"
													+ role
													+ "</td>"
													+ "<td>"
													+ showStatus
													+ "</td>"
													+ "<td>"
													+ isViewScreenpty[itemArr[i].canViewScreenplay]
													+ "</td>"
													+ "<td>"
													+ "<span class='editMem' id='"
													+ itemArr[i].mobile
													+ "'>编辑</span> |"
													+ "<span class='deleteMember' id='del_ "
													+ itemArr[i].mobile
													+ "'>删除</span>"
													+ "</td>"
													+ "</tr>"
										}
									}
									$(".showMemberList").html(node);
									$("#searchContent").val(keyword);
									$(".editMem").click(function(index) {
										initMemberInfoForm($(this).attr("id"));
									});
									$(".deleteMember").click(function(index) {
										if (confirm("是否删除该成员")) {
											deleteMember($(this).attr("id"));
										}
									});
								} else {
									alertMsg(data.msg);
								}
							},
							error : function() {
								alertMsg("网络出错，请稍候重试");
							}
						}
						ajaxPost(options);
					}

					// 删除剧组成员
					function deleteMember(deleteId) {
						var deleteArr = deleteId.split("_")
						var mobile = deleteArr[1];
						var deleteMember = {
							url : '/api/proxy',
							dataType : 'json',
							async : false,
							type : 'POST',
							data : {
								targetUrl : '/staff/removemember',
								staffId : staffId,
								mobile : mobile,
							},
							success : function(data) {
								if (data.code == 0) {
									window.location.reload();
								} else {
									alertMsg(data.msg);
								}
							},
							error : function() {
								alertMsg("网络出错,删除失败");
							}
						}
						ajaxPost(deleteMember);
					}

					function searchMember() {
						var keyword = $("#searchContent").val();
						successSearch(keyword);
					}
					$("#closeAddMember").click(function(){
						$(".meng,.addMember").css({'display':'none'})
					})
					
					
					
				})
