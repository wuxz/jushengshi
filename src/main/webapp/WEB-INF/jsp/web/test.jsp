<%@ page contentType="text/html;charset=UTF-8" pageEncoding="UTF-8"%>
<%@include file="../app/taglib.jsp"%>
<link rel="stylesheet" href="/resources/app/css/play-detail.css">
<body>
	<script>
	var options = {
			url : '/app/overview',
			dataType:'text',
			type:'POST',
			beforeSend : function(request) {
				request.setRequestHeader("staffId", '1614146359586290');
				request.setRequestHeader("userId", '${userId}');
			},
			data:{
			},
			success:function(data){
				$('#t1').html(data);
			},
			error:function(data){
				alert(data.msg);
			}
		};
	
		$.ajax(options);
	</script>
	<div id='t1'></div>
</body>
</html>