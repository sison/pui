/*
* @Author: sison.luo
* @Date:   2016-05-10 17:42:03
* @Last Modified by:   sison.luo
* @Last Modified time: 2016-10-26 13:49:56
* 
            //  pc 验证插件
*/

(function ($, window, undefined) {
    var defaults = {
        isAsync: false, // 默认 form 提交， true 为异步
        isRenderCheckbox: false, // 是否渲染 checkbox
        isRenderRadio: false, // 是否渲染 radio
        isRenderSelect: false,
        isRenderUpload: false,
        asyncFun: function () { }
    }
    var isok = false;
    var msg = {
        empty: '该字段不能为空',
        mail: '邮箱格式不正确',
        mobile: '手机格式不正确',
        idcard: '身份证格式不正确',
        six: '长度不能小于6位数',
        number: '请输入数字',
        website: '网址格式不正确',
        chinese: '请输入中文',
        psw1: '新旧密码不能相同',
        psw2: '新旧密码不能相同',
        psw2b: '两个新密码不相同',
        upload: '请选择上传文件',
        uploadformat: '上传的文件格式不正确'
    }
    var regex = {
        mail: /^([a-zA-Z0-9_\.\-\+])+\@(([a-zA-Z0-9\_-])+\.)+([a-zA-Z0-9]{2,5})+$/,
        mobile: /^1[345789]\d{9}$/,
        chinese: /^[\u4E00-\u9FA5]+$/,
        num: /^\d+$/,
        idcard: /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/,
        six: /^\S{6,}$/,
        website: /(http\:\/\/)?([\w.]+)(\/[\w- \.\/\?%&=]*)?/gi
    }
    var loadidx = 0;
    Valid = function () { };

    Valid.prototype.blurs = function (obj, option) {
        var self = this;
        $('.txt, .psw1, .psw2, .psw2b, textarea', obj).each(function () {
            var _this = $(this);
            _this.on('blur', function () {
                chkval(_this, option);
            })
        });
        return this;
    }

    Valid.prototype.check = function (obj, option) {
        var self = this;
        chkval(obj, option);
        return this;
    }

    Valid.prototype.checkall = function (obj, option) {
        var self = this;
        isok = true;
        $('.txt, .psw1, .psw2, .psw2b, .radio-group, .check-group, .upload-group, textarea, .select-group', obj).each(function () {
            var _this = $(this);
            // var status;
            // if (_this.data('req')) {
            //     status = _this.data('status') || false;
            //     debugger;
            // } else {
            //     status = _this.data('status') || true;
            //     debugger;
            // }
            // debugger;
            // if (!status) {
            var reqs = _this.data('reqs') || '';
            var arr = reqs.split(',') || [];
            var req = _this.data('req') || false;
            var v = getValue(_this);
            // debugger;
            if ($.trim(v) == '') {
                showErr(_this, msg.empty, req);
                // debugger;
                if (req) {
                    isok = false;
                }
            } else {
                // debugger;
                if (arr.length > 0) {
                    for (var i = 0; i < arr.length; i++) {
                        var a = $.trim(arr[i]);
                        if (a != 'query') {
                            if (chkErr(_this, a, v)) {
                                isok = false;
                                return;
                            } else {
                                return;
                            }
                        } else {
                            return;
                        }
                    }
                }
            }
            // }
        });
        return this;
    }
    Valid.prototype.submit = function (obj, option) {
        var self = this;
        obj.on('submit', function (event) {
            self.checkall(obj, option);
            if (isok) {
                if (option.isAsync) {
                    event.preventDefault();
                    option.asyncFun();
                    return;
                }
            }
            return isok;
        });
        return this;
    }
    Valid.prototype.form = function (obj, option) {
        var self = this;
        var opts = $.extend({},defaults, option);
        self.blurs(obj, opts);
        self.submit(obj, opts);
        if (opts.isRenderCheckbox) self.checkbox(obj, opts);
        if (opts.isRenderRadio) self.radio(obj, opts);
        if (opts.isRenderSelect) self.select($('select', obj), opts);
        if (opts.isRenderUpload) self.upload($('.upload-group', obj), opts);
        return this;
    }
    Valid.prototype.input = function (obj, option) {
        var self = this;
        var opts = $.extend({}, defaults, option);
        obj.on('blur', function () {
            self.check(obj, option);
        })
        return this;
    }
    Valid.prototype.checkbox = function (obj, option) {
        var self = this;
        var opts = $.extend({}, defaults, option);
        if (opts.isRenderCheckbox) {
            $('input[type=checkbox]', obj).checkboxSmart({
                callback: function (o) {
                    var chkgp = o.closest('.check-group');
                    var req = chkgp.data('req') || false;
                    if (req) {
                        showErrEmpty(chkgp);
                    }
                }
            });
        } else {
            $('.check-group', obj).each(function () {
                var _this = $(this);
                var req = _this.data('req') || false;
                if (req) {
                    var _chk = _this.find('input[type="checkbox"]');
                    _chk.on('click', function () {
                        showErrEmpty(_this);
                    });
                }
            });
        }
        return this;
    }
    Valid.prototype.radio = function (obj, option) {
        var self = this;
        var opts = $.extend({}, defaults, option);
        if (opts.isRenderRadio) {
            $('input[type=radio]', obj).radioSmart({
                callback: function (o) {
                    var radgp = o.closest('.radio-group');
                    var req = radgp.data('req') || false;
                    if (req) {
                        showErrEmpty(radgp);
                    }
                }
            });
        } else {
            $('.radio-group', obj).each(function () {
                var _this = $(this);
                var req = _this.data('req') || false;
                if (req) {
                    var _rad = _this.find('input[type=radio]');
                    _this.on('change', function () {
                        showErrEmpty($(this));
                    });
                }
            })
        }
        return this;
    }
    Valid.prototype.select = function (obj, option) {
        var self = this;
        var opts = $.extend({}, defaults, option);
        if (opts.isRenderSelect) {
            $(obj).selectSmart({
                callback: function (i, k, v, o) {
                    var req = o.data('req') || false;
                    if (req) {
                        showErrEmpty(o);
                    }
                }
            });
        }
        return this;
    }
    Valid.prototype.upload = function (obj, option) {
        var self = this;
        var opts = $.extend({}, defaults, option);
        $(obj).each(function () {
            var _this = $(this);
            var req = _this.data('req') || false;
            var _file = _this.find('input[type="file"]').eq(0);
            var _name = _this.find('input[type="text"]').eq(0);
            _file.on('change', function () {
                var _val = $(this).val();
                var _idx = _val.lastIndexOf('\\');
                var _fname = _val.substring(_idx + 1, _val.length);
                _name.val(_fname);
                chkUpload(_this, _val);
            });
        });
        return this;
    }

    var chkval = function (obj, option) {
        var reqs = obj.data('reqs') || '';
        var req = obj.data('req') || false;
        var arr = reqs.split(',');
        var v = getValue(obj);
        if ($.trim(v) == '') {
            showErr(obj, msg.empty, req);
        } else {
            showErr(obj, msg.empty, false);
            for (var i = 0; i < arr.length; i++) {
                var a = $.trim(arr[i]);
                if (chkErr(obj, a, v)) {
                    return;
                }
            }
        }
    }
    var getValue = function (o) {
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
    var chkErr = function (o, r, v) {
        switch (r) {
            case 'six':
                return chkRegex(regex.six, v) ? showErr(o, msg.six, false) : showErr(o, msg.six, true);
                break;
            case 'mail':
                return chkRegex(regex.mail, v) ? showErr(o, msg.mail, false) : showErr(o, msg.mail, true);
                break;
            case 'mobile':
                return chkRegex(regex.mobile, v) ? showErr(o, msg.mobile, false) : showErr(o, msg.mobile, true);
                break;
            case 'idcard':
                return chkRegex(regex.idcard, v) ? showErr(o, msg.idcard, false) : showErr(o, msg.idcard, true);
                break;
            case 'chinese':
                return chkRegex(regex.chinese, v) ? showErr(o, msg.chinese, false) : showErr(o, msg.chinese, true);
                break;
            case 'psw1':
                return chkPsw(o, v, r);
                break;
            case 'psw2':
                return chkPsw(o, v, r);
                break;
            case 'psw2b':
                return chkPsw(o, v, r);
                break;
            case 'upload':
                return chkUpload(o, v);
                break;
            case 'query':
                chkQuery(o, v);
                break;
            default:
                return false;
        }
    }
    var chkRegex = function (regex, v) {
        return regex.test(v);
    }
    var showErr = function (o, m, b) {
        var style = o.data('show') || 'append';
        switch (style) {
            case 'append':
                var timer;
                o.parent().find('.errtip').remove();
                if (b) {
                    o.addClass('errself');
                    o.parent().append('<p class="errtip">' + m + '</p>');
                    clearTimeout(timer);
                    timer = setTimeout(function () {
                        o.parent().find('.errtip').remove();
                    }, 1500);
                } else {
                    o.removeClass('errself').parent().find('.errtip').remove();
                }
                break;
            case 'ceng':
                alert(m);
                break;
        }
        o.attr('data-status', !b);
        return b;
    }
    var showErrUpload = function (o, m, b) {
        showErr(o, m, b);
        showErr(o.find('.txt'), msg.empty, b);
    }
    var showErrEmpty = function (o, sty) {
        var v = getValue(o);
        var bool = v == '';
        showErr(o, msg.empty, bool, sty);
        return bool;
    }
    var chkUpload = function (o, v) {
        var fm = o.data('format') || '';
        if (fm.length) {
            var idx = v.lastIndexOf('\.');
            var suffix = v.substring(idx + 1, v.length);
            var bool = fm.indexOf(suffix) == -1;
            // return showErr(o, msg.uploadformat, bool);
            return showErrUpload(o, msg.uploadformat, bool);
        } else {
            // return showErrEmpty(o);
            return showErrUpload(o, msg.uploadformat, bool);
        }
    }
    var chkPsw = function (o, v, who) {
        var pswv1 = o.closest('form').find('.psw1').eq(0).val();
        var pswv2 = o.closest('form').find('.psw2').eq(0).val();
        var pswv2b = o.closest('form').find('.psw2b').eq(0).val();
        switch (who) {
            case 'psw1':
                if (pswv2 != '' && v != '') {
                    return pswv2 == v ? showErr(o, msg.psw1, true) : showErr(o, msg.psw1, false);
                }
                break;
            case 'psw2':
                if (pswv1 != '' && v != '') {
                    return pswv1 == v ? showErr(o, msg.psw2, true) : showErr(o, msg.psw2, false);
                }
                if (pswv2b != '' && v != '') {
                    return pswv2b != v ? showErr(o, msg.psw2b, true) : showErr(o, msg.psw2b, false);
                }
                break;
            case 'psw2b':
                if (pswv2 != '' && v != '') {
                    return pswv2 != v ? showErr(o, msg.psw2b, true) : showErr(o, msg.psw2b, false);
                }
                break;
            default:
                return false;
        }
    }
    var chkQuery = function (o, v) {
        if (o.hasClass('errself')) {   // 如果本身已经是错误状态，只显示错误信息即可，否则异步验证
            showErr(o, o.attr('err-msg'), true);
            isok = false;
        } else {
            var url = o.attr('data-query') || '';
            var name = o.attr('name') || '';
            var qdata = o.attr('query-string') || '';
            var str = '';
            qdata = $.parseJSON(qdata);
            //debugger;
            if (typeof qdata === 'object') {
                for (p in qdata) {
                    str += '&' + p + '=' + qdata[p];
                }
            }
            var totaldata = o.attr('name') + '=' + o.val() + str;
            if (url.length) {
                $.ajax({
                    type: 'GET',
                    dataType: 'json',
                    url: url,
                    data: totaldata,
                    beforeSend: function () { }
                })
                    .done(function (data) {
                        var bool = !data.Status || false;
                        showErr(o, data.Message, bool);
                        if (bool === true) {
                            o.attr('err-msg', data.Message);
                        } else {
                            o.removeAttr('err-msg');
                        }
                    })
                    .fail(function (a, b, c) {
                        //console(b);
                    })
                    .always(function () { });
            }
        }
    }





    valid = new Valid();

})(jQuery, window, document);
