$(document)
		.ready(
				function() {
					var shoot_notice_id;

					var mustParameter = [ 'title_id', 'shoot_city_id',
							'shoot_number_id', 'page_count_id',
							'shoot_place_id', 'shoot_day_id', 'weather_id',
							'sunrise_id', 'sunset_id' ];
					var mustMark = [ 'true', 'true', 'true', 'true', 'true',
							'true', 'true', 'true', 'true' ]
					var existsArr = [ 'job', 'roler', 'otherroler', 'food',
							'setOut', 'tools' ];
					var existOtherBlockMarkInfo = [ 'job', 'roler',
							'otherroler', 'food', 'setOut', 'tools' ];
					var city_arr = [];

					var validator = validform("#fm1");
					var validator2 = validform("#fm2");

					// 接受参数
					var args = GetUrlParms();
					function GetUrlParms() {
						var args = new Object();
						var query = location.search.substring(1);// 获取查询串
						var pairs = query.split("&");// 在逗号处断开
						for (var i = 0; i < pairs.length; i++) {
							var pos = pairs[i].indexOf('=');// 查找name=value
							if (pos == -1)
								continue;// 如果没有找到就跳过
							var argname = pairs[i].substring(0, pos);// 提取name
							var value = pairs[i].substring(pos + 1);// 提取value
							args[argname] = unescape(value);// 存为属性
						}
						return args;
					}

					var editShoot_notice_id = '';
					if (typeof (args.shoot_notice_id) != 'undefined') {
						editShoot_notice_id = args.shoot_notice_id;
						$("#TGTip").html("编辑通告");
					}
					function checkBaseInfo() {
						for (i = 0; i < mustParameter.length; i++) {
							var para = $("#" + mustParameter[i]).val();
							if (para.length == 0) {
								mustMark[i] = false;
								$("#" + mustParameter[i]).addClass(
										"bordercolor");
							} else {
								mustMark[i] = true;
								$("#" + mustParameter[i]).removeClass(
										"bordercolor");
							}
						}
						/*
						 * var round_datas = collectRoundsData(round_prefix,
						 * round_parentSelector);//取出所有场次信息 for(j=0;j<round_datas.length;j++){
						 * console.log(round_datas[j]); }
						 */
						
						 
						 
					}

					config.callBack = shoot_back_func;
					function shoot_back_func(arr) {
						if (arr.length > 0) {
							var str = "";
							str += "[";
							for (i = 0; i < arr.length; i++) {
								str += '{"userid":"'
										+ arr[i].userid
										+ '","name":"'
										+ arr[i].userName
										+ '","mobile":"'
										+ arr[i].userMob
										+ '"},'
							}
							var newstr = str
									.substring(
											0,
											str.length - 1);
							newstr += "]";							
							if (editShoot_notice_id.length>0){								
								breakOutAudit(editShoot_notice_id,newstr);
							}else{
								breakOutAudit(shoot_notice_id,newstr);
							}
						} else {
							// 发布通告
							if (editShoot_notice_id.length>0){

								baseInfo(editShoot_notice_id,20);
							}else{
								baseInfo(shoot_notice_id,20);
							}
						}
						location.href = "/web/shoot_notice?staffId="+ staffId
					}


					$(".publishShootNotice")
							.click(
									function() {
										checkBaseInfo()
										 if (!validator.form()){
											alertMsg('场次表，请填写必填参数');
											return false;
										}
										if (!validator2.form()) {
											alertMsg('来日计划，请填写必填参数');
											return false;
										}
										if (mustMark[0] && mustMark[1]
												&& mustMark[2] && mustMark[3]
												&& mustMark[4] && mustMark[5]
												&& mustMark[6] && mustMark[7]
												&& mustMark[8]) {
											if (editShoot_notice_id.length > 0) {
												// 编辑通告基本信息
												baseInfo(editShoot_notice_id, 5);
												// 编辑场次信息
												roundInfo();
												// 其他模块编辑
												editOtherBlockInfo();
												// 来日计划编辑
												tomorrowPlane();
												config.isShowDepartment = false;// 是否显示部门列表
												config.initMebList();// 初始化函数
												

											} else {

												// 添加通告基本信息
												shoot_notice_id = baseInfo('',
														5);
												// 添加通告场次信息
												if (shoot_notice_id.length > 0) {
													roundInfo();
													addAllOtherBlock();
													tomorrowPlane();
												}
												config.isShowDepartment = false;// 是否显示部门列表
											
												config.initMebList();// 初始化函数
												
											}
										}

									})

					$(".shootNoticeSave")
							.click(function() {
										checkBaseInfo();
										if (!validator.form()){
											alertMsg('场次表，请填写必填参数');
											return false;
										}
										if (!validator2.form()) {
											alertMsg('来日计划，请填写必填参数');
											return false;
										}
										if (mustMark[0] && mustMark[1]
												&& mustMark[2] && mustMark[3]
												&& mustMark[4] && mustMark[5]
												&& mustMark[6] && mustMark[7]
												&& mustMark[8]) {
											if (editShoot_notice_id.length > 0) {
												// 编辑通告基本信息
												baseInfo(editShoot_notice_id, 5);
												roundInfo();
												editOtherBlockInfo();
												tomorrowPlane();
											} else {
												// 添加通告基本信息
												shoot_notice_id = baseInfo('',
														5);
												// 添加通告场次信息
												if (shoot_notice_id.length > 0) {
													roundInfo();
													addAllOtherBlock();
													tomorrowPlane();
												}
											}
											location.href = "/web/shoot_notice?staffId="+ staffId
										}
									})

					function breakOutAudit(shoot_notice_id, audit) {
						var breakAudit = {
							url : '/api/proxy',
							dataType : 'json',
							type : 'POST',
							beforeSend : function(request) {
								request.setRequestHeader("staffid", staffId);
							},
							async : false,
							data : {
								targetUrl : '/audit/add',
								staffid : staffId,
								audit : audit,
								sourceid : shoot_notice_id,
								type : 1
							},
							success : function(data) {
								
								if (data.code == 0) {
									//console.log("审批提交成功");
								} else {
									alertMsg(data.msg)
								}

							},
							error : function() {
								alertMsg("提交审批时遇到问题");
							}
						}
						ajaxPost(breakAudit);
					}

					// 初始化编辑信息
					if (editShoot_notice_id.length > 0) {

						function getTGInfo() {
							var getInfo = {
								url : '/api/proxy',
								dataType : 'json',
								type : 'POST',
								beforeSend : function(request) {
									request
											.setRequestHeader("staffid",
													staffId);
								},
								async : false,
								data : {
									targetUrl : '/shootnotice/detail',
									shoot_notice_id : editShoot_notice_id,
									userid : userId

								},
								success : function(data) {

									if (data.code == 0) {
										$("#title_id").val(data.data.title);
										$("#shoot_day_id").val(
												data.data.shoot_day);
										$("#shoot_city_id").val(
												data.data.shoot_city);
										$("#shoot_number_id").val(
												data.data.shoot_number);
										$("#page_count_id").val(
												data.data.page_count);
										$("#shoot_place_id").val(
												data.data.shoot_place);
										$("#weather_id").val(data.data.weather);
										$("#sunrise_id").val(data.data.sunrise);
										$("#sunset_id").val(data.data.sunset);
										if (data.data.status == 10
												|| data.data.status == 20) {
											$(".publishShootNotice").hide();
											$(".shootNoticeSave").hide();
										}
										// 拍摄场次初始化
										var allInfo = data.data.module;

										var othertBlock = [];
										for (i = 0; i < allInfo.length; i++) {
											if (allInfo[i].module_title == "拍摄场次") {
												var roundsInfo = [];
												var roundInfo = allInfo[i].data;
												for (round_id = 0; round_id < roundInfo.length; round_id++) {
													var roundItem = roundInfo[round_id]
													var roundSmallInfo = {
														"id" : roundItem.id,
														"mode" : roundItem.mode,
														"round" : roundItem.round,
														"scene" : roundItem.scene,
														"side" : roundItem.side,
														"day_night" : roundItem.day_night,
														"main_role" : roundItem.main_role,
														"actor" : roundItem.actor,
														"summary" : roundItem.summary,
														"remark" : roundItem.remark,
														"pagenum" : roundItem.page_count
													};
													roundsInfo
															.push(roundSmallInfo);
												}
												initFormWithData(roundsInfo,
														round_prefix,
														round_parentSelector,
														round_fields,false);

											} else if (allInfo[i].module_title == "工作人员时间安排") {
												var node = editOtherBlock(
														'job', allInfo[i].data,
														'工作人员时间安排');
												$("#addjob").before(node);
											} else if (allInfo[i].module_title == "主要演员时间安排") {
												var node = editOtherBlock(
														'roler',
														allInfo[i].data,
														'主要演员时间安排');
												$("#addroler").before(node);
											} else if (allInfo[i].module_title == "其他演员时间安排") {
												var node = editOtherBlock(
														'otherroler',
														allInfo[i].data,
														'其他演员时间安排');
												$("#addotherroler")
														.before(node);
											} else if (allInfo[i].module_title == "用餐时间安排") {
												var node = editOtherBlock(
														'food',
														allInfo[i].data, '用餐时间安排');
												$("#addfood").before(node);
											} else if (allInfo[i].module_title == "置景陈设，道具及特别效果") {
												var node = editOtherBlock(
														'setOut',
														allInfo[i].data,
														'置景陈设，道具及特别效果');
												$("#addsetOut").before(node);
											} else if (allInfo[i].module_title == "摄影器材，灯光器材及场务用品") {
												var node = editOtherBlock(
														'tools',
														allInfo[i].data,
														'摄影器材，灯光器材及场务用品');
												$("#addtools").before(node);
											} else if (allInfo[i].module_title == "来日计划") {
												var tRoundsInfo = [];
												var tRoundInfo = allInfo[i].data;
												for (t_round_id = 0; t_round_id < tRoundInfo.length; t_round_id++) {
													var roundItem = tRoundInfo[t_round_id];
													var roundSmallInfo = {
														"id" : roundItem.id,
														"mode" : roundItem.mode,
														"round" : roundItem.round,
														"scene" : roundItem.scene,
														"side" : roundItem.side,
														"day_night" : roundItem.day_night,
														"main_role" : roundItem.main_role,
														"actor" : roundItem.actor,
														"summary" : roundItem.summary,
														"remark" : roundItem.remark,
														"pagenum" : roundItem.page_count
													};
													tRoundsInfo
															.push(roundSmallInfo);
												}
												initFormWithData(tRoundsInfo,
														prefix, parentSelector,
														fields,false);
											} else {
												var str = {
													"module_title" : allInfo[i].module_title,
													"data" : allInfo[i].data
												}
												othertBlock.push(str);
											}
										}								
										var othertBlockNum = othertBlock.length+1;									
										$("#othertBlockNum").val(othertBlockNum);
										var node = '';
										for (t_id = 0; t_id < othertBlock.length; t_id++) {
											var newt_id = t_id + 1;
											existOtherBlockMarkInfo
													.push("other" + newt_id);
											var tItem = othertBlock[t_id].data;
											var len = tItem.length;
											var s_node = '';
											for (s_id = 0; s_id < tItem.length; s_id++) {
												var new_s_id = s_id + 1;
												var dele_s = '';
												if(new_s_id>1){
													dele_s = "<button class='btn-opa del-tbl_1' id='deleteother"+newt_id+"Block"+new_s_id+ "'>删除该表</button>"
												}
												s_node += "<div class='shTabItem'>"
														+ "<div class='inRow'>"
														+ "<input type='text' id ='other"
														+ newt_id
														+ "_content_name_"
														+ new_s_id
														+ "' value='"
														+ tItem[s_id].content_name
														+ "' placeholder='内容标题' class='decEevent'>"
														+ "</div>"
														+ "<div class='text-in-div'>"
														+ "<textarea type='text' id ='other"
														+ newt_id
														+ "_content_value_"
														+ new_s_id
														+ "' value='"
														+ tItem[s_id].content_value
														+ "' placeholder='填写需要说明的内容' class='person-plan'>"
														+ tItem[s_id].content_value
														+ "</textarea>"
														+ "</div>"
														+ dele_s
														+ "<div class='waveLine'></div>"
														+ "</div>"

											}
											node += "<div class='shTab otherBlock other"
													+ newt_id
													+ "Block' >"
													+ "<h3>"
													+ othertBlock[t_id].module_title
													+ "</h3>"
													+ "<input type='hidden' class='otherBlock' id='other"
													+ newt_id
													+ "_module_title' value='"
													+ othertBlock[t_id].module_title
													+ "'/>"
													+ "<input type='hidden' id='other"
													+ newt_id
													+ "Len' value='"
													+ len
													+ "'>"
													+ s_node
													+ "<button class=' add-tbl addBlock' id='addother"
													+ newt_id
													+ "'>+添加新表</button>"
													+ "<button class=' del-sec reduceBlock existBlock' id='reduceother"
													+ newt_id
													+ "'>移除该板块</button>"
													+ "</div>"

										}
										$("#t_roundData_parent").before(node);
										delNewOtherBlock();
										addbindBlock();
										$(".del-tbl_1").each(function(){											
											var $self = $(this);
											$self.unbind('click');
											$self.click(function() {						
												$self.parent("div").remove();
											})
										})
									}
								},
								error : function() {
									//console.log("fail");
								}
							}
							ajaxPost(getInfo);
						}
						getTGInfo();
					}

					// 获取拍摄场次
					function getRoundInfo(type) {
						var itemRoundItem = [];
						var getRoundInfo = {
							url : '/api/proxy',
							dataType : 'json',
							type : 'POST',
							beforeSend : function(request) {
								request.setRequestHeader("staffid", staffId);
							},
							async : false,
							data : {
								targetUrl : '/shootnotice/viewRound',
								shoot_notice_id : editShoot_notice_id,
								type : type
							},
							success : function(data) {
								if (data.code == 0) {
									var itemArr = data.data;
									for (i = 0; i < itemArr.length; i++) {
										itemRoundItem.push(itemArr[i].id);
									}
									;
								}
							}
						}
						ajaxPost(getRoundInfo);
						return itemRoundItem;
					}

					function editOtherBlock(cursor, data, str) {

						var node = '';
						$("#" + cursor + "Len").val(data.length);
						for (id = 0; id < data.length; id++) {
							var new_id = id + 1;
							var dataItem = data[id];
							if (dataItem.module_title == str) {
								if(str=="用餐时间安排"){
									
									if (new_id <= 3) {
										$("#" + cursor + "_content_name_"+new_id).val(
												dataItem.content_name);
										$("#" + cursor + "_content_value_"+new_id).val(
												dataItem.content_value);
									}else {
										node += '<div class="shTabItem">'
												+ '<div class="inRow">'
												+ '<input type="text" id="'
												+ cursor
												+ '_content_name_'
												+ new_id
												+ '" value="'
												+ dataItem.content_name
												+ '"  placeholder="事件描述或人名" class="decEevent">'
												+ '</div>'
												+ '<div class="inRow">'
												+ '<input type="text" id="'
												+ cursor
												+ '_content_value_'
												+ new_id
												+ '" value="'
												+ dataItem.content_value
												+ '"  placeholder="填写时间及其他内容" class="person-plan">'
												+ '</div>'
												+ "<button class='btn-opa del-tbl_1' id='delete"
												+ cursor
												+ "Block"
												+ new_id
												+ "'>删除该表</button>"
												+ '<div class="waveLine"></div>'
												+ '</div>'
									}
									
									
									
								}else{
									if (new_id == 1) {
									$("#" + cursor + "_content_name_1").val(
											dataItem.content_name);
									$("#" + cursor + "_content_value_1").val(
											dataItem.content_value);
								} else {
									node += '<div class="shTabItem">'
											+ '<div class="inRow">'
											+ '<input type="text" id="'
											+ cursor
											+ '_content_name_'
											+ new_id
											+ '" value="'
											+ dataItem.content_name
											+ '"  placeholder="事件描述或人名" class="decEevent">'
											+ '</div>'
											+ '<div class="inRow">'
											+ '<input type="text" id="'
											+ cursor
											+ '_content_value_'
											+ new_id
											+ '" value="'
											+ dataItem.content_value
											+ '"  placeholder="填写时间及其他内容" class="person-plan">'
											+ '</div>'
											+ "<button class='btn-opa del-tbl_1' id='delete"
											+ cursor
											+ "Block"
											+ new_id
											+ "'>删除该表</button>"
											+ '<div class="waveLine"></div>'
											+ '</div>'
									}
								}
								
							} else {
								continue;
							}
						}
						return node;
					}

					// 添加通告的基本信息
					function baseInfo(editShoot_notice_id, status) {
						var title = $("#title_id").val();
						var shoot_day = $("#shoot_day_id").val();
						var shoot_city = $("#shoot_city_id").val();
						var shoot_number = $("#shoot_number_id").val();
						var page_count = $("#page_count_id").val();
						var shoot_place = $("#shoot_place_id").val();
						var weather = $("#weather_id").val();
						var sunrise = $("#sunrise_id").val();
						var sunset = $("#sunset_id").val();
						var notice_id = 0;
						if (editShoot_notice_id.length > 0) {
							var shootNotice = {
								url : '/api/proxy',
								dataType : 'json',
								type : 'POST',
								beforeSend : function(request) {
									request
											.setRequestHeader("staffid",
													staffId);
								},
								async : false,
								data : {
									targetUrl : '/shootnotice/editBaseInfo',
									staffid : staffId,
									shoot_notice_id : editShoot_notice_id,
									title : title,
									userid : userId,
									shoot_day : shoot_day,
									shoot_city : shoot_city,
									shoot_number : shoot_number,
									page_count : page_count,
									shoot_place : shoot_place,
									weather : weather,
									sunrise : sunrise,
									sunset : sunset,
									status : status,
								},
								success : function(data) {
									if (data.code == 0) {

									} else {
										alertMsg(data.msg);
									}
								},
								error : function() {
									//console.log("fail");
								}
							}
						} else {
							var shootNotice = {
								url : '/api/proxy',
								dataType : 'json',
								type : 'POST',
								beforeSend : function(request) {
									request
											.setRequestHeader("staffid",
													staffId);
								},
								async : false,
								data : {
									targetUrl : '/shootnotice/addBaseInfo',
									staffid : staffId,
									title : title,
									userid : userId,
									shoot_day : shoot_day,
									shoot_city : shoot_city,
									shoot_number : shoot_number,
									page_count : page_count,
									shoot_place : shoot_place,
									weather : weather,
									sunrise : sunrise,
									sunset : sunset,
									status : status,
								},
								success : function(data) {
									if (data.code == 0) {
										notice_id = data.data.shoot_notice_id;
									} else {
										alertMsg(data.msg);
									}
								},
								error : function() {
									//console.log("fail");
								}
							}

						}

						ajaxPost(shootNotice);
						return notice_id;

					}

					// 添加场次信息
					function roundInfo() {
						var datas = collectRoundsData(round_prefix,
								round_parentSelector);// 取出所有场次信息
						for (i = 0; i < datas.length; i++) {
							var newdata = datas[i];
							var num = i + 1;
							if (newdata.isDeleted == true) {
								deleteRoundInfo(newdata.id);
							} else {
								saveRoundInfoH(newdata, 1, num);
							}
						}
					}
					// 添加明日计划
					function tomorrowPlane() {
						var datas = collectRoundsData(prefix, parentSelector);// 取出所有场次信息
						for (i = 0; i < datas.length; i++) {
							var newdata = datas[i];
							var num = i + 1;
							if (newdata.isDeleted == true) {
								deleteRoundInfo(newdata.id);
							} else {
								saveRoundInfoH(newdata, 2, num);
							}

						}
					}
					// 删除场次，明日计划信息
					function deleteRoundInfo(shoot_notice_round_id) {
						
						var deleteRoundInfo = {
							url : '/api/proxy',
							dataType : 'json',
							type : 'POST',
							async : false,
							beforeSend : function(request) {
								request.setRequestHeader("staffid", staffId);
							},
							
							data : {
								targetUrl : '/shootnotice/deleteRound',
								shoot_notice_round_id : shoot_notice_round_id
							},
							success : function(data) {
								if (data.code == 0) {
									//console.log(shoot_notice_round_id + "删除成功");
								} else {
									//console.log(shoot_notice_round_id + "删除失败");
								}
							},
							error : function() {
								//console.log("网络出错");
							}
						}
						ajaxPost(deleteRoundInfo);
					}

					function saveRoundInfoH(newdata, type, num) {
						var isDeleted = newdata.isDeleted;
						delete newdata.isDeleted;
						if (typeof (args.shoot_notice_id) != 'undefined') {
							if (newdata.id != 0) {
								var saveRoundInfo = editRoundInfo(newdata,
										editShoot_notice_id, type, num);
							} else {
								var saveRoundInfo = addRoundInfo(newdata,
										editShoot_notice_id, type, num);
							}
						} else {
							var saveRoundInfo = addRoundInfo(newdata,
									shoot_notice_id, type, num);
						}
						ajaxPost(saveRoundInfo);
					}

					function editRoundInfo(newdata, editShoot_notice_id, type,
							num) {
						var targetUrl = '/shootnotice/editRound';
						var saveRoundInfo = {
							url : '/api/proxy',
							dataType : 'json',
							type : 'POST',
							async : false,
							beforeSend : function(request) {
								request.setRequestHeader("staffid", staffId);
							},
							
							data : {
								targetUrl : targetUrl,
								shoot_notice_id : editShoot_notice_id,
								shoot_notice_round_id : newdata.id,
								mode : newdata.mode,
								round : newdata.round,
								scene : newdata.scene,
								day_night : newdata.day_night,
								side : newdata.side,
								page_count : newdata.pagenum,
								main_role : newdata.main_role,
								actor : newdata.actor,
								summary : newdata.summary,
								remark : newdata.remark,
								type : type,
								sortlist : num
							},
							success : function(data) {
								if (data.code == 0) {
									//console.log('edit_round_success');
								} else {
									alertMsg(data.msg);
								}
							},
							error : function() {
								//console.log('edit_round_fail');
							}
						}
						return saveRoundInfo;
					}

					function addRoundInfo(newdata, shoot_notice_id, type, num) {
						var targetUrl = '/shootnotice/addRound';
						var saveRoundInfo = {
							url : '/api/proxy',
							dataType : 'json',
							type : 'POST',
							async : false,
							beforeSend : function(request) {
								request.setRequestHeader("staffid", staffId);
							},
							
							data : {
								targetUrl : targetUrl,
								shoot_notice_id : shoot_notice_id,
								mode : newdata.mode,
								round : newdata.round,
								scene : newdata.scene,
								day_night : newdata.day_night,
								side : newdata.side,
								page_count : newdata.pagenum,
								main_role : newdata.main_role,
								actor : newdata.actor,
								summary : newdata.summary,
								remark : newdata.remark,
								type : type,
								sortlist : num
							},
							success : function(data) {
								if (data.code == 0) {
									//console.log('add_round_success');
								} else {
									alertMsg(data.msg);
								}
							},
							error : function() {
								//console.log('add_round_fail');
							}
						}
						return saveRoundInfo;
					}

					// 添加时编辑他模块信息
					function addAllOtherBlock() {
						var markArr = getOtherBlockMarkInfo();
						for (i = 0; i < markArr.length; i++) {
							var mark = markArr[i];
							var point = $.inArray(mark, existsArr);
							if (point == -1) {
								addNewBlockAjax(mark,shoot_notice_id);// 创建新的版块
							}
							var newlen = parseInt($("#" + mark + "Len").val());
							var k = i + 1;
							var module_title = $("#" + mark + "_module_title")
									.val();

							var str = "[";

							for (j = 1; j <= newlen; j++) {
								if ($("#" + mark + "_content_name_" + j).length > 0) {
									//if ($("#" + mark + "_content_name_" + j).val().length > 0) {
										var content_name = $(
												"#" + mark + "_content_name_"
														+ j).val();
										var content_value = $(
												"#" + mark + "_content_value_"
														+ j).val();
										str += '{"content_name":"'
												+ content_name
												+ '","content_value":"'
												+ content_value
												+ '","module_title":"'
												+ module_title
												+ '","shoot_notice_id":"'
												+ shoot_notice_id
												+ '","module_order":"' + k
												+ '","content_order":"' + j
												+ '"},'
									/*} else {
										continue;
									}*/
								} else {
									continue;
								}
							}
							var len = str.length - 1;
							var newstr = str.substring(0, len);
							newstr += "]"
							if (newstr && newstr.length > 1) {
								var addOtherBlockContent = {
									url : '/api/proxy',
									dataType : 'json',
									type : 'POST',
									beforeSend : function(request) {
										request.setRequestHeader("staffid",
												staffId);
									},
									async : false,
									data : {
										"targetUrl" : '/shootnotice/editModule',
										"module_data" : newstr,
									},
									success : function(data) {
										if (data.code == 0) {
											//console.log("addOtherBlockSuccess")
										} else {
											alertMsg(data.msg)
										}
									},
									error : function() {
										//console.log("fail");
									}
								}
								ajaxPost(addOtherBlockContent);
							} else {
								continue;
							}
						}
					}
					function getOtherBlockMarkInfo() {
						var markArr = [];
						$(".shootnoticeCont .shTab .otherBlock").each(
								function() {
									var $self = $(this)
									var selfId = $self.attr("id");
									var joinArr = selfId.split("_");
									markArr.push(joinArr[0]);
								})
						return markArr;
					}

					// 编辑时编辑其他模块信息
					function editOtherBlockInfo() {
						var markArr = getOtherBlockMarkInfo();
						for (i = 0; i < markArr.length; i++) {
							var mark = markArr[i];
							
							var point = $.inArray(mark, existOtherBlockMarkInfo);
							if (point == -1) {
								addNewBlockAjax(mark,editShoot_notice_id);// 创建新的版块
							}
							var newlen = parseInt($("#" + mark + "Len").val());
							var k = i + 1;
							var module_title = $("#" + mark + "_module_title")
									.val();

							var str = "[";

							for (j = 1; j <= newlen; j++) {
								if ($("#" + mark + "_content_name_" + j).length > 0) {
									//if ($("#" + mark + "_content_name_" + j)
											//.val().length > 0) {
										var content_name = $(
												"#" + mark + "_content_name_"
														+ j).val();
										var content_value = $(
												"#" + mark + "_content_value_"
														+ j).val();
										str += '{"content_name":"'
												+ content_name
												+ '","content_value":"'
												+ content_value
												+ '","module_title":"'
												+ module_title
												+ '","shoot_notice_id":"'
												+ editShoot_notice_id
												+ '","module_order":"' + k
												+ '","content_order":"' + j
												+ '"},'
									//} else {
										//continue;
									//}
								} else {
									continue;
								}
							}
							var len = str.length - 1;
							var newstr = str.substring(0, len);
							newstr += "]"
							if (newstr && newstr.length > 1) {
								var editOtherBlockContent = {
									url : '/api/proxy',
									dataType : 'json',
									type : 'POST',
									beforeSend : function(request) {
										request.setRequestHeader("staffid",
												staffId);
									},
									async : false,
									data : {
										"targetUrl" : '/shootnotice/editModule',
										"module_data" : newstr,
									},
									success : function(data) {
										if (data.code == 0) {
											console
													.log("editOtherBlockSuccess")
										} else {
											alertMsg(data.msg)
										}
									},
									error : function() {
										//console.log("fail");
									}
								}
								ajaxPost(editOtherBlockContent);
							} else {
								continue;
							}
						}
					}

					// 添加新接口
					function addNewBlockAjax(mark,shoot_notice_id) {
						var module_title = $("#" + mark + "_module_title")
								.val();
						var addOtherBlockAjax = {
							url : '/api/proxy',
							dataType : 'json',
							type : 'POST',
							beforeSend : function(request) {
								request.setRequestHeader("staffid", staffId);
							},
							async : false,
							data : {
								"targetUrl" : '/shootnotice/addModule',
								"shoot_notice_id" : shoot_notice_id,
								"module_title" : module_title,
							},
							success : function(data) {
								//console.log(data);
							},
							error : function() {
								console("addfail");
							}
						}
						ajaxPost(addOtherBlockAjax);
					}

					// 获取城市列表
					var cityList = {
						url : '/api/proxy',
						dataType : 'json',
						type : 'POST',
						beforeSend : function(request) {
							request.setRequestHeader("staffid", staffId);
						},
						async : false,
						data : {
							targetUrl : '/shootnotice/cityList',
							staffid : staffId,
						},
						success : function(data) {
							if (data.code == 0) {
								var node = '';
								var itemArr = data.data;
								for (i = 0; i < itemArr.length; i++) {
									var str = itemArr[i].region_id + "_"
											+ itemArr[i].region_name + "_("
											+ itemArr[i].parent_name + ")";
									city_arr.push(str);
								}
							}

						},
						error : function() {
							//console.log("fail");
						}
					}
					ajaxPost(cityList);
					$("#shoot_city_id")
							.keyup(
									function() {
										var city_value = $("#shoot_city_id")
												.val();
										if (city_value.length > 0) {
											var smallArr = [];
											for (i = 0; i < city_arr.length; i++) {
												if (city_arr[i]
														.indexOf(city_value) != -1) {
													smallArr.push(city_arr[i]);
												}
											}
											if (smallArr.length > 0) {
												var node = '';
												for (j = 0; j < smallArr.length; j++) {
													city_a = smallArr[j]
															.split("_");
													node += "<li data='"
															+ city_a[0] + "'>"
															+ city_a[1]
															+ city_a[2]
															+ "</li>"
												}
												$(".round_ji_city ul").html(
														node);
												$(".round_ji_city").show();
												$(".round_ji_city ul li")
														.each(
																function() {
																	var $self = $(this);
																	$self
																			.click(function() {
																				var str = $self
																						.html();
																				$self
																						.addClass("ji_checked");
																				var regionId = $self
																						.attr('data');
																				$(
																						"#regin_city_id")
																						.val(
																								regionId);
																				$(
																						"#shoot_city_id")
																						.val(
																								str);
																				getWetherInfo();
																				$(
																						".round_ji_city")
																						.hide();
																			})
																})
											} else {
												$(".round_ji_city").hide();
											}
										} else {
											$(".round_ji_city").hide();
										}
									})

					laydate({
						elem : '#shoot_day_id', // input idName
						choose : getWetherInfo,
					});

					// 获取天气信息
					function getWetherInfo() {
						var region_id = $("#regin_city_id").val();
						var date = $("#shoot_day_id").val();

						if (region_id.length > 0 && date.length > 0) {
							var weatherInfo = {
								url : '/api/proxy',
								dataType : 'json',
								type : 'POST',
								beforeSend : function(request) {
									request
											.setRequestHeader("staffid",
													staffId);
								},
								async : false,
								data : {
									targetUrl : '/shootnotice/weather',
									region_id : region_id,
									date : date,
								},
								success : function(data) {
									if (data.code == 0) {
										$("#weather_id").val(data.data.weather);
										$("#sunrise_id").val(data.data.sunrise);
										$("#sunset_id").val(data.data.sunset);
									}

								},
								error : function() {
									//console.log("获取天气失败");
								}
							}
							ajaxPost(weatherInfo);
						}

					}

					// 其他模块
					function addOtherBlock(cursor, nowlen) {
						var node = "";
						node += "<div class='shTabItem'>"
								+ "<div class='inRow'>"
								+ "<input type='text' id ='"
								+ cursor
								+ "_content_name_"
								+ nowlen
								+ "' placeholder='事件描述或人名' class='decEevent'>"
								+ "</div>"
								+ "<div class='inRow'>"
								+ "<input type='text' id ='"
								+ cursor
								+ "_content_value_"
								+ nowlen
								+ "' placeholder='填写时间及其他内容' class='person-plan'>"
								+ "</div>"
								+ "<button class='btn-opa del-tbl_1' id='delete"
								+ cursor + "Block" + nowlen + "'>删除该表</button>"
								+ "<div class='waveLine'></div>" + "</div>"
						return node;
					}
					// 添加工作人员时间安排
					$("#addjob").click(function() {
						addBlock("job");
					})
					// 主演时间安排
					$("#addroler").click(function() {
						addBlock("roler");
					})
					// 其他演员时间安排
					$("#addotherroler").click(function() {
						addBlock("otherroler");
					})
					// 用餐安排
					$("#addfood").click(function() {
						addBlock("food");
					})
					// 陈设安排
					$("#addsetOut").click(function() {
						addBlock("setOut");
					})
					// 摄影器材，灯光器材及场务用品
					$("#addtools").click(function() {
						addBlock("tools");
					})

					// 添加模块
					function addBlock(cursor) {
						
						var len = parseInt($("#" + cursor + "Len").val());

						var nowlen = len + 1;
						$("#" + cursor + "Len").val(nowlen);
						var node = addOtherBlock(cursor, nowlen);

						$("#add" + cursor).before(node);
						delBlock(cursor, nowlen);

					}
					// 删除模块
					function delBlock(cursor, nowlen) {
						if (nowlen > 2) {
							for (i = 2; i < nowlen; i++) {
								if ($("#delete" + cursor + "Block" + i).length > 0) {
									$("#delete" + cursor + "Block" + i).unbind(
											'click');
								}
							}
						}
						$("." + cursor + "Block .shTabItem .btn-opa").each(
								function() {
									var $self = $(this);
									$self.click(function() {
										$self.parent("div").remove();
									})
								})
					}

					// 添加自定义模块
					$("#addNewBlock").click(function() {
						$(".meng,.meng .add-new-section").css({
							"display" : "block"
						})
					})
					// 关闭创建模块
					$(".closeCreateBlock").click(function() {
						$(".meng,.meng .add-new-section").css({
							"display" : "none"
						})
					})

					$("#createNewBlock")
							.click(
									function() {
										var node = '';
										var title = $("#newBlockTitle").val();
										var otherNumber = $("#othertBlockNum")
												.val();

										node += "<div class='shTab otherBlock other"
												+ otherNumber
												+ "Block' >"
												+ "<h3>"
												+ title
												+ "</h3>"
												+ "<input type='hidden' class='otherBlock' id='other"
												+ otherNumber
												+ "_module_title' value='"
												+ title
												+ "'/>"
												+ "<input type='hidden' id='other"
												+ otherNumber
												+ "Len' value='1'>"
												+ "<div class='shTabItem'>"
												+ "<div class='inRow'>"
												+ "<input type='text' id ='other"
												+ otherNumber
												+ "_content_name_1' placeholder='内容标题' class='decEevent'>"
												+ "</div>"
												+ "<div class='text-in-div'>"
												+ "<textarea type='text' id ='other"
												+ otherNumber
												+ "_content_value_1' placeholder='填写需要说明的内容' class='person-plan'></textarea>"
												+ "</div>"
												+ "<div class='waveLine'></div>"
												+ "</div>"
												+ "<button class=' add-tbl addBlock' id='addother"
												+ otherNumber
												+ "'>+添加新表</button>"
												+ "<button class=' del-sec reduceBlock' id='reduceother"
												+ otherNumber
												+ "'>移除该板块</button>" + "</div>"
										$("#t_roundData_parent").before(node);
										var newotherNumber = parseInt(otherNumber) + 1;
										$("#othertBlockNum")
												.val(newotherNumber);
										$("#newBlockTitle").val('');
										addNewOtherBlock();
										delNewOtherBlock();
										$(".meng,.meng .add-new-section").css({
											"display" : "none"
										})
									})

					function addNewOtherBlock() {
						var num = parseInt($("#othertBlockNum").val()) - 1;
						if (num >= 2) {
							for (i = 1; i < num; i++) {
								if ($("#addother" + i).length > 0) {
									$("#addother" + i).unbind('click');
								} else {
									continue;
								}
							}
						}
						addbindBlock()
					}
					function addbindBlock(){
						$(".shootnoticeCont .otherBlock .addBlock").each(							
								function() {
									var $self = $(this);
									$self.unbind('click')
									$self.click(function() {
										var markInfo = $self.attr("id")
												.substring(3);
										addBlock(markInfo);
									})
								})
					}

					function delNewOtherBlock() {
						var num = parseInt($("#othertBlockNum").val()) - 1;
						if (num >= 2) {
							for (i = 1; i < num; i++) {
								if ($("#reduceother" + i).length > 0) {
									$("#reduceother" + i).unbind('click');
								} else {
									continue;
								}
							}
						}
						$(".shootnoticeCont .otherBlock .reduceBlock")
								.each(
										function() {
											var $self = $(this);
											$self
													.click(function() {
														if (confirm("是否移除该板块")) {
															var bool = $self
																	.hasClass("existBlock");
															if (bool) {
																var reduceId = $self
																		.attr("id");
																console
																		.log(reduceId);
																var num = reduceId
																		.replace(
																				"reduceother",
																				'');
																
																var module_title = $(
																		"#other"
																				+ num
																				+ "_module_title")
																		.val();
																
																reduceExistBlock(module_title);
															}
															$self.parent("div")
																	.remove();
														}
													})
										})
					}
					function reduceExistBlock(module_title) {
						var reduceStr = {
							url : '/api/proxy',
							dataType : 'json',
							type : 'POST',
							beforeSend : function(request) {
								request.setRequestHeader("staffid", staffId);
							},
							async : false,
							data : {
								targetUrl : '/shootnotice/deleteModule',
								shoot_notice_id : editShoot_notice_id,
								userid : userId,
								module_title : module_title
							},
							success : function(data) {
								
								if (data.code == 0) {
									//console.log("删除成功");
								} else {
									alertMsg("删除失败");
								}
							},
							error : function() {
								alertMsg("删除失败！");
							}
						}
						ajaxPost(reduceStr);
					}

					$(".backBreakOutList").click(function() {
						location.href = "/web/shoot_notice?staffId=" + staffId
					})
				})