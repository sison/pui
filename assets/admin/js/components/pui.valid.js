/*
* @Author: sison.luo
* @Date:   2016-05-10 17:42:03
 * @Last Modified by: sison
 * @Last Modified time: 2018-07-05 17:46:17
* 
            //  pc 验证插件
*/
'use strict';

(function($, window, undefined) {
    var defaults = {
        language: 'cn',
        isAsync: false,
        isRenderCheckbox: false,
        isRenderRadio: false,
        isRenderSelect: false,
        scrollToError: true,
        asyncFun: function() {},
        errFun: function() {}
    }
    var isok = false;

    var msg = {
        cn: {
            empty: '该字段不能为空',
            mail: '邮箱格式不正确',
            mobile: '手机格式不正确',
            idcard: '身份证格式不正确',
            six: '长度不能小于6位数',
            number: '请输入数字',
            numberange: '数值应在',
            numberangeLast: '之间',
            numberangeErr: '范围的校验规则有误',
            numberLT: '请输入小于等于',
            numberGT: '请输入大于等于',
            numberVal: '的数字',
            integer: '请输入整数',
            integerp: '请输入正整数',
            integerp0: '请输入大于等于0的整数',
            integern: '请输入负整数',
            integern0: '请输入小于等于0的整数',
            website: '网址格式不正确',
            chinese: '请输入中文',
            psw1: '新旧密码不能相同',
            psw2: '新旧密码不能相同',
            psw2b: '两次密码输入不一致',
            pswmix: '密码需含有数字和字母',
            upload: '请选择上传文件',
            uploadformat: '上传的文件格式不正确',
            maxlength: '长度不能大于',
            minlength: '长度不能小于',
            numlength2: '位数',
            maxrows: '数量不能超过',
            maxrows2: '行',
            spcode: '不能输入下列任何字符组合：&#、<加字母、<\!、<\/'
        },
        hk: {
            empty: '該字段不能為空',
            mail: '郵箱格式不正確',
            mobile: '手機格式不正確',
            idcard: '身份證格式不正確',
            six: '長度不能小于6位數',
            number: '请输入数字',
            numberange: '数值应在',
            numberangeLast: '之间',
            numberangeErr: '范围的校验规则有误',
            numberLT: '请输入小于等于',
            numberGT: '请输入大于等于',
            numberVal: '的数字',
            integer: '請輸入整數',
            integerp: '請輸入正整數',
            integern: '請輸入负整數',
            website: '網址格式不正確',
            chinese: '請輸入中文',
            psw1: '新舊密碼不能相同',
            psw2: '新舊密碼不能相同',
            psw2b: '兩次密碼輸入不一致',
            pswmix: '密碼需含有數字和字母',
            upload: '請選擇上傳文件',
            uploadformat: '上傳的文件格式不正確',
            maxlength: '長度不能大於',
            minlength: '長度不能小於',
            numlength2: '',
            maxrows: '數量不能超過',
            maxrows2: '行',
            spcode: '不能輸入下列任何字符組合：&#、<加字母、<\!、<\/'
        },
        en: {
            empty: 'Can not be empty',
            mail: 'Email format is incorrect',
            mobile: 'Phone format is incorrect',
            idcard: 'Idcard format is incorrect',
            six: 'Must be longger than six',
            number: '请输入数字',
            numberange: '数值应在',
            numberangeLast: '之间',
            numberangeErr: '范围的校验规则有误',
            numberLT: '请输入小于等于',
            numberGT: '请输入大于等于',
            numberVal: '的数字',
            integer: 'Please enter integer',
            integerp: 'Please enter positive integer',
            integern: 'Please enter negative integer',
            website: 'Website format is incorrect',
            chinese: 'Please enter Chinese',
            psw1: 'The old and new passwords can not be same',
            psw2: 'The old and new passwords can not be same',
            psw2b: 'The two new passwords must be same',
            pswmix: 'The password must contain numbers and letters',
            upload: 'Please select upload files',
            uploadformat: 'Upload file format is incorrect',
            maxlength: 'The Length could not more than',
            minlength: 'The Length could not less than',
            numlength2: '',
            maxrows: 'The number can not be exceeded',
            maxrows2: '',
            spcode: 'Could not input character just like &#、< & letter、<\!、<\/'
        }
    }

    var regex = {
        mail: /^([a-zA-Z0-9_\.\-\+])+\@(([a-zA-Z0-9\_-])+\.)+([a-zA-Z0-9]{2,7})+$/,
        mobile: /^1[3456789]\d{9}$/,
        chinese: /^[\u4E00-\u9FA5]+$/,
        num: /^\d+$/,
        idcard: /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/,
        idcardHK: /^[a-zA-Z]{1,2}\d{6}\([\daA]\)$/,
        six: /^\S{6,}$/,
        website: /^([hH][tT]{2}[pP]:\/\/|[hH][tT]{2}[pP][sS]:\/\/)?(([A-Za-z0-9-~]+)\.)+([A-Za-z0-9-~\/])+$/gi,
        spcode: /(&#|<[a-zA-Z]*|<!|<\/)/
    }
    var loadidx = 0;
    var Valid = window.Valid = function() {};

    var getMsg = function(lg) {
        var afterMsg = msg[lg] || {};
        return afterMsg;
    }

    Valid.prototype.blurs = function(obj, option) {
        var self = this;
        if (typeof(option) == 'undefined') {
            option = {};
        }
        // obj.on('keyup', '.txt, .psw1, .psw2, .psw2b, textarea', function() {
        //     var _this = $(this);
        //     chkval(_this, option);
        // });
        obj.on('blur', '.txt, .psw1, .psw2, .psw2b, textarea', function() {
            var _this = $(this);
            if(_this.data('delay') && parseInt(_this.data('delay')) > 0){
                setTimeout(function(){
                    chkval(_this, option);
                }, parseInt(_this.data('delay')))
            }else{
                chkval(_this, option);
            }
        })
        // });
        // return this;
    }
    Valid.prototype.check = function(obj, option) {
        var self = this;
        chkval(obj, option);
        return this;
    }
    Valid.prototype.errored = function(obj, msg) {
        var self = this;
        // chkval(obj, option);
        showErr(obj, msg, true);
    }
    Valid.prototype.checkall = function(obj, option) {
        var self = this;
        // var dtd = $.Deferred();
        isok = true;
        $('.txt, .psw1, .psw2, .psw2b, .radio-group, .check-group, .upload-group, textarea, select', obj).each(function() {
            var _this = $(this);
            var reqs = _this.data('reqs') || '';
            var arr = reqs.split(',') || [];
            var req = _this.data('req') || false;
            var v = getValue(_this);
            if ($.trim(v) === '') {
                var emptyTxt = _this.attr('data-empty-msg') || msg[option.language].empty;
                showErr(_this, emptyTxt, req);
                if (req) {
                    isok = false;
                }
            } else {
                if (arr.length > 0) {
                    for (var i = 0; i < arr.length; i++) {
                        if(_this.data('ignore') != 'ignore'){
                            var r = $.trim(arr[i]);
                            var b = chkErr(_this, r, v, option);
                            if (b === true) {
                                isok = false;
                                break;
                                // dtd.reject(false);
                                // return dtd.promise();
                            }    
                        }
                    }
                    // dtd.resolve(true);
                    // return dtd.promise();
                }
            }
            // }
        })
    }
    Valid.prototype.submit = function(obj, option) {
        var self = this;
        obj.on('submit', function(event) {
            self.checkall(obj, option);
            // $.when(self.checkall(obj, option)) 
            // .done(function(bool){
            if (option.isAsync) {
                event.preventDefault();
                if (isok) {
                    option.asyncFun();
                    return;
                } else {
                    option.errFun();
                    if (option.scrollToError == true) {
                        var firstError = $('.errself', obj).eq(0);
                        if (/select/.test(firstError.get(0).nodeName.toLowerCase())) {
                            firstError = firstError.next('.selector');
                        }
                        var firstErrorOffsetTop = firstError.offset().top;
                        $("body,html").animate({ scrollTop: firstErrorOffsetTop - 10 }, "fast");
                    };
                }
            }
            // })
        })
    }
    Valid.prototype.form = function(obj, option) {
        var self = this;
        var opts = $.extend({}, defaults, option);
        self.blurs(obj, opts);
        self.submit(obj, opts);
        self.checkbox(obj, opts);
        self.radio(obj, opts);
        self.select(obj, opts);
        self.upload(obj, opts);
        return this;
    }
    Valid.prototype.input = function(obj, opts) {
        var self = this;
        obj.on('blur', function() {
            self.check(obj, opts);
        });
        return this;
    }
    Valid.prototype.checkbox = function(obj, opts) {
        if (opts.isRenderCheckbox) {
            $('input[type=checkbox]', obj).checkboxSmart({
                callback: function(o) {
                    var chkgp = o.closest('.check-group');
                    var req = chkgp.data('req') || false;
                    if (req) {
                        showErrEmpty(chkgp, opts);
                    }
                }
            })
        } else {
            $('.check-group', obj).each(function() {
                var _this = $(this);
                var req = _this.data('req') || false;
                if (req) {
                    var _chk = _this.find('input[type="checkbox"]');
                    _chk.on('click', function() {
                        showErrEmpty(_this, opts);
                    });
                }
            });
        }
        return this;
    }
    Valid.prototype.radio = function(obj, opts) {
        var self = this;
        if ($('input[type=radio]', obj).length > 0) {
            if (opts.isRenderRadio) {
                $('input[type=radio]', obj).radioSmart({
                    callback: function(o) {
                        var radgp = o.closest('.radio-group');
                        var req = radgp.data('req') || false;
                        if (req) {
                            showErrEmpty(radgp, opts);
                        }
                    }
                })
            } else {
                $('.radio-group', obj).each(function() {
                    var _this = $(this);
                    var req = _this.data('req') || false;
                    if (req) {
                        var _rad = _this.find('input[type=radio]');
                        _rad.on('change', function() {
                            showErrEmpty($(this), opts);
                        });
                    }
                })
            }
        }
        return this;
    }
    Valid.prototype.select = function(obj, opts) {
        var self = this;
        if ($('select', obj).length > 0) {
            if (opts.isRenderSelect) {
                $('select', obj).selectSmart({
                    callback: function(i, k, v, o) {
                        var req = o.data('req') || false;
                        if (req) {
                            showErrEmpty(o, opts);
                        }
                    }
                })
            } else {
                $('select', obj).on('change', function() {
                    if (req) {
                        showErrEmpty($(this), opts);
                    }
                })
            }
        }
        return this;
    }
    Valid.prototype.upload = function(obj, opts) {
        var self = this;
        if ($('.upload-group', obj).length > 0) {
            $('.upload-group', obj).each(function() {
                var _this = $(this);
                var req = _this.data('req') || false;
                var _file = _this.find('input[type="file"]').eq(0);
                var _name = _this.find('input[type="text"]').eq(0);
                _file.on('change', function() {
                    var _val = $(this).val();
                    var _idx = _val.lastIndexOf('\\');
                    var _fname = _val.substring(_idx + 1, _val.length);
                    _name.val(_fname);
                    chkUpload(_this, _val);
                })
            })
        }
        return this;
    }

    var chkval = function(obj, option) {
        var reqs = obj.data('reqs') || '';
        var req = obj.data('req') || false;
        var arr = reqs.split(',');
        var v = getValue(obj);
        var emptyTxt = obj.attr('data-empty-msg') || msg[option.language].empty;
        if ($.trim(v) == '') {
            showErr(obj, emptyTxt, req);
        } else {
            showErr(obj, emptyTxt, false);
            for (var i = 0; i < arr.length; i++) {
                var r = $.trim(arr[i]);
                var b = chkErr(obj, r, v, option);
                if (b === true) {
                    return false;
                }
            }
        }
    }
    var getValue = function(o) {
        // var reqs = o.data('reqs') || '';
        // var arr = reqs.split(',');
        var v;
        var regTag1 = /(input|textarea)/;
        var regTag2 = /select/;
        if (regTag1.test(o.get(0).nodeName.toLowerCase())) {
            v = o.val() || '';
        }
        if (regTag2.test(o.get(0).nodeName.toLowerCase())) {
            v = o.find('option:selected').val() || '';
        }
        if (o.hasClass('radio-group') || o.hasClass('check-group')) {
            var name = o.find('input').eq(0).attr('name');
            v = o.find('input[name=' + name + ']:checked').val() || '';
        }
        if (o.hasClass('upload-group')) {
            var v = o.find('input[type=file]').val() || '';
        }
        return v;
    }
    var chkErr = function(o, r, v, opt) {
        var lang = getMsg(opt.language);
        switch (r) {
            case 'six':
                return chkRegex(regex.six, v) ? showErr(o, lang.six, false) : showErr(o, lang.six, true);
                break;
            case 'spcode':
                return chkRegex(regex.spcode, v) ? showErr(o, lang.spcode, true) : showErr(o, lang.spcode, false);
                break;
            case 'minlength':
                return chkMinLength(o, v, lang);
                break;
            case 'maxlength':
                return chkMaxLength(o, v, lang);
                break;
            case 'numberange':
                return chkNumberange(o, v, lang);
                break;
            case 'integer':
                return chkInteger(o, v, 'is', lang);
                break;
            case 'integerp':
                return chkInteger(o, v, 'gt', lang);
                break;
            case 'integerp0':
                return chkInteger(o, v, 'gt', lang, true);
                break;
            case 'integern':
                return chkInteger(o, v, 'lt', lang);
                break;
            case 'integern0':
                return chkInteger(o, v, 'lt', lang, true);
                break;
            case 'customize':
                return chkCustomize(o, v);
                break;
            case 'mail':
                return chkRegex(regex.mail, v) ? showErr(o, lang.mail, false) : showErr(o, lang.mail, true);
                break;
            case 'mobile':
                return chkRegex(regex.mobile, v) ? showErr(o, lang.mobile, false) : showErr(o, lang.mobile, true);
                break;
            case 'idcard':
                return chkRegex(regex.idcard, v) ? showErr(o, lang.idcard, false) : showErr(o, lang.idcard, true);
                break;
            case 'chinese':
                return chkRegex(regex.chinese, v) ? showErr(o, lang.chinese, false) : showErr(o, lang.chinese, true);
                break;
            case 'psw1':
                return chkPsw(o, r, v, lang);
                break;
            case 'psw2':
                return chkPsw(o, r, v, lang);
                break;
            case 'psw2b':
                return chkPsw(o, r, v, lang);
                break;
            case 'pswmix':
                return chkPswMix(o, v, lang);
                break;
            case 'upload':
                return chkUpload(o, v, lang);
                break;
            case 'query':
                chkQuery(o, v, lang);
                break;
            case 'maxrows':
                return chkTextRows(o, v, lang);
                break;
            case (r.match(/^custom/) || {}).input:
                chkCustom(o, v, r);
            default:
                return false;
        }
    }
    var chkRegex = function(regex, v) {
        var bool = regex.test(v);
        return bool;
    }
    var showErr = function(o, m, b) {
        var style = o.data('show') || 'append';
        var timer;
        o.parent().find('.errtip').remove();
        var side = o.data('err-side') || 'bottom-left'; // bottom-right // top-left // top-right
        if (b) {
            switch (style) {
                case 'append':
                    o.addClass('errself');
                    o.parent().append('<p class="errtip ' + side + '">' + HTMLEncode(m) + '</p>');
                    clearTimeout(timer);
                    timer = setTimeout(function() {
                        o.parent().find('.errtip').remove();
                    }, 1500);
                    isok = false;
                    break;
                case 'ceng':
                    ceng.msger(m, 0);
                    break;
            }
        } else {
            o.removeClass('errself').parent().find('.errtip').remove();
        }
        o.attr('data-status', !b);
        return b;
    }
    var showErrEmpty = function(o, option, sty) {
        var v = getValue(o);
        var bool = v == '';
        var emptyTxt = o.data('empty-msg') || msg[option.language].empty;
        showErr(o, emptyTxt, bool, sty);
        return bool;
    }

    var chkCustomize = function(o, v) {
        var curule = eval('(' + o.data('customize-rule') + ')') || {}
        var tip = o.data('customize-tip') || '请设置自定义提示语'
        var bool = !new RegExp(curule).test(v);
        return showErr(o, tip, bool)
    }
    
    var chkNumberange = function(o, v, lang) {
        var range = o.data('number-range') || '-1000000,1000000';

        if (range.toString().indexOf(',') == -1) {
            return showErr(o, lang.numberangeErr, true)
        }
        range = range.split(',');
        var r0 = $.trim(range[0]);
        var r1 = $.trim(range[1]);
        var bool;

        if(r0 == '' && r1 != NaN) { //   ex:[, 10]
            return showErr(o, lang.numberLT + r1 + lang.numberVal, v > parseInt(r1))
        }
        if(r0 != NaN && r1 == '') { //   ex:[10 ,]
            return showErr(o, lang.numberGT + r0 + lang.numberVal, v < parseInt(r0))
        }
        var rmin = parseInt(r0);
        var rmax = parseInt(r1);
        if(rmin != NaN && rmax != NaN && rmax > rmin) {
            var bool = v < rmin || v > rmax;
            return showErr(o, lang.numberange + '[' + rmin + '-' + rmax + ']' + lang.numberangeLast, bool)
        }
    }

    var chkInteger = function(o, v, rule, lang, zero) {
        var reg = '';
        switch (rule) {
            case 'gt':
                if(zero) {
                    reg = /^(\+?[0-9]*)$/;
                }else {
                    reg = /^(\+?[1-9][0-9]*)$/;
                }
                return showErr(o, lang.integerp, !reg.test(v));
                break;
            case 'lt':
                if(zero){
                    reg = /^0|-\+?[1-9]*$/;
                }else {
                    reg = /^-\+?[1-9][0-9]*$/;
                }
                return showErr(o, lang.integern, !reg.test(v));
                break;
            default:
                reg = /^-?\d+$/;
                return showErr(o, lang.integer, !reg.test(v));
        }
    }

    var chkMaxLength = function(o, v, l) {
        var length = parseInt(o.attr('data-max-length')) || 1024;
        var realength = $.trim(o.val()).length;
        var bool = realength > length;
        return showErr(o, l.maxlength + length + l.numlength2, bool);
    }

    var chkMinLength = function(o, v, l) {
        var length = parseInt(o.attr('data-min-length')) || 1;
        var realength = $.trim(o.val()).length;
        var bool = realength < length;
        return showErr(o, l.minlength + length + l.numlength2, bool);
    }

    var chkUpload = function(o, v, l) {
        var fm = o.data('format') || '';
        if (fm.length) {
            var idx = v.lastIndexOf('\.');
            var suffix = v.substring(idx + 1, v.length);
            var bool = fm.indexOf(suffix) == -1;
            return showErr(o, l.uploadformat, bool);
        }
    }
    var chkPsw = function(o, r, v, l) {
        var pswv1 = o.closest('form').find('.psw1').eq(0).val();
        var pswv2 = o.closest('form').find('.psw2').eq(0).val();
        var pswv2b = o.closest('form').find('.psw2b').eq(0).val();
        switch (r) {
            // case 'psw1':
            //     if (pswv2 != '' && v != '') {
            //         return pswv2 == v ? showErr(o, l.psw1, true) : showErr(o, l.psw1, false);
            //     }
            //     break;
            case 'psw2':
                if (pswv1 != '') {
                    if (v != '') {
                        return pswv1 == v ? showErr(o, l.psw2, true) : showErr(o, l.psw2, false);
                    }
                } else {
                    if (pswv2b != '' && v != '') {
                        return pswv2b != v ? showErr(o, l.psw2b, true) : showErr(o, l.psw2b, false);
                    }
                }
                break;
            case 'psw2b':
                if ((pswv2 != '') && (v != '')) {
                    return pswv2 != v ? showErr(o, l.psw2b, true) : showErr(o, l.psw2b, false);
                }
                break;
            default:
                return false;
        }
    }
    var chkPswMix = function(o, v, l){
        // var reg = /^((?=.*[0-9].*)(?=.*[A-Za-z].*))[_0-9A-Za-z]{6,}$/;
        var flag = v.match(".*[a-zA-Z]+.*") && v.match(".*[\\d]+.*");
        // var flag = reg.test(v);
        return showErr(o, l.pswmix, !flag);
    }
    var chkQuery = function(o, v, l) {
        if (o.hasClass('errself')) { // 如果本身已经是错误状态，只显示错误信息即可，否则同步验证
            showErr(o, o.attr('err-msg'), true);
            isok = false;
        } else {
            var url = o.attr('data-query') || '';
            var name = o.attr('name') || '';
            var qdata = o.attr('query-string') || '';
            var str = '';
            qdata = $.parseJSON(qdata);
            if (typeof qdata === 'object') {
                for (var p in qdata) {
                    str += '&' + p + '=' + qdata[p];
                }
            }
            var totaldata = o.attr('name') + '=' + o.val() + str;
            if (url.length) {
                $.ajax({
                        type: 'POST',
                        dataType: 'json',
                        url: url,
                        async: false,
                        data: totaldata
                    })
                    .done(function(data) {
                        var bool = !data.Status || false;
                        showErr(o, data.Message, bool);
                        if (bool === true) {
                            o.attr('err-msg', data.Message);
                        } else {
                            o.removeAttr('err-msg');
                        }
                    })
                    .fail(function(a, b, c) {})
                    .always(function() {});
            }
        }
    }
    var chkTextRows = function(o, v, l) {
        var rows = parseInt(o.data('max-rows')) || 100000000;
        var realrowArr = v.split('\n');
        var realrow = 0;
        for (var i = 0; i < realrowArr.length; i++) {
            if ($.trim(realrowArr[i]) == '') {
                continue;
            }
            realrow++;
        }
        var bool = realrow > rows;
        return showErr(o, l.maxrows + rows + l.maxrows2, bool);
    }


})(jQuery, window, document);
