/*
* @Author: sison.luo
* @Date:   2016-03-16 14:14:05
* @Last Modified by:   sison.luo
* @Last Modified time: 2016-10-26 18:56:05

    *查询控件*
*/


(function($, window, undefined) {
    var defaults = {
        dateformat: 'YYYY-MM-DD hh:mm:ss',
        async: function() {}
    }

    QueryForm = function(ele, option) {
        this.ele = ele;
        this.opts = $.extend({}, defaults, option);
        this.init();
    };
    QueryForm.prototype.init = function() {
        this.toggleHeightSearch();
        this.toggleDate();
        this.toggleFilterline();
        this.submit();
        this.setOrder();
        this.placeholder('每个关键字占一行 \n姓名1 \n姓名2 \n姓名3');
    };
    QueryForm.prototype.toggleHeightSearch = function() {
        var self = this;
        $('.filter-line', self.ele).each(function() {
            var h = $(this).height();
            if (h > 37) {
                $(this).addClass('more').append('<a class="toggle bgc-gray6"><span>更多</span><i class="ico ico-arrow2"></i></a>');
                $('.toggle', $(this)).on('click', function() {
                    var state = $(this).attr('state') || 1;
                    if (state == 1) {
                        $(this).attr('state', 0).parent().height(h);
                        $(this).addClass('shown').find('span').html('收起');
                    } else {
                        $(this).attr('state', 1).parent().height(32);
                        $(this).removeClass('shown').find('span').html('更多');
                    }
                })
            }
        });
        $('#higherBtn', self.ele).on('click', function() {
            var hsDiv = $(this).closest('.query-form').find('.highSearch');
            if (hsDiv.hasClass('show')) {
                $(this).html('高级搜索');
                $('#IsAdvSearch', self.ele).val(0);
                hsDiv.removeClass('show');
            } else {
                $(this).html('收起高级搜索');
                $('#IsAdvSearch', self.ele).val(1);
                hsDiv.addClass('show');
            }
        });
        return this;
    };
    QueryForm.prototype.toggleDate = function() {
        var self = this;
        //var start = {
        //    dateCell: '#sjt',
        //    format: self.opts.dateformat,
        //    minDate: '1900-01-01 00:00:00',
        //    maxDate: '2099-12-31 23:59:59',
        //    isTime: true,
        //    choosefun: function(datas) {
        //        end.minDate = datas;
        //    }
        //};
        //jeDate(start);
        //var end = {
        //    dateCell: '#ejt',
        //    format: self.opts.dateformat,
        //    minDate: jeDate.now(0),
        //    maxDate: '2099-12-31 23:59:59',
        //    isTime: true,
        //    choosefun: function(datas) {
        //        start.maxDate = datas;
        //    }
        //};
        //jeDate(end);
    };
    QueryForm.prototype.setOrder = function() {
        var self = this;
        $('.setOrder a', self.ele).on('click', function() {
            var str = '';
            var item = $(this).parent();
            var itemo = item.siblings('li');
            var sort = '';
            var sortfield = $(this).attr('sortfield');
            item.addClass('cur');
            itemo.removeClass('cur');
            sort = item.hasClass('all') ? 'desc' : $(this).attr('sort') == 'desc' ? 'asc' : 'desc';
            // if(item.hasClass('all')){
            //     sort = 'desc';
            // }else{
            //     sort = $(this).attr('sort') == 'desc' ? 'asc' : 'desc';
            // }
            $(this).attr('sort', sort).removeClass().addClass(sort);
            self.go();
        });
        return this;
    }
    QueryForm.prototype.toggleFilterline = function() {
        var self = this;
        $('.filter-line', self.ele).each(function() {
            var line = $(this);
            line.on('click', 'a.selectItem', function() {
                if ($(this).hasClass('check')) {
                    if (line.data('type') == 'checkbox') {
                        //debugger;
                        $(this).removeClass('check').find('input').prop('checked', false);
                    }
                } else {
                    $(this).addClass('check').find('input').prop('checked', true);
                    if (line.data('type') == 'radio') {
                        $(this).siblings('a').removeClass('check').find('input').prop('checked', false);
                    }
                }
                if ($(this).closest('.filter-line').attr('id') == 'openDate') {
                    var sjt = $('#sjt');
                    var ejt = $('#ejt');
                    var openDate = $('.filter-line#openDate');
                    var now = '',
                        year, month, day;
                    year = new Date().getFullYear();
                    month = new Date().getMonth() + 1;
                    if (month.toString().length == 1) month = '0' + month;
                    day = new Date().getDate();
                    now = year + '-' + month + '-' + day;
                    // now += ' ';
                    // now += new Date().getHours();
                    // now += ':';
                    // now += new Date().getMinutes();
                    // now += ':';
                    // now += new Date().getSeconds();
                    sjt.val(now);
                    var index = $(this).index();
                    index > 0 ? ejt.val($(this).data('val')) : ejt.val(now);
                }
                if (line.data('immediately') === true) {
                    self.go();
                }
            })
        })
        return this;
    };
    QueryForm.prototype.placeholder = function(message) {
        var self = this;
        var msg = message || '请输入';
        var textarea = $('#hsearchlist', self.ele);
        textarea.addClass('default');
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
        self.ele.on('click', '.condition.button', function(e) {
            var e = event || window.event;
            if (e.preventDefault) {
                e.preventDefault();
            } else {
                e.returnValue = false;
            };
            self.go();
        });
        return this;
    };
    QueryForm.prototype.submit = function() {
        var self = this;
        $('.gosubmit', self.ele).on('click', function() {
            self.go();
        });
        // 下面的方法不支持火狐（坑）
        // self.ele.on('submit', function(e) {
        //     var e = event || window.event;
        //     if (e.preventDefault) {
        //         e.preventDefault();
        //     } else {
        //         e.returnValue = false;
        //     };
        //     self.go();
        // })
        return this;
    };
    QueryForm.prototype.getSerialize = function() {
        var self = this;
        return self.ele.serialize();
    };
    QueryForm.prototype.go = function() {
        var self = this;
        var querystr = Pui.getQuery(self.ele);
        // debugger;
        self.opts.async(querystr);
    }


})(jQuery, window, document);
