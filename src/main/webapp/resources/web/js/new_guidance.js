
$(document).ready(function(){

  function setCookie(name,value,time){
     var  nameId = $.cookie(name);
         console.log(nameId);
       if(typeof(nameId)=='undefined'){
           nameId = "";
       }
       if(nameId.match(userId)){
         $(".cover").hide();
         $("#new_guidance").hide();
       }else{
        var flag = true;
     $("#new_guidance").click(function(){
      if (flag) {
        $(this).css({"background":"url(../../resources/web/images/01.png)"});
         $(this).animate({
          left:"358",
          top:"82"
        },500);
         flag = false;
      } else {
        $(this).hide();
        $(".cover").hide();
        flag = true;
      }
});
      $.cookie(name,value,{expires: 7});
  };
 }
setCookie("userId",userId);
});







