/*
* @Author: sison.luo
* @Date:   2016-03-16 14:14:05
* @Last Modified by:   sison.luo
* @Last Modified time: 2018-03-23 17:55:31

    *checkbox*
*/

;(function ($, window, undefined) {

    $.fn.checkboxSmart = function (options) {
        var defaults = {
            callback: function () { },
            checkCallback: function () { },
            uncheckCallback: function () { }
        }
        var opts = $.extend(defaults, options);
        return this.each(function () {
            var checkbj = new Checkobj($(this), opts);
            checkbj.init();
        });
    }
    Checkobj = function (ele, options) {
        this.ele = ele;
        this.opts = options;
        this.id = this.ele.attr('id');
        this.name = this.ele.attr('name');
    }
    Checkobj.prototype.init = function () {
        this.render();
        this.watch();
    }
    Checkobj.prototype.render = function () {
        var self = this;
        var html = '';
        var ischk = self.ele.prop('checked') ? ' checked' : '';
        var isdis = self.ele.is(':disabled') ? 'disabled' : '';
        html += '<i class="ant icon icon-resolve"></i>';
        self.ele.before(html);
        self.ele.parent('.checkone').addClass('isrender').addClass(ischk).addClass(isdis);
        return this;
    }
    Checkobj.prototype.watch = function () {
        var self = this;
        var actor = self.ele.parent();
        actor.on('click', function () {
            if (!self.ele.is(':disabled')) {
                var bool = self.ele.is(':checked');
                self.ele.prop('checked', !bool);
                if (bool) {
                    $(this).removeClass('checked');
                    self.opts.uncheckCallback(self.ele);
                } else {
                    $(this).addClass('checked');
                    self.opts.checkCallback(self.ele);
                }
                self.opts.callback(self.ele, !bool);
            }
        });
        return this;
    };

})(jQuery, window, document);
