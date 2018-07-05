/*
 * @Author: sison.luo
 * @Date:   2016-07-29 14:58:53
 * @Last Modified by: sison
 * @Last Modified time: 2018-07-05 17:12:56
 */

'use strict';

require('../css/pui.css');
require('../css/layout.css');
require('../css/page-common.css');
require('../../fonts/style.css')
require('../../libs/prism/prism.css');

require('pjt-ui')
require('../../libs/layout.js')


$(function() {

    var startData = {
        zid: '0001',
        value: '都城的饭菜好难吃',
        themeStyle: 2,
        theme1: [{
            zid: '00031',
            value: '一级指标 111',
            defined: 1,
            grade1: 1,
            grade2: 1,
            grade3: 1,
            children: []
        }],
        theme2: [{
            zid: '00031',
            value: '一级指标 111',
            defined: 1,
            grade1: 1,
            grade2: 1,
            grade3: 1,
            children: [{
                zid: '00031',
                value: '二级指标 222',
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
    tree.main = [false, true, true, false, false, false];
    tree.width = ['0', '35%', '35%', '10%', '10%', '10%'];
    tree.alias = ['th0', 'th1', 'th2', 'th3', 'th4', 'th5'];
    tree.header = [{
        title: '',
        formatter: function() {
            return '';
        }
    }, {
        title: '',
        formatter: function() {
            return '<div class="insert-select tl"></div>';
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
            return '';
        }
    }, {
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
            return '<p>雏鸡程序员</p>';
        }
    }, {
        title: '',
        formatter: function() {
            return '<p>中鸡程序员</p>';
        }
    }, {
        title: '',
        formatter: function() {
            return '<p>高鸡程序员</p>';
        }
    }];
    tree.collapse = [{
        title: '',
        formatter: function() {
            return '';
        }
    }, {
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



    var insertLevel = function(c, tree) {
        var selectObj = '';

        var zbtiptxt = '<span class="pdl10 pdr10 fl">指标展开</span>';
        var zbweighttxt = '<span class="pdl10 pdr10 fl">选择权重设置的指标层级</span>';

        var cnlv = ["零", "一", "二", "三", "四", "五", "六", "七"];
        selectObj += '<div class="select-group fl">';
        selectObj += '<select class="select" data-width="75px">';
        //debugger;

        if ($('.insert-select select')) {
            var curc = $('.insert-select select option').length;
            if (curc < c) {
                //debugger;
                $('.insert-select').empty();
                for (var lev = 1; lev <= c; lev++) {
                    //if (lev === c) {
                    //    selectObj += '<option value=' + lev + ' selected>' + cnlv[lev] + '级</option>'
                    //} else {
                    selectObj += '<option value=' + lev + '>' + cnlv[lev] + '级</option>'
                    //}
                }
                selectObj += '</select>';
                selectObj += '</div>';
                selectObj += '</div>';

                $('.insert-select').append(zbtiptxt);
                $('.insert-select').append(selectObj);
                $('.insert-select select option').eq(c - 1).attr('selected', true);
                $('.insert-select select').selectSmart({
                    callback: function(i, k, v) {
                        //changeLevel(v, tree);
                        Pui.togToggle(tree, v);
                    }
                })
            }
        }


        // 权重selelctor
        if ($('#weightSelector')) {
            $('#weightSelector').append(zbweighttxt);
            $('#weightSelector').append(selectObj);
            $('#weightSelector select').selectSmart({
                callback: function(i, k, v) {
                    changeWeightState(i);
                }
            })
        }
    }

    var checkoutTree = function(self, dtd) {
        var dtd = $.Deferred();
        // var start = (new Date()).getTime();
        var c = 1;
        if ($('.level3', self).length > 0) {
            c = 3;
        } else if ($('.level2', self).length > 0) {
            c = 2;
        } else if ($('.level1', self).length > 0) {
            c = 1;
        }
        dtd.resolve(c);
        return dtd.promise();
    }

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


    new Tree({
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
            $.when(checkoutTree()).done(function(c) {
                insertLevel(c, self);
            });
            // toggleLevel(self);
            changePrecent(self);
            // changeWeight(self);
        }
    });


    
    var loopdata = '[{"title":{"Name":"branch46（3人）","OrgStructureDepartmentId":-1},"children":[{"title":{"Name":"市场部（1人）","OrgStructureDepartmentId":371},"children":[{"title":{"Name":"杭州分部（1人）","OrgStructureDepartmentId":372},"children":[],"chkBoxAttr":null,"LongName":null,"OrgStructureDepartmentId":372,"CustomerId":1000000,"Name":"杭州分部（1人）","OrgCode":"371-372","Level":2,"Status":1,"CreatedDate":"2018-07-05T16:01:06.79","Creater":"admin","ModifiedDate":null,"Modifier":null,"DeletedDate":null,"Deleter":null}],"chkBoxAttr":null,"LongName":null,"OrgStructureDepartmentId":371,"CustomerId":1000000,"Name":"市场部（1人）","OrgCode":"371","Level":1,"Status":1,"CreatedDate":"2018-07-05T16:01:06.787","Creater":"admin","ModifiedDate":null,"Modifier":null,"DeletedDate":null,"Deleter":null},{"title":{"Name":"挨踢部（2人）","OrgStructureDepartmentId":373},"children":[{"title":{"Name":"抓娃组（1人）","OrgStructureDepartmentId":374},"children":[{"title":{"Name":"抓娃1组（1人）","OrgStructureDepartmentId":375},"children":[{"title":{"Name":"加班组（1人）","OrgStructureDepartmentId":377},"children":[{"title":{"Name":"周末加班组（1人）","OrgStructureDepartmentId":378},"children":[],"chkBoxAttr":null,"LongName":null,"OrgStructureDepartmentId":378,"CustomerId":1000000,"Name":"周末加班组（1人）","OrgCode":"373-374-375-377-378","Level":5,"Status":1,"CreatedDate":"2018-07-05T16:03:58.12","Creater":"admin","ModifiedDate":null,"Modifier":null,"DeletedDate":null,"Deleter":null}],"chkBoxAttr":null,"LongName":null,"OrgStructureDepartmentId":377,"CustomerId":1000000,"Name":"加班组（1人）","OrgCode":"373-374-375-377","Level":4,"Status":1,"CreatedDate":"2018-07-05T16:03:48.937","Creater":"admin","ModifiedDate":null,"Modifier":null,"DeletedDate":null,"Deleter":null}],"chkBoxAttr":null,"LongName":null,"OrgStructureDepartmentId":375,"CustomerId":1000000,"Name":"抓娃1组（1人）","OrgCode":"373-374-375","Level":3,"Status":1,"CreatedDate":"2018-07-05T16:03:27.15","Creater":"admin","ModifiedDate":null,"Modifier":null,"DeletedDate":null,"Deleter":null},{"title":{"Name":"抓娃2组（0人）","OrgStructureDepartmentId":376},"children":[],"chkBoxAttr":null,"LongName":null,"OrgStructureDepartmentId":376,"CustomerId":1000000,"Name":"抓娃2组（0人）","OrgCode":"373-374-376","Level":3,"Status":1,"CreatedDate":"2018-07-05T16:03:36.08","Creater":"admin","ModifiedDate":null,"Modifier":null,"DeletedDate":null,"Deleter":null}],"chkBoxAttr":null,"LongName":null,"OrgStructureDepartmentId":374,"CustomerId":1000000,"Name":"抓娃组（1人）","OrgCode":"373-374","Level":2,"Status":1,"CreatedDate":"2018-07-05T16:03:13.46","Creater":"admin","ModifiedDate":null,"Modifier":null,"DeletedDate":null,"Deleter":null}],"chkBoxAttr":null,"LongName":null,"OrgStructureDepartmentId":373,"CustomerId":1000000,"Name":"挨踢部（2人）","OrgCode":"373","Level":1,"Status":1,"CreatedDate":"2018-07-05T16:01:25.58","Creater":"admin","ModifiedDate":"2018-07-05T16:02:16.32","Modifier":"admin","DeletedDate":null,"Deleter":null}],"chkBoxAttr":null,"LongName":null,"OrgStructureDepartmentId":null,"CustomerId":null,"Name":"branch46（3人）","OrgCode":"","Level":null,"Status":null,"CreatedDate":null,"Creater":null,"ModifiedDate":null,"Modifier":null,"DeletedDate":null,"Deleter":null}]';

    new Tree({
        tree: $('#weightLoop'),
        data: JSON.parse(loopdata),
        dw: 20,
        main: [true],
        width: ['100%'],
        alias: ['name'],
        header: [],
        headersub: [],
        collapse: [
            {
                title: 'title',
                formatter: function (v) {
                    return '<em class="icon icon-folder"></em><a class="ellipsis block c-gray2 pdr10" href="javascript:void(0)" title="' + v.Name + '">' + v.Name + '</a><input type="hidden" orgid="' + v.OrgStructureDepartmentId + '" />'
                }
            }
        ],
        callback: function (self) {}
    });


    



})
