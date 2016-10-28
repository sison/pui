/*
 * @Author: sison.luo
 * @Date:   2016-03-16 14:14:05
 * @Last Modified by:   sison.luo
 * @Last Modified time: 2016-10-26 18:57:12
 * @Add: 增加change事件询问
 * 
 *下拉组件*
 */


(function($, window, undefined) {
    $.fn.selectSmart = function(options) {
        var defaults = {
            isvalid: false,
            //  注意，此 valid 跟 pui-valid.js 没有半毛钱关系，如有雷同，纯属巧合
            //  如 isvalid 为 true，使用 validCallback
            validCallback: function() {},
            // callback 为默认回调，跟是否 isvalid 也没有半毛钱关系
            callback: function() {}
        }
        $(document).bind('click', function(event) {
            if ($('.curse').length > 0) {
                $('.curse').removeClass('curse');
            }
        });
        var opts = $.extend({}, defaults, options);
        return this.each(function() {
            var switcher = new Selector($(this), opts);
            switcher.init();
        })
    }
    var Selector = function(ele, options) {
        this.ele = ele,
            this.opts = options;
        this.id = this.ele.attr('id');
    }
    Selector.prototype.init = function() {
        this.render();
        this.watch();
    }
    Selector.prototype.render = function() {
        var self = this;
        var _nid = '_' + self.id;
        var _idx = self.ele.get(0).selectedIndex;
        var _title = self.ele.find('option:selected').text();
        var _lent = self.ele.find('option').length;
        var _w = self.ele.data('width') || 'auto';
        var _opts = '';
        var _html = '';
        for (var i = 0, l = self.ele.find('option').length; i < l; i++) {
            var c = self.ele.find('option').eq(i);
            var ct = c.text();
            var vl = c.val() || '';
            if (i == _idx) {
                _opts += '<li class="curli" value="' + vl + '">' + ct + '</li>';
            } else {
                _opts += '<li value="' + vl + '">' + ct + '</li>';
            }
        }
        _html += '<div class="selector" id="' + _nid + '" style="width:' + _w + '">';
        _html += '<dl>';
        _html += '<dt class="setitle"><a href="javascript:;" class="ellipsis">';
        _html += _title;
        _html += '</a><i class="ant"></i></dt>';
        _html += '<dd class="selist ant">'
        _html += '<ul>';
        _html += _opts;
        _html += '</ul>';
        _html += '</dd>';
        _html += '</dl>';
        _html += '</div>';
        self.ele.parent().append(_html);
        return this;
    }
    Selector.prototype.watch = function() {
        var self = this;
        var id = self.ele.attr('id');
        var nid = '_' + id;
        var actor = $('#' + nid);
        var dis = self.ele.is(':disabled');
        if (!dis) {
            $('.selist li', actor).on('click', function(e) {
                var osidx = self.ele.get(0).selectedIndex;
                actor.removeClass('curse');
                // $(this).addClass('curli').siblings('li').removeClass('curli');
                var i = $('.selist li', actor).index($(this));
                var t = $(this).text();
                var v = $(this).attr('value');
                if (i != osidx) {
                    if (self.opts.isvalid) {
                        self.opts.validCallback(i, t, v, self.ele, actor, self.opts.callback);
                    } else {
                        Pui.selectChange(i, t, v, self.ele, actor, self.opts.callback);
                    }
                }
            });
            actor.find('.setitle').on('click', function(e) {
                e.preventDefault();
                e.returnValue = false;
                curid = nid;
                if (actor.hasClass('curse')) {
                    actor.removeClass('curse');
                } else {
                    actor.addClass('curse');
                }

                $('.selector').each(function() {
                    if ($(this).attr('id') != curid) {
                        $(this).removeClass('curse');
                    }
                });
                e.stopPropagation ? e.stopPropagation() : (e.cancelBubble = true);
            });
        } else {
            actor.addClass('disabled');
        }
        return this;
    }



})(jQuery, window, document);
