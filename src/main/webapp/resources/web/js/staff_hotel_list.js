$(document).ready(function(){
	var options = {
		type:'POST',
		url : '/api/list_staff_hotel',
		dataType:'json',
		data:{
			staffId:staffId,
		},
		success:function(data){
			//console.log(data.data);
			if(data.code==0){
				for (var i = 0; i < data.data.list.length; i ++) {
					var item = data.data.list[i];
					html = '<tr class="tblRows"><td class="hotelTableList"><a href="staff_hotel_edit?staffId=' + staffId + '&staffHotelId=' + item.id + '">' + item.name + '</a></td><td class="tblTime hotelTableTime">' + item.createTime + '</td><td></td></tr>';
					$('.roundTbl tbody').append(html);
				}
			}else{
				alertMsg(data.msg);
			}
		},
		error:function(data){
			alertMsg('获取失败');
		}
	}
	
	ajaxPost(options);
});