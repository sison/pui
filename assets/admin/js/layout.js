/*
 * @Author: sison.luo
 * @Date:   2016-06-14 14:13:47
 * @Last Modified by: sison
 * @Last Modified time: 2018-07-03 17:03:53
 */


var Layout = function() {

    var handleTotop = () => {
        $('body').append('<div id="backToTop"><a href=""class="fs tc"><i class="ico ico-to-top"></i>返回顶部</a></div>');
        $(window).scroll(function() {
            if ($(document).scrollTop() == 0) {
                $("#backToTop").removeClass('toggle');
            } else {
                $("#backToTop").addClass('toggle');
            }
        });
        $("#backToTop").click(function(e) {
            e.preventDefault();
            $("body,html").animate({
                scrollTop: 0
            }, "100");
            return false;
        });
    }

    var handleMenu = () => {
        // $('.component-list > li > a').popSmart({
        //     dir: 'bottom',
        //     refType: 'sib',
        //     actType: 'hover'
        // })
    }

    return {
        init () {
            handleTotop()
            handleMenu()
        }
    }
}();

Layout.init()


function getRemoteHtml(url) {
    var dfd = $.Deferred();
    $.ajax({
        type: 'GET',
        dataType: 'html',
        url: url
    }).done(function(data) {
        dfd.resolve(data);
    });
    return dfd.promise();
}

function importHeader() {
    $.when(getRemoteHtml('enterprise-header.html')).then(function(data) {
        $('body').prepend(data);
    });
}

function importFooter() {
    $.when(getRemoteHtml('enterprise-footer.html')).then(function(data) {
        $('body').append(data);
    });
}

function tabSwitch(req, res) {
    $(req).on('click', '.req', function() {
        var idx = $(this).index();
        $(this).addClass('cur').siblings().removeClass('cur');
        res.children().eq(idx).fadeIn(300).siblings().hide();
    });
}




// 全局 ajax
$(document).ajaxComplete(function(event, xhr, settings) {
    if (xhr.responseText && xhr.responseText.indexOf('登录超时') > -1) {
        ceng.msg('登录超时', { time: 1000 });
        setTimeout(function() {
            top.location.reload(true);
        }, 1200);
    }
});


// 自定义数组方法
Array.prototype.indexOf = function(v) {
    for (var i = 0; i < this.length; i++) {
        if (this[i] == v) {
            return i;
        }
    }
    return -1;
};
Array.prototype.remove = function(v) {
    var i = this.indexOf(v);
    if (i > -1) {
        return this.splice(i, 1);
    }
};
Array.prototype.unique = function() {
    var arr = [];
    for (var i = 0; i < this.length; i++) {
        if (arr.indexOf(this[i]) == -1) {
            arr.push(this[i]);
        }
    }
    return arr;
};
String.prototype.push = function(v, cutter) {
    var str = '';
    var arr = [];
    if (this.length > 0) {
        if (this.indexOf(cutter) > -1) {
            arr = this.split(cutter);
        } else {
            arr[0] = this;
        }
        arr.push(v);
        str = arr.join(cutter);
    } else {
        str = v;
    }
    return str;
}
String.prototype.remove = function(v, cutter) {
    var str = '';
    var arr = [];
    if (this.indexOf(v) > -1) {
        if (this.indexOf(cutter) > -1) {
            arr = this.split(cutter);
        } else {
            arr[0] = this;
        }
        arr.remove(v);
        str = arr.join(cutter);
    } else {
        alert('no' + v);
        // return;
    }
    return str;
};
