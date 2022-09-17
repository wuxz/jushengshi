var id = getParameterByName('id');
$(document)
		.ready(
				function() {
					loadDiffSceen(true);
					$('.diff').click(
							function() {
								$(this).addClass('active').siblings()
										.removeClass('active');
							});
					$('.now').click(function() {
						loadDiffSceen(true);
					});
					$('.prev').click(function() {
						loadDiffSceen(false);
					});
					function loadDiffSceen(isNow) {
						var options = {
							url : '/api/proxy',
							dataType : 'json',
							beforeSend : function(request) {
								request.setRequestHeader("staffId", staffId);
							},
							data : {
								targetUrl : '/screenplay/detail',
								id : id
							},
							success : function(data) {console.log(data)
								if (data.code == 0) {
									var diff_status = data.data.diff_p_status;
									var sideArr = [ '内场', '外场', '其它' ];
									var dayArr = [ '日', '夜', '晨', '昏', '其他' ];
									var contents = isNow ? data.data.nowcontent
											: data.data.precontent;
									switch (diff_status) {
										case '1':
											$('.contTblHead').hide();
											$('.descTitle').css('border-top','1px solid #cacaca');
											break;
										case '2':
											$('.contTblHead').show();
											$('#add').show();
											$('.diff').hide();
											$('#delete').hide();
											break;
										case '3':
											$('.contTblHead').show();
											$('#add').hide();
											$('#delete').hide();
											break;
										case '4':
											$('.contTblHead').show();
											$('#delete').show();
											$('.diff').hide();
											$('#add').hide();
											contents = data.data.precontent;
											break;
									}
									$('.contShow').html(contents);
									$('.roundScene').html(
											data.data.round + data.data.scene+' |');
									$('.day_night').html(
											dayArr[data.data.day_night - 1]+' |');
									$('.screenplaySide').html(
											sideArr[data.data.side - 1])

									if (data.data.prev > 0) {
										$("#prevBtn")
												.click(
														function() {
															document.location = "screenplay_detail?staffId="
																	+ staffId
																	+ "&id="
																	+ data.data.prev;
														});
									}else if(data.data.prev == 0){
		                                $("#prevBtn").hide();
		                            }

									if (data.data.next > 0) {
										$("#nextBtn")
												.click(
														function() {
															document.location = "screenplay_detail?staffId="
																	+ staffId
																	+ "&id="
																	+ data.data.next;
														});
									}else if(data.data.next==0){
		                                $("#nextBtn").hide();
		                            }
								} else {
									alertMsg(data.msg);
								}
							},
							error : function(data) {
								alertMsg(data.msg);
							}
						}
						ajaxPost(options);
					}
				});