$(document).ready(function(){
	//获取删除列表
	var getMemberList = {
		url : '/api/search_staff_member',
		dataType:'json',
		type:'POST',
		data:{			
			staffId:staffId,
			status:-2, 
			privilege:-2,
			canViewScreenplay:-2
		},
		success:function(data){
			if(data.code==0){
				//console.log(data);
				successSearch(data);
					
			}else{
				alertMsg(data.msg);
			}			
		},
		error:function(){
			alertMsg("网络原因，获取列表失败");
		}
	};
	ajaxPost(getMemberList);
	//列表数据处理结果
	function successSearch(data){
		var itemArr = data.data.list;
		var node='';
		for(i=0;i<itemArr.length;i++){
			var number = i+1;
			var genderName;
			if(itemArr[i].gender==1){
				genderName = '男';
			}else if(itemArr[i].gender==2){
				genderName = '女';
			}else if(itemArr[i].gender==3){
				genderName = '未知';
			}
			//手机是否显示
			if(itemArr[i].mobileStatus=='1'){
				var mobileStatusShow = "保密";
			}else if(itemArr[i].mobileStatus=='2'){
				var mobileStatusShow = "显示";
			}
			
			//所属状态
			var showStatus='';				
			if(itemArr[i].status==-1){
				showStatus='被踢出';
			}else if(itemArr[i].status==1){
				showStatus='待加入';
			}else if(itemArr[i].status==2){
				showStatus='拒绝邀请';
			}else if(itemArr[i].status==5){
				showStatus='已加入';
			}else{
				continue;
			}	
			var role;	
			if(itemArr[i].isAdmin==2){
				role = "管理员";
			}else if(itemArr[i].isCreate==2){
				role="创建者";
			}else if(itemArr[i].isLeader==2){
				role="部门长";
			}else if(itemArr[i].isDriver==2){
				role="部门长";
			}else{
				role="成员";
			}		
			node +=  "<tr class='tblRows'>"
						+"<td class='checkbool'><input type='checkbox'><input type='hidden' class='ismobile' value='"+itemArr[i].mobile+"'></td>"						
						+"<td>"
							+itemArr[i].realName
						+"</td>"
						+"<td>"+genderName+"</td>"
						+"<td>"+itemArr[i].mobile+"</td>"
						+"<td>"+mobileStatusShow+"</td>"
						+"<td>"+itemArr[i].jobs+"</td>"
						+"<td>"+itemArr[i].idNumber+"</td>"
						+"<td>"+role+"</td>"
						+"<td>"+showStatus+"</td>"							
					+"</tr>"				
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
			$("#deleteSelectedMemeber").html("删除（"+i+"）");
		})
	}
	
	
	//搜索关键词
	$("#searchButton").click(function(){
		var keyword = $("#searchKeyWord").val();
		location.href="/web/mem_lists_search?staffId="+staffId+"&keyword="+encodeURIComponent(encodeURIComponent(keyword));
	})
	//权限
	$("#searchPrivilege li").bind('click',function(){		
		var selectPrivilegeStr = $(this).html();
		selectMember('',selectPrivilegeStr,'');
	})
	//是否可查看剧本
	$("#searchScreenpty li").bind('click',function(){		
		var selectviewjubenStr = $(this).html(); 	
		selectMember('','',selectviewjubenStr);
	})
	//状态选择下拉
	$("#searchStatus li").bind('click',function(){
		var selectStatusStr = $(this).html();		
		selectMember(selectStatusStr,'','');
		
	})
	
	//搜索函数
	function selectMember(selectStatusStr,selectPrivilegeStr,selectviewjubenStr){			
		var selectStatus,selectPrivilege,selectviewjuben;				
		if(selectStatusStr==''){
			selectStatusStr = $("#selectMemStatus .select").html();	
		}
		if(selectPrivilegeStr==''){
			selectPrivilegeStr = $("#selectMemPermission .select").html();	
		}
			
		if(selectviewjubenStr==''){
			selectviewjubenStr = $("#selectMemBook .select").html();	
		}
			
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
					successSearch(data);	
				}else{
					alertMsg(data.msg);
				}				
			},
			error:function(){
				alertMsg("网络出错,搜索失败");
			}
		}
		ajaxPost(options);
	}
	
	//获取创建分组
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
	
	//向选中的分组移入人员
	$("#deleteSelectedMemeber").click(function(){
		var mobileArr = [];
		$(".showMemberList .tblRows .checkbool input").each(function(){
			var bool = $(this).is(':checked')								
			if(bool){					
				var mobile = $(this).siblings(".ismobile").val();
				mobileArr.push(mobile);				
			}
		})
			
		if(mobileArr.length>0){
			if(confirm("是否要删除选中的成员")){
				for(i=0;i<mobileArr.length;i++){
					deleteMember(mobileArr[i]);	
				}
			}
		}
		location.href="/web/member_list?staffId="+staffId;
	})
	
	//删除剧组成员
	function deleteMember(mobile){
		
		var deleteMember = {
			url : '/api/proxy',
			dataType:'json',
			async:false,
			type:'POST',
			data:{
				targetUrl:'/staff/removemember',
				staffId:staffId,				
				mobile:mobile,					
			},
			success:function(data){				
				if(data.code!=0){
					alertMsg(data.msg);					
				}				
			},
			error:function(){
				alertMsg("网络出错,删除失败");
			}
		}
		ajaxPost(deleteMember);	
	}	
})