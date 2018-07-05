/*
* @Author: sison.luo
* @Date:   2016-03-16 14:14:05
 * @Last Modified by: sison
 * @Last Modified time: 2018-07-03 18:25:01

    *表格控件*
*/

;(function($, window, undefined) {

    var defaults = {
        bgcCtrl: false,
        hoverColor: '#fff',
        oddColor: '#fff',
        evenColor: '#fff',
        datastyle: 'local',
        dataSource: '',
        queryUrl: '',
        isquery: true,
        queryObj: '$("form")',
        extraStr: '',
        container: '',
        suppBack: false,
        headCtrl: true,
        pageCtrl: true,
        isBase64: false,
        firstLoadCallback: function() {},
        afterLoadCallback: function() {},
        afterPage: function() {},
        afterQuery: function() {}
    }

    var Table = function(ele, tmpl, option) {
        this.opts = $.extend({}, defaults, option);
        this.ele = ele;
        this.tmpl = tmpl;
        this.whattoload = ''; // 触发方式
        this.queryStr = ''
        this.pageStr = '';
        this.finalStr = '';
        this.finalUrl = this.opts.queryUrl;
        this.allowRestoreState = true;
    };

    Table.prototype.init = function() {}

    Table.prototype.afterLoadData = function(ele, fdata) {
        var _this = this;
        _this.opts.afterLoadCallback(ele, fdata);
    }

    Table.prototype.pageControl = function(data) {
        var _this = this;
        var finalData = '';
        if (typeof(data) == 'string') {
            finalData = _this.opts.isBase64 ? JSON.parse(Base64.decode(data)) : JSON.parse(data);
        } else if (typeof(data) == 'object') {
            finalData = _this.opts.isBase64 ? Base64.decode(data) : data;
        }
        if (_this.opts.pageCtrl) {
            var pageTable = _this.ele.closest('.page-table');
            pageTable.find('.makePGbottom').remove();
            pageTable.append('<div class="makePGbottom"><div class="pagination-out"><div class="pagination"></div></div></div>');
            pageTable.find('.pagination').pager({
                totalItem: finalData.TotalRecords || 0,
                pageSize: finalData.PageSize || 10,
                pageIndex: finalData.PageIndex || 1,
                action: function(pi, ps) {
                    // var tempstr = '';
                    // window.manualClick = false;
                    // if (_this.opts.isquery) {
                    //     tempstr += _this.queryStr;
                    // }
                    _this.whattoload = 'page';
                    _this.pageStr = '&pageIndex=' + pi + '&' + 'pageSize=' + ps;
                    if (_this.opts.isquery) {
                        _this.queryStr = _this.opts.queryObj.serialize();
                    }
                    _this.finalStr = _this.queryStr + _this.pageStr + _this.opts.extraStr;

                    if (_this.opts.suppBack) {
                        location.hash = _this.finalStr;
                    } else {
                        _this.ajaxData();
                    }
                }
            })
        }
    }

    Table.prototype.watch = function() {
        var _this = this;
        if (_this.opts.bgcCtrl) {
            $('tbody tr:even', _this.ele).css('backgroundColor', _this.opts.evenColor);
            $('tbody tr:odd', _this.ele).css('backgroundColor', _this.opts.oddColor);
            $('tbody tr', _this.ele).hover(function() {
                oriColor = $(this).css('backgroundColor');
                $(this).css('backgroundColor', _this.opts.hoverColor);
            }, function() {
                $(this).css('backgroundColor', oriColor);
            })
        }
        return this;
    }

    Table.prototype.query = function() {
        var _this = this;
        new QueryFormHigher(_this.opts.queryObj, {
            // suppBack: _this.opts.suppBack,
            async: function(qstr) {
                _this.whattoload = 'query';
                _this.queryStr = qstr;
                _this.pageStr = '';
                _this.finalStr = _this.queryStr + _this.pageStr + _this.opts.extraStr;

                if (_this.opts.suppBack) {
                    _this.allowRestoreState = false;
                    location.hash = qstr;
                    _this.allowRestoreState = true;
                } else {
                    _this.ajaxData();
                }
            }
        })
    }

    Table.prototype.ajaxData = function(option, cb) {
        var _this = this;
        var _cb = typeof(cb) == "function" ? cb : function() {};
        var opts = option || {
            type: ''
        };
        $.ajax({
                type: 'POST',
                cache: false,
                data: _this.finalStr,
                url: _this.finalUrl,
                beforeSend: function() {
                    ceng.loading();
                }
            })
            .done(function(data) {
                _this.loadData(data);
                _this.pageControl(data);
                _cb();
            })
            .fail(function() {})
            .always(function() {
                ceng.closeLoading();
            })
    }

    Table.prototype.reRender = function(success) {
        var _this = this;
        _this.ajaxData({}, success);
    }

    Table.prototype.restoreState = function() {
        var _this = this;
        if (_this.allowRestoreState) {
            var hash = location.hash.slice(1);
            if (hash.length > 0 && hash.indexOf('=') > -1) {
                var urlHashParams = hash.split('&');
                // 初始状态
                // 跟下面无 hash代码一样
                if ($('.filter-line', _this.opts.queryObj)) {
                    $('.filter-line', _this.opts.queryObj).each(function() {
                        var $this = $(this);
                        if($this.hasClass('date')){
                            setTimeout(function(){
                                $this.find('a').each(function(){
                                    if($(this).data('val') == $('.daterstart').val() && $('.daterend').val() == dateYMD()){
                                        $(this).addClass('check').siblings().removeClass('check')
                                    }
                                })
                            },100)
                        }else{
                            $(this).find('a').eq(0).addClass('check').siblings('a').removeClass('check').find('a').prop('checked', false);
                        }
                    })
                };

                // 根据hash key值判断
                $.each(urlHashParams, function() {
                    var temp = this.split('=');
                    var key = temp[0];
                    var value = decodeURIComponent(temp[1]) || '';
                    if (key != '') {
                        if(key == 'StartDate' || key == 'EndDate') {
                            value = value.replace('+', ' ');
                        }
                        if (key == 'pageIndex') {
                            return;
                        // } else if (key == 'isChkAll') {
                        //     return;
                        } else if (key == 'pageSize') {
                            return;
                        } else if (key == 'sort') {
                            // 排序
                            // if (value != '') {
                            //     var varr = value.split('+');
                            //     $('.setOrder a', _this.opts.queryObj).each(function() {
                            //         if ($(this).attr('sortfield') == varr[0]) {
                            //             $(this).removeClass('desc asc').addClass(varr[1]).parent('li').addClass('cur').siblings('li').removeClass('cur');
                            //             return false;
                            //         }
                            //     })
                            // } else {
                            //     $('.setOrder li', _this.opts.queryObj).removeClass('cur').eq(0).addClass('cur');
                            // };
                            return;
                        // } else if (key == 'hidIsAdvSearch') {
                        //     // 是否高级搜索
                        //     var $af = $('.attach-search', _this.opts.queryObj);
                        //     var $hh = $('.highSearch', _this.opts.queryObj);
                        //     if (parseInt(value) === 0) {
                        //         $af.show();
                        //         $hh.height(0).removeClass('higher');
                        //     } else {
                        //         $af.hide();
                        //         $hh.height($('.highSearchInner').height()).addClass('higher');
                        //     };
                        //     return;
                        } else {

                            // 其他存在字段
                            var ele = $('[name=' + key + ']', _this.opts.queryObj);
                            var eleName = ele.get(0).tagName.toLowerCase();
                            switch (eleName) {
                                case 'input':
                                    var type = ele.attr('type').toLowerCase();
                                    if (type == 'checkbox') {
                                        ele.each(function() {
                                            if ($(this).val() == value) {
                                                $(this).prop('checked', true).parent('a').addClass('check').siblings('.sall').removeClass('check');
                                                return false;
                                            }
                                        });
                                        return;
                                    } else if (type == 'radio') {
                                        ele.each(function() {
                                            if ($(this).val() == value) {
                                                $(this).prop('checked', true).parent('a').addClass('check').siblings('a').removeClass('check').find('input').prop('checked', false);
                                            }                                                    
                                        })
                                        return;
                                    // } else if (type == 'text'){
                                    //     ele.val(decodeURI(value));
                                    //     if(ele.hasClass('txtdater')){
                                    //     }
                                    } else if (type == 'hidden') {
                                        if (key == 'expandSearch'){
                                            // ele.val(decodeURI(value));
                                            // var commGroup = _this.opts.queryObj.find('.comm-group')
                                            // if(parseInt(value) == 1){
                                            //     commGroup.height(commGroup.children('.comm-inner').height())
                                            //     _this.opts.queryObj.find('.commbar').addClass('expand')
                                            // }else{                                                
                                            // }
                                        }  
                                        return;
                                    } else {
                                        ele.val(decodeURI(value));
                                    };
                                    break;
                                case 'textarea':
                                    var defaultVal = decodeURI(value) || '';
                                    ele.val(defaultVal);
                                    ele.removeClass('default');
                                    break;
                                case 'select':
                                    break;
                            }
                            // $('[name=' + key + ']').val(decodeURI(value));
                        }
                    }
                })
            } else {

                // 切换条件
                $('.filter-line', _this.opts.queryObj).each(function() {
                    $(this).find('a').eq(0).addClass('check').siblings('a').removeClass('check').find('a').prop('checked', false);
                });

                // 是否高级搜索
                $('.attach-search', _this.opts.queryObj).show();
                // $('.highSearch', _this.opts.queryObj).height(0).removeClass('higher');

                // 排序
                // var defaultSortfield = $('.setOrder .cur a', _this.opts.queryObj).attr('sortfield');
                // var defaultSort = $('.setOrder .cur a', _this.opts.queryObj).hasClass('desc') ? 'desc' : 'asc';
                // $('input[name="sort"]', _this.opts.queryObj).val(defaultSortfield + ' ' + defaultSort);

                // input
                $('input[type="text"]', _this.opts.queryObj).val('');
                $('input[type="number"]', _this.opts.queryObj).val('');
                $('input[type="password"]', _this.opts.queryObj).val('');
                $('input[type="tel"]', _this.opts.queryObj).val('');

                // textarea
                $('textarea', _this.opts.queryObj).val('');
            }
        }
    }
    // Table.prototype.queryFormInitState = function() {
    //     var _this = this;
    // }



    var TableHigher = window.TableHigher = function(ele, tmpl, option) {
        this.firstload = true;
        this.opts = $.extend({}, defaults, option);
        this.ele = ele;
        this.tmpl = tmpl;
        this.queryStr = ''
        this.pageStr = '';
        this.finalStr = '';
        this.finalUrl = this.opts.queryUrl;
        this.init();
    };

    TableHigher.prototype = new Table();

    TableHigher.prototype.init = function() {
        var _this = this;
        if (_this.opts.suppBack == true) {
            _this.hashcg();
        } else {
            _this.render();
        }
        // 绑定form查询
        if (_this.opts.isquery === true) {
            _this.query();
        }
    }

    TableHigher.prototype.loadData = function(data) {
        var _this = this;
        var finalData;
        var typ = typeof(data);
        if (typ == 'string') {
            finalData = _this.opts.isBase64 ? JSON.parse(Base64.decode(data)) : JSON.parse(data);
        } else if (typ == 'object') {
            finalData = _this.opts.isBase64 ? Base64.decode(data) : data;
        }
        if (finalData.hasOwnProperty("Status") && finalData.Status == false) {
            ceng.alert(finalData.ErrorMessage, {
                yes: function() {
                    if (finalData.ErrorCode === -1) { // 超时
                        window.location.reload();
                    }
                }
            })
        } else {
            _this.opts.container.empty();
            _this.opts.container.append(_this.tmpl.tmpl(finalData));
            _this.watch();
            if (_this.firstload === true) {
                _this.opts.firstLoadCallback(_this.ele, finalData);
                _this.firstload = false;
            }
            _this.afterLoadData(_this.ele, finalData);
        }
        if (_this.whattoload == 'page') {
            _this.opts.afterPage();
        }
        if (_this.whattoload == 'query') {
            _this.opts.afterQuery();
        }
        _this.whattoload = '';
    }

    // url存储的条件长度有限，有时间可以改成本地储存
    TableHigher.prototype.hashcg = function() {
        var _this = this;
        window.onhashchange = function() {
            var hash = window.location.hash.slice(1);
            if (hash != '') {
                _this.finalStr = hash;
                _this.ajaxData();
            } else {
                _this.render();
            }
            _this.restoreState();
            return false;
        }
        var comeInHash = window.location.hash.slice(1);
        if (comeInHash.length > 2) {
            _this.finalStr = comeInHash;
            _this.restoreState();
            _this.ajaxData();
        } else {
            _this.render();
        }
    }

    TableHigher.prototype.render = function() {
        var _this = this;
        // if (window.location.hash.length <=0) {
        switch (_this.opts.datastyle) {
            case 'local':
                _this.loadData(_this.opts.dataSource);
                _this.pageControl(_this.opts.dataSource);
                break;
            case 'url':
                $.ajax({
                        type: 'POST',
                        dataType: 'json',
                        data: '',
                        url: _this.opts.dataSource
                    })
                    .done(function() {
                        _this.loadData(_this.opts.dataSource);
                        _this.pageControl(_this.opts.dataSource);
                    })
                break;
        }
        // }
    }

    // 可换接口重新渲染 
    // TableHigher.prototype.renderNewTale = function(noption) {
    //     var _this = this;
    //     noption = typeof(noption) == 'undefined' ? {} : noption;
    //     var nopt = $.extend({}, _this.opts, noption);
    //     _this.pageStr = '';
    //     _this.queryStr = nopt.queryStr;
    //     _this.finalUrl = nopt.queryUrl;
    //     _this.ajaxData();
    // }


    var dateYMD = function(){
        var today = new Date();
        var m = today.getMonth() + 1;
        m = m.toString().length == 1 ? '0' + m : m
        return today.getFullYear() + '-' + m + '-' + today.getDate()
    }



})(jQuery, window, document);
