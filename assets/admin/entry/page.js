/*
 * @Author: sison.luo
 * @Date:   2016-07-29 14:59:52
 * @Last Modified by: sison
 * @Last Modified time: 2018-07-05 15:19:35
 */

'use strict';

require('../css/pui.css');
require('../css/layout.css');
require('../css/page-common.css');
require('../../libs/prism/prism.css');

require('pjt-ui')
require('../../libs/layout.js')


$(function() {

    $('#pageDemo').pager({
        totalItem: 88,
        pageSize: 10,
        pageIndex: 1,
        action: function(pi, ps) {
            ceng.msger('pageIndex： ' + pi + '，pageSize： ' + ps, 1);
        }
    });

})
