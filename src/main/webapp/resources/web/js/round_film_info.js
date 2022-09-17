$(document).ready(function(){
	
	var fields = [ "pdate", "scene", "side", "day_night","main_role", "actor", "summary", "remark" ];
	var parentSelector = "#filmContent";
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
	if(args.markInfo=="add"){
		addRoundHtml(prefix, parentSelector, fields,'',false);
		var str = '';
		str += '<button class="round-btn-r round-btn ml72" id="filmSave">保存</button>'
				   +'<button class="round-btn-f round-btn" id="filmDel">删除</button>'
		$("#buttonDiv").html(str);
		$("#filmSave,#filmDel").unbind("click");
		$("#filmSave").click(function(){
			filmAddInfo()
		})
		$("#filmDel").click(function(){
			filmAddDel()
		})
	}
	
	function filmAddInfo(){
		var datas = collectRoundsData(prefix,parentSelector);//取出所有场次信息	
		var data = datas[0]		
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
		
		//电影分场表添加
		var addRound = {
			url : '/api/proxy',
			dataType:'json',
			type:'POST',
			async:false,
			data:{
				targetUrl:'/rounds/add',
				staffid:staffId,
				mode:0,
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
	
	//添加时点击删除
	function filmAddDel(){
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
					$("#next_round").val(data.data.next)
					$("#filmContent input").keyup(function(){	
						buttonDivShow();
					})
					$("#filmContent textarea").keyup(function(){	
						buttonDivShow();
					})
					$("#filmContent select").change(function(){
						buttonDivShow();
					})*/	
				}else{
					alertMsg(data.msg)
				}		
				
			}
		}
		ajaxPost(roundsDetail);
		$('#v_round_0').attr("disabled","true");	
	}
	
	//编辑时当场次内容发生，显示保存，删除
	function buttonDivShow(){
		var str = '';
		str += '<button class="round-btn-r round-btn ml72" id="filmSave">保存</button>'
				   +'<button class="round-btn-f round-btn" id="filmDel">删除</button>'
		$("#buttonDiv").html(str);
		$("#filmSave,filmDel").unbind('click')	
		$("#filmSave").click(function(){
			filmSaveInfo();
		})
		$("#filmDel").click(function(){
			filmSaveDel();
		})	
	}
	
	function filmSaveInfo(){
		var datas = collectRoundsData(prefix,parentSelector);//取出所有场次信息	
		var data = datas[0]		
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
		
		//电影分场表编辑		
		var editRoundsList = {
			url : '/api/proxy',
			dataType:'json',
			type:'POST',
			async:false,
			data:{
				targetUrl:'/rounds/edit',
				staffid:staffId,					
				id:args.id,
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
					//preNextShow()
					location.href="/web/round_info?staffId="+staffId;
				}else{
					alertMsg(data.msg)
				}		
				
			}
		}		
		ajaxPost(editRoundsList);				
	}
	
	
	
	function filmSaveDel(){
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
						//console.log(data.msg)
					}		
					
				},
				error:function(){
					console.log('fail');
				}
			}
			ajaxPost(deleteRound);	
		}
		
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
			location.href="/web/round_film_info?staffId="+staffId+"&markInfo=edit&id="+next
		}else{
			alertMsg("目前没有下一场内容");
		}
	}	
	function prevClick(){
		var prev = $("#prev_round").val();	
		if(prev.length>0){
			location.href="/web/round_film_info?staffId="+staffId+"&markInfo=edit&id="+prev
		}else{
			alertMsg("目前没有上一场内容");
		}
	}
	
	
	
	
	
	//编辑分场表
	/*
	$("#filmSave").click(function(){
	
		//var flag = [true,true,true,true,true,true]
		var datas = collectRoundsData(prefix,parentSelector);//取出所有场次信息	
		var data = datas[0]
		var markInfo = $("#markInfo").val();
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
			var editRoundsList = {
				url : '/api/proxy',
				dataType:'json',
				type:'POST',
				async:false,
				data:{
					targetUrl:'/rounds/edit',
					staffid:staffId,					
					id:args.id,
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
			//if(flag[0]&&flag[1]&&flag[2]&&flag[3]){
				ajaxPost(editRoundsList);	
			//}		
		}else if(markInfo=='add'){
			
			//电影分场表添加
			var addRound = {
				url : '/api/proxy',
				dataType:'json',
				type:'POST',
				async:false,
				data:{
					targetUrl:'/rounds/add',
					staffid:staffId,
					mode:0,
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
		
	})*/
	
	//删除分场表
	/*
	$("#fileDel").click(function(){
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
						console.log(data.msg)
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
	/*
	//期表分场表	
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
			if(data.code==0){
				var node ='';
				var itemArr = data.data.list[0].data;	
				if(itemArr.length>0){					
					for(i=0;i<itemArr.length;i++){
						node +="<li>"+itemArr[i].round+"</li>"	
					}										
				}else{
					for(i=0;i<=200;i++){
						node +="<li>"+i+"</li>"	
					}					
				}
				$(".round_ji_option ul").html(node);
				roundClick();	
			}else{
				console.log(data.msg)
			}					
		},
		error:function(){
			console.log('fail');
		}
	}
	ajaxPost(roundlist);
	$("#round_id").focus(function(){
		$(".round_ji_option").css({"display":"block"});
	})
	function roundClick(){		
		$(".round_ji_option ul li").each(function(){
			$(this).click(function(){
				var str =  $(this).html();
				$("#round_id").val(str)
				$(".round_ji_option").css({"display":"none"});
			})			
		});	
	}*/
		
	$('.del-tbl').remove();
	$('.waveLine').remove();
	$('.shTabItem').css('border','0');
})