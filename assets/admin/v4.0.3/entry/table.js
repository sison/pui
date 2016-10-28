/*
* @Author: sison.luo
* @Date:   2016-07-29 14:58:53
* @Last Modified by:   sison.luo
* @Last Modified time: 2016-10-27 14:43:13
*/

'use strict';

require('../css/pui.css');
require('../css/layout.css');
require('../css/page-common.css');
require('../../../libs/prism/prism.css');
require('../js/layout.js');
require('../../../libs/jquery-tmpl/jquery.tmpl.min.js');


    $(function() {

        var tableObj = $('#tableObj');
        var tableTmpl = $('#tableTmpl');
        var queryform = $('#queryForm');
        var queryformurl = 'assets/admin/v4.0.3/json/glysytj.json'; // 查询接口

        var tablesimple = new TableSimple(tableObj, tableTmpl, {
            bgcCtrl: true,      // 是否控制表格行背景色
            hoverColor: '#ffc',
            oddColor: '#fff',
            evenColor: '#fff',
            datastyle: 'local',     // 数据来源，首屏本地
            dataSource: tabledata,      // 首屏数据
            isBase64: false,        // 数据是否 base64 加密
            isquery: true,          // 是否带查询
            pageCtrl: true,        // 是否有分页
            suppBack: true,
            headCtrl: true,
            container: $('tbody', tableObj),    // 数据dom容器
            queryObj: queryform,        // 如果带查询，这里提供查询form的 $(id)
            queryUrl: queryformurl,     // 数据接口
            dateFormat: 'YYYY-MM-DD',       // 查询时间格式
            afterLoadCallback: function () {
                ceng.msg('渲染完成回调')
            }        // 数据渲染后回调事件
        });
    })
