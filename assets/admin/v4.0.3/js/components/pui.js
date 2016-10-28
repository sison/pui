/*
 * @Author: sison.luo
 * @Date:   2016-10-24 10:33:38
 * @Last Modified by:   sison.luo
 * @Last Modified time: 2016-10-27 11:04:41
 */

'use strict';

var Pui = window.Pui = {

    // checkbox.js

    getCheckVal : function (checkboxgroup) {
        var arr = [];
        checkboxgroup.find('input:checkbox:checked').each(function () {
            arr.push($(this).val());
        });
        return arr;
    },

    setCheckVal : function (chkobj, bool) {
        chkobj.prop('checked', bool);
        bool ? chkobj.parent().addClass('checked') : chkobj.parent().removeClass('checked');
    },

    // query.js

    getQuery : function(queryform) {
        var odata = '';
        $('.setOrder a', queryform).each(function() {
            if ($(this).parent().hasClass('cur')) {
                var sortfield = $(this).attr('sortfield');
                var sort = $(this).attr('sort');
                odata += '&' + sortfield + '=' + sort;
            }
        });
        var qdata = queryform.serialize();
        return qdata + odata;
    },

    // radio.js

    setRadioVal : function(obj, bool, callback) {
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
    },

    setRadioDisabled : function(ipt, bool) {
        var b = bool || true;
        if (b) {
            ipt.prop('disabled', b).parent('.radione').addClass('disabled');
        } else {
            ipt.prop('disabled', b).parent('.radione').removeClass('disabled');
        }
    },

    getRadioVal : function(group) {
        var str = '';
        group.find('input:radio:checked').each(function() {
            str = $(this).val();
            return false;
        });
        return str;
    },

    // select.js

    selectChange : function(i, t, v, o, ro, cb) {
        /**
         * i: selectIndex
         * t: txt,
         * v: value
         * o: 当前 select
         * ro: 渲染的 selector
         * cb: 回调
         */
        ro.find('.setitle a').text(t);
        ro.find('.selist li').eq(i).addClass('curli').siblings('li').removeClass('curli');
        o.get(0).selectedIndex = i;
        if (typeof cb == 'function') {
            cb(i, t, v, o);
        }
    },

    // switch.js

    toggleSwitchState : function(obj, callback) {
        var v = parseInt(obj.val()) || 0;
        var actor = obj.next('.switch-actor');
        if (!obj.is(':disabled')) {
            if (v) {
                obj.val(0);
                actor.removeClass('on').addClass('off');
                if (callback && typeof callback === 'object') {
                    callback.disable();
                }
            } else {
                obj.val(1);
                actor.removeClass('off').addClass('on');
                if (callback && typeof callback === 'object') {
                    callback.enable();
                }
            }
        }
    },

    // tree.js

    togExpand : function(obj) {
            var children = obj.closest('.row').children('ul');
            obj.removeClass('collapse').addClass('expand').text('+')
            children.toggle(false);
    },

    togCollapse : function(obj) {
        var children = obj.closest('.row').children('ul');
        obj.removeClass('expand').addClass('collapse').text('-');
        children.toggle(true);
    }

};

module.exports = Pui;















