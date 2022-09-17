$(document).ready(function(){
	var options = {
		type:'POST',
		url : '/api/proxy',
		dataType:'json',
		data:{
			targetUrl:'/shootnotice/list',
			staffid:staffId,
			userid:userId 
		},
		success:function(data){//console.log(data.data);
			if(data.code==0){
				var shootList = data.data;
				insertTr(shootList.length,$('.shoot-list tbody'));
				for(var i=0;i<shootList.length;i++){
					$('.shoot-list tbody tr').eq(i).children('td').eq(0).children('span')
						.html('<a href="/web/shoot_notice_detail?staffId='
									+ staffId + '&shoot_notice_id=' + shootList[i].id + '">'
									+ shootList[i].title
									+ "</a>");
					$('.shoot-list tbody tr').eq(i).children('td').eq(0).append("<a style='position:absolute;width:100%;height:60px;left:0;top:0;' href="+ '/web/shoot_notice_detail?staffId=' + staffId+ '&shoot_notice_id=' + shootList[i].id+ "></a>");
					if(shootList[i].status==5){
						$('.shoot-list tbody tr').eq(i).children('td').eq(0).children('div')
						.html('编辑中').addClass('editing');
						$('.shoot-list tbody tr').eq(i).children('td').eq(0).children('span')
						.html('<a href="/web/shoot_notice_new?staffId='
									+ staffId + '&shoot_notice_id=' + shootList[i].id + '">'
									+ shootList[i].title
									+ '</a>');
						$('.shoot-list tbody tr').eq(i).children('td').eq(0).append("<a style='position:absolute;width:100%;height:60px;left:0;top:0;' href='/web/shoot_notice_new?staffId="+ staffId + "&shoot_notice_id=" + shootList[i].id +"'></a>");
					}else if(shootList[i].status==10){
						$('.shoot-list tbody tr').eq(i).children('td').eq(0).children('span')
						.html('<a href="/web/shoot_approve?staffId='
									+ staffId + '&shoot_notice_id=' + shootList[i].id + '">'
									+ shootList[i].title
									+ "</a>");
						$('.shoot-list tbody tr').eq(i).children('td').eq(0).append("<a style='position:absolute;width:100%;height:60px;left:0;top:0;' href='/web/shoot_approve?staffId="+ staffId + "&shoot_notice_id=" + shootList[i].id +"'></a>");
						$('.shoot-list tbody tr').eq(i).children('td').eq(0).children('div')
						.html('审批中').addClass('approve');
					}else if(shootList[i].status==15){
						$('.shoot-list tbody tr').eq(i).children('td').eq(0).children('span')
						.html('<a href="/web/shoot_approve?staffId='
									+ staffId + '&shoot_notice_id=' + shootList[i].id + '">'
									+ shootList[i].title
									+ "</a>");
						$('.shoot-list tbody tr').eq(i).children('td').eq(0).append("<a style='position:absolute;width:100%;height:60px;left:0;top:0;' href='/web/shoot_approve?staffId="+ staffId + "&shoot_notice_id=" + shootList[i].id +"'></a>");
						$('.shoot-list tbody tr').eq(i).children('td').eq(0).children('div')
						.html('被拒绝').addClass('refuse');
						$('.shoot-list tbody tr').eq(i).children('td').eq(0).append("<a style='position:absolute;width:100%;height:60px;left:0;top:0;' href='/web/shoot_approve?staffId="+ staffId + "&shoot_notice_id=" + shootList[i].id + "'>"
									+ shootList[i].title
									+ "</a>");
					}else if(shootList[i].status==20){
						$('.shoot-list tbody tr').eq(i).children('td').eq(0).children('span')
						.html('<a href="/web/shoot_notice_detail?staffId='
									+ staffId + '&shoot_notice_id=' + shootList[i].id + '">'
									+ shootList[i].title
									+ "</a>");
						$('.shoot-list tbody tr').eq(i).children('td').eq(0).children('div')
						.html('已发布').addClass('iSend');
					};
					$('.shoot-list tbody tr').eq(i).children('td').eq(1).html(shootList[i].createtime);
				}
			}else{
				//console.log(data.msg);
			}
		},
		error:function(data){
			alertMsg('获取失败');
		}
	}
	ajaxPost(options);
	function insertTr(len, parentNode) {
		var node = '';
		for (var i = 0; i < len; i++) {
			node = node + '<tr class="tblRows"><td class="noticeList"><span></span><div class="label "></div></td><td class="tblTime noticeTime"></td></tr>';
		}
		parentNode.append(node);
	}
$("#addShootNotice").click(function(){
	location.href="/web/shoot_notice_new?staffId="+staffId
})
	
});