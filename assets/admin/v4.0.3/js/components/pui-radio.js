/*
* @Author: sison.luo
* @Date:   2016-03-16 14:14:05
* @Last Modified by:   sison.luo
* @Last Modified time: 2016-10-26 18:56:53

    *radio*
*/


(function($, window, undefined) {
    $.fn.radioSmart = function(options) {
        var defaults = {
            isvalid: false,
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
        var self = this;
        var html = '';
        var isdis = self.ele.prop('disabled') ? 'disabled' : '';
        var ischk = self.ele.prop('checked') ? ' checked' : '';
        html += '<i class="radicon ant"></i>';
        self.ele.before(html);
        self.ele.parent().addClass('isrender').addClass(ischk).addClass(isdis);
        return this;
    }
    Radiobj.prototype.watch = function() {
        var self = this;
        var actor = self.ele.parent('.radione');
        var val = self.ele.val();
        if (!self.ele.is(':disabled')) {
            actor.on('click', function(e) {
                Pui.setRadioVal(self.ele, true, self.opts.callback);
            });
        }
        return this;
    }



})(jQuery, window, document);
