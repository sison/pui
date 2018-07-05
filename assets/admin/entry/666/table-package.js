/*
 * @Author: sison.luo
 * @Date:   2016-07-29 14:58:53
 * @Last Modified by:   sison
 * @Last Modified time: 2017-04-19 16:34:02
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
    var queryStr = '../assets/admin/v4.0.3/json/glysytj.json'; // 查询接口

    function TablePackage(obj, tmpl, form, option) {
        this.obj = obj;
        this.tmpl = tmpl;
        this.form = form;
        this.opts = option;
        this.init();
    }
    TablePackage.prototype = new HighView();
    TablePackage.prototype.init = function() {
        this.render();
        this.batExport();
    }
    TablePackage.prototype.batExport = function() {
        var _this = this;
        $("#btn-export-account").on("click", function(e) {
            var _btn = $(this);
            stopDefault(e);
            var arrChks = [];
            _this.obj.find(".chkone:checked").each(function() {
                arrChks.push($(this).val());
            });
            if (_this.isSelect()) {
                var postData = "";
                postData += _this.form.serialize();
                postData += "&isChkAll=" + (_this.all.is(":checked") ? "true" : "false");
                postData += "&curPageCheck=" + arrChks.join(",");
                postData += "&PageIndex=" + $("#curpage").val();
                postData += "&PageSize=" + $("#sizePage").val();
                // create form，插入各种条件
                var form = mockFormToSubmit({
                    type: "post",
                    action: _btn.attr("href"),
                    query: postData
                });
                form.submit();
                form = null;
            }
        })
    }
    var tablepackage = new TablePackage(tableObj, tableTmpl, queryform, {
        container: $('tbody', tableObj),
        queryStr: queryStr,
        dataSource: tabledata,
        isBase64: false
    })




})
