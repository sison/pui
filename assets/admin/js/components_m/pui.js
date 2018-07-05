/*
 * @Author: sison.luo
 * @Date:   2016-10-24 10:33:38
 * @Last Modified by:   sison.luo
 * @Last Modified time: 2018-02-25 14:09:36
 */

'use strict';

Pui = window.Pui = new Object();

    // ceng.js

    Pui.toppestIndex = 19900207;

    Pui.resetActive = function(obj, idx) {
        var i = idx || 0;
        obj.children('.ceng-btn').find('.btn').eq(i).removeClass('disabled');
    };

    // checkbox.js

    Pui.getCheckVal = function(checkboxgroup) {
        var arr = [];
        checkboxgroup.find('input:checkbox:checked').each(function() {
            arr.push($(this).val());
        });
        return arr;
    };

    Pui.setCheckVal = function(chkobj, bool) {
        chkobj.prop('checked', bool);
        bool ? chkobj.parent().addClass('checked') : chkobj.parent().removeClass('checked');
    };

    // query.js

    Pui.getOrder = function(queryform) {
        var odata = '';
        var sortObj = $('input[name="sort"]', queryform);
        if (sortObj.length > 0) {
            odata = sortObj.val();
            if (odata == '') {
                var cura = $('.setOrder .cur a', queryform);
                var sortfield = cura.attr('sortfield');
                var sort = cura.hasClass('desc') ? 'desc' : 'asc';
                odata = sortfield + ' ' + sort;
            }
        }
        return odata;
    };

    Pui.getUrlKeyValue = function(type, k) {
        var str = type == 'hash' ? location.hash.slice(1) : location.search.slice(1);
        var reg = new RegExp('^|&' + k + '=[^&]*', 'ig');
        var vals = str.match(reg);

        if (vals.length <= 1) {
            return vals[0].split('=')[1] || '';

        } else if (vals.length > 1) {
            var valArr = [];
            for (var i = 0; i < vals.length; i++) {
                valArr.push(vals[i].split('=')[1] || '');
            }
            return valArr;
        }
    };

    // radio.js

    Pui.setRadioVal = function(obj, bool, callback) {
        if (bool && bool === true) {
            var name = obj.attr('name') || '';
            var ipts = $('input[name="' + name + '"]');
            ipts.parent('.radione').removeClass('checked');
            obj.parent('.radione').addClass('checked');
        } else {
            obj.parent().removeClass('checked');
        }
        obj.prop('checked', bool);
        var v = obj.val();
        if (typeof callback === 'function') {
            callback(obj, v);
        }
    };

    Pui.setRadioDisabled = function(ipt, bool) {
        var b = bool || true;
        if (b) {
            ipt.prop('disabled', b).parent('.radione').addClass('disabled');
        } else {
            ipt.prop('disabled', b).parent('.radione').removeClass('disabled');
        }
    };

    Pui.getRadioVal = function(group) {
        var str = '';
        group.find('input:radio:checked').each(function() {
            str = $(this).val();
            return false;
        });
        return str;
    };

    // select.js

    Pui.selectChange = function(iarr, tarr, varr, o, ro, cb) {
        /**
         * i: selectIndex
         * t: txt,
         * v: value
         * o: select
         * ro: selector
         * cb: 
         */
        var finalt = tarr.join('，');
        ro.find('.setitle a').text(finalt);

        if(ro.prop('multiple')){

            ro.find('.selist li').eq(iarr[0]).addClass('curli').siblings('li').removeClass('curli');        
            o.get(0).selectedIndex = iarr[0];
            ro.removeClass('curse');

        }else{
            ro.find('.selist li').removeClass('curli');
            o.find('option').prop('selected', false);
            for(var i=0; i<iarr.length; i++){
                ro.find('.selist li').eq(iarr[i]).addClass('curli');
                o.find('option').eq(iarr[i]).prop('selected', true);
            }

        }
        if (typeof cb == 'function') {
            cb(iarr, tarr, varr, o);
        }
    };

    // switch.js

    Pui.toggleSwitchState = function(obj, callback) {
        var v = parseInt(obj.val()) || 0;
        var actor = obj.next('.switch-actor');
        if (!obj.is(':disabled')) {
            if (v) {
                obj.val(0);
                actor.removeClass('on').addClass('off');
                if (callback && typeof callback === 'object') {
                    callback.disable(v, obj);
                }
            } else {
                obj.val(1);
                actor.removeClass('off').addClass('on');
                if (callback && typeof callback === 'object') {
                    callback.enable(v, obj);
                }
            }
        }
    };

    // tree.js

    Pui.togToggle = function(ct, v) {
        var curLv = $('.level' + v);
        var curLine = $(curLv, ct);
        if (v > 1) {
            for (var i = 1; i < v; i++) {
                var parentLv = $('.level' + i);
                this.togExpand(parentLv, v);
            }
            this.togCollapse(curLine, v);
        } else {
            this.togCollapse(curLine, v);
        }
    };

    Pui.togCollapse = function(cl, v) {
        cl.children().children().children('.icon-toggle')
            .removeClass('collapse')
            .addClass('expand')
            .text('+');
        cl.children('ul').toggle(false);
    };

    Pui.togExpand = function(cl, v) {
        cl.children().children().children('.icon-toggle')
            .removeClass('expand')
            .addClass('collapse')
            .text('-');
        cl.children('ul').toggle(true);
    };

    // selectAll or selectone

    Pui.toggleTableTheadCheckbox = function(table, all, page) {
        page.checkboxSmart({
            callback: function(self, v) {
                var one = table.find('input.chkone');
                Pui.setCheckVal(one, v);
                var pageNum = parseInt(page.parent().find('span').text());
                var allNum = parseInt(all.parent().find('span').text());
                if (v) {
                    if (pageNum === allNum) {
                        -
                        Pui.setCheckVal(all, true);
                    }
                } else {
                    Pui.setCheckVal(all, false);
                }
            }
        });
        all.checkboxSmart({
            callback: function(self, v) {
                var one = table.find('input.chkone');
                Pui.setCheckVal(one, v);
                Pui.setCheckVal(page, v);
            }
        })
    };

    Pui.toggleTableTbodyCheckbox = function(table, all, page, one) {
        one.checkboxSmart({
            checkCallback: function() {
                var isfull = true;
                one.each(function() {
                    if ($(this).prop('checked') == false) {
                        isfull = false;
                        return false;
                    }
                });
                if (isfull) {
                    Pui.setCheckVal(page, true);
                    var pageNum = parseInt(page.parent().find('span').text());
                    var allNum = parseInt(all.parent().find('span').text());
                    if (pageNum === allNum) {
                        Pui.setCheckVal(all, true);
                    }
                }
            },
            uncheckCallback: function() {
                Pui.setCheckVal(all, false);
                Pui.setCheckVal(page, false);
            }
        })
    };

    Pui.toggleTableCheckbox = function(table, all, page, one) {
        toggleTableTheadCheckbox(table, all, page, one);
        toggleTableTbodyCheckbox(table, all, page, one);
    }


	module.exports = Pui;
