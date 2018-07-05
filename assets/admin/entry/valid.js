/*
 * @Author: sison.luo
 * @Date:   2016-07-29 14:58:53
 * @Last Modified by: sison
 * @Last Modified time: 2018-07-05 15:20:03
 */

'use strict';

require('../css/pui.css');
require('../css/layout.css');
require('../css/page-common.css');
require('../../libs/prism/prism.css');

require('pjt-ui')
require('../../libs/layout.js')

$(function() {

    var valid = new Valid();
    valid.form($('#submitForm'), {
        isAsync: true,
        isRenderCheckbox: true,
        isRenderRadio: true,
        isRenderSelect: true,
        scrollToError: false,
        asyncFun: function() {
            ceng.alert('allow submit')
        },
        errFun: function(){
            ceng.alert('refuse and check')
        }
    });
    // setTimeout(function() {
    //     valid.check($('#formName'))
    // }, 3000);
    // setTimeout(function() {
    //     valid.check($('#formPsw1'))
    // }, 4000);
    // setTimeout(function() {
    //     valid.check($('#formPsw2'))
    // }, 5000);
    // setTimeout(function() {
    //     valid.check($('#formCheckbox'))
    // }, 5000);
    // setTimeout(function() {
    //     valid.check($('#formRadio'))
    // }, 6000);
    // setTimeout(function() {
    //     valid.check($('#formUpload'))
    // }, 7000);
    // setTimeout(function() {
    //     valid.check($('#formSelect'))
    // }, 8000);
    // 
    // valid.input($('#formName'));
    // valid.input($('#formPsw1'));
    // valid.input($('#formPsw2'));
    // valid.checkbox($('#formCheckbox'),{
    //     isRenderCheckbox: true
    // });
    // valid.radio($('#formRadio'),{
    //     isRenderRadio: true
    // });
    // valid.select($('#formSelect'),{
    //     isRenderSelect: true
    // });
    // valid.upload($('#formUpload'));

})
