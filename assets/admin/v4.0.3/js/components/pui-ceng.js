/*
* @Author: sison.luo
* @Date:   2016-06-10 17:42:03
* @Last Modified by:   sison.luo
* @Last Modified time: 2016-10-26 13:49:04

    // 弹出层
*/

(function ($, window, undefined) {
    var config = {
        type: 1,
        opacity: 0.5,
        move: true,
        btn: ['确定', '取消'],
        title: '标题',
        content: '',
        inStyle: 'fadeIn',
        area: ['auto', 'auto'],
        closeBtn: true,
        zindex: 19900207,
        success: function () {},
        end: function () {},
        yes: function (c, z) {},
        no: function (c, z) {},
        complete: function () {},
        close: function () {}
    };
    var loadidx = 0;
    var domStr = {};
    var Ceng = function () { };
    Ceng.prototype.msg = function (content, option) {
        var self = this;
        controller('msg', config, option, content);
        return this;
    }
    Ceng.prototype.loading = function (option) {
        var self = this;
        controller('loading', config, option);
        return this;
    }
    Ceng.prototype.alert = function (content, option) {
        var self = this;
        controller('alert', config, option, content);
        return this;
    }
    Ceng.prototype.comfirm = function (content, option) {
        var self = this;
        controller('comfirm', config, option, content);
        return this;
    }
    Ceng.prototype.hello = function (option) {
        var self = this;
        controller('hello', config, option);
        return this;
    }
    Ceng.prototype.iframe = function (option) {
        var self = this;
        controller('iframe', config, option);
        return this;
    }
    Ceng.prototype.close = function (index, option) {
        var self = this;
        var cur = $('#ceng' + index);
        var black = $('#black' + index);
        // cur.fadeOut(300, function(){
        // black.fadeOut(300, function(){
        cur.fadeOut(100, function () {
            var opts = cloneObj(config);
            if (option != 'undefined' && typeof (option) == 'object') {
                opts = $.extend(cloneObj(config), option);
            };
            cur.remove();
            if (typeof (opts.end) == 'function') {
                opts.end();
            }
        });
        black.fadeOut(200, function () {
            black.remove();
        });
        if (cur.attr('type') === 'dom') {
            $('body').append(domStr[index]);
        }
        return this;
    }
    Ceng.prototype.closeAll = function () {
        var self = this;
        $('.ceng, .ceng-black').fadeOut(200, function () {
            $(this).remove();
        });
        return this;
    }
    var controller = function (typ, config, option, content) {
        var opts = cloneObj(config);
        if (option != 'undefined' && typeof (option) == 'object') {
            opts = $.extend(cloneObj(config), option);
        };
        if (typ == 'hello' && opts.contentType == 'url') {
            $.ajax({
                type: 'GET',
                url: opts.content,
                data: opts.contentData,
                dataType: 'html',
                beforeSend: function () {
                    ceng.loading();
                }
            }).done(function (data) {
                createBlack(typ);
                var _html = createCeng(typ, config.zindex, opts);
                $('body').append(_html);
                var cengdom = $('#ceng' + config.zindex);
                var cengcontent = cengdom.find('.ceng-content');
                cengcontent.append(data);
                appearIn(typ, cengdom, opts, config.zindex);
                cengcontent.css({
                    'overflow': 'auto'
                });
                config.zindex++;
            }).fail(function () {
                ceng.msg('请求失败！', {
                    state: 'notice'
                });
            }).always(function () {
                ceng.close(loadidx);
            });
        } else {
            createBlack(typ);
            var c = content || '';
            var _html = createCeng(typ, config.zindex, opts, c);
            $('body').append(_html);
            var cengdom = $('#ceng' + config.zindex);
            switch (typ) {
                case 'msg':
                    if (opts.hasOwnProperty('state')) {
                        var s = opts.state || 'normal';
                        switch (s) {
                            case 'notice':
                                cengdom.addClass('notice').children('.ceng-content').append('<i class="icon icon-state icon-sign-full"></i>');
                                break;
                            case 'resolve':
                                cengdom.addClass('resolve').children('.ceng-content').append('<i class="icon icon-state icon-resolve-full"></i>');
                                break;
                        }
                    }
                    break;
                case 'alert':
                    break;
                case 'comfirm':
                    break;
                case 'loading':
                    loadidx = config.zindex;
                    break;
                case 'hello':
                    if (opts.contentType === 'dom') {
                        domStr[config.zindex] = $.trim(opts.content[0].outerHTML);
                        opts.content.remove();
                        cengdom.find('.ceng-content').append(domStr[config.zindex]).children().show();
                        cengdom.attr('type', 'dom');
                    }
                    break;
                case 'iframe':
                    break;
            };
            appearIn(typ, cengdom, opts, config.zindex);
            config.zindex++;
        }
    }

    var createCeng = function (t, z, o, c) {
        var _html = '<div class="ceng ceng-' + t + ' ' + o.inStyle + '" id="ceng' + z + '">';
        var _close = '<a href="javascript:void(0)" class="close-win"><i class="icon icon-close ant"></i></a>';
        var _title = '<div class="ceng-title"><p class="ellipsis">' + o.title + '</p>' + _close + '</div>';
        var _content = '<div class="ceng-content"></div>';
        var _contentSimple = '<div class="ceng-content">' + c + '</div>';
        var _loading = '<div class="ceng-loader"><div class="bounce1"></div><div class="bounce2"></div><div class="bounce3"></div></div>';
        var _contentiFrame = '<div class="ceng-content"><iframe frameborder="0"></iframe></div>';
        var _btn = '<div class="ceng-btn clearfix"><div class="absolutecenter">';
        if (o.btn.length) {
            if (t == 'alert') {
                _btn += '<a href="javascript:void(0)" class="btn operbtn btn0 acsub">' + o.btn[0] + '</a>';
            } else {
                for (var i = 0, l = o.btn.length; i < l; i++) {
                    _btn += '<a href="javascript:void(0)" class="btn operbtn btn' + i + ' acsub">' + o.btn[i] + '</a>';
                }
            }
        }
        _btn += '</div></div>';
        if (o.btn === 0) {
            _btn = '';
        }
        switch (t) {
            case 'msg':
                _html += _contentSimple;
                break;
            case 'loading':
                _html = '<div class="ceng ceng-loading" id="ceng' + z + '">';
                _html += _loading;
                break;
            case 'alert':
                _html += _title;
                _html += _contentSimple;
                _html += _btn;
                break;
            case 'comfirm':
                if (o.hasOwnProperty('style')) {
                    _html = '<div class="ceng ceng-comfirm comfirm' + o.style + ' ' + o.inStyle + '" id="ceng' + z + '">';
                    _title = '<div class="ceng-title">' + _close + '</div>';
                }
                _html += _title;
                _html += _contentSimple;
                _html += _btn;
                break;
            case 'hello':
                if (o.hasOwnProperty('style')) {
                    _html = '<div class="ceng ceng-hello hello' + o.style + ' ' + o.inStyle + '" id="ceng' + z + '">';
                    _title = '<div class="ceng-title">' + _close + '</div>';
                }
                _html += _title;
                _html += _content;
                _html += _btn;
                break;
            case 'iframe':
                _html += _title;
                _html += _contentiFrame;
                _html += _btn;
                break;
        }
        _html += '</div>';
        return _html;
    }
    var createBlack = function (typ) {
        var tmd = 0;
        if (typ == 'msg' || typ == 'loading') {
            tmd = 0;
        } else {
            tmd = config.opacity;
        }
        var _html = '<div class="ceng-black" id="black' + config.zindex + '" style="opacity:' + tmd + ';filter: alpha(opacity=' + tmd + ')"></div>';
        $('body').append(_html);
        // $('#black' + config.zindex).css('z-index', config.zindex).fadeIn(200);
        $('#black' + config.zindex).css('z-index', config.zindex).show();
    }
    var appearIn = function (t, c, o, z) {
        var w = 0, h = 0, pd = 0;
        if (t == 'msg' || t == 'loading') {
            w = c.outerWidth();
            h = c.outerHeight();
            c.css({
                'margin-left': -w / 2,
                'margin-top': -h / 2,
                'z-index': z
            });
        } else {
            if (t == 'alert' || t == 'comfirm') {
                pd = 60;
                w = o.area[0] == 'auto' ? (c.outerWidth() > 500 ? 500 : c.outerWidth()) : o.area[0];
                c.css('width', w);
                if (o.area[1] == 'auto') {
                    h = c.outerHeight();
                } else {
                    h = o.area[1];
                }
                c.css('height', h);
            }
            if (t == 'hello' || t == 'iframe') {
                w = o.area[0] == 'auto' ? c.outerWidth() : o.area[0];
                c.css('width', w);
                if (o.area[1] == 'auto') {
                    h = c.height() >= $(window).height() ? $(window).height() - 40 : c.outerHeight();
                } else {
                    h = o.area[1] >= $(window).height() ? $(window).height() - 40 : o.area[1];
                }
                c.css('height', h);
            }
            c.css({
                'margin-left': -w / 2,
                'margin-top': -h / 2,
                'z-index': z
            });
            //setTimeout(function () {
                var buttonh = c.find('.ceng-btn').outerHeight();
                var headerh = c.find('.ceng-title').outerHeight();
                c.find('.ceng-content').css({
                    'height': h - buttonh - headerh - pd
                });
            //}, 0);
        };
        c.removeClass(o.inStyle);
        if (t == 'iframe') {
            if (o.hasOwnProperty('url')) {
                var u = o.url || 'http://www.benbenla.com/';
                c.find('iframe').attr('src', u);
            }
        };
        c.find('.operbtn').on('click', function () {
            var idx = $(this).index() + 1;
            if (idx === 1) {
                if (t == 'alert') {
                    o.yes(c, z);
                    ceng.close(z, o);
                } else {
                    if (o.hasOwnProperty('btn1')) {
                        o.btn1(c, z);
                    } else {
                        o.yes(c, z);
                    }
                }
            } else if (idx === 2) {
                if (o.hasOwnProperty('btn2')) {
                    o.btn2(c, z);
                } else {
                    o.no(c, z);
                    ceng.close(z, o);
                }
            } else {
                o['btn' + idx](c, z);
            }
        });
        c.find('.close-win').on('click', function () {
            ceng.close(z, o);
        });
        setTimeout(function () {
            o.complete(c, z);
        }, 100);
        if (t == 'msg') {
            var time = t == 'msg' ? o.time || 2000 : o.time || 9999999999;
            setTimeout(function () {
                ceng.close(z, o);
            }, time);
        };
    }
    var cloneObj = function (o) {
        var o2 = o instanceof Array ? [] : {};
        for (var k in o) {
            o2[k] = typeof o[k] === Object ? cloneObj(o[k]) : o[k];
        }
        return o2;
    }

    ceng = new Ceng();

})(jQuery, window, document);
