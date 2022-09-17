$(document).ready(function(){	
	
	//获取已经创建分组
	function getGroupList(){			
			var saveGroup;
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
						for(i=0;i<saveGroup.length;i++){
							node += "<li data='"+i+"' class='groupli'>"+saveGroup[i]+"</li>"
						}
						$("#selectMemAll .selectUl").html(node);
						clickGroupLi()	
					}else{
						saveGroup = [];
					}						
				}												
			}	
			ajaxPost(getGrouplist);
			return saveGroup;
	}
	getGroupList();

	//获取默认分组列表
	var defaultGroup;
	var defaultlist = {
		url : '/api/proxy',
		dataType:'json',
		type:'POST',
		async:false,
		data:{
			targetUrl:'/organization/defaultlist',
		},
		success:function(data){
			if(data.code==0){
				defaultGroup = data.data.list;			
				var selfGroupList = getGroupList();			
				var node = '';	
				if(defaultGroup.length>0){
					for(i=0;i<defaultGroup.length;i++){
						if(selfGroupList.length>0){
							var keyValue = $.inArray(defaultGroup[i],selfGroupList);
							if(keyValue==-1){
								node += "<div class='memoff memItem off'>"				
								+"<h4>"+defaultGroup[i]+"</h4>"
								+"</div>"
							}else{
								node += "<div class='memItem on'>"				
								+"<h4>"+defaultGroup[i]+"</h4>"
								+"</div>"
								selfGroupList.splice($.inArray(defaultGroup[i],selfGroupList),1);
							}
						}else{
							node += "<div class='memoff memItem off'>"				
								+"<h4>"+defaultGroup[i]+"</h4>"
								+"</div>"
						}									
					}
				}	
				
				if(selfGroupList.length>0){
					for(i=0;i<selfGroupList.length;i++){
						node += "<div class='memItem on'>"				
							+"<h4>"+selfGroupList[i]+"</h4>"
							+"</div>"
					}
				}
			
				$(".addGroup .setSection").html('');
				$(".addGroup .setSection").html(node);
			}
			
			
		}
	}
	ajaxPost(defaultlist);
	
	
	
	$("#addGroup").click(function(){
		$(".meng,.addGroup").css({"display":"block"});
		selectGroupDiv();	
	})
		
	//生成暂时性分组DIV
	$("#saveGroupButton").click(function(){
		var selfGroupValue = $("#selfGroup").val();			
		if(selfGroup.length==0){
			$("#selfGroup").addClass('bordercolor');
			return false;
		}
		var node = '';
		node += "<div class='memItem on'>"
				+"<h4>"+selfGroupValue+"</h4><i class='memItem_close'></i>"
				+"</div>"				
		$(".addGroup .setSection").append(node);
		$("#selfGroup").val('');
		delGroupDiv();	
	})
	
	//分组选中状态和非选中状态切换
	function selectGroupDiv(){
		$(".addGroup .setSection .memoff").each(function(index){
			var $self = $(this);		
			$self.click(function(){				
				var bool = $self.hasClass('off');				
				if(bool){
					$self.removeClass('off');
					$self.addClass('on');
				}else{
					$self.removeClass('on');
					$self.addClass('off');
				}				
			});			
		})
	}
	
	//删除本次添加的分组
	function delGroupDiv(){
		$(".addGroup .setSection .memItem .memItem_close").each(function(){
			var $self = $(this)
			$self.click(function(){
				$self.parent('.memItem').remove();
			})
		})
	}
	
	//创建新的分组
	$("#allSaveGroup").click(function(){
		var nowSelfList = getGroupList();
		var nowGroup = [];
		$(".addGroup .setSection .memItem").each(function(){
			var $self = $(this)			
			var bool = $self.hasClass("on");			
			if(bool){				
				nowGroup.push($self.find('h4').html());				
			}			
		})		
		if(nowSelfList.length>0){			
			for(i=0;i<nowSelfList.length;i++){				
				var paiwei  = $.inArray(nowSelfList[i],nowGroup);				
				if(paiwei==-1){					
					continue;
				}else{
					nowGroup.splice(paiwei,1);
				}
			}
		}			
		if(nowGroup.length>0){			
			for(i=0;i<nowGroup.length;i++){					
				addApiGroup(nowGroup[i])					
			}
		}
		ajaxPost(defaultlist);
		$(".meng,.addGroup").css({"display":"none"});
		$("#selectMemAll .selectUl").css("display","block");			
	})
	/*
	function deleteGroup(oname){
		//删除分组弹窗						
		var delGroup = {
			url : '/api/proxy',
			dataType:'json',
			type:'POST',
			data:{
				targetUrl:'/organization/dissolutiondept',
				staffid:staffId,
				oname:oname,
			},
			success:function(data){				
			}
		}
		ajaxPost(delGroup);
		
	}*/
	//创建剧组的部门 
	function addApiGroup(group){
		var saveSelfGroup = {
			url : '/api/proxy',
			dataType:'json',
			type:'POST',
			async:false,
			data:{
				targetUrl:'/organization/addsave',
				staffid:staffId,
				organizations:group,
			},
			success:function(data){
				if(data.code!=0){
					alertMsg(data.msg);	
				}	
			},
			error:function(data){
				alertMsg("网络原因，添加分组失败");
			}
		}
		ajaxPost(saveSelfGroup);		
	}	
	//关闭添加分组弹窗
	$("#closeAddGroup").click(function(){
		$(".meng,.addGroup").css({"display":"none"});
		ajaxPost(defaultlist);	
	})
	
	//点击已创建的分组，跳转到分组详细页面
	function clickGroupLi(){
		$("#selectMemAll .selectUl .groupli").unbind('click');
		$("#selectMemAll .selectUl .groupli").click(function(){
			var $self = $(this);
			var groupValue =  $self.attr('data');
			if(groupValue=='all'){
				location.href="/web/member_list?staffId="+staffId;
			}else{
				location.href="/web/member_list_group?staffId="+staffId+"&groupid="+groupValue;	
			}					
		})
	}
	
	
	
})	