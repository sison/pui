//countdown-mobile

/*
console.log(([![]]+[][[]])[+!+[]+[+[]]]+
({}+[])[(~~!+[]+~~!+[])*(~~!+[]+~~!+[])+~~!+[]+~~!+[]*(~~!+[]+~~!+[])]+
(!(~+[])+{})[~~!+[]+~~!+[]]+
({}+[])[~~!+[]]+
(+(Number(~~!+[]+~~!+[]+~~!+[]+""+~~!+[]-~~!+[])+~~!+[]))["toString"](Number(~~!+[]+~~!+[]+~~!+[]+""+~~!+[]-~~!+[])+~~!+[]+~~!+[])+
({}+[])[~~!+[]+~~!+[]+~~!+[]+~~!+[]]+
({}+[])[(~~!+[]+~~!+[])*(~~!+[]+~~!+[])+~~!+[]+~~!+[]*(~~!+[]+~~!+[])]+
(!(~+[])+{})[~~!+[]]+
(Number+"")[~~!+[]+""+~~!+[]]+
(NaN+[Infinity])[Number(~~!+[]+"")+""+~~!+[]+""-~~!+[]]);


DOM:
<div id="time_bx">
	<div class="dash hours_dash">
		<div class="digit">0</div>
		<div class="digit">0</div>
	</div>
	<div class="dash minutes_dash">
		<div class="digit">2</div>
		<div class="digit">4</div>
	</div>
	<div class="dash seconds_dash">
		<div class="digit">3</div>
		<div class="digit">9</div>
	</div>
</div>

Example:
var second=40;
var date20before=new Date();
date20before.setSeconds(date20before.getSeconds()+second);
$('#time_out').countDown({
	targetDate: {
		'year': date20before.getFullYear(),
		'month': date20before.getMonth() + 1,
		'day': date20before.getDate(),
		'hour': date20before.getHours(),
		'min': date20before.getMinutes(),
		'sec': date20before.getSeconds()
	},
	onTicktock: function(diffSec){
		console.log(diffSec);    //console diff second;
	},
	onComplete: function () {
		console.log('Complete!');
	}
});

	record by null 2015.02.09 00:09:26
*/

; (function ($) {
    $.fn.countDown = function (options) {
        config = {};
        $.extend(config, options);
        diffSecs = this.setCountDown(config);
        //完成事件
        if (config.onComplete) {
            $(this[0]).data('callback', config.onComplete);
        }
        //每秒执行事件
        if (config.onTicktock) {
            $(this[0]).data('ticktock', config.onTicktock);
        }
        if (config.omitWeeks) {
            $(this[0]).data('omitWeeks', config.omitWeeks);
        }
        //禁用 动画效果 取消这句
        this.doCountDown($(this).attr('id'), diffSecs, 500);
        return this;
    };

    $.fn.stopCountDown = function () {
        clearTimeout($(this[0]).data('timer'));
    };

    $.fn.startCountDown = function () {
        this.doCountDown($(this).attr('id'), $(this[0]).data('diffSecs'), 500);
    };

    $.fn.setCountDown = function (options) {
        var targetTime = new Date();
        if (options.targetDate) {
            targetTime = new Date(options.targetDate.month + '/' + options.targetDate.day + '/' + options.targetDate.year + ' ' + options.targetDate.hour + ':' + options.targetDate.min + ':' + options.targetDate.sec + (options.targetDate.utc ? ' UTC' : ''));
        }
        else if (options.targetOffset) {
            targetTime.setFullYear(options.targetOffset.year + targetTime.getFullYear());
            targetTime.setMonth(options.targetOffset.month + targetTime.getMonth());
            targetTime.setDate(options.targetOffset.day + targetTime.getDate());
            targetTime.setHours(options.targetOffset.hour + targetTime.getHours());
            targetTime.setMinutes(options.targetOffset.min + targetTime.getMinutes());
            targetTime.setSeconds(options.targetOffset.sec + targetTime.getSeconds());
        }
        var nowTime = new Date();
        diffSecs = Math.floor((targetTime.valueOf() - nowTime.valueOf()) / 1000);
        $(this[0]).data('diffSecs', diffSecs);
        return diffSecs;
    };




    $.fn.doCountDown = function (id, diffSecs, duration) {
        $this = $('#' + id);
        if (diffSecs <= 0) {
            diffSecs = 0;
            if ($(this[0]).data('timer')) {
                clearTimeout($(this[0]).data('timer'));
            }
        }

        secs = diffSecs % 60;
        mins = Math.floor(diffSecs / 60) % 60;
        hours = Math.floor(diffSecs / 60 / 60) % 24;

        if ($(this[0]).data('omitWeeks') == true) {
            days = Math.floor(diffSecs / 60 / 60 / 24);
            weeks = Math.floor(diffSecs / 60 / 60 / 24 / 7);
        }
        else {
            days = Math.floor(diffSecs / 60 / 60 / 24) % 7;
            weeks = Math.floor(diffSecs / 60 / 60 / 24 / 7);
        }

        $this.dashChangeTo(id, 'seconds_dash', secs, duration ? duration : 800);
        $this.dashChangeTo(id, 'minutes_dash', mins, duration ? duration : 1200);
        $this.dashChangeTo(id, 'hours_dash', hours, duration ? duration : 1200);
        $this.dashChangeTo(id, 'days_dash', days, duration ? duration : 1200);
        $this.dashChangeTo(id, 'weeks_dash', weeks, duration ? duration : 1200);

        $this.data('diffSecs', diffSecs);


        //终止时callback
        if ($this.data('ticktock')) {
            $this.data('ticktock')(diffSecs);
        }
        if (diffSecs > 0) {
            e = $this;
            t = setTimeout(function () { e.doCountDown(id, diffSecs - 1) }, 1000);
            $(e[0]).data('timer', t);
        }
        else if (cb = $this.data('callback')) {
            $this.data('callback')();
        }


    };

    $.fn.dashChangeTo = function (id, dash, n, duration) {
        $this = $('#' + id);
        for (var i = ($this.find('.' + dash + ' .digit').length - 1) ; i >= 0; i--) {
            var d = n % 10;
            n = (n - d) / 10;
            $this.digitChangeTo('#' + $this.attr('id') + ' .' + dash + ' .digit', i, d);
        }
    };

    $.fn.digitChangeTo = function (digit, eqIndex, n) {
        $(digit).eq(eqIndex).html(n);
    };
})(Zepto);




