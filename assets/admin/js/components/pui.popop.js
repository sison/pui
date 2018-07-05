/*
* @Author: sison.luo
* @Date:   2016-03-16 14:14:05
 * @Last Modified by: sison
 * @Last Modified time: 2018-06-12 18:40:03

    *气泡*
*/


;
(function($, window, undefined) {
    // var Pui.toppestIndex = 19900207;
    $(document).on('click', function(){
        $('.puipop').removeClass('fadeIn');
        setTimeout(function(){
            $('.puipop').remove();
        },200);
    });
    $.fn.popSmart = function(options) {
        var defaults = {
            dir: 'bottom',
            actType: 'hover',
            refType: 'msg', // bro // dom // comfirm
            refCont: '',
            maxWidth: 300,
            yes: function(){}   // 针对comfirm有效
        }
        var opts = $.extend({}, defaults, options);
        return this.each(function() {
            var puipop = new PUIPopop($(this), opts);
            puipop.render();
        });
    }
    var PUIPopop = function(ele, options) {
        this.ele = ele;
        this.opts = options;
        this.actType = this.ele.attr('actType') || this.opts.actType;
        this.dir = this.ele.attr('dir') || this.opts.dir;
        this.refType = this.ele.attr('refType') || this.opts.refType;
        this.refCont = this.ele.attr('refCont') || this.opts.refCont;
        this.maxWidth = this.ele.attr('maxWidth') || this.opts.maxWidth;
        this.ref;
    }

    PUIPopop.prototype.render = function() {
        var _this = this;
        if (_this.actType == 'hover') {
            _this.ele.on('mouseover', function() {
                _this.createPop();
            });
            _this.ele.on('mouseout', function(){
                _this.destroyPop();
            });
        } else if (_this.actType == 'click') {
            if (!_this.ele.attr('ref')) {
                _this.ele.on('click', function(e) {
                    stopDefault(e);
                    stopropagation(e);
                    _this.createPop();
                })
            }
        }
    }
    PUIPopop.prototype.createPop = function() {

        var _this = this;
        if(!_this.ele.attr('ref')){
            var _content = '';
            _content += '<div class="puipop ' + _this.dir + '" id="pop' + Pui.toppestIndex + '" style="z-index: ' + Pui.toppestIndex + '">';
            _content += '<i class="corner"></i>';
            switch (_this.opts.refType) {
                case 'msg':
                    _content += '<div class="inner"><p style="max-width: ' + parseInt(_this.maxWidth) + 'px" class="onlytxt">' + _this.refCont + '</p></div>';
                    break;
                case 'sib':
                    _content += '<div class="inner">'
                    _content += _this.ele.siblings('.sib').prop('outerHTML')
                    _content += '</div>'
                    break;
                case 'dom':
                    _content += '<div class="inner">'
                    _content += _this.refCont.prop('outerHTML')
                    _content += '</div>';
                    break;
                case 'confirm':
                    var comfhtml = '<div class="pop-confirm clearfix">';
                    comfhtml += '<div class="pop-comf-cont tc c-brown">';
                    comfhtml += _this.refCont;
                    comfhtml += '</div>';
                    comfhtml += '<div class="pop-comf-btn tc">';
                    comfhtml += '<button class="btn btn-no">取消</button>';
                    comfhtml += '<button class="btn btn-yes">确定</button>';
                    comfhtml += '</div>';
                    comfhtml += '</div>';
                    _content += '<div class="inner">' + comfhtml + '</div>';
                    break;
            }
            _content += '</div>';
            $('body').append(_content);
            _this.ref = $('#pop' + Pui.toppestIndex);
            _this.ref.on('click', function(e){
                stopropagation(e);
            });
            $(document).on('click', function(e){
                _this.destroyPop();
            });
            if(_this.opts.refType == 'confirm'){
                _this.callback($('button', _this.ref));
            }
            _this.ele.attr('ref', '#pop' + Pui.toppestIndex);
            Pui.toppestIndex++;
            _this.appearIn();
        }
    }

    PUIPopop.prototype.appearIn = function() {
        var _this = this;

        var eleLeft = _this.ele.offset().left;
        var eleTop = _this.ele.offset().top;
        var eleWidth = _this.ele.outerWidth();
        var eleHeight = _this.ele.outerHeight();

        var refLeft = 0;
        var refTop = 0;
        var refWidth = _this.ref.outerWidth();
        var refHeight = _this.ref.outerHeight();

        var dirArr = _this.dir.indexOf('-') > 0 ? [_this.dir.split('-')[0], _this.dir.split('-')[1]] : [_this.dir];

        if (dirArr[0] == 'top') {
            refTop = eleTop - refHeight - 6;
        }
        if (dirArr[0] == 'bottom') {
            refTop = eleTop + eleHeight + 6;
        }

        if (dirArr[0] == 'top' || dirArr[0] == 'bottom') {
            if (dirArr[1] == 'left') {
                refLeft = eleLeft;
            } else if (dirArr[1] == 'right') {
                refLeft = eleLeft + eleWidth - refWidth;
            } else {
                refLeft = eleLeft + eleWidth / 2 - refWidth / 2;
            }
        }
        if (dirArr[0] == 'left') {
            refLeft = eleLeft - refWidth - 6;
        }
        if (dirArr[0] == 'right') {
            refLeft = eleLeft + eleWidth + 6;
        }
        if (dirArr[0] == 'left' || dirArr[0] == 'right') {
            if (dirArr[1] == 'top') {
                refTop = eleTop;
            } else if (dirArr[1] == 'bottom') {
                refTop = eleTop + eleHeight - refHeight;
            } else {
                refTop = eleTop + eleHeight / 2 - refHeight / 2;
            }
        }

        _this.ref.addClass('ant fadeIn');
        _this.ref.css({
            'left': refLeft,
            'top': refTop
        });
    }

    PUIPopop.prototype.destroyPop = function() {
        var _this = this;
        if (_this.ele.attr('ref')) {
            var _ref = $(_this.ele.attr('ref'));
            _ref.removeClass('fadeIn');
            setTimeout(function(){
                _ref.remove();
                _this.ele.removeAttr('ref');
            },200);
        }
    }

    PUIPopop.prototype.callback = function(btn){
        var _this = this;
        btn.on('click', function(){
            if($(this).hasClass('btn-yes')){
                _this.opts.yes(_this.ele, _this.ref);
            }
            _this.destroyPop();            
        })
    }

})(jQuery, window, document);
