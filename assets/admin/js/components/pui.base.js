/*
 * @Author: sison.luo
 * @Date:   2016-10-24 10:33:38
 * @Last Modified by:   sison.luo
 * @Last Modified time: 2017-09-04 15:36:06
 */

// 'use strict';

function stopDefault(e) {
    if (e && e.preventDefault) {
        e.preventDefault();
    } else {
        window.event.returnValue = false;
    }
    return false;
}

function stopropagation(e) {
    if (e.stopPropagation) {
        e.stopPropagation()
    } else {
        window.event.cancelBubble = true
    }
}

function setStore(key, val, ext) {
    store.set(key, {
        val: val,
        ext: ext,
        time: new Date().getTime()
    })
}

function getStore(key) {
    var k = store.get(key);
    if (!k) {
        return null;
    }
    if (new Date().getTime() - k.time > k.ext) {
        return null;
        store.remove(key);
    }
    return k.val;
}


// 根据 search param 创建并返回form
function mockFormToSubmit(options) {
    // 外面处理好参数再传进来，没空写验证
    var defaults = {
        actioin: "",
        query: "",
        method: "POST"
    }
    var opts = $.extend({}, defaults, options);
    var form = $("<form class='hide' />");
    form.attr("action", opts.action);
    form.attr("target", opts.target);
    form.attr("method", opts.method);
    var arr = [];
    if (opts.query.indexOf("&") > -1) {
        arr = opts.query.split("&");
    } else {
        arr = [opts.query];
    }
    for (var i = 0; i < arr.length; i++) {
        var cur = arr[i];
        var k = decodeURIComponent(cur.split("=")[0].replace(/\+/g, "%20")) || "";
        var v = decodeURIComponent(cur.split("=")[1].replace(/\+/g, "%20")) || "";
        var input = $("<input />");
        input.attr({
                type: "hidden",
                name: k,
                value: v
            })
            .appendTo(form);
    }
    form.appendTo("body");
    form.submit();
}


function transTime(d, fm) {
    if (d != null) {
        var cd = Date.parse(d.replace(/-/g, '/'));
        var nd = new Date(cd);
        var Y = nd.getFullYear();
        var M = nd.getMonth() + 1;
        M = M.toString().length == 1 ? "0" + M : M;
        var D = nd.getDate();
        D = D.toString().length == 1 ? "0" + D : D;
        var h = nd.getHours();
        h = h.toString().length == 1 ? "0" + h : h;
        var m = nd.getMinutes();
        m = m.toString().length == 1 ? "0" + m : m;
        var s = nd.getSeconds();
        s = s.toString().length == 1 ? "0" + s : s;
        var final = "";
        var fmstr = fm || "ymdhms";
        switch (fmstr) {
            case "ymd":
                final = Y + '-' + M + '-' + D;
                break;
            case "hms":
                final = h + ':' + m + ':' + s;
                break;
                defaults:
                    final = Y + '-' + M + '-' + D + ' ' + h + ':' + m + ':' + s;
                break;
        }
        return final;
    }
}


function HTMLEncode(html) {
    var temp = document.createElement("div");
    (temp.textContent != null) ? (temp.textContent = html) : (temp.innerText = html);
    var output = (temp.innerHTML).replace(/"/g, '\"');
    temp = null;
    return output;
}


Array.prototype.isRepeat = function(){
    var tmp = {};
    for(var i in this){
        if(tmp[this[i]]){
            return true;
        }
        tmp[this[i]] = true;
    }
    return false;
}
Array.prototype.indexOf = function(v) {
    for (var i = 0; i < this.length; i++) {
        if (this[i] == v) {
            return i;
        }
    }
    return -1;
}
Array.prototype.remove = function(v) {
    var i = this.indexOf(v);
    if (i > -1) {
        return this.splice(i, 1);
    }
}
Array.prototype.unique = function() {
    var arr = [];
    for (var i = 0; i < this.length; i++) {
        if (arr.indexOf(this[i]) == -1) {
            arr.push(this[i]);
        }
    }
    return arr;
}
Array.prototype.getRepeat = function() {  
    var tmp = [];  
    this.concat().sort().sort(function(a,b){  
        if(a==b && tmp.indexOf(a) === -1) tmp.push(a);  
    });  
    return tmp;  
}
String.prototype.trim = function() {
    return this.replace(/(^\s*)|(\s*$)/g, "");
}
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
String.prototype.jiami = function(k) {
    var arr = [];
    var leng = k.length;
    for (var x = 0; x < this.length; x++) {
        arr.push(k[Math.floor(Math.random() * leng)]);
    }
    var pswArr = this.split("");
    pswArr = pswArr.reverse();
    var j = 1;
    for (var i = 0; i < arr.length; i++) {
        var z = i + j;
        pswArr.splice(z, 0, arr[i]);
        j++;
    }
    var str = pswArr.join("");
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
Number.prototype.isInteger = function() {
    return Math.floor(this) === this;
}



