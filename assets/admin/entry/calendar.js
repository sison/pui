/*
 * @Author: sison.luo
 * @Date:   2016-07-29 14:59:52
 * @Last Modified by: sison
 * @Last Modified time: 2018-07-05 15:18:56
 */

'use strict';

require('../css/pui.css');
require('../css/layout.css');
require('../css/page-common.css');
require('../../libs/prism/prism.css');

require('pjt-ui')
require('../../libs/layout.js')


$(function() {

    $('#singleDateTime').daterSmart({
        format: 'YYYY/MM/DD hh:mm:ss'
    });

    $('#singleDate').daterSmart({
        format: 'YYYY/MM/DD',
        onshow: function(){
            ceng.msger('简单点，说话的方式简单点', 1);
        },
        onclear: function(ipt){
            ceng.msger('年轻人别总想着搞大事情', 0);
        },
        onselect: function(ipt, dater, val){
            ceng.msger(val, 1);
        }
    });

    $('#singleFormat').daterSmart({
        weeklang: 'en',
        format: 'YYYY_MM_DD hh:mm'
    });

    // range start

    $('#start').daterSmart({
        format: 'YYYY-MM-DD hh:mm:ss',
        minDate: '2010-03-02 00:00:00',
        maxDate: $("#end"),
        onselect: function(){
            $('#end').click();
        }
    });

    $('#end').daterSmart({
        format: 'YYYY-MM-DD hh:mm:ss',
        minDate: $("#start"),
        maxDate: '2027-08-27 12:20:00'
    })

    // range end


    $('#weekWed').daterSmart({
        format: 'YYYY-MM-DD',
        weekfirst: 1
    });

});
