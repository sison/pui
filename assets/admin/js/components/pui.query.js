/*
* @Author: sison.luo
* @Date:   2016-03-16 14:14:05
 * @Last Modified by: sison
 * @Last Modified time: 2018-06-28 16:02:19

    ** 查询控件 **
    ** 这块有巨大的优化空间，然而没时间搞了 ** 
*/

;
(function($, window, undefined) {
    var defaults = {
        // dateformat: 'YYYY-MM-DD hh:mm:ss',
        // suppBack: false,
        async: function() {}
    }

    var QueryForm = function(ele, option) {};
    QueryForm.prototype.submit = function() {
        var _this = this;
        $('.gosubmit', _this.ele).on('click', function() {
            // if ($(this).hasClass('simpSubmit')) {
            //     $('textarea', _this.ele).val('');
            // } else {
            //     $('.search-group input', _this.ele).val('');
            // }
            _this.go();
        });
        // 貌似火狐不支持
        // _this.ele.on('submit', function(e) {
        //     var e = event || window.event;
        //     if (e.preventDefault) {
        //         e.preventDefault();
        //     } else {
        //         e.returnValue = false;
        //     };
        //     _this.go();
        // })
    };
    
    QueryForm.prototype.trimVal = function() {
        var _this = this;
        _this.ele.find('input[type="text"], textarea').each(function(){
            var _$this = $(this);
            _$this.val($.trim(_$this.val()))
        })
    }

    QueryForm.prototype.go = function() {
        var _this = this;
        _this.trimVal();
        var querystr = _this.getSerialize();
        // console.log(querystr)
        _this.opts.async(querystr);
    }

    // 高级搜索
    var QueryFormHigher = window.QueryFormHigher = function(ele, option) {
        this.ele = ele;
        this.opts = $.extend({}, defaults, option);
        this.stags = $('.search-tags', this.ele)
        this.filter = $('.page-filter', this.ele)
        this.init();
    }
    QueryFormHigher.prototype = new QueryForm();

    QueryFormHigher.prototype.init = function() {
        this.toggleHeightSearch();
        this.responFilterline();
        this.submit();
        this.initTags();
        this.initDate();
        // this.setOrder();
        // this.placeholder('每个关键字占一行 \n姓名1 \n姓名2 \n姓名3');
        this.placeholder();
        var _this = this;
        setTimeout(function(){
            _this.setTags();
        },100)
    };
    QueryFormHigher.prototype.toggleHeightSearch = function() {
        var _this = this;
        $('.filter-line', _this.ele).each(function() {
            var h = $(this).height();
            if($(this).hasClass('withSelect') || $(this).hasClass('date')){
                return
            }else {
                if (h > 45) {
                    $(this).addClass('more').append('<a class="toggle bgc-gray6"><span>更多</span><i class="ico ico-arrow2"></i></a>');
                    $('.toggle', $(this)).on('click', function() {
                        var state = $(this).attr('state') || 1;
                        if (state == 1) {
                            $(this).attr('state', 0).parent().height(h);
                            $(this).addClass('shown').find('span').html('收起');
                        } else {
                            $(this).attr('state', 1).parent().height(28);
                            $(this).removeClass('shown').find('span').html('更多');
                        }
                    })
                }
            }
        });
        var higherHeight = $('.highSearchInner', _this.ele).height();
        // _this.ele
        //     .on('click', '#foldDownBtn', function() {
        //         $('.highSearch').addClass('higher').animate({ 'height': higherHeight }, 300, function() {
        //             $('.attach-search').slideUp(200);
        //         });
        //         $("input[name='hidIsAdvSearch']").val(1);
        //     })
        //     .on('click', '#foldUpBtn', function() {
        //         $('.highSearch').removeClass('higher').animate({ 'height': 0 }, 300, function() {
        //             $('.attach-search').slideDown(200);
        //         });
        //         $("input[name='hidIsAdvSearch']").val(0);
        //     })
        //     // .on('blur', '.highSearch textarea', function() {
        //     //     if ($.trim($('.highSearch textarea').val()) != '') {
        //     //         $('.highSearch textarea').removeClass('default').addClass('c-gray1');
        //     //     } else {
        //     //         $('.highSearch textarea').removeClass('c-gray1').addClass('default');
        //     //     }
        //     // })
        //     .on('focus', '.highSearch textarea', function() {
        //         $('.highSearch textarea').removeClass('default');
        //     });
        return this;
    };
    QueryFormHigher.prototype.setOrder = function() {
        var _this = this;
        $('.setOrder a', _this.ele).on('click', function() {
            var str = '';
            var item = $(this).parent();
            var sort = '';
            var sortfield = $(this).attr('sortfield');
            item.addClass('cur').siblings('li').removeClass('cur');
            if ($(this).hasClass('desc')) {
                $(this).removeClass('desc').addClass('asc');
                sort = 'asc';
            } else {
                $(this).removeClass('asc').addClass('desc');
                sort = 'desc';
            }
            $('input[name="sort"]', _this.ele).val(sortfield + ' ' + sort);
            _this.go();
        });
        return this;
    };
    QueryFormHigher.prototype.setTags = function(){
        var _this = this;
        $('.page-tags', _this.stags).empty()
        var isReqShowTags = false;
        var tagsHtml = ''
        $('.page-filter .filter-line').each(function(){
            var $this = $(this);
            var $id = '#' + $this.attr('id')
            if($this.hasClass('tag')){
                if($this.hasClass('date')){ // 日期
                    var hasshowcurli = false;
                    $this.find('.txtdater').each(function(){
                        if($(this).val() != ''){
                            if(!hasshowcurli){
                                hasshowcurli = true;
                                isReqShowTags = true;
                                tagsHtml += '<li><a>'+ $this.find('.flkey').text().replace(/：/, '') +'</a><i class="icon icon-close fs ant" ref-id="'+ $id +'" ref-type="date"></i></li>'    
                            }
                        }
                    })
                }else { // 常规条件
                    $this.find('.selectItem a.check').each(function(){
                        var $index = $(this).index();
                        if(!$(this).hasClass('sall')){
                            isReqShowTags = true;
                            tagsHtml += '<li><a>'+ $(this).text() +'</a><i class="icon icon-close fs ant" ref-id="'+ $id +'" ref-index="'+ $index +'"></i></li>'
                        }
                    })
                }
            }
        })
        tagsHtml += '<li><a href="javascript: void(0)" class="reset">重置条件</a></li>'
        $('.page-tags', _this.stags).append(tagsHtml)
        _this.stags.toggle(isReqShowTags)
    }
    QueryFormHigher.prototype.initTags = function(){
        var _this = this;
        _this.stags.on('click', '.icon-close', function(e){
            e.cancelBubble = true;
            e.stopPropagation();
            var $id = $(this).attr('ref-id');
            if($(this).attr('ref-type') == 'date'){
                $($id).find('a').eq(0).click()
            }else {
                var $index = parseInt($(this).attr('ref-index'))
                $($id).find('a').eq($index).click()
            }
        })
        _this.stags.on('click', '.reset', function(e){
            e.cancelBubble = true;
            e.stopPropagation();
            // 重置所有条件
            $('.filter-line', _this.filter).each(function(){
                var _as = $(this).find('.selectItem a')
                _as.removeClass('check').children('input').prop('checked', false)
                _as.eq(0).addClass('check').children('input').prop('checked', true)
                if($(this).hasClass('date')){
                    $(this).find('.txtdater').val('')
                }
            })
            _this.stags.slideUp(200, function(){
                $('.page-tags', _this.stags).empty()
                setTimeout(function(){
                    _this.go()
                },100)
            })
            
        })
    }



    QueryFormHigher.prototype.initDate = function(){
        var _this = this;
        $('#runSjt').daterSmart({
            format: 'YYYY-MM-DD',
            maxDate: $("#runEjt"),
            onselect: function (o) {
                _this.selectDater(o)
            },
            onclear: function (o) {
                _this.clearDater(o)
            }
        });
        $('#runEjt').daterSmart({
            format: 'YYYY-MM-DD',
            minDate: $("#runSjt"),
            onselect: function (o) {
                _this.selectDater(o)
            },
            onclear: function (o) {
                _this.clearDater(o)
            }
        });
        $('#finishSjt').daterSmart({
            format: 'YYYY-MM-DD',
            maxDate: $("#finishEjt"),
            onselect: function (o) {
                _this.selectDater(o)
            },
            onclear: function (o) {
                _this.clearDater(o)
            }
        });
        $('#finishEjt').daterSmart({
            format: 'YYYY-MM-DD',
            minDate: $("#finishSjt"),
            onselect: function (o) {
                _this.selectDater(o)
            },
            onclear: function (o) {
                _this.clearDater(o)
            }
        })
    }
    QueryFormHigher.prototype.responFilterline = function() {
        var _this = this;
        // 修改日期重置状态
        // $('#sjt, #ejt', _this.ele).on('change', function() {
        //     if ($(this).val() == '') {
        //         $('#divRuntime a:eq(0)').addClass('check')
        //     }
        //     $('#divRuntime a.check').removeClass('check');
        // });
        $('.txtdater', _this.ele).on('change', function(){
            if ($(this).val() == '') {
                $(this).closest('.filter-line').find('.selectItem a:eq(0)').addClass('check')
            }
            $(this).closest('.filter-line').find('.selectItem a').removeClass('check')
        })

        $('.filter-line', _this.ele).each(function() {
            var line = $(this);
            line.on('click', '.selectItem a', function() {
                // 开通时间
                if(line.hasClass('date')){
                    $(this).addClass('check').siblings('a').removeClass('check')
                    if ($(this).data('val') == '') {
                        line.find('.txtdater').val('')
                    } else {
                        // var th = ' 00:00:00';
                        // var tf = ' 23:59:59';
                        th = ''
                        tf = ''
                        var today = line.find('a').eq(1).data('val') + tf;
                        line.find('.txtdater:eq(0)').val($(this).data('val') + th);
                        line.find('.txtdater:eq(1)').val(today);
                    }
                    // 搜索条件
                } else if (line.attr('id') == 'divSField') {
                    $(this).addClass('check').children('input').prop('checked', true);
                    $(this).siblings('a').removeClass('check').children('input').prop('checked', false);
                } else {
                    if ($(this).hasClass('sall')) {
                        $(this).addClass('check').siblings('a').removeClass('check').children('input').prop('checked', false);
                    } else {
                        if ($(this).hasClass('check')) {
                            $(this).removeClass('check').find('input').prop('checked', false);
                            if ($(this).siblings('a.check').length == 0) {
                                line.find('a.sall').addClass('check');
                            }
                        } else {
                            if($(this).hasClass('blackball')){
                                // 值第一位分组，譬如【 通知方式、通知状态 】 11 & 12 互斥，21 & 22 互斥
                                var firstLetter = $(this).children('input').val().substr(0, 1);
                                $('input', line).each(function() {
                                    if ($(this).val().substr(0, 1) == firstLetter) {
                                        $(this).prop('checked', false).parent('a').removeClass('check');
                                    }
                                })
                            }
                            // if($(this).children('input').attr('type') == 'radio'){
                            //     var name = $(this).children('input').attr('name');
                            //     $('input[name='+ name +']').prop('checked', false).parent('a').removeClass('check');
                            // }
                            $(this).addClass('check').children('input').prop('checked', true);
                            line.find('a.sall').removeClass('check');
                        }
                    }
                }
                _this.setTags()
                if (line.data('immediately') === true) {
                    setTimeout(function(){
                        _this.go()
                    },0)
                }
            })
        })
    };
    QueryFormHigher.prototype.placeholder = function() {
        var _this = this;
        // var msg = message || '请输入';
        var textarea = $('#hsearchlist', _this.ele);
        // if($.trim(textarea.val() === '')){
            textarea.addClass('default')
        // }else {
        //     textarea.removeClass('default')
        // };
        textarea
            .on('blur', function() {
                if (textarea.val().length > 0) {
                    textarea.removeClass('default').addClass('c-gray1');
                } else {
                    textarea.removeClass('c-gray1').addClass('default');
                }
            }).on('keydown', function() {
                textarea.removeClass('default');
            });
        _this.ele.on('click', '.condition.button', function(e) {
            var e = event || window.event;
            if (e.preventDefault) {
                e.preventDefault();
            } else {
                e.returnValue = false;
            };
            _this.go();
        });
        return this;
    };
    QueryFormHigher.prototype.getSerialize = function() {
        var _this = this;
        var datastr = '';
        // if (parseInt($('input[name="hidIsAdvSearch"]').val()) === 2) {
        //     $('input[name="keyword"]', _this.ele).val('');
        // } else {
        //     $('#divSField p a').removeClass('check').eq(0).addClass('check').children('input').prop('checked', true);
        //     $('textarea#sfv', _this.ele).val('').text('');
        // }
        datastr = _this.ele.serialize();
        return datastr;
    };
    QueryFormHigher.prototype.selectDater = function(o){
        var _this = this;
        // var isOneChk = false
        o.closest('.filter-line').find('.selectItem a').removeClass('check')
        // as.each(function(){
        //     if(v == $(this).data('val')){
        //         $(this).addClass('check').siblings('a').removeClass('check')
        //         isOneChk = true;
        //         return false
        //     }
        // })
        // if(!isOneChk) {
        // }
        _this.setTags()
        _this.go()
    }
    QueryFormHigher.prototype.clearDater = function(o){
        var _this = this;
        if(o.closest('.daterbox').siblings('.daterbox').find('.txtdater').val() == ''){
            o.closest('.filter-line').find('.selectItem a').eq(0).addClass('check').siblings('a').removeClass('check')
        }
        _this.setTags()
        _this.go()
    }


})(jQuery, window, document);
