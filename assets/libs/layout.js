/*
 * @Author: sison.luo
 * @Date:   2016-06-14 14:13:47
 * @Last Modified by: sison
 * @Last Modified time: 2018-07-05 15:18:27
 */

// 全局 ajax
$(document).ajaxComplete(function(event, xhr, settings) {
    if (xhr.responseText && xhr.responseText.indexOf('登录超时') > -1) {
        ceng.msger('登录超时', 0, 1000, function(){
            top.location.reload(true)
        })
    }
});

// require('lodash')

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
    }
    return str;
};
