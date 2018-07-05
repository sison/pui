/*
 * @Author: sison.luo
 * @Date:   2016-09-21 15:46:34
 * @Last Modified by: sison
 * @Last Modified time: 2018-06-27 11:57:49
 */

/*

    input 非正常格式ie无法正确读取
    format 非双位数也会有问题

*/



;
(function ($, window, undefined) {
    var weekLanguage = {
        'cn': ['日', '一', '二', '三', '四', '五', '六', '日', '一', '二', '三', '四', '五'],
        'hk': ['日', '一', '二', '三', '四', '五', '六', '日', '一', '二', '三', '四', '五'],
        'en': ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri']
    }
    var defaults = {
        weeklang: 'cn',
        weekfirst: 0,
        toppest: false,
        minDate: '1900/01/01 00:00:00',
        maxDate: '2099/12/31 23:59:59',
        format: 'YYYY/MM/DD hh:mm:ss',
        onselect: function () { },
        onclear: function () { },
        onshow: function () { }
    }


    $.fn.daterSmart = function (options) {

        var opts = $.extend({}, defaults, options);
        return this.each(function () {
            var dater = new Dater($(this), opts);
            dater.init();
        });
    }

    var Dater = function (ele, opts) {
        this.ele = ele;
        this.el = {};
        this.opts = opts;
        this.weekfirst = this.opts.weekfirst
        this.weeklang = weekLanguage[this.opts.weeklang];
        this.obj = this.ele.parent('.daterbox');
        this.state = false;
        this.showing = 'day';
        this.defYmin = 1900;
        this.defYmax = 2099;

        this.Y = 2099;
        this.M = 12;
        this.D = 31;
        this.h = 0;
        this.m = 0;
        this.s = 0;
    }

    Dater.prototype.init = function () {
        this.bind();
        this.container = this.ele.parent('.daterbox');
        var v = this.ele.val();
        if (v != '') {
            // console.log(v);
            this.ele.val(this.send(v));
        }
    }

    Dater.prototype.getEveryDate = function (v) {
        // date 必须是可转化的标准格式
        var _this = this;
        var tempY = 0;
        var tempM = 0;
        var tempD = 0;
        var temph = 0;
        var tempm = 0;
        var temps = 0;
        var tempObj = {};
        var tempDate = new Date(v);
        var format = _this.opts.format; // 比较
        var _result = _this.opts.format;  // 修改
        // debugger;


        if (format.indexOf('YYYY') > -1) {
            tempY = v.substr(format.indexOf('YYYY'), 4);
            _result = _result.replace('YYYY', tempDate.getFullYear());

        } else if (format.indexOf('YY') > -1) {
            tempY = v.substr(format.indexOf('YY'), 2);
            _result = _result.replace('YY', tempDate.getFullYear().toString().substr(2, 2));
        }

        if (format.indexOf('MM') > -1) {
            tempM = v.substr(format.indexOf('MM'), 2);
            _result = _result.replace('MM', doubleDT(tempDate.getMonth() + 1));
        } else if (format.indexOf('M') > -1) {
            if(parseInt(v.charAt(format.indexOf('M') + 1)) >= 0){
                tempM = v.substr(format.indexOf('M'), 2);
            } else {
                tempM = v.substr(format.indexOf('M'), 1);
            }
            _result = _result.replace('M', tempDate.getMonth() + 1);
        }

        if (format.indexOf('DD') > -1) {
            tempD = v.substr(format.indexOf('DD'), 2);
            _result = _result.replace('DD', doubleDT(tempDate.getDate()));
        } else if (format.indexOf('D') > -1) {
            if(parseInt(v.charAt(format.indexOf('D') + 1)) >= 0){
                tempD = v.substr(format.indexOf('D'), 2);
            } else {
                tempD = v.substr(format.indexOf('D'), 1);
            }
            _result = _result.replace('D', tempDate.getDate())
        }

        if (format.indexOf('hh') > -1) {
            temph = v.substr(format.indexOf('hh'), 2);
            _result = _result.replace('hh', doubleDT(tempDate.getHours()));
        } else if (format.indexOf('h') > -1) {
            if(parseInt(v.charAt(format.indexOf('h') + 1)) >= 0){
                temph = v.substr(format.indexOf('h'), 2);
            } else {
                temph = v.substr(format.indexOf('h'), 1);
            }
            _result = _result.replace('h', tempDate.getHours());
        }

        if (format.indexOf('mm') > -1) {
            tempm = v.substr(format.indexOf('mm'), 2);
            _result = _result.replace('mm', doubleDT(tempDate.getMinutes()));
        } else if (format.indexOf('m') > -1) {
            if(parseInt(v.charAt(format.indexOf('m') + 1)) >= 0){
                tempm = v.substr(format.indexOf('m'), 2);
            } else {
                tempm = v.substr(format.indexOf('m'), 1);
            }
            _result = _result.replace('m', tempDate.getMinutes());
        }

        if (format.indexOf('ss') > -1) {
            temps = v.substr(format.indexOf('ss'), 2);
            _result = _result.replace('ss', doubleDT(tempDate.getSeconds()));
        } else if (format.indexOf('s') > -1) {
            if(parseInt(v.charAt(format.indexOf('s') + 1)) >= 0){
                temps = v.substr(format.indexOf('s'), 2);
            } else {
                temps = v.substr(format.indexOf('s'), 1);
            }
            _result = _result.replace('s', tempDate.getSeconds());
        }

        tempObj.Y = tempY;
        tempObj.M = tempM;
        tempObj.D = tempD;
        tempObj.h = temph;
        tempObj.m = tempm;
        tempObj.s = temps;
        tempObj.str = _result;

        return tempObj;
    }

    Dater.prototype.send = function(v){
        var _this = this;
        return _this.getEveryDate(v).str;
    }

    Dater.prototype.bind = function () {
        var _this = this;
        _this.ele.on('click', function (e) {
            $(document).click();
            stopropagation(e);
            if (!_this.state) {
                _this.state = true;
                var v = $(this).val();
                if ($.trim(v) != '') {
                    // if (new Date(v).getTime() > 0) {
                        _this.renderHTML(v)
                    // } else {
                    //     _this.ele.select();
                    //     if (typeof (ceng) == 'object') {
                    //         ceng.alert('日期格式有误', {
                    //             yes: function () {
                    //                 _this.ele.val('')
                    //                 _this.state = false;
                    //             }
                    //         })
                    //     } else {
                    //         alert('日期格式有误');
                    //         _this.ele.val('');
                    //         _this.state = false;
                    //     }
                    // }
                } else {
                    _this.renderHTML();
                }
            }
        })
    }

    Dater.prototype.valid = function (v) {
        var _this = this;
        return true;
    }

    Dater.prototype.renderHTML = function (date) {
        var _this = this;
        var hasTime = _this.opts.format.indexOf('hh') > -1 || _this.opts.format.indexOf('mm') > -1 || _this.opts.format.indexOf('ss') > -1;

        if (date) {
            debugger;

            _this.Y = _this.getEveryDate(date).Y;
            _this.M = _this.getEveryDate(date).M;
            _this.D = _this.getEveryDate(date).D;
            _this.h = _this.getEveryDate(date).h;
            _this.m = _this.getEveryDate(date).m;
            _this.s = _this.getEveryDate(date).s;
            // date = new Date(date);
            // _this.Y = date.getFullYear();
            // // _this.M = doubleDT(date.getMonth()+1);
            // // _this.D = doubleDT(date.getDate());
            // // _this.h = doubleDT(date.getHours());
            // // _this.m = doubleDT(date.getMinutes());
            // // _this.s = doubleDT(date.getSeconds());
            // _this.M = date.getMonth() + 1;
            // _this.D = date.getDate();
            // _this.h = date.getHours();
            // _this.m = date.getMinutes();
            // _this.s = date.getSeconds();
            // _this.Y = date.getTakePlace(_this.opts.format, 'YYYY');
            // _this.M = date.getTakePlace(_this.opts.format, 'MM');
            // _this.D = date.getTakePlace(_this.opts.format, 'DD');
            // _this.h = date.getTakePlace(_this.opts.format, 'hh');
            // _this.m = date.getTakePlace(_this.opts.format, 'mm');
            // _this.s = date.getTakePlace(_this.opts.format, 'ss');
        } else {
            var _now = new Date();
            _this.Y = _now.getFullYear();
            _this.M = _now.getMonth() + 1;
            _this.D = _now.getDate();
            _this.h = _now.getHours();
            _this.m = _now.getMinutes();
            _this.s = _now.getSeconds();
        }
        // var nowYMDHMS = getTimeOfYMDHMS(_this.Y, _this.M, _this.D, _this.h, _this.m, _this.s);
        var nowYMDHMS = new Date(date).getTime();
        var minYMDhms = 0;
        var maxYMDhms = 0;

        if (_this.opts.minDate) {

            var _minDate = '';
            if(typeof(_this.opts.minDate) == 'object'){
                if(_this.opts.minDate.val().indexOf('-')>-1){
                    _minDate = _this.opts.minDate.val().replace('-', '/');
                }else {
                    _minDate = _this.opts.minDate.val();
                }
            }
            var _minTimeStrap = new Date(_minDate);
            _this.minY = _minTimeStrap.getFullYear() || 1900;
            _this.minM = _minTimeStrap.getMonth() + 1 || 1;
            _this.minD = _minTimeStrap.getDate() || 1;
            _this.minh = _minTimeStrap.getHours() || 0;
            _this.minm = _minTimeStrap.getMinutes() || 0;
            _this.mins = _minTimeStrap.getSeconds() || 0;

            // _this.minY = transDTT(_this.opts.minDate, _this.opts.format, 'YYYY', 'min') || 1900;
            // _this.minM = transDTT(_this.opts.minDate, _this.opts.format, 'MM', 'min') || 1;
            // _this.minD = transDTT(_this.opts.minDate, _this.opts.format, 'DD', 'min') || 1;
            // _this.minh = transDTT(_this.opts.minDate, _this.opts.format, 'hh', 'min') || 0;
            // _this.minm = transDTT(_this.opts.minDate, _this.opts.format, 'mm', 'min') || 0;
            // _this.mins = transDTT(_this.opts.minDate, _this.opts.format, 'ss', 'min') || 0;

            minYMDhms = getTimeOfYMDHMS(_this.minY, _this.minM, _this.minD, _this.minh, _this.minm, _this.mins);

            if (nowYMDHMS < minYMDhms) {
                _this.h = _this.minh;
                _this.m = _this.minm;
                _this.s = _this.mins;
            }
        }

        if (_this.opts.maxDate) {

            var _maxDate = '';
            if(typeof(_this.opts.maxDate) == 'object'){
                if(_this.opts.maxDate.val().indexOf('-')>-1){
                    _maxDate = _this.opts.maxDate.val().replace('-', '/');
                }else {
                    _maxDate = _this.opts.maxDate.val();
                }
            }
            var _maxTimeStrap = new Date(_maxDate);
            _this.maxY = _maxTimeStrap.getFullYear() || 2099;
            _this.maxM = _maxTimeStrap.getMonth() + 1 || 12;
            _this.maxD = _maxTimeStrap.getDate() || 31;
            _this.maxh = _maxTimeStrap.getHours() || 23;
            _this.maxm = _maxTimeStrap.getMinutes() || 59;
            _this.maxs = _maxTimeStrap.getSeconds() || 59;

            // _this.maxY = transDTT(_this.opts.maxDate, _this.opts.format, 'YYYY', 'max');
            // _this.maxM = transDTT(_this.opts.maxDate, _this.opts.format, 'MM', 'max');
            // _this.maxD = transDTT(_this.opts.maxDate, _this.opts.format, 'DD', 'max');
            // _this.maxh = transDTT(_this.opts.maxDate, _this.opts.format, 'hh', 'max'); // 0
            // _this.maxm = transDTT(_this.opts.maxDate, _this.opts.format, 'mm', 'max'); // 0
            // _this.maxs = transDTT(_this.opts.maxDate, _this.opts.format, 'ss', 'max'); // 0
            maxYMDhms = getTimeOfYMDHMS(_this.maxY, _this.maxM, _this.maxD, _this.maxh, _this.maxm, _this.maxs);

            if (nowYMDHMS > maxYMDhms) {
                _this.h = _this.maxh;
                _this.m = _this.maxm;
                _this.s = _this.maxs;
            }
        }
        if (minYMDhms > maxYMDhms) {
            var tmpMaxD = getFormatOfYMDHMS(_this.maxY, _this.maxM, _this.maxD, _this.maxh, _this.maxm, _this.maxs, _this.opts.format);
            var tmpMinD = getFormatOfYMDHMS(_this.minY, _this.minM, _this.minD, _this.minh, _this.minm, _this.mins, _this.opts.format);

            if (typeof (ceng) == 'object') {
                ceng.alert('最小时间（' + tmpMinD + '）不能大于最大时间（' + tmpMaxD + '）');
            } else {
                alert('最小时间（' + tmpMinD + '）不能大于最大时间（' + tmpMaxD + '）');
            }
            _this.state = false;

        } else {
            _this.multi = [0, (_this.defYmax - _this.defYmin + 1) / 10];
            _this.multiii = [getYearInMulti(_this.minY), getYearInMulti(_this.maxY)]; // 真实范围
            if (_this.opts.toppest) {
                _this.obj.css('z-index', Pui.toppestIndex);
                Pui.toppestIndex++;
            }
            if (_this.el.dater) {
                // 非首次渲染
                _this.container.addClass('show')
                // _this.el.dater.removeClass('calhide');
            } else {
                // 首次渲染
                var daterHTML = '';
                daterHTML += '<div class="dater">';
                daterHTML += renderPicker();
                daterHTML += '<div class="selectingDay">';
                daterHTML += renderWeek(_this.weekfirst, _this.weeklang);
                daterHTML += '<div class="listDay clearfix"></div>';
                daterHTML += '</div>';
                daterHTML += '<div class="selectingMonth clearfix">';
                daterHTML += getMonths();
                daterHTML += '</div>';
                daterHTML += '<div class="selectingYear"></div>';
                daterHTML += '<div class="selectingFunc clearfix">';
                if (hasTime) {
                    daterHTML += '<div class="daterTime">';
                    daterHTML += '<input type="text" class="fillh" maxlength="2" />';
                    daterHTML += '<span>:</span>';
                    daterHTML += '<input type="text" class="fillm" maxlength="2" />';
                    daterHTML += '<span>:</span>';
                    daterHTML += '<input type="text" class="fills" maxlength="2" />';
                    daterHTML += '</div>';
                }
                daterHTML += renderBtn();
                daterHTML += '</div>';
                daterHTML += '</div>';
                _this.obj.append(daterHTML);

                _this.el = {
                    dater: _this.obj.find('.dater'),
                    toleft: _this.obj.find('.toleft'),
                    toright: _this.obj.find('.toright'),
                    selem: _this.obj.find('.selem'),
                    seley: _this.obj.find('.seley'),
                    sFooter: _this.obj.find('selectingFooter'),
                    bclear: _this.obj.find('.clearbtn'),
                    btoday: _this.obj.find('.todaybtn'),
                    bgetit: _this.obj.find('.getitbtn'),

                    sYear: _this.obj.find('.selectingYear'),
                    sMonth: _this.obj.find('.selectingMonth'),
                    sDay: _this.obj.find('.selectingDay'),
                    sList: _this.obj.find('.listDay'),
                    fillh: _this.obj.find('.fillh'),
                    fillm: _this.obj.find('.fillm'),
                    fills: _this.obj.find('.fills')
                }

                $(document).on('click', _this.container, function (e) {
                    // _this.ele.removeClass('showing');
                    // _this.el.dater.addClass('calhide');
                    _this.container.removeClass('show');
                    _this.state = false;
                    // console.log('click document')
                });
                _this.el.dater.on('click', function (e) {
                    stopropagation(e);
                });
                setTimeout(function () {
                    _this.container.addClass('show');
                    // _this.obj.find('.dater').removeClass('calhide');
                }, 0);
                _this.opts.onshow(_this.ele, _this.el.dater);
                _this.clickYY();
                _this.clickMM();
                _this.takeMM.call($('span', _this.el.sMonth), _this);
                _this.goPrev();
                _this.goNext();
                _this.funcBtn();

                if (hasTime) {
                    _this.changeTime();
                }
            }
            _this.renderHMS();
            _this.renderYMD(_this.Y, _this.M, _this.D);
        }
    }

    Dater.prototype.renderYMD = function (dy, dm, dd) {
        var _this = this;
        _this.Y = dy;
        _this.M = dm;
        _this.D = dd;
        if (_this.Y < _this.minY || _this.Y == _this.minY && _this.M < _this.minM) {
            _this.Y = _this.minY;
            _this.M = _this.minM;
            _this.D = _this.minD;
        } else if (_this.Y > _this.maxY || _this.Y == _this.maxY && _this.M > _this.maxM) {

            _this.Y = _this.maxY;
            _this.M = _this.maxM;
            _this.D = _this.maxD;
        }

        if (_this.Y == _this.minY && _this.M == _this.minM) {

            if (_this.D < _this.minD) {
                _this.D = _this.minD;
            }

        } else if (_this.Y == _this.maxY && _this.M == _this.maxM) {

            if (_this.D > _this.maxD) {
                _this.D = _this.maxD;
            }
        }
        var prevdays = getPrevDays(_this.Y, _this.M, _this.D, _this.weekfirst);
        var dayHTML = renderDays(_this.Y, _this.M, _this.D, _this.weekfirst, _this.minY, _this.maxY, _this.minM, _this.maxM, _this.minD, _this.maxD);
        _this.el.sList.empty().append(dayHTML);



        if (_this.Y == _this.minY && _this.M <= _this.minM) {
            for (var i = 0; i < (_this.minD + prevdays - 1); i++) {
                $('span', _this.el.sList).eq(i).addClass('outside');
            }
        }
        if (_this.Y == _this.maxY && _this.M >= _this.maxM) {
            for (var j = (_this.maxD + prevdays); j < 42; j++) {
                $('span', _this.el.sList).eq(j).addClass('outside');
            }
        }

        _this.el.seley.text(_this.Y + '年');
        _this.el.selem.text(_this.M + '月');

        $('span', _this.el.sList).on('click', function () {
            debugger;
            if (!$(this).hasClass('outside')) {
                var dayArr = $(this).attr('day').split('/');
                _this.renderYMD(dayArr[0], dayArr[1], dayArr[2]);
                _this.renderHMS();
                _this.output();
            }
        })
    }

    Dater.prototype.renderHMS = function () {
        var _this = this;
        var actYMDHMS = getTimeOfYMDHMS(_this.Y, _this.M, _this.D, _this.h, _this.m, _this.s);
        var minYMDHMS = getTimeOfYMDHMS(_this.minY, _this.minM, _this.minD, _this.minh, _this.minm, _this.mins);
        var maxYMDHMS = getTimeOfYMDHMS(_this.maxY, _this.maxM, _this.maxD, _this.maxh, _this.maxm, _this.maxs);
        if (_this.opts.format.indexOf('hh') > -1) {
            if (actYMDHMS < minYMDHMS) {
                _this.h = _this.minh;
            }
            if (actYMDHMS > maxYMDHMS) {
                _this.h = _this.maxh;
            }
            _this.el.fillh.val(doubleDT(_this.h));
        } else {
            _this.el.fillh.prop('disabled', 'disabled').val('00');
        }
        if (_this.opts.format.indexOf('mm') > -1) {
            if (actYMDHMS < minYMDHMS) {
                _this.m = _this.minm;
            }
            if (actYMDHMS > maxYMDHMS) {
                _this.m = _this.maxm;
            }
            _this.el.fillm.val(doubleDT(_this.m));
        } else {
            _this.el.fillm.prop('disabled', 'disabled').val('00');
        }

        if (_this.opts.format.indexOf('ss') > -1) {
            if (actYMDHMS < minYMDHMS) {
                _this.s = _this.mins;
            }
            if (actYMDHMS > maxYMDHMS) {
                _this.s = _this.maxs;
            }
            _this.el.fills.val(doubleDT(_this.s));
        } else {
            _this.el.fills.prop('disabled', 'disabled').val('00');
        }
    }

    Dater.prototype.clickYY = function () {
        var _this = this;
        _this.el.seley.on('click', function () {
            if (_this.showing != 'year') {
                console.log('clickYY start %s', new Date().getTime());

                _this.el.sDay.css('opacity', '0');
                // _this.el.seley.addClass('check');
                // _this.el.selem.removeClass('check');
                _this.showing = 'year';
                setTimeout(function () {
                    _this.multi = getYearMulti(_this.Y);
                    _this.getChangeYearsRender();
                    _this.el.sMonth.removeClass('showing');
                    _this.el.sYear.addClass('showing');
                }, 0);

                console.log('clickYY end %s', new Date().getTime());
            }
        })
    }

    Dater.prototype.getChangeYearsRender = function (dir) {
        var _this = this;
        var tmpHtml = '';
        switch (dir) {
            case 'prev':
                if (_this.multi > _this.multiii[0]) {
                    _this.multi--;
                } else {
                    _this.multi = _this.multiii[0];
                    return false;
                }
                tmpHtml += '<div class="clearfix prev">';
                // tmpHtml += getYears(_this.multi, _this.Y, _this.minY, _this.maxY);
                tmpHtml += getYears(_this.multi, _this.Y, _this.minY, _this.maxY);
                tmpHtml += '</div>';
                _this.el.sYear.empty().append(tmpHtml).find('div');
                setTimeout(function () {
                    _this.el.sYear.children('div').addClass('into');
                }, 0);
                break;
            case 'next':
                if (_this.multi < _this.multiii[1]) {
                    _this.multi++;
                } else {
                    _this.multi = _this.multiii[1];
                    return false;
                }
                tmpHtml += '<div class="clearfix next">';
                // tmpHtml += getYears(_this.multi, _this.Y, _this.minY, _this.maxY);
                tmpHtml += getYears(_this.multi, _this.Y, _this.minY, _this.maxY);
                tmpHtml += '</div>';
                _this.el.sYear.empty().append(tmpHtml).find('div');
                setTimeout(function () {
                    _this.el.sYear.children('div').addClass('into')
                }, 0);
                break;
            default:
                tmpHtml += '<div class="clearfix">';
                // tmpHtml += getYears(_this.multi, _this.Y, _this.minY, _this.maxY);
                tmpHtml += getYears(_this.multi, _this.Y, _this.minY, _this.maxY);
                tmpHtml += '</div>';
                _this.el.sYear.empty().append(tmpHtml);
                break;
        }
        _this.takeYY.call($('span', _this.el.sYear), _this);
    }

    Dater.prototype.clickMM = function () {
        var _this = this;
        _this.el.selem.on('click', function () {
            if (_this.showing != 'month') {
                console.log('clickMM start %s', new Date().getTime());

                _this.showing = 'month';
                $('span', _this.el.sMonth).removeClass('cur').eq(_this.M - 1).addClass('cur');
                _this.el.sYear.removeClass('showing');
                _this.el.sMonth.addClass('showing');


                $('span', _this.el.sMonth).removeClass('outside');

                if (_this.Y == _this.minY) {
                    for (var p = 0; p < _this.minM - 1; p++) {
                        $('span', _this.el.sMonth).eq(p).addClass('outside');
                    }
                    if (_this.M < _this.minM) {
                        _this.M = _this.minM;
                        _this.el.selem.text(_this.M + '月');
                        $('span', _this.el.sMonth).removeClass('cur').eq(_this.M - 1).addClass('cur')
                    }
                }
                if (_this.Y == _this.maxY) {
                    for (var q = _this.maxM; q < 12; q++) {
                        $('span', _this.el.sMonth).eq(q).addClass('outside');
                    }
                    if (_this.M > _this.maxM) {
                        _this.M = _this.maxM;
                        _this.el.selem.text(_this.M + '月');
                        $('span', _this.el.sMonth).removeClass('cur').eq(_this.M - 1).addClass('cur')
                    }
                }
                if (_this.Y > _this.minY && _this.Y < _this.maxY) {
                    $('span', _this.el.sMonth).removeClass('outside');
                }


                console.log('clickMM start %s', new Date().getTime());
            }
        });
    }

    Dater.prototype.takeYY = function (_this) {
        var $this = this;
        $this.on('click', function () {
            // debugger;
            if (!$(this).hasClass('outside')) {
                _this.Y = parseInt($(this).text());
                _this.obj.find('.seley').text(_this.Y + '年');
                _this.obj.find('.selem').click();
            }

        })
    }

    Dater.prototype.takeMM = function (_this) {
        var $this = this;
        $this.on('click', function () {
            // debugger;
            if (!$(this).hasClass('outside')) {
                _this.M = parseInt($(this).text());
                _this.obj.find('.selem').text(_this.M + '月');
                _this.renderYMD(_this.Y, _this.M, _this.D);
                _this.el.sMonth.removeClass('showing');
                _this.showing = 'day';
                _this.el.sDay.css('opacity', '1');
            }

        })
    }

    Dater.prototype.output = function (type) {
        var _this = this;

        var format = _this.opts.format;
        var output = '';

        // if (format.indexOf('YYYY') > -1) {
        //     output = format.replace('YYYY', _this.Y);
        // } else if (format.indexOf('YY') > -1) {
        //     output = format.replace('YY', _this.Y.toString().slice(2, 4));
        // }
        var compStr = _this.Y + '/' + _this.M + '/' + _this.D + ' ' + _this.h + ':' + _this.m + ':' + _this.s;
        debugger;
        output = _this.send(compStr)
        // debugger;
        // output = output.replace('MM', doubleDT(_this.M));
        // output = output.replace('DD', doubleDT(_this.D));

        // output = output.replace('hh', doubleDT(_this.h));
        // output = output.replace('mm', doubleDT(_this.m));
        // output = output.replace('ss', doubleDT(_this.s));

        _this.container.removeClass('show');
        // _this.ele.removeClass('showing');
        // _this.el.dater.addClass('calhide');
        _this.state = false;

        

        if (type == 'clear') {
            _this.ele.val('');
        } else {
            _this.ele.val(output);
            _this.opts.onselect(_this.ele, _this.el.dater, output);
        }
    }

    Dater.prototype.goPrev = function () {
        var _this = this;
        _this.el.toleft.on('click', function () {

            switch (_this.showing) {
                case 'day':
                    if (_this.Y > _this.minY) {
                        if (_this.M == 1) {
                            _this.M = 12;
                            _this.Y--;
                        } else {
                            _this.M--;
                        }
                    } else if (_this.Y == _this.minY) {
                        if (_this.M > _this.minM) {
                            if (_this.M > 1) {
                                _this.M--;
                            } else {
                                console.log('不能小于最小日期')
                            }
                        }
                    }
                    _this.renderYMD(_this.Y, _this.M, _this.D);
                    break;
                case 'month':
                    if (_this.Y > _this.minY) {
                        _this.Y--;
                        _this.el.seley.text(_this.Y + '年');
                        $('span', _this.el.sMonth).removeClass('outside');
                        // }
                        if (_this.Y == _this.minY) {
                            for (var p = 0; p < _this.minM - 1; p++) {
                                $('span', _this.el.sMonth).eq(p).addClass('outside');
                            }
                            if (_this.M < _this.minM) {
                                _this.M = _this.minM;
                                $('span', _this.el.sMonth).removeClass('cur').eq(_this.M - 1).addClass('cur')
                                _this.el.selem.text(_this.M + '月');
                            }
                        }
                    }
                    break;
                case 'year':
                    _this.getChangeYearsRender('prev');
                    break;
            }
        })
    }

    Dater.prototype.goNext = function () {
        var _this = this;
        _this.el.toright.on('click', function () {
            switch (_this.showing) {
                case 'day':
                    if (_this.Y < _this.maxY) {
                        if (_this.M == 12) {
                            _this.M = 1;
                            _this.Y++;
                        } else {
                            _this.M++;
                        }
                    } else if (_this.Y == _this.maxY) {
                        if (_this.M < _this.maxM) {
                            if (_this.M < 12) {
                                _this.M++;
                            } else {
                                console.log('不能大于最大日期')
                            }
                        }
                    }
                    _this.renderYMD(_this.Y, _this.M, _this.D);
                    break;
                case 'month':
                    if (_this.Y < _this.maxY) {
                        _this.Y++;
                        _this.el.seley.text(_this.Y + '年');
                        $('span', _this.el.sMonth).removeClass('outside');
                        if (_this.Y == _this.maxY) {
                            for (var q = _this.maxM; q < 12; q++) {
                                $('span', _this.el.sMonth).eq(q).addClass('outside');
                            }
                            if (_this.M > _this.maxM) {
                                _this.M = _this.maxM;
                                $('span', _this.el.sMonth).removeClass('cur').eq(_this.M - 1).addClass('cur')
                                _this.el.selem.text(_this.M + '月');
                            }
                        }
                    }
                    break;
                case 'year':
                    _this.getChangeYearsRender('next');
            }
        })
    }

    Dater.prototype.funcBtn = function () {
        var _this = this;
        _this.el.bclear.on('click', function () {
            _this.output('clear');
            _this.opts.onclear(_this.ele);
        });

        _this.el.btoday.on('click', function () {
            var _now = new Date();
            _this.Y = _now.getFullYear();
            _this.M = _now.getMonth() + 1;
            _this.D = _now.getDate();
            _this.h = _now.getHours();
            _this.m = _now.getMinutes();
            _this.s = _now.getSeconds();
            _this.renderYMD(_this.Y, _this.M, _this.D);
            _this.output();
        });

        _this.el.bgetit.on('click', function () {
            // _this.renderYMD(_this.Y, _this.M, _this.D);
            _this.output();
        })
    }

    Dater.prototype.changeTime = function () {
        var _this = this;

        $('.fillh, .fillm, .fills', _this.el.dater).on('change', function () {

            var v = $.trim($(this).val());

            if ($(this).hasClass('fillh')) {
                if (!validTime(v, 'h')) {
                    $(this).val(doubleDT(_this.minh))
                }
                _this.h = $(this).val();
            }
            if ($(this).hasClass('fillm')) {
                if (!validTime(v, 'm')) {
                    $(this).val(doubleDT(_this.minm))
                }
                _this.m = $(this).val();
            }
            if ($(this).hasClass('fills')) {
                if (!validTime(v, 's')) {
                    $(this).val(doubleDT(_this.mins))
                }
                _this.s = $(this).val();
            }

            var actYMDHMS = getTimeOfYMDHMS(_this.Y, _this.M, _this.D, _this.h, _this.m, _this.s);
            var minYMDHMS = getTimeOfYMDHMS(_this.minY, _this.minM, _this.minD, _this.minh, _this.minm, _this.mins);
            var maxYMDHMS = getTimeOfYMDHMS(_this.maxY, _this.maxM, _this.maxD, _this.maxh, _this.maxm, _this.maxs);

            if (actYMDHMS < minYMDHMS) {
                if ($(this).hasClass('fillh')) {
                    $(this).val(doubleDT(_this.minh));
                    _this.h = $(this).val();
                }
                if ($(this).hasClass('fillm')) {
                    $(this).val(doubleDT(_this.minm));
                    _this.m = $(this).val();
                }
                if ($(this).hasClass('fills')) {
                    $(this).val(doubleDT(_this.mins));
                    _this.s = $(this).val();
                }
            }
            if (actYMDHMS > maxYMDHMS) {
                if ($(this).hasClass('fillh')) {
                    $(this).val(doubleDT(_this.maxh));
                    _this.h = $(this).val();
                }
                if ($(this).hasClass('fillm')) {
                    $(this).val(doubleDT(_this.maxm));
                    _this.m = $(this).val();
                }
                if ($(this).hasClass('fills')) {
                    $(this).val(doubleDT(_this.maxs));
                    _this.s = $(this).val();
                }
            }
        })
    }

    Dater.prototype.tranStandardDate = function (date) {
        var _this = this;
        var format = this.opts.format;
        if (format.indexOf('YYYY') > -1) {
            format = format.replace('YYYY', v.getFullYear());
            _this.Y = format.substr(format.indexOf('YYYY'), 4) || 1900
        } else if (format.indexOf('YY') > -1) {
            format = format.replace('YY', v.getYears());
            _this.Y = format.substr(format.indexOf('YY'), 2) || 00
        }

        if (format.indexOf('MM') > -1) {
            format = format.replace('MM', doubleDT(v.getMonth() + 1))
            _this.M = format.substr(format.indexOf('MM'), 4) || 1900
        } else if (format.indexOf('M') > -1) {
            format = format.replace('M', v.getMonth() + 1)
        }
        if (format.indexOf('DD') > -1) {
            format = format.replace('DD', doubleDT(v.getDate()))
        } else if (format.indexOf('D') > -1) {
            format = format.replace('D', v.getDate())
        }
        if (format.indexOf('hh') > -1) {
            format = format.replace('hh', doubleDT(v.getHours()))
        } else if (format.indexOf('h') > -1) {
            format = format.replace('h', v.getHours())
        }
        if (format.indexOf('mm') > -1) {
            format = format.replace('mm', doubleDT(v.getMinutes()))
        } else if (format.indexOf('m') > -1) {
            format = format.replace('m', v.getMinutes())
        }
        if (format.indexOf('ss') > -1) {
            format = format.replace('ss', doubleDT(v.getSeconds()))
        } else if (format.indexOf('s') > -1) {
            format = format.replace('s', v.getSeconds())
        }

    }

    var renderPicker = function () {

        var pickerHtml = '';
        pickerHtml += '<div class="daterPicker">';
        pickerHtml += '<span class="toleft ffs">&lt;</span>';
        pickerHtml += '<div class="seleym">';
        pickerHtml += '<b class="seley"></b>';
        pickerHtml += '<b class="selem"></b>';
        pickerHtml += '</div>';
        pickerHtml += '<span class="toright ffs">&gt;</span>';
        pickerHtml += '</div>';
        return pickerHtml;
    }

    var renderBtn = function () {
        var btnHtml = '';
        btnHtml += '<div class="daterBtn">';
        btnHtml += '<button type="button" class="clearbtn">清空</button>'
        btnHtml += '<button type="button" class="todaybtn">今天</button>'
        btnHtml += '<button type="button" class="getitbtn">确定</button>'
        btnHtml += '</div>';
        return btnHtml;
    }

    var renderWeek = function (wf, wlang) {

        var weekHtml = '';
        var wspans = '';
        for (var w = wf; w < (wf + 7); w++) {
            wspans += '<span>' + wlang[w] + '</span>';
        }
        weekHtml += '<div class="daterWeek clearfix">';
        weekHtml += wspans;
        weekHtml += '</div>';
        return weekHtml;
    }

    var getMonths = function () {
        var monthHtml = '';
        for (var i = 1; i <= 12; i++) {
            monthHtml += '<span>' + i + '月</span>'
        }
        return monthHtml;
    }

    var getYears = function (multi, y, miny, maxy) {
        var yearHtml = '';
        var start = 1900 + 10 * multi;
        var end = 1910 + 10 * multi;

        if (start > miny) {
            yearHtml += '<span class="bro">' + (start - 1) + '</span>';
        } else {
            yearHtml += '<span class="outside">' + (start - 1) + '</span>';
        }
        for (var i = start; i < end; i++) {
            if (i == y) {
                yearHtml += '<span class="cur">' + i + '</span>'
            } else if (i < miny || i > maxy) {
                yearHtml += '<span class="outside">' + i + '</span>'
            } else {
                yearHtml += '<span>' + i + '</span>'
            }
        }
        if (end <= maxy) {
            yearHtml += '<span class="bro">' + end + '</span>';
        } else {
            yearHtml += '<span class="outside"></span>';
        }

        return yearHtml;
    }

    var renderDays = function (dy, dm, dd, wf, miny, maxy, minm, maxm, mind, maxd) {

        var weekfirst = wf || 0;
        dy = parseInt(dy);
        dm = parseInt(dm);
        dd = parseInt(dd);

        var MMlength = getDaysOfMonth(dy)[dm - 1];
        var listHtml = '';
        var prevYMD = '';
        if (dm == 1) {
            prevYMD = (dy - 1) + '/12/01';
        } else {
            prevYMD = dy + '/' + (dm - 1) + '/01';
        }
        var nextYMD = '';
        if (dm == 12) {
            nextYMD = (dy + 1) + '/01/01';
        } else {
            nextYMD = dy + '/' + (dm + 1) + '/01';
        }
        var prevdays = getPrevDays(dy, dm, dd, weekfirst); // 上个月显示多少天
        prevdays = prevdays == 0 ? 7 : prevdays;
        var nextdays = 42 - prevdays - MMlength; // 下个月显示多少天
        var prevdaysHtml = getDays(prevYMD, 'prev', prevdays, miny, maxy, minm, maxm, mind, maxd);
        var curdaysHtml = getDays(dy + '/' + dm + '/' + dd, null);
        var nextdaysHtml = getDays(nextYMD, 'next', nextdays, miny, maxy, minm, maxm, mind, maxd);
        listHtml = prevdaysHtml + curdaysHtml + nextdaysHtml;

        return listHtml;
    }
    var getYearMulti = function (y) {
        return Math.floor((y - 1900) / 10);
    }

    var getDays = function (dayStr, direction, limited, miny, maxy, minm, maxm, mind, maxd) { // YYYY/MM/DD
        var dayArr = dayStr.split('/');
        var YYYY = parseInt(dayArr[0]);
        var MM = parseInt(dayArr[1]);
        var DD = parseInt(dayArr[2]);
        var MMlength = getDaysOfMonth(YYYY)[MM - 1];
        var daysHtml = '';
        var start, end;
        switch (direction) {
            case 'prev':
                start = MMlength - limited + 1;
                end = MMlength;
                break;
            case 'next':
                start = 1;
                end = limited;
                break;
            default:
                start = 1;
                end = MMlength;
        }
        if (direction == null) {
            for (var i = start; i <= end; i++) {
                var dayAttr = YYYY + '/' + MM + '/' + i;

                if (i == DD) {
                    daysHtml += '<span day="' + dayAttr + '" class="cur curday">' + i + '</span>'
                } else {
                    daysHtml += '<span day="' + dayAttr + '" class="cur">' + i + '</span>'
                }
            }
        } else {

            for (var i = start; i <= end; i++) {
                var dayAttr = YYYY + '/' + MM + '/' + i;

                if (YYYY == miny && MM == minm && i < mind) {
                    daysHtml += '<span day="' + dayAttr + '" class="outside">' + i + '</span>'

                } else if (YYYY == maxy && MM == maxm && i > maxd) {
                    daysHtml += '<span day="' + dayAttr + '" class="outside">' + i + '</span>'

                } else {
                    daysHtml += '<span day="' + dayAttr + '" class="bro">' + i + '</span>'
                }
            }
        }
        return daysHtml;
    }
    var getYearInMulti = function (y) {
        return Math.floor((y - 1900) / 10);
    }
    var doubleDT = function (v) {
        var nv = v.toString();
        return nv.length == 1 ? '0' + nv : nv;
    }
    var getDaysOfMonth = function (y) {
        return [31, isLeapYear(y), 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    }

    var getPrevDays = function (y, m, d, weekfirst) {

        var ww = new Date(y + '/' + m + '/' + d).getDay();
        var startWW = getFirstDaysWeek(d, ww);
        return startWW > weekfirst ? startWW - weekfirst : startWW - weekfirst + 7;
    }
    var getFirstDaysWeek = function (DD, WW) {

        var minDD = DD > 7 ? DD % 7 : DD;
        var firstDaysWeek = 0;
        if (WW >= minDD) {
            firstDaysWeek = WW - (minDD - 1);
        } else {
            firstDaysWeek = WW - (minDD - 1) + 7
        }
        return firstDaysWeek
    }
    var isLeapYear = function (year) {
        var bool = (year % 4 == 0) && (year % 100 != 0 || year % 400 == 0);
        return bool ? 29 : 28;
    }

    var getTimeOfYMDHMS = function (Y, M, D, h, m, s) {
        D = D || 1;
        h = h || 0;
        m = m || 0;
        s = s || 0;
        var expo = new Date(Y + '/' + M + '/' + D + ' ' + h + ':' + m + ':' + s).getTime();
        return expo;
    }

    var getFormatOfYMDHMS = function (Y, M, D, h, m, s, format) {
        D = D || '01';
        h = h || '00';
        m = m || '00';
        s = s || '00';
        var expo = format
            .replace('YYYY', doubleDT(Y))
            .replace('MM', doubleDT(M))
            .replace('DD', doubleDT(D))
            .replace('hh', doubleDT(h))
            .replace('mm', doubleDT(m))
            .replace('ss', doubleDT(s));
        return expo;
    }

    String.prototype.getTakePlace = function (str, reg) {
        if (str.indexOf(reg) > -1) {
            return parseInt(this.substr(str.indexOf(reg), reg.length));
        } else {
            return 0;
        }
    }
    var validTime = function (v, f, minv, maxv, minD, actD, maxD) {
        var bool = true;
        var limit = 0;
        switch (f) {
            case 'h':
                limit = 24;
                break;
            case 'm':
                limit = 60;
                break;
            case 's':
                limit = 60;
                break;
        }
        if (v == '') {
            return false;
        }
        if (!/\d{1,2}/.test(v)) {
            return false;
        }
        if (parseInt(v) < 0 || parseInt(v) >= limit) {
            return false;
        }
        if (minD < actD || maxD > actD) {
            if (parseInt(v) < minv) {
                return false;
            }
            if (parseInt(v) > maxv) {
                return false;
            }
        }
        if (Math.floor(v) != v) {
            return false;
        }
        return bool;
    }
})(jQuery, window, document);
