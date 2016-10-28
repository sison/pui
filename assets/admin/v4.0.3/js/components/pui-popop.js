/*
* @Author: sison.luo
* @Date:   2016-03-16 14:14:05
* @Last Modified by:   sison.luo
* @Last Modified time: 2016-10-26 13:49:21

	*radio*
*/

(function($,window,undefined){
	$.fn.popopSmart = function(options){
		var defaults = {
			direct: 'bottom'
		}
		var opts = $.extend({},defaults,options);
		return this.each(function(){
			var ppop = new PUIPopop($(this),opts);
			ppop.init();
		});
	}
	var PUIPopop = function(ele,options){
		this.ele = ele,
		this.opts = options;
	}
	PUIPopop.prototype.init = function(){
		this.watch();
	}
	PUIPopop.prototype.watch = function(){
		var self = this;
		var classdir = '';
		if(self.ele.hasClass('pop-top')){
			classdir = 'top'
		}else if(self.ele.hasClass('pop-right')){
			classdir = 'right'
		}else if(self.ele.hasClass('pop-bottom')){
			classdir = 'bottom'
		}else if(self.ele.hasClass('pop-left')){
			classdir = 'left'
		};
		var dir = classdir || self.opts.direct;
		var lean = self.ele.data('lean') || 'center';
		var width = self.ele.data('width') || 'auto';

		if(self.ele.children().length > 0){
			self.ele.on('mouseover', function(){
				var last = $('.popsub', self.ele);
				switch(dir){
					case 'top':
						var top = self.ele.outerHeight();
						var left = last.outerWidth();
						last.css({
							'left': '50%',
							'bottom': top+6,
							'margin-left': -left/2,
							'width': width
						});
						break;
					case 'right':
						break;
					case 'bottom':
						var top = self.ele.outerHeight();
						var left = last.outerWidth();
						last.css({
							'left': '-50%',
							'top': top+10,
							'margin-left': -left/2+8,
							'width': width
						});
						break;
					case 'left':
						break;
				}
			})
		};
		return this;
	}
})(jQuery,window,document);
