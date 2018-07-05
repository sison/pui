/*
* @Author: sison.luo
* @Date:   2016-03-16 14:14:05
 * @Last Modified by: sison.luo
 * @Last Modified time: 2018-01-23 14:44:40
* @Add: 增加change前询问confirm
* 
    *下拉组件*
*/

;(function ($, window, undefined) {
    $.fn.selectSmart = function (options) {
        var defaults = {
            isvalid: false,
            //  注意，此 valid 跟 pui-valid.js 没有半毛钱关系
            //  如 isvalid 为 true，使用 validCallback
            validCallback: function () {},
            // callback 为默认回调，跟是否 isvalid 也没有半毛钱关系
            callback: function (i, t, v, ele) { }
        }
        $(document).bind('click', function (event) {
            if ($('.curse').length > 0) {
                $('.curse').removeClass('curse');
            }
        });
        var opts = $.extend({}, defaults, options);
        return this.each(function () {
            var switcher = new Selector($(this), opts);
            switcher.init();
        })
    }
    var Selector = function (ele, options) {
        this.ele = ele,
        this.opts = options;
        this.id = this.ele.attr('id') || '';
    }
    Selector.prototype.init = function () {
        this.render();
        this.watch();
    }
    Selector.prototype.render = function () {
        var self = this;
        var _nid = '_' + self.id;
        var _selected = this.getSelected();
        var _dis = self.ele.is(':disabled') ? 'disabled' : '';
        var _title = _selected.txtArr.join('，')
        var _cdef = '';

        // pui认为如果 select 的第一个option选中，且value为空，则当前为default状态
        if(self.ele.get(0).selectedIndex == 0){
            if(self.ele.get(0).value == ''){
                _cdef = 'default'                
            }
        }
        var _lent = self.ele.find('option').length;
        var _w = self.ele.data('width') || 'auto';
        var _opts = '';
        var _html = '';

        $('option', self.ele).each(function(i){

            var ct = $(this).text();
            var vl = $(this).attr('value') || '';
            var vlstr = $(this).attr('value') == '' ? '' : 'value=' + vl;

            if(i === _selected.idxArr[0]){
                _opts += '<li class="curli" ' + vlstr + '>' + HTMLEncode(ct) + '</li>';
                _selected.idxArr.shift();
            }else{
                _opts += '<li ' + vlstr + '>' + HTMLEncode(ct) + '</li>';
            }
        })

        _html += '<div class="selector ' + _dis + ' ' + _cdef + '" id="' + _nid + '" style="width:' + _w + '">';
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
        self.ele.parent().addClass('render').append(_html);
        return this;
    }
    Selector.prototype.watch = function () {
        var self = this;
        var id = self.id;
        var nid = '_' + id;
        var multi = self.ele.prop('multiple');
        var actor = self.ele.parent('.select-group').children('.selector');
        var hasDef = self.ele.find('option').eq(0).val() == '';
        var imDef = self.ele.find('option').eq(0);

            $('.selist li', actor).on('click', function (e) {
                var _selected = self.getSelected();
                var _changed = false;
                var curi = $(this).index();
                var curt = $(this).text();
                var curv = $(this).attr('value') || '';
                if(($(this).index() == 0) && curv == ''){
                    actor.addClass('default');
                    _selected.idxArr = [0];
                    _selected.txtArr = [curt];
                    _selected.valArr = [''];
                    _changed = true

                }else{
                    actor.removeClass('default');
                    // console.log(multi);
                    if(!multi){
                        // 单选
                        if(curi != self.ele.get(0).selectedIndex){
                            _changed = true
                            _selected.idxArr[0] = curi;
                            _selected.txtArr[0] = curt;
                            _selected.valArr[0] = curv
                        }
                    }else{
                        // 多选
                        e.stopPropagation();
                        if(hasDef){
                            _selected.idxArr.remove(0);
                            _selected.txtArr.remove(self.ele.find('option').eq(0).text());
                            _selected.valArr.remove('');
                        }                        

                        _changed = true;
                        if(_selected.idxArr.indexOf(curi) > -1){
                            _selected.idxArr.remove(curi);
                            _selected.txtArr.remove(curt);
                            _selected.valArr.remove(curv);

                            if(_selected.idxArr.length == 0){
                                _selected.idxArr = [0];
                                _selected.txtArr = [imDef.text()];
                                _selected.valArr = [imDef.val() || ''];
                                actor.removeClass('curse');
                            }

                        }else{
                            _selected.idxArr.push(curi);
                            _selected.txtArr.push(curt);
                            _selected.valArr.push(curv);
                        }
                    }
                }
                if(_changed){

                    // console.log(_selected);
                    if (self.opts.isvalid) {
                        self.opts.validCallback(_selected.idxArr, _selected.txtArr, _selected.valArr, self.ele, actor, self.opts.callback);
                    } else {
                        Pui.selectChange(_selected.idxArr, _selected.txtArr, _selected.valArr, self.ele, actor, self.opts.callback);
                    }
                }
                
            });


            actor.find('.setitle').on('click', function (e) {
                if(!actor.hasClass('disabled')){
                    e.preventDefault();
                    e.returnValue = false;
                    curid = nid;
                    actor.hasClass('curse') ? actor.removeClass('curse') : actor.addClass('curse');
                    // if (actor.hasClass('curse')) {
                    //     actor.removeClass('curse');
                    // } else {
                    //     actor.addClass('curse');
                    // }
                    $('.selector').each(function () {
                        if ($(this).attr('id') != curid) {
                            $(this).removeClass('curse');
                        }
                    });
                    e.stopPropagation ? e.stopPropagation() : (e.cancelBubble = true);       
                }
            });
        return this;
    }
    Selector.prototype.getSelected = function() {
        var self = this;
        var selected = {
            txtArr: [],
            idxArr: [],
            valArr: []
        };
        $('option:selected', self.ele).each(function(i){
            selected.txtArr.push($(this).text());
            selected.idxArr.push($(this).index());
            selected.valArr.push($(this).val());
        });
        return selected
    }


})(jQuery, window, document);
