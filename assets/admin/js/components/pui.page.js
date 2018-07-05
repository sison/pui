/*
* @Author: sison.luo
* @Date:   2016-03-28 14:14:05
 * @Last Modified by: sison
 * @Last Modified time: 2018-07-04 19:20:37

    *分页组件*
*/

// 有个bug，部分id 需要加前缀  self.ele.....  // 否则多个分页会冲突


;(function($, window, document, undefined) {

    $.fn.pager = function(options) {
        var defaults = {
            pageIndex: 1,
            pageSize: 10,
            totalItem: 100,
            pageSizeArr: [10, 20, 50, 100] || [10],
            singlePage: false, // 此属性作用在单页切换场景
            url: '',
            action: function() {}
        }
        var opts = $.extend({}, defaults, options);
        return this.each(function() {
            var tempage = new Pages($(this), opts);
            tempage.init(opts.pageIndex, opts.pageSize);
        });
    }
    var Pages = function(ele, opts) {
        this.ele = ele;
        this.opts = opts;
    }
    Pages.prototype.init = function(pi, ps) {
        var self = this;
        self.render(pi, ps);
        self.watch();
        self.callback(pi, ps, self.getTotalPage(ps));
    }
    Pages.prototype.getTotalPage = function(ps) {
        var self = this;
        var totalPage = Math.ceil(self.opts.totalItem / ps);
        totalPage = totalPage === 0 ? 1 : totalPage;
        return totalPage;
    }
    Pages.prototype.getState = function(pi, ps) {
        var self = this;
        var state = self.getTotalPage(pi, ps) == 1 ? 'disabled' : '';
        return state;
    }
    Pages.prototype.render = function(pi, ps) {
        var self = this;
        var state = self.getState(pi, ps);
        var selectHtml = '';
        var selectchk = '';
        for (var i = 0; i < self.opts.pageSizeArr.length; i++) {
            selectchk = self.opts.pageSizeArr[i] === ps ? 'selected' : '';
            selectHtml += '<option value=' + self.opts.pageSizeArr[i] + ' class="ffm fs" ' + selectchk + '>' + self.opts.pageSizeArr[i] + '</option>';
        };
        var renderHTML = '';
        renderHTML += '<ul class="pagUl clearfix">';
        renderHTML += '<li class="pagLi pagNum">';
        renderHTML += '<label class="control-label">共<span class="results sps">' + self.opts.totalItem + '</span>条记录</label>';
        renderHTML += '<span class="sps" id="curpage"></span>/<span class="sps" id="totalpage">1</span>';
        renderHTML += '</li>';
        renderHTML += '<li class="pagLi pagJump">';
        renderHTML += '<div class="form-group">';
        renderHTML += '<div class="btn-group jump-txt">';
        renderHTML += '<label class="control-label"><span class="pdr10">跳转到</span>';
        renderHTML += '<input class="txt" id="thePage" ' + state + ' /><span class="pdl10 pdr10">页</span>';
        renderHTML += '<button type="button" class="btn" id="btnJump" ' + state + '>确定</button>';
        renderHTML += '</label>';
        renderHTML += '</div>';
        renderHTML += '</div>';
        renderHTML += '</li>';
        renderHTML += '<li class="pagLi pagSize">';
        renderHTML += '<div class="form-group">';
        renderHTML += '<label class="control-label">每页显示</label>';
        renderHTML += '<div class="se-border">';
        renderHTML += '<div class="se-hidden">';
        renderHTML += '<select id="sizePage" class="ffm fs">';
        renderHTML += selectHtml;
        renderHTML += '</select>';
        renderHTML += '</div>';
        renderHTML += '</div>';
        renderHTML += '&nbsp;条</div>';
        renderHTML += '</li>';
        renderHTML += '<li class="pagLi pagChg">';
        renderHTML += '<a href="javascript:;" class="ant ' + state + '" id="firstPage">首页</a>';
        renderHTML += '<a href="javascript:;" class="ant ' + state + '" id="prevPage">上一页</a>';
        renderHTML += '<a href="javascript:;" class="ant ' + state + '" id="nextPage">下一页</a>';
        renderHTML += '<a href="javascript:;" class="ant ' + state + '" id="lastPage">末页</a>';
        renderHTML += '</li>';
        renderHTML += '</ul>';
        self.ele.empty().append(renderHTML);
    }
    Pages.prototype.watch = function() {
        var self = this;
        self.ele.find('.pagChg a').on('click', function() {
            var pi = self.ele.find('#curpage').text();
            var ps = self.opts.singlePage ? 1 : self.ele.find('#sizePage').val();
            var tp = self.getTotalPage(ps);
            if (!$(this).hasClass('disabled')) {
                var tp = self.getTotalPage(ps);
                var id = $(this).attr('id');
                switch (id) {
                    case 'firstPage':
                        pi = 1;
                        break;
                    case 'prevPage':
                        pi--;
                        break;
                    case 'nextPage':
                        pi++;
                        break;
                    case 'lastPage':
                        pi = tp;
                        break;
                }
                self.callback(pi, ps, tp);
                self.opts.action(pi, ps);
            }
        });
        self.ele.find('#sizePage').on('change', function() {
            var ps = $(this).val();
            var tp = self.getTotalPage(ps)
            self.callback(1, ps, tp);
            self.opts.action(1, ps);
        });
        self.ele.find('#thePage').keyup(function() {
            $(this).val($.trim($(this).val()));
            var ps = parseInt($('#sizePage').val());
            var tp = self.getTotalPage(ps);
            var selfval = $.trim($(this).val());
            var regIndex = /^[1-9]\d*$/;
            if (selfval === '') {
                $(this).removeClass('error');
                self.ele.find('#btnJump').prop('disabled', false);
            } else {
                if (regIndex.test(selfval) && parseInt(selfval) <= tp) {
                    $(this).removeClass('error');
                    self.ele.find('#btnJump').prop('disabled', false);
                } else {
                    $(this).addClass('error');
                    self.ele.find('#btnJump').prop('disabled', true);
                }
            }
        });
        self.ele.find('#btnJump').on('click', function() {
            var pi = parseInt($('#thePage', self.ele).val());
            var ps = parseInt($('#sizePage', self.ele).val());
            var tp = self.getTotalPage(ps);
            var thePage = $('#thePage', self.ele);
            if (isNaN(thePage.val()) || $.trim(thePage.val()) == '') {
                ceng.msg('请输入页码', {
                    state: 'notice',
                    end: function() {
                        thePage.focus();
                    }
                });
            } else {
                self.callback(pi, ps, tp);
                self.opts.action(pi, ps);
            }
        })
    }
    Pages.prototype.callback = function(pi, ps, tp) {
        var self = this;
        if (pi >= tp) {
            pi = tp;
            self.ele.find('#nextPage, #lastPage').addClass('disabled');
            if (tp > 1) {
                self.ele.find('#prevPage, #firstPage').removeClass('disabled');
            }
        }
        if (pi < tp && pi > 1) {
            self.ele.find('.pagChg a').removeClass('disabled');
        }
        if (pi <= 1) {
            pi = 1;
            self.ele.find('#prevPage, #firstPage').addClass('disabled');
            if (tp > 1) {
                self.ele.find('#nextPage, #lastPage').removeClass('disabled');
            }
        }
        self.renderCallback(pi, ps);
    }
    Pages.prototype.renderCallback = function(pi, ps) {
            var self = this;
            var cpi = self.opts.totalItem === 0 ? 1 : pi;
            var tp = self.getTotalPage(ps);
            self.ele.find('#curpage').text(cpi);
            self.ele.find('#totalpage').text(tp);
        }
        // Pages.prototype.getContent = function(pi, ps){
        //  var self = this;
        //  var loading;
        //  var data = {
        //      pageIndex: pi,
        //      pageSize: ps
        //  }
        //  $.ajax({
        //      url: self.opts.url,
        //      type: 'GET',
        //      dataType: 'html',
        //      data: data,
        //      beforeSend: function(){
        //          loading = layer.load();
        //      },
        //      success: function(d){
        //          layer.close(loading);
        //          self.renderCallback(pi, ps);
        //          self.opts.action(d);
        //      },
        //      error: function(xhr, status, errth){
        //          console.log(xhr.status);
        //          console.log(xhr.readyState);
        //          console.log(status);
        //      }
        //  });
        // }

    function isInteger(num) {
        return Math.floor(num) === num;
    }


})(jQuery, window, document);
