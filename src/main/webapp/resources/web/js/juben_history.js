$(document).ready(function(){
	var diffOption = {
		url : '/api/juben_history',
		dataType:'json',
		data:{
			staffId:staffId,
		},
		success:function(data){
			if(data.code==0){
				//console.log(data);
				var dataArr = data.data.list;
				for(var i=0;i<dataArr.length;i++){
					var node = '<tr class="tblRows"><td class="screenplayList ">'
					+dataArr[i].releaseTime+'修改版'
					+'</td><td>'+dataArr[i].modifiedRounds 
					+'</td><td>'+dataArr[i].newRounds 
					+'</td><td>'+dataArr[i].deletedRounds 
					+'</td></tr>'
					$('.juben_history tbody').append(node);
				}
			}else{
				alertMsg(data.msg);
			}
		},
		error:function(data){
			alertMsg(data.msg);
		}
	}
	ajaxPost(diffOption);
});