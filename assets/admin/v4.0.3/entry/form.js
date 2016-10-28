/*
* @Author: sison.luo
* @Date:   2016-07-29 14:59:52
* @Last Modified by:   sison.luo
* @Last Modified time: 2016-10-27 14:43:05
*/

'use strict';

require('../css/pui.css');
require('../css/layout.css');
require('../css/page-common.css');
require('../../../libs/prism/prism.css');
require('../js/layout.js');


$(function() {

        $('#selectAttachGroupDisabled').selectSmart();
        $('#selectAttachGroup').selectSmart({
            isvalid: true,
            validCallback: function(i, t, v, o, ro, cb){
                ceng.comfirm('是否要 change？', {
                    yes: function(obj, index){
                        Pui.selectChange(i, t, v, o, ro, cb);
                        ceng.close(index);
                    }
                });
            },
            callback: function(i, t, v) {
                ceng.msg('SelectIndex：' + i + ' ，Txt：' + t + ' ，Value：' + v);
            }
        });
        $('#demoRadio input[type=radio]').radioSmart({
            callback: function(self, v) {}
                // self 为当前radio
                // v 为选中的值
        });
        $('#demoCheckbox input[type=checkbox]').checkboxSmart({
            callback: function(self, bool) {}, // 点击后回调事件
            checkCallback: function() {}, // 选中回调事件
            uncheckCallback: function() {} // 反选回调事件
        });

        $('#getDemoCheckboxVal').on('click', function(){
            ceng.msg(Pui.getCheckVal($('#demoCheckbox')),{
                state: 'notice'
            })
        });

        $('#switch2').switchSmart({
            enable: function() {
                debugger;
                ceng.msg('启用', {
                    state: 'resolve'
                });
            },
            disable: function() {
                ceng.msg('禁用', {
                    state: 'notice'
                });
            }
        });

        $('#switchanger').on('click', function() {
            Pui.toggleSwitchState($('#switch2'));
        });

        $('#switchDisabled').switchSmart();

        $('#switch3').switchSmart({
            isvalid: true,
            validCallback: function() {
                ceng.comfirm('最后问一次，是否切换', {
                    title: '提示',
                    btn: ['切换吧', '不换'],
                    yes: function(obj, index) {
                        Pui.toggleSwitchState($('#switch3'));
                        ceng.close(index);
                    }
                })
            }
        });

        $('#pageDemo').pager({
            totalItem: 88,
            pageSize: 10,
            pageIndex: 1,
            action: function(pi, ps) {
                ceng.msg('pageIndex： ' + pi + '，pageSize： ' + ps);
            }
        });

    })
