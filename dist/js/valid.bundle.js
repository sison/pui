webpackJsonp([7],[
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function($) {/*
	* @Author: sison.luo
	* @Date:   2016-07-29 14:58:53
	* @Last Modified by:   sison.luo
	* @Last Modified time: 2016-10-27 14:43:20
	*/

	'use strict';

	__webpack_require__(3);
	__webpack_require__(4);
	__webpack_require__(5);
	__webpack_require__(6);
	__webpack_require__(7);



	    $(function() {


	        // $('#submitForm').validSmart({
	        //     isAsync: true,
	        //     asyncFun: function(){
	        //         ceng.msg('去吧，比卡丘，弄死那个逗比',{
	        //             state: 'resolve',  // resolve || notice
	        //             time: 3000
	        //         })
	        //     }
	        // });
	        // 
	        valid.form($('#submitForm'), {
	            isAsync: true,
	            isRenderCheckbox: true,
	            isRenderRadio: true,
	            isRenderSelect: true,
	            isRenderUpload: true,
	            asyncFun: function() {
	                ceng.msg('abc', {
	                    time: 1000
	                })
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

	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(1)))

/***/ }
]);