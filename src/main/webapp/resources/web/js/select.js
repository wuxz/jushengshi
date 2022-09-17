$(document).ready(function(){
	$(document).delegate('.select','click',function(){
		var $ul = $(this).siblings('.selectUl');
		if($ul.css("display")=="none"){
			$ul.slideDown("fast"); 
		}else{
			$ul.slideUp("fast");
		}
	});
	$(document).delegate('.selectUl li','click',function(){
		var txt = $(this).text(); 
		$(this).parent().siblings(".select").html(txt); 
		var value = $(this).attr("selectid"); 
		$(this).parent().siblings(".select").attr('data', $(this).attr('data'));
		$(this).parent(".selectUl").hide();
	});
	$(document).delegate('.selectUl li','mouseover',function(){
		$(this).css({"background":"#25bfc1","color":"#fff"})
		.siblings().css({"background":"#fff","color":"#000"});
	});
	$(document).delegate('.selectBox','mouseleave',function(){
		$(this).find('.selectUl').slideUp("fast");
	});
	
	

	
});