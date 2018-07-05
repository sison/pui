/*
* @Author: sison.luo
* @Date:   2016-03-16 14:14:05
 * @Last Modified by: sison.luo
 * @Last Modified time: 2018-01-23 14:44:32

    *radio*
*/

;(function($, window, undefined) {

    $.fn.radioSmart = function(options) {
        var defaults = {
            isvalid: false,
            eventType: 'click',
            validCallback: function() {},
            callback: function(o, v) {}
        }
        var opts = $.extend({}, defaults, options);
        return this.each(function() {
            var radiobj = new Radiobj($(this), opts);
            radiobj.init();
        })
    }
    var Radiobj = function(ele, options) {
        this.ele = ele;
        this.opts = options;
        this.id = this.ele.attr('id');
        this.name = this.ele.attr('name');
    }
    Radiobj.prototype.init = function() {
        this.render();
        this.watch();
    }
    Radiobj.prototype.render = function() {
        var _this = this;
        var html = '';
        var isdis = _this.ele.prop('disabled') ? 'disabled' : '';
        var ischk = _this.ele.prop('checked') ? ' checked' : '';
        html += '<i class="radicon ant"></i>';
        _this.ele.before(html);
        _this.ele.parent().addClass('isrender').addClass(ischk).addClass(isdis);
        return this;
    }
    Radiobj.prototype.watch = function() {
        var _this = this;
        var actor = _this.ele.parent('.radione');
        var val = _this.ele.val();
        actor.on(_this.opts.eventType, function(e) {
            if (!_this.ele.is(':disabled')) {
                Pui.setRadioVal(_this.ele, true, _this.opts.callback);
            }
        });
        return this;
    }

})(jQuery, window, document);
