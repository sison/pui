/*
* @Author: sison.luo
* @Date:   2016-07-29 14:58:53
* @Last Modified by:   sison.luo
* @Last Modified time: 2016-10-27 14:43:16
*/

'use strict';

require('../css/pui.css');
require('../css/layout.css');
require('../css/page-common.css');
require('../../../libs/prism/prism.css');
require('../js/layout.js');


$(function() {

        var startData = {
            zid: '0001',
            value: '都城的饭好难吃',
            themeStyle: 2,
            theme1: [{
                zid: '00031',
                value: '一级指标1111111111',
                defined: 1,
                grade1: 1,
                grade2: 1,
                grade3: 1,
                children: []
            }],
            theme2: [{
                zid: '00031',
                value: '2一级指标99999999',
                defined: 1,
                grade1: 1,
                grade2: 1,
                grade3: 1,
                children: [{
                    zid: '00031',
                    value: '2二级指标222222222',
                    defined: 1,
                    grade1: 1,
                    grade2: 1,
                    grade3: 1,
                    children: []
                }]
            }],
            theme3: [{
                zid: '00031',
                value: '一级指标1',
                defined: 1,
                grade1: 1,
                grade2: 1,
                grade3: 1,
                children: [{
                    zid: '000211',
                    value: '二级指标',
                    defined: 1,
                    grade1: 1,
                    grade2: 1,
                    grade3: 1,
                    children: [{
                        zid: '000211',
                        value: '三级指标',
                        defined: 1,
                        grade1: 9,
                        grade2: 9,
                        grade3: 9,
                        children: []
                    }]
                }, {
                    zid: '000211',
                    value: '二级指标',
                    defined: 1,
                    grade1: 1,
                    grade2: 1,
                    grade3: 1,
                    children: [{
                        zid: '000211',
                        value: '三级指标',
                        defined: 1,
                        grade1: 1,
                        grade2: 1,
                        grade3: 1,
                        children: []
                    }, {
                        zid: '000211',
                        value: '三级指标',
                        defined: 1,
                        grade1: 1,
                        grade2: 1,
                        grade3: 1,
                        children: []
                    }, {
                        zid: '000211',
                        value: '三级指标',
                        defined: 1,
                        grade1: 1,
                        grade2: 1,
                        grade3: 1,
                        children: []
                    }]
                }]
            }, {
                zid: '00031',
                value: '一级指标2',
                defined: 1,
                grade1: 1,
                grade2: 1,
                grade3: 1,
                children: [{
                    zid: '000211',
                    value: '二级指标',
                    defined: 1,
                    grade1: 1,
                    grade2: 1,
                    grade3: 1,
                    children: []
                }, {
                    zid: '000211',
                    value: '二级指标',
                    defined: 1,
                    grade1: 1,
                    grade2: 1,
                    grade3: 1,
                    children: [{
                        zid: '000211',
                        value: '三级指标',
                        defined: 1,
                        grade1: 1,
                        grade2: 1,
                        grade3: 1,
                        children: []
                    }]
                }]
            }]
        }
        var tree = new Object();
        tree.dom = $('#weightTree');
        tree.main = [true, true, false, false, false];
        tree.width = ['35%', '35%', '10%', '10%', '10%'];
        tree.alias = ['th1', 'th2', 'th3', 'th4', 'th5'];
        tree.header = [{
            title: '',
            formatter: function() {
                return '<div class="tl"><span class="pdl10 pdr10 fl">指标展开</span><div class="select-group fl"><select id="changeLevel" class="select" data-width="75px"><option value="1">一级</option><option value="2">二级</option><option value="3" selected>三级</option></select></div></div>';
            }
        }, {
            title: '',
            formatter: function() {
                return '<p>指标权重</p>';
            }
        }, {
            title: '',
            formatter: function() {
                return '<p>上级</p>';
            }
        }, {
            title: '',
            formatter: function() {
                return '<p>同级</p>';
            }
        }, {
            title: '',
            formatter: function() {
                return '<p>下级</p>';
            }
        }];
        tree.headersub = [{
            title: '',
            formatter: function() {
                return '<p class="tl fs fbold pdl10 c-gray4"><span>模块名称</span><span class="pdl10 c-gray2">' + startData.value + '</span></p>';
            }
        }, {
            title: '',
            formatter: function() {
                return '<div class="por100"><div style="padding-left: 10px;"><input type="text" class="txt wp100 tc c-gray3 disabled" disabled data-req="true" value="1" /></div><div class="abs tl"><span class="pdl10 c-gray3">100%</span></div></div>';
            }
        }, {
            title: '',
            formatter: function() {
                var _html = '';
                _html += '<div class="relative">';
                _html += '<div class="absolute w300 clearfix pdl10 c-gray3 tl">';
                _html += '<div class="fl pdr10 pdl10">选择权重设置的指标层级</div>';
                _html += '<div class="select-group fl">';
                _html += '<select id="changeWeight" class="select" data-width="75px">';
                _html += '<option value="1">一级</option>';
                _html += '<option value="2">二级</option>';
                _html += '<option value="3">三级</option>';
                _html += '</select>';
                _html += '</div>';
                _html += '<div class="txt-group fl">';
                _html += '<div class="popop pop-bottom mgl10" data-lean="right" data-width="280px">';
                _html += '<a href="javascript:void(0)" class="c-gray4"><i class="icon icon-sign-full fb"></i></a>';
                _html += '<div class="popsub ffs fs c-brown">';
                _html += '<p>权重设置只能挑选一个层级进行设置，一旦选定且设置权重，其他层级权重不计算。只能输入大于0的正整数。</p>';
                _html += '</div>';
                _html += '</div>';
                _html += '</div>';
                _html += '</div>';
                _html += '</div>';
                return _html;
            }
        }, {
            title: '',
            formatter: function() {
                return '';
            }
        }, {
            title: '',
            formatter: function() {
                return '';
            }
        }];
        tree.collapse = [{
            title: 'value',
            formatter: function(val) {
                return '<input type="text" class="txt wp100 disabled" disabled data-req="true" value="' + val + '" /> ';
            }
        }, {
            title: 'defined',
            formatter: function(val) {
                return '<div class="por100"><input type="text" class ="txt wp100 tc c-gray3 zbweight" data-req="true" value ="' + val + '" /><div class="abs tl"><span class="pdl10 c-gray3 zbprecent">100%</span></div></div> ';
            }
        }, {
            title: 'grade1',
            formatter: function(val) {
                if (typeof val === 'object') {
                    return ' <div class="pdl10 pdr10"><input type="text" name="' + val.name + '" class ="txt wp100 tc c-gray3" data-req="true" value ="' + val.val + '" /></div> ';
                } else {
                    return ' <div class="pdl10 pdr10"><input type="text" class ="txt wp100 tc c-gray3" data-req="true" value ="' + val + '" /></div> ';
                }
            }
        }, {
            title: 'grade2',
            formatter: function(val) {
                return ' <div class="pdl10 pdr10"><input type="text" class ="txt wp100 tc c-gray3" data-req="true" value ="' + val + '" /></div> ';
            }
        }, {
            title: 'grade3',
            formatter: function(val) {
                return ' <div class="pdl10 pdr10"><input type="text" class ="txt wp100 tc c-gray3" data-req="true" value ="' + val + '" /></div> ';
            }
        }];


        var changePrecent = function(self) {
            self.on('change', 'input.zbweight', function() {
                var row = $(this).closest('.row');
                var rowul = row.closest('ul') || null;
                var siblings = row.siblings('.row');
                if (siblings.length > 0) {
                    var totalscore = 0;
                    for (var i = 0, leng = siblings.length + 1; i < leng; i++) {
                        totalscore += parseInt(rowul.children('.row').eq(i).find('.zbweight').val());
                    }
                    totalscore;
                    rowul.children('.row').each(function() {
                        createRowResult.call($(this).find('.zbweight').eq(0), totalscore);
                    })
                } else {
                    debugger;
                    row.find('.zbprecent').text('100%');
                }
            });
        }
        var createRowResult = function(total) {
            var result = parseInt(this.val()) / total;
            result = result * 100;
            result = result.toString().indexOf('.') > -1 ? result.toFixed(2) : result;
            result += '%';
            this.next().find('.zbprecent').text(result);
            // debugger;
        }
        var changeWeight = function(self) {
            $('#changeWeight', self).selectSmart({
                callback: function(i, k, v) {
                    switch (v) {
                        case '1':
                            self.find('.ext-body > ul >li > div')
                            break;
                        case '2':
                            break;
                        case '3':
                            break;
                    }
                }
            });
        }
        var toggleLevel = function(self) {
            $('#changeLevel', self).selectSmart({
                callback: function(i, k, v) {
                    switch (v) {
                        case '1':
                            var togger1 = self.find('.ext-body > ul > li > .mainkey i.icon-toggle');
                            Pui.togExpand(togger1);
                            break;
                        case '2':
                            var togger1 = self.find('.ext-body > ul > li > .mainkey i.icon-toggle');
                            Pui.togCollapse(togger1);
                            var togger2 = self.find('.ext-body > ul > li > ul > li > .mainkey i.icon-toggle');
                            Pui.togExpand(togger2);
                            break;
                        case '3':
                            var togger1 = self.find('.ext-body > ul > li > .mainkey i.icon-toggle');
                            Pui.togCollapse(togger1);
                            var togger2 = self.find('.ext-body > ul > li > ul > li > .mainkey i.icon-toggle');
                            Pui.togCollapse(togger2);
                            break;
                    }
                }
            });
        }

        var loop = new Tree({
            tree: tree.dom,
            data: startData.theme3,
            main: tree.main,
            width: tree.width,
            alias: tree.alias,
            // 头部
            header: tree.header,
            // 副头部
            headersub: tree.headersub,
            // 列表树
            collapse: tree.collapse,
            callback: function(self) {
                toggleLevel(self);
                changePrecent(self);
                changeWeight(self);
            }
        });
        loop.init();




    })
