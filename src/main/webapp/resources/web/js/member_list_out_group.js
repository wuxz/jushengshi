$(document).ready(function(){
	
	//关键词搜索
	$("#searchContentButton").click(function(){
		var keyword = $("#searchKeyWord").val();
		location.href="/web/mem_lists_search?staffId="+staffId+"&keyword="+encodeURIComponent(encodeURIComponent(keyword));
	})
	//接受参数
	var oname = GetUrlParms();	
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
		return decodeURIComponent(args.oname);	
	}
	//获取此分组成员
	var groupSingleList = {
		url : '/api/proxy',
		dataType:'json',
		type:'POST',
		async:false,
		data:{
			targetUrl:'/organization/single',
			staffid:staffId,
			oname:oname,
		},
		success:function(data){
			if(data.code==0){
				list_group_html(data);
			}else{
				alertMsg(data.msg)
			}		
			
		}
	}
	ajaxPost(groupSingleList);
	//分组列表成员动态添加到页面当中
	function list_group_html(data){
		var itemArr = '';
		itemArr = data.data.member;				
		var mobileStatus = ['','保密','显示'];
		var isviewscreenplay = ['','否','是'];
		var genderName= ['','男','女','未知']
		var node = '';
		
		if(itemArr.length>0){
			for(i=0;i<itemArr.length;i++){
			var role;	
			if(itemArr[i].iscreator==2){
				role="创建者";
			}else if(itemArr[i].isadmin==2){				
				role = "管理员";
			}else if(itemArr[i].isleader==2){
				role="部门长";
			}else{
				role="成员";
			}
			var showStatus='';				
			if(itemArr[i].instatus==1){
				showStatus='离组';
			}else if(itemArr[i].instatus==2){
				showStatus='在组';
			}else if(itemArr[i].instatus==3){
				showStatus='拒绝邀请';
			}else if(itemArr[i].instatus==4){
				showStatus='邀请中';
			}
			
			node +="<tr class='tblRows'>"
					+"<td class='checkbool'><input type='checkbox'><input type='hidden' class='ismobile' value='"+itemArr[i].mobile+"'>"
					+"<td>"+itemArr[i].realname+"</td>"
					+"<td>"+genderName[itemArr[i].gender]+"</td>"
					+"<td>"+itemArr[i].mobile+"</td>"
					+"<td>"+mobileStatus[itemArr[i].mobilestatus]+"</td>"
					+"<td>"+itemArr[i].jobnames+"</td>"
					+"<td>"+itemArr[i].idnumber+"</td>"
					+"<td>"+role+"</td>"
					+"<td>"+showStatus+"</td>"
					+"<td>"+isviewscreenplay[itemArr[i].isviewscreenplay]+"</td>"					
				+"</tr>"
			}	
		}
		$(".showMemberList").html(node);
		clickPitch();	
	}
	//获取选中的人数
	function clickPitch(){
		$(".checkbool input").click(function(){
			var i =0;
			$(".showMemberList .tblRows .checkbool input").each(function(){
				var bool = $(this).is(':checked')
				if(bool){
					i= i+1;
				}
			})
			$("#removeOutMember").html("移出（"+i+"）");
		})

		
	}
		
	//获取已创建分组列表
	function getGroupList(){		
			var saveGroup
			var getGrouplist = {
				url : '/api/proxy',
				dataType:'json',
				type:'POST',
				async:false,
				data:{
					targetUrl:'/organization/getlist',
					staffid:staffId,
				},
				success:function(data){					
					if(data.code==0){
						saveGroup = data.data.list;	
						var node ="<li data='all' class='groupli'>全部</li>";
						if(saveGroup.length>0){
							for(i=0;i<saveGroup.length;i++){
								node += "<li data='"+i+"' class='groupli'>"+saveGroup[i]+"</li>"
							}	
						}						
						$("#selectMemAll .selectUl").html(node);
						$("#selectMemAll .select").html(oname);	
					}else{
						alertMsg(data.msg);
					}						
				},
				error:function(){
					alertMsg("网络原因，获取以创建分组失败");
				}	
			}	
		ajaxPost(getGrouplist);
	}	
	getGroupList();
	
	
	//跳转到指定分组
	$("#selectMemAll .selectUl .groupli").click(function(){
		var $self = $(this);
		var groupValue =  $self.attr('data');
		if(groupValue=='all'){
			location.href="/web/member_list?staffId="+staffId;
		}else{
			location.href="/web/member_list_group?staffId="+staffId+"&groupid="+groupValue;		
		}
	})
	
	//移出人员
	$("#removeOutMember").click(function(){
		var str = '';
		var arr = [];
		$(".showMemberList .tblRows .checkbool input").each(function(){
				var bool = $(this).is(':checked')				
				if(bool){					
					var mobile = $(this).siblings(".ismobile").val();
					arr.push(mobile);		
				}
		})
		if(arr.length>0){
			for(i=0;i<arr.length;i++){			
				reduceMember(arr[i]);
			}	
		}			
		window.location.reload(); 
	})
	//调用接口单个移出
	function reduceMember(mobile){
		
		var reduceFZMember ={
				url : '/api/proxy',
				dataType:'json',
				type:'POST',
				async:false,
				data:{
					targetUrl:'/organization/removedeptmember',	
					staffid:staffId,
					oname:oname, 				
					mobile:mobile
				},
				success:function(data){						
					if(data.code==0){				
						//console.log("success");
					}else{
						//console.log(data.msg);
					}
					
				},
				error:function(){
					//console.log('移出失败')
				}
			}
			ajaxPost(reduceFZMember);
	}
	
	/*
	//搜索函数
	$("#selectMemStatus .selectUl li").on('click',function(){
		selectMember();
	})
	$("#selectMemPermission .selectUl li").on('click',function(){
		selectMember();
	})
	$("#selectMemBook .selectUl li").on('click',function(){
		selectMember();
	})

	function selectMember(){			
		var selectStatus,selectPrivilege,selectviewjuben;
		var selectStatusStr = $("#selectMemStatus .select").html();
		var selectPrivilegeStr = $("#selectMemPermission .select").html();	
		var selectviewjubenStr = $("#selectMemBook .select").html();
		
		if(selectStatusStr=="全部状态"){
			selectStatus=-2
		}else if(selectStatusStr=="被踢出"){
			selectStatus=-1
		}else if(selectStatusStr=="待加入"){
			selectStatus=1
		}else if(selectStatusStr=="拒绝邀请"){
			selectStatus=2
		}else if(selectStatusStr=="已加入"){
			selectStatus=5
		}
		if(selectPrivilegeStr=="全部权限"){
			selectPrivilege=-2
		}else if(selectPrivilegeStr=="创建者"){
			selectPrivilege=0
		}else if(selectPrivilegeStr=="管理员"){
			selectPrivilege=1
		}else if(selectPrivilegeStr=="部门长"){
			selectPrivilege=2
		}else if(selectPrivilegeStr=="成员"){
			selectPrivilege=3
		}
		if(selectviewjubenStr=="是否可查看剧本"){
			selectviewjuben=-2
		}else if(selectviewjubenStr=="可查看剧本"){
			selectviewjuben=2
		}else if(selectviewjubenStr=="不可查看剧本"){
			selectviewjuben=1
		}
		
		var options = {
			url : '/api/search_staff_member',
			dataType:'json',
			async:false,
			data:{
				staffId:staffId,
				//team:oname,	
				status:selectStatus,
				privilege:selectPrivilege,
				canViewScreenplay:selectviewjuben,			
			},
			success:function(data){
				if(data.code==0){
					list_group_new(data);	
				}else{
					alertMsg(data.msg);
				}
				
			},
			error:function(){
				alertMsg("网络出错");
			}
		}
		ajaxPost(options);
	}
	
	function list_group_new(data){
		var itemArr = '';
		itemArr = data.data.list;				
		var mobileStatus = ['','保密','显示'];
		var isviewscreenplay = ['','否','是'];
		var genderName= ['','男','女','未知']
		var node = '';
		
		if(itemArr){
			for(i=0;i<itemArr.length;i++){
			var role;	
			if(itemArr[i].isAdmin==2){
				role = "管理员";
			}else if(itemArr[i].isCreate==2){
				role="创建者";
			}else if(itemArr[i].islLeader==2){
				role="部门长";
			}else if(itemArr[i].isDriver==2){
				role="司机";
			}else{
				role="成员";
			}
			var showStatus='';				
			if(itemArr[i].status==-1){
				showStatus='被踢出';
			}else if(itemArr[i].status==1){
				showStatus='待加入';
			}else if(itemArr[i].status==2){
				showStatus='拒绝邀请';
			}else if(itemArr[i].status==5){
				showStatus='已加入';
			}
			
			node +="<tr class='tblRows'>"
					+"<td class='checkbool'><input type='checkbox'><input type='hidden' class='ismobile' value='"+itemArr[i].mobile+"'>"
					+"<td>"+itemArr[i].realName+"</td>"
					+"<td>"+genderName[itemArr[i].gender]+"</td>"
					+"<td>"+itemArr[i].mobile+"</td>"
					+"<td>"+mobileStatus[itemArr[i].mobileStatus]+"</td>"
					+"<td>"+itemArr[i].jobs+"</td>"
					+"<td>"+itemArr[i].idNumber+"</td>"
					+"<td>"+role+"</td>"
					+"<td>"+showStatus+"</td>"
					+"<td>"+isviewscreenplay[itemArr[i].canViewScreenplay]+"</td>"					
				+"</tr>"
			}	
		}
		$(".showMemberList").html(node);
		$(".checkbool input").click(function(){
			var i =0;
			$(".showMemberList .tblRows .checkbool input").each(function(){
				var bool = $(this).is(':checked')
				if(bool){
					i= i+1;
				}
			})
			$("#removeOutMember").html("移出（"+i+"）");
		})

		
	}*/
	
	
	

})