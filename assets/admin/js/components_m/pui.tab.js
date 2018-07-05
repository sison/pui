/*
 * @Author: sison
 * @Date:   2016-12-05 13:38:00
 * @Last Modified by: sison.luo
 * @Last Modified time: 2018-01-22 13:59:59
 */

;
(function($, window, undefined) {

    var defaults = {
        cur: 0,
        type: 'line', // box  // radio
        resType: 'dom', // 'url'
        eventType: 'click', // 'mouseover'
        callback: function(self, v) {}
    };

    $.fn.tabSmart = function(options) {

        var opts = $.extend({}, defaults, options);
        return this.each(function() {
            var taber = new PUITab($(this), opts);
            taber.init();
        });
    }

    PUITab = function(ele, option) {
        this.opts = $.extend({}, defaults, option);
        this.ele = ele;
        this.cur = this.opts.cur - 1;
        this.header = this.ele.children('.tab-header');
        this.body = this.ele.children('.tab-body');
    };
    PUITab.prototype.init = function() {
        this.render();
        this.watch();
    };



    PUITab.prototype.render = function() {
        var _this = this;

        _this.ele.addClass(_this.opts.type);
        var tabHelist = '';
        tabHelist += '<div class="radio-group clearfix">';
        for (var i = 0; i < _this.opts.data.length; i++) {
            if (i == _this.cur) {
                tabHelist += '<div class="thone radione checked">';
                tabHelist += '<input type="radio" id="'+ _this.opts.data[i].id +'" checked name="' + _this.opts.name + '" value="' + _this.opts.data[i].value + '" />';
            } else {
                tabHelist += '<div class="thone radione">';
                tabHelist += '<input type="radio" id="'+ _this.opts.data[i].id +'" name="' + _this.opts.name + '" value="' + _this.opts.data[i].value + '" />';
            }
            tabHelist += '<span>' + _this.opts.data[i].key + '</span>';
            tabHelist += '</div>';
        }
        tabHelist += '</div>';
        _this.header.append(tabHelist);

        if (_this.body) {
            _this.body.children('.tbone').removeClass('cur').eq(_this.cur).addClass('cur');
        }
    };




    PUITab.prototype.watch = function() {
        var _this = this;
        _this.header.find('input[type="radio"]').radioSmart({

            eventType: _this.opts.eventType,
            callback: function(me, v) {
                switch (_this.opts.resType) {
                    case 'dom':
                        if (_this.body) {
                            _this.body.children('.tbone').removeClass('cur').eq(me.parent('.radione').index()).addClass('cur');
                        }
                        break;
                    case 'url':
                        window.location.href = v || '';
                        break;
                }
                _this.opts.callback(_this, v);
            }
        });
    }


})(jQuery, window, document);
