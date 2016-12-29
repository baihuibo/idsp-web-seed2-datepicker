"use strict";
// Created by baihuibo on 2016/10/14.
require("bootstrap-daterangepicker");
require("bootstrap-daterangepicker/daterangepicker.css");
require("moment");
var angular_1 = require("angular");
var lodash_1 = require("lodash");
var modName = 'datepicker';
exports.mod = angular_1.module(modName, []);
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = modName;
exports.mod.directive('datepicker', ['$timeout', function ($timeout) {
        var defaultSetting = {
            singleDatePicker: true,
            autoApply: true,
            showDropdowns: true,
            locale: {
                format: 'YYYY-MM-DD',
                separator: " - ",
                "daysOfWeek": ["日", "一", "二", "三", "四", "五", "六"],
                "monthNames": ["一月", "二月", "三月", "四月", "五月", "六月",
                    "七月", "八月", "九月", "十月", "十一月", "十二月"],
                cancelLabel: '取消',
                applyLabel: '确定'
            }
        };
        return {
            restrict: 'E',
            template: "\n            <div style=\"width:100%\">\n                <!-- \u5355\u65E5\u671F\u9009\u62E9\u5668 -->\n                <div class=\"dropdown\" ng-if=\"singleDatePicker\" layout=\"row\">\n                    <button type=\"button\" flex data-toggle=\"dropdown\" class=\"form-control input-sm\">\n                        <div layout=\"row\" layout-align=\"start center\">\n                            <div flex class=\"text-left d-text-overflow\">{{startDate}}</div>\n                            <div class=\"caret\"></div>\n                        </div>\n                    </button>\n                </div>\n                \n                <!-- \u8303\u56F4\u65E5\u671F\u9009\u62E9\u5668 -->\n                <div ng-if=\"!singleDatePicker\" layout=\"row\" layout-align=\"start center\">\n                    <button type=\"button\" flex data-toggle=\"dropdown\" class=\"form-control input-sm\">\n                        <div layout=\"row\" layout-align=\"start center\">\n                            <div flex class=\"text-left d-text-overflow\">{{startDate}}</div>\n                            <div class=\"caret\"></div>\n                        </div>\n                    </button>\n                    <i style=\"margin:5px 7px;\">-</i>\n                    <button type=\"button\" flex data-toggle=\"dropdown\" class=\"form-control input-sm\">\n                        <div layout=\"row\" layout-align=\"start center\">\n                            <div flex class=\"text-left d-text-overflow\">{{endDate}}</div>\n                            <div class=\"caret\"></div>\n                        </div>\n                    </button>\n                </div>\n            </div>\n        ",
            replace: true,
            scope: {
                startDate: '=?',
                endDate: '=?',
                rangeMode: '@',
                option: '=?'
            },
            require: '?ngModel',
            link: function (scope, el, attr, ngModel) {
                var option = lodash_1.defaultsDeep(scope['option'] || {}, defaultSetting);
                var parentEl = el.closest('.modal-body');
                if (parentEl.length) {
                    option.parentEl = parentEl;
                }
                if (attr.rangeMode != void 0) {
                    option.singleDatePicker = false;
                }
                scope.singleDatePicker = option.singleDatePicker;
                $timeout(function () {
                    var value;
                    if (ngModel) {
                        value = ngModel.$modelValue || ngModel.$viewValue || void 0;
                        // 监听model值的设置
                        scope.$parent.$watch(attr['ngModel'], function (newValue, oldValue, scope) {
                            setDate(newValue);
                        });
                    }
                    setDate(value);
                });
                scope.$on('$destroy', function () {
                    picker && picker.remove();
                });
                var picker;
                var _a = option.locale, format = _a.format, separator = _a.separator;
                var singleDatePicker = !!option.singleDatePicker;
                function setDate(value) {
                    if (picker) {
                        picker.remove();
                    }
                    if (value != void 0) {
                        var strs = String(value || '').split(separator);
                        if (strs.length == 2) {
                            scope['startDate'] = strs[0];
                            scope['endDate'] = strs[1];
                        }
                        else if (strs.length == 1) {
                            scope['startDate'] = scope['endDate'] = strs[0];
                        }
                    }
                    option.startDate = scope['startDate'] || void 0;
                    option.endDate = scope['endDate'] || void 0;
                    initPicker();
                    option.startDate && option.endDate && setViewValue(picker);
                }
                function initPicker() {
                    picker = el.daterangepicker(option)
                        .on('apply.daterangepicker', function (e) {
                        setViewValue(picker);
                    }).data('daterangepicker');
                }
                function setViewValue(_a) {
                    var startDate = _a.startDate, endDate = _a.endDate;
                    var date = '';
                    scope['startDate'] = startDate.format ? startDate.format(format) : startDate;
                    scope['endDate'] = endDate.format ? endDate.format(format) : endDate;
                    if (singleDatePicker) {
                        date = scope['startDate'];
                    }
                    else {
                        date = scope['startDate'] + separator + scope['endDate'];
                    }
                    if (ngModel) {
                        ngModel.$setViewValue(date);
                    }
                    scope.$applyAsync();
                }
            }
        };
    }]);
