/*
 * @Author: sison
 * @Date:   2017-03-16 18:08:07
 * @Last Modified by: mikey.zhaopeng
 * @Last Modified time: 2017-08-02 11:29:26
 */

// 'use strict';


// (function($, window, document) {

//     var defaults = {
//         container: "",
//         queryStr: "",
//         dataSource: "",
//         isBase64: false
//     }

//     function View(obj, tmpl, form) {
//         this.obj = obj;
//         this.tmpl = tmpl;
//         this.form = form;
//     }

//     var HighView = window.HighView = function(obj, tmpl, form, option) {
//         this.obj = obj;
//         this.tmpl = tmpl;
//         this.form = form;
//         this.all = $('#isChkAll');
//         this.page = $('#isChkPage');
//         this.total = 0;
//         this.chks = [];
//         this.isChkAll = false;
//         // this.chkArr = [];
//         // this.unchkArr = [];
//         this.opts = $.extend({}, defaults, option);
//     }

//     HighView.prototype = new View();
//     HighView.prototype.search = function() {
//         var _this = this;
//         if ($('input[name="hidIsAdvSearch"]', _this.form) == 0) {
//             $('.simpSubmit', _this.form).click();
//         } else {
//             $('.highSubmit', _this.form).click();
//         }
//         Pui.setCheckVal(_this.all, false);
//         Pui.setCheckVal(_this.page, false);
//     }
//     HighView.prototype.init = function() {
//         this.render();
//     }
//     HighView.prototype.render = function() {
//         var _this = this;
//         var tableHigher = new TableHigher(_this.obj, _this.tmpl, {
//             bgcCtrl: true,
//             hoverColor: '#ffc',
//             oddColor: '#fff',
//             evenColor: '#fff',
//             queryObj: _this.form,
//             isBase64: _this.opts.isBase64,
//             container: _this.opts.container,
//             queryUrl: _this.opts.queryStr,
//             dataSource: _this.opts.dataSource,

//             firstLoadCallback: function(ele, data) {
//                 _this.toggleTableTheadCheckbox();
//                 _this.firstTimeEvent(ele, data);
//             },
//             afterLoadCallback: function(ele, data) {
//                 _this.toggleTableTbodyCheckbox();
//                 _this.total = data.TotalRecords;
//                 _this.all.siblings('span').text(data.TotalRecords);
//                 _this.page.siblings('span').text(data.Data.length);
//                 _this.everyTimeEvent(ele, data);
//             },
//             afterPage: function(pi, ps) {
//                 if (_this.isChkAll) {
//                     var one = _this.obj.find('.chkone');
//                     Pui.setCheckVal(one, true);
//                 }
//             },
//             afterQuery: function() {
//                 // _this.chks = [];
//                 Pui.setCheckVal(_this.all, false);
//                 Pui.setCheckVal(_this.page, false);
//             }
//         });
//     }
//     HighView.prototype.isSelect = function() {
//         var _this = this;
//         if (_this.total == 0) {
//             ceng.msg("暂无帐号可操作", { state: "notice" });
//             return false;
//         }
//         if (!_this.all.is(":checked")) {
//             if (_this.obj.find(".chkone:checked").length <= 0) {
//                 ceng.msg("请选择帐号", { state: "notice" });
//                 return false;
//             }
//         }
//         return true;
//     }
//     HighView.prototype.toggleTableTheadCheckbox = function() {
//         var _this = this;
//         _this.page.checkboxSmart({
//             callback: function(obj, v) {
//                 var one = _this.obj.find('input.chkone');
//                 var pageNum = parseInt(_this.page.parent().find('span').text());
//                 var allNum = parseInt(_this.all.parent().find('span').text());
//                 if (v === true) {
//                     one.each(function() {
//                         if (!$(this).is(":checked")) {
//                             _this.chks.push($(this).val());
//                         }
//                     })
//                     if (pageNum === allNum) {
//                         Pui.setCheckVal(_this.all, true);
//                         _this.isChkAll = true;
//                     }
//                 } else {
//                     Pui.setCheckVal(_this.all, false);
//                     _this.isChkAll = false;
//                     one.each(function() {
//                         _this.chks.remove($(this).val());
//                     })
//                 }
//                 Pui.setCheckVal(one, v);
//                 _this.pageClickEvent(obj, v);
//             }
//         });
//         _this.all.checkboxSmart({
//             callback: function(obj, v) {
//                 _this.isChkAll = v;
//                 var one = _this.obj.find('input.chkone');
//                 Pui.setCheckVal(one, v);
//                 Pui.setCheckVal(_this.page, v);
//                 _this.chks = [];
//                 _this.allClickEvent(obj, v);
//             }
//         })
//     }
//     HighView.prototype.toggleTableTbodyCheckbox = function() {
//         var _this = this;
//         var one = _this.obj.find('input.chkone');
//         one.checkboxSmart({
//             checkCallback: function(obj) {
//                 _this.chks.push(obj.val());
//                 var isfull = true;
//                 one.each(function() {
//                     if ($(this).prop('checked') == false) {
//                         isfull = false;
//                         return false;
//                     }
//                 });
//                 if (isfull) {
//                     Pui.setCheckVal(_this.page, true);
//                     var pageNum = parseInt(_this.page.parent().find('span').text());
//                     var allNum = parseInt(_this.all.parent().find('span').text());
//                     if (pageNum === allNum) {
//                         Pui.setCheckVal(_this.all, true);
//                         _this.isChkAll = true;
//                     }
//                 }
//             },
//             uncheckCallback: function(obj) {
//                 _this.chks.remove(obj.val());
//                 Pui.setCheckVal(_this.all, false);
//                 Pui.setCheckVal(_this.page, false);
//                 _this.isChkAll = false;
//             },
//             callback: function(obj, v) {
//                 _this.oneClickEvent(obj, v);
//             }
//         })
//     }
//     HighView.prototype.batExport = function() {
//         var _this = this;
//         $("#btn-export-account").on("click", function(e) {
//             stopDefault(e);
//             var _btn = $(this);
//             var _jk = _btn.attr("href") || "";
//             var arrChks = [];
//             _this.obj.find(".chkone:checked").each(function() {
//                 arrChks.push($(this).val());
//             });
//             if (_this.isSelect()) {
//                 var postData = "";
//                 postData += _this.form.serialize();
//                 postData += "&isChkAll=" + (_this.all.is(":checked") ? "true" : "false");
//                 postData += "&curPageCheck=" + arrChks.join(",");
//                 postData += "&PageIndex=" + $("#curpage").val();
//                 postData += "&PageSize=" + $("#sizePage").val();
//                 mockFormToSubmit({
//                     method: "POST",
//                     action: _jk,
//                     query: postData
//                 });
//             }
//         })
//     }
//     HighView.prototype.firstTimeEvent = function(ele, data) {}
//     HighView.prototype.everyTimeEvent = function(ele, data) {}

//     HighView.prototype.pageClickEvent = function() {}
//     HighView.prototype.allClickEvent = function() {}
//     HighView.prototype.oneClickEvent = function() {}



// })(jQuery, window, document)