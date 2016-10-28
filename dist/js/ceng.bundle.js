webpackJsonp([0],[
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function($) {/*
	* @Author: sison.luo
	* @Date:   2016-07-29 14:59:52
	* @Last Modified by:   sison.luo
	* @Last Modified time: 2016-10-27 14:43:00
	*/

	'use strict';

	__webpack_require__(3);
	__webpack_require__(4);
	__webpack_require__(5);
	__webpack_require__(6);
	__webpack_require__(7);

	$(function() {

	        $('#cengMsg').on('click', function() {
	            ceng.msg('有心人（邓紫棋 G.E.M）', {
	                state: 'resolve',
	                time: 2000,
	                end: function(){
	                    ceng.msg('寂寞也挥发着余香',{
	                        end: function(){
	                            ceng.msg('原来情动正是这样',{
	                                end: function(){
	                                    ceng.msg('曾忘掉这种遐想',{
	                                        end: function(){
	                                            ceng.msg('这么超乎我想象',{
	                                                end: function(){
	                                                    ceng.msg('但愿我可以没成长',{
	                                                        end: function(){
	                                                            ceng.msg('完全 凭直觉觅对象',{
	                                                                end: function(){
	                                                                    ceng.msg('模糊地迷恋你一场',{
	                                                                        end: function(){
	                                                                            ceng.msg('就当风雨下潮涨',{
	                                                                                end: function(){
	                                                                                    ceng.msg('如果真的太好',{
	                                                                                        end: function(){
	                                                                                            ceng.msg('如错看了都好',{
	                                                                                                end: function(){
	                                                                                                    ceng.msg('不想证实有没有过倾慕',{
	                                                                                                        end: function(){
	                                                                                                            ceng.msg('是无力 或有心',{
	                                                                                                                end: function(){
	                                                                                                                    ceng.msg('像谜 像戏',{
	                                                                                                                        end: function(){
	                                                                                                                            ceng.msg('谁又会 似我演得更好',{
	                                                                                                                                end: function(){
	                                                                                                                                    ceng.msg('从眉梢中感觉到',{
	                                                                                                                                        end: function(){
	                                                                                                                                            ceng.msg('从眼角看不到', {
	                                                                                                                                                end: function(){
	                                                                                                                                                    ceng.msg('彷佛已是最直接的裸露', {
	                                                                                                                                                        end: function(){
	                                                                                                                                                            ceng.msg('是无力 但有心',{
	                                                                                                                                                                end: function(){
	                                                                                                                                                                    ceng.msg('暗来 明往', {
	                                                                                                                                                                        end: function(){
	                                                                                                                                                                            ceng.msg('谁说 这算是情愫',{
	                                                                                                                                                                                time: 3000
	                                                                                                                                                                            })
	                                                                                                                                                                        }
	                                                                                                                                                                    })
	                                                                                                                                                                }
	                                                                                                                                                            })
	                                                                                                                                                        }
	                                                                                                                                                    })
	                                                                                                                                                }
	                                                                                                                                            })
	                                                                                                                                        }
	                                                                                                                                    })
	                                                                                                                                }
	                                                                                                                            })
	                                                                                                                        }
	                                                                                                                    })
	                                                                                                                }
	                                                                                                            })
	                                                                                                        }
	                                                                                                    })
	                                                                                                }
	                                                                                            })
	                                                                                        }
	                                                                                    })
	                                                                                }
	                                                                            })
	                                                                        }
	                                                                    })
	                                                                }
	                                                            })
	                                                        }
	                                                    })
	                                                }
	                                            })
	                                        }
	                                    })
	                                }
	                            })
	                        }
	                    })
	                }
	            })
	        });

	        $('#cengAlert').on('click', function() {
	            ceng.alert('<p class="ffs c-gray3">没意见你想怎样我都随便</p>', {
	                title: '标题就要 long long long long long long long long long long long long long long long long long',
	                area: ['auto', 'auto'],
	                yes: function() {
	                    ceng.msg('点话点好啦');
	                }
	            })
	        });
	        $('#cengConfirm1').on('click', function() {
	            ceng.comfirm('<p class="ffs c-gray3">国旗又错了！女排颁奖升起了错误国旗</p>', {
	                title: '询问层',
	                btn: ['确定', '取消'],
	                yes: function(obj, index){
	                    ceng.msg('弄死那个逗比！');
	                    ceng.close(index);
	                }
	            })
	        });
	        $('#cengConfirm2').on('click', function() {
	            var _htm = '<p>问君能有几多愁？</p><p>恰似一群太监上春楼！</p>';
	            ceng.comfirm(_htm, {
	                style: 2,
	                complete: function(){
	                    ceng.msg('abc');
	                },
	                yes: function(o, z) {
	                    ceng.close(z);
	                }
	            })
	        });
	        $('#cengHello').on('click', function() {
	            ceng.hello({
	                title: '页面层',
	                content: $('#divHello'),
	                contentType: 'dom', // dom, url
	                area: [600, 'auto'],
	                btn: ['确定','取消'],
	                yes: function(obj ,index){
	                    ceng.msg('弄死那个逗比', {
	                        end: function(){
	                            ceng.close(index);
	                        }
	                    })
	                }
	            })
	        });
	        $('#cengHelloRemote').on('click', function() {
	            ceng.hello({
	                title: '页面层',
	                content: 'assets/admin/v4.0.3/remotePage/demo.html',
	                contentType: 'url', // dom, url
	                contentData: 'a=1&b=2&c=3',
	                area: [800, 'auto'],
	                btn: ['按钮一', '按钮二', '按钮三'],
	                btn1: function() {},
	                btn2: function() {
	                    ceng.alert('全部关闭咯', {
	                        yes: function() {
	                            ceng.closeAll();
	                        }
	                    })
	                },
	                btn3: function() {
	                    ceng.msg('按我干嘛？')
	                }
	            })
	        });
	        $('#cengiFrame').on('click', function() {
	            ceng.iframe({
	                title: '2016国际体验设计大会',
	                url: 'http://www.cepin.com',
	                area: [1200, 600],
	                yes: function() {}
	            })
	        });
	    });

	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(1)))

/***/ }
]);