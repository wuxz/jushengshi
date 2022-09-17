$(document).ready(function(){
	function creatJiOption (parent,num){
		var node = '';
		for(var i=1;i<num+1;i++){
			 node  += '<li>'+i+'</li>';
		}
		node = '<ul>'+node+'</ul>';
		parent.append(node);
	}
	creatJiOption($('.jiopt'),200);
	$('.jiopt ul li:first').addClass('ji_checked');
	//------创建场次200个选项方块,为li标签添加类名ji_checked即为选中样式----------
});