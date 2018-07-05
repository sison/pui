/*
 * @Author: sison.luo
 * @Date:   2016-07-29 14:58:53
 * @Last Modified by: sison
 * @Last Modified time: 2018-07-05 15:19:51
 */

'use strict';

require('../css/pui.css');
require('../css/layout.css');
require('../css/page-common.css');
require('../../libs/prism/prism.css');

require('pjt-ui')
require('../../libs/layout.js')
require('../../libs/jquery-tmpl/jquery.tmpl.min.js');

$(function() {

    var tableObj = $('#tableObj');
    var tableTmpl = $('#tableTmpl');
    var queryform = $('#queryForm');
    var queryformurl = '/assets/admin/v4.0.3/json/glysytj.json';

    var tablesimple = new TableHigher(tableObj, tableTmpl, {
        bgcCtrl: true,
        hoverColor: '#fff7d7',
        oddColor: '#fafafa',
        evenColor: '#fff',
        datastyle: 'local',
        dataSource: tabledata,
        queryUrl: queryformurl,
        isquery: true,
        queryObj: queryform,
        extraStr: '',
        container: $('tbody', tableObj),
        suppBack: false,
        dateFormat: 'YYYY-MM-DD HH : mm : ss',
        headCtrl: true,
        pageCtrl: true,
        isBase64: false,
        firstLoadCallback: function() {},
        afterLoadCallback: function() {},
        afterPage: function() {},
        afterQuery: function() {}
    });
})
