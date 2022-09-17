$(document).ready(function(){
	var fields = [ "pdate", "scene", "side", "day_night","main_role", "actor", "summary", "remark" ];
	var parentSelector = "#TVContent";
	var prefix = "v";
	var pdate='';
	var validator = validform("#fm1");	
	//接受参数
	var args = GetUrlParms();	
	function GetUrlParms(){
		var args=new Object();   
		var query=location.search.substring(1);//获取查询串   	
		var pairs=query.split("&");//在逗号处断开   
		for(var i=0;i<pairs.length;i++){   
			var pos=pairs[i].indexOf('=');//查找name=value   
			if(pos==-1)   continue;//如果没有找到就跳过   
			var argname=pairs[i].substring(0,pos);//提取name   
			var value=pairs[i].substring(pos+1);//提取value   
			args[argname]=unescape(value);//存为属性   
		}
		
		$("#barakOutId").val(args.id);	
		$("#markInfo").val(args.markInfo);
		return args;
	}
	//添加状态初始化页面
	if(args.markInfo=="add"){
		addRoundHtml(prefix, parentSelector, fields,'',false);
		var str = '';
		str += '<button class="round-btn-r round-btn ml72" id="TVSave">保存</button>'
				   +'<button class="round-btn-f round-btn" id="TVDel">删除</button>'
		$("#buttonDiv").html(str);
		$("#TVSave,#TVDel").unbind("click");
		$("#TVSave").click(function(){
			TVAddInfo()
		})
		$("#TVDel").click(function(){
			TVAddDel()
		})
	}
	//添加时点击保存按钮
	function TVAddInfo(){
		var datas = collectRoundsData(prefix,parentSelector);//取出所有场次信息	
		var data = datas[0]		
		var mode = data.mode;
		var round = data.round;	
		var day_night = data.day_night;
		var side = data.side;		
		var scene = data.scene;
		var page_count = data.pagenum;
		var main_role = data.main_role;
		var actor = data.actor;
		var summary =data.summary;
		var remark = data.remark;
		if (!validator.form()){
			alertMsg('请把必填项填写完整');
			return;
		}	
		var addRound = {
			url : '/api/proxy',
			dataType:'json',
			type:'POST',				
			beforeSend :function(request) {
				request.setRequestHeader("staffId", staffId);
			},
			async:false,
			data:{
				targetUrl:'/rounds/add',
				mode:mode,
				staffid:staffId,
				round:round,
				day_night:day_night,
				side:side,
				scene:scene,
				main_role:main_role,
				actor:actor,
				summary:summary,
				remark:remark,	
			},
			success:function(data){					
				if(data.code==0){
					location.href="/web/round_info?staffId="+staffId;
				}else{
					alertMsg(data.msg)
				}		
				
			}
		}
		ajaxPost(addRound);	
	}
	//添加时点击删除按钮
	function TVAddDel(){
		if(confirm('是否要删除此分场表')){
			location.href="/web/round_info?staffId="+staffId;
		}		
	}

	if(args.markInfo=='edit'){
		//获取分场表详细信息
		var roundsDetail = {
			url : '/api/proxy',
			dataType:'json',
			type:'POST',
			async:false,
			data:{
				targetUrl:'/rounds/detail',
				staffid:staffId,
				id:args.id	
			},
			success:function(data){					
				if(data.code==0){															
					var datas= [];
					var object = {"mode":data.data.mode,"round":data.data.round,"day_night":data.data.day_night,"side":data.data.side,"scene":data.data.scene,"main_role":data.data.main_role,"actor":data.data.actor,"summary":data.data.summary,"remark":data.data.remark}
					datas.push(object);
					initFormWithData(datas, prefix, parentSelector,fields,false);
					buttonDivShow();
					/*preNextShow();
					$("#prev_round").val(data.data.prev)
					$("#next_round").val(data.data.next);
					$("#TVContent input").keyup(function(){	
						buttonDivShow();
					})
					$("#TVContent textarea").keyup(function(){	
						buttonDivShow();
					})
					$("#TVContent select").change(function(){
						buttonDivShow();
					})*/
					
				}else{
					alertMsg(data.msg)
				}		
				
			}
		}
		ajaxPost(roundsDetail);
		$('#v_round_0').attr("disabled",'true');
		$('#v_mode_0').attr("disabled",'true');
	}
	
	function preNextShow(){
		var str = '';
		str += '<button class="round-btn-r round-btn ml72" id="prev_round_button">上一场</button>'
				   +'<button class="round-btn-f round-btn" id="next_round_button">下一场</button>'
		$("#buttonDiv").html(str);
		$("#prev_round_button,#next_round_button").unbind("click");
		$("#prev_round_button").click(function(){
			prevClick()
		})
		$("#next_round_button").click(function(){
			nextClick()
		})
	} 	
	function nextClick(){
		var next = $("#next_round").val();	
		if(next.length>0){
			location.href="/web/round_TV_info?staffId="+staffId+"&markInfo=edit&id="+next
		}else{
			alertMsg("目前没有下一场内容");
		}
	}	
	function prevClick(){
		var prev = $("#prev_round").val();	
		if(prev.length>0){
			location.href="/web/round_TV_info?staffId="+staffId+"&markInfo=edit&id="+prev
		}else{
			alertMsg("目前没有上一场内容");
		}
	}
	
	//编辑时当场次内容发生，显示保存，删除
	function buttonDivShow(){
		var str = '';
		str += '<button class="round-btn-r round-btn ml72" id="TVSave">保存</button>'
				   +'<button class="round-btn-f round-btn" id="TVDel">删除</button>'
		$("#buttonDiv").html(str);
		$("#TVSave,TVDel").unbind('click')	
		$("#TVSave").click(function(){
			TVSaveInfo();
		})
		$("#TVDel").click(function(){
			TVSaveDel();
		})	
	}
	function TVSaveInfo(){
		var datas = collectRoundsData(prefix,parentSelector);//取出所有场次信息	
		var data = datas[0]
		var markInfo = $("#markInfo").val();
		var mode = data.mode;
		var round = data.round;	
		var day_night = data.day_night;
		var side = data.side;		
		var scene = data.scene;
		var page_count = data.pagenum;
		var main_role = data.main_role;
		var actor = data.actor;
		var summary =data.summary;
		var remark = data.remark;		
		if (!validator.form()){
			alertMsg('请把必填项填写完整');
			return;
		}
		var id = $("#barakOutId").val();
		var editRound = {
			url : '/api/proxy',
			dataType:'json',
			type:'POST',
			async:false,
			data:{
				targetUrl:'/rounds/edit',
				staffid:staffId,					
				id:id,
				day_night:day_night,
				side:side,
				scene:scene,
				main_role:main_role,
				actor:actor,
				summary:summary,
				remark:remark,
			},
			success:function(data){					
				if(data.code==0){						
					//preNextShow();
					location.href="/web/round_info?staffId="+staffId;
				}else{
					alertMsg(data.msg)
				}		
				
			}
		}
		ajaxPost(editRound);		
	}
	function TVSaveDel(){
		if(confirm('是否要删除此分场表')){
			var deleteRound = {
				url : '/api/proxy',
				dataType:'json',
				type:'POST',
				async:false,
				data:{
					targetUrl:'/rounds/del',
					staffid:staffId,
					id:args.id	
				},
				success:function(data){								
					if(data.code==0){						
						location.href="/web/round_info?staffId="+staffId;
					}else{
						alertMsg(data.msg)
					}							
				},
				error:function(){
					//console.log('fail');
				}
			}
			ajaxPost(deleteRound);	
		}		
	}
	
	//编辑分场表
	/*
	$("#TVSave").click(function(){
		//var flag = [true,true,true,true,true,true]		
		var datas = collectRoundsData(prefix,parentSelector);//取出所有场次信息	
		var data = datas[0]
		var markInfo = $("#markInfo").val();
		var mode = data.mode;
		var round = data.round;	
		var day_night = data.day_night;
		var side = data.side;		
		var scene = data.scene;
		var page_count = data.pagenum;
		var main_role = data.main_role;
		var actor = data.actor;
		var summary =data.summary;
		var remark = data.remark;		
		if (!validator.form()){
			alertMsg('请把必填项填写完整');
			return;
		}
		
		
		if( markInfo =='edit'){
			//电影分场表编辑
			var id = $("#barakOutId").val();
			var editRound = {
				url : '/api/proxy',
				dataType:'json',
				type:'POST',
				async:false,
				data:{
					targetUrl:'/rounds/edit',
					staffid:staffId,					
					id:id,
					day_night:day_night,
					side:side,
					scene:scene,
					main_role:main_role,
					actor:actor,
					summary:summary,
					remark:remark,
				},
				success:function(data){					
					if(data.code==0){						
						location.href="/web/round_info?staffId="+staffId;
					}else{
						console.log(data.msg)
					}		
					
				}
			}
			//if(flag[0]&&flag[1]&&flag[2]&&flag[3]){
				ajaxPost(editRound);
			//}
					
		}else if(markInfo=='add'){
			if(mode.length==0){
				flag[4] = false;
				$("#v_mode_0").addClass("bordercolor");
			}
			if(round.length==0){
				flag[5] = false;
				$("#v_round_0").addClass("bordercolor");
			}
			//电影分场表添加
			var addRound = {
				url : '/api/proxy',
				dataType:'json',
				type:'POST',				
				beforeSend :function(request) {
					request.setRequestHeader("staffId", staffId);
				},
				async:false,
				data:{
					targetUrl:'/rounds/add',
					mode:mode,
					staffid:staffId,
					round:round,
					day_night:day_night,
					side:side,
					scene:scene,
					main_role:main_role,
					actor:actor,
					summary:summary,
					remark:remark,	
				},
				success:function(data){					
					if(data.code==0){
						location.href="/web/round_info?staffId="+staffId;
					}else{
						console.log(data.msg)
					}		
					
				}
			}
			//if(flag[0]&&flag[1]&&flag[2]&&flag[3]&&flag[4]&&flag[5]){
				ajaxPost(addRound);
			//}else{
				//alertMsg("必填参数没有填写完整");
			//}	
		}
		
	})
	
	//删除分场表
	$("#delTV").click(function(){
		if(args.markInfo=='edit'){
			var deleteRound = {
				url : '/api/proxy',
				dataType:'json',
				type:'POST',
				async:false,
				data:{
					targetUrl:'/rounds/del',
					staffid:staffId,
					id:args.id	
				},
				success:function(data){								
					if(data.code==0){						
						location.href="/web/round_info?staffId="+staffId;
					}else{
						alertMsg(data.msg)
					}							
				},
				error:function(){
					console.log('fail');
				}
			}
			ajaxPost(deleteRound);
		}else if(args.markInfo=='add'){
			location.href="/web/round_info?staffId="+staffId;
		}else{
			alertMsg("传参出现错误");
		}
		
	})*/
	
	
	
	
	
	
	
	
	/*//期表分场表	
	var roundlist = {
		url : '/api/proxy',
		dataType:'json',
		type:'POST',
		async:false,
		data:{
			targetUrl:'/rounds/list',
			staffid:staffId,
		},
		success:function(data){			
			var itemArr = data.data.list;
			if(data.code==0){
				var node ='';
				if(itemArr.length>0){
					for(i=0;i<itemArr.length;i++){
						node +="<li>"+itemArr[i].mode+"</li>"	
					}
					$(".round_ji_mode ul").html(node);
					roundLiClick();
				}else{
					$("#mode_id").blur(function(){
						$(".round_ji_mode").css({"display":"none"});
					})
				}				
			}else{
				console.log(data.msg)
			}		
			
		},
		error:function(){
			console.log('fail');
		}
	}
	ajaxPost(roundlist);
	function roundLiClick(){		
		$(".round_ji_mode ul li").each(function(){
			$(this).click(function(){
				var str =  $(this).html();
				$("#mode_id").val(str)
				$(".round_ji_mode").css({"display":"none"});
			})			
		});	
	}
	
	$("#round_id").focus(function(){
		$(".round_ji_round").css({"display":"block"});
		var mode = $("#mode_id").val();
		if(mode.length>0){
			var roundlist1 = {
				url : '/api/proxy',
				dataType:'json',
				type:'POST',
				async:false,
				data:{
					targetUrl:'/rounds/list',
					staffid:staffId,
				},
				success:function(data){							
					var itemArr = data.data.list[mode];
					if(data.code==0){
						var node ='';
						if(itemArr.length>0){
							for(i=0;i<itemArr.length;i++){
								node +="<li>"+itemArr[i].mode+"</li>"	
							}
							$(".round_ji_round ul").html(node);
							//roundLiClick();
						}else{
							$("#round_id").blur(function(){
								$(".round_ji_round").css({"display":"none"});
							})
						}				
					}else{
						console.log(data.msg)
					}							
				},
				error:function(){
					console.log('fail');
				}
			}
			ajaxPost(roundlist1);
		}
	})
	$(".round_ji_round ul li").each(function(){
		$(this).click(function(){
			var str =  $(this).html();
			$("#round_id").val(str)
			$(".round_ji_round").css({"display":"none"});
		})			
	});*/
		

	
	
	
	$('.del-tbl').remove();
	$('.waveLine').remove();
	$('.shTabItem').css('border','0');
	
	
	
	
	
})