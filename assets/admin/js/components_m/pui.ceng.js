/*
* @Author: sison.luo
* @Date:   2016-06-10 17:42:03
 * @Last Modified by:   sison.luo
 * @Last Modified time: 2018-02-25 17:42:33

    // 弹出层
*/

;(function($, window, undefined) {
    var config = {
        type: 1,
        opacity: 0.5,
        move: true,
        btn: ['确定', '取消'],
        title: '提示',
        content: '',
        inStyle: 'fadeIn',
        area: ['auto', 'auto'],
        closeBtn: false,
        // zindex: 19900207,
        success: function() {},
        end: function(c, z) {},
        yes: function(c, z) {},
        no: function(c, z) {},
        complete: function() {},
        close: function(c, z) {},
        // time: 1500, // 实参配置有效
        direct: 'down',
        style: ''
    };
    var loadidx = 0;
    var domStr = {};
    var cengArr = [];
    var Ceng = function() {};
    Ceng.prototype.msg = function(content, option) {
        var _this = this;
        controller('msg', config, option, content);
        return this;
    };
    Ceng.prototype.msger = function(content, state, time, endcallback) {
        var _this = this;
        var st = state === 1 ? 'resolve' : state === 0 ? 'notice' : '';
        switch (arguments.length) {
            case 1:
                _this.msg(content);
                break;
            case 2:
                _this.msg(content, {
                    state: st
                })
                break;
            case 3:
                _this.msg(content, {
                    state: st,
                    time: time
                })
                break;
            case 4:
                _this.msg(content, {
                    state: st,
                    time: time,
                    end: function() {
                        typeof(endcallback) === 'function' ? endcallback(): function() {}
                    }
                })
                break;
        }
    }
    Ceng.prototype.loading = function(content, option) {
        var _this = this;
        controller('loading', config, option, content);
        return loadidx;
    };
    Ceng.prototype.alert = function(content, option) {
        var _this = this;
        controller('alert', config, option, content);
        return this;
    };
    Ceng.prototype.comfirm = function(content, option) {
        var _this = this;
        controller('comfirm', config, option, content);
        return this;
    };
    Ceng.prototype.hello = function(option) {
        var _this = this;
        controller('hello', config, option);
        return this;
    };
    Ceng.prototype.iframe = function(option) {
        var _this = this;
        controller('iframe', config, option);
        return this;
    };
    Ceng.prototype.close = function(index, option) {
        var _this = this;
        var cur = $('#ceng' + index);
        var black = $('#black' + index);
        cur.removeClass('fadeIn');

        // cur.fadeOut(0, function() {
        var opts = cloneObj(config);
        if (option != 'undefined' && typeof(option) == 'object') {
            opts = $.extend(cloneObj(config), option);
        }
        if (typeof(opts.end) == 'function') {
            opts.end(cur, index);
        }
        // });
        black.css({
            'opacity': 0
        });
        setTimeout(function() {
            cur.remove();
            black.remove();
        }, 200);
        if (cur.attr('type') === 'dom') {
            $('body').append(domStr[index]);
        }
    };
    Ceng.prototype.closeLoading = function() {
        var _this = this;
        var loadidx = $('.ceng-loading').css('z-index') || 0;
        _this.close(loadidx);
    };
    Ceng.prototype.closeAll = function() {
        var _this = this;
        $('.ceng').removeClass('fadeIn');
        $('.ceng-black').css({
            'opacity': 0
        });
        setTimeout(function() {
            $('.ceng, .ceng-black').remove();
        }, 200);
        return this;
    };

    var controller = function(typ, config, option, content) {
        var opts = cloneObj(config);
        if (option != 'undefined' && typeof(option) == 'object') {
            opts = $.extend(cloneObj(config), option);
        }
        if (typ == 'hello' && opts.contentType == 'url') {
            $.ajax({
                type: opts.dtype || 'GET',
                url: opts.content,
                cache: false,
                data: opts.contentData,
                dataType: 'html',
                beforeSend: function() {
                    ceng.loading();
                }
            }).done(function(data) {
                var redata;
                if (typeof(data) == 'object') {
                    redata = data;
                } else if (typeof(data) == 'string') {
                    if (data.indexOf('"ErrorCode":') > -1) {
                        redata = JSON.parse(data);
                    } else {
                        createBlack(typ, opts);
                        var _html = createCeng(typ, Pui.toppestIndex, opts);
                        $('body').append(_html);
                        var cengdom = $('#ceng' + Pui.toppestIndex);
                        var cengcontent = cengdom.find('.ceng-content');
                        cengcontent.append(data);
                        appearIn(typ, cengdom, opts, Pui.toppestIndex);
                        cengcontent.css({
                            'overflow': 'auto'
                        });
                        Pui.toppestIndex++;
                        return;
                    }
                }
                if (redata.Status === false) {
                    if (parseInt(redata.ErrorCode) === -1) {
                        ceng.msger(redata.ErrorMessage, 0, 3000, function() {
                            top.location.reload();
                        })
                    } else {
                        ceng.msger(redata.ErrorMessage, 0)
                    }
                }
            }).fail(function() {
                // debugger;
                setTimeout(function() {
                    ceng.msger('网络异常！', 0)
                }, 300);
            }).always(function() {
                ceng.closeLoading();
            });
        } else {
            createBlack(typ, opts);
            // var c = content || '';
            var $html = createCeng(typ, Pui.toppestIndex, opts, content);
            $('body').append($html);
            var cengdom = $('#ceng' + Pui.toppestIndex);
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
                    loadidx = Pui.toppestIndex;
                    break;
                case 'hello':
                    if (opts.contentType === 'dom') {
                        domStr[Pui.toppestIndex] = $.trim(opts.content[0].outerHTML);
                        opts.content.remove();
                        cengdom.find('.ceng-content').append(domStr[Pui.toppestIndex]).children().show();
                        cengdom.attr('type', 'dom');
                    }
                    break;
                case 'iframe':
                    break;
            }
            appearIn(typ, cengdom, opts, Pui.toppestIndex);
            Pui.toppestIndex++;
            return Pui.toppestIndex++;
        }
    }



    var createCeng = function(t, z, o, c) {

        var $html = $('<div class="ceng ceng-' + t + '" id="ceng' + z + '" zindex="' + z + '">');
        var $close = $('<a href="javascript:void(0)" class="close-win"><i class="icon icon-close ant"></i></a>');
        var $title = $('<div class="ceng-title">');
        var $titleTxt = $('<p class="ellipsis">' + o.title + '</p>');
        if (o.closeBtn === true) {
            $title.append($titleTxt, $close);
        } else {
            $title.append($titleTxt);
        }
        var $content = $('<div class="ceng-content"></div>');
        var $contentSimple = $('<div class="ceng-content">').append(c);
        var $loading;
        if (c) {
            $loading = $('<div class="ceng-loaderTxt"></div>').append(c);
        } else {
            $loading = $('<div class="ceng-loader"><div class="bounce1"></div><div class="bounce2"></div><div class="bounce3"></div></div>');
        }
        var $contentiFrame = $('<div class="ceng-content"><iframe frameborder="0"></iframe></div>');
        var $btn = $('<div class="ceng-btn clearfix">');
        var $btnCenter = $('<div class="flexbtn">');
        if (o.btn.length > 0) {
            if (t == 'alert') {
                $btnCenter.append('<a href="javascript:void(0)" class="btn operbtn btn0">' + o.btn[0] + '</a>');
            } else {
                for (var i = 0, l = o.btn.length; i < l; i++) {
                    $btnCenter.append('<a href="javascript:void(0)" class="btn operbtn btn' + i + '">' + o.btn[i] + '</a>');
                }
            }
            $btn.append($btnCenter);
        } else {
            $btn = '';
        }


        switch (t) {
            case 'msg':
                $html.append($contentSimple);
                break;
            case 'loading':
                // $html = $('<div class="ceng ceng-loading" id="ceng' + z + '">');
                $html.append($loading);
                break;
            case 'alert':
                if (o.hasOwnProperty('style') && o.style != "") {
                    $html = $('<div class="ceng ceng-alert alert' + o.style + '" id="ceng' + z + '">');
                }
                $html.append($title);
                $html.append($contentSimple);
                $html.append($btn);
                break;
            case 'comfirm':
                if (o.hasOwnProperty('style') && o.style != "") {
                    $html = $('<div class="ceng ceng-comfirm comfirm' + o.style + '" id="ceng' + z + '">');
                }
                $html.append($title);
                $html.append($contentSimple);
                $html.append($btn);
                break;
            case 'hello':
                if (o.hasOwnProperty('style') && o.style != "") {
                    $html = $('<div class="ceng ceng-hello hello' + o.style + '" id="ceng' + z + '">');
                    $title = $('<div class="ceng-title">').append($close);
                }
                $html.append($title);
                $html.append($content);
                $html.append($btn);
                break;
            case 'iframe':
                $html.append($title);
                $html.append($contentiFrame);
                $html.append($btn);
                break;
        }
        return $html;
    };
    var createBlack = function(typ, opts) {
        var tmd = 0;
        if (typ == 'msg' || typ == 'loading') {
            tmd = opts.opacity == 0.5 ? 0 : opts.opacity;
        } else {
            tmd = opts.opacity;
        }
        var _html = '<div class="ceng-black" id="black' + Pui.toppestIndex + '" style="z-index: ' + Pui.toppestIndex + '"></div>';
        var _bid = "#black" + Pui.toppestIndex;
        $('body').append(_html);
        setTimeout(function() {
            $(_bid).css({
                'opacity': tmd
            });
        }, 0);
    }
    var appearIn = function(t, c, o, z) {
        var w = 0,
            h = 0,
            pd = 0;
        if (t == 'msg' || t == 'loading') {
            w = c.outerWidth();
            h = c.outerHeight();
            c.css({
                'margin-left': -w / 2,
                'margin-top': -h / 2,
                'left': '50%',
                'top': '50%',
                'z-index': z
            });
        } else {
            if (t == 'alert' || t == 'comfirm') {
                pd = 60;
                w = o.area[0] == 'auto' ? (c.outerWidth() >= $(window).width() ? $(window).width() - 40 : c.outerWidth()) : o.area[0];
                w = o.style == 2 ? w - 16 : w;
                c.css('width', w);

                if (o.area[1] == 'auto') {
                    h = c.outerHeight() >= $(window).height() ? $(window).height() - 40 : c.height();
                } else {
                    h = o.area[1] >= $(window).height() ? $(window).height() - 40 : o.area[1];
                }
                h = o.style == 2 ? h - 16 : h;
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
            if (o.style == 2) {
                c.css({
                    'left': $(window).width() / 2 - w / 2 - 4,
                    'top': $(window).height() / 2 - h / 2 - 4,
                    'z-index': z
                })
            } else {
                c.css({
                    'left': $(window).width() / 2 - w / 2,
                    'top': $(window).height() / 2 - h / 2,
                    'z-index': z
                })
            }
            var buttonh = c.find('.ceng-btn').outerHeight();
            var headerh = c.find('.ceng-title').outerHeight();
            var cch = h - buttonh - headerh - pd;
            cch = cch > 34 ? cch : 'auto';
            // c.find('.ceng-content').css({
            //     'height': cch
            // });
        };
        setTimeout(function(){
            c.addClass('fadeIn');
        }, 0);
        // close
        c.removeClass(o.inStyle);
        if (t == 'iframe') {
            if (o.hasOwnProperty('url')) {
                var u = o.url || 'http://www.talebase.com/';
                c.find('iframe').attr('src', u);
            }
        };
        c.find('.operbtn').on('click', function() {
            var idx = $(this).index() + 1;
            if (idx === 1) {
                if (!$(this).hasClass('disabled')) {
                    $(this).addClass('disabled');
                    if (t == 'alert') {
                        o.yes(c, z);
                        o.close(c, z);
                        ceng.close(z);
                    } else {
                        if (o.hasOwnProperty('btn1')) {
                            o.btn1(c, z);
                        } else {
                            o.yes(c, z);
                        }
                    }
                }
            } else if (idx === 2) {
                if (o.hasOwnProperty('btn2')) {
                    if (!$(this).hasClass('disabled')) {
                        $(this).addClass('disabled');
                        o.btn2(c, z);
                    }
                } else {
                    o.no(c, z);
                    o.close(c, z);
                    ceng.close(z);
                }
            } else {
                if (!$(this).hasClass('disabled')) {
                    $(this).addClass('disabled');
                    o['btn' + idx](c, z);
                }
            }
        });
        c.find('.close-win').on('click', function() {
            o.close(c, z);
            ceng.close(z);
        });
        setTimeout(function() {
            cengArr[z] = {
                cengX: c.css('left'),
                cengY: c.css('top'),
                oldX: 0,
                oldY: 0,
                flag: false
            }
            var t = c.children('.ceng-title');
            t.on('mousedown', function(e){
                t.get(0).onselectstart = function(){
                    return false;
                }
                cengArr[z].flag = true;
                cengArr[z].oldX = e.clientX;
                cengArr[z].oldY = e.clientY;
            });
            $(document)
                .on('mouseup', function(){
                    cengArr[z].flag = false;
                    cengArr[z].cengX = c.css('left');
                    cengArr[z].cengY = c.css('top');
                })
                .on('mousemove', function(e){
                    if(cengArr[z].flag){
                        var disX = e.clientX - cengArr[z].oldX;
                        var disY = e.clientY - cengArr[z].oldY;
                    }
                    c.css({
                        left: parseInt(cengArr[z].cengX) + disX,
                        top: parseInt(cengArr[z].cengY) + disY
                    });
                    stopDefault(e);
                });
            o.complete(c, z);
        }, 100);
        if (t == 'loading') {
            var loadingTime = o.time || 86400;
            setTimeout(function() {
                ceng.close(z);
            }, loadingTime);
        };
        if (t == 'msg') {
            var msgTime = o.time || 1500;
            setTimeout(function() {
                o.end(c);
                ceng.close(z);
            }, msgTime);
        };
    }
    var cloneObj = function(o) {
        var o2 = o instanceof Array ? [] : {};
        for (var k in o) {
            o2[k] = typeof o[k] === Object ? cloneObj(o[k]) : o[k];
        }
        return o2;
    }

    ceng = new Ceng();

})(jQuery, window, document);
