$(document).ready(function(){
	var currPage = -1;
	var pageSize = 20;
	//------------------获取最新发布列表---------------
	loadLatestPublishedList(true, null, null, null);
	$("#btn_prev").click(function() {
		loadLatestPublishedList(false, null, null, null);
		$('.deleSt').remove();
	});
	$("#btn_next").click(function() {
		loadLatestPublishedList(true, null, null, null);
		$('.deleSt').remove();
	});
	
	function creatDeleTbn(param1){
		$('.descBtnBox').prepend('<button class="deleSt">删除</button>');
		$('.descBtnBox').show();
		$('.deleSt').click(function(){
			var options = {
				url : '/api/delete_screenplay',
				dataType:'json',
				data:{
					staffId:staffId,
					version:param1.data.list[0].version
				},
				success:function(data){
					if(data.code==0){
						window.location.reload();
					}else{
						alertMsg(data.msg);
					}
				},
				error:function(data){
					alertMsg('请稍后重试')
				}
			}
			if(param1.data.list.length>0){
				ajaxPost(options);
			}		
		});
	}
	function insertTr(len, parentNode) {
		var node = '';
		for (var i = 0; i < len; i++) {
			node += '<tr class="tblRows"><td class="screenplayList latestList"><a href=""></a><div class=""></div></td><td class="tblTime"></td><td class="side"></td></tr>';
		}
		parentNode.append(node);
	}
	function loadLatestPublishedList(isNext, v_day_night, v_side, v_status) {
		var day_night = 0;
		var side = 0;
		var status = 0;

		// if (!keyword) {
		if (v_day_night == null) {
			day_night = $("#screenSelectTime").find('.select').attr('data');
		} else {
			day_night = v_day_night;
		}

		if (v_side == null) {
			side = $("#screenSelectSide").find('.select').attr('data');
		} else {
			side = v_side;
		}

		if (v_status == null) {
			status = $("#screenPlaySeason").find('.select').attr('data');
		} else {
			status = v_status;
		}

		var newScreenplayList = {
			url : '/api/screenplay_list',
			dataType : 'json',
			beforeSend : function(request) {
				request.setRequestHeader("staffId", staffId);
			},
			data : {
				staffId : staffId,
				isPublished : false,
				dayNight : day_night,
				side : side,
				status : status,
				beginPage : (isNext ? ++currPage : --currPage),
				pageSize : pageSize,
			},
			success : function(data) {console.log(data)
				showSearchHtml(data);
			},
			error : function(data) {
				alertMsg(data.msg);
			}
		};

		ajaxPost(newScreenplayList);

	}
	function showSearchHtml(data) {
		if (data.code == 0) {
			$('.newScreen tbody').html('');
			var listArr = data.data.list;
			var length = listArr.length;
			var sideArr=['内场','外场','其它'];
			var dayArr = ['日','夜','晨','昏','其他'];
			var statusArr=['未拍摄','未拍完','已拍摄'];
			insertTr(length,$('.newScreen tbody'));
			if(length>0){
				creatDeleTbn(data);
			}
			for(var i=0;i<length;i++){
				var juId = listArr[i].id;
				$('.newScreen tbody tr').eq(i).data('id',juId);
				$('.newScreen tbody tr').eq(i).children('td').eq(0).children('a').html('<a href="/web/screenplay_unp_detail?staffId=' + staffId + '&id=' + listArr[i].id + '">' + listArr[i].round+listArr[i].scene + "</a>");	
				$('.newScreen tbody tr').eq(i).children('td').eq(0).append("<a style='position:absolute;width:100%;height:60px;left:0;top:0;' href="+ '/web/screenplay_unp_detail?staffId=' + staffId+ '&id=' + listArr[i].id+"></a>");
				if(listArr[i].diff_p_status==2){
					$('.newScreen tbody tr').eq(i).children('td').eq(0).children('div').html('新增场');
					$('.newScreen tbody tr').eq(i).children('td').eq(0).children('div').addClass('label newAdd');
				}else if(listArr[i].diff_p_status==3){
					$('.newScreen tbody tr').eq(i).children('td').eq(0).children('div').html('有修改');
					$('.newScreen tbody tr').eq(i).children('td').eq(0).children('div').addClass('label modify');
				}else if(listArr[i].diff_p_status==4){
					$('.newScreen tbody tr').eq(i).children('td ').addClass('delete');
				}	
				$('.newScreen tbody tr').eq(i).children('td').eq(1).html(dayArr[listArr[i].day_night-1]);
				$('.newScreen tbody tr').eq(i).children('td').eq(2).html(sideArr[listArr[i].side-1]);	
			}
			if (currPage == 0) {
				$("#btn_prev").hide();
			} else {
				$("#btn_prev").show();
				$('.descBtnBox').show();
			}
			if (length < pageSize) {
				$("#btn_next").hide();
			} else {
				$("#btn_next").show();
				$('.descBtnBox').show();
			}
		} else {
			alertMsg(data.msg);
		}
	}
});










