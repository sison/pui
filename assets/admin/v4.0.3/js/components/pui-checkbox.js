/*
* @Author: sison.luo
* @Date:   2016-03-16 14:14:05
* @Last Modified by:   sison.luo
* @Last Modified time: 2016-10-26 18:54:26

    *checkbox*
*/


(function ($, window, undefined) {

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
        html += '<i class="ant icon"></i>';
        self.ele.before(html);
        self.ele.parent('.checkone').addClass('isrender').addClass(ischk).addClass(isdis);
        return this;
    }
    Checkobj.prototype.watch = function () {
        var self = this;
        var actor = self.ele.parent('.checkone');
        actor.on('click', function () {
            if (!self.ele.is(':disabled')) {
                var bool = $(this).find('input[type=checkbox]').is(':checked');
                if (bool) {
                    $(this).removeClass('checked');
                    self.opts.uncheckCallback(self.ele);
                } else {
                    $(this).addClass('checked');
                    self.opts.checkCallback(self.ele);
                }
                $(this).find('input[type=checkbox]').prop('checked', !bool);
                self.opts.callback(self.ele, !bool);
            }
        });
        return this;
    };

})(jQuery, window, document);
