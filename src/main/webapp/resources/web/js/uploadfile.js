$(document)
    .ready(
        function() {
            var cont = 1;
            var version = null;

            var uploadId = "_upload_id";
            $('#uploadPrompt .close').click(function(){
				$(this).parents('.uploadPrompt').hide();
				$(this).parents('.meng').hide();
			})
            $('#uploadScreenplay')
                .ajaxfileupload({
                    'action': '/api/upload_juben',
                    'valid_extensions': ['doc', 'docx',
                        'pdf', 'txt', 'zip', 'rar'
                    ],
                    'params': {
                        'staffId': staffId
                    },
                    'onComplete': function(data) {
                        $("#" + uploadId).remove();

                        if (data.code == 0) {
                            $('.uploadBox').show();
                            var itemArr = data.data.items;
                            if (data.data.juBenType == 2) {
                                $('.upload').show();
                                initPartBox();

                                for (var i = 0; i < itemArr.length; i++) {
                                    $(
                                            '#fn' + (itemArr[i].ji - 1))
                                        .html(
                                            itemArr[i].fileName);
                                    $(
                                            '#fn' + (itemArr[i].ji - 1))
                                        .siblings(
                                            '.upStatus')
                                        .attr('src',
                                            '/resources/web/images/uploadSuc.png');
                                }
                            } else if (data.data.juBenType == 1) {
                                var imgUrl = '/resources/web/images/uploadSuc.png';
                                creatFilmBox(staffName,
                                    imgUrl);
                                $('.filmFileName')
                                    .html(
                                        itemArr[0].fileName);

                            }
                        } else {
                            alertMsg(data.msg)
                        }
                        // $('#uploadScreenplay').unwrap('form');
                        cont++;

                        // $('#uploadScreenplay').replaceWith('<input
                        // type="file" style="display:
                        // none;title=' + cont + '"
                        // id="uploadScreenplay"
                        // name="juBenFile"
                        // accept=".pdf,.doc,.docx,.txt,.zip,.rar">');
                    },
                    'onStart': function() {
                        console.log('start');
                        $("#uploadPrompt").hide();
                        $("#uploadPrompt").parent('.meng').hide();
                        createLoad(uploadId);
                    },
                    'onCancel': function() {
                        console.log('cancel');
                        $("#" + uploadId).remove();
                    }
                });
            $('.uploadBox').delegate('.uploadClose', 'click',
                function() {
                    // cont++;
                    // $('#uploadScreenplay').replaceWith('<input
                    // type="file" style="display: none;title=' +
                    // cont + '" id="uploadScreenplay"
                    // name="juBenFile"
                    // accept=".pdf,.doc,.docx,.txt,.zip,.rar">');
                    $('.uploadBox').hide();
                    $('.upload').hide();
                    $('.showPartSection').empty();
                    $(this).parent('.filmBox').remove();
                })
            $('#upload-cancel').click(function() {
                cont++;
                // $('#uploadScreenplay').replaceWith('<input
                // type="file" style="display: none;title=' + cont + '"
                // id="uploadScreenplay" name="juBenFile"
                // accept=".pdf,.doc,.docx,.txt,.zip,.rar">');
                $('.uploadBox').hide();
                $('.upload').hide();
            });
            $('#cancelUpload').click(function() {
                $("#uploadPrompt").hide();
                $("#uploadPrompt").parent('.meng').hide();
            });
            $('#uploadBtn').click(function() {
            	$("#uploadPrompt").parent('.meng').show();
                $("#uploadPrompt").show();
            });
            $('.uploadBox').delegate('#filmCancel', 'click',
                function() {
                    cont++;
                    // $('#uploadScreenplay').replaceWith('<input
                    // type="file" style="display: none;title=' +
                    // cont + '" id="uploadScreenplay"
                    // name="juBenFile"
                    // accept=".pdf,.doc,.docx,.txt,.zip,.rar">');
                    $('.uploadBox').hide();
                    // $('#uploadScreenplay').val("");
                })
            $('#upload-sure').click(function() {
                finishUpload();
            });
            $('.uploadBox').delegate('#filmSure', 'click', function() {
                finishUpload();
            });
            $('#publishBtn').click(function() {
                publish();
            });
        });

function creatFilmBox(staffName, url) {
    var node = '<div class="filmBox"><h3>上传剧本</h3><img src="/resources/web/images/homeclose.png" class="uploadClose close"><div class="filmSection"><h4 class="staffName">' + staffName + '</h4><img src=' + url + '><h5 class="filmFileName"></h5>' + '</div><div class="uploadFoot"><button id="filmCancel">取消</button><button id="filmSure">确定</button></div></div>'
    $(".uploadBox").append(node);
    $('.uploadClose').hover(function() {
        $(this).attr('src', '/resources/web/images/closeHover.png');
    }, function() {
        $(this).attr('src', '/resources/web/images/homeclose.png');
    });
}

function finishUpload() {
    var options = {
        url: '/api/parse_juben',
        dataType: 'json',
        data: {
            staffId: staffId
        },
        success: function(data) {
            if (data.code == 0) {
                $('.uploadBox').hide();
                $('.upload').hide();
                window.location.href = "juben_unpublished?staffId=" + staffId;
            } else {
                alertMsg(data.msg);
				$('.uploadBox').hide();
                $('.upload').hide();
            }
        },
        error: function() {
            alertMsg(data.msg);
			$('.uploadBox').hide();
            $('.upload').hide();
        }
    };

    ajaxPost(options);
}

function getHistory() {
    var options = {
        url: '/api/juben_history',
        dataType: 'json',
        data: {
            staffId: staffId
        },
        success: function(data) {
            if (data.code == 0) {
                alertMsg(JSON.stringify(data));
            } else {
                alertMsg(data.msg);
            }
        },
        error: function() {
            alertMsg(data.msg);
        }
    };

    ajaxPost(options);
}

function publish() {
    var options = {
        url: '/api/publish_juben',
        dataType: 'json',
        data: {
            staffId: staffId
        },
        success: function(data) {
            if (data.code == 0) {
                alertMsg('发布成功');
                window.location.href = "staff_home?staffId=" + staffId;
            } else {
                alertMsg(data.msg);
            }
        },
        error: function() {
            alertMsg(data.msg);
        }
    };

    ajaxPost(options);
}

function creatPartBox(season, pid, jid) {
    var node = '<div class="partBox"><div class="part"><h4 class="partTitle">' + season + '</h4><img class="upStatus" src="/resources/web/images/uploadErr.png">' + '<p class="uploadfileName" ' + 'id=' + pid + '>' + '</p>' + '<div class="editPart">' + '<label for=' + jid + '>单独上传</label> | ' + '<span>删除</span>' + '</div>' + '<input type="file" name="juBenFile" style="display: none;" id=' + jid + ' accept=".pdf,.doc,.docx,.txt,.zip,.rar"></div></div>';
    $('.showPartSection').append(node);
}

function initPartBox() {
    var sesonText = function(i) {
        return '第' + (i + 1) + '集';
    }
    for (var i = 0; i < 200; i++) {
        var pid = "fn" + i;
        var jid = "ji" + i;
        var season = sesonText(i);
        creatPartBox(season, pid, jid);
    }

    $('.part input')
        .each(
            function(index) {
                // $("#ji"+index).click(function(){
                // console.log(index);
                $(this)
                    .ajaxfileupload({
                        'action': '/api/upload_juben',
                        'valid_extensions': ['doc',
                            'docx', 'pdf', 'txt',
                            'zip', 'rar'
                        ],
                        'params': {
                            staffId: staffId,
                            jiId: index + 1,
                        },
                        'onComplete': function(data) {
                            if (data.code == 0) {
                                var itemArr = data.data.items;
                                for (var i = 0; i < itemArr.length; i++) {
                                    if (index == itemArr[i].ji - 1) {
                                        $('#fn' + index)
                                            .html(
                                                itemArr[i].fileName);
                                        $('#fn' + index)
                                            .siblings(
                                                '.upStatus')
                                            .attr(
                                                'src',
                                                '/resources/web/images/uploadSuc.png');
                                    }
                                }
                            }
                            return false;
                        },
                        'onStart': function() {
                            console.log('start222')
                        },
                        'onCancel': function() {
                            console.log('cancel');
                        }
                    });
                // })
            });

    $('.editPart span')
        .each(
            function(index) {
                var $self = $(this);
                $self
                    .click(function() {
                        var options = {
                            url: '/api/delete_juben',
                            dataType: 'json',
                            data: {
                                staffId: staffId,
                                jiId: index + 1
                            },
                            success: function(data) {
                                if (data.code == 0) {
                                    $self
                                        .parent('.editPart')
                                        .siblings(
                                            '.uploadfileName')
                                        .html('');
                                    $self
                                        .parent('.editPart')
                                        .siblings('.upStatus')
                                        .attr('src',
                                            '/resources/web/images/uploadErr.png');
                                } else {
                                    alertMsg(data.msg);
                                }
                                // $self.parent('.editPart').
                            },
                            error: function() {
                                alertMsg(data.msg);
                            }
                        }

                        ajaxPost(options);
                        console.log('click delete' + index)
                    });

            });
}
