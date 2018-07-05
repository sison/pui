/*
 * @Author: sison.luo
 * @Date:   2016-03-16 14:14:05
 * @Last Modified by: sison
 * @Last Modified time: 2018-05-24 17:04:17
 
 ** 树组件 **
 ** 支持无限循环 **
 */

;
(function($, window, undefined) {

    var defaults = {
        dw: 0
    }

    Tree = function(option) {
        this.opts = $.extend(defaults, option);
        this.html = '';
        this.level = 1;
        this.init();
    }
    Tree.prototype.init = function() {
        this.render();
        this.watch();
    }
    Tree.prototype.renderObj = function(obj) {
        var self = this;
        var caption = self.opts[obj];
        var clsname = 'ext-' + obj;
        var clsnamejq = '.ext-' + obj;
        if (caption && caption.length > 0) {
            var ext = '<div class="' + clsname + ' clearfix">';
            for (var i = 0, l = caption.length; i < l; i++) {
                var idx = i + 1;
                var cap = caption[i];
                var cls = caption[i].alias || 'th' + idx;
                var cont = cap.formatter && typeof cap.formatter === 'function' ? cap.formatter() : cap.title;
                ext += '<div class="fl ext ' + cls + '">';
                ext += cont;
                ext += '</div>';
            }
            ext += '</div>';
            self.opts.tree.append(ext);
            self.opts.tree.find(clsnamejq).children('.ext').each(function(i) {
                var w = self.opts.width[i] || 'auto';
                $(this).width(w);
            });
        }
        return this;
    }
    Tree.prototype.render = function() {
        var self = this;
        var d = self.opts.data;

        self.renderObj('header');
        self.renderObj('headersub');

        var extbody = '<div class="ext-body clearfix">';
        extbody += '<ul></ul>';
        extbody += '</div>';
        self.opts.tree.append(extbody);

        if (Object.prototype.toString.call(d).toLowerCase().indexOf('array') > -1) {
            if (d.length > 0) {
                self.html += self.renderOne(d);
                self.opts.tree.find('.ext-body ul').append(self.html);
                if (self.opts.hasOwnProperty('callback')) {
                    self.opts.callback(self.opts.tree);
                };
            }
        }
        // return this;
    }
    Tree.prototype.renderOne = function(d) {
        var self = this;
        var coll = self.opts.collapse;
        var mainArr = self.opts.main || [];

        for (var i = 0; i < d.length; i++) {
            var curd = d[i];
            self.html += '<li class="row level' + self.level + ' clearfix">';
            var hang = '<div class="iamrow clearfix" style="padding-left: ' + self.level * self.opts.dw + 'px">';

            for (var j = 0; j < coll.length; j++) {
                var mkey = '';
                var w = self.opts.width[j] || 'auto';
                if (mainArr && mainArr[j] === true) {
                    mkey = 'mainkey';
                }
                hang += '<div class="' + self.opts.alias[j] + " " + mkey + '" style="float: left; width: ' + w + '">';
                hang += '<div class="inner">';

                if (curd.children && curd.children.length > 0 && mainArr[j] === true) {
                    hang += '<i class="icon icon-toggle"></i>';
                }
                if (typeof coll[j].formatter === 'function') {
                    hang += coll[j].formatter(curd[coll[j].title]) || ' ';
                } else {
                    hang += curd[coll[j].title] || '';
                }
                hang += '</div>';
                hang += '</div>';
            }
            hang += '</div>';
            self.html += hang;
            if(curd.children){
                
                if (curd && curd.children.length > 0) {
                    self.level++;
                    self.html += '<ul>';
                    self.renderOne(curd.children);
                    self.html += '</ul>';
                }
                self.html += '</li>';
                if (i === d.length - 1) {
                    self.level--;
                }
            }
        }
        return self.html;
    }
    Tree.prototype.watch = function() {
        var self = this;
        var togger = self.opts.tree.find('i.icon-toggle');
        self.opts.tree.on('click', 'i.icon-toggle', function() {
            var children = $(this).closest('.row').children('ul');
            if ($(this).hasClass('expand')) {
                $(this).removeClass('expand').addClass('collapse');
                children.show();
            } else {
                $(this).removeClass('collapse').addClass('expand');
                children.hide();
            }
        });
        return this;
    }


})(jQuery, window, document);
