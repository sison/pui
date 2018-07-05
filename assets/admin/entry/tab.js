/*
 * @Author: sison.luo
 * @Date:   2016-07-29 14:58:53
 * @Last Modified by: sison
 * @Last Modified time: 2018-07-05 15:36:07
 */

'use strict';

require('../css/pui.css');
require('../css/layout.css');
require('../css/page-common.css');
require('../../libs/prism/prism.css');

require('pjt-ui')
require('../../libs/layout.js')

$(function() {

    var thone1 = [{
        key: '分组管理',
        value: 'a'
    }, {
        key: '管理员列表',
        value: 'b'
    }, {
        key: '角色管理',
        value: 'c'
    }];


    $('#tabDemo1').tabSmart({
        cur: 1,
        type: 'line',
        name: 'demo1',
        data: thone1
    });

    $('#tabDemo2').tabSmart({
        cur: 2,
        type: 'box',
        name: 'demo2',
        data: thone1
    });

    $('#tabDemo3').tabSmart({
        cur: 3,
        type: 'radio',
        name: 'demo3',
        data: thone1
    });

    $('#tabDemo4').tabSmart({
        cur: 1,
        type: 'fullbox',
        name: 'demo4',
        data: thone1
    });

});
