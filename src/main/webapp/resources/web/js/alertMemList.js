$(document)
    .ready(
        function() {
            ! function(win) {
                win.config = {
                    isShowDepartment: true, // 是否显示部门列表
                    title: '选择审批人',
                    hiddenUserIds: [userId], // 屏蔽的用户ID列表
                    callBack: callFun(), // 回调函数
                    userInfoList: [],
                    initMebList: loadMebList
                        // 初始化
                };

                function loadMebList() {
                    var memOption = {
                        type: 'POST',
                        url: '/api/proxy',
                        dataType: 'json',
                        data: {
                            targetUrl: '/staff/getmemberlist',
                            staffid: staffId
                        },
                        success: function(data) {
                            if (data.code == 0) {
                                createMebParent();
                                var listLen = data.data.list.length;
                                var adminArr = [];
                                var leaderArr = [];
                                var creator = [];
                                var norArr = [];
                                for (var i = 0; i < listLen; i++) {
                                    if (data.data.list[i].userid) {
                                        if ($.inArray(data.data.list[i].userid, config.hiddenUserIds) > -1) {
                                            // 过滤自己和其它人员
                                            continue;
                                        }

                                        if (data.data.list[i].iscreator == 2) {
                                            creator
                                                .push(data.data.list[i]);
                                        } else if (data.data.list[i].isadmin == 2) {
                                            adminArr
                                                .push(data.data.list[i]);
                                        } else if (data.data.list[i].isleader == 2) {
                                            leaderArr
                                                .push(data.data.list[i]);
                                        } else {
                                            norArr
                                                .push(data.data.list[i]);
                                        }
                                    }
                                }
                                var crL = creator.length;
                                var adL = adminArr.length;
                                var leL = leaderArr.length;
                                var noL = norArr.length;
                                createMebList(crL + adL + leL + noL);
                                for (var a = 0; a < crL; a++) {
                                    $('.filtTable tr').eq(a).children(
                                            'td').eq(0).find('span')
                                        .text(creator[a].realname);
                                    $('.filtTable tr').eq(a).children(
                                        'td').eq(1).text(
                                        creator[a].jobnames[0]);
                                    $('.filtTable tr').eq(a).children(
                                        'td').eq(2).text(
                                        creator[a].mobile);
                                    var userInfo = {
                                        userid: creator[a].userid,
                                        userName: creator[a].realname,
                                        userMob: creator[a].mobile,
                                        performers: creator[a].performers,
                                        department: creator[a].onames
                                    }
                                    $('.filtTable tr').eq(a).children(
                                            'td').eq(0).find('input')
                                        .data('userInfo', userInfo);
                                }
                                for (var b = 0; b < adL; b++) {
                                    $('.filtTable tr').eq(b + crL)
                                        .children('td').eq(0).find(
                                            'span')
                                        .text(adminArr[b].realname);
                                    $('.filtTable tr')
                                        .eq(b + crL)
                                        .children('td')
                                        .eq(1)
                                        .text(
                                            adminArr[b].jobnames[0]);
                                    $('.filtTable tr').eq(b + crL)
                                        .children('td').eq(2).text(
                                            adminArr[b].mobile);
                                    var userInfo = {
                                        userid: adminArr[b].userid,
                                        userName: adminArr[b].realname,
                                        userMob: adminArr[b].mobile,
                                        performers: adminArr[b].performers,
                                        department: adminArr[b].onames
                                    }
                                    $('.filtTable tr').eq(b + crL)
                                        .children('td').eq(0).find(
                                            'input').data(
                                            'userInfo',
                                            userInfo);
                                }
                                for (var c = 0; c < leL; c++) {
                                    $('.filtTable tr')
                                        .eq(c + crL + adL)
                                        .children('td')
                                        .eq(0)
                                        .find('span')
                                        .text(leaderArr[c].realname);
                                    $('.filtTable tr')
                                        .eq(c + crL + adL)
                                        .children('td')
                                        .eq(1)
                                        .text(
                                            leaderArr[c].jobnames[0]);
                                    $('.filtTable tr')
                                        .eq(c + crL + adL)
                                        .children('td').eq(2)
                                        .text(leaderArr[c].mobile);
                                    var userInfo = {
                                        userid: leaderArr[c].userid,
                                        userName: leaderArr[c].realname,
                                        userMob: leaderArr[c].mobile,
                                        performers: leaderArr[c].performers,
                                        department: leaderArr[c].onames,
                                    }
                                    $('.filtTable tr')
                                        .eq(c + crL + adL)
                                        .children('td').eq(0).find(
                                            'input').data(
                                            'userInfo',
                                            userInfo);
                                }
                                for (var d = 0; d < noL; d++) {
                                    $('.filtTable tr').eq(
                                            d + crL + adL + leL)
                                        .children('td').eq(0).find(
                                            'span').text(
                                            norArr[d].realname);
                                    $('.filtTable tr')
                                        .eq(d + crL + adL + leL)
                                        .children('td')
                                        .eq(1)
                                        .text(norArr[d].jobnames[0]);
                                    $('.filtTable tr').eq(
                                            d + crL + adL + leL)
                                        .children('td').eq(2).text(
                                            norArr[d].mobile);
                                    var userInfo = {
                                        userid: norArr[d].userid,
                                        userName: norArr[d].realname,
                                        userMob: norArr[d].mobile,
                                        performers: norArr[d].performers,
                                        department: norArr[d].onames,
                                    }
                                    $('.filtTable tr').eq(
                                            d + crL + adL + leL)
                                        .children('td').eq(0).find(
                                            'input').data(
                                            'userInfo',
                                            userInfo);
                                }
                                if (config.isShowDepartment) {
                                    createDepartment();
                                }
                            } else {
                                alertMsg(data.msg);
                            }
                        },
                        error: function(data) {
                            alertMsg('获取失败');
                        }
                    }
                    ajaxPost(memOption);
                }

                function searchMem(keyword) {
                    var options = {
                        url: '/api/search_staff_member',
                        dataType: 'json',
                        type: 'POST',
                        async: false,
                        data: {
                            staffId: staffId,
                            keyword: keyword,
                            inStatus: -2,
                            privilege: -2,
                            canViewScreenplay: -2
                        },
                        success: function(data) {
                            if (data.code == 0) {
                                if (data.data.list.length == 0) {
                                    alertMsg('未查到信息');
                                    return false;
                                }
                                $('.filtTable tbody').empty(); // 清空table内容
                                config.userInfoList.length = 0; // 清空数组
                                var s_resArr = []; // 过滤无userid用户
                                for (var j = 0; j < data.data.list.length; j++) {
                                    if (data.data.list[j].userId) {
                                        s_resArr
                                            .push(data.data.list[j]);
                                    }
                                }
                                createMebList(s_resArr.length);
                                for (var i = 0; i < s_resArr.length; i++) {
                                    $('.filtTable tr').eq(i).children(
                                            'td').eq(0).find('span')
                                        .text(s_resArr[i].realName);
                                    $('.filtTable tr').eq(i).children(
                                        'td').eq(1).text(
                                        s_resArr[i].jobs[0]);
                                    $('.filtTable tr').eq(i).children(
                                        'td').eq(2).text(
                                        s_resArr[i].mobile);
                                    var userInfo = {
                                        userid: s_resArr[i].userId,
                                        userName: s_resArr[i].realName,
                                        userMob: s_resArr[i].mobile,
                                        performers: s_resArr[i].roles,
                                        department: s_resArr[i].teams,
                                    }
                                    $('.filtTable tr').eq(i).children(
                                            'td').eq(0).find('input')
                                        .data('userInfo', userInfo);
                                }
                            } else {
                                alertMsg(data.msg);
                            }
                        },
                        error: function(data) {
                            alertMsg('获取失败');
                        }
                    }
                    ajaxPost(options);
                }

                function createMebList(num) {
                    var node = '';
                    for (var i = 0; i < num; i++) {
                        node = node + '<tr><td><label><input type="checkbox"><span></span></label></td><td style="text-align:center;"></td><td style="text-align:right;"></td></tr>';
                    }
                    $('.filtTable tbody').append(node);
                }

                function createDepartment() {
                    var options = {
                        type: 'POST',
                        url: '/api/proxy',
                        dataType: 'json',
                        data: {
                            targetUrl: '/organization/getlist',
                            staffid: staffId
                        },
                        success: function(data) {
                            if (data.code == 0) {
                                for (var i = 0; i < data.data.list.length; i++) {
                                    $('.checkboxUl')
                                        .append(
                                            '<li><label><input type="checkbox" id="depId' + i + '"><span>' + data.data.list[i] + '</span></label></li>');
                                }
                                $('.checkboxUl li input')
                                    .each(
                                        function() {
                                            $(this)
                                                .change(
                                                    function() {
                                                        var depTit = $(
                                                                this)
                                                            .siblings(
                                                                'span')
                                                            .html();
                                                        if ($(
                                                                this)
                                                            .is(
                                                                ':checked')) {
                                                            $(
                                                                    '.filtTable tr input')
                                                                .each(
                                                                    function() {
                                                                        $self = $(this);
                                                                        var dep = $self
                                                                            .data('userInfo').department;
                                                                        if (dep instanceof Array) {
                                                                            if (dep
                                                                                .indexOf(depTit) >= 0) {
                                                                                $self
                                                                                    .prop(
                                                                                        'checked',
                                                                                        true);
                                                                            }
                                                                        }
                                                                    });
                                                        } else {
                                                            $(
                                                                    '.filtTable tr input')
                                                                .each(
                                                                    function() {
                                                                        $self = $(this);
                                                                        var dep = $self
                                                                            .data('userInfo').department;
                                                                        if (dep instanceof Array) {
                                                                            if (dep
                                                                                .indexOf(depTit) >= 0) {
                                                                                $self
                                                                                    .prop(
                                                                                        'checked',
                                                                                        false);
                                                                            }
                                                                        }
                                                                    });
                                                        }
                                                    })
                                        });

                            } else {
                                alertMsg(data.msg);
                            }
                        },
                        error: function(data) {
                            alertMsg('获取失败')
                        }
                    }
                    ajaxPost(options);
                }

                function createMebParent() {
                    if (config.isShowDepartment) {
                        var node = '<div class="meng" style="display:block;"><div class="pushScreen"><h3 class="m_title"></h3><img src="/resources/web/images/homeclose.png" alt="" class="close"><div class="pushSection clearfix"><div class="filterLeft"><div class="checkDiv"><label><input type="checkbox" id="all"> 全剧组</label></div><div class="checkDiv"><label><input type="checkbox" id="all_work"> 全部工作人员</label></div><div class="checkDiv"><label><input type="checkbox" id="all_performers"> 全部演员</label></div><a href="javascript:;" class="toggleFilt"><i></i> 选择部门</a><ul class="checkboxUl"></ul></div><div class="filterRight"><div class="filtTop clearfix"><span class="searchBox"><input type="text" id="searchN" class="search" placeholder="搜索姓名/职位"><i class="searchBtn" id="sear_Btn"></i>	</div><div class="filtCont"><span>#</span><span>A</span><span>B</span><span>C</span><span>D</span><span>E</span><span>F</span><span>G</span><span>H</span><span>I</span><span>J</span><span>K</span><span>L</span>	<span>M</span><span>N</span><span>O</span><span>P</span><span>Q</span><span>R</span><span>S</span><span>T</span><span>U</span><span>V</span><span>W</span><span>X</span><span>Y</span><span>Z</span></div><div class="filtTable"><table><tbody> </tbody></table></div><div class="btnDiv clearfix"><button class="btn-cancel">取消</button><button id="sendScr" class="btn-t-sure btn-sure">确定</button></div></div></div></div></div>';
                    } else {
                        var node = '<div class="meng" style="display:block;"><div class="select-appr"><h3 class="m_title"></h3><img src="/resources/web/images/homeclose.png" alt="" class="close"><div class="appr-section"><div class="filter"><div class="filtTop clearfix"><span class="searchBox"><input type="text" id="searchN" class="search" placeholder="搜索姓名/职位"><i class="searchBtn" id="sear_Btn"></i></div>			<div class="filtCont"><span>#</span><span>A</span><span>B</span><span>C</span><span>D</span><span>E</span>		  <span>F</span><span>G</span><span>H</span><span>I</span><span>J</span><span>K</span><span>L</span>				<span>M</span><span>N</span><span>O</span><span>P</span><span>Q</span><span>R</span><span>S</span>				<span>T</span><span>U</span><span>V</span><span>W</span><span>X</span><span>Y</span><span>Z</span></div>		<div class="filtTable"><table><tbody> </tbody></table></div><div class="btnBox"><button class="btn-f-5">取消</button><button id="sendScr" class="sendScr btn-t-5">确定</button></div></div></div></div></div>';
                    }
                    $('body').append(node);
                    $('.m_title').text(config.title);
                    $('.close').click(function() {
                        $(this).parents('.meng').remove();
                    });
                    $('.close')
                        .hover(
                            function() {
                                $(this)
                                    .attr('src',
                                        '/resources/web/images/closeHover.png');
                            },
                            function() {
                                $(this)
                                    .attr('src',
                                        '/resources/web/images/homeclose.png');
                            });
                    $('.btn-cancel').click(function() {
                        $(this).parents('.meng').remove();
                    });
                    var arrowD = false;
                    $('#sear_Btn').on('click', function() {
                        searchMem($('#searchN').val());
                    });
                    $('#sendScr')
                        .on(
                            'click',
                            function() {
                                config.userInfoList.length = 0;
                                for (var i = 0; i < $('.filtTable tr input:checked').length; i++) {
                                    var userI = $(
                                            '.filtTable tr input:checked')
                                        .eq(i).data(
                                            'userInfo');
                                    config.userInfoList
                                        .push(userI);
                                }
                                config
                                    .callBack(config.userInfoList); // 回调函数
                                $(this).parents('.meng')
                                    .remove();
                            });
                    if (config.isShowDepartment) {
                        $('.toggleFilt')
                            .click(
                                function() {
                                    $('.checkboxUl')
                                        .slideToggle(0);
                                    if (arrowD) {
                                        $('.toggleFilt')
                                            .children()
                                            .css(
                                                'backgroundImage',
                                                'url(../resources/web/images/arrow.png)');
                                        arrowD = false;
                                    } else {
                                        $('.toggleFilt')
                                            .children()
                                            .css(
                                                'backgroundImage',
                                                'url(../resources/web/images/arrowD.png)');
                                        arrowD = true;
                                    }
                                });
                        $('#all')
                            .change(
                                function() {
                                    if ($('#all')
                                        .is(":checked")) {
                                        $(
                                                '.filtTable tr td input')
                                            .prop(
                                                'checked',
                                                true);
                                    } else {
                                        $(
                                                '.filtTable tr td input')
                                            .prop(
                                                'checked',
                                                false);
                                    }
                                });
                        $('#all_performers')
                            .change(
                                function() {
                                    var a_input = $('.filtTable tr input');
                                    var a_length = $('.filtTable tr input').length;
                                    if ($('#all_performers')
                                        .is(':checked')) {
                                        for (var i = 0; i < a_length; i++) {
                                            if (a_input
                                                .eq(i)
                                                .data(
                                                    'userInfo').performers.length !== 0) {
                                                a_input
                                                    .eq(i)
                                                    .prop(
                                                        'checked',
                                                        true);
                                            }
                                        }
                                    } else {
                                        for (var i = 0; i < a_length; i++) {
                                            if (a_input
                                                .eq(i)
                                                .data(
                                                    'userInfo').performers.length !== 0) {
                                                a_input
                                                    .eq(i)
                                                    .prop(
                                                        'checked',
                                                        false);
                                            }
                                        }
                                    }
                                });
                        $('#all_work')
                            .change(
                                function() {
                                    var a_input = $('.filtTable tr input');
                                    var a_length = $('.filtTable tr input').length;
                                    if ($('#all_work').is(
                                            ':checked')) {
                                        for (var i = 0; i < a_length; i++) {
                                            if (a_input
                                                .eq(i)
                                                .data(
                                                    'userInfo').performers.length == 0) {
                                                a_input
                                                    .eq(i)
                                                    .prop(
                                                        'checked',
                                                        true);
                                            }
                                        }
                                    } else {
                                        for (var i = 0; i < a_length; i++) {
                                            if (a_input
                                                .eq(i)
                                                .data(
                                                    'userInfo').performers.length == 0) {
                                                a_input
                                                    .eq(i)
                                                    .prop(
                                                        'checked',
                                                        false);
                                            }
                                        }
                                    }
                                });
                    }
                }
            }(window);
            // config.initMebList();//初始化函数
            function callFun(arr) { // 回调函数
                console.log(arr);
            }
        });
