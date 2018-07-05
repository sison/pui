/*
 * @Author: sison.luo
 * @Date:   2016-07-29 14:59:52
 * @Last Modified by: sison
 * @Last Modified time: 2018-07-05 15:19:47
 */

require('../css/pui.css');
require('../css/layout.css');
require('../css/page-common.css');
require('../../libs/prism/prism.css');

require('pjt-ui')
require('../../libs/layout.js')


$(function() {
    
    $('.examplePopop .pone').popSmart({
        // actType: 'mouseover',
        refCont: 'html里面没有refCont属性，我是插件属性'
    })


    $('.examplePopop .pdiv').popSmart({
        actType: 'click',
        refType: 'dom',
        refCont: $("#divPop")
    })


    $('.examplePopop table button').popSmart({
        actType: 'click',
        refType: 'confirm',
        refCont: '确定要删除吗？',
        yes: function(ele, ref){
            ele.closest('tr').remove();
            console.log(ele);
            console.log(ref);
        }
    })

});
