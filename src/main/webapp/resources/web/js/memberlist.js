$(document).ready(function(){
	$("#keyword").keyup(function(event) {
		if (event.keyCode == 13) {
			searchMember();
		}
	});
	
	var getMemberList = {
		url : '/api/search_staff_member',
		dataType:'json',
		type:'POST',
		data:{
			staffId:staffId,
			inStatus:-2, 
			privilege:-2,
			canViewScreenplay:-2
		},
		success:function(data){
			if(data.code==0){
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
	
	$("#searchButton").click(function(){		
		searchMember();	
	})
	$("#searchPrivilege li").bind('click',function(){		
		var selectPrivilegeStr = $(this).html();
		selectMember('',selectPrivilegeStr,'');
	})
	$("#searchScreenpty li").bind('click',function(){		
		var selectviewjubenStr = $(this).html(); 	
		selectMember('','',selectviewjubenStr);
	})
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
		}else if(selectStatusStr=="离组"){
			selectStatus=1
		}else if(selectStatusStr=="在组"){
			selectStatus=2
		}else if(selectStatusStr=="拒绝邀请"){
			selectStatus=3
		}else if(selectStatusStr=="邀请中"){
			selectStatus=4
		}
		if(selectPrivilegeStr=="全部权限"){
			selectPrivilege=-2
		}else if(selectPrivilegeStr=="创建者"){
			selectPrivilege=0
		}else if(selectPrivilegeStr=="管理员"){
			selectPrivilege=1
		}else if(selectPrivilegeStr=="组长"){
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
			type:'POST',
			data:{
				staffId:staffId,				
				inStatus:selectStatus,
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
	
	//搜索成功处理
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
				//是否可查看剧本
				if(itemArr[i].canViewScreenplay=='1'){
					var showScan="否";
				}else if((itemArr[i].canViewScreenplay=='2')){
					var showScan="是";
				}
				//所属状态
				var showStatus='';
				
				if(itemArr[i].inStatus==1){
					showStatus='离组';
				}else if(itemArr[i].inStatus==2){
					showStatus='在组';
				}else if(itemArr[i].inStatus==3){
					showStatus='拒绝邀请';
				}else if(itemArr[i].inStatus==4){
					showStatus='邀请中';
				}
				var role;	
				if(itemArr[i].isCreate==2){					
					role="创建者";
				}else if(itemArr[i].isAdmin==2){
					role = "管理员";
				}else if(itemArr[i].isLeader==2){
					role="部门长";
				}else{
					role="成员";
				}		
				node +=  "<tr class='tblRows'>"
							+"<td class='index'>"
								+number
							+"</td>"
							+"<td class='hotelTableTime'>"
								+itemArr[i].realName
							+"</td>"
							+"<td>"+genderName+"</td>"
							+"<td>"+itemArr[i].mobile+"</td>"
							+"<td>"+mobileStatusShow+"</td>"
							+"<td>"+itemArr[i].jobs+"</td>"
							+"<td>"+itemArr[i].idNumber+"</td>"
							+"<td>"+role+"</td>"
							+"<td>"+showStatus+"</td>"
							+"<td>"+showScan+"</td>"
							+"<td>"+(itemArr[i].inDate == null ? '' : itemArr[i].inDate)+"</td>"
							+"<td>"+(itemArr[i].leaveDate == null ? '' : itemArr[i].leaveDate)+"</td>"
							+"<td>"
								+"<span class='editMem' id='"+itemArr[i].mobile+"'>编辑</span> |"
								+"<span class='deleteMember' id='del_ "+itemArr[i].mobile+"'>删除</span>"
							+"</td>"
						+"</tr>"				
			}
			$(".showMemberList").html(node);
			
			$(".editMem").click(function(index){
				initMemberInfoForm($(this).attr("id"));
			});
			
			$(".deleteMember").click(function(index){
				if(confirm("是否删除该成员")){
					deleteMember($(this).attr("id"));	
				}				
			});
						
	}	
	//删除剧组成员
	function deleteMember(deleteId){
		var deleteArr = deleteId.split("_")
		var mobile = deleteArr[1];
		var deleteMember = {
			url : '/api/proxy',
			dataType:'json',
			type:'POST',
			data:{
				targetUrl:'/staff/removemember',
				staffId:staffId,				
				mobile:mobile,					
			},
			success:function(data){				
				if(data.code==0){
					window.location.reload();					
				}else{
					alertMsg(data.msg);
				}				
			},
			error:function(){
				alertMsg("网络出错,删除失败");
			}
		}
		ajaxPost(deleteMember);	
	}
	//------------------日期插件--------------
	laydate({
		elem:'#in_date'  //input idName
	});
	
	laydate({
		elem:'#leave_date'  //input idName
	});
	
	$("#closeAddMember").click(function(){
		$(".meng,.addMember").css({'display':'none'})
	})
	$("#closeEditDiv").click(function(){
		$(".meng,.editMember").css({'display':'none'})
	})
	
	//计算日期
	function  DateDiff(sDate1,  sDate2){    //sDate1和sDate2是2006-12-18格式  
       var  aDate,  oDate1,  oDate2,  iDays  
       aDate  =  sDate1.split("-")
		iDays=sDate2.split("-");
       
       var oDate1 = new Date(Date.UTC(aDate[0],aDate[1],aDate[2]));
	   var oDate2 = new Date(Date.UTC(iDays[0],iDays[1],iDays[2]));	   
       iDays  =  parseInt(Math.abs(oDate1  -  oDate2)  /  1000  /  60  /  60  /24)    //把相差的毫秒数转换为天数  
       return  iDays  
   } 
   //计算天数
	function calculateDay(){
		var s1 = $("#hotel_in_date").val();
		var s2 = $("#hotel_leave_date").val();
		if(s1.length>0 && s2.length>0){
		var dayNum = DateDiff(s1,s2);			
			$("#hotel_daynum").val(dayNum);
		}
		
	}
	
	//获取默认职务列表
	var defaultresignlist  = {
		url : '/api/proxy',
		dataType:'json',
		type:'POST',
		async:false,
		data:{
			targetUrl:'/organization/defaultresignlist',
		},
		success:function(data){
			var item = data.data.list;
			
			var node1 = '';		
			for(var i=0;i<item.length;i++){
				node1 +="<div class='jobItem off'>"
					+"<h5>"+item[i]+"</h5></div>"					
			}
			$("#jobNameSelect .jobSection").html('');		
			$("#jobNameSelect .jobSection").html(node1);
			
		}
	}
	
	//获取已经添加职务列表
	var getresignlist = {
		url : '/api/proxy',
		dataType:'json',
		type:'POST',
		async:false,
		data:{
			targetUrl:'/organization/getresignlist',
			staffid:staffId,
		},
		success:function(data){
			var node = '';
			var item1 = data.data.list;	
			if(item1){
				for(var i=0;i<item1.length;i++){
					node +="<div class='jobItem off'>"
					+"<h5>"+item1[i]+"</h5><i class='memItem_close'></i></div>"					
				}
				$("#jobNameSelect .jobSection").append(node);
			}				
			selectJobNameDiv();
			deleteJobName();
		}
	}	
})

function searchMember() {
	var keyword = $("#keyword").val();
	location.href="/web/mem_lists_search?staffId="+staffId+"&keyword="+encodeURIComponent(encodeURIComponent(keyword));	
}