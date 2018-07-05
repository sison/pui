/*
* @Author: sison.luo
* @Date:   2016-03-16 14:14:05
* @Last Modified by:   sison.luo
* @Last Modified time: 2018-02-11 15:13:02

    *开关组件*
*/

;(function($, window, undefined) {
    $.fn.switchSmart = function(options) {
        var defaults = {
            leftName: '启用',
            rightName: '禁用',
            isvalid: false,
            theme: 'primary',
            validCallback: function() {},
            enable: function() {},
            disable: function() {}
        }
        var opts = $.extend({}, defaults, options);
        return this.each(function() {
            var switcher = new Switcher($(this), opts);
            switcher.init();
        })
    }
    var Switcher = function(ele, options) {
        this.ele = ele;
        this.opts = options;
        this.id = this.ele.attr('id');
    }
    Switcher.prototype.init = function() {
        this.render();
        this.watch();
    }
    Switcher.prototype.render = function() {
        var self = this;
        var _html = '';
        var nid = self.ele.attr('id');
        var align = self.ele.data('align') || 'left';
        var isNoTxt = self.ele.hasClass('notxt');
        var isNoTxtClass = isNoTxt ? 'notxt' : '';
        var state = parseInt(self.ele.val()) === 1 ? 'on' : 'off';
        var disable = self.ele.is(':disabled');
        _html += '<div class="switch-actor ' + isNoTxtClass + ' ' + state + ' ' + self.opts.theme + '" id="_' + nid + '">';
        _html += '<div class="switch-mover ant">';
        if (isNoTxt) {
            _html += '<span class="switch-left"></span>';
            _html += '<span class="switch-dot"></span>';
            _html += '<span class="switch-right"></span>';
        } else {
            _html += '<span class="switch-left">' + self.opts.leftName + '</span>';
            _html += '<span class="switch-dot"></span>';
            _html += '<span class="switch-right">' + self.opts.rightName + '</span>';
        }
        _html += '</div>';
        _html += '</div>';
        self.ele.after(_html);
        var actor = self.ele.next('.switch-actor');
        switch (align) {
            case 'center':
                actor.css('margin', '0 auto');
                break;
            case 'right':
                actor.css('float', 'right');
                break;
        }
        if (disable) {
            actor.addClass('disabled');
        }
        return this;
    }
    Switcher.prototype.watch = function() {
        var self = this;
        var actor = self.ele.next('.switch-actor');
        actor.on('click', function() {
            if (self.opts.isvalid) {
                self.opts.validCallback(self.ele, self.ele.val());
            } else {
                Pui.toggleSwitchState(self.ele, {
                    enable: self.opts.enable,
                    disable: self.opts.disable
                })
            }
        });
        return this;
    }

})(jQuery, window, document);
