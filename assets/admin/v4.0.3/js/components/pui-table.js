/*
* @Author: sison.luo
* @Date:   2016-03-16 14:14:05
* @Last Modified by:   sison.luo
* @Last Modified time: 2016-10-26 13:49:41

    *表格控件*
*/

(function ($, window, undefined) {

    var defaults = {
        bgcCtrl: false,
        hoverColor: '#fff7d7',
        oddColor: '#fff',
        evenColor: '#f6f6f6',
        datastyle: 'local',
        dataSource: '',
        queryUrl: '',
        isquery: true,
        queryObj: '',
        container: '',
        suppBack: true,
        dateFormat: 'YYYY-MM-DD HH : mm : ss',
        headCtrl: true,
        pageCtrl: true,
        isBase64: false,
        afterLoadCallback: function () { }
    }

    var Table = function (ele, tmpl, option) {
        this.opts = $.extend({},defaults, option);
        this.ele = ele;
        this.tmpl = tmpl;
    };
    Table.prototype.init = function () { }
    Table.prototype.loadData = function (data, isChildren, renderHeader) {
        var self = this;
        var children = isChildren || false;
        var rheader = renderHeader || false;
        // if (children) {
        //     self.ele.after(tmpl.tmpl(data.Data[0]));
        //     var childs = self.ele.nextUntil('.out');
        //     self.afterLoadData(childs);
        // } else {
        var finalData = self.opts.isBase64 ? $.parseJSON(Base64.decode(data)) : data;
        //debugger;
        self.opts.container.empty();
        self.opts.container.append(self.tmpl.tmpl(finalData));
        self.watch();
        self.afterLoadData(self.ele, finalData);
        // }
    }
    Table.prototype.afterLoadData = function (ele, fdata) {
        var self = this;
        // switch (self.opts.multiStyle) {
        //     case 'checkbox':
        //         if (self.opts.multiCtrl) { // checkbox控件
        //             ele.find('.chktone').checkboxSmart({
        //                 callback: function(me, state) {
        //                     self.opts.chkoneCallback();
        //                 }
        //             });
        //         } else { // 原生 checkbox
        //         }
        //         break;
        //     case 'radio':
        //         if (self.opts.multiCtrl) { // radio 控件
        //         } else { // 原生 radio
        //         }
        //         break;
        //         defaults:
        //             break;
        // };
        // if (self.opts.switchCtrl) {
        //     // debugger;
        //     ele.find('.switch').switchSmart({
        //         enable: function(o, bool) {
        //             // debugger;
        //             self.opts.switchCallback(o, bool);
        //         },
        //         disable: function(o, bool) {
        //             // debugger;
        //             self.opts.switchCallback(o, bool);
        //         }
        //     })
        // }
        self.opts.afterLoadCallback(ele, fdata);
    }
    Table.prototype.pageControl = function (data) {
        var self = this;
        var finalData = self.opts.isBase64 ? $.parseJSON(Base64.decode(data)) : data;
        if (self.opts.pageCtrl) {
            var pageTable = self.ele.closest('.page-table');
            var pageContainer = pageTable.find('.makePGbottom');
            if (pageContainer.length > 0) {
                pageContainer.remove();
            }
            pageTable.append('<div class="makePGbottom"><div class="pagination-out"><div class="pagination"></div></div></div>');
            pageTable.find('.pagination').pager({
                totalItem: finalData.TotalRecords || 0,
                pageSize: finalData.PageSize || 10,
                pageIndex: finalData.PageIndex || 1,
                action: function (pi, ps) {
                    var tempstr = '';
                    window.manualClick = false;
                    if (self.opts.isquery) {
                        tempstr += Pui.getQuery(self.opts.queryObj);
                    }
                    tempstr += '&pageIndex=' + pi + '&' + 'pageSize=' + ps;
                    location.hash = tempstr;
                    $.ajax({
                        type: 'GET',
                        data: tempstr,
                        url: self.opts.queryUrl
                    }).done(function (data) {
                        window.manualClick = true;
                        self.loadData(data);
                    });
                }
            })
        }
    }
    Table.prototype.watch = function () {
        var self = this;
        if (self.opts.bgcCtrl) {
            $('tbody tr:even', self.ele).css('backgroundColor', self.opts.evenColor);
            $('tbody tr:odd', self.ele).css('backgroundColor', self.opts.oddColor);
            $('tbody tr', self.ele).hover(function () {
                oriColor = $(this).css('backgroundColor');
                $(this).css('backgroundColor', self.opts.hoverColor);
            }, function () {
                $(this).css('backgroundColor', oriColor);
            })
        }
        return this;
    }
    Table.prototype.query = function () {
        var self = this;
        var querySmart = new QueryForm(self.opts.queryObj, {
            dateformat: self.opts.dateFormat,
            async: function (querystr) {
                window.manualClick = false;
                var qdata = querystr;
                if(self.opts.suppBack){
                    location.hash = qdata;
                }
                $.ajax({
                    type: 'GET',
                    data: qdata,
                    url: self.opts.queryUrl,
                }).done(function (data) {
                    window.manualClick = true;
                    self.loadData(data);
                    self.pageControl(data);
                });
            }
        });
    }


    var TableSimple = window.TableSimple = function (ele, tmpl, option) {
        this.opts = $.extend({},defaults, option);
        this.ele = ele;
        this.tmpl = tmpl;
        this.init();
    };
    TableSimple.prototype = new Table();
    TableSimple.prototype.init = function () {
        this.render();
        if (this.opts.suppBack) {
            this.hashcg();
        }
        if (this.opts.isquery) {
            this.query();
        }
    }
    TableSimple.prototype.hashcg = function () {
        var self = this;
        window.manualClick = false;
        window.onhashchange = function () {
            if (window.manualClick) {
                var hash = window.location.hash;
                hash = hash.length > 0 ? hash.replace('#', '') : '';
                $.ajax({
                    type: 'GET',
                    data: hash,
                    url: self.opts.queryUrl
                }).done(function (data) {
                    self.loadData(data);
                    self.pageControl(data);
                    window.manualClick = true;
                })
            } 
        }
        var comeInHash = window.location.hash;
        if (comeInHash.length > 1) {
            comeInHash = comeInHash.substr(1, comeInHash.length);
            var kvDic = comeInHash.split('&');
            $.each(kvDic, function () {
                var temp = this.split('='),
                    key = temp[0],
                    value = temp[1];
                if (key && value) {
                    $('[name=' + key + ']').val(decodeURI(value));
                }
            });
            $.ajax({
                type: 'GET',
                cache: false,
                data: comeInHash,
                url: self.opts.queryUrl
            }).done(function (data) {
                self.loadData(data);
                self.pageControl(data);
                window.manualClick = true;
            })
        }
    }
    //TableSimple.prototype.stopgoback = function () {
    //    var self = this;
    //    $(document).on('keyup', function (e) {
    //        var event = $.event.fix(e);
    //        if (event.keyCode == 8) { // 返回
    //            var tagname = event.target.tagName.toLowerCase();
    //            if (tagname != 'input' && tagname != 'textarea') {
    //                debugger;
    //                event.preventDefault();
    //            }
    //        }
    //    });
    //}
    TableSimple.prototype.renderHeader = function () {
        var self = this;
        if (self.opts.headCtrl) {
            self.ele.find('.chktall').checkboxSmart({
                callback: function (me, state) {
                    self.ele.find('input.chktone').setCheck(state);
                }
            })
        }
        return this;
    }
    TableSimple.prototype.render = function () {
        var self = this;
        if (window.location.hash.length <=0) {
            switch (self.opts.datastyle) {
                case 'local':
                    self.loadData(self.opts.dataSource);
                    self.pageControl(self.opts.dataSource);
                    break;
                case 'url':
                    break;
            }
        }
    }
    TableSimple.prototype.simpleRenderAgain = function () {
        var self = this;
        $.ajax({
            type: 'GET',
            url: self.opts.queryUrl,
        }).done(function (data) {
            self.loadData(data);
            self.pageControl(data);
        });
    }

})(jQuery, window, document);
