$(document).ready(function(){
	$('#editGroMem').click(function(){
		$('.editGroupMem').slideToggle('slow');
	});
	$('.editGroupMem').mouseleave(function(){
		$(this).slideUp('slow');
	})
	//接受参数
	var oname;
	var groupid;	
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
		var groupArr = getGroupList();
		oname = groupArr[args.groupid];	
		groupid = args.groupid;
		$("#selectMemAll .select").html(oname);
		
	}
	GetUrlParms();
	//获取单一份组成员
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
	//获取已创建的分组列表
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
				saveGroup = data.data.list;	
				var node ="<li data='all' class='groupli'>全部</li>";											
				for(i=0;i<saveGroup.length;i++){
					node += "<li data='"+i+"' class='groupli'>"+saveGroup[i]+"</li>"
				}
				$("#selectMemAll .selectUl").html(node);										
			}												
		}	
		ajaxPost(getGrouplist);
		return saveGroup;
	}
	getGroupList();
	//点击分组跳转到新的分组列表
	$("#selectMemAll .selectUl .groupli").click(function(){
		var $self = $(this);
		var groupValue =  $self.attr('data');
		
		if(groupValue=='all'){
			location.href="/web/member_list?staffId="+staffId;
		}else{
			location.href="/web/member_list_group?staffId="+staffId+"&groupid="+groupValue;	
		}					
	})
		
	//分组列表成员动态添加到页面当中	
	function list_group_html(data){
		var memberList = '';
			memberList = data.data.member;				
			var mobileStatus = ['','保密','显示'];
			var isviewscreenplay = ['','否','是'];
			var genderName= ['','男','女','未知']
			var node = '';
			if(memberList.length>0){
				for(i=0;i<memberList.length;i++){
				var role;	
				if(memberList[i].iscreator==2){					
					role="创建者";
				}else if(memberList[i].isadmin==2){
					role = "管理员";
				}else if(memberList[i].isleader==2){
					role="部门长";
				}else{
					role="成员";
				}
				var showStatus='';				
				if(memberList[i].instatus==1){
					showStatus='离组';
				}else if(memberList[i].instatus==2){
					showStatus='在组';
				}else if(memberList[i].instatus==3){
					showStatus='拒绝邀请';
				}else if(memberList[i].instatus==4){
					showStatus='邀请中';
				}
				
				var number = i+1;
				node +="<tr class='tblRows'>"
						+"<td>"+number+"</td>"
						+"<td>"+memberList[i].realname+"</td>"
						+"<td>"+genderName[memberList[i].gender]+"</td>"
						+"<td>"+memberList[i].mobile+"</td>"
						+"<td>"+mobileStatus[memberList[i].mobilestatus]+"</td>"
						+"<td>"+memberList[i].jobnames+"</td>"
						+"<td>"+memberList[i].idnumber+"</td>"
						+"<td>"+role+"</td>"
						+"<td>"+showStatus+"</td>"
						+"<td>"+isviewscreenplay[memberList[i].isviewscreenplay]+"</td>"
						+"<td><span class='editMem' id='"+memberList[i].mobile+"'>编辑</span>|<span"
							+"  class='deleteMember' id='"+memberList[i].mobile+"'>移出</span></td>"
					+"</tr>"
				}
				$(".showMemberList").html(node);
				$(".editMem").click(function(index){
					initMemberInfoForm($(this).attr("id"));
				});
				reduceMemberClick();
			}	
	}
	$("#closeAddMember").click(function(){
		$(".meng,.addMember").css({'display':'none'})
	})		
	//移入成员
	$("#addMember").click(function(){
		var groupValue = $("#selectMemAll .select").html();
		location.href="/web/mem_list_join_group?staffId="+staffId+"&oname="+encodeURIComponent(encodeURIComponent(groupValue));
	})
	//移出成员
	$("#reduceMember").click(function(){
		var groupValue = $("#selectMemAll .select").html();
		location.href="/web/mem_list_out_group?staffId="+staffId+"&oname="+encodeURIComponent(encodeURIComponent(groupValue));
	})
	//搜索
	$("#searchKeyWordButton").click(function(){
		var keyword = $("#searchKeyWord").val();
		location.href="/web/mem_lists_search?staffId="+staffId+"&keyword="+encodeURIComponent(encodeURIComponent(keyword));
	})
	
	//解散小组	
	$("#ungroup").click(function(){		
		var ungroup ={
			url : '/api/proxy',
			dataType:'json',
			type:'POST',
			async:false,
			data:{
				targetUrl:'/organization/dissolutiondept',
				staffid:staffId,
				oname:oname,
			},
			success:function(data){				
				if(data.code==0){
					location.href="/web/member_list?staffId="+staffId;
				}else{
					//console.log(data.msg);
				}
			},
			error:function(){
				alertMsg("网络出错");
			}
		} 
		ajaxPost(ungroup);
		
	})	
	//从部门当中移出成员
	function reduceMemberClick(){
		$(".deleteMember").each(function(){			
			$(this).click(function(){
				var mobile = $(this).attr("id")				
				var reduceFZMember ={
						url : '/api/proxy',
						dataType:'json',
						type:'POST',
						data:{
							targetUrl:'/organization/removedeptmember',	
							staffid:staffId,
							oname:oname, 				
							mobile:mobile,
						},
						success:function(data){						
							if(data.code==0){				
								location.href="/web/member_list_group?staffId="+staffId+"&groupid="+groupid;
							}else{
								alertMsg(data.msg);
							}
							
						},
						error:function(){
							alertMsg("网络原因获取失败");
						}
					}
				ajaxPost(reduceFZMember);
			})							
		})
	}
		
	//任命部门长			 
	$("#apppiontDepartMent").click(function(){
		var groupValue = $("#selectMemAll .select").html();
		location.href="/web/mem_list_appoint?staffId="+staffId+"&oname="+encodeURIComponent(encodeURIComponent(groupValue));;
	})
	
	
	/*
	$("#selectMemStatus li").bind('click',function(){
		selectMember();
	})
	$("#selectMemPermission li").bind('click',function(){
		selectMember();
	})
	$("#selectMemBook li").bind('click',function(){
		selectMember();
	})
	//搜索函数
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
			data:{
				staffId:staffId,	
				status:selectStatus,
				privilege:selectPrivilege,
				canViewScreenplay:selectviewjuben,			
			},
			success:function(data){
				if(data.code==0){
					list_group_search(data);	
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
	
	function list_group_search(data){
		var memberList = '';
			memberList = data.data.list;				
			var mobileStatus = ['','保密','显示'];
			var isviewscreenplay = ['','否','是'];
			var genderName= ['','男','女','未知']
			var node = '';
			if(memberList){
				for(i=0;i<memberList.length;i++){
				var role;	
				if(memberList[i].isAdmin==2){
					role = "管理员";
				}else if(memberList[i].isCreate==2){
					role="创建者";
				}else if(memberList[i].isLeader==2){
					role="部门长";
				}else if(memberList[i].isDriver==2){
					role="司机";
				}else{
					role="成员";
				}
				var showStatus='';				
				if(memberList[i].status==-1){
					showStatus='被踢出';
				}else if(memberList[i].status==1){
					showStatus='待加入';
				}else if(memberList[i].status==2){
					showStatus='拒绝邀请';
				}else if(memberList[i].status==5){
					showStatus='已加入';
				}
				
				var number = i+1;
				node +="<tr class='tblRows'>"
						+"<td>"+number+"</td>"
						+"<td>"+memberList[i].realName+"</td>"
						+"<td>"+genderName[memberList[i].gender]+"</td>"
						+"<td>"+memberList[i].mobile+"</td>"
						+"<td>"+mobileStatus[memberList[i].mobileStatus]+"</td>"
						+"<td>"+memberList[i].jobs+"</td>"
						+"<td>"+memberList[i].idNumber+"</td>"
						+"<td>"+role+"</td>"
						+"<td>"+showStatus+"</td>"
						+"<td>"+isviewscreenplay[memberList[i].canViewScreenplay]+"</td>"
						+"<td><span class='editMem' id='"+memberList[i].mobile+"'>编辑</span>|<span"
							+"  class='deleteMember' id='"+memberList[i].mobile+"'>移出</span></td>"
					+"</tr>"
				}
				$(".showMemberList").html(node);
				
				$(".editMem").click(function(index){
					initMemberInfoForm($(this).attr("id"));
				});
				reduceMemberClick();
			}	
	}*/
	
	
		
		
});