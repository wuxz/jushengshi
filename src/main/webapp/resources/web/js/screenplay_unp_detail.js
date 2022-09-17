var id = getParameterByName('id');
$(document)
    .ready(
        function() {
            loadDiffSceen(true);
            $('.diff').click(
                function() {
                    $(this).addClass('active').siblings().removeClass('active');
                });
            $('.now').click(function() {
                loadDiffSceen(true);  
                $('.sence').attr('disabled',false);
                $('.contShow textarea').attr('disabled',false);
                $('.day_night').attr('disabled',false);
                $('.screenplaySide').attr('disabled',false);             
            });
            $('.prev').click(function() {
                loadDiffSceen(false);
                $('.sence').attr('disabled',true);
                $('.contShow textarea').attr('disabled',true);
                $('.day_night').attr('disabled',true);
                $('.screenplaySide').attr('disabled',true);               
            });

            

            function loadDiffSceen(isNow) {
                var options = {
                    url: '/api/screenplay_detail',
                    dataType: 'json',
                    beforeSend: function(request) {
                        request.setRequestHeader("staffId", staffId);
                    },
                    async:false,
                    data: {
                        staffId:staffId,
                        id: id
                    },
                    success: function(data) {console.log(data)
                        if (data.code == 0) {
                            var diff_status = data.data.data.diff_p_status;console.log(diff_status)
                            var contents = isNow ? data.data.data.nowcontent : data.data.data.precontent;
                            switch (diff_status) {
                                case '1':
                                    $('.contTblHead').hide();
                                    $('.sence').attr('disabled',false);
                                    $('.contShow textarea').attr('disabled',false);
                                    $('.day_night').attr('disabled',false);
                                    $('.screenplaySide').attr('disabled',false);
                                    break;
                                case '2':
                                    $('.contTblHead').show();
                                    $('#add').show();
                                    $('.diff').hide();
                                    $('#delete').hide();
                                    $('.sence').attr('disabled',false);
                                    $('.contShow textarea').attr('disabled',false);
                                    $('.day_night').attr('disabled',false);
                                    $('.screenplaySide').attr('disabled',false);
                                    break;
                                case '3':
                                    $('.contTblHead').show();
                                    $('#add').hide();
                                    $('#delete').hide();
                                    break;
                                case '4':
                                    $('.contTblHead').show();
                                    $('#delete').show();
                                    $('.diff').hide();
                                    $('#add').hide();
                                    $('.sence').attr('disabled',true);
                                    $('.contShow textarea').attr('disabled',true);
                                    $('.day_night').attr('disabled',true);
                                    $('.screenplaySide').attr('disabled',true);
                                    contents = data.data.precontent;
                                    break;
                            }
                            $('.contShow textarea').height(0);
                            $('.contShow textarea').html(contents);
                            $('.contShow textarea').height($('.contShow textarea')[0].scrollHeight);//textarea高度自适应
                            $('.roundScene').html(data.data.data.round);
                            $('.sence').val(data.data.data.scene);
                            $('#day'+data.data.data.day_night).attr('selected','true');
                            $('#side' + data.data.data.side).attr('selected','true');
                            if (data.data.data.prev > 0) {
                                $("#prevBtn").click(function() {
                                    document.location = "screenplay_unp_detail?staffId=" + staffId + "&id=" + data.data.data.prev;
                                });
                            }else if(data.data.data.prev == 0){
                                $("#prevBtn").hide();
                            }

                            if (data.data.data.next > 0) {
                                $("#nextBtn").click(function() {
                                    document.location = "screenplay_unp_detail?staffId=" + staffId + "&id=" + data.data.data.next;
                                });
                            }else if(data.data.data.next==0){
                                $("#nextBtn").hide();
                            }
                        } else {
                            alertMsg(data.msg);
                        }
                    },
                    error: function(data) {
                        alertMsg(data.msg);
                    }
                }
                ajaxPost(options);
            }

            function saveModifyStaff(){
                var options = {
                    url:'/api/save_screenplay_round',
                    dataType:'json',
                    type:'POST',
                    data: {
                        staffId:staffId,
                        scene: $('.sence').val(),
                        dayNight:$('.day_night').val(),
                        side:$('.screenplaySide').val(),
                        content:$('.contShow textarea').val(),
                        id:id
                    },
                    success:function(data){console.log(data)
                        if(data.code==0){
                            window.location.reload();
                        }else{
                            alertMsg(data.msg);
                        }
                    },
                    error:function(data){
                        alertMsg(data.msg);
                    }
                }
                ajaxPost(options);
            }
            $('.sence').change(function(){
                saveModifyStaff();
            });
            $('.day_night').change(function(){
                saveModifyStaff();
            });
            $('.screenplaySide').change(function(){
                saveModifyStaff();
            });
            $('.contShow textarea').change(function(){
                saveModifyStaff();
            });

        });
